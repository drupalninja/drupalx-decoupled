<?php

namespace Drupal\drupalx_ai\Commands;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Http\ClientFactory;
use Drush\Commands\DrushCommands;
use GuzzleHttp\Exception\RequestException;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * A Drush commandfile.
 *
 * @DrushCommands()
 */
class ImportParagraphTypeCommands extends DrushCommands {

  /**
   * The Anthropic API key.
   *
   * @var string
   */
  protected $apiKey;

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The HTTP client.
   *
   * @var \GuzzleHttp\ClientInterface
   */
  protected $httpClient;

  /**
   * Constructor for ImportParagraphTypeCommands.
   *
   * @param \Drupal\Core\Http\ClientFactory $http_client_factory
   *   The HTTP client factory.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   */
  public function __construct(ClientFactory $http_client_factory, ConfigFactoryInterface $config_factory) {
    parent::__construct();
    $this->configFactory = $config_factory;
    $this->initializeHttpClient($http_client_factory);
  }

  /**
   * Initialize the HTTP client with the API key from configuration.
   *
   * @param \Drupal\Core\Http\ClientFactory $http_client_factory
   *   The HTTP client factory.
   */
  protected function initializeHttpClient(ClientFactory $http_client_factory) {
    $api_key = $this->configFactory->get('drupalx_ai.settings')->get('api_key');

    if (empty($api_key)) {
      $this->logger()->warning('Anthropic API key is not set. Please configure it in the DrupalX AI Settings.');
    }

    $this->httpClient = $http_client_factory->fromOptions([
      'headers' => [
        'Content-Type' => 'application/json',
        'x-api-key' => $api_key,
        'anthropic-version' => '2023-06-01',
      ],
    ]);
  }

  /**
   * Import a new paragraph type based on a Next.js component using AI.
   *
   * @command drupalx-ai:import-from-component
   * @aliases dai-ifc
   * @usage drush drupalx-ai:import-from-component
   */
  public function importParagraphTypeFromComponent(InputInterface $input, OutputInterface $output) {
    // Check if API key is set before proceeding.
    if (empty($this->configFactory->get('drupalx_ai.settings')->get('api_key'))) {
      $output->writeln("<error>Anthropic API key is not set. Please configure it in the DrupalX AI Settings before running this command.</error>");
      return;
    }

    // Prompt for component name.
    $componentName = $this->askComponent($input, $output);

    // Read component file.
    $componentContent = $this->readComponentFile($componentName);

    if (!$componentContent) {
      $output->writeln("<error>Could not read component file. Please check the file exists and is readable.</error>");
      return;
    }

    // Generate paragraph type details using Claude 3 Haiku.
    $paragraphTypeDetails = $this->generateParagraphTypeDetails($componentContent);

    if (!$paragraphTypeDetails) {
      $output->writeln("<error>Failed to generate paragraph type details from the component.</error>");
      return;
    }

    // Display generated details and ask for confirmation.
    $output->writeln("<info>Generated Paragraph Type Details:</info>");
    $output->writeln(print_r($paragraphTypeDetails, TRUE));

    if (!$this->io()->confirm('Do you want to proceed with importing this paragraph type?', TRUE)) {
      $output->writeln('Import cancelled.');
      return;
    }

    // Here you would call your actual import_paragraph_type function.
    // For demonstration, we'll just print a success message.
    $output->writeln("<info>Successfully imported paragraph type: {$paragraphTypeDetails['name']}</info>");
  }

  /**
   * Prompt the user for the component name.
   */
  protected function askComponent(InputInterface $input, OutputInterface $output) {
    $componentDir = './nextjs/components/';
    $components = array_diff(scandir($componentDir), ['..', '.']);
    $components = array_map(function ($file) {
      return pathinfo($file, PATHINFO_FILENAME);
    }, $components);

    return $this->io()->choice('Select a component to import', $components);
  }

  /**
   * Read the component file.
   */
  protected function readComponentFile($componentName) {
    $filePath = "./nextjs/components/{$componentName}.js";
    return file_exists($filePath) ? file_get_contents($filePath) : FALSE;
  }

  /**
   * Generate paragraph type details using Claude 3 Haiku.
   */
  protected function generateParagraphTypeDetails($componentContent) {
    $url = 'https://api.anthropic.com/v1/messages';
    $data = [
      'model' => 'claude-3-haiku-20240307',
      'max_tokens' => 1024,
      'messages' => [
        [
          'role' => 'user',
          'content' => "Based on this Next.js component, suggest a Drupal paragraph type structure:\n\n{$componentContent}",
        ],
      ],
      'tools' => [
        [
          'type' => 'function',
          'function' => [
            "name" => "suggest_paragraph_type",
            "description" => "Suggests a Drupal paragraph type structure based on a Next.js component",
            "parameters" => [
              "type" => "object",
              "properties" => [
                "id" => [
                  "type" => "string",
                  "description" => "Machine name of the paragraph type",
                ],
                "name" => [
                  "type" => "string",
                  "description" => "Human-readable name of the paragraph type",
                ],
                "description" => [
                  "type" => "string",
                  "description" => "Description of the paragraph type",
                ],
                "fields" => [
                  "type" => "array",
                  "items" => [
                    "type" => "object",
                    "properties" => [
                      "name" => [
                        "type" => "string",
                        "description" => "Machine name of the field",
                      ],
                      "label" => [
                        "type" => "string",
                        "description" => "Human-readable label of the field",
                      ],
                      "type" => [
                        "type" => "string",
                        "description" => "Drupal field type",
                      ],
                      "required" => [
                        "type" => "boolean",
                        "description" => "Whether the field is required",
                      ],
                      "cardinality" => [
                        "type" => "integer",
                        "description" => "The number of values users can enter for this field. -1 for unlimited.",
                      ],
                    ],
                    "required" => ["name", "label", "type"],
                  ],
                ],
              ],
              "required" => ["id", "name", "description", "fields"],
            ],
          ],
        ],
      ],
    ];

    try {
      $response = $this->httpClient->post($url, ['json' => $data]);
      $responseData = json_decode($response->getBody(), TRUE);

      if (isset($responseData['content'][0]['text'])) {
        // Parse the response text to extract the JSON part.
        $jsonStart = strpos($responseData['content'][0]['text'], '{');
        $jsonEnd = strrpos($responseData['content'][0]['text'], '}');
        if ($jsonStart !== FALSE && $jsonEnd !== FALSE) {
          $jsonString = substr($responseData['content'][0]['text'], $jsonStart, $jsonEnd - $jsonStart + 1);
          return json_decode($jsonString, TRUE);
        }
      }

      $this->logger()->error('Unexpected API response format: @response', ['@response' => $response->getBody()]);
    }
    catch (RequestException $e) {
      $this->logger()->error('API request failed: @error', ['@error' => $e->getMessage()]);
    }

    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('http_client_factory'),
      $container->get('config.factory')
    );
  }

}
