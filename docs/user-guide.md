---
icon: octicons/info-24
---

# USER GUIDE

---

[![MOLD](img/Ada_Mold_CLI.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold)
## Command Line Tool

!!! warning

    Work still in progress, no public release still available.

---

[![MOLD](img/Ada_Mold_Lib.png){ .alice-half align=right .off-glb }](https://github.com/rocher/mold_lib)
## Ada Library

The Ada interface of `mold_lib` is quite simple. It consists of a unique
public package with only one function.

All the following descriptions are in the context of the `Mold_Lib` package:

```ada title="mold_lib.ads"
   package Mold_Lib is

      --  type definitions and function declaration

   end Mold_Lib;
```

### Apply

The only function call available is:

```ada title="mold.ads"
   function Apply
   (
      Source     : String          := ".";
      Output_Dir : String          := "";
      Toml_File  : String          := "mold.toml";
      Settings   : Settings_Access := null;
      Filters    : Filter_Access   := null;
      Results    : Results_Access  := null;
      Log_Level  : Log.Levels      := Log.Info;
   )
   return Boolean;
```

  1. `Source` is a filename or directory name.

  2. `Output_Dir` is a directory name used when `Source` is a filename to
     create the output file in a different directory.

  3. `Toml_File` is the filename that contains the variables definition.

  4. `Settings` is a pointer to a `Mold.Settings_Type` object. If `null`, the
     default settings are used. See section below for a complete description.

  5. `Filters` is an array `(0..9)` of pointers to functions with the
     signature
     ```ada
        function (S : String) return String;
     ```
     See [Custom Text Filters](reference-guide.md#custom-text-filters-lib) for
     more  information.

  6. `Results` is a pointer to a `Results_Type` object. If not `null`, a
     report of all mold activity will be filled.

  6. Return value is `True` when the process finishes successfully.


### Settings

The `Settings_Type` is defined as:

```ada title="mold.ads"
   type Undefined_Variable_Actions is (Ignore, Empty);
   type Undefined_Alerts  is (None, Warning, Error);

   type Settings_Type is record
      Replacement_In_Filenames    : aliased Boolean;
      Replacement_In_Variables    : aliased Boolean;
      Delete_Source_Files         : aliased Boolean;
      Overwrite_Destination_Files : aliased Boolean;
      Enable_Defined_Settings     : aliased Boolean;
      Undefined_Action            : aliased Undefined_Actions;
      Undefined_Alert             : aliased Undefined_Alerts;
   end record;
```

If you specify a `null` pointer in the `Settings` parameter, then the default
settings are used, which are defined as:

```ada title="mold_lib.ads"
   Default_Settings : aliased Settings_Type :=
   (
      Replacement_In_Filenames    => True,
      Replacement_In_Variables    => True,
      Delete_Source_Files         => False,
      Overwrite_Destination_Files => True,
      Enable_Defined_Settings     => True,
      Undefined_Action            => Ignore,
      Undefined_Alert             => Warning
   );
```

Refer to [Settings](reference-guide.md#settings) section for more information.


### Results

If you give a pointer to a `Results_Type` object as parameter in the `Apply`
function, detailed results are provided:

```ada title="mold_lib.ads"
   type Field_Type is
   (
      Files_Processed,
      Files_Renamed,
      Files_Overwritten,
      Files_Deleted,
      Variables_Defined,     --  in the toml file
      Variables_Found,       --  in all mold files
      Variables_Undefined,
      Variables_Replaced,
      Variables_Ignored,
      Variables_Emptied,
      Warnings
   );

   type Results_Type is array (Field_Type) of Natural;
```
