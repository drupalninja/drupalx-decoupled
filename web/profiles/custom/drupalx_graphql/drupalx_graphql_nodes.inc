<?php

/**
 * @file
 * DrupalX GraphQL Node include.
 */

use Drupal\node\Entity\Node;

// Include paragraph demo content functions.
include 'drupalx_graphql_paragraphs.inc';

/**
 * Get sample layout homepage node info.
 *
 * @return array
 *   The layout homepage node info.
 */
function _drupalx_graphql_create_layout_page(): array {

  $node_info = [
    'title' => 'Kitchen Sink Layout',
    'content' => [
      [
        'type' => 'hero',
        'media' => 'card',
        'heading' => 'Example Layout',
        'summary' => 'This is an example layout with various components.',
        'layout' => 'image_top',
      ],
      [
        'type' => 'card_group',
        'title' => 'Discover DrupalX',
        'items' => [
          [
            'title' => 'Storybook.js',
            'summary' => 'Learn how Storybook integration allows you to develop and test UI components in isolation.',
            'link' => [
              'uri' => 'https://storybook.js.org/',
              'title' => 'Learn more',
            ],
            'media' => 'card',
          ],
          [
            'title' => 'Bootstrap 5',
            'summary' => 'Explore the latest features and components in the Bootstrap 5 framework.',
            'link' => [
              'uri' => 'https://getbootstrap.com/',
              'title' => 'Explore Bootstrap',
            ],
            'media' => 'card',
          ],
          [
            'title' => 'Material Icons',
            'summary' => 'Discover the Material Icons library and how it can enhance your site design.',
            'link' => [
              'uri' => 'https://fonts.google.com/icons',
              'title' => 'View icons',
            ],
            'media' => 'card',
          ],
        ],
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX Rapid Development',
        'eyebrow' => 'DrupalX Features',
        'link' => [
          'uri' => 'internal:/features',
          'title' => 'Explore features',
        ],
        'summary' => 'The DrupalX template offers top-tier development tools and components for building a site quickly and efficiently.',
        'layout' => 'right',
        'media' => 'card',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX Content Management',
        'eyebrow' => 'DrupalX Content',
        'link' => [
          'uri' => 'internal:/articles',
          'title' => 'Read DrupalX articles',
        ],
        'summary' => 'DrupalX provides a user-friendly editing experience with fully integrated layout builder components for seamless content management.',
        'layout' => 'left',
        'media' => 'card',
      ],
      [
        'type' => 'text',
        'title' => 'DrupalX Documentation',
        'body' => 'The DrupalX documentation provides detailed information on how to use the DrupalX template and its components.',
        'link' => [
          'uri' => 'internal:/documentation',
          'title' => 'Read documentation',
        ],
      ],
      [
        'type' => 'carousel',
        'items' => [
          [
            'title' => 'DrupalX Carousel Item 1',
            'thumb' => 'card',
            'summary' => 'This is the first carousel item.',
          ],
          [
            'title' => 'DrupalX Carousel Item 2',
            'thumb' => 'card',
            'summary' => 'This is the second carousel item.',
          ],
          [
            'title' => 'DrupalX Carousel Item 3',
            'thumb' => 'card',
            'summary' => 'This is the third carousel item.',
          ],
        ],
      ],
      [
        'type' => 'accordion',
        'title' => 'DrupalX Accordion',
        'items' => [
          'What is included with DrupalX?' => [
            'answer' => 'DrupalX includes pre-built Layout Builder blocks integrated with a starter theme built on Bootstrap 5. It also features Material Icons and is fully supported by Storybook, providing a comprehensive and cohesive development environment.',
          ],
          'How much can I customize?' => [
            'answer' => 'Everything in DrupalX can be customized. You can adjust configurations, modify every Storybook component, and alter or remove any Bootstrap inclusion to suit your specific needs.',
          ],
          'Is DrupalX accessible?' => [
            'answer' => 'Yes, DrupalX adheres to WCAG 2.0 AA accessibility guidelines.',
          ],
          'Can I see examples of other sites created with DrupalX?' => [
            'answer' => 'Of course. Explore how DrupalX can be used across various types of sites.',
            'link' => [
              'uri' => 'internal:/articles',
              'title' => 'Read DrupalX articles',
            ],
          ],
        ],
      ],
      [
        'type' => 'quote',
        'quote' => 'This is a quote from a satisfied DrupalX user.',
        'author' => 'John Doe',
        'job' => 'Web Developer',
        'thumb' => 'quote-thumb',
      ],
      [
        'type' => 'embed',
        'title' => 'DrupalX Embed',
        'script' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      ],
      [
        'type' => 'newsletter',
        'title' => 'DrupalX Newsletter',
        'summary' => 'Sign up for the DrupalX newsletter to receive updates on new features and components.',
      ],
      [
        'type' => 'articles',
        'title' => 'DrupalX Articles',
      ],
    ],
  ];

  return $node_info;
}

/**
 * Get layout homepage node info.
 *
 * @return array
 *   The layout homepage node info.
 */
function _drupalx_graphql_create_layout_homepage(): array {

  $node_info = [
    'title' => 'DrupalX - The Enterprise CMS Starter',
    'path' => '/welcome',
    'content' => [
      [
        'type' => 'hero',
        'link' => [
          'uri' => 'https://drupalx-react.netlify.app/',
          'title' => 'See our demo',
        ],
        'media' => 'card',
        'heading' => 'The <strong>Ultimate</strong> CMS Starter Kit for <strong>Enterprise</strong> Developers',
        'summary' => '',
        'layout' => 'image_top',
      ],
      [
        'type' => 'card_group',
        'title' => 'Discover DrupalX',
        'items' => [
          [
            'title' => 'Storybook.js',
            'summary' => 'Learn how Storybook integration allows you to develop and test UI components in isolation.',
            'link' => [
              'uri' => 'https://storybook.js.org/',
              'title' => 'Learn more',
            ],
            'custom_icon' => 'storybook',
          ],
          [
            'title' => 'Bootstrap 5',
            'summary' => 'Explore the latest features and components in the Bootstrap 5 framework.',
            'link' => [
              'uri' => 'https://getbootstrap.com/',
              'title' => 'Explore Bootstrap',
            ],
            'custom_icon' => 'bootstrap',
          ],
          [
            'title' => 'Material Icons',
            'summary' => 'Discover the Material Icons library and how it can enhance your site design.',
            'link' => [
              'uri' => 'https://fonts.google.com/icons',
              'title' => 'View icons',
            ],
            'custom_icon' => 'bootswatch',
          ],
        ],
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX Rapid Development',
        'eyebrow' => 'DrupalX Features',
        'link' => [
          'uri' => 'internal:/features',
          'title' => 'Explore features',
        ],
        'summary' => 'The DrupalX template offers top-tier development tools and components for building a site quickly and efficiently.',
        'layout' => 'right',
        'media' => 'card',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX Content Management',
        'eyebrow' => 'DrupalX Content',
        'link' => [
          'uri' => 'internal:/articles',
          'title' => 'Read DrupalX articles',
        ],
        'summary' => 'DrupalX provides a user-friendly editing experience with fully integrated layout builder components for seamless content management.',
        'layout' => 'left',
        'media' => 'card',
      ],
      [
        'type' => 'quote',
        'logo' => 'quote-logo',
        'thumb' => 'quote-thumb',
        'quote' => 'Bringing people together under a shared passion is at the heart of what Drupal does',
        'author' => 'Dries Buytaert',
        'job' => 'Drupal Founder, Acquia CTO/Co-Founder',
      ],
      [
        'type' => 'accordion',
        'title' => 'DrupalX Accordion',
        'items' => [
          'What is included with DrupalX?' => [
            'answer' => 'DrupalX includes pre-built Layout Builder blocks integrated with a starter theme built on Bootstrap 5. It also features Material Icons and is fully supported by Storybook, providing a comprehensive and cohesive development environment.',
          ],
          'How much can I customize?' => [
            'answer' => 'Everything in DrupalX can be customized. You can adjust configurations, modify every Storybook component, and alter or remove any Bootstrap inclusion to suit your specific needs.',
          ],
          'Is DrupalX accessible?' => [
            'answer' => 'Yes, DrupalX adheres to WCAG 2.0 AA accessibility guidelines.',
          ],
          'Can I see examples of other sites created with DrupalX?' => [
            'answer' => 'Of course. Explore how DrupalX can be used across various types of sites.',
            'link' => [
              'uri' => 'internal:/articles',
              'title' => 'Read DrupalX articles',
            ],
          ],
        ],
      ],
    ],
  ];

  return $node_info;
}

/**
 * Create layout nodes.
 *
 * @param array $media_items
 *   The media items.
 */
function _drupalx_graphql_create_layout_nodes(array $media_items = []) {
  // Create Homepage node.
  $node_info = _drupalx_graphql_create_layout_homepage($media_items);

  _drupalx_graphql_create_layout($node_info, $media_items);

  $node_info = [
    'title' => 'Kitchen Sink Layout',
    'content' => [
      [
        'type' => 'hero',
        'media' => 'card',
        'heading' => 'Example Layout',
        'summary' => 'This is an example layout with various components.',
        'layout' => 'image_top',
      ],
      [
        'type' => 'card_group',
        'title' => 'Discover DrupalX',
        'items' => [
          [
            'title' => 'Storybook.js',
            'summary' => 'Learn how Storybook integration allows you to develop and test UI components in isolation.',
            'link' => [
              'uri' => 'https://storybook.js.org/',
              'title' => 'Learn more',
            ],
            'custom_icon' => 'storybook',
          ],
          [
            'title' => 'Bootstrap 5',
            'summary' => 'Explore the latest features and components in the Bootstrap 5 framework.',
            'link' => [
              'uri' => 'https://getbootstrap.com/',
              'title' => 'Explore Bootstrap',
            ],
            'custom_icon' => 'bootstrap',
          ],
          [
            'title' => 'Material Icons',
            'summary' => 'Discover the Material Icons library and how it can enhance your site design.',
            'link' => [
              'uri' => 'https://fonts.google.com/icons',
              'title' => 'View icons',
            ],
            'custom_icon' => 'bootswatch',
          ],
        ],
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX Rapid Development',
        'eyebrow' => 'DrupalX Features',
        'link' => [
          'uri' => 'internal:/features',
          'title' => 'Explore features',
        ],
        'summary' => 'The DrupalX template offers top-tier development tools and components for building a site quickly and efficiently.',
        'layout' => 'right',
        'media' => 'card',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX Content Management',
        'eyebrow' => 'DrupalX Content',
        'link' => [
          'uri' => 'internal:/articles',
          'title' => 'Read DrupalX articles',
        ],
        'summary' => 'DrupalX provides a user-friendly editing experience with fully integrated layout builder components for seamless content management.',
        'layout' => 'left',
        'media' => 'card',
      ],
      [
        'type' => 'text',
        'title' => 'DrupalX Documentation',
        'body' => 'The DrupalX documentation provides detailed information on how to use the DrupalX template and its components.',
        'link' => [
          'uri' => 'internal:/documentation',
          'title' => 'Read documentation',
        ],
      ],
      [
        'type' => 'media',
        'title' => 'DrupalX Media',
        'media' => 'card',
      ],
      [
        'type' => 'gallery',
        'title' => 'DrupalX Gallery',
        'body' => 'View images of the DrupalX template and its components.',
        'gallery' => array_fill(0, 8, 'card'),
      ],
      [
        'type' => 'carousel',
        'items' => [
          [
            'title' => 'DrupalX Carousel Item 1',
            'thumb' => 'card',
            'summary' => 'This is the first carousel item.',
          ],
          [
            'title' => 'DrupalX Carousel Item 2',
            'thumb' => 'card',
            'summary' => 'This is the second carousel item.',
          ],
          [
            'title' => 'DrupalX Carousel Item 3',
            'thumb' => 'card',
            'summary' => 'This is the third carousel item.',
          ],
        ],
      ],
      [
        'type' => 'accordion',
        'title' => 'DrupalX Accordion',
        'items' => [
          'What is included with DrupalX?' => [
            'answer' => 'DrupalX includes pre-built Layout Builder blocks integrated with a starter theme built on Bootstrap 5. It also features Material Icons and is fully supported by Storybook, providing a comprehensive and cohesive development environment.',
          ],
          'How much can I customize?' => [
            'answer' => 'Everything in DrupalX can be customized. You can adjust configurations, modify every Storybook component, and alter or remove any Bootstrap inclusion to suit your specific needs.',
          ],
          'Is DrupalX accessible?' => [
            'answer' => 'Yes, DrupalX adheres to WCAG 2.0 AA accessibility guidelines.',
          ],
          'Can I see examples of other sites created with DrupalX?' => [
            'answer' => 'Of course. Explore how DrupalX can be used across various types of sites.',
            'link' => [
              'uri' => 'internal:/articles',
              'title' => 'Read DrupalX articles',
            ],
          ],
        ],
      ],
      [
        'type' => 'quote',
        'logo' => 'quote-logo',
        'thumb' => 'quote-thumb',
        'quote' => 'This is a quote from a satisfied DrupalX user.',
        'author' => 'John Doe',
        'job' => 'Web Developer',
      ],
      [
        'type' => 'embed',
        'title' => 'DrupalX Embed',
        'script' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Google Maps view of Mountain View, CA"></iframe>',
      ],
      [
        'type' => 'newsletter',
        'title' => 'DrupalX Newsletter',
        'summary' => 'Sign up for the DrupalX newsletter to receive updates on new features and components.',
      ],
      [
        'type' => 'articles',
        'title' => 'DrupalX Articles',
      ],
    ],
    'path' => '/kitchen-sink',
  ];

  _drupalx_graphql_create_layout($node_info, $media_items);

  // Create Contact us page node.
  $node_info = [
    'title' => 'Contact Us',
    'content' => [
      [
        'type' => 'hero',
        'media' => 'card',
        'heading' => 'Contact Us',
        'summary' => 'Have a question about DrupalX? We\'re here to help! Drop us a message and we\'ll get back to you soon.',
        'layout' => 'image_top',
      ],
      [
        'type' => 'embed',
        'title' => 'Contact Us',
        'script' => '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50704.05332036616!2d-122.12246645666515!3d37.413396126075966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb7495bec0189%3A0x7c17d44a466baf9b!2sMountain%20View%2C%20CA!5e0!3m2!1sen!2sus!4v1716313314254!5m2!1sen!2sus" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
      ],
    ],
    'path' => '/contact',
  ];

  _drupalx_graphql_create_layout($node_info, $media_items);

  // Create Features layout node.
  $node_info = [
    'title' => 'Features',
    'content' => [
      [
        'type' => 'hero',
        'media' => 'card',
        'heading' => 'DrupalX Features',
        'summary' => '<p>DrupalX is a comprehensive system that provides a robust starting point for designers and developers to fully customize components.</p>',
        'layout' => 'image_bottom',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'Ultimate Flexibility',
        'eyebrow' => 'Customizable Components',
        'summary' => 'Each component in DrupalX is fully customizable, allowing you to create a unique site tailored to your organization\'s needs.',
        'layout' => 'right',
        'media' => 'card',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'Easy Content Management',
        'eyebrow' => 'User-Friendly Editing',
        'summary' => 'Utilize over a dozen built-in layout builder components for seamless content management, powered by Bootstrap 5.',
        'layout' => 'left',
        'media' => 'card',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'Accessibility First',
        'eyebrow' => 'WCAG 2.0 AA Standard',
        'summary' => 'Our solution adheres to WCAG 2.0 AA accessibility guidelines out of the box, ensuring an inclusive experience.',
        'layout' => 'right',
        'media' => 'card',
      ],
    ],
    'path' => '/features',
  ];

  _drupalx_graphql_create_layout($node_info, $media_items);

  // Create Get Started layout node.
  $node_info = [
    'title' => 'Get Started',
    'content' => [
      [
        'type' => 'hero',
        'media' => 'card',
        'heading' => "Get Started",
        'summary' => 'Whether you\'re a designer or a developer, DrupalX provides the perfect foundation to start customizing to your specific needs.',
        'layout' => 'image_bottom',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX for Designers',
        'eyebrow' => 'Bootstrap UI Kits',
        'summary' => 'Leverage a variety of Figma community templates built on Bootstrap 5 to jumpstart your design process.',
        'layout' => 'right',
        'link' => [
          'uri' => 'https://www.figma.com/community/search?resource_type=mixed&sort_by=relevancy&query=bootstrap+5&editor_type=all&price=all&creators=all',
          'title' => 'Browse Figma UI kits',
        ],
        'media' => 'card',
      ],
      [
        'type' => 'sidebyside',
        'title' => 'DrupalX for Developers',
        'eyebrow' => 'Project Template',
        'summary' => 'Visit our GitHub repository to download the DrupalX project template and start building your site today.',
        'layout' => 'left',
        'link' => [
          'uri' => 'https://github.com/drupalninja/drupalx-graphql',
          'title' => 'Find out more',
        ],
        'media' => 'card',
      ],
    ],
    'path' => '/get-started',
  ];

  _drupalx_graphql_create_layout($node_info, $media_items);

  // Create Articles layout node.
  $node_info = [
    'title' => 'Articles',
    'content' => [
      [
        'type' => 'hero',
        'media' => 'card',
        'heading' => 'DrupalX Articles',
        'layout' => 'image_top',
      ],
      [
        'type' => 'articles',
      ],
    ],
    'path' => '/articles',
  ];

  _drupalx_graphql_create_layout($node_info, $media_items);
}

/**
 * Create a layout node with content.
 *
 * @param array $node_info
 *   The layout node info.
 * @param array $media_items
 *   The media items.
 *
 * @return \Drupal\node\Entity\Node
 *   The layout node.
 */
function _drupalx_graphql_create_layout($node_info, $media_items): Node {

  $node = Node::create([
    'type' => 'layout',
    'title' => $node_info['title'],
    'field_hide_page_title' => TRUE,
    'uid' => 1,
    'status' => 1,
  ]);

  if (!empty($node_info['path'])) {
    $node->set('path', [
      'alias' => $node_info['path'],
      'pathauto' => 0,
    ]);
  }

  $paragraphs = [];

  foreach ($node_info['content'] as $paragraph_info) {
    $function = '_drupalx_graphql_create_' . $paragraph_info['type'] . '_paragraph';
    if (function_exists($function)) {
      $paragraph = $function($paragraph_info, $media_items);
      if (!empty($paragraph)) {
        $paragraphs[] = $paragraph;
      }
    }
  }

  // Add paragraphs to field_content.
  foreach ($paragraphs as $paragraph) {
    $node->field_content[] = [
      'target_id' => $paragraph->id(),
      'target_revision_id' => $paragraph->getRevisionId(),
    ];
  }

  $node->save();

  return $node;
}

/**
 * Create article nodes.
 *
 * @param array $media_items
 *   The media items.
 * @param array $tag_ids
 *   The tag ids.
 */
function _drupalx_graphql_create_article_nodes($media_items, $tag_ids) {
  $titles = [
    'Article title 1',
    'Article title 2',
    'Article title 3',
    'Article title 4',
    'Article title 5',
    'Article title 6',
  ];

  foreach ($titles as $title) {
    $node = Node::create([
      'type' => 'article',
      'title' => $title,
      'uid' => 1,
      'status' => 1,
      'promote' => 1,
      'sticky' => 1,
      'field_subhead' => 'Why DrupalX',
      'field_media' => $media_items['card'],
      'field_thumbnail' => $media_items['card'],
      'field_tags' => [
        ['target_id' => $tag_ids[1]],
        ['target_id' => $tag_ids[2]],
      ],
      'field_summary' => 'Lorem ipsum dolor sit amet consectetur. Congue vel sagittis eu ullamcorper vel. Et et dui est ante tempor egestas pellentesque odio. Ornare erat lacus commodo porttitor ut enim. Ultricies mauris blandit in fermentum fringilla mollis risus ut.',
      'field_lead' => [
        'value' => '<p>Lorem ipsum dolor sit amet consectetur. Congue vel sagittis eu ullamcorper vel. Et et dui est ante tempor egestas pellentesque odio. Ornare erat lacus commodo porttitor ut enim. Ultricies mauris blandit in fermentum fringilla mollis risus ut. Nam eget eu suspendisse ut fermentum nascetur pretium lectus. Odio amet amet nam viverra hendrerit diam et. Nibh nunc in senectus odio tempor vitae id. Sit ut sit porta nisl enim.</p>',
        'format' => 'full_html',
      ],
      'body' => [
        'value' => '<h2>Lorem ipsum dolor sit amet</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <p>&nbsp;</p>
          <h3>Vestibulum ante ipsum primis</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <drupal-media data-align="center" data-caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." data-entity-type="media" data-entity-uuid="' . $media_items['card']->uuid() . '" data-view-mode=""></drupal-media>
          <h3>Curabitur vel sem sit amet</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <drupal-media data-align="center" data-caption="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat." data-entity-type="media" data-entity-uuid="' . $media_items['card']->uuid() . '" data-view-mode=""></drupal-media>',
        'format' => 'full_html',
      ],
    ]);
    $node->save();
  }
}

/**
 * Create page nodes.
 *
 * @param array $media_items
 *   The media items.
 */
function _drupalx_graphql_create_page_nodes(array $media_items = []) {
  // Create 404 page.
  $node = Node::create([
    'type' => 'page',
    'title' => 'Oops! Page not found',
    'uid' => 1,
    'status' => 1,
    'promote' => 1,
    'sticky' => 1,
    'body' => [
      'value' => "<p>We're sorry, but the page you requested could not be found. Please check the URL and try again, or click the button below to return to the homepage.</p>
      <a href=\"/\">Return to homepage</a>",
      'format' => 'full_html',
    ],
    'path' => [
      'alias' => '/page-not-found',
      'pathauto' => 0,
    ],
  ]);

  $node->save();

  // Create 403 page.
  $node = Node::create([
    'type' => 'page',
    'title' => 'Access denied',
    'uid' => 1,
    'status' => 1,
    'promote' => 1,
    'sticky' => 1,
    'body' => [
      'value' => "<p>We're sorry, but you do not have permission to access this page. Please contact the site administrator if you believe this is an error, or click the button below to return to the homepage.</p>
      <a href=\"/\">Return to homepage</a>",
      'format' => 'full_html',
    ],
    'path' => [
      'alias' => '/access-denied',
      'pathauto' => 0,
    ],
  ]);

  $node->save();

  // Create Privacy page.
  $node = Node::create([
    'type' => 'page',
    'title' => 'Privacy Policy',
    'uid' => 1,
    'status' => 1,
    'promote' => 1,
    'sticky' => 1,
    'field_media' => [
      'target_id' => $media_items['card']->id(),
    ],
    'body' => [
      'value' => '<p>This Privacy Policy describes how we collect, use, and disclose information about you when you use our website and any related services (collectively, the "Services").</p>
      <p>&nbsp;</p>
      <h3>Information We Collect</h3>
      <p>We may collect information about you when you use our Services, including:</p>
      <ul>
        <li>Information you provide to us, such as your name, email address, and other contact information.</li>
        <li>Information we collect automatically, such as your IP address, browser type, and device type.</li>
        <li>Information we collect from third-party sources, such as social media platforms and marketing partners.</li>
      </ul>
      <p>&nbsp;</p>
      <h3>How We Use Your Information</h3>
      <p>We may use your information to:</p>
      <ul>
        <li>Provide and improve our Services.</li>
        <li>Respond to your inquiries and requests.</li>
        <li>Send you marketing communications.</li>
        <li>Comply with our legal and regulatory obligations.</li>
      </ul>
      <p>We may also share your information with third parties for the purposes described in this Privacy Policy.</p>
      <p>&nbsp;</p>
      <h3>How We Protect Your Information</h3>
      <p>We take reasonable measures to protect your information from unauthorized access, use, and disclosure. However, no method of transmission over the internet or electronic storage is completely secure, and we cannot guarantee absolute security.</p>
      <p>&nbsp;</p>
      <h3>Your Choices</h3>
      <p>You may have certain rights and choices with respect to your information, such as the right to access and correct your information. Please contact us using the information below if you have any questions or would like to exercise your rights.</p>
      <p>&nbsp;</p>
      <h3>Contact Us</h3>
      <p>If you have any questions or concerns about our Privacy Policy, please <a href="/contact-us">contact us</a>.</p>',
      'format' => 'full_html',
    ],
    'path' => [
      'alias' => '/privacy',
      'pathauto' => 0,
    ],
  ]);

  $node->save();

  // Create Terms of Use page.
  $node = Node::create([
    'type' => 'page',
    'title' => 'Terms of Use',
    'uid' => 1,
    'status' => 1,
    'promote' => 1,
    'sticky' => 1,
    'field_media' => [
      'target_id' => $media_items['card']->id(),
    ],
    'body' => [
      'value' => '<p>Welcome to our website (the "Site"). By accessing or using the Site, you agree to be bound by these Terms of Use (the "Agreement"). If you do not agree to these terms, you should not access or use the Site.</p>
      <p>&nbsp;</p>
      <h3>Use of the Site</h3>
      <p>You may use the Site only for lawful purposes and in accordance with this Agreement. You agree not to use the Site:</p>
      <ul>
        <li>In any way that violates any applicable federal, state, local, or international law or regulation.</li>
        <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation.</li>
        <li>To impersonate or attempt to impersonate us, our employees, another user, or any other person or entity.</li>
      </ul>
      <p>&nbsp;</p>
      <h3>Intellectual Property</h3>
      <p>The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by us, our licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
      <p>&nbsp;</p>
      <h3>Disclaimer of Warranties</h3>
      <p>The Site and its contents are provided "as is" and without warranties of any kind, whether express or implied. We do not warrant that the Site or any of its functions will be uninterrupted or error-free, that defects will be corrected, or that the Site or the servers that make it available are free of viruses or other harmful components.</p>
      <p>&nbsp;</p>
      <h3>Limitation of Liability</h3>
      <p>In no event will we be liable for any damages of any kind arising out of or in connection with your use of the Site, including but not limited to direct, indirect, incidental, consequential, or punitive damages, even if we have been advised of the possibility of such damages.</p>
      <p>&nbsp;</p>
      <h3>Indemnification</h3>
      <p>You agree to indemnify and hold us and our affiliates, licensors, and service providers harmless from any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys\' fees) arising out of or relating to your violation of this Agreement or your use of the Site, including, but not limited to, your User Contributions, any use of the Site\'s content, services, and products other than as expressly authorized in this Agreement, or your use of any information obtained from the Site.</p>
      <p>&nbsp;</p>
      <h3>Changes to this Agreement</h3>
      <p>We may revise and update this Agreement from time to time in our sole discretion. All changes are effective immediately when we post them, and apply to all access to and use of the Site thereafter. Your continued use of the Site following the posting of revised Agreement means that you accept and agree to the changes.</p>
      <p>&nbsp;</p>
      <h3>Contact Us</h3>
      <p>If you have any questions or concerns about these Terms of Use, please <a href="/contact-us">contact us</a>.</p>',
      'format' => 'full_html',
    ],
    'path' => [
      'alias' => '/terms-of-use',
      'pathauto' => 0,
    ],
  ]);

  $node->save();
}
