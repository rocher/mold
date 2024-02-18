This directory contains example on some advanced features of `mold`:

  * Multiline variables: it allows the possibility to define variable values
    using multiple lines (paragraphs)

  * Predefined text filters: enables text operations during variable
    substitution, like character substitution, padding, truncation, space
    trimming or case conversion. The `mold_lib` crate allows you to define
    your own text filters.

  * Defined settings: enables special variables to set some `mold` command
    line arguments in the variables file, e.g.
    `mold-replacement-in-filenames="false"`.

   * Replacement in filenames: enables variable substitution in the name of
     the files.
