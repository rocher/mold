-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023-2025 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with AAA.Strings;
with GNAT.Strings;
with CLIC.Subcommand;

with Mold_Lib;

package Mold_Show_Variables is

   type Cmd_Type is new CLIC.Subcommand.Command with private;

   overriding
   function Name (Cmd : Cmd_Type) return CLIC.Subcommand.Identifier
   is ("show-vars");

   overriding
   function Usage_Custom_Parameters (Cmd : Cmd_Type) return String
   is ("DEFINITIONS_FILE");

   overriding
   function Short_Description (Cmd : Cmd_Type) return String
   is ("Show variables defined in a definitions file");

   pragma Style_Checks (off);
   overriding
   function Long_Description (Cmd : Cmd_Type) return AAA.Strings.Vector
   is (AAA.Strings.Empty_Vector.Append
         ("Show all variables defined in a definitions file once variable substitution and filters are applied. ")
         .New_Line
         .Append ("DEFINITIONS_FILE is a TOML file with variables defined like 'foo=""bar""'. Multiline variables are supported. See https://toml.io for more information.")
         .New_Line
         .Append ("Please visit https://rocher.github.io/mold for a complete reference.")
         .New_Line);
   pragma Style_Checks (on);

   overriding
   function Switch_Parsing
     (Cmd : Cmd_Type) return CLIC.Subcommand.Switch_Parsing_Kind
   is (CLIC.Subcommand.Parse_All);

   overriding
   procedure Setup_Switches
     (Cmd    : in out Cmd_Type;
      Config : in out CLIC.Subcommand.Switches_Configuration);

   overriding
   procedure Execute (Cmd : in out Cmd_Type; Args : AAA.Strings.Vector);

private

   type Cmd_Type is new CLIC.Subcommand.Command with record
      Settings : aliased Mold_Lib.Settings_Type := Mold_Lib.Default_Settings;
      Behavior_Str : aliased GNAT.Strings.String_Access := null;
   end record;

end Mold_Show_Variables;
