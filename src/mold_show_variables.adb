-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023-2025 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with GNAT.OS_Lib;

with CLIC.Subcommand; use CLIC.Subcommand;
use CLIC;
with Simple_Logging;

with Mold_Tools;

package body Mold_Show_Variables is

   package Log renames Simple_Logging;
   use all type Log.Levels;

   --------------------
   -- Setup_Switches --
   --------------------

   overriding
   procedure Setup_Switches
     (Cmd    : in out Cmd_Type;
      Config : in out CLIC.Subcommand.Switches_Configuration) is

   begin
      Define_Switch
        (Config,
         Cmd.Settings.Replacement_In_Variables'Access,
         Switch      => "-v",
         Long_Switch => "--no-variables",
         Help        => "No variable substitution in variables",
         Value       => False);
   end Setup_Switches;

   ----------------
   -- Execute --
   ----------------
   overriding
   procedure Execute (Cmd : in out Cmd_Type; Args : AAA.Strings.Vector) is
      Errors      : Boolean;
      Args_Length : constant Natural := Natural (Args.Length);
      pragma Unreferenced (Errors);
   begin
      Log.Debug ("Cmd.Settings = " & Cmd'Image);
      Log.Debug ("Args = " & Args'Image);
      for I in Args.First_Index .. Args.Last_Index loop
         Log.Debug ("Args(" & I'Image & ") = " & Args.Element (I));
      end loop;

      if Args_Length < 1 or else Args_Length > 2 then
         Log.Error ("Invalid number or arguments");
         GNAT.OS_Lib.OS_Exit (1);
      end if;

      if Log.Level >= Log.Detail then
         Mold_Tools.Show_Settings (Cmd.Settings);
      end if;

      Errors :=
        Mold_Lib.Show_Variables
          (Toml_File => Args (1), Settings => Cmd.Settings'Unchecked_Access);
   end Execute;

end Mold_Show_Variables;
