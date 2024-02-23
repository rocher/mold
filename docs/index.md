---
icon: octicons/home-24
---

![MOLD](img/Ada_Mold.png){ .alice align=right .off-glb }

# Mold

## Meta-variable Operations for Lean Development

<!--
<p style="font-size:2em;font-family:Oswald;margin-top:4em">
Meta-variable Operations for Lean Development
</p>
-->

Mold is a powerful tool that facilitates the creation and management of
project templates through customizable files with {meta-}variables.

---
!!! abstract inline begin "definitions.toml"

    ```toml
    foo = "Hello"
    bar = "World"
    ```

!!! success inline end "foo-bar.txt"

    ```txt
    Hello World,
    This is a mold file
    ```

!!! quote  "foo-bar.txt.mold"

    ```txt
    {{foo}} {{bar}},
    This is a mold file
    ```

---

While similar existing tools for project templating and scaffolding can be
found, Mold brings its own unique approach with a rich set of features and
functionalities.
