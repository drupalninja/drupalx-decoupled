<?php

$entity_type_manager = \Drupal::entityTypeManager();
$node_type_storage = $entity_type_manager->getStorage('node_type');
$field_storage_config_storage = $entity_type_manager->getStorage('field_storage_config');
$field_config_storage = $entity_type_manager->getStorage('field_config');
$entity_form_display_storage = $entity_type_manager->getStorage('entity_form_display');

// Create the event content type.
$node_type_storage->create([
  'type' => 'event',
  'name' => 'Event',
  'description' => 'Use this content type to create events.',
])->save();

// Add custom fields to the event content type.
$field_storage_config_storage->create([
  'field_name' => 'field_event_date',
  'entity_type' => 'node',
  'type' => 'datetime',
  'settings' => ['datetime_type' => 'date'],
])->save();

$field_config_storage->create([
  'field_name' => 'field_event_date',
  'entity_type' => 'node',
  'bundle' => 'event',
  'label' => 'Event Date',
  'required' => TRUE,
])->save();

$field_storage_config_storage->create([
  'field_name' => 'field_event_location',
  'entity_type' => 'node',
  'type' => 'string',
])->save();

$field_config_storage->create([
  'field_name' => 'field_event_location',
  'entity_type' => 'node',
  'bundle' => 'event',
  'label' => 'Event Location',
  'required' => TRUE,
])->save();

// Create the form display configuration.
$form_display = $entity_form_display_storage->create([
  'targetEntityType' => 'node',
  'bundle' => 'event',
  'mode' => 'default',
  'status' => TRUE,
]);

// Configure widget settings for each field.
$form_display->setComponent('title', [
  'type' => 'string_textfield',
  'weight' => -5,
]);

$form_display->setComponent('field_event_date', [
  'type' => 'datetime_default',
  'weight' => -4,
]);

$form_display->setComponent('field_event_location', [
  'type' => 'string_textfield',
  'weight' => -3,
]);

$form_display->setComponent('body', [
  'type' => 'text_textarea_with_summary',
  'weight' => -2,
]);

$form_display->save();
