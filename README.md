# DrupalX Decoupled Enterprise Starter Template

[![CI](https://github.com/drupalninja/drupalx-decoupled/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/drupalninja/drupalx-decoupled/actions/workflows/ci.yml)
[![License: GPL v2](https://img.shields.io/badge/License-GPL_v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)

This project template leverages the DrupalX Decoupled distribution, featuring enhanced editorial capabilities, integrated 4GraphQL support and a Next.js frontend starter.

## What does the template do?

* Extends the [drupal-composer/drupal-project](https://github.com/drupal-composer/drupal-project) template (visit the README for basic instructions).
* Adds additional contributed modules to the project via Composer.
* Sets up [DDEV](https://ddev.com/) as the default development environment.rapid style customization.
* Configures the DrupalX GraphQL custom profile as the default install profile.

## Installing

Create your project:

```bash
composer create-project drupalninja/drupalx-decoupled:10.x-dev drupalx-decoupled-starter --no-interaction
```

Configure DDEV (follow prompts).

```bash
ddev config
```

Start DDEV, download Composer dependencies and install DrupalX CMS.

```bash
ddev install
```
