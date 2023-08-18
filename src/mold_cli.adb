-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with CLIC.Subcommand.Instance;
with CLIC.TTY;
with GNAT.OS_Lib;
with Simple_Logging;
with Text_IO;

with Mold_Apply;
with Mold_Config;

package body Mold_CLI is

   package Conf renames Mold_Config;
   package Log renames Simple_Logging;

   use all type Conf.Build_Profile_Kind;

   type Global_Switches_Type (Profile : Mold_Config.Build_Profile_Kind) is
   record
      Help    : aliased Boolean := False;
      Color   : aliased Boolean := True;
      TTY     : aliased Boolean := True;
      Verbose : aliased Boolean := False;
      Debug   : aliased Boolean := False;
   end record;

   Global_Switch : Global_Switches_Type (Conf.Build_Profile);

   procedure Set_Global_Switches
     (Config : in out CLIC.Subcommand.Switches_Configuration);

   --!pp off
   package CLI_Command is new CLIC.Subcommand.Instance
   (
      Main_Command_Name => Conf.Crate_Name,
      Version => Conf.Crate_Version &
      (
         if Conf.Build_Profile = Conf.release then ""
            else " (" & Conf.Build_Profile'Image & ")"
      ),
      Set_Global_Switches => Set_Global_Switches,
      Put                 => Text_IO.Put,
      Put_Line            => Text_IO.Put_Line,
      Put_Error           => Text_IO.Put_Line,
      Error_Exit          => GNAT.OS_Lib.OS_Exit,
      TTY_Chapter         => CLIC.TTY.Info,
      TTY_Description     => CLIC.TTY.Description,
      TTY_Version         => CLIC.TTY.Version,
      TTY_Underline       => CLIC.TTY.Underline,
      TTY_Emph            => CLIC.TTY.Emph
   );
   --!pp on

   -------------------------
   -- Set_Global_Switches --
   -------------------------

   procedure Set_Global_Switches
     (Config : in out CLIC.Subcommand.Switches_Configuration)
   is
      use CLIC.Subcommand;
   begin
      --!pp off
      pragma Style_Checks (off);

      Define_Switch (
         Config,
         Output      => Global_Switch.Help'Access,
         Switch      => "-h",
         Long_Switch => "--help",
         Help        => "Display command help"
      );

      Define_Switch (
         Config,
         Global_Switch.Color'Access,
         Long_Switch => "--no-color",
         Help        => "Disable color",
         Value       => False
      );

      Define_Switch (
         Config,
         Global_Switch.TTY'Access,
         Long_Switch => "--no-tty",
         Help        => "Disable control characters",
         Value       => False
      );

      Define_Switch (
         Config,
         Global_Switch.Verbose'Access,
         Switch      => "-v",
         Long_Switch => "--verbose",
         Help        => "Show command activity"
      );

      Define_Switch (
         Config,
         Global_Switch.Debug'Access,
         Switch      => "-d",
         Long_Switch => "--debug",
         Help        => "Enable debug messages"
      );

      pragma Style_Checks (on);
      --!pp on
   end Set_Global_Switches;

   -------------
   -- Execute --
   -------------

   procedure Execute is
   begin
      CLI_Command.Parse_Global_Switches;

      --  default Log level
      Log.Level := Log.Info;

      if Global_Switch.Verbose then
         Log.Level := Log.Detail;
         Log.Info ("show command activity");
      end if;

      if Global_Switch.Debug then
         Log.Level := Log.Debug;
         Log.Debug ("show debug information");
         Log.Debug ("Global_Switch" & Global_Switch'Image);
      end if;

      if not Global_Switch.TTY then
         CLIC.TTY.Force_Disable_TTY;
         Log.Detail ("disable TTY");
      end if;

      if Global_Switch.Color and then Global_Switch.TTY then
         CLIC.TTY.Enable_Color (Force => False);
         Log.Detail ("enable Color");
      end if;

      CLI_Command.Execute;
   end Execute;

begin

   CLI_Command.Register ("General", new CLI_Command.Builtin_Help);
   CLI_Command.Register ("Process", new Mold_Apply.Cmd_Type);

end Mold_CLI;
