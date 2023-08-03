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
name except the `mold` extension. If the generated file name already exists,
an error can be issued or overwriting it can be forced.

### Three modes of variable substitution

All variables can be used in three different substitution modes: `normal`,
`optional` and `mandatory`. This provides different error management when Mold
encounters an undefined variable.

### Source file name substitution

Variable substitution can be applied also in the source file name. The syntax
for variables is slightly different for file names, for portability reasons,
but the concept is the same.

### Variable definitions file

All variable values are assigned in a single TOML file. The accepted file
format is the most simple TOML format, with a single `vairable = "value"`
assignment per line.

### Defined settings

It is possible to use variables prefixed with `mold-`, like `mold-overwrite`,
to specify Mold settings inside the definitions file. Settings specified by
the command line or the library interface can be overwritten by these defined
settings. This enables the possibility to easily remember and force some
settings during development, regardless of the settings in the project
configuration.

### Template inclusion

Mold allows the inclusion of template files, which must have extension `molt`.
This opens the possibility to write small snippets or generic templates that
can be used across projects.
