<?php

/**
 * @file
 * Contains functions to create media.
 */

use Drupal\media\Entity\Media;

/**
 * Create media items.
 */
function _drupalx_graphql_create_media_items() {
  $media_names = [
    'card' => 'card.jpg',
    'bootstrap' => 'bootstrap.svg',
    'storybook' => 'storybook.svg',
    'bootswatch' => 'bootswatch.svg',
    'quote-logo' => 'quote-logo.svg',
    'quote-thumb' => 'dries.jpg',
  ];

  $media_items = [];

  foreach ($media_names as $media_name => $file_name) {
    $image_path = \Drupal::service('extension.list.profile')->getPath('drupalx_graphql') . '/images/' . $file_name;
    $media = _drupalx_graphql_create_media($media_name, $file_name, $image_path);
    $media_items[$media_name] = $media;
  }

  return $media_items;
}

/**
 * Create media.
 *
 * @param string $media_name
 *   The media name.
 * @param string $file_name
 *   The file name.
 * @param string $image_path
 *   The path or url to the image.
 *
 * @return \Drupal\media\Entity\Media
 *   The media entity.
 */
function _drupalx_graphql_create_media($media_name, $file_name, $image_path) {
  $data = file_get_contents($image_path);
  $file = \Drupal::service('file.repository')->writeData($data, 'public://' . $file_name);
  $media = Media::create([
    'bundle' => 'image',
    'name' => $media_name,
    'field_image' => [
      'target_id' => $file->id(),
      'alt' => $media_name,
      'title' => $media_name,
    ],
  ]);

  $media->save();

  return $media;
}

/**
 * Get media items.
 *
 * @return array
 *   The array of media items.
 */
function _drupalx_graphql_get_media(): array {
  $media_names = [
    'card' => 'card.jpg',
    'bootstrap' => 'bootstrap.svg',
    'storybook' => 'storybook.svg',
    'bootswatch' => 'bootswatch.svg',
    'quote-logo' => 'quote-logo.svg',
    'quote-thumb' => 'dries.jpg',
  ];

  $media_items = [];
  foreach ($media_names as $media_name => $file_name) {
    $media_items[$media_name] = current(\Drupal::entityTypeManager()
      ->getStorage('media')
      ->loadByProperties(['name' => $media_name]));
  }

  return $media_items;
}
