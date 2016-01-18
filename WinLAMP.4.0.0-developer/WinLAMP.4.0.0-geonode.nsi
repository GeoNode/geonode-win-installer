; preamble
Name                "WinLAMP - GeoNode"
OutFile             "WinLAMP.4.0.0-geonode.exe"

; includes
!include AddToPath.nsh

; Sections
!include "Sections.nsh"

!include FileFunc.nsh
!insertmacro GetParameters
!insertmacro GetOptions

; install directory options
InstallDir          "C:\"
DirText             "Select the drive on which to install Apache2. \
                    For quick navigation to the Apache2\htdocs directory, \
                    we recommend a root directory, as below."

; Installer options and privileges
RequestExecutionLevel admin
AllowRootDirInstall true
ShowInstDetails     show

; Compression options
CRCCheck on
; Use better compression
SetCompress     auto
SilentInstall   silent
SilentUnInstall silent

; define the installation types
InstType "Minimal" ; Section 1


; list the various component sections
ComponentText       "Note: PHP directories install within the Apache2 tree." "" \
                    "OH, HEY: MAKE SURE THAT YOUR FIREWALL IS TURNED OFF WHILE INSTALLING OR ELSE APACHE WILL ARGUE WITH IT."

; show pages in this order
;Page components
Page directory
Page custom ApacheConfig ValidateConfig ": Apache2 configuration"
Page instfiles


; initialize
Function .onInit

  ${GetParameters} $R0
  ClearErrors
  ${GetOptions} $R0 -GEOSERVER-PORT= $3
  
  ; initialize installoptions file
  InitPluginsDir
  File /oname=$TEMP\apacheconfig.ini "WinLAMP.GeoNode\Apache2\install\apacheconfig.ini"

  ; display a splash
  SetOutPath $TEMP
  File /oname=spltmp.bmp "WinLAMP.GeoNode\Apache2\install\winlamp.bmp"
  Splash::show 1000 $TEMP\spltmp
  ;Pop $0 ; $0 has '1' if the user closed the splash screen early,
	 ; '0' if everything closed normal, and '-1' if some error occured.
  Delete $TEMP\spltmp.bmp
  
FunctionEnd


;display the Install Options dialog
Function ApacheConfig
  Push $R0
  InstallOptions::dialog "$TEMP\apacheconfig.ini"
  Pop $R0
FunctionEnd


; retrieve apache configuration data
Function ValidateConfig
  ; retrieve data from the three fields
  ReadINIStr $0 "$TEMP\apacheconfig.ini" "Field 4" "State"
  ReadINIStr $1 "$TEMP\apacheconfig.ini" "Field 5" "State"
  ReadINIStr $2 "$TEMP\apacheconfig.ini" "Field 9" "State"
  ; crude attempt at validation: make sure there is at least some data
  StrCmp $0 "" +1 +3
    MessageBox MB_ICONEXCLAMATION|MB_OK "Please enter a Server Name"
    Abort
  StrCmp $1 "" +1 +3
    MessageBox MB_ICONEXCLAMATION|MB_OK "Please enter an Admin Email Address"
    Abort
  StrCmp $2 "" +1 +3
    MessageBox MB_ICONEXCLAMATION|MB_OK "Please enter a Server Port"
    Abort

  ;Push $R0
  ;${GetParameters} $R0
  ;ClearErrors
  ;${GetOptions} $R0 -GEOSERVER-PORT= $3
  StrCmp $3 "" +1 +5
	ReadINIStr $3 "$TEMP\apacheconfig.ini" "Field 12" "State"
	StrCmp $3 "" +1 +3
		MessageBox MB_ICONEXCLAMATION|MB_OK "Please enter a GeoServer Port"
		Abort

  ;Pop $R0
FunctionEnd


; main section
Section "!Apache2 + PHP5"

  SectionIn           1 RO ; this section is always included
  SetShellVarContext  all ; modifies 'all users' area of start menu

  ; backup and clean up from preceding installation
  Call                BackupHtdocs

  ; make sure there is no other Apache2 currently installed -- uninstall
  ExecWait            '$SYSDIR\net stop Apache2' ; stop service
  ExecWait            '$INSTDIR\Apache2\bin\Apache.exe -k uninstall -n "Apache2"' ; remove apache service
  ExecWait            '$SYSDIR\sc delete "Apache2"' ; remove apache service

  ; install the main Apache2 directory
  SetOutPath          "$INSTDIR"
  File /r             "WinLAMP.GeoNode\Apache2" ; install the main Apache directory

  ; update system path
  Push "$INSTDIR\Apache2\bin"
  Call AddToPath
  
  ; install some shortcuts
  SetOutPath          "$SMPROGRAMS\WinLAMP"

  CreateShortCut      "$SMPROGRAMS\WinLAMP\Apache Start.lnk" \
                      "$INSTDIR\Apache2\bin\Apache.exe" \
                      '-w -n "Apache2" -d "$INSTDIR\Apache2" -k start' \
                      "$INSTDIR\Apache2\install\apache.ico"
  CreateShortCut      "$SMPROGRAMS\WinLAMP\Apache Stop.lnk" \
                      "$INSTDIR\Apache2\bin\Apache.exe" \
                      '-w -n "Apache2" -d "$INSTDIR\Apache2" -k stop' \
                      "$INSTDIR\Apache2\install\apache.ico"
  CreateShortCut      "$SMPROGRAMS\WinLAMP\Apache Restart.lnk" \
                      "$INSTDIR\Apache2\bin\Apache.exe" \
                      '-w -n "Apache2" -d "$INSTDIR\Apache2" -k restart' \
                      "$INSTDIR\Apache2\install\apache.ico"
  CreateShortCut      "$SMPROGRAMS\WinLAMP\Apache Test.lnk" \
                      "$INSTDIR\Apache2\bin\Apache.exe" \
                      '-t -n "Apache2"' \
                      "$INSTDIR\Apache2\install\apache.ico"
  CreateShortCut      "$SMPROGRAMS\WinLAMP\Uninstall WinLAMP.lnk" \
                      "$INSTDIR\Apache2\uninstall_WinLAMP.exe" 
  CreateShortCut      "$SMPROGRAMS\WinLAMP\WinLAMP config tips.lnk" \
                      "$INSTDIR\Apache2\install\winlamptips.html"

  SetOutPath          "$SMPROGRAMS\WinLAMP\Configure"
  CreateShortCut      "$SMPROGRAMS\WinLAMP\Configure\Edit Apache httpd.conf file.lnk" \
                      "Notepad" \
                      "$INSTDIR\Apache2\conf\httpd.conf"
  ;CreateShortCut      "$SMPROGRAMS\WinLAMP\Configure\Edit PHP php.ini file.lnk" \
  ;                    "Notepad" \
  ;                    "$INSTDIR\Apache2\modules\php\php.ini"

  ; run the updateconfs perlscript to add this machine's servername to httpd.conf, etc.
  SetOutPath          '$INSTDIR\Apache2\install'
  ExecWait            '$INSTDIR\Apache2\install\perl \
                      "$INSTDIR\Apache2\install\updateconfs.pl" \
                      "$INSTDIR\Apache2" "$0" "$1" "$2" "$3" "$INSTDIR" "$WINDIR"'

  ; install Apache as service
  ExecWait            '$INSTDIR\Apache2\bin\Apache.exe -k install -n "Apache2" -d "$INSTDIR\Apache2"'

  ; start the service
  ;ExecWait            '$INSTDIR\Apache2\bin\Apache.exe -w -n "Apache2" -d "$INSTDIR\Apache2" -k start'

  ; registry settings, useful for add/remove programs
  WriteRegStr         HKEY_LOCAL_MACHINE \
                      "SOFTWARE\WinLAMP" \
                      "Install_Dir" \
                      "$INSTDIR\Apache2"
  WriteRegStr         HKEY_LOCAL_MACHINE \
                      "Software\Microsoft\Windows\CurrentVersion\Uninstall\WinLAMP" \
                      "DisplayName" \
                      "WinLAMP"
  WriteRegDWORD       HKEY_LOCAL_MACHINE \
                      "Software\Microsoft\Windows\CurrentVersion\Uninstall\WinLAMP" \
                      "NoModify" \
                      "1"
  WriteRegDWORD       HKEY_LOCAL_MACHINE \
                      "Software\Microsoft\Windows\CurrentVersion\Uninstall\WinLAMP" \
                      "NoRepair" \
                      "1"
  WriteRegStr         HKEY_LOCAL_MACHINE \
                      "Software\Microsoft\Windows\CurrentVersion\Uninstall\WinLAMP" \
                      "DisplayVersion" \
                      "4.0.0"
  WriteRegStr         HKEY_LOCAL_MACHINE \
                      "Software\Microsoft\Windows\CurrentVersion\Uninstall\WinLAMP" \
                      "UninstallString" \
                      "$INSTDIR\Apache2\uninstall_WinLAMP.exe"

  ; create the uninstaller
  WriteUninstaller    "$INSTDIR\Apache2\uninstall_WinLAMP.exe"

SectionEnd


; popup a browser when the installation is complete
Function .onInstSuccess
  Delete "$TEMP\apacheconfig.ini"
  ; give us an introductory page; hopefully it will all work!
  ;Exec '$PROGRAMFILES\Internet Explorer\Iexplore.exe http://localhost/'
  ;ExecShell "open" 'http://localhost:$2/'
FunctionEnd


; backup Apache htdocs directories; ask first
Function BackupHtdocs

  ; backup Apache2 htdocs
  IfFileExists           "$INSTDIR\Apache2\htdocs\*.*" +1 +5
  MessageBox MB_YESNOCANCEL "Your Apache2\htdocs directory has files in it. I recommend a backup before continuing. \
                         $\n$\nClick YES to make a backup now, NO to skip backup, CANCEL to abort installer." IDYES +2 IDNO +4
  Abort                  "Installer cancelled. Adios!"
  ExecWait               "echo Please wait while htdocs directory is stored on desktop..."
  CopyFiles /SILENT      "$INSTDIR\Apache2\htdocs" "$DESKTOP\WinLAMP Apache2 htdocs Backup"

FunctionEnd


; uninstaller version; note the path difference here, though: whether NSIS bug or feature, not sure
Function un.BackupHtdocs

  IfFileExists           "$INSTDIR\htdocs\*.*" +1 +5
  MessageBox MB_YESNOCANCEL "Your Apache2\htdocs directory has files in it. I recommend a backup before continuing. \
                         $\n$\nClick YES to make a backup now, NO to skip backup, CANCEL to abort installer." IDYES +2 IDNO +4
  Abort                  "Installer cancelled. Adios!"
  ExecWait               "echo Please wait while htdocs directory is stored on desktop..."
  CopyFiles /SILENT      "$INSTDIR\htdocs" "$DESKTOP\WinLAMP Apache2 htdocs Backup"

FunctionEnd

; set the text which appears on the uninstall page
UninstallText "Uninstalls WinLAMP from your system.$\rHave you made a backup of htdocs? $\rTHE ENTIRE DIRECTORY BELOW WILL BE REMOVED."


; uninstall
Section "Uninstall"

  SetShellVarContext  all

  ; check and see if we're about to delete somethin precious
  ;Call un.BackupHtdocs

  ; shutdown anything still running
  ExecWait            '$INSTDIR\bin\Apache.exe -k shutdown -n "Apache2"' ; stop apache service
  ExecWait            '$INSTDIR\bin\Apache.exe -k uninstall -n "Apache2"' ; remove apache service
  ExecWait            '$SYSDIR\sc delete "Apache2"' ; remove apache service

  ; remove the start menu items
  Delete              "$SMPROGRAMS\WinLAMP\Apache Start.lnk" ; remove shortcuts
  Delete              "$SMPROGRAMS\WinLAMP\Apache Stop.lnk"
  Delete              "$SMPROGRAMS\WinLAMP\Apache Restart.lnk"
  Delete              "$SMPROGRAMS\WinLAMP\MySQL Start.lnk"
  Delete              "$SMPROGRAMS\WinLAMP\MySQL Stop.lnk"
  Delete              "$SMPROGRAMS\WinLAMP\Uninstall WinLAMP.lnk"
  Delete              "$SMPROGRAMS\WinLAMP\Configure\Edit Apache httpd.conf file.lnk"
  ;Delete              "$SMPROGRAMS\WinLAMP\Configure\Edit PHP php.ini file.lnk"
  Delete              "$SMPROGRAMS\WinLAMP\WinLAMP config tips.lnk"
  RMDir /r            "$SMPROGRAMS\WinLAMP\Configure"
  RMDir /r            "$SMPROGRAMS\WinLAMP"

  ; remove the path setting
  Push "$INSTDIR\bin"
  Call un.RemoveFromPath

  ; goodbye registry entries
  DeleteRegKey        HKEY_LOCAL_MACHINE "SOFTWARE\WinLAMP"
  DeleteRegKey        HKEY_LOCAL_MACHINE "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\WinLAMP"

  ; and finally, goodbye to the Apache2 directory
  SetOutPath          "$INSTDIR"
  ExecWait            "echo Please wait while Apache2 directory is removed..."
  RMDir /r            "$INSTDIR" ; remove the empty directories
  ; /r doesn't seem to work on all systems, so here is insurance:
  ExecWait            'del /s /q *.*' ; delete all files in the directory
  SetOutPath          "$SMPROGRAMS"
  RMDir /r            "$INSTDIR" ; remove the empty directory

SectionEnd

;eof
