WinLAMP File Structure:

Apache is used as the main install directory; it already has mysql and php 
directories tucked inside. phpMyAdmin remains in the main Apache
directory.

Apache2                 ---> root apache directory & php5ts.dll
Apache2\bin             ---> apache executables & libmysql.dll
Apache2\conf            ---> apache config files

Apache2\modules\php     ---> main PHP directory
Apache2\modules\php\tmp ---> where php stores its session files
Apache2\modules\php\php.ini ---> where php stores its INI file

Apache2\phpmyadmin\config.inc.php ---> phpmyadmin config file
Apache2\install         ---> where WinLAMP keeps its install files

--> php5ts.dll has been copied into the Apache\bin directory
--> libmysql.dll has also been copied into Apache\bin
--> a \tmp directory was added to the modules\php subdirectory

these 3 changes are needed if you are replicating this directory 
structure manually. (\tmp is needed for php sessions)

Apache\bin is added to the system path.


WinLAMP Installer:

The NSI script is commented internally, so it should make sense. HM NIS Edit is an
excellent editor for NSI scripts.

While testing on a slow machine, utilize the 'empty' and 'full' folders:

Just before you run the COMPILE command, Search/Replace 'Full.' and switch 
to the 'Empty.' tree. The compiler will compile within a few seconds instead 
of compressing all the files. When you have that debugged, go ahead and run 
the compiler on the 'full' tree.

When building the 'mini' version of WinLAMP, you will be building from the
WinLAMP.Mini folder.

The \install directory within Apache contains a few odds and ends used during
installation, particularly a Perl script and the nubbin of the Perl.exe used
to run it. The Perl script updates php.ini and httpd.conf 
with the installer's custom information regarding filepaths &tc. I put a
sleep 10 as the last line in the file when debugging it.

Questions, comments, to: jdjs [at] users.sourceforge.net
