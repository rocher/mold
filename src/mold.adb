-------------------------------------------------------------------------------
--
--  MOLD - Meta-variable Operations for Lean Development
--  Copyright (c) 2023 Francesc Rocher <francesc.rocher@gmail.com>
--  SPDX-License-Identifier: MIT
--
-------------------------------------------------------------------------------

with Ada.Strings.Unbounded; use Ada.Strings.Unbounded;

with Replacer; use Replacer;
with Text_IO;  use Text_IO;

with GNAT.Regpat; use GNAT.Regpat;

procedure Mold is
   Files_Replaced : Natural;

   Text     : constant String  :=
     "this is a {{test}} of {{   template   }}{{ subs }} that works good";
   New_Text : Unbounded_String := To_Unbounded_String ("");
   Matcher  : Pattern_Matcher (256);
   Matches  : Match_Array (0 .. 3);
   Current  : Natural          := Text'First;
begin
   Files_Replaced :=
     Replace
       ("git@github.com:alice-adventures/project_euler-template", "test",
        "test.toml");

   New_Line;
   Put_Line
     ("Replacement finished," & Files_Replaced'Image & " file" &
      (if Files_Replaced > 1 then "s" else "") & " replaced");

   Matcher.Compile ("([^{]*)({{ *([^ }]+) *}})");

   loop
      Matcher.Match (Text, Matches, Current);
      exit when Matches (0) = No_Match;
      declare
         Pre_Text : constant String :=
           Text (Matches (1).First .. Matches (1).Last);
         Variable : constant String :=
           Text (Matches (3).First .. Matches (3).Last);
      begin
         Put_Line
           ("Pre: '" & Pre_Text & "', Match: '" &
            Text (Matches (2).First .. Matches (2).Last) & "'" &
            ", Variable: '" & Variable & "'");

         New_Text.Append (Pre_Text);
         case Variable is
            when "subs" =>
               New_Text.Append ("SUBS");
            when "template" =>
               New_Text.Append ("TEMPLATE");
            when "test" =>
               New_Text.Append ("TEST");
            when others =>
               New_Text.Append ("OTHERS");
         end case;
      end;

      Current := Matches (0).Last + 1;
   end loop;
   New_Text.Append (Text (Current .. Text'Last));

   Put_Line (Text);
   Put_Line (To_String (New_Text));

   return;

   Matcher.Match ("this is a {{test}} of {{template}}{{subs}}", Matches);
   if Matches (0) /= No_Match then
      for Elt of Matches loop
         Put_Line (Elt'Image);
      end loop;
   end if;

   Matcher.Match ("this is a normal line", Matches);
   if Matches (0) /= No_Match then
      for Elt of Matches loop
         Put_Line (Elt'Image);
      end loop;
   end if;

end Mold;
