This directory contains a practical example used to generate Advent of Code
2023 entries. Each entry is a stand-alone Alire project to solve the problem
of a particular day. The author used it during AoC 2023; more info and
problems solved at [rocher AoC/2023](https://github.com/rocher/advent-of-code/tree/main/2023)

In case you want to use it, you must edit the file `aoc.toml` to change the
year and use your data (name, surname, email, ..)

The directory `00` is a template to generate a daily project. It contains all
files required by an alire project: manifest `alire.toml`, gprbuild file and
source files with a fake soultion.

To generate a daily project, edit the file `aoc.toml` and change the day.
Then, to generate day 1 for example, use the command

```sh
   mold apply aoc.toml 00 01
```

The directory `01` contains the same as in `00` but instantiated for day 1.
You can compile `src/*` files and run them from `bin/*`:

```sh
   cd 01
   alr build
   ./bin/part_1
   ./bin/part_2
```
