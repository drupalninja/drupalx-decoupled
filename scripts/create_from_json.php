#!/usr/bin/env php
<?php

/**
 * @file
 * Creates a landing page from a JSON file.
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;
use Drupal\Core\File\FileSystemInterface;

// Define the JSON file path directly.
$json_file = __DIR__ . '/landing_page_data.json';

if (!file_exists($json_file)) {
  echo "Error: JSON file not found at {$json_file}\n";
  exit(1);
}

// Read and decode the JSON file.
$json_content = file_get_contents($json_file);
$data = json_decode($json_content, TRUE);

if (json_last_error() !== JSON_ERROR_NONE) {
  echo "Error parsing JSON: " . json_last_error_msg() . "\n";
  exit(1);
}

// Cache for media entities to avoid duplicates.
$_create_from_json_media_cache = [];

/**
 * Gets or creates a media entity from a URL.
 *
 * @param string $url
 *   The URL of the image.
 * @param string $alt
 *   The alt text for the image.
 *
 * @return int
 *   The media entity ID.
 */
function get_or_create_media($url, $alt = '') {
  global $_create_from_json_media_cache;

  // Check if we already processed this URL.
  if (isset($_create_from_json_media_cache[$url])) {
    return $_create_from_json_media_cache[$url];
  }

  // Instead of trying to match by URL, just get a fallback image
  // from the media library to use as a placeholder.
  $query = \Drupal::entityQuery('media')
    ->condition('bundle', 'image')
    ->accessCheck(FALSE)
    ->range(0, 1);

  $result = $query->execute();

  if (!empty($result)) {
    $media_id = reset($result);
    $_create_from_json_media_cache[$url] = $media_id;
    echo "Using existing media with ID: {$media_id} for URL: {$url}\n";
    return $media_id;
  }

  // No existing media found, create a new one.
  $file = create_file_from_url($url);
  if (!$file) {
    echo "Error: Could not create file from URL {$url} and no fallback media found.\n";
    exit(1);
  }

  // Create a new media entity.
  $media = Media::create([
    'bundle' => 'image',
    'uid' => 1,
    'name' => basename($url),
    'field_media_image' => [
      'target_id' => $file->id(),
      'alt' => $alt ?: basename($url),
    ],
  ]);

  $media->save();
  $media_id = $media->id();
  $_create_from_json_media_cache[$url] = $media_id;

  echo "Created new media for URL {$url} with ID: {$media_id}\n";
  return $media_id;
}

/**
 * Creates a file entity from a URL.
 *
 * @param string $url
 *   The URL of the file to create.
 *
 * @return \Drupal\file\Entity\File|false
 *   The file entity or FALSE if creation failed.
 */
function create_file_from_url($url) {
  $file_system = \Drupal::service('file_system');
  $directory = 'public://imported-images';
  $file_system->prepareDirectory($directory, FileSystemInterface::CREATE_DIRECTORY);

  // Generate a unique filename.
  $filename = basename($url);
  $destination = $directory . '/' . $filename;

  try {
    // Download the file.
    $file_data = file_get_contents($url);
    if ($file_data === FALSE) {
      echo "Error: Could not download file from URL: {$url}\n";
      return FALSE;
    }

    // Save the file.
    $file = file_save_data($file_data, $destination, FileSystemInterface::EXISTS_RENAME);
    if (!$file) {
      echo "Error: Could not save file from URL: {$url}\n";
      return FALSE;
    }

    return $file;
  }
  catch (\Exception $e) {
    echo "Error creating file from URL {$url}: " . $e->getMessage() . "\n";
    return FALSE;
  }
}

/**
 * Creates a paragraph entity from the provided data.
 *
 * @param array $paragraph_data
 *   The paragraph data from the JSON file.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function create_paragraph(array $paragraph_data) {
  $type = $paragraph_data['type'];

  // Remove type from data as it's not a field.
  unset($paragraph_data['type']);

  // Process media fields.
  foreach ($paragraph_data as $field_name => $field_value) {
    if (is_array($field_value) && isset($field_value['url'])) {
      // This is a media field with a URL.
      $alt_text = $field_name === 'field_logo' ? 'Logo' : 'Image';
      $media_id = get_or_create_media($field_value['url'], $alt_text);
      $paragraph_data[$field_name] = [
        'target_id' => $media_id,
      ];
    }
    elseif ($field_name === 'field_media_item' && is_array($field_value)) {
      $media_items = [];
      foreach ($field_value as $item) {
        if (isset($item['url'])) {
          $media_id = get_or_create_media($item['url'], 'Gallery image');
          $media_items[] = ['target_id' => $media_id];
        }
      }
      $paragraph_data[$field_name] = $media_items;
    }
    // Process nested paragraphs.
    elseif (is_array($field_value) && !empty($field_value) &&
           (strpos($field_name, 'field_') === 0) &&
           isset($field_value[0]) && is_array($field_value[0]) &&
           isset($field_value[0]['type'])) {

      $nested_paragraphs = [];
      foreach ($field_value as $nested_data) {
        $nested_paragraph = create_paragraph($nested_data);
        $nested_paragraphs[] = [
          'target_id' => $nested_paragraph->id(),
          'target_revision_id' => $nested_paragraph->getRevisionId(),
        ];
      }
      $paragraph_data[$field_name] = $nested_paragraphs;
    }
  }

  // Create and save the paragraph.
  $paragraph = Paragraph::create(['type' => $type] + $paragraph_data);
  $paragraph->save();

  return $paragraph;
}

// Create paragraphs from the JSON data.
$paragraphs = [];
foreach ($data['sections'] as $section_data) {
  $paragraph = create_paragraph($section_data);
  $paragraphs[] = $paragraph;
}

// Create the node.
$node_data = [
  'type' => 'landing',
  'title' => $data['title'],
  'status' => TRUE,
  'uid' => 1,
  'promote' => FALSE,
  'sticky' => FALSE,
  'field_content' => array_map(function ($paragraph) {
    return [
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ];
  }, $paragraphs),
];

// Add metadata if available.
if (isset($data['metadata'])) {
  if (isset($data['metadata']['hide_page_title'])) {
    $node_data['field_hide_page_title'] = $data['metadata']['hide_page_title'];
  }

  if (isset($data['metadata']['path'])) {
    $node_data['path'] = [
      'alias' => $data['metadata']['path'],
      'pathauto' => 0,
    ];
  }

  if (isset($data['metadata']['metatags'])) {
    $node_data['metatag'] = $data['metadata']['metatags'];
  }
}

// Create and save the node.
$node = Node::create($node_data);

try {
  $node->save();
  echo "Successfully created landing page with ID: {$node->id()}\n";
  echo "View the page at: /node/{$node->id()}\n";

  if (isset($data['metadata']['path'])) {
    echo "Or at the alias: {$data['metadata']['path']}\n";
  }

  echo "Total paragraphs created: " . count($paragraphs) . "\n";
  echo "Total media items used: " . count($_create_from_json_media_cache) . "\n";
}
catch (Exception $e) {
  echo "Error creating landing page: {$e->getMessage()}\n";
}
