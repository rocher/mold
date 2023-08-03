# USER GUIDE

## Overall Process

Variable substitution takes place in a single file or directory, and
recursively across all sub-directories. Processed files end with the `mold`
extension. The substitution process generates a new file with all the
variables replaced by the corresponding values. The new file name is the same
as the source file, but removing the `.mold` extension:

```bash
   README.md.mold ---[ mold generates ]--> README.md
```

By default, if a generated file already exists, Mold issues a error, but it is
possible to force overwriting existing files.

## Variable Substitution

All variables inside a file muts be written with the syntax `{{variable}}`:

```md title="README.md.mold"
   {{TITLE}}
   Hello {{world}}, this is just an {{example}}
```

with any number of spaces between variable name and curly braces:

```md title="README.md.mold"
   {{  TITLE  }}
   Hello {{ world }}, ths is just an {{           example  }}
```

Thus, with the following definitions

```toml title="mold.toml"
   TITLE   = "README, please"
   world   = "World"
   example = "example text"
```

the new file contents would be:

```md title="README.md"
   README, please
   Hello World, ths is just an example text
```

### Substitution Modes

There are three substitution modes in Mod. The only difference between them is
the error management when an undefined variable is found.

#### Normal

For an undefined variable, the default behavior is to issue a warning and left
the variables unchanged (not replaced). If `world` was undefined, the above
example would be:

```md title="README.md.mold"
   README, please
   Hello {{ world }}, ths is just an example test
```

#### Optional

Optional substitution is written as `{{ ?variable }}`, for any variable. For
undefined variables, optional substitution does no issues a warning and the
`{{ ?variable }}` text is removed.

For example,

```md title="README.mb.mold"
   {{  TITLE  }}
   Hello {{ ?world }}, this is just an {{           example  }}
```
issues no warning and generates

```md title="README.md"
   README, please
   Hello , this is just an example text
```

!!! note

    There are no *optional variables*: it is the *substitution mode* that can be
    optional. Any variable can be used as `{{variable}}` and `{{?variable}}` at
    different places, even in the same file. The difference between the
    substitution modes is the error handling when the variable is undefined.

#### Mandatory

Mandatory substitution is written as `{{ #variable }}`. If the variable is
undefined, Mold issues an error and makes no substitution. By default, the
substitution process is aborted on error.

!!! warning "Syntax"

    In optional and mandatory substitution modes, characters `?` and `#` are
    part of the variable name, not part of the curly braces. Thus,
    `{{?variable}}` and `{{  #variable  }}` are valid variables, while
    `{{? variable }}` and `{{#  variable}}` are invalid.


## File Name Substitution

Variables in file names must be written with the syntax `__variable__`, with
no spaces between the variable name and underscores.

For example, the file

```bash
   README___world__.md.mold
```

would generate, with the above definitions, a new file called

```bash
   README_World.md
```
File name substitution can be disabled. When enabled, undefined variable in a
file name issues an error (no optional substitution here).

!!! danger "Warning"

    Although it is possible to use directory names in variables definitions,
    like `world = "foo/bar"` to generate the file `README_foo/bar.md`, it is a
    strongly not recommended practice, for portability reasons. Mold does not
    check if you use directory separators in variable values, so use at your
    own risk.


## Definitions File

The default definitions file is called `mold.toml`. It must be a simple TOML
file, with a

```toml title="variable assignment"
   variable = "value"
```

per line. Only strings are supported, and no arrays nor tables can be present.
For more information, please read the [TOML specification](https://toml.io).
Comments and multi-line strings are supported.


## Settings

The `mold` tool is a CLI wrapper of `libmold`, so this section applies to both
implementations. Description is given as in the Ada `libmold` library. There
is a flag in `mold` the exact meaning.


| Setting            |   Description   | Default |
|-------------------:|:----------------|:--------|
| `Rename_Source`    | Enables the use of variable substitution in the source file name. | `True` |
| `Delete_Source`    | Delete the source file if the variable substitution process finish successfully. | `True` |
| `Overwrite`        | Overwrite the destination file if already exists. | `False` |
| `Defined_Settings` | Enables the use of defined settings in the definitions fie. | `True` |
| `Action`           | Predefined behavior for normal variable substitution mode in case of undefined variable. | `Ignore` |
| `Alert`            | Predefined error handling for normal variable substitution mode in case of undefined variable. | `Warning`  |
| `Abort_On_Error`   | If `True`, aborts the variable substitution process as soon as an error is detected. | `True` |

!!! tip "Action & Alert"

    `Action` and `Alert` only apply to normal substitution of variables when an undefined variable is found:

    * `Action` can be `Ignore`, to left the substitution as is, or `Empty` to remove the text.
    * `Alert` can be `None`, to silently skip the problem, or `Warning` to issue a warning message.


## Defined Settings

All variables starting with the prefix `mold-` are considered by Mold as
*setting variables*, which means that they change the way in which Mold
behaves by changing a Mold setting.

For example,

```toml title="mold.toml"
   mold-delete-source = "false"

   TITLE   = "README, please"
   world   = "World"
   example = "example text"
```

would prevent to remove the source file when the variable substitution process
ends successfully.

The variable can be used also as a normal variable, so for example

```md title="README___world__.md.mold"
   {{  TITLE  }}
   Hello {{ world }}, ths is just an {{           example  }}

   Note: This file generated with defined settings
         `delete-source` = "{{?mold-delete-source}}"
         `overwrite`     = "{{?mold-overwrite}}"
```

would generate

```md title="README_World.md"
   README, please
   Hello World, ths is just an example text

   Note: This file generated with defined settings
         `delete-source` = "false"
         `overwrite`     = ""
```

All possible defined settings variables are obtained with the above settings,
in lowercase, replacing `_` by `-`, and prefixed with `mold-`. For example,
`mold-rename-source`, `mold-delete-source`, `mold-overwrite`, and so on.


## Template Inclusion

Other files can be used a generic template for header, footers and so on.
These template files must have the `molt` extension. Can be included at any
point in a `mold` file, in a single line, with the syntax

```md
   {{ include:header.molt }}
```

When this line is found, Mold opens and processes the included file and the
output is sent into the currently generated file.

This is useful to share template snippets across several files or projects,
greatly simplifying the maintenance.

A template file can include other template files. The only limit on how many
included files are supported is on your system. When circular dependencies are
detected, an error is reported and the process is stopped.
