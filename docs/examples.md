---
icon: octicons/rocket-24
---

# EXAMPLES

The mold crate contains a directory with several examples that guide the user
in using mold, from the very basic examples to the most complex ones through
the main features of mold (see [Installation](installation.md) for more
information on how to get mold).

This document contains a set of practical examples, also included in the
crate.

## Advent of Code

> _[Advent of Code](https://adventofcode.com) is an Advent calendar of small
> programming puzzles for a variety of skill sets and skill levels that can be
> solved in any programming language you like._

Imagine that you want to participate in "AoC" and want to solve the puzzles
using the [Ada programming language](https://ada-lang.io), using
[Alire](https://alire.ada.dev) and each one a separate directory; lets say,
`aoc/01`, `aoc/02` $\ldots$ `aoc/25`.

Each day, you create the `aoc/DD` directory to work on the puzzles. You have
three options:

  1. enter the `aoc/DD` directory and start from scratch

  2. copy a basic example project you have in `aoc/00` to the `aoc/DD`
     directory and manually change some data (Alire project name, day, etc)

  3. change the day in a definitions file and use `mold` command to generate
     the `aoc/DD` directory with everything you need

Let's concentrate in the last option ..

### Definitions file

Start by creating a definitions file like this one, using your real data:

```toml title="aoc.toml"
Day = "1"
Year = "2024"

Author = "Name Surname"
Email = "your.email@example.com"
Github_Username = "username"
Github_Repository = "advent_of_code-{{Year}}"
Address = "{{Author}} <{{Email}}>"
ZDay = "{{Day/pl02}}"
License = "MIT"
```

Each you'l have to increment the variable `Day`.

### Template directory

Next, create the directory `aoc/00` with the files you need. The command

```sh
$ mold aoc.toml 00 01
```

creates the directory `aoc/01` with all mold files with variables replaces
and, for some of them, filenames renamed during variable substitution.

The following diagram shows the directory `aoc/00` and the first day generated
with mold in `aoc/01`:

```txt title="aoc/00"
    aoc
    ├── 00
    |   ├── alire.toml.mold
    |   ├── aoc___Year_____ZDay__.gpr.mold
    |   ├── input.txt.mold
    |   ├── README.md.mold
    |   └── src
    |       ├── part_1.adb.mold
    |       └── part_2.adb.mold
    └── 01
        ├── alire.toml
        ├── aoc_2024_01.gpr
        ├── input.txt
        ├── README.md
        └── src
            ├── part_1.adb
            └── part_2.adb
```

For more information,

  * about this example: please visit
    [mold/examples](https://github.com/rocher/mold/tree/main/examples/05_advent_of_code/00) or get the mold crate.
  * results obtained in a real repository: see some examples in the [AoC
    2023](https://github.com/rocher/advent-of-code/tree/main/2023/)
