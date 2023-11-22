---
icon: octicons/home-fill-24
---

![MOLD](img/Ada_Mold.png){ .alice align=right .off-glb }

# WELCOME TO MOLD

> *Meta-variable Operations for Lean Development*


Mold is a powerful tool that facilitates the creation and management of
project templates through customizable files with meta-variables. It allows
users to prepare a set of files and define placeholders (meta-variables) using
double curly braces that can be replaced with specific values when creating
new projects.

While Mold brings its own unique approach, several common features and
functionalities can be found in similar existing tools for project templating
and scaffolding.

### Different sources

Mold can operate on a single file or recursively in a given directory. All
files processed by Mold must end with the `mold` extension. The process of
variable substitution from a mold file generates a new file, with the same
name except the `mold` extension.

### Three modes of variable substitution

All variables can be used in three different substitution modes: `normal`,
`optional` and `mandatory`. This provides different error handling when Mold
encounters an undefined variable.

### Text filters

Text filters are functions that can be applied during variable substitution
for additional text transformation. There a several predefined text filters
covering a wide range of uses cases. Additionally, with the mold library it is
possible to define your custom text filters.

### Source filename substitution

Variable substitution can be applied also in the source filename. The syntax
for variables is slightly different for filenames, for portability reasons,
but the concept is the same.

### Variable definitions file

All variable values are assigned in a single TOML file. The accepted file
format is the most simple TOML format, with a single `variable = "value"`
assignment per line. Multiline variables are supported, as well.

### Defined settings

It is possible to use special variables prefixed with `mold-`, like
`mold-delete-source-files`, to specify Mold settings inside the definitions
file. Settings specified by the command line or the library interface can be
overwritten by these defined settings. This enables the possibility to easily
remember and force some settings during development or production, regardless
of the settings used in the project configuration.

### Template inclusion

Mold allows the inclusion of template files, which must end with the extension
`molt`. This opens the possibility to write small snippets or generic
templates that can be easily shared across projects (eg, for headers or
footers). Template files are processed like regular files, so can contain mold
variables, too.
