---
icon: octicons/tools-24
---

# INSTALLATION

---

[![MOLD](img/Ada_Mold_CLI.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold)
## Command Line Tool

### Compile the source code

Use [Alire](https://alire.ada.dev/) to get and build the `mold` crate from the
[Alire community index](https://alire.ada.dev/crates/mold.html).

```sh title="get & compile"
    alr index --update-all    # if needed
    alr get --build mold
```

There is no install procedure (yet) You have to manually copy
`mold_*/bin/mold` somewhere in your `PATH` to make it available in your system
(preferably in `/usr/local/bin/` or similar).

### Examples

The `examples` directory that comes with the source code contains lot of
scripts, a very useful source of inspiration.

---

[![MOLD](img/Ada_Mold_Lib.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold_lib)
## Ada Library

### Compile the source code

Use [Alire](https://alire.ada.dev/) to get and build the `mold_lib` crate from
the [Alire community index](https://alire.ada.dev/crates/mold_lib.html):

```sh title="build"
    alr index --update-all    # if needed
    alr get --build mold_lib
```

### Run the unit tests

To build and run the unis tests:

```sh title="unit tests"
    cd mold_lib_*/tests
    alr build
    ./bin/mold_lib_tests
```
Remember to clean the `suite` directory to run the unit tests again with `git
clean -dfx suite`.

### Integrate into your Ada project

This allows you to integrate the `mold_lib` crate into your Ada project:

```sh title="dependency"
    alr index --update-all    # if needed
    alr with mold_lib
```

Please refer to the [Alire documentation](https://alire.ada.dev/docs) for more
information.
