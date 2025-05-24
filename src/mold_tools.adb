-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023-2025 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

package body Mold_Tools is

   -------------------
   -- Show_Settings --
   -------------------

   procedure Show_Settings
     (Settings : Mold_Lib.Settings_Type)
   is
      T : AAA.Table_IO.Table;
   begin
      Append_Settings (T, Settings);
      T.Print;
   end Show_Settings;

   ---------------------
   -- Append_Settings --
   ---------------------

   procedure Append_Settings
     (T : in out AAA.Table_IO.Table; Settings : Mold_Lib.Settings_Type) is
   begin
      T.Append (Bold ("Settings"));
      T.Append ("");
      T.New_Row;
      T.Append ("  replacement in filenames");
      T.Append (Bool (Settings.Replacement_In_Filenames));
      T.New_Row;
      T.Append ("  replacement in variables");
      T.Append (Bool (Settings.Replacement_In_Variables));
      T.New_Row;
      T.Append ("  delete source files");
      T.Append (Bool (Settings.Delete_Source_Files));
      T.New_Row;
      T.Append ("  overwrite destination files");
      T.Append (Bool (Settings.Overwrite_Destination_Files));
      T.New_Row;
      T.Append ("  enable defined settings");
      T.Append (Bool (Settings.Enable_Defined_Settings));
      T.New_Row;
      T.Append ("  undefined action");
      T.Append (Settings.On_Undefined'Image);
      T.New_Row;
   end Append_Settings;

end Mold_Tools;
