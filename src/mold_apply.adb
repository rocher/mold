-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with GNAT.Strings; use GNAT.Strings;
with GNAT.OS_Lib;

with AAA.Table_IO;
with CLIC.Subcommand; use CLIC.Subcommand;
with CLIC.TTY;        use CLIC;
with Simple_Logging;

with Mold_CLI;

package body Mold_Apply is

   package Log renames Simple_Logging;
   use all type Log.Levels;

   Invalid_Action : exception;
   Invalid_Alert  : exception;

   ----------------
   -- Get_Action --
   ----------------

   function Get_Action (Value : String) return Mold_Lib.Undefined_Actions is
   begin
      return Result : Mold_Lib.Undefined_Actions do
         Log.Debug ("Get_Action");
         Log.Debug ("   Value  : " & Value);
         Result := Mold_Lib.Undefined_Actions'Value (Value);

      exception
         when Constraint_Error =>
            raise Invalid_Action;
      end return;
   end Get_Action;

   ---------------
   -- Get_Alert --
   ---------------

   function Get_Alert (Value : String) return Mold_Lib.Undefined_Alerts is
   begin
      return Result : Mold_Lib.Undefined_Alerts do
         Log.Debug ("Get_Alert");
         Log.Debug ("   Value  : " & Value);
         Result := Mold_Lib.Undefined_Alerts'Value (Value);

      exception
         when Constraint_Error =>
            raise Invalid_Alert;
      end return;
   end Get_Alert;

   --------------------
   -- Setup_Switches --
   --------------------

   overriding procedure Setup_Switches
     (Cmd    : in out Cmd_Type;
      Config : in out CLIC.Subcommand.Switches_Configuration)
   is

   begin
      --!pp off
      pragma Style_Checks (off);

      Define_Switch
        (Config,
         Cmd.Settings.Replacement_In_Filenames'Access,
         Switch      => "-f",
         Long_Switch => "--replace-filenames",
         Help        => "Variable substitution in filenames"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Delete_Source_Files'Access,
         Switch      => "-d",
         Long_Switch => "--delete-sources",
         Help        => "Delete source files"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Overwrite_Destination_Files'Access,
         Switch      => "-o",
         Long_Switch => "--overwrite",
         Help        => "Overwrite destination files"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Enable_Defined_Settings'Access,
         Switch      => "-s",
         Long_Switch => "--defined-settings",
         Help        => "Enable defined settings"
      );

      Define_Switch
        (Config,
        Cmd.Action_Str'Access,
         Switch      => "-c:",
         Long_Switch => "--action=",
         Argument    => "ACTION",
         Help        => "Undefined action: [ignore], empty"
      );

      Define_Switch
        (Config,
         Cmd.Alert_Str'Access,
         Switch      => "-l:",
         Long_Switch => "--alert=",
         Help        => "Undefined alert: none, warning, [error]",
         Argument    => "LEVEL"
      );

      pragma Style_Checks (on);
      --!pp on
   end Setup_Switches;

   -------------
   -- Execute --
   -------------

   overriding procedure Execute
     (Cmd : in out Cmd_Type; Args : AAA.Strings.Vector)
   is
      Args_Length : constant Natural := Natural (Args.Length);
   begin
      if Cmd.Action_Str.all'Length > 0 then
         Cmd.Settings.Undefined_Action := Get_Action (Cmd.Action_Str.all);
      else
         Cmd.Settings.Undefined_Action := Mold_Lib.Ignore;
      end if;

      if Cmd.Alert_Str.all'Length > 0 then
         Cmd.Settings.Undefined_Alert := Get_Alert (Cmd.Alert_Str.all);
      else
         Cmd.Settings.Undefined_Alert := Mold_Lib.Error;
      end if;

      Log.Debug ("Cmd.Settings = " & Cmd'Image);
      Log.Debug ("Args = " & Args'Image);
      for I in Args.First_Index .. Args.Last_Index loop
         Log.Debug ("Args(" & I'Image & ") = " & Args.Element (I));
      end loop;

      if Args_Length < 2 or else Args_Length > 3 then
         Log.Error ("Invalid number or arguments");
         GNAT.OS_Lib.OS_Exit (1);
      end if;

      if Log.Level >= Log.Detail then
         declare
            T : AAA.Table_IO.Table;

            function Bold (S : String) return String is
              (if Mold_CLI.Global_Switch.TTY then TTY.Bold (S) else S);

            function Bool (B : Boolean) return String is
              (if Mold_CLI.Global_Switch.TTY then
                 (if B then TTY.OK ("TRUE") else TTY.Error ("FALSE"))
               else B'Image);
         begin
            T.Append (Bold ("Arguments"));
            T.Append ("");
            T.New_Row;
            T.Append ("  variables (TOML file)");
            T.Append (Args.Element (1));
            T.New_Row;
            T.Append ("  source file/directory");
            T.Append (Args.Element (2));
            T.New_Row;
            T.Append ("  output directory");
            if Natural (Args.Length) >= 3 then
               T.Append (Args.Element (3));
            else
               T.Append ("");
            end if;
            T.New_Row;

            T.Append (Bold ("Settings"));
            T.Append ("");
            T.New_Row;
            T.Append ("  replacement in filename");
            T.Append (Bool (Cmd.Settings.Replacement_In_Filenames));
            T.New_Row;
            T.Append ("  delete source files");
            T.Append (Bool (Cmd.Settings.Delete_Source_Files));
            T.New_Row;
            T.Append ("  overwrite destination files");
            T.Append (Bool (Cmd.Settings.Overwrite_Destination_Files));
            T.New_Row;
            T.Append ("  enable defined settings");
            T.Append (Bool (Cmd.Settings.Enable_Defined_Settings));
            T.New_Row;
            T.Append ("  undefined action");
            T.Append (Cmd.Settings.Undefined_Action'Image);
            T.New_Row;
            T.Append ("  undefined alert");
            T.Append (Cmd.Settings.Undefined_Alert'Image);
            T.New_Row;
            T.Print;
         end;
      end if;

      declare
         Errors : Boolean;
         Idx    : constant Positive := Args.First_Index;

         Output_Dir : constant String :=
           (if Args_Length = 3 then Args.Element (Idx + 2) else "");
      begin

         --!pp off
         Errors :=
           Mold_Lib.Apply (
               Source     => Args.Element (Idx + 1),
               Output_Dir => Output_Dir,
               Toml_File  => Args.Element (Idx),
               Settings   => Cmd.Settings'Unrestricted_Access,
               Log_Level  => Log.Level
            );
         --!pp on

         if Errors then
            GNAT.OS_Lib.OS_Exit (1);
         end if;
      end;

   exception
      when Invalid_Action =>
         Log.Error ("Invalid value '" & Cmd.Action_Str.all & "' for Action");
         GNAT.OS_Lib.OS_Exit (2);

      when Invalid_Alert =>
         Log.Error ("Invalid value '" & Cmd.Alert_Str.all & "' for Alert");
         GNAT.OS_Lib.OS_Exit (3);

   end Execute;

end Mold_Apply;
