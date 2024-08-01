<?php

/**
 * @file
 * Contains functions to create menus.
 */

use Drupal\menu_link_content\Entity\MenuLinkContent;

/**
 * Create menu items.
 */
function _drupalx_graphql_create_menus() {
  // Main menu items.
  $main_menu_items = [
    ['title' => 'Home', 'uri' => 'internal:/welcome', 'expanded' => TRUE],
    ['title' => 'Features', 'uri' => 'internal:/features', 'expanded' => TRUE],
    ['title' => 'Articles', 'uri' => 'internal:/articles', 'expanded' => TRUE],
    ['title' => 'Get Started', 'uri' => 'internal:/get-started', 'expanded' => TRUE],
    ['title' => 'Contact', 'uri' => 'internal:/contact', 'expanded' => TRUE],
  ];

  // Footer menu items.
  $footer_menu_items = [
    ['title' => 'Privacy Policy', 'uri' => 'internal:/privacy', 'expanded' => FALSE],
    ['title' => 'Terms of Use', 'uri' => 'internal:/terms-of-use', 'expanded' => FALSE],
    ['title' => 'Contact', 'uri' => 'internal:/contact', 'expanded' => FALSE],
  ];

  // Create main menu links.
  $weight = 0;
  foreach ($main_menu_items as $item) {
    _drupalx_graphql_create_menu_link($item['title'], $item['uri'], 'main', $item['expanded'], $weight++);
  }

  // Create footer menu links.
  $weight = 0;
  foreach ($footer_menu_items as $item) {
    _drupalx_graphql_create_menu_link($item['title'], $item['uri'], 'footer', $item['expanded'], $weight++);
  }
}

/**
 * Helper function to create and save a menu link.
 */
function _drupalx_graphql_create_menu_link($title, $uri, $menu_name, $expanded, $weight) {
  $menu_link = MenuLinkContent::create([
    'title' => $title,
    'link' => ['uri' => $uri],
    'menu_name' => $menu_name,
    'expanded' => $expanded,
    'weight' => $weight,
  ]);
  $menu_link->save();
}
