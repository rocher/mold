# CHANGE LOG

---

[![MOLD](img/Ada_Mold_CLI.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold)
## Mold CLI

[![Alire](https://img.shields.io/endpoint?url=https://alire.ada.dev/badges/mold.json){.badge}](https://alire.ada.dev/crates/mold.html)
[![Alire CI/CD](https://img.shields.io/endpoint?url=https://alire-crate-ci.ada.dev/badges/mold.json){.badge}](https://alire-crate-ci.ada.dev/crates/mold.html)
[![GitHub release](https://img.shields.io/github/release/rocher/mold.svg){.badge}](https://github.com/rocher/mold/releases/latest)
[![License](https://img.shields.io/github/license/rocher/mold.svg?color=blue){.badge}](https://github.com/rocher/mold/blob/master/LICENSE)

#### 0.2.0-dev
Date: 2023-08-27

  * Basic implementation of the `apply` command:
  * Use `mold_lib-0.2.0-dev`, see [mold_lib repository](https://github.com/rocher/mold_lib)

---

[![MOLD](img/Ada_Mold_Lib.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold_lib)
## Mold Lib

[![Alire](https://img.shields.io/endpoint?url=https://alire.ada.dev/badges/mold_lib.json){.badge}](https://alire.ada.dev/crates/mold_lib.html)
[![Alire CI/CD](https://img.shields.io/endpoint?url=https://alire-crate-ci.ada.dev/badges/mold_lib.json){.badge}](https://alire-crate-ci.ada.dev/crates/mold_lib.html)
![unit-test](https://github.com/rocher/mold_lib/actions/workflows/unit-test.yml/badge.svg){.badge}
[![codecov](https://codecov.io/gh/rocher/mold_lib/graph/badge.svg?token=LB83SI4I0Y){.badge}](https://codecov.io/gh/rocher/mold_lib)
[![GitHub release](https://img.shields.io/github/release/rocher/mold_lib.svg){.badge}](https://github.com/rocher/mold_lib/releases/latest)
[![License](https://img.shields.io/github/license/rocher/mold_lib.svg?color=blue){.badge}](https://github.com/rocher/mold_lib/blob/master/LICENSE)


#### 2.0.0
Date: 2023-10-29

  * Modified the setting type to unify undefined actions and alerts for
    variables and text filters
  * New set of default settings
  * New, simplified error handling strategy
  * `mold-undefined-variable-action` changed to `mold-undefined-action`:
    applies to variables and text filters
  * `mold-undefined-variable-alert` changed to `mold-undefined-alert`: applies
    to variables and text filters
  * Removed defined setting `mold-undefined-filter-alter`
  * Remove defined setting `abort-on-error`
  * Removed summary reported by text filter application
  * Several minor fixes and improvements

#### 1.0.2
Date: 2023-10-23

  * Fix patch number in Alire description

#### 1.0.1
Date: 2023-10-23

  * Fix Alire descriptions and dependencies

#### 1.0.0
Date: 2023-10-22

  * First stable release
  * Support predefined and custom text filters
  * Complete set of unit tests
  * Reach 100% coverage test
  * Fixed several bugs

#### 0.2.1-dev
Date: 2023-08-26

  * First release with all major features
  * Support for variable replacement in files and directories, as well as in file names
  * Support *in-place* substitution or with an output directory parameter
  * Remove source files (can be disabled)
  * Simple definition files for variables (TOML format)
  * Settings can be set in the definitions file
  * Do not overwrite destination files (can be disabled)
  * Inclusion of external templates
  * User-defined behavior for undefined variables
  * Rich activity report
  * Unit tests passed for Linux, Mac OS and Windows