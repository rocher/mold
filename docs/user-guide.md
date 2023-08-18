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
      Output_Dir  : String          := "";
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

   type Undefined_Variable_Actions is (Ignore, Empty);
   type Undefined_Variable_Alerts  is (None, Warning);

   type Settings_Type is record
      Replacement_In_File_Names   : aliased Boolean;
      Delete_Source_Files         : aliased Boolean;
      Overwrite_Destination_Files : aliased Boolean;
      Enable_Defined_Settings     : aliased Boolean;
      Undefined_Variable_Action   : aliased Undefined_Variable_Actions;
      Undefined_Variable_Alert    : aliased Undefined_Variable_Alerts;
      Abort_On_Error              : aliased Boolean;
   end record;
```

If you specify a `null` pointer in the `Settings` parameter, then the default
settings are used, which are defined as:

```ada title="lib_mold.ads"
   Default_Settings : aliased Settings_Type :=
   (
      Replacement_In_File_Names   => True,
      Delete_Source_Files         => True,
      Overwrite_Destination_Files => False,
      Enable_Defined_Settings     => True,
      Undefined_Variable_Action   => Ignore,
      Undefined_Variable_Alert    => Warning,
      Abort_On_Error              => True
   );
```

Refer to [Settings](reference-guide.md#settings) section for more information.


### Results

If you give a pointer to a `Results_Type` object as parameter in the `Apply`
function, detailed results are provided:

```ada title="lib_mold.ads"
   type Field_Type is
   (
      Files_Processed,
      Files_Renamed,
      Files_Overwritten,
      Variables_Defined,     --  in the definitions file
      Variables_Found,       --  in all mold files
      Variables_Undefined,
      Variables_Replaced,
      Variables_Ignored,
      Variables_Emptied,
      Replacement_Warnings,
      Replacement_Errors
   );

   type Results_Type is array (Field_Type) of Natural;
```


## Command Line Tool

!!! warning

    Work still in progress.