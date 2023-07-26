-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with Ada.Directories;
with Text_IO;

with Simple_Logging;

with System.Regpat;

with TOML;
with TOML.File_IO;

package body Replacement is

   package Log renames Simple_Logging;

   -----------------------
   -- Read_Replacements --
   -----------------------

   function Read_Replacements (File : String) return Replacement_List is
      use Replacement_Package;

      Read_Result : TOML.Read_Result;
      Rep_List    : Replacement_List := Empty_List;
   begin
      Read_Result := TOML.File_IO.Load_File (File);

      if Read_Result.Success then
         for Element of Read_Result.Value.Iterate_On_Table loop
            declare
               Replacement : Replacement_Type;
            begin
               Replacement.Variable := Element.Key;
               Replacement.Value    := Element.Value.As_Unbounded_String;
               Rep_List.Append (Replacement);
            end;
         end loop;
      end if;

      return Rep_List;
   end Read_Replacements;

   ----------------------
   -- Replace_Variable --
   ----------------------

   function Replace_Variable
     (Variable : Unbounded_String; Replacements : Replacement_List)
      return String
   is
   begin
      for Repl of Replacements loop
         if Repl.Variable = Variable then
            return To_String (Repl.Value);
         end if;
      end loop;
      return "";
   end Replace_Variable;

   ---------------------
   -- Copy_File_Lines --
   ---------------------

   type File_Access_Type is access Text_IO.File_Type;

   function Copy_File_Lines
     (Source, Destination : String; Lines : Natural) return File_Access_Type
   is
      use Text_IO;
      Src : File_Type;
      Dst : constant File_Access_Type := new File_Type;
   begin
      Src.Open (In_File, Source);
      Dst.Open (Out_File, Destination);

      for L in 1 .. Lines loop
         declare
            Line : constant String := Src.Get_Line;
         begin
            Dst.Put_Line (Line);
         end;
      end loop;

      Src.Close;
      return Dst;
   end Copy_File_Lines;

   ---------------------
   -- Replace_In_File --
   ---------------------

   function Replace_In_File
     (File : String; Replacements : Replacement_List) return Natural
   is
      Dst : File_Access_Type := null;
   begin
      Log.Always ("  replace in file " & File);

      return (if Dst = null then 0 else 1);
   end Replace_In_File;

   ------------------------
   -- Apply_Replacements --
   ------------------------

   function Apply_Replacements
     (Directory : String; Replacements : Replacement_List) return Natural
   is
      use Ada.Directories;

      CWD            : constant String := Current_Directory;
      Result         : Search_Type;
      Element        : Directory_Entry_Type;
      Replaced_Files : Natural         := 0;
   begin
      Log.Always ("entering directory " & Directory);
      Set_Directory (Directory);

      Start_Search (Result, ".", "*");
      loop
         exit when not Result.More_Entries;

         Result.Get_Next_Entry (Element);
         declare
            Name : constant String := Element.Simple_Name;
         begin
            if Name'Length > 0 and then Name /= "." and then Name /= ".."
              and then Name /= ".git"
            then
               Log.Always ("  element basename = '" & Name & "'");
               if Element.Kind = Ada.Directories.Directory then
                  Replaced_Files :=
                    @ + Apply_Replacements (Name, Replacements);
               elsif Element.Kind = Ordinary_File then
                  Replaced_Files := @ + Replace_In_File (Name, Replacements);
               end if;
            end if;
         end;
      end loop;

      Set_Directory (CWD);
      return Replaced_Files;
   end Apply_Replacements;

end Replacement;
