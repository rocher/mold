var __index = {"config":{"lang":["en"],"separator":"[\\s\\-]+","pipeline":["stopWordFilter"]},"docs":[{"location":"index.html","title":"WELCOME TO MOLD","text":"<p>Meta-variable Operations for Lean Development</p> <p>Mold is a powerful tool that facilitates the creation and management of project templates through customizable files with meta-variables. It allows users to prepare a set of files and define placeholders (meta-variables) using double curly braces that can be replaced with specific values when creating new projects.</p> <p>While Mold brings its own unique approach, several common features and functionalities can be found in similar existing tools for project templating and scaffolding.</p>"},{"location":"index.html#different-sources","title":"Different sources","text":"<p>Mold can operate on a single file or recursively in a given directory. All files processed by Mold must end with the <code>mold</code> extension. The process of variable substitution from a mold file generates a new file, with the same name except the <code>mold</code> extension.</p>"},{"location":"index.html#three-modes-of-variable-substitution","title":"Three modes of variable substitution","text":"<p>All variables can be used in three different substitution modes: <code>normal</code>, <code>optional</code> and <code>mandatory</code>. This provides different error handling when Mold encounters an undefined variable.</p>"},{"location":"index.html#source-file-name-substitution","title":"Source file name substitution","text":"<p>Variable substitution can be applied also in the source file name. The syntax for variables is slightly different for file names, for portability reasons, but the concept is the same.</p>"},{"location":"index.html#variable-definitions-file","title":"Variable definitions file","text":"<p>All variable values are assigned in a single TOML file. The accepted file format is the most simple TOML format, with a single <code>vairable = \"value\"</code> assignment per line. Multiline variables are supported, as well.</p>"},{"location":"index.html#defined-settings","title":"Defined settings","text":"<p>It is possible to use special variables prefixed with <code>mold-</code>, like <code>mold-delete-source-files</code>, to specify Mold settings inside the definitions file. Settings specified by the command line or the library interface can be overwritten by these defined settings. This enables the possibility to easily remember and force some settings during development or production, regardless of the settings used in the project configuration.</p>"},{"location":"index.html#template-inclusion","title":"Template inclusion","text":"<p>Mold allows the inclusion of template files, which must end with the extension <code>molt</code>. This opens the possibility to write small snippets or generic templates that can be easily shared across projects (eg, for headers or footers). Template files are processed like regular files, so can contain mold variables, too.</p>"},{"location":"installation.html","title":"INSTALLATION","text":""},{"location":"installation.html#ada-library","title":"Ada Library","text":"<p>Original implementation is the Ada library <code>libmold</code>, available in the Alire community index. This allows you to integrate the libmold crate in your Ada projects.</p>"},{"location":"installation.html#command-line-tool","title":"Command Line Tool","text":"<p>A command line tool, called <code>mold</code>, is available for Linux, Mac and Window.</p> <p>Download binary packages from GitHub.</p> <p>Warning</p> <p>All publication activities still in progress.</p>"},{"location":"reference-guide.html","title":"REFERENCE GUIDE","text":""},{"location":"reference-guide.html#overall-process","title":"Overall Process","text":"<p>Variable substitution takes place in a single file or directory, and recursively, across all its sub-directories. Processed files must end with the <code>mold</code> extension. The substitution process generates a new file with all the variables replaced with the corresponding values. The new file name is the same as the source file, but removing the <code>.mold</code> extension:</p> <pre><code>   README.md.mold -- [ mold generates ] --&gt; README.md\n</code></pre> <p>By default, if a generated file already exists, Mold issues a error, but it is possible to force overwriting existing files.</p>"},{"location":"reference-guide.html#operating-in-directories","title":"Operating in directories","text":"<p>Mold can operate recursively across all subdirectories of a given directory. Additionally, it is possible to specify a different output directory. This use case comes in handy to create a new project directory starting from a given template project.</p> <p>Mold recurses all subdirectories and applies the variable substitution to all mold files found. The generated file is created in the same path, but relative to the output directory. If necessary, all parent directories are created as well.</p> <p>Files not processed by mold won't be found in the output directory. For example:</p> <pre><code>INPUT DIRECTORY  \u2500[ Mold ]-&gt; OUTPUT DIRECTORY = /tmp/lorem/ipsum\n\n     foo/                             /tmp/\n     \u251c\u2500\u2500 bar.txt.mold                  \u2514\u2500\u2500 lorem/\n     \u251c\u2500\u2500 baz.md.mold                       \u2514\u2500\u2500 ipsum/\n     \u251c\u2500\u2500 definitions.toml                      \u251c\u2500\u2500 foo/\n     \u251c\u2500\u2500 header.molt                           \u2502   \u251c\u2500\u2500 bar.txt\n     \u251c\u2500\u2500 subdir_1/                             \u2502   \u2514\u2500\u2500 baz.md\n     \u2502   \u251c\u2500\u2500 foo-bar.adb.mold                  \u251c\u2500\u2500 subdir_1/\n     \u2502   \u251c\u2500\u2500 bar-bar.ads.mold                  \u2502   \u251c\u2500\u2500 foo-bar.adb\n     \u2502   \u2514\u2500\u2500 footer.molt                       \u2502   \u2514\u2500\u2500 foo-bar.ads\n     \u2514\u2500\u2500 subdir_2/                             \u2514\u2500\u2500 subdir_2/\n         \u251c\u2500\u2500 foo-2.adb.mold                        \u251c\u2500\u2500 foo-2.adb\n         \u251c\u2500\u2500 bar-2.ads.mold                        \u251c\u2500\u2500 foo-2.ads\n         \u251c\u2500\u2500 local-header.molt                     \u2514\u2500\u2500 subdir_3/\n         \u2514\u2500\u2500 subdir_3/                                 \u251c\u2500\u2500 foo-3.md\n             \u251c\u2500\u2500 foo-3.md.mold                         \u2514\u2500\u2500 bar.md\n             \u2514\u2500\u2500 bar.md.mold\n</code></pre>"},{"location":"reference-guide.html#error-handling","title":"Error Handling","text":"<p>There are two types of errors that Mold can detect and handle in different ways. First of all, there are the fatal errors, those that prevent Mold from completing the replacement job. Typical fatal errors are produced when a file is not found, the destination directory cannot be written or created or the definitions file is corrupted. These errors stop immediately the replacement process.</p> <code>Fatal Errors</code> <p>Prevent Mold from completing the replacement job. Typical fatal errors are produced when a file is not found, the destination directory cannot be written or created, or the definitions file is corrupted. These errors stop immediately the replacement process.</p> <code>Replacement Errors</code> <p>Detected during the variable replacement, these errors are caused when a variable is found in a mold file but the variable has not been defined. Depending on the settings and the type of substitution, Mold can skip this error, report a warning or an error, and continue with the process. Next section explain how these errors are handled.</p>"},{"location":"reference-guide.html#variable-substitution","title":"Variable Substitution","text":"<p>All variables inside a file must be written with the syntax <code>{{variable}}</code>:</p> README.md.mold<pre><code>   {{TITLE}}\n   Hello {{world}}, this is just an {{example}}\n</code></pre> <p>with any number of spaces between the variable name and curly braces:</p> README.md.mold<pre><code>   {{  TITLE  }}\n   Hello {{ world }}, ths is just an {{           example  }}\n</code></pre> <p>Thus, with the following definitions:</p> mold.toml<pre><code>   TITLE   = \"README, please\"\nworld   = \"World\"\nexample = \"example text\"\n</code></pre> <p>the new file contents would be:</p> README.md<pre><code>   README, please\n   Hello World, ths is just an example text\n</code></pre>"},{"location":"reference-guide.html#substitution-modes","title":"Substitution Modes","text":"<p>There are three substitution modes in Mod. The only difference between them is the error handling when an undefined variable is found.</p>"},{"location":"reference-guide.html#normal","title":"Normal","text":"<p>For an undefined variable, the default behavior is to issue a warning and left the variable ignored, or unchanged. If <code>world</code> was undefined, the above example would be:</p> README.md.mold<pre><code>   README, please\n   Hello {{ world }}, ths is just an example test\n</code></pre> <p>It is possible to specify that the undefined variable must be removed and that no warning must be issued.</p>"},{"location":"reference-guide.html#optional","title":"Optional","text":"<p>Optional substitution is written as <code>{{ ?variable }}</code>, for any variable. For undefined variables, optional substitution does no issues a warning and the <code>{{ ?variable }}</code> text is removed.</p> <p>For example,</p> <p>README.mb.mold<pre><code>   {{  TITLE  }}\n   Hello {{ ?world }}, this is just an {{           example  }}\n</code></pre> issues no warning and generates</p> README.md<pre><code>   README, please\n   Hello , this is just an example text\n</code></pre> <p>Note</p> <p>There are no optional variables: it is the substitution mode that can be optional. Any variable can be used as <code>{{variable}}</code> and <code>{{?variable}}</code> at different places, even in the same file. Remember that The difference between the substitution modes is the error handling when the variable is undefined.</p>"},{"location":"reference-guide.html#mandatory","title":"Mandatory","text":"<p>Mandatory substitution is written as <code>{{ #variable }}</code>. If the variable is undefined, Mold issues an error and makes no substitution. By default, the substitution process is aborted on error.</p> <p>Syntax</p> <p>In optional and mandatory substitution modes, characters <code>?</code> and <code>#</code> are part of the variable name, not part of the curly braces. Thus, <code>{{?variable}}</code> and <code>{{  #variable  }}</code> are valid variables, while <code>{{? variable }}</code> and <code>{{#  variable}}</code> are invalid.</p>"},{"location":"reference-guide.html#file-name-substitution","title":"File Name Substitution","text":"<p>Variables in file names must be written with the syntax <code>__variable__</code>, with no spaces between the variable name and underscores.</p> <p>For example, the file</p> <pre><code>   README___world__.md.mold\n</code></pre> <p>would generate, with the above definitions, a new file called</p> <pre><code>   README_World.md\n</code></pre> <p>Undefined variables in a file name signals an error; variables cannot by optional. Substitution in file names is enabled by default, but can be disabled.</p> <p>Warning</p> <p>Although it is possible to use directory names in variables definitions, like <code>world = \"foo/bar\"</code> to generate the file <code>README_foo/bar.md</code>, it is a strongly not recommended practice, for portability reasons. Mold does not check if you use directory separators in variable values, so use at your own risk. It is better to create previously the necessary directory structure and make mold operate in a directory.</p>"},{"location":"reference-guide.html#definitions-file","title":"Definitions File","text":"<p>The default definitions file is called <code>mold.toml</code>. It must be a simple TOML file, with variables like strings or paragraphs (multi-line variables)</p> variable assignment<pre><code>   string = \"value\"\nparagraph = '''\n      &gt; This is a quotation.\n   '''\n</code></pre> <p>Only strings are supported, and no arrays nor tables can be present. For more information, please read the TOML specification. Comments and multi-line strings are supported.</p>"},{"location":"reference-guide.html#settings","title":"Settings","text":"<p>The <code>mold</code> tool is a CLI wrapper of <code>libmold</code>, so this section applies to both implementations. There is a flag in the <code>mold</code> tool with the exact meaning:</p> Setting Description Default <code>Replacement_In_File_Names</code> Enables variable substitution in source file names. <code>True</code> <code>Delete_Source_Files</code> Delete source files if variable substitution process finish successfully. <code>True</code> <code>Overwrite_Destination_Files</code> Overwrite destination files, if already exist. <code>False</code> <code>Enable_Defined_Settings</code> Enable the use of mold settings in the definitions fie. <code>True</code> <code>Undefined_Variable_Action</code> When undefined, replacement for normal variable substitution mode. <code>Ignore</code> <code>Undefined_Variable_Alert</code> When undefined, error handling for normal variable substitution mode. <code>Warning</code> <code>Abort_On_Error</code> If <code>True</code>, aborts the variable substitution process as soon as an error is detected. <code>True</code> <p>Action &amp; Alert</p> <p><code>Undefined_Variable_Action</code> and <code>Undefined_Variable_Alert</code> only apply to normal substitution of variables when an undefined variable is found:</p> <ul> <li><code>Undefined_Variable_Action</code> can be <code>Ignore</code>, to left the substitution as   is, or <code>Empty</code> to remove the text.</li> <li><code>Undefined_Variable_Alert</code> can be <code>None</code>, to silently skip the problem,   or <code>Warning</code> to issue a warning message.</li> </ul>"},{"location":"reference-guide.html#defined-settings","title":"Defined Settings","text":"<p>All above settings can be defined also in the definitions file, except the <code>Enable_Defined_Settings</code></p> <p>All variables starting with the prefix <code>mold-</code> are considered by Mold as setting variables, which means that they change the way in which Mold behaves by changing a Mold setting.</p> <p>For example,</p> mold.toml<pre><code>   mold-delete-source-files = \"false\"\nTITLE   = \"README, please\"\nworld   = \"World\"\nexample = \"example text\"\n</code></pre> <p>would prevent to remove the source file when the variable substitution process ends successfully.</p> <p>Setting variables can be used also as a normal variable, so for example</p> README___world__.md.mold<pre><code>   {{  TITLE  }}\n   Hello {{ world }}, ths is just an {{           example  }}\n\n   Note: This file generated with defined settings\n         `mold-delete-source-files`          = \"{{?mold-delete-source-files}}\"\n         `mold-overwrite-destination-files`  = \"{{?mold-overwrite-destination-files}}\"\n</code></pre> <p>would generate</p> README_World.md<pre><code>   README, please\n   Hello World, ths is just an example text\n\n   Note: This file generated with defined settings\n         `mold-delete-source-files`                   = \"false\"\n         `mold-overwrite-overwrite-destination-files` = \"\"\n</code></pre> <p>Defined setting variables available are, for the corresponding settings defined in Settings:</p> Setting Variable <code>Replacement_In_File_Names</code> <code>mold-replacement-in-file-names</code> <code>Delete_Source_Files</code> <code>mold-delete-source-files</code> <code>Overwrite_Destination_Files</code> <code>mold-overwrite-destination-files</code> <code>Undefined_Variable_Action</code> <code>mold-undefined-variable-action</code> <code>Undefined_Variable_Alert</code> <code>mold-undefined-variable-alert</code> <code>Abort_On_Error</code> <code>mold-abort-on-error</code>"},{"location":"reference-guide.html#template-inclusion","title":"Template Inclusion","text":"<p>External template files can be used as a generic template for header, footers and so on. These template files must have the <code>molt</code> extension. Can be included at any point in a <code>mold</code> file, in a single line, with the syntax</p> <pre><code>   {{ include:header.molt }}\n</code></pre> <p>The file name can be relative path to the current mold file being processed, or relative to the working directory from which the mold tool was invoked.</p> <p>When this line is found, Mold opens and processes the included file and the output is sent into the currently generated file. The same set or defined variables is replaced in the template.</p> <p>This is useful to share template snippets across several files or projects, greatly simplifying the maintenance.</p> <p>A template file can include other template files. The only limit on how many included files are supported is on your system. When circular dependencies are detected, an error is reported and the process is stopped.</p>"},{"location":"user-guide.html","title":"USER GUIDE","text":""},{"location":"user-guide.html#ada-library","title":"Ada Library","text":"<p>The Ada interface of <code>libmold</code> is quite simple. It consists of a unique public package with only one function.</p> <p>All the following descriptions are in the context of the <code>Lib_Mold</code> package:</p> lib_mold.ads<pre><code>   package Lib_Mold is\n--  type definitions and function declaration\nend Lib_Mold;\n</code></pre>"},{"location":"user-guide.html#apply","title":"Apply","text":"<p>The only function call available is:</p> mold.ads<pre><code>   function Apply\n(\nSource      : String          := \".\";\nOutput_Dir  : String          := \"\";\nDefinitions : String          := \"mold.toml\";\nSettings    : Settings_Access := null;\nResults     : Results_Access  := null\n)\nreturn Natural;\n</code></pre> <ol> <li> <p><code>Source</code> is a file or directory name.</p> </li> <li> <p><code>Output_Dir</code> is a directory name used when <code>Source</code> is a file name to      create the generated file in a different directory.</p> </li> <li> <p><code>Definition</code> is the file name that contains the variables definition.</p> </li> <li> <p><code>Settings</code> is a pointer to a <code>Mold.Settings_Type</code> object. If <code>null</code>, the      default settings are used. See section below for a complete description.</p> </li> <li> <p>Return value is the number of errors detected.</p> </li> </ol>"},{"location":"user-guide.html#settings","title":"Settings","text":"<p>The <code>Settings_Type</code> is defined as:</p> mold.ads<pre><code>   type Undefined_Variable_Actions is (Ignore, Empty);\ntype Undefined_Variable_Alerts  is (None, Warning);\ntype Settings_Type is record\nReplacement_In_File_Names   : aliased Boolean;\nDelete_Source_Files         : aliased Boolean;\nOverwrite_Destination_Files : aliased Boolean;\nEnable_Defined_Settings     : aliased Boolean;\nUndefined_Variable_Action   : aliased Undefined_Variable_Actions;\nUndefined_Variable_Alert    : aliased Undefined_Variable_Alerts;\nAbort_On_Error              : aliased Boolean;\nend record;\n</code></pre> <p>If you specify a <code>null</code> pointer in the <code>Settings</code> parameter, then the default settings are used, which are defined as:</p> lib_mold.ads<pre><code>   Default_Settings : aliased Settings_Type :=\n(\nReplacement_In_File_Names   =&gt; True,\nDelete_Source_Files         =&gt; True,\nOverwrite_Destination_Files =&gt; False,\nEnable_Defined_Settings     =&gt; True,\nUndefined_Variable_Action   =&gt; Ignore,\nUndefined_Variable_Alert    =&gt; Warning,\nAbort_On_Error              =&gt; True\n);\n</code></pre> <p>Refer to Settings section for more information.</p>"},{"location":"user-guide.html#results","title":"Results","text":"<p>If you give a pointer to a <code>Results_Type</code> object as parameter in the <code>Apply</code> function, detailed results are provided:</p> lib_mold.ads<pre><code>   type Field_Type is\n(\nFiles_Processed,\nFiles_Renamed,\nFiles_Overwritten,\nVariables_Defined,     --  in the definitions file\nVariables_Found,       --  in all mold files\nVariables_Undefined,\nVariables_Replaced,\nVariables_Ignored,\nVariables_Emptied,\nReplacement_Warnings,\nReplacement_Errors\n);\ntype Results_Type is array (Field_Type) of Natural;\n</code></pre>"},{"location":"user-guide.html#command-line-tool","title":"Command Line Tool","text":"<p>Warning</p> <p>Work still in progress.</p>"}]}