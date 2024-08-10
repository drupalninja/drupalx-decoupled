#!/bin/bash

set -e # Exit immediately if a command exits with a non-zero status.

export TERMINUS_HIDE_GIT_MODE_WARNING=1

# Function to prompt for input with a default value
prompt_with_default() {
local prompt="$1"
local default="$2"
read -p "$prompt [$default]: " value
echo "${value:-$default}"
}

# Get the current Unix timestamp
TIMESTAMP=$(date +%s)

# Get site details
SITE_NAME=$(prompt_with_default "Enter site name" "drupalx-$TIMESTAMP")
SITE_LABEL=$(prompt_with_default "Enter site label" "My DrupalX Site")

#!/bin/bash

# Execute the terminus command and capture output
output=$(terminus site:list)

# Check if the string is present in the output
if [[ "$output" =~ "$SITE_NAME" ]]; then
echo "'$SITE_NAME' found, will update."
else
echo "Creating new Pantheon site..."
terminus site:create "$SITE_NAME" "$SITE_LABEL" "drupal-composer-managed"
fi

# Run the terminus command and store the output in a variable
output=$(terminus connection:info $SITE_NAME.dev)

# Use awk to extract the Git URL lines and concatenate them
GIT_REMOTE_URL=$(echo "$output" | sed -n 's/.*\(ssh:\/\/.*\.git\).*/\1/p')

# Output the Git remote URL
echo "Git remote URL: $GIT_REMOTE_URL"

# Attempt to checkout the master branch
if ! git checkout master; then
echo "Failed to checkout master branch."
exit 1
fi

# Check if redis-cli is present in the output
if echo "$output" | grep -q 'redis-cli'; then
echo "Redis is already enabled."
else
echo "Enabling redis..."
terminus redis:enable "$SITE_NAME"
fi

# Continue with the rest of your script if successful
echo "Successfully checked out master branch."

# Add the Pantheon remote to the local repository
echo "Adding Pantheon remote..."
git remote add $SITE_NAME "$GIT_REMOTE_URL"

# Push the local repository to the Pantheon remote
echo "Pushing to Pantheon remote (will overwrite existing git)..."
git push $SITE_NAME master --force

echo "Installing Drupal..."
echo "Running terminus drush "$PANTHEON_SITE" si -- -y drupalx_graphql"

set -e # Exit immediately if a command exits with a non-zero status.

# Run the terminus command and capture its output
output=$(terminus drush "$PANTHEON_SITE" si -- -y drupalx_graphql)

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
