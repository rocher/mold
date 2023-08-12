-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with CLIC.Subcommand.Instance;
with CLIC.TTY;
with Mold_Config;
with Simple_Logging;

with Lib_Mold;

package body CLI_Mold is

   package Mold renames Lib_Mold;
   package Log renames Simple_Logging;

   type Global_Switches_Type is record
      Help    : aliased Boolean := False;
      Verbose : aliased Boolean := False;
      Debug   : aliased Boolean := False;

      Replace_In_File_Names              : Boolean := True;
      Delete_Source_Files                : Boolean := True;
      Overwrite_Destination_Files        : Boolean := False;
      Set_Settings_From_Definitions_File : Boolean := True;

      Undef_Var_Action : Mold.Undefined_Variable_Actions := Mold.Ignore;
      Undef_Var_Alert  : Mold.Undefined_Variable_Alerts  := Mold.Warning;

      Abort_On_Error : Boolean := True;
   end record;

   -------------
   -- Execute --
   -------------

   procedure Execute is
   begin
      null;
   end Execute;

end CLI_Mold;
