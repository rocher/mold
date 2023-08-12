# USER GUIDE

## Ada Library

The Ada interface of `libmold` is quite simple. It consists of a unique
public package with only one function.

All the following descriptions are in the context of the `Lib_Mold` package:

```ada title="lib_mold.ads"
   package Lib_Mold is

      --  type definitions and function declaration

   end Lib_Mold;
```


### Apply

The only function call available is:

```ada title="mold.ads"
   function Apply
   (
      Source      : String          := ".";
      Output_Dir  : String          := ".";
      Definitions : String          := "mold.toml";
      Settings    : Settings_Access := null;
      Results     : Results_Access  := null
   )
   return Natural;
```

  1. `Source` is a file or directory name.

  2. `Output_Dir` is a directory name used when `Source` is a file name to
     create the generated file in a different directory.

  3. `Definition` is the file name that contains the variables definition.

  4. `Settings` is a pointer to a `Mold.Settings_Type` object. If `null`, the
     default settings are used. See section below for a complete description.

  5. Return value is the number of errors detected.


### Settings

The `Settings_Type` is defined as:

```ada title="mold.ads"

   type Settings_Type is record
      Rename_Source    : aliased Boolean;
      Delete_Source    : aliased Boolean;
      Overwrite        : aliased Boolean;
      Defined_Settings : aliased Boolean;
      Action           : aliased Undef_Var_Action;
      Alert            : aliased Undef_Var_Alert;
      Abort_On_Error   : aliased Boolean;
   end record;

   type Settings_Access is access all Settings_Type;
```

If you specify a `null` pointer in the `Settings` parameter, then the default
settings are used, which are defined as:

```ada title="mold.ads"
   Default_Settings : aliased Settings_Type :=
   (
      Rename_Source    => True,
      Delete_Source    => True,
      Overwrite        => False,
      Defined_Settings => True,
      Action           => Ignore,
      Alert            => Warning,
      Abort_On_Error   => True
   );
```

Refer to [Settings](reference-guide.md#settings) section for more information.


### Results

If you give a pointer to a `Results_Type` object as parameter in the `Apply`
function, detailed results are provided:

```ada title="mold.ads"
   type Field_Type is
   (
      Files,          --  files processed
      Renamed,        --  files renames
      Overwritten,    --  files overwritten
      Variables,      --  variables found
      Defined,        --  variables with a defined value
      Undefined,      --  undefined variables found
      Substituted,    --  replacements made with a defined value
      Ignored,        --  replacements ignored
      Emptied,        --  replacements emptied
      Warnings,       --  warnings issued
      Errors          --  errors issued
   );

   type Results_Type is array (Field_Type) of Natural;
   type Results_Access is access all Results_Type;
```


## Command Line Tool

!!! warning

    Work still in progress.
