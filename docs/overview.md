---
icon: octicons/telescope-24
---

# OVERVIEW

This document contains a mold guide that shows the main features of mold, with
brief examples that will help you understand basic operation.
### Different sources

Mold can operate on a single file or recursively in a given directory. All
files processed by Mold must end with the `mold` extension. The process of
variable substitution from a mold file generates a new file, with the same
name except the `mold` extension.

### Three modes of variable substitution

All variables can be used in three different substitution modes: `normal`,
`optional` and `mandatory`. This provides different error handling when Mold
encounters an undefined variable.

```txt title="substitution modes"
{{  foo }} -> normal    : configurable behavior when undefined
{{ ?foo }} -> optional  : always empty when undefined
{{ #foo }} -> mandatory : always error when undefined
```

### Variable definitions file

All variable values are assigned in a single TOML file. The accepted file
format is the most simple TOML format, with a single `variable = "value"`
assignment per line. Multiline variables are supported, as well.

```toml title="variable definitions (toml file)"
    foo = "foo"

    lorem_ipsum = '''Lorem ipsum dolor sit amet, consectetur adipiscing
    elit, sed do eiusmod empor incididunt ut labore et dolore magna
    aliqua.'''                                   #(1)

    sem_et_tortor = '''
    Sem et tortor consequat id porta nibh.
    '''                                          #(2)
```

1. This variable is replaced in two lines, next to the preceding text

2. This variable will replaced as a paragraph; includes the initial and ending
   new lines


### Variables in variables

Variables can be defined upon other variables, like

!!! danger inline end

    Recursive and cyclic definitions are not allowed. Variables `recursive`,
    `A` and `B` would issue an error.

```toml
    foo = "bar"
    bar = "foo-{{foo}}"  # equal to "foo-bar"

    recursive = "{{recursive}}"
    A = "{{B}}"
    B = "{{A}}"
```

### Text filters

Text filters are functions that can be applied during variable substitution
for additional text transformation. There a several predefined text filters
covering a wide range of uses cases. Additionally, with the mold library it is
possible to define your custom text filters.

```toml title="text filters"
   hello_world = "Hello, World!"
   hello_line  = "{{hello_world/s-}}"
```

??? example

    The result of
    ```txt
        {{hello_line}}
        {{hello_world}}
        {{hello_world/s=}}
    ```
    is
    ```txt
        -------------
        Hello, World!
        =============
    ```

### Source filename substitution

Variable substitution can be applied also in the source filename. The syntax
for variables is slightly different for filenames, for portability reasons,
but the concept is the same.

Applying

```toml
    foo = "foo"
    bar = "{{foo}}_bar"
```

to the file `__foo__-and-__bar__.txt.mold` will generate the file
`foo-and-foo_bar.txt`.

### Defined settings

It is possible to use special variables prefixed with `mold-`, like
`mold-delete-source-files`, to specify Mold settings inside the definitions
file. Settings specified by the command line or the library interface can be
overwritten by these defined settings. This enables the possibility to easily
remember and force some settings during development or production, regardless
of the settings used in the project configuration.

```toml title="defined settings"
    mold-replacement-in-filenames = "false"
    mold-on-undefined = "empty"
```

### Template inclusion

Mold allows the inclusion of template files, which must end with the extension
`molt`. This opens the possibility to write small snippets or generic
templates that can be easily shared across projects (eg, for headers or
footers). Template files are processed like regular files, so can contain mold
variables, too.

```sh title="template inclusion"
    In a mold file can appear variables, like {{foo}} and {{bar}}, as well as
    other mold or template files, like {{include:Template_File.molt}}.  #(1)
```

1. In the included file `Template_File.molt` will also take place the variable
   substitution process with the variables defined. ==Recursive and cyclic
   inclusion of files is not allowed.==
