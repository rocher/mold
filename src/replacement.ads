-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with Ada.Containers.Hashed_Maps; use Ada.Containers;
with Ada.Strings.Unbounded;      use Ada.Strings.Unbounded;
with Ada.Strings.Unbounded.Hash;

package Replacement is

   type Replacement_Type is record
      Variable : Unbounded_String := To_Unbounded_String ("");
      Value    : Unbounded_String := To_Unbounded_String ("");
   end record;

   package Replacement_Package is new Hashed_Maps
     (Key_Type => Unbounded_String, Element_Type => Unbounded_String,
      Hash => Ada.Strings.Unbounded.Hash, Equivalent_Keys => "=", "=" => "=");
   subtype Replacement_Map is Replacement_Package.Map;

   function Read_Replacements (File : String) return Replacement_Map;

   function Apply_Replacements
     (Directory : String; Replacements : Replacement_Map) return Natural;

end Replacement;
