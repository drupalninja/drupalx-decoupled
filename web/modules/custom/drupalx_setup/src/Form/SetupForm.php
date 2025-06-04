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
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Url;

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

    $form['container']['template_type'] = [
      '#type' => 'radios',
      '#title' => $this->t('What type of website would you like to create?'),
      '#options' => [
        'drupalx-demo' => $this->t('Default Demo Site - A modern showcase website'),
        'university' => $this->t('University - Academic institution website (Coming Soon)'),
        'government' => $this->t('Government Agency - Public sector website (Coming Soon)'),
        'nonprofit' => $this->t('Non-Profit - Organization website (Coming Soon)'),
      ],
      '#default_value' => 'drupalx-demo',
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
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $site_name = $form_state->getValue('site_name');
    $template_type = $form_state->getValue('template_type');

    // Update site name.
    $this->configFactory->getEditable('system.site')
      ->set('name', $site_name)
      ->save();

    if ($template_type === 'drupalx-demo') {
      // Apply the drupalx-demo recipe.
      $this->applyDrupalxDemoRecipe();
    }
    else {
      // Fake install for other templates.
      $this->fakeInstallTemplate($template_type);
    }

    // Mark setup as complete.
    $this->state->set('drupalx_setup.completed', TRUE);

    $this->messenger->addStatus($this->t('Your @template website "@site_name" has been successfully created!', [
      '@template' => $form['container']['template_type']['#options'][$template_type],
      '@site_name' => $site_name,
    ]));

    // Redirect to homepage.
    $form_state->setRedirect('<front>');
  }

  /**
   * Apply the DrupalX Demo recipe.
   */
  protected function applyDrupalxDemoRecipe() {
    try {
      // Get the absolute path to the recipe directory.
      $drupal_root = \Drupal::service('app.root');
      $recipe_path = $drupal_root . '/../recipes/drupalx-demo';

      // Check if recipe directory exists.
      if (!is_dir($recipe_path)) {
        throw new \Exception('Recipe directory not found: ' . $recipe_path);
      }

      // Load the recipe from the directory.
      $recipe = Recipe::createFromDirectory($recipe_path);

      // Apply the recipe using RecipeRunner.
      RecipeRunner::processRecipe($recipe);

      $this->messenger->addStatus($this->t('DrupalX Demo recipe has been applied successfully.'));

      // Find the node with /welcome alias and set it as homepage.
      $this->setWelcomeAsHomepage();
    }
    catch (\Exception $e) {
      $this->messenger->addError($this->t('Error applying recipe: @error', ['@error' => $e->getMessage()]));
    }
  }

  /**
   * Fake install for other template types.
   *
   * @param string $template_type
   *   The template type being "installed".
   */
  protected function fakeInstallTemplate($template_type) {
    // Simulate installation process.
    $this->messenger->addStatus($this->t('Template "@template" installation simulated. This template will be available soon!', [
      '@template' => $template_type,
    ]));
  }

  /**
   * Set the welcome node as the homepage.
   */
  protected function setWelcomeAsHomepage() {
    try {
      // Find node with /welcome alias.
      $node_storage = $this->entityTypeManager->getStorage('node');
      $alias_storage = $this->entityTypeManager->getStorage('path_alias');

      $alias_entities = $alias_storage->loadByProperties(['alias' => '/welcome']);
      if (!empty($alias_entities)) {
        $alias_entity = reset($alias_entities);
        $path = $alias_entity->getPath();

        // Extract node ID from path (e.g., /node/123).
        if (preg_match('/\/node\/(\d+)/', $path, $matches)) {
          $node_id = $matches[1];

          // Set this node as the homepage.
          $this->configFactory->getEditable('system.site')
            ->set('page.front', '/node/' . $node_id)
            ->save();

          $this->messenger->addStatus($this->t('Homepage has been set to the welcome page.'));
        }
      }
    }
    catch (\Exception $e) {
      $this->messenger->addWarning($this->t('Could not set welcome page as homepage: @error', ['@error' => $e->getMessage()]));
    }
  }

}
