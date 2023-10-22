var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"WELCOME TO MOLD","text":"<p>Meta-variable Operations for Lean Development</p> <p>Mold is a powerful tool that facilitates the creation and management of project templates through customizable files with meta-variables. It allows users to prepare a set of files and define placeholders (meta-variables) using double curly braces that can be replaced with specific values when creating new projects.</p> <p>While Mold brings its own unique approach, several common features and functionalities can be found in similar existing tools for project templating and scaffolding.</p>"},{"location":"index.html#different-sources","title":"Different sources","text":"<p>Mold can operate on a single file or recursively in a given directory. All files processed by Mold must end with the <code>mold</code> extension. The process of variable substitution from a mold file generates a new file, with the same name except the <code>mold</code> extension.</p>"},{"location":"index.html#three-modes-of-variable-substitution","title":"Three modes of variable substitution","text":"<p>All variables can be used in three different substitution modes: <code>normal</code>, <code>optional</code> and <code>mandatory</code>. This provides different error handling when Mold encounters an undefined variable.</p>"},{"location":"index.html#text-filters","title":"Text filters","text":"<p>Text filters are functions that can be applied during variable substitution for additional text transformation. There a several predefined text filters covering a wide range of uses cases. Additionally, with the mold library it is possible to define your custom text filters.</p>"},{"location":"index.html#source-file-name-substitution","title":"Source file name substitution","text":"<p>Variable substitution can be applied also in the source file name. The syntax for variables is slightly different for file names, for portability reasons, but the concept is the same.</p>"},{"location":"index.html#variable-definitions-file","title":"Variable definitions file","text":"<p>All variable values are assigned in a single TOML file. The accepted file format is the most simple TOML format, with a single <code>variable = \"value\"</code> assignment per line. Multiline variables are supported, as well.</p>"},{"location":"index.html#defined-settings","title":"Defined settings","text":"<p>It is possible to use special variables prefixed with <code>mold-</code>, like <code>mold-delete-source-files</code>, to specify Mold settings inside the definitions file. Settings specified by the command line or the library interface can be overwritten by these defined settings. This enables the possibility to easily remember and force some settings during development or production, regardless of the settings used in the project configuration.</p>"},{"location":"index.html#template-inclusion","title":"Template inclusion","text":"<p>Mold allows the inclusion of template files, which must end with the extension <code>molt</code>. This opens the possibility to write small snippets or generic templates that can be easily shared across projects (eg, for headers or footers). Template files are processed like regular files, so can contain mold variables, too.</p>"},{"location":"change-log.html","title":"CHANGE LOG","text":""},{"location":"change-log.html#mold-cli","title":"Mold CLI","text":""},{"location":"change-log.html#020-dev","title":"0.2.0-dev","text":"<p>Date: 2023-08-27</p> <ul> <li>Basic implementation of the <code>apply</code> command:</li> <li>Use <code>mold_lib-0.2.0-dev</code>, see mold_lib repository</li> </ul>"},{"location":"change-log.html#mold-lib","title":"Mold Lib","text":""},{"location":"change-log.html#100","title":"1.0.0","text":"<p>Date: 2023-10-22</p> <ul> <li>Support predefined and custom text filters</li> <li>Complete set of unit tests</li> <li>Reach 100% coverage test</li> <li>Fixed several bugs</li> </ul>"},{"location":"change-log.html#021-dev","title":"0.2.1-dev","text":"<p>Date: 2023-08-26</p> <ul> <li>First release with all major features</li> <li>Support for variable replacement in files and directories, as well as in file names</li> <li>Support in-place substitution or with an output directory parameter</li> <li>Remove source files (can be disabled)</li> <li>Simple definition files for variables (TOML format)</li> <li>Settings can be set in the definitions file</li> <li>Do not overwrite destination files (can be disabled)</li> <li>Inclusion of external templates</li> <li>User-defined behavior for undefined variables</li> <li>Rich activity report</li> <li>Unit tests passed for Linux, Mac OS and Windows</li> </ul>"},{"location":"installation.html","title":"INSTALLATION","text":""},{"location":"installation.html#ada-library","title":"Ada Library","text":"<p>Original implementation is the Ada library <code>libmold</code>, available in the Alire community index. This allows you to integrate the libmold crate in your Ada projects.</p>"},{"location":"installation.html#command-line-tool","title":"Command Line Tool","text":"<p>A command line tool, called <code>mold</code>, is available for Linux, Mac and Window.</p> <p>Download binary packages from GitHub.</p> <p>Warning</p> <p>All publication activities still in progress.</p>"},{"location":"reference-guide.html","title":"REFERENCE GUIDE","text":""},{"location":"reference-guide.html#overall-process","title":"Overall Process","text":"<p>Variable substitution takes place in a single file or directory, and recursively, across all its sub-directories. Processed files must end with the <code>mold</code> extension. The substitution process generates a new file with all the variables replaced with the corresponding values. The new file name is the same as the source file, but removing the <code>.mold</code> extension:</p> <pre><code>   README.md.mold \u2014\u2014[ mold generates ]--&gt; README.md\n</code></pre> <p>By default, if a generated file already exists, Mold issues a error, but it is possible to force overwriting existing files.</p>"},{"location":"reference-guide.html#operating-in-directories","title":"Operating in directories","text":"<p>Mold can operate recursively across all subdirectories of a given directory. Additionally, it is possible to specify a different output directory. This use case comes in handy to create a new project directory starting from a given template project.</p> <p>Mold recurses all subdirectories and applies the variable substitution to all mold files found. The generated file is created in the same path, but relative to the output directory. If necessary, all parent directories are created as well.</p> <p>Files not processed by mold won't be found in the output directory. For example:</p> <pre><code>INPUT DIRECTORY  \u2500[ Mold ]-&gt; OUTPUT DIRECTORY = /tmp/lorem/ipsum\n\n     foo/                             /tmp/\n     \u251c\u2500\u2500 bar.txt.mold                  \u2514\u2500\u2500 lorem/\n     \u251c\u2500\u2500 baz.md.mold                       \u2514\u2500\u2500 ipsum/\n     \u251c\u2500\u2500 definitions.toml                      \u251c\u2500\u2500 foo/\n     \u251c\u2500\u2500 header.molt                           \u2502   \u251c\u2500\u2500 bar.txt\n     \u251c\u2500\u2500 subdir_1/                             \u2502   \u2514\u2500\u2500 baz.md\n     \u2502   \u251c\u2500\u2500 foo-bar.adb.mold                  \u251c\u2500\u2500 subdir_1/\n     \u2502   \u251c\u2500\u2500 bar-bar.ads.mold                  \u2502   \u251c\u2500\u2500 foo-bar.adb\n     \u2502   \u2514\u2500\u2500 footer.molt                       \u2502   \u2514\u2500\u2500 foo-bar.ads\n     \u2514\u2500\u2500 subdir_2/                             \u2514\u2500\u2500 subdir_2/\n         \u251c\u2500\u2500 foo-2.adb.mold                        \u251c\u2500\u2500 foo-2.adb\n         \u251c\u2500\u2500 bar-2.ads.mold                        \u251c\u2500\u2500 foo-2.ads\n         \u251c\u2500\u2500 local-header.molt                     \u2514\u2500\u2500 subdir_3/\n         \u2514\u2500\u2500 subdir_3/                                 \u251c\u2500\u2500 foo-3.md\n             \u251c\u2500\u2500 foo-3.md.mold                         \u2514\u2500\u2500 bar.md\n             \u2514\u2500\u2500 bar.md.mold\n</code></pre>"},{"location":"reference-guide.html#error-handling","title":"Error Handling","text":"<p>There are two types of errors that Mold can detect and handle in different ways. First of all, there are the fatal errors, those that prevent Mold from completing the replacement job. Typical fatal errors are produced when a file is not found, the destination directory cannot be written or created or the definitions file is corrupted. These errors stop immediately the replacement process.</p> <code>Fatal Errors</code> <p>Prevent Mold from completing the replacement job. Typical fatal errors are produced when a file is not found, the destination directory cannot be written or created, or the definitions file is corrupted. These errors stop immediately the replacement process.</p> <code>Replacement Errors</code> <p>Detected during the variable replacement, these errors are caused when a variable is found in a mold file but the variable has not been defined. Depending on the settings and the type of substitution, Mold can skip this error, report a warning or an error, and continue with the process. Next section explain how these errors are handled.</p>"},{"location":"reference-guide.html#variable-substitution","title":"Variable Substitution","text":"<p>All variables inside a file must be written with the syntax <code>{{variable}}</code>:</p> README.md.mold<pre><code>   {{TITLE}}\n   Hello {{world}}, this is just an {{example}}\n</code></pre> <p>with any number of spaces between the variable name and curly braces:</p> README.md.mold<pre><code>   {{  TITLE  }}\n   Hello {{ world }}, ths is just an {{           example  }}\n</code></pre> <p>Thus, with the following definitions:</p> mold.toml<pre><code>   TITLE   = \"README, please\"\nworld   = \"World\"\nexample = \"example text\"\n</code></pre> <p>the new file contents would be:</p> README.md<pre><code>   README, please\n   Hello World, ths is just an example text\n</code></pre>"},{"location":"reference-guide.html#substitution-modes","title":"Substitution Modes","text":"<p>There are three substitution modes in Mod. The only difference between them is the error handling when an undefined variable is found.</p>"},{"location":"reference-guide.html#normal","title":"Normal","text":"<p>For an undefined variable, the default behavior is to issue an error and left the variable ignored, or unchanged. If <code>world</code> was undefined, the above example would be:</p> <p>README.md.mold<pre><code>   README, please\n   Hello {{ world }}, ths is just an example test\n</code></pre> For normal substitution, it is possible to specify what to do when an undefined variable is found:</p> <ul> <li> <p>Undefined Variable Action determines if the undefined variable must be   removed or kept in the destination file. It can take the values:</p> <ul> <li><code>Ignore</code>, to left the variables as is</li> <li><code>Empty</code>, to remove the variable in the destination file</li> </ul> </li> <li> <p>Undefined Variable Alert determines the error handling strategy:</p> <ul> <li><code>None</code>: does nothing</li> <li><code>Warning</code>: issues a warning</li> <li><code>Error</code>: issues a replacement error</li> </ul> </li> </ul> <p>Only for normal</p> <p>These two aspects do not apply to either optional or mandatory substitution modes.</p> <p>Equivalent modes</p> <p>With a combination of these two aspects, it is possible to force normal substitution mode to behave like optional or mandatory. See the table in Examples below.</p>"},{"location":"reference-guide.html#optional","title":"Optional","text":"<p>Optional substitution is written as <code>{{ ?variable }}</code>, for any variable. For undefined variables, optional substitution does no issues a warning and the <code>{{ ?variable }}</code> text is removed.</p> <p>For example,</p> <p>README.mb.mold<pre><code>   {{  TITLE  }}\n   Hello {{ ?world }}, this is just an {{           example  }}\n</code></pre> issues no warning and generates</p> README.md<pre><code>   README, please\n   Hello , this is just an example text\n</code></pre> <p>Note</p> <p>There are no optional variables: it is the substitution mode that can be optional. Any variable can be used as <code>{{variable}}</code> and <code>{{?variable}}</code> at different places, even in the same file.</p>"},{"location":"reference-guide.html#mandatory","title":"Mandatory","text":"<p>Mandatory substitution is written as <code>{{ #variable }}</code>. If the variable is undefined, Mold issues an error and makes no substitution. By default, the substitution process is aborted on error.</p> <p>Syntax</p> <p>In optional and mandatory substitution modes, characters <code>?</code> and <code>#</code> are part of the variable name, not part of the curly braces. Thus, <code>{{?variable}}</code> and <code>{{  #variable  }}</code> are valid variables, while <code>{{? variable }}</code> and <code>{{#  variable}}</code> are invalid.</p>"},{"location":"reference-guide.html#examples","title":"Examples","text":"<p>Examples with defined variable <code>foo=\"bar\"</code> and variable <code>baz</code> undefined:</p> Kind Action Alert Variable Replace Error R I E Like Defined variable Normal any any <code>{{foo}}</code> <code>bar</code> T F F Optional \u2014 \u2014 <code>{{?foo}}</code> <code>bar</code> T F F Mandatory \u2014 \u2014 <code>{{#foo}}</code> <code>bar</code> T F F Undefined variable Normal Ignore None <code>{{baz}}</code> <code>{{baz}}</code> F T F Normal Ignore Warning <code>{{baz}}</code> <code>{{baz}}</code> Warning F T F Normal Ignore Error <code>{{baz}}</code> <code>{{baz}}</code> Error F T F Mandatory Normal Empty None <code>{{baz}}</code> F F T Optional Normal Empty Warning <code>{{baz}}</code> Warning F F T Normal Empty Error <code>{{baz}}</code> Error F F T Optional \u2014 \u2014 <code>{{?baz}}</code> F F T Mandatory \u2014 \u2014 <code>{{#baz}}</code> <code>{{#baz}}</code> Error F T F <p>Meaning of columns 'RIE'; each one can take value True or False:</p> <ul> <li>'R' : variable replaced with a defined value</li> <li>'I' : Variable ignored</li> <li>'E' : Variable emptied (removed)</li> </ul>"},{"location":"reference-guide.html#text-filters","title":"Text Filters","text":"<p>Text filters enable text transformations before variable substitution. In the command line, there are few predefined text filters. In the library, you can provide up to ten filters. In general, a text filter is a function that receives the value of the variable as an argument, applies some transformation and returns a string.</p> <p>Text filters are applied independently of the variable substitution mode: if a value is found for a variables, then filters are applied to that value.</p>"},{"location":"reference-guide.html#syntax","title":"Syntax","text":"<p>Text filters are applied when the following syntax is used:</p> syntax<pre><code>   {{VARIABLE/&lt;FILTER&gt;}}\n</code></pre> <p>where <code>&lt;FILTER&gt;</code> is a filter specification.</p> <p>For example:</p> example.txt.mold<pre><code>   {{TITLE}}\n   {{TITLE/s-}}\n</code></pre> No Trailing spaces <p>Text filter specification can contain the character space, <code>' '</code>, as an argument to some filters. Parsing spaces is no problem, unless they appear in the last position of the specification. For this reason, DO NOT USE trailing spaces in variables substitution. For example, the text filter to replace all characters dot <code>'.'</code> by an space <code>' '</code> is written as <code>{{ Some_Variable/r. }}</code>. Using more that one space at the end can confuse the parser if the text filter admits no parameters. For example, the text filter that converts all characters to lower case is written as <code>{{ Some_Variable/l}}</code>. But written as <code>{{ Some_Variable/l }}</code>, the parser interprets that you are passing the argument <code>' '</code> to the filter, which is incorrect.</p> <p>In this example, the <code>/s-</code> part tells mold to apply the predefined filter sequence with two arguments: the value of <code>TITLE</code> (all text filters mandatorily receive this argument) and the character <code>'-'</code>. The filter returns a sequence of <code>'-'</code> with the same length as the value of <code>TITLE</code>:</p> example.txt<pre><code>   README, please\n   --------------\n</code></pre> <p>All text filters receive the value of the variable as first argument. Predefined text filters (see below) can have additional parameters (one or more). Custom filters cannot have additional parameters.</p> <p>Predefined text filters are named with a single letter, whilst custom filters are indexed in the range <code>0..9</code>.</p>"},{"location":"reference-guide.html#multiple-filters","title":"Multiple filters","text":"<p>Text filters can be chained or composed in a sequence. Like in a pipeline of commands, the result of one text filter is used as an argument for the next filter.</p> <p>For example, with the definition: example.toml<pre><code>   Title = \"  This is a     title   \"\n</code></pre></p> <p>the following substitution:</p> <p>No escape required</p> <p>The character slash, <code>'/'</code>, is the text filter separator. If you want to use it as an argument to a text filter, just write it twice, <code>'//'</code>.</p> <p>No trailing spaces</p> <p>Remember: when using text filters, do not use additional trailing spaces!</p> example.txt.mold<pre><code>   {{ Title/Ta}}      -- (1)!\n{{ Title/Ta/s-}}\n{{ Title/s-/Ta}}   -- (2)!\n{{ Title/s///Ta}}  -- (3)!\n</code></pre> <ol> <li>The value of <code>Title</code> does not change when a text filter is applied.</li> <li>The order in which text filters are specified can modify the result.</li> <li>The double <code>'//'</code> is seen as a single <code>'/'</code> by the text filter <code>s</code>.</li> </ol> <p>would be:</p> <p>Text filters</p> <p>The text filter <code>Ta</code> trims leading and trailing spaces, and replaces consecutive spaces with only one space.</p> example.txt<pre><code>   This is a title\n   ---------------\n   ------------------------\n   ////////////////////////\n</code></pre>"},{"location":"reference-guide.html#predefined-text-filters","title":"Predefined Text Filters","text":"<p>In this section, <code>&lt;DIR&gt;</code>, <code>&lt;CHAR&gt;</code>, <code>&lt;SRC&gt;</code> and <code>&lt;DST&gt;</code> are single characters, and <code>&lt;NUM&gt;</code> is a positive number. Text filters that can modify the value of a variable by replacing or adding characters start with a lowercase letter. Text filters that can delete some characters starts with an uppercase letter.</p>"},{"location":"reference-guide.html#space-trimming","title":"Space trimming","text":"<ul> <li><code>T&lt;DIR&gt;</code>, trim : trim blanks (spaces and tabs) in the specified     direction:<ul> <li><code>l</code> left</li> <li><code>r</code> right</li> <li><code>b</code> both; equivalent to <code>/Tl/Tr</code></li> <li><code>s</code> squash; replace sequences of multiple blanks (leading, trailing     and internal) to a single space</li> <li><code>a</code> all : equivalent to <code>/Tb/Ts</code></li> </ul> </li> <li> <p><code>X</code>, remove blanks : remove all tabs and spaces.</p> </li> <li> <p>Examples, with <code>Line = \"\u2423\u2409\u2423\u2409\u2423\u2423This\u2423\u2423is\u2423a\u2423line\u2423\u2423\u2423full\u2423of\u2423\u2409\u2423tabs\u2423and\u2423spaces\u2423\u2423\u2423\"</code></p> <ul> <li><code>{{Line/Tb}}</code> \\(\\rightarrow\\) <code>\"This\u2423\u2423is\u2423a\u2423line\u2423\u2423\u2423full\u2423of\u2423\u2409\u2423tabs\u2423and\u2423spaces\"</code></li> <li><code>{{Line/Ts}}</code> \\(\\rightarrow\\) <code>\"\u2423This\u2423is\u2423a\u2423line\u2423full\u2423of\u2423tabs\u2423and\u2423spaces\u2423\"</code></li> <li><code>{{Line/Ta}}</code> \\(\\rightarrow\\) <code>\"This\u2423is\u2423a\u2423line\u2423full\u2423of\u2423tabs\u2423and\u2423spaces\"</code></li> <li><code>{{Line/X}}</code> \\(\\rightarrow\\) <code>\"Thisisalinefulloftabsandspaces\"</code></li> </ul> </li> </ul>"},{"location":"reference-guide.html#character-substitution","title":"Character substitution","text":"<ul> <li><code>r&lt;WHICH&gt;&lt;SRC&gt;&lt;DST&gt;</code>, replace : replace occurrences of character <code>&lt;SRC&gt;</code>     with character <code>&lt;DST&gt;</code>. <code>&lt;WHICH&gt;</code> can be<ul> <li><code>a</code>, all : replace all occurrences of <code>&lt;SRC&gt;</code>.</li> <li><code>f</code>, first : replace first occurrence of <code>&lt;SRC&gt;</code>.</li> <li><code>l</code>, last : replace last occurrence of <code>&lt;SRC&gt;</code>.</li> </ul> </li> <li><code>s&lt;CHAR&gt;</code>, sequence : replace any character with <code>&lt;CHAR&gt;</code>; that is,     returns a sequence of <code>&lt;CHAR&gt;</code> of the same length than the value of the     variable.</li> <li> <p><code>D&lt;CHAR&gt;</code>, delete all : delete all occurrences of <code>&lt;CHAR&gt;</code>.</p> </li> <li> <p>Examples:</p> <ul> <li><code>\"Hello, world\"/rao0</code> \\(\\rightarrow\\) <code>\"Hell0, w0rld\"</code></li> <li><code>\"Hello, world\"/rfo0/rloO</code> \\(\\rightarrow\\) <code>\"Hell0, wOrld\"</code></li> <li><code>\"Hello, world\"/s*</code> \\(\\rightarrow\\) <code>\"************\"</code></li> <li><code>\"Hello, world\"/Do</code> \\(\\rightarrow\\) <code>\"Hell, wrld\"</code></li> </ul> </li> </ul>"},{"location":"reference-guide.html#padding-and-truncating","title":"Padding and truncating","text":"<p>Number formatting</p> <p>This text filter can be used to basic number formatting. For example, <code>/pl05</code> adjusts a number to the right with five positions and leading zeroes:</p> <ul> <li><code>\"1\"/pl05</code> \\(\\rightarrow\\) <code>00001</code></li> <li><code>\"42\"/pl04</code> \\(\\rightarrow\\) <code>0042</code></li> <li><code>\"123\"/pl02</code> \\(\\rightarrow\\) <code>123</code></li> </ul> <ul> <li><code>p&lt;DIR&gt;&lt;CHAR&gt;&lt;NUM&gt;</code>, padding : adjust the value of the variable with     leading or trailing <code>&lt;CHAR&gt;</code> to the specified width <code>&lt;NUM&gt;</code>. <code>&lt;DIR&gt;</code> can     be:<ul> <li><code>l</code> to add spaces to the left (adjust to right)</li> <li><code>r</code> to add spaces to the right (adjust to left)</li> </ul> </li> <li> <p><code>W&lt;NUM&gt;</code>, truncate to width : truncate the value of the variable to the     given width.</p> </li> <li> <p>Examples:</p> <ul> <li><code>\"Hello, world\"/pl*4</code> \\(\\rightarrow\\) <code>\"Hello, world\"</code></li> <li><code>\"Hello, world\"/pl=22</code> \\(\\rightarrow\\) <code>\"==========Hello, world\"</code></li> <li><code>\"Hello, world\"/pr-22</code> \\(\\rightarrow\\) <code>\"Hello, world----------\"</code></li> <li><code>\"Hello, world\"/W4</code> \\(\\rightarrow\\) <code>\"Hell\"</code></li> <li><code>\"Hello, world\"/W42</code> \\(\\rightarrow\\) <code>\"Hello, world\"</code></li> </ul> </li> </ul>"},{"location":"reference-guide.html#case-transformation-and-naming-style","title":"Case transformation and naming style","text":"<ul> <li> <p><code>c&lt;CASE&gt;</code>, case conversion</p> <ul> <li><code>l</code>, to lowercase: transform all characters to lowercase</li> <li><code>c</code>, to capitals: transform all words to Capitals</li> <li><code>u</code>, to uppercase: transform all characters to UPPERCASE</li> </ul> </li> <li> <p><code>n&lt;STYLE&gt;</code>, apply naming style: applies one of the following naming     conventions designated by <code>&lt;STYLE&gt;</code>; example applied to <code>\"bytes per     second\"</code></p> <p>Equivalences</p> <p>Some naming styles can be obtained by composing other predefined text filters. For example, <code>/ns</code> is the same as <code>/cl/Ta/ra _</code>.</p> Style Name Example Equivalence <code>f</code> flatcase <code>bytespersecond</code> <code>/cl/X</code> or <code>/X/cl</code> <code>c</code> lowerCamelCase <code>bytesPerSecond</code> <code>C</code> UpperCamelCase <code>BytesPerSecond</code> <code>/cc/X</code> <code>U</code> UPPERCASE <code>BYTESPERSECOND</code> <code>/cu/X</code> or <code>/X/cu</code> <code>s</code> snake_case <code>bytes_per_second</code> <code>/cl/Ta/ra _</code> <code>S</code> camel_Snake_Case <code>bytes_Per_Second</code> <code>i</code> Title_Case <code>Bytes_Per_Second</code> <code>/cc/Ta/ra _</code> <code>A</code> ALL_CAPS <code>BYTES_PER_SECOND</code> <code>/cu/Ta/ra _</code> <code>d</code> dash-case <code>bytes-per-second</code> <code>/cl/Ta/ra -</code> <code>t</code> Train-Case <code>Bytes-Per-Second</code> <code>/cc/Ta/ra -</code> <code>T</code> TRAIN-CASE <code>BYTES-PER-SECOND</code> <code>/cu/Ta/ra -</code> </li> </ul>"},{"location":"reference-guide.html#paragraph-formatting","title":"Paragraph formatting","text":"Work in progress <p>Paragraph formatting is in the features road map. It will consist in two filters to manage paragraphs:</p> <ol> <li>Basic formatting to a given width</li> <li>Formatting to a given width adding a prefix at each line</li> </ol> <p>Additional filters could be provided, like justifying a paragraph.</p>"},{"location":"reference-guide.html#custom-text-filters-lib","title":"Custom Text Filters (lib)","text":"<p>Note</p> <p>This feature is only available for the library, not for the command line.</p> <p>A text filter is a pointer to a function with the signature</p> <pre><code>   function Text_Filter (S : String) return String;\n</code></pre> <p>Text filters are passed to the mold library as an array of pointers to functions numbered in the range <code>0..9</code>. Thus, when you want to use a custom text filter, you can write</p> README.mb.mold<pre><code>   {{  TITLE  }}\n   {{  TITLE/0}}\n   Hello {{ ?world }}, this is just an {{           example  }}\n</code></pre> <p>The syntax <code>/0</code> after <code>TITLE</code>, tells mold to apply the filter in the 0th position of the array before the variable substitution. Assuming that the 0th element of the array of texts filters points to a function that returns a sequence of <code>\"---\"</code> with the same length of the argument, the resulting substitution would be:</p> README.mb.mold<pre><code>   README, please\n   --------------\n   Hello , this is just an example text\n</code></pre>"},{"location":"reference-guide.html#file-name-substitution","title":"File Name Substitution","text":"<p>Variables in file names must be written with the syntax <code>__variable__</code>, with no spaces between the variable name and underscores.</p> <p>For example, the file</p> <pre><code>   README___world__.md.mold\n</code></pre> <p>would generate, with the above definitions, a new file called</p> <pre><code>   README_World.md\n</code></pre> <p>Undefined variables in a file name always issue an error; no optional substitution here. Substitution in file names is enabled by default, but can be disabled.</p> <p>Warning</p> <p>Although it is possible to use directory names in variables definitions, like <code>world = \"foo/bar\"</code> to generate the file <code>README_foo/bar.md</code>, it is a strongly not recommended practice, for portability reasons. Mold does not check if you use directory separators in variable values, so use at your own risk. It is better to create previously the necessary directory structure and make mold operate in a directory.</p>"},{"location":"reference-guide.html#definitions-file","title":"Definitions File","text":"<p>The default definitions file is called <code>mold.toml</code>. It must be a simple TOML file, with variables like strings or paragraphs (multi-line variables)</p> variable assignment<pre><code>   string = \"value\"\nparagraph = '''\n      &gt; This is a quotation.\n   '''\n</code></pre> <p>Only strings are supported, and no arrays nor tables can be present. For more information, please read the TOML specification. Comments and multi-line strings are supported.</p>"},{"location":"reference-guide.html#settings","title":"Settings","text":"<p>The <code>mold</code> tool is a CLI wrapper of <code>libmold</code>, so this section applies to both implementations. There is a flag in the <code>mold</code> tool with the exact meaning:</p> Setting Description Default <code>Replacement_In_File_Names</code> Enables variable substitution in source file names. <code>True</code> <code>Delete_Source_Files</code> Delete source files if variable substitution process finish successfully. <code>True</code> <code>Overwrite_Destination_Files</code> Overwrite destination files, if already exist. <code>False</code> <code>Enable_Defined_Settings</code> Enable the use of mold settings in the definitions fie. <code>True</code> <code>Undefined_Variable_Action</code> Action for undefined variable substitution. <code>Ignore</code> <code>Undefined_Variable_Alert</code> Error handling for undefined variable substitution. <code>Warning</code> <code>Undefined_Filter_Alert</code> Alert level for undefined filters. <code>Warning</code> <code>Abort_On_Error</code> If <code>True</code>, aborts the process as soon as an error is detected. <code>True</code> <p>Action &amp; Alert</p> <p><code>Undefined_Variable_Action</code> and <code>Undefined_Variable_Alert</code> only apply to normal substitution of variables when an undefined variable is found:</p> <ul> <li><code>Undefined_Variable_Action</code> can be <code>Ignore</code>, to left the substitution as   is, or <code>Empty</code> to remove the text.</li> <li><code>Undefined_Variable_Alert</code> can be <code>None</code>, to silently skip the problem,   <code>Warning</code> to issue a warning and <code>Error</code> to issue an error.</li> </ul>"},{"location":"reference-guide.html#defined-settings","title":"Defined Settings","text":"<p>All above settings can be defined also in the definitions file, except the <code>Enable_Defined_Settings</code></p> <p>All variables starting with the prefix <code>mold-</code> are considered by Mold as setting variables, which means that they change the way in which Mold behaves by changing a Mold setting.</p> <p>For example,</p> mold.toml<pre><code>   mold-delete-source-files = \"false\"\nTITLE   = \"README, please\"\nworld   = \"World\"\nexample = \"example text\"\n</code></pre> <p>would prevent to remove the source file when the variable substitution process ends successfully.</p> <p>Setting variables can be used also as a normal variable, so for example</p> README___world__.md.mold<pre><code>   {{  TITLE  }}\n   Hello {{ world }}, ths is just an {{           example  }}\n\n   Note: This file generated with defined settings\n         `mold-delete-source-files`          = \"{{?mold-delete-source-files}}\"\n         `mold-overwrite-destination-files`  = \"{{?mold-overwrite-destination-files}}\"\n</code></pre> <p>would generate</p> README_World.md<pre><code>   README, please\n   Hello World, ths is just an example text\n\n   Note: This file generated with defined settings\n         `mold-delete-source-files`                   = \"false\"\n         `mold-overwrite-overwrite-destination-files` = \"\"\n</code></pre> <p>Defined setting variables available are, for the corresponding settings defined in Settings:</p> Setting Variable <code>Replacement_In_File_Names</code> <code>mold-replacement-in-file-names</code> <code>Delete_Source_Files</code> <code>mold-delete-source-files</code> <code>Overwrite_Destination_Files</code> <code>mold-overwrite-destination-files</code> <code>Undefined_Variable_Action</code> <code>mold-undefined-variable-action</code> <code>Undefined_Variable_Alert</code> <code>mold-undefined-variable-alert</code> <code>Undefined_Filter_Alert</code> <code>mold-undefined-filter-alert</code> <code>Abort_On_Error</code> <code>mold-abort-on-error</code>"},{"location":"reference-guide.html#template-inclusion","title":"Template Inclusion","text":"<p>External template files can be used as a generic template for header, footers and so on. These template files must have the <code>molt</code> extension. Can be included at any point in a <code>mold</code> file, in a single line, with the syntax</p> <pre><code>   {{ include:header.molt }}\n</code></pre> <p>The file name can be relative path to the current mold file being processed, or relative to the working directory from which the mold tool was invoked.</p> <p>When this line is found, Mold opens and processes the included file and the output is sent into the currently generated file. The same set or defined variables is replaced in the template.</p> <p>This is useful to share template snippets across several files or projects, greatly simplifying the maintenance.</p> <p>A template file can include other template files. The only limit on how many included files are supported is on your system. When circular dependencies are detected, an error is reported and the process is stopped.</p>"},{"location":"user-guide.html","title":"USER GUIDE","text":""},{"location":"user-guide.html#ada-library","title":"Ada Library","text":"<p>The Ada interface of <code>mold_lib</code> is quite simple. It consists of a unique public package with only one function.</p> <p>All the following descriptions are in the context of the <code>Mold_Lib</code> package:</p> mold_lib.ads<pre><code>   package Mold_Lib is\n--  type definitions and function declaration\nend Mold_Lib;\n</code></pre>"},{"location":"user-guide.html#apply","title":"Apply","text":"<p>The only function call available is:</p> mold.ads<pre><code>   function Apply\n(\nSource      : String          := \".\";\nOutput_Dir  : String          := \"\";\nDefinitions : String          := \"mold.toml\";\nSettings    : Settings_Access := null;\nFilters     : Filter_Array    := [others =&gt; null];\nResults     : Results_Access  := null\n)\nreturn Natural;\n</code></pre> <ol> <li> <p><code>Source</code> is a file or directory name.</p> </li> <li> <p><code>Output_Dir</code> is a directory name used when <code>Source</code> is a file name to      create the generated file in a different directory.</p> </li> <li> <p><code>Definition</code> is the file name that contains the variables definition.</p> </li> <li> <p><code>Settings</code> is a pointer to a <code>Mold.Settings_Type</code> object. If <code>null</code>, the      default settings are used. See section below for a complete description.</p> </li> <li> <p><code>Filters</code> is an array <code>(0..9)</code> of pointers to functions with the      signature      <pre><code>   function (S : String) return String;\n</code></pre></p> </li> <li> <p>Return value is the number of errors detected.</p> </li> </ol>"},{"location":"user-guide.html#settings","title":"Settings","text":"<p>The <code>Settings_Type</code> is defined as:</p> mold.ads<pre><code>   type Undefined_Variable_Actions is (Ignore, Empty);\ntype Undefined_Alerts  is (None, Warning, Error);\ntype Settings_Type is record\nReplacement_In_File_Names   : aliased Boolean;\nDelete_Source_Files         : aliased Boolean;\nOverwrite_Destination_Files : aliased Boolean;\nEnable_Defined_Settings     : aliased Boolean;\nUndefined_Variable_Action   : aliased Undefined_Variable_Actions;\nUndefined_Variable_Alert    : aliased Undefined_Alerts;\nUndefined_Filter_Alert      : aliased Undefined_Alerts;\nAbort_On_Error              : aliased Boolean;\nend record;\n</code></pre> <p>If you specify a <code>null</code> pointer in the <code>Settings</code> parameter, then the default settings are used, which are defined as:</p> mold_lib.ads<pre><code>   Default_Settings : aliased Settings_Type :=\n(\nReplacement_In_File_Names   =&gt; True,\nDelete_Source_Files         =&gt; True,\nOverwrite_Destination_Files =&gt; False,\nEnable_Defined_Settings     =&gt; True,\nUndefined_Variable_Action   =&gt; Ignore,\nUndefined_Variable_Alert    =&gt; Error,\nUndefined_Filter_Alert      =&gt; Warning,\nAbort_On_Error              =&gt; True\n);\n</code></pre> <p>Refer to Settings section for more information.</p>"},{"location":"user-guide.html#results","title":"Results","text":"<p>If you give a pointer to a <code>Results_Type</code> object as parameter in the <code>Apply</code> function, detailed results are provided:</p> mold_lib.ads<pre><code>   type Field_Type is\n(\nFiles_Processed,\nFiles_Renamed,\nFiles_Overwritten,\nFiles_Deleted,\nVariables_Defined,     --  in the definitions file\nVariables_Found,       --  in all mold files\nVariables_Undefined,\nVariables_Replaced,\nVariables_Ignored,\nVariables_Emptied,\nFilters_Found,\nFilters_Applied,\nReplacement_Warnings,\nReplacement_Errors\n);\ntype Results_Type is array (Field_Type) of Natural;\n</code></pre>"},{"location":"user-guide.html#command-line-tool","title":"Command Line Tool","text":"<p>Warning</p> <p>Work still in progress.</p>"}]}