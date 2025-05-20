-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023-2025 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with Mold_Config;

package Mold_CLI is

   package Conf renames Mold_Config;

   type Global_Switches_Type (Profile : Mold_Config.Build_Profile_Kind) is
   record
      Help     : aliased Boolean := False;
      No_Color : aliased Boolean := False;
      No_TTY   : aliased Boolean := False;
      Verbose  : aliased Boolean := False;
      Debug    : aliased Boolean := False;
   end record;

   Global_Switch : Global_Switches_Type (Conf.Build_Profile);

   procedure Execute;

end Mold_CLI;
