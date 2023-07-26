-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with GNAT.OS_Lib;
with Replacement; use Replacement;

package body Replacer is

   -------------
   -- Replace --
   -------------

   function Replace
     (Repository, Destination, Replacements_File : String) return Natural
   is
      --  Git       : GNAT.OS_Lib.String_Access;
      --  Arg_List  : GNAT.OS_Lib.Argument_List_Access;
      --  Exit_Code : Integer;
      Rep_List : Replacement_Map;
   begin
      --  Git       := GNAT.OS_Lib.Locate_Exec_On_Path ("git");
      --  Arg_List  :=
      --    GNAT.OS_Lib.Argument_String_To_List
      --      ("clone " & Repository & " " & Destination);
      --  Exit_Code := GNAT.OS_Lib.Spawn (Git.all, Arg_List.all);

      return
        Apply_Replacements
          (Destination, Read_Replacements (Replacements_File));
   end Replace;

end Replacer;
