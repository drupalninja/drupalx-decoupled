#!/usr/bin/env php
<?php

/**
 * @file
 * Creates a landing page with all components from the original YAML.
 */

use Drupal\node\Entity\Node;
use Drupal\paragraphs\Entity\Paragraph;
use Drupal\media\Entity\Media;
use Drupal\file\Entity\File;

// Get images from the media library to use as placeholders.
$media_query = \Drupal::entityQuery('media')
  ->condition('bundle', 'image')
  ->range(0, 2)
  ->accessCheck(FALSE)
  ->execute();

if (empty($media_query)) {
  echo "Error: No media items found. Please ensure there are images in the media library.\n";
  exit(1);
}

$media_ids = array_values($media_query);
$image_media_id = $media_ids[0];
$logo_media_id = $media_ids[1] ?? $media_ids[0];

echo "Using media ID {$image_media_id} for images and {$logo_media_id} for logo.\n";

// Array to store all paragraphs.
$paragraphs = [];

// 1. Create hero paragraph.
$hero = Paragraph::create([
  'type' => 'hero',
  'field_heading' => [
    'value' => 'Example Layout',
    'format' => 'restricted_html',
  ],
  'field_hero_layout' => 'image_top',
  'field_media' => [
    'target_id' => $image_media_id,
  ],
  'field_summary' => [
    'value' => 'This is an example layout with various components.',
    'format' => 'basic_html',
  ],
]);
$hero->save();
$paragraphs[] = $hero;

// 2. Create sidebyside paragraph with features (stats items).
$stats_items = [];
$feature_titles = [
  'Decoupled Architecture',
  'AI Optimization',
];
$feature_summaries = [
  'Build flexible applications that separate the front-end and back-end for optimal performance.',
  'Leverage intelligent algorithms to enhance site speed and user experience effortlessly.',
];

foreach ($feature_titles as $key => $title) {
  $stats_item = Paragraph::create([
    'type' => 'stats_item',
    'field_icon' => 'box',
    'field_title' => $title,
    'field_summary' => [
      'value' => $feature_summaries[$key],
    ],
  ]);
  $stats_item->save();
  $stats_items[] = $stats_item;
}

$sidebyside1 = Paragraph::create([
  'type' => 'sidebyside',
  'field_eyebrow' => 'DrupalX Features',
  'field_features' => array_map(function ($item) {
    return [
      'target_id' => $item->id(),
      'target_revision_id' => $item->getRevisionId(),
    ];
  }, $stats_items),
  'field_link' => [
    'uri' => 'internal:/features',
    'title' => 'Explore features',
  ],
  'field_media' => [
    'target_id' => $image_media_id,
  ],
  'field_sidebyside_layout' => 'right',
  'field_summary' => [
    'value' => '<p>The DrupalX template offers top-tier development tools and components for building a site quickly and efficiently.</p>',
    'format' => 'basic_html',
  ],
  'field_title' => 'DrupalX Rapid Development',
]);
$sidebyside1->save();
$paragraphs[] = $sidebyside1;

// 3. Create another sidebyside paragraph.
$sidebyside2 = Paragraph::create([
  'type' => 'sidebyside',
  'field_eyebrow' => 'DrupalX Content',
  'field_link' => [
    'uri' => 'internal:/resources',
    'title' => 'Read DrupalX articles',
  ],
  'field_media' => [
    'target_id' => $image_media_id,
  ],
  'field_sidebyside_layout' => 'left',
  'field_summary' => [
    'value' => '<p>DrupalX provides a user-friendly editing experience with fully integrated layout builder components for seamless content management.</p>',
    'format' => 'basic_html',
  ],
  'field_title' => 'DrupalX Content Management',
]);
$sidebyside2->save();
$paragraphs[] = $sidebyside2;

// 4. Create centered text paragraph.
$text_centered = Paragraph::create([
  'type' => 'text',
  'field_body' => [
    'value' => 'The DrupalX documentation provides detailed information on how to use the DrupalX template and its components.',
    'format' => 'full_html',
  ],
  'field_eyebrow' => 'Test eyebrow',
  'field_link' => [
    'uri' => 'internal:/documentation',
    'title' => 'Link 1',
  ],
  'field_link2' => [
    'uri' => 'internal:/',
    'title' => 'Link 2',
  ],
  'field_text_layout' => 'centered',
  'field_title' => 'Centered Text',
]);
$text_centered->save();
$paragraphs[] = $text_centered;

// 5. Create left-aligned text paragraph.
$text_left = Paragraph::create([
  'type' => 'text',
  'field_body' => [
    'value' => 'The DrupalX documentation provides detailed information on how to use the DrupalX template and its components.',
    'format' => 'full_html',
  ],
  'field_eyebrow' => 'Test eyebrow',
  'field_link' => [
    'uri' => 'internal:/documentation',
    'title' => 'Read documentation',
  ],
  'field_link2' => [
    'uri' => 'internal:/',
    'title' => 'Link 2',
  ],
  'field_text_layout' => 'left',
  'field_title' => 'Left-aligned Text',
]);
$text_left->save();
$paragraphs[] = $text_left;

// 6. Create media paragraph.
$media_paragraph = Paragraph::create([
  'type' => 'media',
  'field_media' => [
    'target_id' => $image_media_id,
  ],
  'field_title' => 'DrupalX Media',
]);
$media_paragraph->save();
$paragraphs[] = $media_paragraph;

// 7. Create gallery paragraph.
$gallery = Paragraph::create([
  'type' => 'gallery',
  'field_body' => [
    'value' => 'View images of the DrupalX template and its components.',
    'format' => '',
    'summary' => 'basic_html',
  ],
  'field_media_item' => array_fill(0, 8, ['target_id' => $image_media_id]),
  'field_title' => 'DrupalX Gallery',
]);
$gallery->save();
$paragraphs[] = $gallery;

// 8. Create carousel items.
$carousel_items = [];
$carousel_titles = [
  'DrupalX Carousel Item 1',
  'DrupalX Carousel Item 2',
  'DrupalX Carousel Item 3',
];
$carousel_summaries = [
  'This is the first carousel item.',
  'This is the second carousel item.',
  'This is the third carousel item.',
];

foreach ($carousel_titles as $key => $title) {
  $carousel_item = Paragraph::create([
    'type' => 'carousel_item',
    'field_media' => [
      'target_id' => $image_media_id,
    ],
    'field_summary' => [
      'value' => $carousel_summaries[$key],
    ],
    'field_title' => $title,
  ]);
  $carousel_item->save();
  $carousel_items[] = $carousel_item;
}

// Create carousel paragraph.
$carousel = Paragraph::create([
  'type' => 'carousel',
  'field_carousel_item' => array_map(function ($item) {
    return [
      'target_id' => $item->id(),
      'target_revision_id' => $item->getRevisionId(),
    ];
  }, $carousel_items),
]);
$carousel->save();
$paragraphs[] = $carousel;

// 9. Create accordion items.
$accordion_items = [];
$accordion_titles = [
  'What is included with DrupalX?',
  'How much can I customize?',
  'Is DrupalX accessible?',
  'Can I see examples of other sites created with DrupalX?',
];
$accordion_bodies = [
  '<p>DrupalX includes pre-built Layout Builder blocks integrated with a starter theme built on Bootstrap 5. It also features Material Icons and is fully supported by Storybook, providing a comprehensive and cohesive development environment.</p>',
  '<p>Everything in DrupalX can be customized. You can adjust configurations, modify every Storybook component, and alter or remove any Bootstrap inclusion to suit your specific needs.</p>',
  '<p>Yes, DrupalX adheres to WCAG 2.0 AA accessibility guidelines.</p>',
  '<p>Of course. Explore how DrupalX can be used across various types of sites.</p>',
];

foreach ($accordion_titles as $key => $title) {
  $accordion_item = Paragraph::create([
    'type' => 'accordion_item',
    'field_title' => $title,
    'field_body' => [
      'value' => $accordion_bodies[$key],
      'format' => 'full_html',
    ],
  ]);

  // Add link to the last accordion item.
  if ($key === 3) {
    $accordion_item->set('field_link', [
      'uri' => 'internal:/resources',
      'title' => 'Read DrupalX articles',
    ]);
  }

  $accordion_item->save();
  $accordion_items[] = $accordion_item;
}

// Create accordion paragraph.
$accordion = Paragraph::create([
  'type' => 'accordion',
  'field_title' => 'DrupalX FAQ',
  'field_accordion_item' => array_map(function ($item) {
    return [
      'target_id' => $item->id(),
      'target_revision_id' => $item->getRevisionId(),
    ];
  }, $accordion_items),
]);
$accordion->save();
$paragraphs[] = $accordion;

// 10. Create quote paragraph.
$quote = Paragraph::create([
  'type' => 'quote',
  'field_author' => 'John Doe',
  'field_job_title' => 'Web Developer',
  'field_logo' => [
    'target_id' => $logo_media_id,
  ],
  'field_quote' => 'This is a quote from a satisfied DrupalX user.',
]);
$quote->save();
$paragraphs[] = $quote;

// 11. Create embed paragraph.
$embed = Paragraph::create([
  'type' => 'embed',
  'field_script' => [
    'value' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google Maps view of Mountain View, CA"></iframe>',
    'format' => 'scripts',
  ],
  'field_title' => 'DrupalX Embed',
]);
$embed->save();
$paragraphs[] = $embed;

// 12. Create newsletter paragraph.
$newsletter = Paragraph::create([
  'type' => 'newsletter',
  'field_summary' => [
    'value' => 'Sign up for the DrupalX newsletter to receive updates on new features and components.',
  ],
  'field_title' => 'DrupalX Newsletter',
]);
$newsletter->save();
$paragraphs[] = $newsletter;

// 13. Create views paragraph.
$views = Paragraph::create([
  'type' => 'views',
  'field_title' => 'DrupalX Resources',
  'field_views_ref' => [
    'target_id' => 'recent_cards',
    'display_id' => 'article_cards',
    'arguments' => '',
    'items_to_display' => '',
  ],
]);
$views->save();
$paragraphs[] = $views;

// 14. Create card items.
$card_items = [];
for ($i = 1; $i <= 3; $i++) {
  $card = Paragraph::create([
    'type' => 'card',
    'field_title' => "Card {$i}",
    'field_summary' => [
      'value' => 'This is an example card component.',
      'format' => $i === 1 ? '' : 'basic_html',
    ],
    'field_media' => [
      'target_id' => $image_media_id,
    ],
    'field_link' => [
      'uri' => 'internal:/',
      'title' => 'Read more',
    ],
  ]);
  $card->save();
  $card_items[] = $card;
}

// Create card group paragraph.
$card_group = Paragraph::create([
  'type' => 'card_group',
  'field_title' => 'Card Group',
  'field_card' => array_map(function ($item) {
    return [
      'target_id' => $item->id(),
      'target_revision_id' => $item->getRevisionId(),
    ];
  }, $card_items),
]);
$card_group->save();
$paragraphs[] = $card_group;

// 15. Create stats items.
$stats_items2 = [];
for ($i = 1; $i <= 3; $i++) {
  $stats_item = Paragraph::create([
    'type' => 'stats_item',
    'field_title' => "Stat {$i}",
    'field_summary' => [
      'value' => 'This is an example stats component.',
    ],
    'field_icon' => 'home',
  ]);
  $stats_item->save();
  $stats_items2[] = $stats_item;
}

// Create stats group paragraph.
$stats_group = Paragraph::create([
  'type' => 'card_group',
  'field_title' => 'Stats Group',
  'field_card' => array_map(function ($item) {
    return [
      'target_id' => $item->id(),
      'target_revision_id' => $item->getRevisionId(),
    ];
  }, $stats_items2),
]);
$stats_group->save();
$paragraphs[] = $stats_group;

// 16. Create bullet items.
$bullet_items = [];
$bullet_summaries = [
  '<p>Streamlined workflows for faster project delivery.</p>',
  '<p>Robust features that adapt to your needs.</p>',
  '<p>User-friendly interface for all skill levels.</p>',
];

foreach ($bullet_summaries as $summary) {
  $bullet = Paragraph::create([
    'type' => 'bullet',
    'field_icon' => 'box',
    'field_summary' => [
      'value' => $summary,
      'format' => 'basic_html',
    ],
  ]);
  $bullet->save();
  $bullet_items[] = $bullet;
}

// Create sidebyside with bullets.
$sidebyside3 = Paragraph::create([
  'type' => 'sidebyside',
  'field_features' => array_map(function ($item) {
    return [
      'target_id' => $item->id(),
      'target_revision_id' => $item->getRevisionId(),
    ];
  }, $bullet_items),
  'field_media' => [
    'target_id' => $image_media_id,
  ],
  'field_sidebyside_layout' => 'right',
  'field_summary' => [
    'value' => '<p>At DrupalX, we empower developers with cutting-edge tools designed for efficiency and creativity. Experience seamless integration and unparalleled performance that elevate your web projects.</p>',
    'format' => 'basic_html',
  ],
  'field_title' => "Discover the Future of Web Development with DrupalX's Innovative Tools",
]);
$sidebyside3->save();
$paragraphs[] = $sidebyside3;

// Create the landing page node.
$node = Node::create([
  'type' => 'landing',
  'title' => 'DrupalX Components List',
  'status' => TRUE,
  'uid' => 1,
  'promote' => FALSE,
  'sticky' => FALSE,
  'path' => [
    'alias' => '/components',
    'pathauto' => 0,
  ],
  'field_content' => array_map(function ($paragraph) {
    return [
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ];
  }, $paragraphs),
  'field_hide_page_title' => TRUE,
  'metatag' => [
    [
      'tag' => 'meta',
      'attributes' => [
        'name' => 'title',
        'content' => 'DrupalX Components List | Drush Site-Install',
      ],
    ],
    [
      'tag' => 'link',
      'attributes' => [
        'rel' => 'canonical',
        'href' => '/components',
      ],
    ],
  ],
]);

try {
  $node->save();
  echo "Successfully created landing page with ID: {$node->id()}\n";
  echo "View the page at: /node/{$node->id()}\n";
  echo "Or at the alias: /components\n";
  echo "Total paragraphs created: " . count($paragraphs) . "\n";
}
catch (Exception $e) {
  echo "Error creating landing page: {$e->getMessage()}\n";
}
