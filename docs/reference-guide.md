![MOLD](img/Ada_Mold.png){ .alice align=right .off-glb }

# REFERENCE GUIDE

## Overall Process

Variable substitution takes place in a single file or directory, and
recursively, across all its sub-directories. Processed files must end with the
`mold` extension. The substitution process generates a new file with all the
variables replaced with the corresponding values. The new file name is the
same as the source file, but removing the `.mold` extension:

```bash
   README.md.mold ——[ mold generates ]--> README.md
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

INPUT DIRECTORY  ─[ Mold ]-> OUTPUT DIRECTORY = /tmp/lorem/ipsum

     foo/                             /tmp/
     ├── bar.txt.mold                  └── lorem/
     ├── baz.md.mold                       └── ipsum/
     ├── definitions.toml                      ├── foo/
     ├── header.molt                           │   ├── bar.txt
     ├── subdir_1/                             │   └── baz.md
     │   ├── foo-bar.adb.mold                  ├── subdir_1/
     │   ├── bar-bar.ads.mold                  │   ├── foo-bar.adb
     │   └── footer.molt                       │   └── foo-bar.ads
     └── subdir_2/                             └── subdir_2/
         ├── foo-2.adb.mold                        ├── foo-2.adb
         ├── bar-2.ads.mold                        ├── foo-2.ads
         ├── local-header.molt                     └── subdir_3/
         └── subdir_3/                                 ├── foo-3.md
             ├── foo-3.md.mold                         └── bar.md
             └── bar.md.mold

```

### Error Handling

There are two types of errors that Mold can detect and handle in different
ways.

#### Fatal Errors

Prevent Mold from completing the replacement job. Typical fatal errors are
produced when a file is not found, the destination directory cannot be written
or created, or the definitions file is corrupted. These errors stop
immediately the replacement process.

#### Replacement Errors

Detected during the variable replacement, these errors are caused when a
variable has not been defined of an invalid text filter has been specified.
Depending on the settings and the type of substitution, Mold can skip this
error, report a warning or an error, and continue with the process. Next
section explain how these errors are handled.


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

For an undefined variable, the default behavior is to issue an error and left
the variable *ignored*, or unchanged. If `world` was undefined, the above
example would be:

```md title="README.md.mold"
   README, please
   Hello {{ world }}, ths is just an example test
```
For normal substitution, it is possible to specify what to do when an
undefined variable is found:

* *Undefined Variable Action* determines if the undefined variable must be
  removed or kept in the destination file. It can take the values:
    * `Ignore`, to left the variables as is
    * `Empty`, to remove the variable in the destination file

* *Undefined Variable Alert* determines the error handling strategy:
    * `None`: does nothing
    * `Warning`: issues a warning
    * `Error`: issues a replacement error

!!! note "Only for normal"

    These two aspects do not apply to either optional or mandatory
    substitution modes.

!!! tip "Equivalent modes"

    With a combination of these two aspects, it is possible to force normal
    substitution mode to behave like optional or mandatory. See the table in
    [Examples](#examples) below.

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
    different places, even in the same file.

#### Mandatory

Mandatory substitution is written as `{{ #variable }}`. If the variable is
undefined, Mold issues an error and makes no substitution. By default, the
substitution process is aborted on error.

!!! warning "Syntax"

    In optional and mandatory substitution modes, characters `?` and `#` are
    part of the variable name, not part of the curly braces. Thus,
    `{{?variable}}` and `{{  #variable  }}` are valid variables, while
    `{{? variable }}` and `{{#  variable}}` are invalid.


### Examples

Examples with defined variable `foo="bar"` and variable `baz` undefined:

| Kind | Action | Alert | Variable | Replace | Error | R I E | Like |
| ---- | ------ | ----- | -------: | :------ | ----: | :---: | ---- |
**Defined variable**
Normal     | *any*   | *any*   | `{{foo}}`    | `bar`       |         | T F F |
Optional   | —       | —       | `{{?foo}}`   | `bar`       |         | T F F |
Mandatory  | —       | —       | `{{#foo}}`   | `bar`       |         | T F F |
**Undefined variable**
Normal     | Ignore  | None    | `{{baz}}`    | `{{baz}}`   |         | F T F |
Normal     | Ignore  | Warning | `{{baz}}`    | `{{baz}}`   | Warning | F T F |
Normal     | Ignore  | Error   | `{{baz}}`    | `{{baz}}`   | Error   | F T F | Mandatory
Normal     | Empty   | None    | `{{baz}}`    |             |         | F F T | Optional
Normal     | Empty   | Warning | `{{baz}}`    |             | Warning | F F T |
Normal     | Empty   | Error   | `{{baz}}`    |             | Error   | F F T |
           |         |         |              |             |         |       |
Optional   | —       | —       | `{{?baz}}`   |             |         | F F T |
Mandatory  | —       | —       | `{{#baz}}`   | `{{#baz}}`  | Error   | F T F |

Meaning of columns 'RIE'; each one can take value True or False:

  * 'R' : variable replaced with a defined value
  * 'I' : Variable ignored
  * 'E' : Variable emptied (removed)


## Text Filters

Text filters enable text transformations before variable substitution. In the
command line, there are few predefined text filters. In the library, you can
provide up to ten filters. In general, a text filter is a function that
receives the value of the variable as an argument, applies some
transformation and returns a string.

Text filters are applied independently of the variable substitution mode: if a
value is found for a variables, then filters are applied to that value.

### Syntax

Text filters are applied when the following syntax is used:

```md title="syntax"
   {{VARIABLE/<FILTER>}}
```

where `<FILTER>` is a *filter specification*.

For example:

```md title="example.txt.mold"
   {{TITLE}}
   {{TITLE/s-}}
```

???+ danger "No Trailing spaces"

    Text filter specification can contain the character space, `' '`, as an
    argument to some filters. Parsing spaces is no problem, unless they appear
    in the last position of the specification. For this reason, DO NOT USE
    trailing spaces in variables substitution. For example, the text filter
    to replace all characters dot `'.'` by an space `' '` is written as
    `{{ Some_Variable/r. }}`. Using more that one space at the end can confuse
    the parser if the text filter admits no parameters. For example, the text
    filter that converts all characters to lower case is written as
    `{{ Some_Variable/l}}`. But written as `{{ Some_Variable/l }}`, the parser
    interprets that you are passing the argument `' '` to the filter, which is
    incorrect.

In this example, the `/s-` part tells mold to apply the predefined filter
*sequence* with two arguments: the value of `TITLE` (all text filters
mandatorily receive this argument) and the character `'-'`. The filter returns
a sequence of `'-'` with the same length as the value of `TITLE`:

```md title="example.txt"
   README, please
   --------------
```

All text filters receive the value of the variable as first argument.
Predefined text filters (see below) can have additional parameters (one or
more). Custom filters cannot have additional parameters.

Predefined text filters are named with a single letter, whilst custom filters
are indexed in the range `0..9`.

### Multiple filters

Text filters can be *chained* or *composed* in a sequence. Like in a pipeline
of commands, the result of one text filter is used as an argument for the next
filter.

For example, with the definition:
```toml title="example.toml"
   Title = "  This is a     title   "
```

the following substitution:

!!! info inline end "No escape required"

    The character slash, `'/'`, is the text filter separator. If you want to
    use it as an argument to a text filter, just write it twice, `'//'`.

!!! warning inline end "No trailing spaces"

    *Remember*: when using text filters, do not use additional trailing spaces!

```ada title="example.txt.mold"
   {{ Title/Ta}}      -- (1)!
   {{ Title/Ta/s-}}
   {{ Title/s-/Ta}}   -- (2)!
   {{ Title/s///Ta}}  -- (3)!
```

1. The value of `Title` does not change when a text filter is applied.
2. The order in which text filters are specified can modify the result.
3. The double `'//'` is seen as a single `'/'` by the text filter `s`.

would be:

!!! info inline end "Text filters"
    The text filter `Ta` trims leading and trailing spaces, and replaces
    consecutive spaces with only one space.

```md title="example.txt"
   This is a title
   ---------------
   ------------------------
   ////////////////////////
```

### Predefined Text Filters

In this section, `<DIR>`, `<CHAR>`, `<SRC>` and `<DST>` are single characters,
and `<NUM>` is a positive number. Text filters that can modify the value of a
variable by replacing or adding characters start with a lowercase letter. Text
filters that can delete some characters starts with an uppercase letter.

#### Space trimming

  * `T<DIR>`, *trim* : trim blanks (spaces and tabs) in the specified
    direction:
      + `l` *left*
      + `r` *right*
      + `b` *both*; equivalent to `/Tl/Tr`
      + `s` *squash*; replace sequences of multiple blanks (leading, trailing
        and internal) to a single space
      * `a` *all* : equivalent to `/Tb/Ts`
  * `X`, *remove blanks* : remove all tabs and spaces.

  * Examples, with `Line = "␣␉␣␉␣␣This␣␣is␣a␣line␣␣␣full␣of␣␉␣tabs␣and␣spaces␣␣␣"`
    + `{{Line/Tb}}` $\rightarrow$ `"This␣␣is␣a␣line␣␣␣full␣of␣␉␣tabs␣and␣spaces"`
    + `{{Line/Ts}}` $\rightarrow$ `"␣This␣is␣a␣line␣full␣of␣tabs␣and␣spaces␣"`
    + `{{Line/Ta}}` $\rightarrow$ `"This␣is␣a␣line␣full␣of␣tabs␣and␣spaces"`
    + `{{Line/X}}` $\rightarrow$ `"Thisisalinefulloftabsandspaces"`

#### Character substitution

  * `r<WHICH><SRC><DST>`, *replace* : replace occurrences of character `<SRC>`
    with character `<DST>`. `<WHICH>` can be
    + `a`, *all* : replace all occurrences of `<SRC>`.
    + `f`, *first* : replace first occurrence of `<SRC>`.
    + `l`, *last* : replace last occurrence of `<SRC>`.
  * `s<CHAR>`, *sequence* : replace any character with `<CHAR>`; that is,
    returns a sequence of `<CHAR>` of the same length than the value of the
    variable.
  * `D<CHAR>`, *delete all* : delete all occurrences of `<CHAR>`.

  * Examples:
    + `"Hello, world"/rao0` $\rightarrow$ `"Hell0, w0rld"`
    + `"Hello, world"/rfo0/rloO` $\rightarrow$ `"Hell0, wOrld"`
    + `"Hello, world"/s*` $\rightarrow$ `"************"`
    + `"Hello, world"/Do` $\rightarrow$ `"Hell, wrld"`

#### Padding and truncating

!!! example inline end "Number formatting"

    This text filter can be used to basic number formatting. For example,
    `/pl05` adjusts a number to the right with five positions and leading
    zeroes:

      * `"1"/pl05` $\rightarrow$ `00001`
      * `"42"/pl04` $\rightarrow$ `0042`
      * `"123"/pl02` $\rightarrow$ `123`

  * `p<DIR><CHAR><NUM>`, *padding* : adjust the value of the variable with
    leading or trailing `<CHAR>` to the specified width `<NUM>`. `<DIR>` can
    be:
    + `l` to add spaces to the left (adjust to right)
    + `r` to add spaces to the right (adjust to left)
  * `W<NUM>`, *truncate to width* : truncate the value of the variable to the
    given width.

  * Examples:
    + `"Hello, world"/pl*4` $\rightarrow$ `"Hello, world"`
    + `"Hello, world"/pl=22` $\rightarrow$ `"==========Hello, world"`
    + `"Hello, world"/pr-22` $\rightarrow$ `"Hello, world----------"`
    + `"Hello, world"/W4` $\rightarrow$ `"Hell"`
    + `"Hello, world"/W42` $\rightarrow$ `"Hello, world"`

#### Case transformation and naming style

  * `c<CASE>`, *case conversion*
    + `l`, *to lowercase*: transform all characters to lowercase
    + `c`, *to capitals*: transform all words to Capitals
    + `u`, *to uppercase*: transform all characters to UPPERCASE

  * `n<STYLE>`, *apply naming style*: applies one of the following naming
    conventions designated by `<STYLE>`; example applied to `"bytes per
    second"`

    !!! example inline end "Equivalences"

        Some naming styles can be obtained by composing other predefined text
        filters. For example, `/ns` is the same as `/cl/Ta/ra _`.

    | Style | Name             | Example            | Equivalence        |
    | :---: | ---------------- | ------------------ | ------------------ |
    |  `f`  | flatcase         | `bytespersecond`   | `/cl/X` or `/X/cl` |
    |  `c`  | lowerCamelCase   | `bytesPerSecond`   |                    |
    |  `C`  | UpperCamelCase   | `BytesPerSecond`   | `/cc/X`            |
    |  `U`  | UPPERCASE        | `BYTESPERSECOND`   | `/cu/X` or `/X/cu` |
    |  `s`  | snake_case       | `bytes_per_second` | `/cl/Ta/ra _`      |
    |  `S`  | camel_Snake_Case | `bytes_Per_Second` |                    |
    |  `i`  | Title_Case       | `Bytes_Per_Second` | `/cc/Ta/ra _`      |
    |  `A`  | ALL_CAPS         | `BYTES_PER_SECOND` | `/cu/Ta/ra _`      |
    |  `d`  | dash-case        | `bytes-per-second` | `/cl/Ta/ra -`      |
    |  `t`  | Train-Case       | `Bytes-Per-Second` | `/cc/Ta/ra -`      |
    |  `T`  | TRAIN-CASE       | `BYTES-PER-SECOND` | `/cu/Ta/ra -`      |


#### Paragraph formatting

???+ warning "Work in progress"

    Paragraph formatting is in the features road map. It will consist in two
    filters to manage paragraphs:

      1. Basic formatting to a given width
      2. Formatting to a given width adding a prefix at each line

    Additional filters could be provided, like justifying a paragraph.


### Custom Text Filters (lib)

!!! info inline end "Note"

    This feature is only available for the library, not for the command line.

A text filter is a pointer to a function with the signature

```ada
   function Text_Filter (S : String) return String;
```

Text filters are passed to the mold library as an array of pointers to
functions numbered in the range `0..9`. Thus, when you want to use a custom
text filter, you can write

```md title="README.mb.mold"
   {{  TITLE  }}
   {{  TITLE/0}}
   Hello {{ ?world }}, this is just an {{           example  }}
```

The syntax `/0` after `TITLE`, tells mold to apply the filter in the 0th
position of the array before the variable substitution. Assuming that the 0th
element of the array of texts filters points to a function that returns a
sequence of `"---"` with the same length of the argument, the resulting
substitution would be:

```md title="README.mb.mold"
   README, please
   --------------
   Hello , this is just an example text
```


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

Undefined variables in a file name always issue a warning; no optional
substitution here. Substitution in file names is enabled by default, but can
be disabled.

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


|                       Setting | Description                                                               | Default   |
| ----------------------------: | :------------------------------------------------------------------------ | :-------- |
|   `Replacement_In_File_Names` | Enables variable substitution in source file names.                       | `True`    |
|         `Delete_Source_Files` | Delete source files if variable substitution process finish successfully. | `True`    |
| `Overwrite_Destination_Files` | Overwrite destination files, if already exist.                            | `False`   |
|     `Enable_Defined_Settings` | Enable the use of mold settings in the definitions fie.                   | `True`    |
|            `Undefined_Action` | Action for undefined variable or invalid text filter.                     | `Ignore`  |
|             `Undefined_Alert` | Error handling for undefined variable or invalid text filter.             | `Warning` |
|  `Abort_On_Replacement_Error` | If `True`, aborts the process as soon as a replacement error is detected. | `True`    |


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
defined in [Settings](#settings):

| Setting                       | Variable                           |
| ----------------------------- | ---------------------------------- |
| `Replacement_In_File_Names`   | `mold-replacement-in-file-names`   |
| `Delete_Source_Files`         | `mold-delete-source-files`         |
| `Overwrite_Destination_Files` | `mold-overwrite-destination-files` |
| `Undefined_Action`            | `mold-undefined-action`            |
| `Undefined_Alert`             | `mold-undefined-alert`             |
| `Abort_On_Replacement_Error`  | `mold-abort-on-replacement-error`  |


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