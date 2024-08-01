<?php

/**
 * @file
 * DrupalX GraphQL Paragraphs include.
 */

use Drupal\paragraphs\Entity\Paragraph;

/**
 * Create a Hero paragraph.
 *
 * @param array $info
 *   The hero info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The Hero paragraph.
 */
function _drupalx_graphql_create_hero_paragraph(array $info = [], array $media_items = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'hero',
    'field_media' => [
      'target_id' => !empty($media_items[$info['media']]) ? $media_items[$info['media']]->id() : $media_items['card']->id(),
    ],
    'field_hero_layout' => $info['layout'] ?? 'image_top',
  ]);

  if (!empty($info['heading'])) {
    $paragraph->set('field_heading', [
      'value' => $info['heading'],
      'format' => 'restricted_html',
    ]);
  }

  if (!empty($info['summary'])) {
    $paragraph->set('field_summary', [
      'value' => $info['summary'],
      'format' => 'basic_html',
    ]);
  }

  if (!empty($info['link'])) {
    $paragraph->set('field_link', [
      'uri' => $info['link']['uri'],
      'title' => $info['link']['title'],
    ]);
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Card Group paragraph.
 *
 * @param array $info
 *   The card group info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The Card Group paragraph.
 */
function _drupalx_graphql_create_card_group_paragraph(array $info = [], array $media_items = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'card_group',
    'field_title' => $info['title'],
  ]);

  foreach ($info['items'] as $info) {
    $card_paragraph = Paragraph::create([
      'type' => 'stats_item',
      'field_title' => $info['title'],
      'field_summary' => $info['summary'],
    ]);

    if (!empty($info['custom_icon'])) {
      $card_paragraph->set('field_custom_icon', [
        'target_id' => $media_items[$info['custom_icon']]->id(),
      ]);
    }

    if (!empty($info['icon'])) {
      $card_paragraph->set('field_icon', $info['icon']);
    }

    $card_paragraph->save();
    $paragraph->field_card[] = [
      'target_id' => $card_paragraph->id(),
      'target_revision_id' => $card_paragraph->getRevisionId(),
    ];
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Side-by-side paragraph.
 *
 * @param array $info
 *   The paragraph info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_sidebyside_paragraph(array $info = [], array $media_items = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'sidebyside',
    'field_title' => $info['title'],
    'field_eyebrow' => !empty($info['eyebrow']) ? $info['eyebrow'] : '',
    'field_summary' => $info['summary'] ?? '',
    'field_sidebyside_layout' => $info['layout'] ?? 'left',
  ]);

  if (!empty($info['media'])) {
    $paragraph->set('field_media', [
      'target_id' => isset($media_items[$info['media']]) ? $media_items[$info['media']]->id() : $media_items['card']->id(),
    ]);
  }

  if (!empty($info['link'])) {
    $paragraph->set('field_link', [
      'uri' => $info['link']['uri'],
      'title' => $info['link']['title'],
    ]);
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Text paragraph.
 *
 * @param array $info
 *   The paragraph info.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_text_paragraph(array $info = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'text',
    'field_title' => $info['title'],
    'field_body' => [
      'value' => $info['body'],
      'format' => 'full_html',
    ],
    'field_link' => [
      'uri' => $info['link']['uri'],
      'title' => $info['link']['title'],
    ],
  ]);
  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Media paragraph.
 *
 * @param array $info
 *   The paragraph info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_media_paragraph(array $info = [], array $media_items = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'media',
    'field_title' => $info['title'],
    'field_media' => $media_items[$info['media']] ?? $media_items['card'],
  ]);
  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Gallery paragraph.
 *
 * @param array $info
 *   The paragraph info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_gallery_paragraph(array $info = [], array $media_items = []): Paragraph {
  $gallery_items = array_fill(0, 8, $media_items[$info['media']] ?? $media_items['card']);

  $paragraph = Paragraph::create([
    'type' => 'gallery',
    'field_body' => $info['body'],
    'field_title' => $info['title'],
    'field_media_item' => $gallery_items,
  ]);
  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Carousel paragraph.
 *
 * @param array $info
 *   The paragraph info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_carousel_paragraph(array $info = [], array $media_items = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'carousel',
  ]);

  foreach ($info['items'] as $item) {
    $carousel_item = Paragraph::create([
      'type' => 'carousel_item',
      'field_title' => $item['title'],
      'field_media' => $media_items[$item['thumb']] ?? $media_items['card'],
      'field_summary' => $item['summary'],
    ]);
    $carousel_item->save();
    $paragraph->field_carousel_item[] = [
      'target_id' => $carousel_item->id(),
      'target_revision_id' => $carousel_item->getRevisionId(),
    ];
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create an Accordion paragraph.
 *
 * @param array $info
 *   The paragraph info.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_accordion_paragraph(array $info = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'accordion',
    'field_title' => $info['title'],
  ]);

  foreach ($info['items'] as $heading => $info) {
    $accordion_item = Paragraph::create([
      'type' => 'accordion_item',
      'field_title' => $heading,
      'field_body' => [
        'value' => '<p>' . $info['answer'] . '</p>',
        'format' => 'full_html',
      ],
      'field_link' => $info['link'] ?? NULL,
    ]);
    $accordion_item->save();
    $paragraph->field_accordion_item[] = [
      'target_id' => $accordion_item->id(),
      'target_revision_id' => $accordion_item->getRevisionId(),
    ];
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Quote paragraph.
 *
 * @param array $info
 *   The paragraph info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_quote_paragraph(array $info = [], array $media_items = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'quote',
    'field_quote' => $info['quote'],
    'field_author' => $info['author'],
    'field_job_title' => $info['job'],
  ]);

  if (!empty($info['logo'])) {
    $paragraph->set('field_logo', [
      'target_id' => $media_items[$info['logo']]->id(),
    ]);
  }
  if (!empty($info['thumb'])) {
    $paragraph->set('field_thumb', [
      'target_id' => $media_items[$info['thumb']]->id(),
    ]);
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create an Embed paragraph.
 *
 * @param array $info
 *   The paragraph info.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_embed_paragraph(array $info = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'embed',
    'field_script' => [
      'value' => $info['script'],
      'format' => 'scripts',
    ],
  ]);
  if ($info['title']) {
    $paragraph->set('field_title', [
      'value' => $info['title'],
    ]);
  }

  $paragraph->save();
  return $paragraph;
}

/**
 * Create a Newsletter paragraph.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_newsletter_paragraph(): Paragraph {
  // Create Newsletter paragraph.
  $paragraph = Paragraph::create([
    'type' => 'newsletter',
  ]);

  $paragraph->save();
  return $paragraph;
}

/**
 * Create an Articles paragraph.
 *
 * @param array $info
 *   The paragraph info.
 *
 * @return \Drupal\paragraphs\Entity\Paragraph
 *   The created paragraph entity.
 */
function _drupalx_graphql_create_articles_paragraph(array $info = []): Paragraph {
  $paragraph = Paragraph::create([
    'type' => 'views',
    'field_views_ref' => [
      'target_id' => 'recent_cards',
      'display_id' => 'article_cards',
    ],
  ]);

  if (!empty($info['title'])) {
    $paragraph->set('field_title', [
      'value' => $info['title'],
    ]);
  }

  $paragraph->save();
  return $paragraph;
}
