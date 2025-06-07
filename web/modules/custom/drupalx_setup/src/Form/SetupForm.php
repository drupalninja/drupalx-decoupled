<?php

namespace Drupal\drupalx_setup\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\path_alias\AliasManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\State\StateInterface;
use Drupal\Core\Recipe\RecipeRunner;
use Drupal\Core\Recipe\Recipe;
use Drupal\Core\Url;
use Drupal\Core\Link;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Yaml\Yaml;

/**
 * Setup form for DrupalX initial configuration.
 */
class SetupForm extends FormBase {

  /**
   * The config factory.
   *
   * @var \Drupal\Core\Config\ConfigFactoryInterface
   */
  protected $configFactory;

  /**
   * The alias manager.
   *
   * @var \Drupal\path_alias\AliasManagerInterface
   */
  protected $aliasManager;

  /**
   * The entity type manager.
   *
   * @var \Drupal\Core\Entity\EntityTypeManagerInterface
   */
  protected $entityTypeManager;

  /**
   * The messenger service.
   *
   * @var \Drupal\Core\Messenger\MessengerInterface
   */
  protected $messenger;

  /**
   * The state service.
   *
   * @var \Drupal\Core\State\StateInterface
   */
  protected $state;

  /**
   * Constructs a SetupForm object.
   *
   * @param \Drupal\Core\Config\ConfigFactoryInterface $config_factory
   *   The config factory.
   * @param \Drupal\path_alias\AliasManagerInterface $alias_manager
   *   The alias manager.
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entity_type_manager
   *   The entity type manager.
   * @param \Drupal\Core\Messenger\MessengerInterface $messenger
   *   The messenger service.
   * @param \Drupal\Core\State\StateInterface $state
   *   The state service.
   */
  public function __construct(
    ConfigFactoryInterface $config_factory,
    AliasManagerInterface $alias_manager,
    EntityTypeManagerInterface $entity_type_manager,
    MessengerInterface $messenger,
    StateInterface $state
  ) {
    $this->configFactory = $config_factory;
    $this->aliasManager = $alias_manager;
    $this->entityTypeManager = $entity_type_manager;
    $this->messenger = $messenger;
    $this->state = $state;
  }

  /**
   * {@inheritdoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('config.factory'),
      $container->get('path_alias.manager'),
      $container->get('entity_type.manager'),
      $container->get('messenger'),
      $container->get('state')
    );
  }

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'drupalx_setup_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    // Check if the setup has already been completed.
    if ($this->state->get('drupalx_setup.completed')) {
      return $this->alreadyCompletedForm();
    }

    // Add the CSS library for styling.
    $form['#attached']['library'][] = 'drupalx_setup/setup-form';

    // Container for centered content.
    $form['#attributes']['class'][] = 'drupalx-setup-form';

    $form['container'] = [
      '#type' => 'container',
      '#attributes' => ['class' => ['setup-container']],
    ];

    $form['container']['header'] = [
      '#markup' => '<h1 class="setup-title">Welcome to DrupalX</h1><p class="setup-subtitle">Let\'s set up your new website in just a few steps.</p>',
    ];

    // Get current site name.
    $current_site_name = $this->configFactory->get('system.site')->get('name') ?? 'My DrupalX Site';

    $form['container']['site_name'] = [
      '#type' => 'textfield',
      '#title' => $this->t('What would you like to name your site?'),
      '#default_value' => $current_site_name,
      '#required' => TRUE,
      '#attributes' => ['class' => ['setup-input']],
    ];

    // Initialize template options with the 'no content' option first.
    $template_options = [
      'no-content' => $this->t('No Content - Start with a clean site and /user homepage'),
    ];

    // Get available recipe options and add them after the no-content option.
    $recipe_options = $this->getAvailableTemplateOptions();

    // No recipe warning if needed.
    if (empty($recipe_options)) {
      $form['container']['no_recipes_warning'] = [
        '#markup' => '<div class="messages messages--warning">' .
        $this->t('No recipe files were found. You can still set your site name and homepage.') .
        '</div>',
        '#weight' => -1,
      ];
    }

    // Add available recipe options after the no-content option.
    $template_options += $recipe_options;

    $form['container']['template_type'] = [
      '#type' => 'radios',
      '#title' => $this->t('What type of website would you like to create?'),
      '#options' => $template_options,
      '#default_value' => 'no-content',
      '#required' => TRUE,
      '#attributes' => ['class' => ['setup-options']],
    ];

    $form['container']['actions'] = [
      '#type' => 'actions',
      '#attributes' => ['class' => ['setup-actions']],
    ];

    $form['container']['actions']['submit'] = [
      '#type' => 'submit',
      '#value' => $this->t('Create My Website'),
      '#attributes' => ['class' => ['setup-submit', 'btn-primary']],
    ];

    return $form;
  }

  /**
   * Builds the form when setup is already completed.
   *
   * @return array
   *   A render array for the "already completed" page.
   */
  protected function alreadyCompletedForm() {
    // Get the site name.
    $site_name = $this->configFactory->get('system.site')->get('name');

    // Get the homepage URL to link to.
    $front_uri = $this->configFactory->get('system.site')->get('page.front');
    $homepage_url = \Drupal::service('path_alias.manager')->getAliasByPath($front_uri);

    $build = [
      '#attached' => [
        'library' => ['drupalx_setup/setup-form'],
      ],
      '#attributes' => [
        'class' => ['drupalx-setup-form', 'setup-completed'],
      ],
      'container' => [
        '#type' => 'container',
        '#attributes' => ['class' => ['setup-container', 'text-center']],
        'header' => [
          '#markup' => '<h1 class="setup-title">' . $this->t('Setup Already Completed') . '</h1>',
        ],
        'message' => [
          '#markup' => '<p class="setup-subtitle">' . $this->t(
            'The setup for "@site_name" has already been run.',
            ['@site_name' => $site_name]
          ) . '</p>',
        ],
        'homepage_link' => [
          '#type' => 'link',
          '#title' => $this->t('Go to Homepage'),
          '#url' => Url::fromUserInput($homepage_url),
          '#attributes' => [
            'class' => ['button', 'button--primary', 'setup-submit'],
          ],
        ],
      ],
    ];

    return $build;
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $site_name = $form_state->getValue('site_name');
    $template_type = $form_state->getValue('template_type');

    // Update site name.
    $this->configFactory->getEditable('system.site')
      ->set('name', $site_name)
      ->save();

    // Apply the selected recipe.
    $this->applyRecipe($template_type);

    // Mark setup as complete.
    $this->state->set('drupalx_setup.completed', 'finished');

    // After installing content, set the "Welcome" page as the front page if not
    // using no-content option.
    if ($template_type !== 'no-content') {
      $this->setWelcomeAsHomepage();
    }

    // Display a success message with the appropriate label.
    $template_label = $form['container']['template_type']['#options'][$template_type] ?? $template_type;

    $this->messenger->addStatus($this->t(
      'Your @template website "@site_name" has been successfully created!',
      [
        '@template' => $template_label,
        '@site_name' => $site_name,
      ]
    ));

    // Get created pages to display (only applies for recipe content).
    $created_pages = $this->state->get('drupalx_setup.created_pages', []);
    if (!empty($created_pages)) {
      $links = [];
      foreach ($created_pages as $path => $title) {
        $url = Url::fromUserInput($path);
        $links[] = Link::fromTextAndUrl($title, $url)->toString();
      }
      $this->messenger->addStatus($this->t(
        'The following pages were created: @pages',
        ['@pages' => implode(', ', $links)]
      ));
    }

    // Redirect to homepage.
    $form_state->setRedirect('<front>');
  }

  /**
   * Gets the available template options by checking recipe files.
   *
   * @return array
   *   An array of template options keyed by directory name.
   */
  protected function getAvailableTemplateOptions() {
    $template_options = [];
    $drupal_root = DRUPAL_ROOT;
    $recipe_dirs = [
      'drupalx-demo' => $this->t('Default Demo Site - A modern showcase website'),
      'drupalx-university' => $this->t('University - Academic institution website'),
      'drupalx-gov' => $this->t('Government - Public sector website'),
      'drupalx-nonprofit' => $this->t('Non-Profit - Organization website'),
    ];

    // Check each recipe directory to see if it exists and has a recipe.yml file.
    foreach ($recipe_dirs as $dir => $label) {
      $recipe_path = $drupal_root . '/../recipes/' . $dir;
      $recipe_file = $recipe_path . '/recipe.yml';

      if (is_dir($recipe_path) && file_exists($recipe_file)) {
        $template_options[$dir] = $label;
      }
    }

    return $template_options;
  }

  /**
   * Apply the selected recipe.
   *
   * @param string $template_type
   *   The template type recipe to apply.
   */
  protected function applyRecipe($template_type) {
    // If 'no-content' option is selected, don't apply a recipe.
    if ($template_type === 'no-content') {
      // Set /user as the homepage.
      $this->configFactory->getEditable('system.site')
        ->set('page.front', '/user')
        ->save();

      $this->messenger->addStatus($this->t('Site configured with no demo content. Homepage set to user login.'));
      return;
    }

    try {
      // Get the absolute path to the recipe directory.
      $drupal_root = DRUPAL_ROOT;
      $recipe_path = $drupal_root . '/../recipes/' . $template_type;

      // Check if recipe directory exists.
      if (!is_dir($recipe_path)) {
        throw new \Exception('Recipe directory not found: ' . $recipe_path);
      }

      // Load the recipe from the directory.
      $recipe = Recipe::createFromDirectory($recipe_path);

      // Apply the recipe using RecipeRunner.
      RecipeRunner::processRecipe($recipe);

      $this->messenger->addStatus($this->t(
        '@template recipe has been applied successfully.',
        ['@template' => ucfirst(str_replace('-', ' ', $template_type))]
      ));

      // After applying the recipe, get the pages that were created.
      $this->getCreatedPages($recipe_path);
    }
    catch (\Exception $e) {
      $this->messenger->addError($this->t(
        'Error applying recipe: @error',
        ['@error' => $e->getMessage()]
      ));
    }
  }

  /**
   * Get the pages created by the recipe and save them to state.
   *
   * @param string $recipe_path
   *   The path to the recipe.
   */
  protected function getCreatedPages($recipe_path) {
    $node_content_path = $recipe_path . '/content/node';
    if (!is_dir($node_content_path)) {
      return;
    }

    $created_pages = [];
    $yml_files = glob($node_content_path . '/*.yml');
    foreach ($yml_files as $file_path) {
      $yaml_content = file_get_contents($file_path);
      $content = Yaml::parse($yaml_content);
      if (isset($content['title'][0]['value']) && isset($content['path'][0]['alias'])) {
        $title = $content['title'][0]['value'];
        $alias = $content['path'][0]['alias'];
        $created_pages[$alias] = $title;
      }
    }

    if (!empty($created_pages)) {
      $this->state->set('drupalx_setup.created_pages', $created_pages);
    }
  }

  /**
   * Set the "Welcome" page as the site homepage.
   */
  protected function setWelcomeAsHomepage() {
    try {
      // Find node with /welcome alias.
      $path = $this->aliasManager->getPathByAlias('/welcome');
      if (preg_match('/node\/(\d+)/', $path, $matches)) {
        $node_id = $matches[1];

        // Set this node as the homepage.
        $this->configFactory->getEditable('system.site')
          ->set('page.front', '/node/' . $node_id)
          ->save();

        $this->messenger->addStatus($this->t('The "Welcome" page has been set as the homepage.'));
      }
      else {
        $this->messenger->addWarning($this->t('Could not find a page with the alias "/welcome".'));
      }
    }
    catch (\Exception $e) {
      $this->messenger->addWarning($this->t('Could not set homepage: @error', ['@error' => $e->getMessage()]));
    }
  }

}
