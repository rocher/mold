# REFERENCE GUIDE

## Overall Process

Variable substitution takes place in a single file or directory, and
recursively, across all its sub-directories. Processed files must end with the
`mold` extension. The substitution process generates a new file with all the
variables replaced with the corresponding values. The new file name is the
same as the source file, but removing the `.mold` extension:

```bash
   README.md.mold -- [ mold generates ] --> README.md
```

By default, if a generated file already exists, Mold issues a error, but it is
possible to force overwriting existing files.


### Operating in directories

Mold can operate recursively across all subdirectories of a given directory.
Additionally, it is possible to specify a different output directory. This use
case comes in handy to create a new project directory starting from a given
template project.

Mold recurses all subdirectories and applies the variable substitution to all
mold files found. The generated file is created in the same path, but relative
to the output directory. If necessary, all parent directories are created as
well.

Files not processed by mold won't be found in the output directory. For
example:

```

INPUT DIRECTORY  --[ Mold ]-> OUTPUT DIRECTORY = /tmp/lorem/ipsum

     foo/                             /tmp/
     |-- bar.txt.mold                  '-- lorem/
     |-- baz.md.mold                       '-- ipsum/
     |-- definitions.toml                      |-- foo/
     |-- header.molt                           |   |-- bar.txt
     |-- subdir_1/                             |   '-- baz.md
     |   |-- foo-bar.adb.mold                  |-- subdir_1/
     |   |-- bar-bar.ads.mold                  |   |-- foo-bar.adb
     |   '-- footer.molt                       |   '-- foo-bar.ads
     '-- subdir_2/                             '-- subdir_2/
         |-- foo-2.adb.mold                        |-- foo-2.adb
         |-- bar-2.ads.mold                        |-- foo-2.ads
         |-- local-header.molt                     '-- subdir_3/
         '-- subdir_3/                                 |-- foo-3.md
             |-- foo-3.md.mold                         '-- bar.md
             '-- bar.md.mold

```


## Variable Substitution

All variables inside a file must be written with the syntax `{{variable}}`:

```md title="README.md.mold"
   {{TITLE}}
   Hello {{world}}, this is just an {{example}}
```

with any number of spaces between the variable name and curly braces:

```md title="README.md.mold"
   {{  TITLE  }}
   Hello {{ world }}, ths is just an {{           example  }}
```

Thus, with the following definitions:

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
the error handling when an undefined variable is found.

#### Normal

For an undefined variable, the default behavior is to issue a warning and left
the variable *ignored*, or unchanged. If `world` was undefined, the above
example would be:

```md title="README.md.mold"
   README, please
   Hello {{ world }}, ths is just an example test
```

It is possible to specify that the undefined variable must be removed and that
no warning must be issued.

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
    different places, even in the same file. Remember that The difference
    between the substitution modes is the error handling when the variable is
    undefined.

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

Undefined variables in a file name signals an error; variables cannot by
optional. Substitution in file names is enabled by default, but can be
disabled.

!!! danger "Warning"

    Although it is possible to use directory names in variables definitions,
    like `world = "foo/bar"` to generate the file `README_foo/bar.md`, it is a
    strongly not recommended practice, for portability reasons. Mold does not
    check if you use directory separators in variable values, so use at your
    own risk. It is better to create previously the necessary directory
    structure and make mold operate in a directory.


## Definitions File

The default definitions file is called `mold.toml`. It must be a simple TOML
file, with variables like strings or paragraphs (multi-line variables)

```toml title="variable assignment"
   string = "value"
   paragraph = '''
      > This is a quotation.
   '''
```

Only strings are supported, and no arrays nor tables can be present. For more
information, please read the [TOML specification](https://toml.io). Comments
and multi-line strings are supported.


## Settings

The `mold` tool is a CLI wrapper of `libmold`, so this section applies to both
implementations. There is a flag in the `mold` tool with the exact meaning:


| Setting                       |   Description   | Default |
|------------------------------:|:----------------|:--------|
| `Replacement_In_File_Names`   | Enables variable substitution in source file names. | `True` |
| `Delete_Source_Files`         | Delete source files if variable substitution process finish successfully. | `True` |
| `Overwrite_Destination_Files` | Overwrite destination files, if already exist. | `False` |
| `Enable_Defined_Settings`     | Enable the use of mold settings in the definitions fie. | `True` |
| `Undefined_Variable_Action`   | When undefined, replacement for normal variable substitution mode. | `Ignore` |
| `Undefined_Variable_Alert`    | When undefined, error handling for normal variable substitution mode. | `Warning`  |
| `Abort_On_Error`               | If `True`, aborts the variable substitution process as soon as an error is detected. | `True` |

!!! tip "Action & Alert"

    `Undefined_Variable_Action` and `Undefined_Variable_Alert` only apply to
    normal substitution of variables when an undefined variable is found:

    * `Undefined_Variable_Action` can be `Ignore`, to left the substitution as
      is, or `Empty` to remove the text.
    * `Undefined_Variable_Alert` can be `None`, to silently skip the problem,
      or `Warning` to issue a warning message.


## Defined Settings

All above settings can be defined also in the definitions file, except the
`Enable_Defined_Settings`

All variables starting with the prefix `mold-` are considered by Mold as
*setting variables*, which means that they change the way in which Mold
behaves by changing a Mold setting.

For example,

```toml title="mold.toml"
   mold-delete-source-files = "false"

   TITLE   = "README, please"
   world   = "World"
   example = "example text"
```

would prevent to remove the source file when the variable substitution process
ends successfully.

Setting variables can be used also as a normal variable, so for example

```md title="README___world__.md.mold"
   {{  TITLE  }}
   Hello {{ world }}, ths is just an {{           example  }}

   Note: This file generated with defined settings
         `mold-delete-source-files`          = "{{?mold-delete-source-files}}"
         `mold-overwrite-destination-files`  = "{{?mold-overwrite-destination-files}}"
```

would generate

```md title="README_World.md"
   README, please
   Hello World, ths is just an example text

   Note: This file generated with defined settings
         `mold-delete-source-files`                   = "false"
         `mold-overwrite-overwrite-destination-files` = ""
```

Defined setting variables available are, for the corresponding settings
defined in [settings]:

| Setting                       | Variable                           |
|-------------------------------|------------------------------------|
| `Replacement_In_File_Names`   | `mold-replacement-in-file-names`   |
| `Delete_Source_Files`         | `mold-delete-source-files`         |
| `Overwrite_Destination_Files` | `mold-overwrite-destination-files` |
| `Undefined_Variable_Action`   | `mold-undefined-variable-action`   |
| `Undefined_Variable_Alert`    | `mold-undefined-variable-alert`    |
| `Abort_On_Error`              | `mold-abort-on-error`              |


## Template Inclusion

External template files can be used as a generic template for header, footers
and so on. These template files must have the `molt` extension. Can be
included at any point in a `mold` file, in a single line, with the syntax

```md
   {{ include:header.molt }}
```

The file name can be relative path to the current mold file being processed,
or relative to the working directory from which the mold tool was invoked.

When this line is found, Mold opens and processes the included file and the
output is sent into the currently generated file. The same set or defined
variables is replaced in the template.

This is useful to share template snippets across several files or projects,
greatly simplifying the maintenance.

A template file can include other template files. The only limit on how many
included files are supported is on your system. When circular dependencies are
detected, an error is reported and the process is stopped.
