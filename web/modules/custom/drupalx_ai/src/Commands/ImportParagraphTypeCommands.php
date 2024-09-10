<?php

namespace Drupal\drupalx_ai\Commands;

use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Http\ClientFactory;
use Drupal\drupalx_ai\Service\ParagraphImporterService;
use Drush\Commands\DrushCommands;
use GuzzleHttp\Exception\RequestException;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * A Drush commandfile.
 *
 * @package Drupal\drupalx_ai\Commands
 */
class ImportParagraphTypeCommands extends DrushCommands {

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
   * The paragraph importer service.
   *
   * @var \Drupal\drupalx_ai\Service\ParagraphImporterService
   */
  protected $paragraphImporter;

  /**
   * Constructor for ImportParagraphTypeCommands.
   *
   * @param \Drupal\Core\Http\ClientFactory $http_client_factory
   *   The HTTP client factory.
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \Drupal\drupalx_ai\Service\ParagraphImporterService $paragraph_importer
   *   The paragraph importer service.
   */
  public function __construct(ClientFactory $http_client_factory, ConfigFactoryInterface $config_factory, ParagraphImporterService $paragraph_importer) {
    parent::__construct();
    $this->configFactory = $config_factory;
    $this->paragraphImporter = $paragraph_importer;
    $this->initializeHttpClient($http_client_factory);
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('http_client_factory'),
      $container->get('config.factory'),
      $container->get('drupalx_ai.paragraph_importer')
    );
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
  public function importParagraphTypeFromComponent(OutputInterface $output) {
    // Check if API key is set before proceeding.
    if (empty($this->configFactory->get('drupalx_ai.settings')->get('api_key'))) {
      $output->writeln("<error>Anthropic API key is not set. Please configure it in the DrupalX AI Settings before running this command.</error>");
      return;
    }

    // Prompt for component name.
    $componentName = $this->askComponent();

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

    // Import the paragraph type using the ParagraphImporterService.
    $result = $this->paragraphImporter->importParagraphType((object) $paragraphTypeDetails);
    $output->writeln($result);
  }

  /**
   * Prompt the user for the component name.
   */
  protected function askComponent() {
    $componentDir = '../nextjs/components/';
    $components = scandir($componentDir);
    $components = array_filter($components, function ($file) {
      return is_dir("../nextjs/components/$file") && $file != '.' && $file != '..';
    });

    $selectedIndex = $this->io()->choice('Select a component to import', $components);
    return $components[$selectedIndex];
  }

  /**
   * Read the component file.
   */
  protected function readComponentFile($componentName) {
    $componentPath = "../nextjs/components/{$componentName}";
    if (!is_dir($componentPath)) {
      return FALSE;
    }

    $componentFiles = array_filter(scandir($componentPath), function ($file) {
      return pathinfo($file, PATHINFO_EXTENSION) === 'tsx' && !preg_match('/\.stories\.tsx$/', $file);
    });

    if (empty($componentFiles)) {
      $this->logger()->warning("No suitable .tsx files found in the {$componentName} component directory.");
      return FALSE;
    }

    $selectedFile = $this->io()->choice(
      "Select a file from the {$componentName} component",
      array_combine($componentFiles, $componentFiles)
    );

    $filePath = "{$componentPath}/{$selectedFile}";
    if (!file_exists($filePath) || !is_readable($filePath)) {
      $this->logger()->error("Unable to read the selected file: {$filePath}");
      return FALSE;
    }

    return file_get_contents($filePath);
  }

  /**
   * Generate paragraph type details using Claude 3 Haiku.
   */
  protected function generateParagraphTypeDetails($componentContent) {
    // Check if API key is set.
    $api_key = $this->configFactory->get('drupalx_ai.settings')->get('api_key');
    if (empty($api_key)) {
      $this->logger()->error('Anthropic API key is not set. Please configure it in the DrupalX AI Settings.');
      return FALSE;
    }

    $prompt = "Based on this Next.js component, suggest a Drupal paragraph type structure using the suggest_paragraph_type function:\n\n{$componentContent}";

    $url = 'https://api.anthropic.com/v1/messages';
    $data = [
      'model' => 'claude-3-haiku-20240307',
      'max_tokens' => 1024,
      'messages' => [
        [
          'role' => 'user',
          'content' => $prompt,
        ],
      ],
      'tools' => [
        [
          'name' => 'suggest_paragraph_type',
          'description' => "Suggests a Drupal paragraph type structure based on a Next.js component",
          'input_schema' => [
            'type' => 'object',
            'properties' => [
              'id' => [
                'type' => 'string',
                'description' => 'Machine name of the paragraph type',
              ],
              'name' => [
                'type' => 'string',
                'description' => 'Human-readable name of the paragraph type',
              ],
              'description' => [
                'type' => 'string',
                'description' => 'Description of the paragraph type',
              ],
              'fields' => [
                'type' => 'array',
                'items' => [
                  'type' => 'object',
                  'properties' => [
                    'name' => [
                      'type' => 'string',
                      'description' => 'Machine name of the field',
                    ],
                    'label' => [
                      'type' => 'string',
                      'description' => 'Human-readable label of the field',
                    ],
                    'type' => [
                      'type' => 'string',
                      'description' => 'Drupal field type',
                    ],
                    'required' => [
                      'type' => 'boolean',
                      'description' => 'Whether the field is required',
                    ],
                    'cardinality' => [
                      'type' => 'integer',
                      'description' => 'The number of values users can enter for this field. -1 for unlimited.',
                    ],
                    'sample_value' => [
                      'type' => 'string',
                      'description' => 'Sample value for the field',
                    ],
                  ],
                  'required' => ['name', 'label', 'type', 'sample_value'],
                ],
              ],
            ],
            'required' => ['id', 'name', 'description', 'fields'],
          ],
        ],
      ],
    ];

    try {
      $this->logger()->notice('Sending request to Claude API');
      $response = $this->httpClient->request('POST', $url, ['json' => $data]);
      $this->logger()->notice('Received response from Claude API');

      $responseData = json_decode($response->getBody(), TRUE);
      $this->logger()->notice('Response data: @data', ['@data' => print_r($responseData, TRUE)]);

      if (!isset($responseData['content']) || !is_array($responseData['content'])) {
        throw new \RuntimeException('Unexpected API response format: content array not found');
      }

      foreach ($responseData['content'] as $content) {
        $this->logger()->notice('Processing content: @content', ['@content' => print_r($content, TRUE)]);
        if (isset($content['type']) && $content['type'] === 'tool_use' && isset($content['input'])) {
          $arguments = $content['input'];
          if (is_array($arguments)) {
            $this->logger()->notice('Successfully parsed function call arguments');
            return $arguments;
          } else {
            throw new \RuntimeException('Failed to parse function call arguments: invalid format');
          }
        }
      }

      throw new \RuntimeException('Function call response not found in API response');
    }
    catch (RequestException $e) {
      $this->logger()->error('API request failed: ' . $e->getMessage());
      $this->logger()->error('Request details: ' . print_r($data, TRUE));
    }
    catch (\Exception $e) {
      $this->logger()->error('Error processing API response: ' . $e->getMessage());
    }

    return FALSE;
  }

}
