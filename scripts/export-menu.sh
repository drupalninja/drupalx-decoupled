#!/bin/bash

for i in {1..8}
do
  ddev drush dcer menu_link_content $i --folder=../recipes/drupalx-recipe/content
done
