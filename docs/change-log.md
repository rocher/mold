---
icon: octicons/log-24
---

# CHANGE LOG

---

[![MOLD](img/Ada_Mold_CLI.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold)
## Mold CLI

[![Alire](https://img.shields.io/endpoint?url=https://alire.ada.dev/badges/mold.json){.badge}](https://alire.ada.dev/crates/mold.html)
[![Alire CI/CD](https://img.shields.io/endpoint?url=https://alire-crate-ci.ada.dev/badges/mold.json){.badge}](https://alire-crate-ci.ada.dev/crates/mold.html)
[![GitHub release](https://img.shields.io/github/release/rocher/mold.svg){.badge}](https://github.com/rocher/mold/releases/latest)
[![License](https://img.shields.io/github/license/rocher/mold.svg?color=blue){.badge}](https://github.com/rocher/mold/blob/master/LICENSE)

### 1.0.3
Date: 2024-02-23

  * Add process `show-vars`: show variable values once variable replacement
    and text filters have been applied.
  * Use `clic-0.3.0` to compile with alr-2.0.0-beta2
  * Remove prefix "🛈" from output

### 1.0.2
Date: 2024-02-20

  * First public release
  * Use `mold_lib-2.2.1`
  * Refactor examples

### 0.2.0-dev
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

### 2.3.1
Date: 2025-05-29

#### Bugs fixed

  * Minor bug fixed in the algorithm that combines text filters and variable
    substitution.

### 2.3.0
Date: 2025-05-25

#### Major Changes

  * Incompatible: In `On_Undefined_Handling` enumeration, rename
    `Empty` to `Warning` for consistency.

  * New: add `Show_Variables` procedure to see final values of variables once
    variable replacement and text filters have been applied.

  * New: add `mold-date-<FORMAT>` predefined variable.

#### Bugs fixed

  * Fixed undefined behavior of text filters combined with variable
    substitution.

  * \#16: [Fix compilation with GNAT FSF
    15](https://github.com/rocher/mold_lib/pull/16), fixed by [César
    Sagaert](https://github.com/AldanTanneo).

### 2.2.1
Date: 2024-02-18

#### Bugs fixed

  * Prevent replacement errors in empty files

### 2.2.0
Date: 2024-02-18

#### Major changes

  * Renamed setting `Undefined_Behavior` to `On_Undefined`; succinct and clear
    option to express its purpose.
  * When `On_Undefined` is `Ignore`, no warning is issues; when `Empty`, a
    warning is issued. Default value is `Error`

### 2.1.1
Date: 2024-02-17

#### Bugs fixed

  * Disabling variable substitution in variables now works as expected
  * Source code formatting

### 2.1.0
Date: 2024-02-17

#### Major changes

  * Unified the undefined action and alert into the undefined behavior:
    * `Undefined_Action` and `Undefined_Alert` are now `Undefined_Behavior`
    * Possible values for `Undefined_Behavior` are `Ignore`, `Empty` and
      `Error`
    * `Ignore` leaves undefined variables and text filters unchanged
    * `Empty` removes undefined variables and text filters
    * `Ignore` and `Empty` behaviors always issue a warning

### 2.0.0
Date: 2023-11-21

#### Major changes

  * New simplified error handling strategy
    * The new strategy unifies actions and alerts for undefined variables or
      filters, resulting in a a more clear, compact and understandable
      strategy
    * Modified the setting type to unify undefined actions and alerts for
      variables and text filters
    * `mold-undefined-variable-action` changed to `mold-undefined-action`:
      applies to variables and text filters
    * `mold-undefined-variable-alert` changed to `mold-undefined-alert`: applies
      to variables and text filters
    * Removed defined setting `mold-undefined-filter-alter`
    * Remove defined setting `abort-on-error`

  * Variable definition based on other variables
    * Now it is possible to define new variables based on other variables;
      that is, the variable substitution process is also applied to the
      variables' values
    * Filters are also applied in this context
    * Example:
        * `A = "World"`
        * `B = "Hello, {{A}}"`

      results in `B = "Hello, World"`

#### Minor changes

  * New set of default settings
  * Removed summary reported by text filter application
  * Several minor fixes and improvements

### 1.0.2
Date: 2023-10-23

  * Fix patch number in Alire description

### 1.0.1
Date: 2023-10-23

  * Fix Alire descriptions and dependencies

### 1.0.0
Date: 2023-10-22

  * First stable release
  * Support predefined and custom text filters
  * Complete set of unit tests
  * Reach 100% coverage test
  * Fixed several bugs

### 0.2.1-dev
Date: 2023-08-26

  * First release with all major features
  * Support for variable replacement in files and directories, as well as in filenames
  * Support *in-place* substitution or with an output directory parameter
  * Remove source files (can be disabled)
  * Simple definition files for variables (TOML format)
  * Settings can be set in the definitions file
  * Do not overwrite destination files (can be disabled)
  * Inclusion of external templates
  * User-defined behavior for undefined variables
  * Rich activity report
  * Unit tests passed for Linux, Mac OS and Windows
