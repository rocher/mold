---
icon: octicons/book-24
---

# REFERENCE GUIDE

## Overall Process

Variable substitution takes place in a single file or directory, and
recursively, across all its sub-directories. Processed files must end with the
`mold` extension. The substitution process generates a new file with all the
variables replaced with the corresponding values. The new filename is the
same as the source file, but removing the `.mold`:

```bash
   README.md.mold ——[ Mold generates ]--> README.md
```

### Operating in directories

Mold can operate recursively across all subdirectories of a given directory.
Additionally, it is possible to specify a different output directory. This use
case comes in handy to create a new project directory starting from a given
template project.

Mold recurses all subdirectories and applies the variable substitution to all
Mold files found. The generated file is created in the same path, but relative
to the output directory. If necessary, all parent directories are created as
well.

Only Mold files, those ending with the extension `mold`, are processed.
Definition files and Mold templates are considered _working files_ and won't
be found in the output directory.

In the context of Mold, definition or variables files are `toml` files that
contain a set of variables defined in them. Template files with the extension
`molt` that can be included from Mold files. Templates files are used to
contain common parts of the contents, like headers, footers and the like.

The next example shows a template project with the `definitions.toml` file,
some `*.molt` templates and a set of Mold files. The project is structured in
several (sub)directories. The diagram show the files generated when Mold
processes the input directory `foo/` into the output path `/tmp/lorem/ipsum/`.
Not used files (non-appearing in the output tree) ara marked with `•->`:

```
INPUT DIRECTORY  ─[ Mold ]-> OUTPUT DIRECTORY = /tmp/lorem/ipsum

                                    /tmp/
                                     └── lorem/
                                         └── ipsum/
    foo/   ------------------------------>   ├── foo/
    ├── bar.txt.mold                         │   ├── bar.txt
    ├── baz.md.mold                          │   └── baz.md
    ├── definitions.toml                     |   •-> definitions file
    ├── header.molt                          |   •-> template file
    ├── subdir_1/   --------------------->   ├── subdir_1/
    │   ├── foo-bar.adb.mold                 │   ├── foo-bar.adb
    │   ├── bar-bar.ads.mold                 │   └── foo-bar.ads
    │   └── footer.molt                      |   •-> template file
    └── subdir_2/   --------------------->   └── subdir_2/
        ├── foo-2.adb.mold                       ├── foo-2.adb
        ├── bar-2.ads.mold                       ├── foo-2.ads
        ├── local-header.molt                    •-> template file
        └── subdir_3/   ----------------->       └── subdir_3/
            ├── foo-3.md.mold                        ├── foo-3.md
            └── bar.md.mold                          └── bar.md
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
error, report a warning or an error, and continue with the process.


## Variable Definition

Variables are defined inside a unique, TOML variable definition file.

### Definitions File

The default definitions file is called `mold.toml`. It must be a simple TOML
file, with variables like strings or paragraphs (multi-line variables)

```toml title="variable assignment"
   answer = "42"
   string = "value"
   paragraph = '''
      > This is a quotation.
   '''
```

Only strings are supported, and no arrays nor tables can be present. For more
information, please read the [TOML specification](https://toml.io). Comments
and multi-line strings are supported.

### Variables inside variables

Variable values can depend on other variables. That is, *the [variable
substitution](#variable-substitution) process* is performed in its entirety
inside the value of variables, including [text filters](#text-filters)
application.

```toml title="original definition"
   Greet = "Hello"
   Thing = "World"
   Greetings = "{{Greet}}, {{Thing}} !!"
```

```toml title="equivalence"
   Greet = "Hello"
   Thing = "World"
   Greetings = "Hello, World !!"
```

The definition order of variables is not relevant. The example above will work
the same as this case,

```toml title="order nor relevant"
   Greetings = "{{Greet}}, {{Thing}} !!"
   Greet = "Hello"
   Thing = "World"
```

because the variable substitution process is applied once all variables have
been read.

Of course, avoid recursive and cyclic definitions:

```toml title="INVALID cyclic and recursive definitions"
   Definition      Substitution
   -----------     ------------
   A = "{{A}}" --> A = "{{A}}" --> "{{A}}" --> ...
   B = "{{C}}" --> B = "{{D}}" --> "{{C}}" --> ...
   C = "{{D}}" --> C = "{{B}}" --> "{{D}}" --> ...
   D = "{{B}}" --> D = "{{C}}" --> "{{B}}" --> ...
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
   Hello World, this is just an example text
```

### Substitution Modes

There are three substitution modes inMold. The only difference between them is
the error handling when an undefined variable is found.

#### Normal

For an undefined variable, the default behavior is to issue an error and stop
the substitution process. If `world` was undefined, the above example would
be:

```md title="README.md.mold"
   README, please
   Hello {{ world }}, ths is just an example test
```
For normal substitution, it is possible to specify what to do when an
undefined variable is found:

* *On Undefined Action* determines if the normal substitution of an undefined
  variable must be ignored, emptied or errored. It can take the values:
    * `Ignore`, to left the variables as is; no warning issued
    * `Warning`, to replace the variable with an empty string and issue a
      warning
    * `Error`, to issue an error; this is the default action

#### Optional

Optional substitution is written as `{{ ?variable }}`, for any variable. For
undefined variables, optional substitution does not issue a warning and the
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
    optional. But we refer to them as _optional variables_ indistinctly.

    Any variable can be used as `{{variable}}` and `{{?variable}}` at
    different places, even in the same file.

#### Mandatory

Mandatory substitution is written as `{{ #variable }}`. If the variable is
undefined, Mold issues an error and makes no substitution. The substitution
process is aborted on error.

!!! warning "Syntax"

    In optional and mandatory substitution modes, characters `?` and `#` are
    part of the variable name, not part of the curly braces. Thus,
    `{{?variable}}` and `{{  #variable  }}` are valid variables, while
    `{{? variable }}` and `{{#  variable}}` are invalid.


### Examples

Examples with defined variable `foo="bar"` and variable `baz` undefined:

| Kind | Action | Variable | Replace | Error? |
| ---- | ------ | -------: | :------ | :----- |
**Defined variables**
Normal     | *any*   | `"{{foo}}"`  | `"bar"`     |         |
Optional   | —       | `"{{?foo}}"` | `"bar"`     |         |
Mandatory  | —       | `"{{#foo}}"` | `"bar"`     |         |
**Undefined variables**
Normal     | Ignore  | `"{{baz}}"`  | `"{{baz}}"` |         |
Normal     | Warning | `"{{baz}}"`  | `""`        | Warning |
Normal     | Error   | `"{{baz}}"`  | *none*      | Error   |
Optional   | —       | `"{{?baz}}"` | `""`        |         |
Mandatory  | —       | `"{{#baz}}"` | *none*      | Error   |


## Predefined Variables

Mold contains a set of predefined variables that let you extract internal
information of mold (version, license, etc) or the date and time according to
a format.

### Mold internals

#### Basic information

  | Name                 | Value                                   |
  |----------------------|-----------------------------------------|
  | `mold-version`       | 2.3.0-pre.2                             |
  | `mold-documentation` | https://rocher.github.io/mold           |
  | `mold-copyright`     | Copyright (c) 2023-2025 Francesc Rocher |
  | `mold-license`       | MIT                                     |
  | `mold-license-spdx`  | SPDX-License-Identifier: MIT            |

#### Host and build information

  | Name                 | Value (examples)                        |
  |----------------------|-----------------------------------------|
  | `mold-host-os`       | linux                                   |
  | `mold-host-arch`     | x86_64                                  |
  | `mold-host-distro`   | ubuntu                                  |
  | `mold-build-profile` | DEVELOPMENT                             |

Examples:

  * `Mold version: {{mold-version}}` $\rightarrow$ `Mold version: 2.3.0-pre.2`
  * `Mold license: {{mold-license}}` $\rightarrow$ `Mold license: MIT`

<!-- It allows you to replace -->

### Mold Settings

Most of the configurable settings that mold accepts (command line arguments)
can also be modified via predefined variables. In this case, you use them in
the toml file to set or modify a mold setting.

For example, to make sure that you always overwrite destination files, no
matter how `mold apply` is invoked, you can use:

```toml title="mold.toml"
    # other regular variable definitions
    ...
    mold-overwrite-destination-files = "true"
```

See [section Settings](#settings) for more information.

### Date and time variables

A predefined date variable has the form `{mold-date-<FORMAT>}`, where
`<FORMAT>` is a string to describe the desired date and time output.

`<FORMAT>` follows the GNU Date Specification and accepts the following tags:

=== "==&nbsp;&nbsp;Text Fields&nbsp;&nbsp;=="

    | **Tag**  | **Output**       |
    |----------|------------------|
    | `%%`     | a literal `%`    |
    | `n`      | a newline        |
    | `t`      | a horizontal tab |

=== "==&nbsp;&nbsp;Time Fields&nbsp;&nbsp;=="

    | **Tag**  | **Output**                       |
    |----------|----------------------------------|
    | `%H`     | hour (00..23)                    |
    | `%I`     | hour (01..12)                    |
    | `%k`     | hour ( 0..23)                    |
    | `%l`     | hour ( 1..12)                    |
    | `%M`     | minute (00..59)                  |
    | `%p`     | locale's AM or PM                |
    | `%r`     | time, 12-hour (hh\:mm\:ss [AP]M) |
    | `%s`     | seconds since 1970-01-01 00:00:00 UTC (non-standard extension) |
    | `%S`     | second (00..59)                  |
    | `%T`     | time, 24-hour (hh\:mm\:ss)       |
    | `%:::z`  | numeric time zone with \: to necessary precision (e.g., -04, +05:30) |

=== "==&nbsp;&nbsp;Date Fields&nbsp;&nbsp;=="

    | **Tag** | **Output**                                                     |
    |---------|----------------------------------------------------------------|
    | `%a`    | locale's abbreviation weekday name (Sun..Sat)                  |
    | `%A`    | locale's full weekday name, variable length (Sunday..Saturday) |
    | `%b`    | locale's abbreviated month name (Jan..Dec)                     |
    | `%B`    | locale's full month name, variable length (January..December)  |
    | `%c`    | locale's date and time (Sat Nov 04 12\:02\:33 EST 1989)        |
    | `%d`    | day of month (01..31)                                          |
    | `%D`    | date (mm/dd/yy)                                                |
    | `%h`    | same as `%b`                                                   |
    | `%j`    | day of year (001..366)                                         |
    | `%m`    | month (01..12)                                                 |
    | `%U`    | week number of year with Sunday as first day of week (00..53)  |
    | `%w`    | day of week (0..6) with 0 corresponding to Sunday              |
    | `%W`    | week number of year with Monday as first day of week (00..53)  |
    | `%x`    | locale's date representation (mm/dd/yy)                        |
    | `%y`    | last two digits of year (00..99)                               |
    | `%Y`    | year (1970...)                                                 |

=== "==&nbsp;&nbsp;Padding Extensions&nbsp;&nbsp;=="

    Be default, date pads numeric fields with zeroes. GNU date recognizes the
    following nonstandard numeric modifiers:

    | **Modifiers** | **Output**                             |
    |---------------|----------------------------------------|
    | `-`           | (hyphen) do not pad the field          |
    | `_`           | (underscore) pad the field with spaces |

=== "==&nbsp;&nbsp;Time Extensions&nbsp;&nbsp;=="

    | **Tag** | **Output**              |
    |---------|-------------------------|
    | `%i`    | milliseconds (3 digits) |
    | `%e`    | microseconds (6 digits) |
    | `%o`    | nanoseconds  (9 digits) |

=== "==&nbsp;&nbsp;Shortcuts&nbsp;&nbsp;=="

    | **Tag**    | **Output**                             |
    |------------|----------------------------------------|
    | `ISO_Time` | Equivalent to `%Y-%m-%dT%H:%M:%S%:::z` |
    | `ISO_Date` | Equivalent to `%Y-%m-%d`               |
    | `US_Date`  | Equivalent to `%m/%d/%y`               |
    | `EU_Date`  | Equivalent to `%d/%m/%y`               |

Examples:

  * `Today is {{mold-date-ISO_Date}}` $\rightarrow$ `Today is 2025-05-21`
  * `{{mold-date-%H}}` $\rightarrow$ `13`
  * `{{mold-date-%I%p}}` $\rightarrow$ `13PM`
  * `{{mold-date-%A-%B-%d}}` $\rightarrow$ `Wednesday-May-21`
  * `{{mold-date-%o}}` $\rightarrow$ `810831000`

???+ note "Unique point in time"

    All date/time variables are referred to the same point in time. That is,
    there is a time variable that is instantiated with the clock time when
    `mold` is launched, and all date/time variables are referred to this
    variable. This means that, if you use two times the expression
    `{{mold-date-%o}}` to get the nanoseconds, you always will get the same
    result, no matter if both expressions are separated in time by several
    variables replaced in different files.


## Text Filters

Text filters enable text transformations before variable substitution. In the
command line, there are few predefined text filters. In the library, you can
additionally provide up to ten custom filters. In general, a text filter is a
function that receives the value of the variable as an argument, applies some
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

In this example, the `/s-` part tells Mold to apply the predefined filter
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

!!! example end "Filers and predefined variables"

    Filters can be applied to predefined variables, e.g. to `mold-date<FORMAT>` variables:

      * `{{mold-date-ISO_Time}}` $\rightarrow$ `2025-05-10T22:47:28+02`
      * `{{mold-date-ISO_Time/ra0O}}` $\rightarrow$ `2O25-O5-1OT22:47:28+O2`
      * `{{mold-date-ISO_Time/ra0O/ra5S}}` $\rightarrow$ `2O2S-OS-1OT22:47:28+O2`
      * `{{mold-date-ISO_Time/ra0O/ra5S/ra4A}}` $\rightarrow$ `2O2S-OS-1OT22:A7:28+O2`

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

!!! example "Equivalences"

    Some naming styles can be obtained by composing other predefined text
    filters. For example, `/ns` is the same as `/cl/Ta/ra _`.

#### Paragraph formatting

???+ warning "Work in progress"

    Paragraph formatting is in the road map. It will consist in two filters to
    manage paragraphs:

      1. Basic formatting to a given width
      2. Formatting to a given width adding a prefix at each line

    Additional filters could be provided, like justifying a paragraph.


### Custom Text Filters

!!! info inline end "Note"

    This feature is only available for the library, not for the command line.

A text filter is a pointer to a function with the signature

```ada
   function Text_Filter (S : String) return String;
```

Text filters are passed to the Mold library as an array of pointers to
functions numbered in the range `0..9`. Thus, when you want to use a custom
text filter, you can write

```md title="README.mb.mold"
   {{  TITLE  }}
   {{  TITLE/0}}
   Hello {{ ?world }}, this is just an {{           example  }}
```

The syntax `/0` after `TITLE`, tells Mold to apply the filter in the 0th
position of the array before the variable substitution. Assuming that the 0th
element of the array of texts filters points to a function that returns a
sequence of `"---"` with the same length of the argument, the resulting
substitution would be:

```md title="README.mb"
   README, please
   --------------
   Hello , this is just an example text
```

!!! danger "Security Alert"

    Custom filters can run arbitrary code. Use them only on your own. Do not
    run modified versions of the library that offer _awesome custom filters_
    if you do not trust the author or the source.

### Variable substitution

When using text filter with variable values, the replacement algorithm applies
first all variable substitution and then applies all filters.

For example, if date/time variables are defined like this:

```toml title="date-time.toml"
   date-time = "Date {{mold-date-ISO_Date}} and time {{mold-date-ISO_time}}"
   date_time = "{{date-time/ra-_}}"  # replace all '-' with '_'
```

when applied to the file:

```txt title="destination.txt.mold"
   date-time is {{date-time}}
   date_time is {{date_time}}
```

the result is this:

```txt title="destination.txt"
   date-time is Date 2025-05-29 and time 2025-05-29T19:30:36+02
   date_time is DAte 2025_05_29 and time 2025_05_29T19:30:36+02
```

## Filename Substitution

Variables in filenames must be written with the syntax `__variable__`, with no
spaces between the variable name and the two underscores. Text filters cannot
be used in filename substitution.

For example, the file

```bash
   README___world__.md.mold
```

would generate, with the above definitions, a new file called

```bash
   README_World.md
```

Substitution in filenames is enabled by default, but can be disabled.

!!! warning "Warning"

    Although it is possible to use directory names in variables definitions,
    like `world = "foo/bar"` to generate the file `README_foo/bar.md`, it is a
    strongly not recommended practice, for portability reasons. Mold does not
    check if you use directory separators in variable values, so use at your
    own risk. It is better to create previously the necessary directory
    structure and makeMold operate in a directory.


## Settings

The `mold` tool is a CLI wrapper of `mold_lib`, so this section applies to both
implementations. There is a flag in the `mold` tool with the exact meaning:


|                       Setting | Description                                                               | Default   |
| ----------------------------: | :------------------------------------------------------------------------ | :-------- |
|    `Replacement_In_Filenames` | Enables variable substitution in source filenames.                        | `True`    |
|    `Replacement_In_Variables` | Enables variable substitution in variables definitions.                   | `True`    |
|         `Delete_Source_Files` | Delete source files if variable substitution process finish successfully. | `False`   |
| `Overwrite_Destination_Files` | Overwrite destination files, if already exist.                            | `True`    |
|     `Enable_Defined_Settings` | Enable the use of Mold settings in the definitions fie.                   | `True`    |
|                `On_Undefined` | Action when undefined variables or invalid text filters are found.        | `Error`   |


### Defined Settings

All the above settings can be defined also in the definitions file, except the
`Enable_Defined_Settings` itself.

All variables starting with the prefix `mold-` are considered by Mold as
*setting variables*, which means that they change the way in which Mold
behaves by changing a Mold setting.

For example,

```toml title="mold.toml"
   mold-delete-source-files = "true"

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
         `mold-delete-source-files`         = "{{mold-delete-source-files}}"
         `mold-overwrite-destination-files` = "{{mold-overwrite-destination-files}}"
```

would generate

!!! info inline end note "Values"

    The value of `mold-delete-source-file` comes from the toml file. The value
    of `mold-overwrite-destination-files` is the default value for that setting.


```md title="README_World.md"
   README, please
   Hello World, ths is just an example text

   Note: This file generated with defined settings
         `mold-delete-source-files`         = "true"
         `mold-overwrite-destination-files` = "true"
```


The set of defined setting available are, for the corresponding settings
defined in [Settings](#settings):

| Setting                       | Variable                           | Possible values              |
| ----------------------------- | ---------------------------------- | ---------------------------- |
| `Replacement_In_Filenames`    | `mold-replacement-in-filenames`    | `True`, `False`              |
| `Replacement_In_Variables`    | `mold-replacement-in-variables`    | `True`, `False`              |
| `Delete_Source_Files`         | `mold-delete-source-files`         | `True`, `False`              |
| `Overwrite_Destination_Files` | `mold-overwrite-destination-files` | `True`, `False`              |
| `Enable_Defined_Settings`     | `mold-enable-defined-settings`     | `True`, `False`              |
| `On_Undefined`                | `mold-on-undefined`                | `Ignore`, `Warning`, `Error` |


## Template Inclusion

External template files can be used as a generic template for header, footers
and so on. These template files must have the `molt` extension. Can be
included at any point in a `mold` file, in a single line, with the syntax

```md
   {{ include:header.molt }}
```

The filename can be relative path to the current Mold file being processed,
or relative to the working directory from which the Mold tool was invoked.

When this line is found, Mold opens and processes the included file and the
output is sent into the currently generated file. The same set or defined
variables is replaced in the template.

This is useful to share template snippets across several files or projects,
greatly simplifying the maintenance.

A template file can include other template files. The only limit on how many
included files are supported is on your system. When circular dependencies are
detected, an error is reported and the process is stopped.
