-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

package Replacer is

   function Replace
     (Repository, Destination, Replacements_File : String) return Natural;
   --  Clone the Repository into the Destination directory and perform the
   --  replacements specified in the Replacements (json) file.

end Replacer;
