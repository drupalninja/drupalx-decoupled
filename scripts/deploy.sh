#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

# Check if PANTHEON_SITE is set, if not, use a default value or exit
if [ -z "$PANTHEON_SITE" ]; then
echo "Error: PANTHEON_SITE environment variable is not set."
echo "Please set it before running this script, e.g.:"
echo "export PANTHEON_SITE=drupalx-decoupled.dev"
exit 1
fi

# Check if NETLIFY_APP_URL is set
if [ -z "$NETLIFY_APP_URL" ]; then
echo "Error: NETLIFY_APP_URL environment variable is not set."
echo "Please set it before running this script, e.g.:"
echo "export NETLIFY_APP_URL=https://drupalx-decoupled.netlify.app"
exit 1
fi

export TERMINUS_HIDE_GIT_MODE_WARNING=1

echo "Running drush minimal site install"

set -e # Exit immediately if a command exits with a non-zero status.

# Run the terminus command and capture its output
output=$(terminus drush "$PANTHEON_SITE" si -- -y minimal)

echo "Command output:"
echo "$output"

echo "Applying DrupalX Decoupled recipe"

# Run the terminus command and capture its output
output=$(terminus drush "$PANTHEON_SITE" -- recipe ../recipes/drupalx-recipe)

ddev drush recipe ../recipes/drupalx-recipe

echo "Command output:"
echo "$output"

# Extract DRUPAL_CLIENT_ID for Previewer
DRUPAL_CLIENT_ID=$(echo "$output" | awk '/--- Previewer ---/{flag=1; next} /DRUPAL_CLIENT_ID=/{if(flag==1) {print $1; flag=0}}' | cut -d'=' -f2)

# Extract DRUPAL_CLIENT_SECRET for Previewer
DRUPAL_CLIENT_SECRET=$(echo "$output" | awk '/--- Previewer ---/{flag=1; next} /DRUPAL_CLIENT_SECRET=/{if(flag==1) {print $1; flag=0}}' | cut -d'=' -f2)

# Check if the values were successfully extracted
if [ -z "$DRUPAL_CLIENT_ID" ] || [ -z "$DRUPAL_CLIENT_SECRET" ]; then
echo "Failed to extract DRUPAL_CLIENT_ID or DRUPAL_CLIENT_SECRET"
exit 1
fi

echo "DRUPAL_CLIENT_ID: $DRUPAL_CLIENT_ID"
echo "DRUPAL_CLIENT_SECRET: $DRUPAL_CLIENT_SECRET"

terminus drush "$PANTHEON_SITE" -- config:set decoupled_preview_iframe.settings redirect_url "$NETLIFY_APP_URL" -y
terminus drush "$PANTHEON_SITE" -- config:set decoupled_preview_iframe.settings preview_url "$NETLIFY_APP_URL" -y

terminus drush "$PANTHEON_SITE" cr

# Set the environment variables for the Vercel environment
echo -n "$DRUPAL_CLIENT_ID" | vercel env add DRUPAL_CLIENT_ID production --force
echo -n "$DRUPAL_CLIENT_SECRET" | vercel env add DRUPAL_CLIENT_SECRET production --force

echo "Deploying to Vercel..."

# Deploy to Vercel
curl -X POST -H "Content-Type: application/json" https://api.vercel.com/v1/integrations/deploy/prj_YmQ0eV8HSqQ1AhDsxpsTfmKdotSt/KrCZvy8LfY

# Set the environment variables for Netlify environment
netlify env:set DRUPAL_CLIENT_ID "$DRUPAL_CLIENT_ID"
netlify env:set DRUPAL_CLIENT_SECRET "$DRUPAL_CLIENT_SECRET"

echo "Deploying to Netlify..."

# Deploy to Netlify
curl -X POST -H "Content-Type: application/json" https://api.netlify.com/build_hooks/66b75a76eded4f2916b339ae

# Print the login link
terminus drush "$PANTHEON_SITE" uli
