-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023-2025 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with AAA.Table_IO;
with CLIC.TTY;
use CLIC;

with Mold_CLI;
with Mold_Lib;

package Mold_Tools is

   function Bold (S : String) return String
   is (if Mold_CLI.Global_Switch.No_TTY then TTY.Bold (S) else S);

   function Bool (B : Boolean) return String
   is (if Mold_CLI.Global_Switch.No_TTY
       then (if B then TTY.OK ("TRUE") else TTY.Error ("FALSE"))
       else B'Image);

   procedure Show_Settings
     (Settings : Mold_Lib.Settings_Type);

   procedure Append_Settings
     (T        : in out AAA.Table_IO.Table;
      Settings : Mold_Lib.Settings_Type);

end Mold_Tools;
