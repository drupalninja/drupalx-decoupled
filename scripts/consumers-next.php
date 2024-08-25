<?php

/**
 * @file
 * Create consumers and generate keys for them.
 */

use Drupal\Component\Utility\Crypt;
use Drupal\Component\Utility\Random;

$messages = [];

// If sites/default/files/private is writable to generate keys.
if (is_writable('sites/default/files/private')) {
  \Drupal::service('simple_oauth.key.generator')->generateKeys('sites/default/files/private');

  $random = new Random();
  $consumerStorage = \Drupal::entityTypeManager()->getStorage('consumer');

  $previewerClientId = Crypt::randomBytesBase64();
  $previewerClientSecret = $random->word(8);
  $consumerStorage->create([
    'client_id' => $previewerClientId,
    'client_secret ' => $previewerClientSecret,
    'label' => 'Previewer',
    'user_id' => 2,
    'third_party' => TRUE,
    'is_default' => FALSE,
    'roles' => ['previewer'],
  ])->save();

  $viewerClientId = Crypt::randomBytesBase64();
  $viewerClientSecret = $random->word(8);
  $consumerStorage->create([
    'client_id' => $viewerClientId,
    'client_secret ' => $viewerClientSecret,
    'label' => 'Viewer',
    'user_id' => 2,
    'third_party' => TRUE,
    'is_default' => FALSE,
    'roles' => ['viewer'],
  ])->save();

  $messages = [
    'Consumers created successfully. Please save the following credentials.',
    '--- Previewer ---',
    'DRUPAL_CLIENT_ID=' . $previewerClientId,
    'DRUPAL_CLIENT_SECRET=' . $previewerClientSecret,
    '--- Viewer ---',
    'DRUPAL_CLIENT_ID=' . $viewerClientId,
    'DRUPAL_CLIENT_SECRET=' . $viewerClientSecret,
  ];
}

// Check to see if ./nextjs/ is writable.
// If so go aahead and update configuration files.
if (is_writable('../nextjs/')) {
  // Get current domain.
  $host = \Drupal::request()->getSchemeAndHttpHost();

  // If the domain ends with .ddev.site, force http.
  if (strpos($host, '.ddev.site') !== FALSE) {
    $host = preg_replace('/^https:/', 'http:', $host);
  }

  // If file ../nextjs/.env.example exists copy to ../nextjs/.env.
  $envFile = '../nextjs/.env';
  $envExampleFile = '../nextjs/.env.example';
  if (file_exists($envExampleFile) && !file_exists($envFile)) {
    copy($envExampleFile, '../nextjs/.env');
    // Notify the user.
    $messages[] = 'Copied ' . $envExampleFile . ' to ../nextjs/.env';
  }

  // If file ../nextjs/.env exists then append the credentials.
  if (file_exists($envFile)) {
    $envContents = file_get_contents($envFile);

    // Update DRUPAL_CLIENT_ID.
    $envContents = preg_replace(
      '/^DRUPAL_CLIENT_ID=.*$/m',
      'DRUPAL_CLIENT_ID=' . $previewerClientId,
      $envContents
    );

    // Update DRUPAL_CLIENT_SECRET.
    $envContents = preg_replace(
      '/^DRUPAL_CLIENT_SECRET=.*$/m',
      'DRUPAL_CLIENT_SECRET=' . $previewerClientSecret,
      $envContents
    );

    // Update DRUPAL_AUTH_URI.
    $envContents = preg_replace(
      '/^DRUPAL_AUTH_URI=.*$/m',
      'DRUPAL_AUTH_URI=' . $host,
      $envContents
    );

    // Update DRUPAL_GRAPHQL_URI.
    $envContents = preg_replace(
      '/^DRUPAL_GRAPHQL_URI=.*$/m',
      'DRUPAL_GRAPHQL_URI=' . $host . '/graphql',
      $envContents
    );

    // Write the updated contents back to the file.
    file_put_contents($envFile, $envContents);

    // Notify the user.
    $messages[] = 'Credentials added to ' . $envFile;
  }
}

if (empty($messages)) {
  return;
}

if (PHP_SAPI === 'cli') {
  echo PHP_EOL;
  foreach ($messages as $message) {
    echo $message . PHP_EOL;
  }
  echo PHP_EOL;
}
else {
  foreach ($messages as $message) {
    \Drupal::messenger()->addWarning($message);
  }
}
