-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with CLIC.Subcommand; use CLIC.Subcommand;
with Simple_Logging;

with GNAT.Strings; use GNAT.Strings;

package body Mold_Apply is

   package Log renames Simple_Logging;

   Invalid_Action : exception;
   Invalid_Alert  : exception;

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
         Cmd.Settings.Replacement_In_File_Names'Access,
         Switch      => "-r",
         Long_Switch => "--no-replace-in-file-names",
         Help        => "Disable variable substitution in source file names"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Delete_Source_Files'Access,
         Switch      => "-d",
         Long_Switch => "--no-delete-source-files",
         Help        => "Do not delete source files"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Overwrite_Destination_Files'Access,
         Switch      => "-o",
         Long_Switch => "--overwrite-dest-files",
         Help        => "Overwrite destination files"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Enable_Defined_Settings'Access,
         Switch      => "-e",
         Long_Switch => "--no-defined-settings",
         Help        => "Disable defined settings"
      );

      Define_Switch
        (Config,
        Cmd.Action_Str'Access,
         --  Callback    => Set_Action_Switch'Access,
         Switch      => "-c:",
         Long_Switch => "--action=",
         Argument    => "ACTION",
         Help        => "Undefined variable action: " &
                        "ignore or empty, default is ignore"
      );

      Define_Switch
        (Config,
        Cmd.Alert_Str'Access,
         --  Callback    => Set_Alert_Switch'Access,
         Switch      => "-l:",
         Long_Switch => "--alert=",
         Argument    => "LEVEL",
         Help        => "Undefined variable alert: " &
                        "none, warning or error, default is error"
      );

      Define_Switch
        (Config,
         Cmd.Settings.Abort_On_Error'Access,
         Switch      => "-a",
         Long_Switch => "--no-abort-on-error",
         Help        => "Do not abort on error"
      );

      pragma Style_Checks (on);
      --!pp on
   end Setup_Switches;

   ----------------
   -- Get_Action --
   ----------------

   function Get_Action
     (Value : String_Access) return Mold.Undefined_Variable_Actions
   is
   begin
      return Result : Mold.Undefined_Variable_Actions do
         Log.Info ("Get_Action");
         Log.Info ("  Value  : " & Value.all);

         Result := Mold.Undefined_Variable_Actions'Value (Value.all);

      exception
         when Constraint_Error =>
            raise Invalid_Action;
      end return;
   end Get_Action;

   ---------------
   -- Get_Alert --
   ---------------

   function Get_Alert
     (Value : String_Access) return Mold.Undefined_Variable_Alerts
   is
   begin
      return Result : Mold.Undefined_Variable_Alerts do
         Log.Info ("Get_Alert");
         Log.Info ("  Value  : " & Value.all);
         Result := Mold.Undefined_Variable_Alerts'Value (Value.all);

      exception
         when Constraint_Error =>
            raise Invalid_Alert;
      end return;
   end Get_Alert;

   -------------
   -- Execute --
   -------------

   overriding procedure Execute
     (Cmd : in out Cmd_Type; Args : AAA.Strings.Vector)
   is
      Args_Length : constant Positive := Positive (Args.Length);
   begin
      if Cmd.Action_Str.all'Length > 0 then
         Cmd.Settings.Undefined_Variable_Action := Get_Action (Cmd.Action_Str);
      end if;

      if Cmd.Alert_Str.all'Length > 0 then
         Cmd.Settings.Undefined_Variable_Alert := Get_Alert (Cmd.Alert_Str);
      end if;

      Log.Debug ("Cmd.Settings = " & Cmd'Image);
      Log.Debug ("Args = " & Args'Image);
      for I in Args.First_Index .. Args.Last_Index loop
         Log.Debug ("Args(" & I'Image & ") = " & Args.Element (I));
      end loop;

      if Args_Length < 2 or else Args_Length > 3 then
         Log.Error ("Invalid number or arguments");
         return;
      end if;

      declare
         Errors : Natural;
         Idx    : constant Positive := Args.First_Index;

         Output_Dir : constant String :=
           (if Args_Length = 3 then Args.Element (Idx + 2) else "");
      begin
         Errors :=
           Mold.Apply
             (Definitions => Args.Element (Idx),
              Source      => Args.Element (Idx + 1),
              Settings    => Cmd.Settings'Unrestricted_Access,
              Output_Dir  => Output_Dir, Log_Level => Log.Level);
      end;

   exception
      when Invalid_Action =>
         Log.Error ("Invalid value '" & Cmd.Action_Str.all & "' for Action");

      when Invalid_Alert =>
         Log.Error ("Invalid value '" & Cmd.Alert_Str.all & "' for Alert");
   end Execute;

end Mold_Apply;
