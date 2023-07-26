-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with Ada.Strings.Unbounded;              use Ada.Strings.Unbounded;
with Ada.Containers.Doubly_Linked_Lists; use Ada.Containers;

package Replacement is

   type Replacement_Type is record
      Variable : Unbounded_String := To_Unbounded_String ("");
      Value    : Unbounded_String := To_Unbounded_String ("");
   end record;

   overriding function "=" (A, B : Replacement_Type) return Boolean is
     (A.Variable = B.Variable and then A.Value = B.Value);

   package Replacement_Package is new Doubly_Linked_Lists
     (Replacement_Type, "=");
   subtype Replacement_List is Replacement_Package.List;

   function Read_Replacements (File : String) return Replacement_List;

   function Apply_Replacements
     (Directory : String; Replacements : Replacement_List) return Natural;

end Replacement;
