#!/bin/bash

# Loop through numbers 1 to 16
for i in {1..16}
do
  ddev drush dcer node $i --folder=modules/custom/drupalx_content/content
done
