#!/bin/bash

# Exit on error
set -e

# Set working directory to project root (one level up from scripts)
cd "$(dirname "$0")/.." || exit 1

# Check if DDEV is available
if ! command -v ddev &> /dev/null; then
    echo "Error: DDEV is not installed or not in PATH"
    exit 1
fi

# Backup the original composer.json
cp composer.json composer.json.backup

# Create upstream-configuration directory
mkdir -p upstream-configuration/scripts

# Define the Pantheon upstream branch
PANTHEON_UPSTREAM="https://raw.githubusercontent.com/pantheon-upstreams/drupal-composer-managed/refs/heads/main"

# Function to download file with error checking
download_file() {
    local url="$1"
    local destination="$2"
    echo "Downloading ${destination}..."
    if ! curl -s -f "$url" -o "$destination"; then
        echo "Error: Failed to download ${destination}"
        return 1
    fi
}

# Download required files
download_file "${PANTHEON_UPSTREAM}/pantheon.upstream.yml" "pantheon.upstream.yml"
download_file "${PANTHEON_UPSTREAM}/upstream-configuration/composer.json" "upstream-configuration/composer.json"
download_file "${PANTHEON_UPSTREAM}/upstream-configuration/scripts/ComposerScripts.php" "upstream-configuration/scripts/ComposerScripts.php"

# Create a temporary PHP script inside the container
echo "Creating temporary PHP script..."
ddev exec "cat > /tmp/update_composer.php" << 'EOF'
<?php
$composerJson = json_decode(file_get_contents('/var/www/html/composer.json'), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    fwrite(STDERR, "Error reading composer.json: " . json_last_error_msg() . "\n");
    exit(1);
}

// Add Pantheon repository
$composerJson['repositories'][] = [
    'type' => 'path',
    'url' => 'upstream-configuration'
];

// Update drupal-scaffold configuration
$composerJson['extra']['drupal-scaffold'] = array_merge(
    $composerJson['extra']['drupal-scaffold'] ?? [],
    [
        'allowed-packages' => ['pantheon-systems/drupal-integrations'],
        'file-mapping' => [
            '[project-root]/.editorconfig' => false,
            '[project-root]/pantheon.upstream.yml' => false,
            '[project-root]/.gitattributes' => false
        ]
    ]
);

// Add autoload configuration
if (!isset($composerJson['autoload']['classmap'])) {
    $composerJson['autoload']['classmap'] = [];
}
if (!in_array('upstream-configuration/scripts/ComposerScripts.php', $composerJson['autoload']['classmap'])) {
    $composerJson['autoload']['classmap'][] = 'upstream-configuration/scripts/ComposerScripts.php';
}

// Add custom paths for Pantheon-specific directories
$composerJson['extra']['installer-paths'] = array_merge(
    $composerJson['extra']['installer-paths'] ?? [],
    [
        'web/modules/custom/{$name}' => ['type:drupal-custom-module'],
        'web/profiles/custom/{$name}' => ['type:drupal-custom-profile'],
        'web/themes/custom/{$name}' => ['type:drupal-custom-theme'],
        'web/private/scripts/quicksilver/{$name}/' => ['type:quicksilver-script']
    ]
);

if (file_put_contents('/var/www/html/composer.json', json_encode($composerJson, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)) === false) {
    fwrite(STDERR, "Error writing to composer.json\n");
    exit(1);
}
EOF

# Execute the PHP script inside the container
echo "Updating composer.json..."
if ! ddev exec "php /tmp/update_composer.php"; then
    echo "Error: Failed to update composer.json"
    ddev exec "rm /tmp/update_composer.php"
    exit 1
fi

# Clean up the temporary PHP script
ddev exec "rm /tmp/update_composer.php"

# Add Pantheon-specific packages using DDEV
echo "Adding Pantheon packages..."
if ! ddev composer require pantheon-systems/drupal-integrations:^9 --no-update; then
    echo "Error: Failed to add pantheon-systems/drupal-integrations package"
    exit 1
fi

if ! ddev composer require pantheon-upstreams/upstream-configuration:dev-main --no-update; then
    echo "Error: Failed to add pantheon-upstreams/upstream-configuration package"
    exit 1
fi

# Verify all required files exist
required_files=(
    "pantheon.upstream.yml"
    "upstream-configuration/scripts/ComposerScripts.php"
    "upstream-configuration/composer.json"
)

for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "Error: Required file $file is missing"
        exit 1
    fi
done

echo "✅ Successfully created all required files"
echo "✅ Pantheon packages and configuration have been added to composer.json"
echo "✅ pantheon.upstream.yml has been created"
echo "✅ upstream-configuration directory has been set up with official Pantheon files"
echo ""
echo "Next steps:"
echo "1. Review the changes in composer.json"
echo "2. Run 'ddev composer update' to install the new packages"
