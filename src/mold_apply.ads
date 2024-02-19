-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023, 2024 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with AAA.Strings;
with GNAT.Strings;
with CLIC.Subcommand;

with Mold_Lib;

package Mold_Apply is

   type Cmd_Type is new CLIC.Subcommand.Command with private;

   overriding function Name
     (Cmd : Cmd_Type) return CLIC.Subcommand.Identifier is
     ("apply");

   overriding function Usage_Custom_Parameters
     (Cmd : Cmd_Type) return String is
     ("DEFINITIONS PATH [ OUTPUT_DIRECTORY ]");

   overriding function Short_Description (Cmd : Cmd_Type) return String is
     ("Apply variable substitution to a file or directory");

   --!pp off
   pragma Style_Checks (off);

   overriding function Long_Description
     (Cmd: Cmd_Type) return AAA.Strings.Vector is
     (AAA.Strings.Empty_Vector
         .Append ("Apply variable substitution process to a file or directory. It requires a definitions file and a path, either a file or directory")
         .New_Line
         .Append ("DEFINITIONS file is a TOML file with variables defined like 'foo=""bar""'. Multiline variables are supported. See https://toml.io for more information. Definitions file can also contain mold settings that are applied when enabled.")
         .New_Line
         .Append ("PATH is either a mold file or directory. When a directory is used, the variable substitution process is applied to all mold files, recursively in all subdirectories. Mold files must have the 'mold' extension. Generated files by the process have the same name removing the 'mold' extension. Variable substitution process is applied also to filenames.")
         .New_Line
         .Append ("Please visit https://rocher.github.io/mold for a complete reference.")
         .New_Line
     );

   pragma Style_Checks (on);
   --!pp on

   overriding function Switch_Parsing
     (Cmd : Cmd_Type) return CLIC.Subcommand.Switch_Parsing_Kind is
     (CLIC.Subcommand.Parse_All);

   overriding procedure Setup_Switches
     (Cmd    : in out Cmd_Type;
      Config : in out CLIC.Subcommand.Switches_Configuration);

   overriding procedure Execute
     (Cmd : in out Cmd_Type; Args : AAA.Strings.Vector);

private

   type Cmd_Type is new CLIC.Subcommand.Command with record
      Settings : aliased Mold_Lib.Settings_Type := Mold_Lib.Default_Settings;
      Behavior_Str : aliased GNAT.Strings.String_Access := null;
   end record;

end Mold_Apply;
