; GeoNode Windows installer creation file.

; Installer options and privileges
RequestExecutionLevel admin
AllowRootDirInstall true
ShowInstDetails     show

; Compression options
CRCCheck on
; Use better compression
SetCompress         auto

; Define your application name
!define APPNAME "GeoNode"
!define VERSION "2.4"
;!define LONGVERSION "1.0.0.0"
!define APPNAMEANDVERSION "${APPNAME}-${VERSION}"

; Place all temporary files used by the installer in their own subdirectory under $TEMP (makes the files easier to find)
!define TEMPDIR "$TEMP\geonode_installer"

!define JRE_EXE "jre-7u80-windows-i586.exe"
!define GEONODE_ZIP "geonode-2.4.x.zip"
!define GEONODE_FOLDER "geonode-2.4.x"
!define GEOSERVER_DATA_ZIP "data.zip"
!define PYTHON27_MSI "python-2.7.10.msi"
!define POSTGRESQL_EXE "postgresql-8.4.22-1-windows.exe"
!define POSTGIS_EXE "postgis-pg84-setup-1.5.4-2.exe"
!define POSTGRESQL_UNINSTALL_EXE "uninstall-postgresql.exe"
!define POSTGIS_UNINSTALL_EXE "uninstall-postgis-pg84-1.5.4-2.exe"
!define WINLAMP_EXE "WinLAMP.4.0.0-geonode.exe"
!define TOMCAT_ZIP "apache-tomcat-7.0.65-windows-x86.zip"
!define TOMCAT_DIRNAME "apache-tomcat-7.0.65"
!define VC_FOR_PYTHON_MSI "VCForPython27.msi"
!define GDAL_CORE_MSI "gdal-111-1800-core.msi"
!define GDAL_PYTHON_MSI "GDAL-1.11.3.win32-py2.7.msi"
!define GDAL_DLL "gdal111.dll"
!define GEOS_DLL "geos_c.dll"
!define GDAL_HOME "$PROGRAMFILES\GDAL"

; Main Install settings
Name "${APPNAMEANDVERSION}"

# Default install dir
InstallDir "C:\${APPNAME}-${VERSION}"
InstallDirRegKey HKLM "Software\${APPNAME}" ""
OutFile "${APPNAME}-${VERSION}.exe"

######################################################################
; Include File
!include "MUI.nsh"
!include "LogicLib.nsh"
!include "nsDialogs.nsh"
!include "zipdll.nsh"

!include 'FileFunc.nsh'
!insertmacro Locate

!include 'MoveFileFolder.nsh'
!include AddToPath.nsh
######################################################################
; Interface customization
!define MUI_ICON "geonode.ico"
;!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\win-uninstall.ico"
!define MUI_STARTMENUPAGE_REGISTRY_ROOT "HKLM"
!define MUI_STARTMENUPAGE_REGISTRY_KEY "Software\${APPNAME}"
!define MUI_STARTMENUPAGE_REGISTRY_VALUENAME "Start Menu Folder"

!define MUI_WELCOMEPAGE_TEXT "This installer will guide you through the installation of ${APPNAMEANDVERSION}. \r\n\r\n\
Close all other applications before moving on with the setup\r\n\
Click next to continue."

;!define MUI_FINISHPAGE_SHOWREADME ""
!define MUI_FINISHPAGE_LINK "GeoNode Home page"
!define MUI_FINISHPAGE_LINK_LOCATION "http://geonode.org/"

######################################################################
## GLOBAL VARIABLES
######################################################################
Var STARTMENU_FOLDER
Var JavaHome
Var JavaHomeTemp
Var JavaHomeHWND
Var BrowseJavaHWND
Var JavaPathCheck
Var LinkHWND
Var DataDir
Var DataDirTemp
Var DataDirHWND
Var BrowseDataDirHWND
Var DataDirPathCheck
Var IsExisting
Var DefaultDataDir
Var ExistingDataDir
Var JavaHeapMin
Var JavaHeapMax
Var JavaHeapMinHWND
Var JavaHeapMaxHWND
Var GSUser
Var GSPass
Var GSUserHWND
Var GSPassHWND
Var Port
Var PortHWND
Var PythonInstalled
Var PythonHome
Var PythonHomeTemp
Var PythonHomeHWND
Var BrowsePythonHWND
Var PythonPathCheck
Var GDALHome

######################################################################
## MAIN INSTALL CYCLE
######################################################################
!insertmacro MUI_PAGE_WELCOME
Page custom CheckUserType                                     ; Die if not admin
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"                   ; Show license
!insertmacro MUI_PAGE_DIRECTORY                               ; Where to install
!insertmacro MUI_PAGE_STARTMENU Application $STARTMENU_FOLDER ; Start menu location

Page custom JREInstall                                        ; Install JRE 7
Page custom JREInstallMessageBox JRELeave
;Page custom GetJRE                                           ; Look for exisitng JRE
;Page custom JRE JRELeave                                     ; Set the JRE

Page custom GetDataDir                                        ; Look for existing data_dir
Page custom DataDir DataDirLeave                              ; Set the data directory
Page custom JavaMem                                           ; Set the GeoServer JVM Heap Memory
Page custom Creds                                             ; Set admin/password (if new data_dir)
Page custom Port PortLeave                                    ; Set Jetty web server port

Page custom Python27                                          ; Install Python
Page custom Python27MessageBox
;Page custom Python PythonLeave
Page custom GDAL                                              ; Install GDAL

Page custom PostgreSQL                                        ; Install PostgreSQL DB
Page custom PostgreSQLMessageBox

Page custom PostGIS                                           ; Install PostGIS DB spatial extensions
Page custom PostGISMessageBox

Page custom Ready                                             ; Summary page
Page custom Tomcat7

!insertmacro MUI_PAGE_INSTFILES                               ; Actually do the install

# These indented statements modify settings for MUI_PAGE_FINISH
    !define MUI_FINISHPAGE_NOAUTOCLOSE
    ;!define MUI_FINISHPAGE_RUN
    ;!define MUI_FINISHPAGE_RUN_NOTCHECKED
    ;!define MUI_FINISHPAGE_RUN_TEXT "Start a shortcut"
    ;!define MUI_FINISHPAGE_RUN_FUNCTION "LaunchLink"
    ;!define MUI_FINISHPAGE_SHOWREADME_NOTCHECKED
    !define MUI_FINISHPAGE_SHOWREADME $INSTDIR\README.txt
!insertmacro MUI_PAGE_FINISH

; Uninstall Page order
!insertmacro MUI_UNPAGE_CONFIRM   ; Are you sure you wish to uninstall?
!insertmacro MUI_UNPAGE_INSTFILES ; Do the uninstall

; Set languages (first is default language)
!insertmacro MUI_LANGUAGE "English"
!insertmacro MUI_RESERVEFILE_LANGDLL

######################################################################
LangString TEXT_PYTHON27_TITLE ${LANG_ENGLISH} "Python 2.7.10"
LangString TEXT_PYTHON27_SUBTITLE ${LANG_ENGLISH} "Python Installation"
LangString TEXT_TOMCAT_TITLE ${LANG_ENGLISH} "Apache Tomcat 7.0.65"
LangString TEXT_TOMCAT_SUBTITLE ${LANG_ENGLISH} "Apache Tomcat Installation"
LangString TEXT_JRE7_TITLE ${LANG_ENGLISH} "Java Runtime Environment"
LangString TEXT_JRE7_SUBTITLE ${LANG_ENGLISH} "Java Runtime Environment Installation"
LangString TEXT_JRE_TITLE ${LANG_ENGLISH} "Java Runtime Environment"
LangString TEXT_JRE_SUBTITLE ${LANG_ENGLISH} "Java Runtime Environment path selection"
LangString TEXT_LAMP_TITLE ${LANG_ENGLISH} "WinLAMP 4.0.0"
LangString TEXT_LAMP_SUBTITLE ${LANG_ENGLISH} "WinLAMP Installation"
LangString TEXT_PSQL_TITLE ${LANG_ENGLISH} "PostgreSQL 8.4.22"
LangString TEXT_PSQL_SUBTITLE ${LANG_ENGLISH} "PostgreSQL Installation"
LangString TEXT_PGIS_TITLE ${LANG_ENGLISH} "PostGIS 1.5.5"
LangString TEXT_PGIS_SUBTITLE ${LANG_ENGLISH} "PostGIS Installation"
LangString TEXT_DATADIR_TITLE ${LANG_ENGLISH} "GeoServer Data Directory"
LangString TEXT_DATADIR_SUBTITLE ${LANG_ENGLISH} "GeoServer Data Directory path selection"
LangString TEXT_MEM_TITLE ${LANG_ENGLISH} "GeoServer Heap Memory"
LangString TEXT_MEM_SUBTITLE ${LANG_ENGLISH} "Assign Java Virtual Machine Heap Memory to GeoServer"
LangString TEXT_READY_TITLE ${LANG_ENGLISH} "Ready to Install"
LangString TEXT_READY_SUBTITLE ${LANG_ENGLISH} "GeoNode is ready to be installed"
LangString TEXT_CREDS_TITLE ${LANG_ENGLISH} "GeoServer Administrator"
LangString TEXT_CREDS_SUBTITLE ${LANG_ENGLISH} "Set administrator credentials"
LangString TEXT_PORT_TITLE ${LANG_ENGLISH} "GeoServer Web Server Port"
LangString TEXT_PORT_SUBTITLE ${LANG_ENGLISH} "Set the port that GeoServer will respond on"

######################################################################
## INIT
######################################################################
RequestExecutionLevel admin ;Require admin rights on NT6+ (When UAC is turned on)
!include LogicLib.nsh
; Startup tasks
Function .onInit

    Var /GLOBAL switch_overwrite
    StrCpy $switch_overwrite 1
    
	UserInfo::GetAccountType
	pop $0
	${If} $0 != "admin" ;Require admin rights on NT4+
		MessageBox mb_iconstop "Administrator rights required!"
		SetErrorLevel 740 ;ERROR_ELEVATION_REQUIRED
		Quit
	${EndIf}
	
FunctionEnd

######################################################################
# Env Var
######################################################################
Function WriteEnvVar
  Pop $4
  Pop $3
  
  WriteRegExpandStr HKLM "SYSTEM\CurrentControlSet\Control\Session Manager\Environment"  $3 $4
  SendMessage ${HWND_BROADCAST} ${WM_WININICHANGE} 0 "STR:Environment" /TIMEOUT=5000
FunctionEnd

Function DeleteEnvVar
  Pop $4
  
  DeleteRegValue HKLM "SYSTEM\CurrentControlSet\Control\Session Manager\Environment"  $4
  SendMessage ${HWND_BROADCAST} ${WM_WININICHANGE} 0 "STR:Environment" /TIMEOUT=5000
FunctionEnd

Function un.DeleteEnvVar
  Pop $4
  
  DeleteRegValue HKLM "SYSTEM\CurrentControlSet\Control\Session Manager\Environment"  $4
  SendMessage ${HWND_BROADCAST} ${WM_WININICHANGE} 0 "STR:Environment" /TIMEOUT=5000
FunctionEnd

######################################################################
# JRE Installer
######################################################################
Function JREInstall

  !insertmacro MUI_HEADER_TEXT "$(TEXT_JRE7_TITLE)" "$(TEXT_JRE7_SUBTITLE)"

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 64u "You need Java JRE 7 installed on your system.\
                                   $\r$\n$\r$\nThis step will install the Oracle Java JRE 1.7 update 80 32bit\
                                   on your System which is necessary to run GeoServer."
  
  nsDialogs::Show
  ;Call JREInstallMessageBox
  
FunctionEnd

Function JREInstallMessageBox  
  ;MessageBox MB_YESNO "Install Java JRE 7?" /SD IDYES IDNO endJREInstall7
  
  SetOutPath $INSTDIR
  
  File "${JRE_EXE}"
  
  ExecWait '${JRE_EXE} /s INSTALLDIR=$INSTDIR\jre SPONSORS=0 AUTO_UPDATE=0 STATIC=1'
  
  StrCpy $JavaHome "$INSTDIR\jre"
  
  ; write env vars
  Push "JRE_HOME"
  Call DeleteEnvVar
  Push "JAVA_HOME"
  Call DeleteEnvVar
  
  Push "JRE_HOME"
  Push "$JavaHome"
  call WriteEnvVar
  
  endJREInstall7:
	Return
FunctionEnd

######################################################################
# JAVA
######################################################################
; Find the %JAVA_HOME% used on the system, and put the result on the top of the stack
; Will check environment variables and the registry
; Will return an empty string if the path cannot be determined
Function FindJavaPath

  ClearErrors

  ReadEnvStr $1 JAVA_HOME
  IfErrors 0 End ; found in the environment variable

  ; No env var set
  ClearErrors
  ReadRegStr $2 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment" "CurrentVersion"
  ReadRegStr $1 HKLM "SOFTWARE\JavaSoft\Java Runtime Environment\$2" "JavaHome"

  IfErrors 0 End ; or found in the registry  

  StrCpy $1 "" ; not found, zeroing out
  Goto End

  End:
  ; Put the result in the stack
  Push $1
  StrCpy $2 "" ; zero out

FunctionEnd

; Runs before the page is loaded to ensure that the better value (if any) is always reset.
Function GetJRE

    ${If} $JavaHome == ""
      Call FindJavaPath
      Pop $JavaHome
    ${EndIf}

FunctionEnd

; JRE page display
Function JRE

  !insertmacro MUI_HEADER_TEXT "$(TEXT_JRE_TITLE)" "$(TEXT_JRE_SUBTITLE)"

  StrCpy $JavaHomeTemp $JavaHome 

  Call JREPathValidInit
  Pop $8
  ;MessageBox MB_OK "$8"

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 36u "Please select the path to your Java Runtime Environment (JRE).\
                                   $\r$\n$\r$\nIf you don't have a JRE installed, you can use the \
                                   link below to go to Oracle's website to download and install the \
                                   correct JRE for your system."

  ${NSD_CreateLink} 12u 40u 100% 12u "http://www.oracle.com/technetwork/java/javase/downloads/index.html"
  Pop $LinkHWND
  ${NSD_OnClick} $LinkHWND Link

  ${NSD_CreateDirRequest} 0 70u 240u 13u $JavaHomeTemp
  Pop $JavaHomeHWND
  ${NSD_OnChange} $JavaHomeHWND JREPathValid
  Pop $9

  ${NSD_CreateBrowseButton} 242u 70u 50u 13u "Browse..."
  Pop $BrowseJavaHWND
  ${NSD_OnClick} $BrowseJavaHWND BrowseJava

  ${NSD_CreateLabel} 0 86u 100% 12u " "
  Pop $JavaPathCheck

  ${If} $8 == "validJRE"
    ${NSD_SetText} $JavaPathCheck "This path contains a valid JRE"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Turns on
  ${EndIf}
  ${If} $8 == "novalidJRE"
    ${NSD_SetText} $JavaPathCheck "This path does not contain a valid JRE"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Turns off
  ${EndIf}
   
  nsDialogs::Show

FunctionEnd

; When the link is clicked...
Function Link

  Pop $0
  ExecShell "open" "http://www.oracle.com/technetwork/java/javase/downloads/index.html"

FunctionEnd

; Runs when page is initialized
Function JREPathValidInit

    IfFileExists "$JavaHome\bin\java.exe" NoErrors Errors

    NoErrors:
    StrCpy $8 "validJRE"
    Goto End

    Errors:
    StrCpy $8 "novalidJRE"
    
    End:
    Push $8

FunctionEnd

; Runs in real time
Function JREPathValid

  Pop $8
  ${NSD_GetText} $8 $JavaHomeTemp

  IfFileExists "$JavaHomeTemp\bin\java.exe" NoErrors Errors

  NoErrors:
    ${NSD_SetText} $JavaPathCheck "This path contains a valid JRE"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Enable
  Goto End

  Errors:
    ${NSD_SetText} $JavaPathCheck "This path does not contain a valid JRE"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable

  End:
    StrCpy $8 ""
    ClearErrors

FunctionEnd

; Brings up folder dialog
Function BrowseJava

  nsDialogs::SelectFolderDialog "Please select the location of your JRE..." $PROGRAMFILES
  Pop $1
  ${NSD_SetText} $JavaHomeHWND $1
    
FunctionEnd

; When done, set variable permanently
Function JRELeave

  StrCpy $JavaHome $JavaHomeTemp

FunctionEnd

;Function InstallJRE
;FunctionEnd

######################################################################
# Python
######################################################################
Function Python27
 !insertmacro MUI_HEADER_TEXT "$(TEXT_PYTHON27_TITLE)" "$(TEXT_PYTHON27_SUBTITLE)"
 
  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 64u "You need Python installed on your system.\
                                   $\r$\n$\r$\nThis step will install Python 2.7.10 32bit \
                                   on your system."
  
  nsDialogs::Show
  ;Call Python27MessageBox
  
FunctionEnd

Function Python27MessageBox
  ;MessageBox MB_YESNO "Install Python 2.7.10?" /SD IDYES IDNO endPython27
  
  SetOutPath $INSTDIR
  
  File "${PYTHON27_MSI}"

  ExecWait '"msiexec" /i "$INSTDIR\${PYTHON27_MSI}" /passive TARGETDIR="$INSTDIR\Python27"'
  
  StrCpy $PythonInstalled 0
  StrCpy $PythonHome "$INSTDIR\Python27"
  StrCpy $GDALHome "${GDAL_HOME}"
  
  ; write env vars
  Push "GEONODE_PATHEXT"
  Push "$PythonHome;$PythonHome\Scripts;$GDALHome"
  call WriteEnvVar
  
  ReadEnvStr $R0 "PATH"
  Push "PATH"
  Push "%GEONODE_PATHEXT%;$R0"
  call WriteEnvVar
    
  ; Call Python
  Goto End
  
  endPython27:
	StrCpy $PythonInstalled 1
	Call Python
	
  End:
	Return
	
FunctionEnd

######################################################################
## Python Home Folder
######################################################################
; Python page display
Function Python

  !insertmacro MUI_HEADER_TEXT "$(TEXT_PYTHON27_TITLE)" "$(TEXT_PYTHON27_SUBTITLE)"
  
  StrCpy $PythonHome "$INSTDIR\Python27"
  StrCpy $PythonHomeTemp $PythonHome 

  Call PythonPathValidInit
  Pop $8
  ;MessageBox MB_OK "$8"

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 36u "Please select the path to your Python environment."

  ${NSD_CreateDirRequest} 0 70u 240u 13u $PythonHomeTemp
  Pop $PythonHomeHWND
  ${NSD_OnChange} $PythonHomeHWND PythonPathValid
  Pop $9

  ${NSD_CreateBrowseButton} 242u 70u 50u 13u "Browse..."
  Pop $BrowsePythonHWND
  ${NSD_OnClick} $BrowsePythonHWND BrowsePython

  ${NSD_CreateLabel} 0 86u 100% 12u " "
  Pop $PythonPathCheck

  ${If} $8 == "validPython"
    ${NSD_SetText} $PythonPathCheck "This path contains a valid Python Setup"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Turns on
  ${EndIf}
  ${If} $8 == "novalidPython"
    ${NSD_SetText} $PythonPathCheck "This path does not contain a valid Python Setup"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Turns off
  ${EndIf}
   
  nsDialogs::Show

FunctionEnd

; Runs when page is initialized
Function PythonPathValidInit

    IfFileExists "$PythonHome\pythonw.exe" NoErrors Errors

    NoErrors:
    StrCpy $8 "validPython"
    Goto End

    Errors:
    StrCpy $8 "novalidPython"
    
    End:
    Push $8

FunctionEnd

; Runs in real time
Function PythonPathValid

  Pop $8
  ${NSD_GetText} $8 $PythonHomeTemp

  IfFileExists "$PythonHomeTemp\pythonw.exe" NoErrors Errors

  NoErrors:
    ${NSD_SetText} $PythonPathCheck "This path contains a valid Python Setup"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Enable
  Goto End

  Errors:
    ${NSD_SetText} $PythonPathCheck "This path does not contain a valid Python Setup"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable

  End:
    StrCpy $8 ""
    ClearErrors

FunctionEnd

; Brings up folder dialog
Function BrowsePython

  nsDialogs::SelectFolderDialog "Please select the location of your Python Setup..." $PROGRAMFILES
  Pop $1
  ${NSD_SetText} $PythonHomeHWND $1
    
FunctionEnd

; When done, set variable permanently
Function PythonLeave

  ${If} $PythonHome == ""
    Goto End
  ${Else}
    Push "GEONODE_PATHEXT"
    Push "$PythonHome;$PythonHome\Scripts;$GDALHome"
	call WriteEnvVar
    
	ReadEnvStr $R0 "PATH"
	Push "PATH"
    Push "%GEONODE_PATHEXT%;$R0"
	call WriteEnvVar
    
    ; update system path
    ;Push "$INSTDIR\Apache2\bin;$PythonHome;$PythonHome\Scripts;$GDALHome"
    ;Call AddToPath
  ${EndIf}
  
  End:
	Return
	
FunctionEnd

;Function InstallPython
;FunctionEnd

######################################################################
# PostgreSQL DB + PostGIS
######################################################################
Function PostgreSQL

  !insertmacro MUI_HEADER_TEXT "$(TEXT_PSQL_TITLE)" "$(TEXT_PSQL_SUBTITLE)"

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 64u "You need PostgreSQL with PostGIS DB installed on your system.\
                                   $\r$\n$\r$\n$\r$\n$\r$\nThis step will install PostgreSQL 8.4.22 \
                                   on your system."
  
  nsDialogs::Show
  #Call PostgreSQLMessageBox
  
FunctionEnd

Function PostgreSQLMessageBox

  #MessageBox MB_YESNO "Install PostgreSQL 8.4.22?" /SD IDYES IDNO endPSQL324
  
  File "${POSTGRESQL_EXE}"
  ExecWait '${POSTGRESQL_EXE} --mode unattended --unattendedmodeui minimal \
   --prefix "$INSTDIR\postgres" --datadir "$INSTDIR\postgres\data" \ 
   --install_runtimes 1 --install_plpgsql 1 --create_shortcuts 1'
  endPSQL324:

  ;pg_hba security conf file
  Delete "$INSTDIR\postgres\data\pg_hba.conf"
  FileOpen $R8 "$INSTDIR\postgres\data\pg_hba.conf" w
  FileWrite $R8 "# TYPE  DATABASE    USER        CIDR-ADDRESS          METHOD$\r$\n"
  FileWrite $R8 "# IPv4 local connections:$\r$\n"
  FileWrite $R8 "host    all         all         127.0.0.1/32          trust$\r$\n"
  FileWrite $R8 "# IPv6 local connections:$\r$\n"
  FileWrite $R8 "host    all         all         ::1/128               trust$\r$\n"
  FileClose $R8
  
  SimpleSC::RestartService "postgresql-8.4"
FunctionEnd

Function PostGIS

  !insertmacro MUI_HEADER_TEXT "$(TEXT_PGIS_TITLE)" "$(TEXT_PGIS_SUBTITLE)"

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 64u "PostGIS is necessary for the system to work and must be installed before DB initialization.\
                                   $\r$\n$\r$\n$\r$\n$\r$\nThis step will install PostGIS 1.5.4 \
                                   on your system."
  
  nsDialogs::Show
  #Call PostGISMessageBox
  
FunctionEnd

Function PostGISMessageBox

  #MessageBox MB_YESNO "Install PostGIS 1.5.4?" /SD IDYES IDNO endPGIS324
  
	File "${POSTGIS_EXE}"
	ExecWait '${POSTGIS_EXE} /USERNAME=postgres /PASSWORD=postgres /DATABASE=template_postgis /O /D=$INSTDIR\postgres'

  	; By setting the output path to the temporary directory, we force NSIS to make the directory exist. This makes debugging the installer so much easier! Note that the file list in inputfile.nsh overrides this value anyway...
	SetOutPath "${TEMPDIR}"

	; Set the shell context
	SetShellVarContext all

	; Checks whether installation folder is the PostgreSQL installation folder
	IfFileExists "$INSTDIR\postgres\bin\postgres.exe" postgres_available
	MessageBox MB_OK|MB_ICONSTOP "Could not recognize PostgreSQL installation."
	Abort "Could not recognize PostgreSQL installation."

	postgres_available:		
		FileOpen $2 "${TEMPDIR}\create_base_db.bat" "w"
		FileWrite $2 "set PGPASSWORD=postgres$\r$\n"
		FileWrite $2 "set PGPORT=5432$\r$\n"
		FileWrite $2 '"$INSTDIR\postgres\bin\dropdb.exe" -U postgres geonode$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\dropdb.exe" -U postgres geonode_imports$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\dropuser.exe" -U postgres geonode$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\createuser.exe" -U postgres -d -l -S -R -w geonode$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\createdb.exe" -U postgres -O geonode geonode$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\createdb.exe" -U postgres -O geonode geonode_imports$\r$\n'
        FileWrite $2 "$\"$INSTDIR\postgres\bin\psql.exe$\" -U postgres -d geonode_imports -c $\"ALTER USER geonode WITH PASSWORD 'geonode';$\"$\r$\n"
        ;FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -d geonode_imports -c "create extension postgis;"$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\createlang.exe" -U postgres plpgsql geonode_imports$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -c "UPDATE pg_database SET datistemplate=true WHERE datname=$\'geonode_imports$\'" geonode_imports$\r$\n'
		FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -f "$INSTDIR\postgres\share\contrib\postgis-1.5\postgis.sql" -d geonode_imports --set ON_ERROR_STOP=1$\r$\n'
		FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -f "$INSTDIR\postgres\share\contrib\postgis-1.5\spatial_ref_sys.sql" -d geonode_imports --set ON_ERROR_STOP=1$\r$\n'
		FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -f "$INSTDIR\postgres\share\contrib\postgis-1.5\postgis_comments.sql" -d geonode_imports --set ON_ERROR_STOP=1$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -d geonode_imports -c "grant all on geometry_columns to public;"$\r$\n'
        FileWrite $2 '"$INSTDIR\postgres\bin\psql.exe" -U postgres -d geonode_imports -c "grant all on geography_columns to public;"$\r$\n'
		FileClose $2

		; Execute create_postgis_db.bat
		DetailPrint "Creating template database..."
		ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_base_db.bat"'
		Pop $R9

	endPGIS324:
		Return
			
FunctionEnd

######################################################################
# GEOSERVER_DATA_DIR
######################################################################
; Find the %GEOSERVER_DATA_DIR% used on the system, and put the result on the top of the stack
Function FindDataDirPath

  ClearErrors
  ReadEnvStr $1 GEOSERVER_DATA_DIR
  IfFileExists $1 NoErrors Errors

  NoErrors:
    ClearErrors
    StrCpy $IsExisting 1
    Goto End

  Errors:
    ClearErrors
    StrCpy $1 "" ; not found
    StrCpy $IsExisting 0
    Goto End

  End:
    ClearErrors
    Push $1

FunctionEnd

; Runs before the page is loaded to ensure that the better value (if any) is always reset
Function GetDataDir

  ${If} $DataDir == ""
    Call FindDataDirPath
    Pop $DataDir
  ${EndIf}

FunctionEnd

; Data_dir page display
Function DataDir
	
  !insertmacro MUI_HEADER_TEXT "$(TEXT_DATADIR_TITLE)" "$(TEXT_DATADIR_SUBTITLE)"

  StrCpy $DataDirTemp $DataDir

  Call DataDirPathValidInit
  Pop $8

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 24u "If you have an existing data directory, please select its path.  \
                                   Otherwise, the default data directory will be used."

  ${NSD_CreateRadioButton} 10u 36u 10u 10u
  Pop $DefaultDataDir

  ${NSD_CreateLabel} 25u 37u 250u 24u "Default data directory. Will be located at: \
                                       $\r$\n$INSTDIR\data"

  ${NSD_CreateRadioButton} 10u 80u 10u 10u
  Pop $ExistingDataDir

  ${NSD_CreateLabel} 25u 81u 250u 12u "Existing data directory:"

  ${NSD_CreateDirRequest} 25u 94u 215u 13u $DataDirTemp
  Pop $DataDirHWND
  ${NSD_OnChange} $DataDirHWND DataDirPathValid
  Pop $9

  ${NSD_CreateBrowseButton} 242u 94u 50u 13u "Browse..."
  Pop $BrowseDataDirHWND
  ${NSD_OnClick} $BrowseDataDirHWND BrowseDataDir

  ${NSD_CreateLabel} 26u 108u 100% 12u " "
  Pop $DataDirPathCheck

  ${If} $8 == "validDataDir"
    ${NSD_SetText} $DataDirPathCheck "This path contains a valid data directory"
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Turns on
  ${EndIf}
  ${If} $8 == "novalidDataDir"
    ${If} $IsExisting == 1  ; Dont' turn off unless the radio box is checked!
      ${NSD_SetText} $DataDirPathCheck "This path does not contain a valid data directory"
      GetDlgItem $0 $HWNDPARENT 1 ; Next
      EnableWindow $0 0 ; Turns off
    ${EndIf}
  ${EndIf}

  ; default check box
  ${If} $IsExisting == 1
    ${NSD_Check} $ExistingDataDir
  ${Else}
    ${NSD_Check} $DefaultDataDir
  ${EndIf}

  ${NSD_OnClick} $ExistingDataDir CheckBoxDataDirExisting
  ${NSD_OnClick} $DefaultDataDir CheckBoxDataDirDefault
   
  nsDialogs::Show

	
FunctionEnd

; Runs when page is initialized
Function DataDirPathValidInit

    IfFileExists "$DataDir\global.xml" NoErrors 0 ; 2.0 datadir
    IfFileExists "$DataDir\catalog.xml" NoErrors Errors ; 1.7 datadir

    NoErrors:
    StrCpy $8 "validDataDir"
    Goto End

    Errors:
    StrCpy $8 "novalidDataDir"
    
    End:
    Push $8

FunctionEnd

; Runs in real time
Function DataDirPathValid

    Pop $8
    ${NSD_GetText} $8 $DataDirTemp

    IfFileExists "$DataDirTemp\global.xml" NoErrors 0 ; 2.0 datadir
    IfFileExists "$DataDirTemp\catalog.xml" NoErrors Errors ; 1.7 datadir

    NoErrors:
      ${NSD_SetText} $DataDirPathCheck "This path contains a valid data directory"
      GetDlgItem $0 $HWNDPARENT 1 ; Next
      EnableWindow $0 1 ; Enable
      Goto End

    Errors:
      ${NSD_SetText} $DataDirPathCheck "This path does not contain a valid data directory"
      GetDlgItem $0 $HWNDPARENT 1 ; Next
      EnableWindow $0 0 ; Disable

    End:
      StrCpy $8 ""
      ClearErrors

FunctionEnd

; When Existing check box is checked
Function CheckBoxDataDirExisting

  ${NSD_GetText} $DataDirHWND $DataDirTemp
  IfFileExists "$DataDirTemp\*.xml" NoErrors Errors

  NoErrors:
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Enable
    Goto End

  Errors:
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable

  End:
    ClearErrors
    StrCpy $IsExisting 1

FunctionEnd

; When Default check box is checked
Function CheckBoxDataDirDefault

  GetDlgItem $0 $HWNDPARENT 1 ; Next
  EnableWindow $0 1 ; Turns on
  StrCpy $IsExisting 0

FunctionEnd

; Brings up folder dialog
Function BrowseDataDir

  nsDialogs::SelectFolderDialog "Please select the location of your data directory..." $PROGRAMFILES
  Pop $1

  ${If} $1 != "error" ; i.e. didn't hit cancel
    ${NSD_SetText} $DataDirHWND $1 ; populate the field
    ${NSD_Check} $ExistingDataDir ; change the check box
    ${NSD_UnCheck} $DefaultDataDir ; change the check box
    StrCpy $IsExisting 1 ; now using existing datadir
  ${EndIf}  

FunctionEnd

; When done, set variable permanently
Function DataDirLeave

  ${If} $IsExisting == 0 ; use the default
    ; StrCpy $DataDir "$INSTDIR\data_dir"
    StrCpy $DataDir "$INSTDIR\data"
  ${ElseIf} $IsExisting == 1
    StrCpy $DataDir $DataDirTemp
  ${EndIf}

FunctionEnd

Function JavaMem

  !insertmacro MUI_HEADER_TEXT "$(TEXT_MEM_TITLE)" "$(TEXT_MEM_SUBTITLE)"

  nsDialogs::Create 1018

  ; Populates defaults on first display, and resets to default user blanked any of the values
  StrCmp $JavaHeapMin "" 0 +3
    StrCpy $JavaHeapMin "256"
    StrCpy $JavaHeapMax "1024"
  StrCmp $JavaHeapMax "" 0 +3
    StrCpy $JavaHeapMin "256"
    StrCpy $JavaHeapMax "1024"

  ;Syntax: ${NSD_*} x y width height text
  ${NSD_CreateLabel} 0 0 100% 36u "Set the Java Virtual Machine Heap memory for GeoServer. \
                                   Default values usually work; tune them accordingly to the available physical memory!"

  ${NSD_CreateLabel} 20u 40u 40u 14u "JVM Min Heap"  
  ${NSD_CreateNumber} 70u 38u 50u 14u $JavaHeapMin
  Pop $JavaHeapMinHWND
  ${NSD_OnChange} $JavaHeapMinHWND JavaHeapCheck

  ${NSD_CreateLabel} 20u 60u 40u 14u "JVM Max Heap" 
  ${NSD_CreateNumber} 70u 58u 50u 14u $JavaHeapMax
  Pop $JavaHeapMaxHWND
  ${NSD_OnChange} $JavaHeapMaxHWND JavaHeapCheck
   
  nsDialogs::Show
  
FunctionEnd

; When JavaHeap value is changed (realtime)
Function JavaHeapCheck

  ; Check for illegal values of $JavaHeap and fix immediately
  ${NSD_GetText} $JavaHeapMinHWND $JavaHeapMin
  ${NSD_GetText} $JavaHeapMaxHWND $JavaHeapMax
  
  StrCmp $JavaHeapMin "" NoContinue Continue
  
  NoContinue:
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable
    Goto End
  Continue:
      StrCmp $JavaHeapMax "" +3 0 ; must make sure neither is blank
        GetDlgItem $0 $HWNDPARENT 1 ; Next
        EnableWindow $0 1 ; Enable
  End:

FunctionEnd

; Will build a page to input default GS admin creds
Function Creds

  StrCmp $IsExisting 1 SkipCreds
  
  !insertmacro MUI_HEADER_TEXT "$(TEXT_CREDS_TITLE)" "$(TEXT_CREDS_SUBTITLE)"
  nsDialogs::Create 1018

  ; Populates defaults on first display, and resets to default user blanked any of the values
  StrCmp $GSUser "" 0 +3
    StrCpy $GSUser "admin"
    StrCpy $GSPass "geoserver"
  StrCmp $GSPass "" 0 +3
    StrCpy $GSUser "admin"
    StrCpy $GSPass "geoserver"

  ;Syntax: ${NSD_*} x y width height text
  ${NSD_CreateLabel} 0 0 100% 36u "Set the username and password for administration of GeoServer."

  ${NSD_CreateLabel} 20u 40u 40u 14u "Username"  
  ${NSD_CreateText} 70u 38u 50u 14u $GSUser
  Pop $GSUserHWND
  ${NSD_OnChange} $GSUserHWND UsernameCheck

  ${NSD_CreateLabel} 20u 60u 40u 14u "Password" 
  ${NSD_CreateText} 70u 58u 50u 14u $GSPass
  Pop $GSPassHWND
  ${NSD_OnChange} $GSPassHWND PasswordCheck

  nsDialogs::Show

  SkipCreds: ; if data dir exists, we wouldn't want to change creds
   
FunctionEnd

; When username value is changed (realtime)
Function UsernameCheck

  ; Check for illegal values of $GSUser and fix immediately
  ${NSD_GetText} $GSUserHWND $GSUser
  StrCmp $GSUser "" NoContinue Continue

  NoContinue:
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable
    Goto End
  Continue:
  StrCmp $GSPass "" +3 0 ; must make sure neither is blank
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Enable
  End:


FunctionEnd

; When password value is changed (realtime)
Function PasswordCheck

  ; Check for illegal values of $GSPass and fix immediately
  ${NSD_GetText} $GSPassHWND $GSPass
  StrCmp $GSPass "" NoContinue Continue

  NoContinue:
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable
    Goto End
  Continue:
  StrCmp $GSUser "" +3 0 ; must make sure neither is blank
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Enable
  End:

FunctionEnd

; Set the web server port
Function Port

  !insertmacro MUI_HEADER_TEXT "$(TEXT_PORT_TITLE)" "$(TEXT_PORT_SUBTITLE)"
  nsDialogs::Create 1018

  ; Populates defaults on first display, and resets to default user blanked any of the values
  StrCmp $Port "" 0 +2
    StrCpy $Port "8080"

  ;Syntax: ${NSD_*} x y width height text
  ${NSD_CreateLabel} 0 0 100% 36u "Set the web server port that GeoServer will respond on."

  ${NSD_CreateLabel} 20u 40u 20u 14u "Port"  
  ${NSD_CreateNumber} 50u 38u 50u 14u $Port
  Pop $PortHWND
  ${NSD_OnChange} $PortHWND PortCheck

  ${NSD_CreateLabel} 110u 40u 120u 14u "Valid range is 1024-65535 and different from 8000." 

  nsDialogs::Show

FunctionEnd

; When port value is changed (realtime)
Function PortCheck

  ; Check for illegal values of $Port and fix immediately

  ${NSD_GetText} $PortHWND $Port
  
  ${If} $Port == 8000       ; Must be different from GeoNode one
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable
    Goto End
  ${EndIf}
  
  ; Check for illegal values of $Port
  ${If} $Port < 1024        ; Too low
  ${OrIf} $Port > 65535     ; Too high
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 0 ; Disable
    Goto End
  ${Else}
    GetDlgItem $0 $HWNDPARENT 1 ; Next
    EnableWindow $0 1 ; Enable
    Goto End
  ${EndIf}

  End:
  
FunctionEnd

Function PortLeave

  ; Check for illegal values of $GSPass and fix immediately
  ${NSD_GetText} $PortHWND $Port
  StrCmp $Port "" NoPort End

  NoPort:
    StrCpy $Port "8080"
    Goto End
  End:
  
FunctionEnd

######################################################################
# WinLAMP
######################################################################
Function WinLAMP

  !insertmacro MUI_HEADER_TEXT "$(TEXT_LAMP_TITLE)" "$(TEXT_LAMP_SUBTITLE)"

  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 64u "You need Apache HTTPD and PHP installed on your system.\
                                   $\r$\n$\r$\nThis step will install Apache2 HTTPD Server 2.4 with WSGI \
                                   Python module 32bit as Service on your system."
  
  nsDialogs::Show
  Call WinLAMPMessageBox
  
FunctionEnd

Function WinLAMPMessageBox
  ;MessageBox MB_YESNO "Install WinLAMP 4.0.0?" /SD IDYES IDNO endWinLAMP400
  
  SetOutPath $INSTDIR

  File "${WINLAMP_EXE}"

  ExecWait "${WINLAMP_EXE} -GEOSERVER-PORT=$Port -GEONODE-FOLDER=$\"$INSTDIR\${GEONODE_FOLDER}$\" /D=$INSTDIR"
  
  endWinLAMP400:
    Return
  ; SimpleSC::RestartService "Apache2"
FunctionEnd

######################################################################
# Tomcat7
######################################################################
Function Tomcat7
 !insertmacro MUI_HEADER_TEXT "$(TEXT_TOMCAT_TITLE)" "$(TEXT_TOMCAT_SUBTITLE)"
 
  nsDialogs::Create 1018
  ; ${NSD_Create*} x y width height text

  ${NSD_CreateLabel} 0 0 100% 64u "You need Tomcat to run GeoServer.\
                                   $\r$\n$\r$\nThis step will install Apache Tomcat7 \
                                   as Service on your system."
  
  nsDialogs::Show
  
  Call Tomcat7MessageBox
FunctionEnd

Function Tomcat7MessageBox
  ;MessageBox MB_YESNO "Install Tomcat7?" /SD IDYES IDNO endTomcat7
  
  ExecWait '$INSTDIR\${TOMCAT_DIRNAME}\bin\tomcat7.exe //DS//Tomcat7' ; remove apache tomcat service
  ExecWait '$SYSDIR\sc delete "Tomcat7"' ; remove tomcat service
    
  SetOutPath $INSTDIR
  
  File ${TOMCAT_ZIP}
  
  ZipDLL::extractall "${TOMCAT_ZIP}" ""
  
  File ${GEOSERVER_DATA_ZIP}
  
  ZipDLL::extractall "${GEOSERVER_DATA_ZIP}" ""
  
  ; !insertmacro MoveFolder "$INSTDIR\data\" "$DataDir" "*.*"
  
  SetOutPath "$INSTDIR\${TOMCAT_DIRNAME}\webapps"
  
  File "geoserver.war"
  
  AccessControl::GrantOnFile \
	"$INSTDIR\${TOMCAT_DIRNAME}" "(S-1-5-32-545)" "FullAccess"
  
  SetOutPath "$INSTDIR"
  
  endTomcat7:
	Return
FunctionEnd

######################################################################
# GDAL
######################################################################
Function GDAL
  ;MessageBox MB_YESNO "Install GDAL?" /SD IDYES IDNO endGDAL

  SetOutPath $INSTDIR

  ; Visual C++ compiler for python27
  File "${VC_FOR_PYTHON_MSI}"
  ExecWait '"msiexec" /i "$INSTDIR\${VC_FOR_PYTHON_MSI}" /passive TARGETDIR="$INSTDIR\Python27"'
  
  ; GDAL core
  File "${GDAL_CORE_MSI}"
  ExecWait '"msiexec" /i "$INSTDIR\${GDAL_CORE_MSI}" /passive TARGETDIR="$INSTDIR\GDAL"'

  ; set Env Var GDAL_LIBRARY_PATH
  Push "GDAL_HOME"
  Push "${GDAL_HOME}"
  call WriteEnvVar
  
  ; set Env Var GDAL_LIBRARY_PATH
  Push "GDAL_LIBRARY_PATH"
  Push "${GDAL_HOME}\gdal111.dll"
  call WriteEnvVar
  
  ; set Env Var GEOS_LIBRARY_PATH
  Push "GEOS_LIBRARY_PATH"
  Push "${GDAL_HOME}\geos_c.dll"
  call WriteEnvVar
    
  ; GDAL Python Bindings
  File "${GDAL_PYTHON_MSI}"
  ExecWait '"msiexec" /i "$INSTDIR\${GDAL_PYTHON_MSI}" /passive TARGETDIR="$INSTDIR\Python27"'
 
  endGDAL:
	Return
FunctionEnd

######################################################################
# User Type
######################################################################
; Check the user type, and quit if it's not an administrator.
; Taken from Examples/UserInfo that ships with NSIS.
Function CheckUserType
  ClearErrors
  UserInfo::GetName
  IfErrors Win9x
  Pop $0
  UserInfo::GetAccountType
  Pop $1
  StrCmp $1 "Admin" Admin NoAdmin

  NoAdmin:
    MessageBox MB_ICONSTOP "Sorry, you must have administrative rights in order to install GeoServer."
    Quit

  Win9x:
    MessageBox MB_ICONSTOP "This installer is not supported on Windows 9x/ME."
    Quit
		
  Admin:
  StrCpy $1 "" ; zero out variable
	
FunctionEnd

######################################################################
# Summary Page
######################################################################
; Summary page before install
Function Ready

  nsDialogs::Create 1018
  !insertmacro MUI_HEADER_TEXT "$(TEXT_READY_TITLE)" "$(TEXT_READY_SUBTITLE)"

  ;Syntax: ${NSD_*} x y width height text
  ${NSD_CreateLabel} 0 0 100% 24u "Please review the settings below and click the Back button if \
                                   changes need to be made.  Click the Install button to continue."

  ; Directory
  ${NSD_CreateLabel} 10u 25u 35% 24u "Installation directory:"
  ${NSD_CreateLabel} 40% 25u 60% 24u "$INSTDIR"
 
  ; JRE
  ${NSD_CreateLabel} 10u 45u 35% 24u "Java Runtime Environment:"
  ${NSD_CreateLabel} 40% 45u 60% 24u "$JavaHome"

  ; JVM Heap
  ${NSD_CreateLabel} 10u 65u 35% 24u "Java Heap Memory:"
  ${NSD_CreateLabel} 40% 65u 60% 24u "$JavaHeapMin / $JavaHeapMax"
  
  ; Data dir
  ${NSD_CreateLabel} 10u 85u 35% 24u "Data Directory:"
  ${If} $IsExisting == 1
    ${NSD_CreateLabel} 40% 85u 60% 24u "Using existing data directory:$\r$\n$DataDir"
  ${Else}
    ${NSD_CreateLabel} 40% 85u 60% 24u "Using default data directory:$\r$\n$DataDir"
  ${EndIf}

  ; Creds
  ${If} $IsExisting == 1
    ${NSD_CreateLabel} 10u 112u 35% 24u "Port:"
    ${NSD_CreateLabel} 40% 112u 60% 24u "$Port"
  ${Else}
    ${NSD_CreateLabel} 10u 112u 35% 24u "Username / Password / Port:"
    ${NSD_CreateLabel} 40% 112u 60% 24u "$GSUser / $GSPass / $Port"
  ${EndIf}

  nsDialogs::Show

FunctionEnd

######################################################################
# MAIN SECTION
######################################################################
; The main install section
Section "Main" SectionMain
  SectionIn RO ; Makes this install mandatory
  SetOverwrite on

  MessageBox MB_YESNO "Proceed with ${APPNAMEANDVERSION} Installation?" /SD IDYES IDNO endInstall
  
  SetOutPath $INSTDIR
  
  File geonode.ico
  File geonode_white.ico
  File gs.ico
  File maintenance.ico
  
  File LICENSE.txt
  File README.txt
  
  File "${GEONODE_ZIP}"
  
  ZipDLL::extractall "${GEONODE_ZIP}" ""
	
  ; Run virtualenv setup script
	SetOutPath $INSTDIR\${GEONODE_FOLDER}
	
    ; Copy whl files
    File python_deps\*.whl
	File python_deps\*.tar.gz
    
    ; Copy startup script
    File startup.bat
    File startup_geoserver.bat
    File shutdown_geoserver.bat
	
  ; -------------------------------------  GEONODE LOCAL SETTINGS
    Delete "geonode\local_settings.py"
    FileOpen $9 geonode\local_settings.py w ; Opens a Empty File and fills it  

    # Development DB
	;FileWrite $9 'import os$\r$\n'
	;FileWrite $9 '$\r$\n'
	;FileWrite $9 'PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))$\r$\n'
	;FileWrite $9 '$\r$\n'
	;FileWrite $9 'SITEURL = "http://localhost:8000/"$\r$\n'
	;FileWrite $9 '$\r$\n'
	;FileWrite $9 'DATABASES = {$\r$\n'
	;FileWrite $9 '    "default": {$\r$\n'
	;FileWrite $9 '        "ENGINE": "django.db.backends.sqlite3",$\r$\n'
	;FileWrite $9 '        "NAME": os.path.join(PROJECT_ROOT, "development.db"),$\r$\n'
	;FileWrite $9 '    },$\r$\n'
	;FileWrite $9 '    # vector datastore for uploads$\r$\n'
	;FileWrite $9 '    # "datastore" : {$\r$\n'
	;FileWrite $9 '    #    "ENGINE": "django.contrib.gis.db.backends.postgis",$\r$\n'
	;FileWrite $9 '    #    "NAME": "",$\r$\n'
	;FileWrite $9 '    #    "USER" : "",$\r$\n'
	;FileWrite $9 '    #    "PASSWORD" : "",$\r$\n'
	;FileWrite $9 '    #    "HOST" : "",$\r$\n'
	;FileWrite $9 '    #    "PORT" : "",$\r$\n'
	;FileWrite $9 '    # }$\r$\n'
	;FileWrite $9 '}$\r$\n'
	;FileWrite $9 '$\r$\n'
	;FileWrite $9 '# OGC (WMS/WFS/WCS) Server Settings$\r$\n'
	;FileWrite $9 '# OGC (WMS/WFS/WCS) Server Settings$\r$\n'
	;FileWrite $9 'OGC_SERVER = {$\r$\n'
	;FileWrite $9 '    "default": {$\r$\n'
	;FileWrite $9 '        "BACKEND": "geonode.geoserver",$\r$\n'
	;FileWrite $9 '        "LOCATION": "http://localhost:$Port/geoserver/",$\r$\n'
	;FileWrite $9 '        "PUBLIC_LOCATION": "http://localhost/geoserver/",$\r$\n'
	;FileWrite $9 '        "USER": "$GSUser",$\r$\n'
	;FileWrite $9 '        "PASSWORD": "$GSPass",$\r$\n'
	;FileWrite $9 '        "MAPFISH_PRINT_ENABLED": True,$\r$\n'
	;FileWrite $9 '        "PRINT_NG_ENABLED": True,$\r$\n'
	;FileWrite $9 '        "GEONODE_SECURITY_ENABLED": True,$\r$\n'
	;FileWrite $9 '        "GEOGIG_ENABLED": False,$\r$\n'
	;FileWrite $9 '        "WMST_ENABLED": False,$\r$\n'
	;FileWrite $9 '        "BACKEND_WRITE_ENABLED": True,$\r$\n'
	;FileWrite $9 '        "WPS_ENABLED": False,$\r$\n'
	;FileWrite $9 '        "LOG_FILE": "%s/geoserver/data/logs/geoserver.log" % os.path.abspath(os.path.join(PROJECT_ROOT, os.pardir)),$\r$\n'
	;FileWrite $9 '        # Set to name of database in DATABASES dictionary to enable$\r$\n'
	;FileWrite $9 '        "DATASTORE": "",  # "datastore",$\r$\n'
	;FileWrite $9 '        "TIMEOUT": 10  # number of seconds to allow for HTTP requests$\r$\n'
	;FileWrite $9 '    }$\r$\n'
	;FileWrite $9 '}$\r$\n'
    
    # Production DB
    FileWrite $9 'import os$\r$\n'
	FileWrite $9 '$\r$\n'
	FileWrite $9 'PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))$\r$\n'
	FileWrite $9 '$\r$\n'
	FileWrite $9 'SITEURL = "http://localhost:8000/"$\r$\n'
	FileWrite $9 '$\r$\n'
	FileWrite $9 'DATABASES = {$\r$\n'
	FileWrite $9 '    "default": {$\r$\n'
	FileWrite $9 '        "ENGINE": "django.db.backends.postgresql_psycopg2",$\r$\n'
	FileWrite $9 '        "NAME": "geonode",$\r$\n'
	FileWrite $9 '        "USER": "geonode",$\r$\n'
	FileWrite $9 '        "PASSWORD": "geonode",$\r$\n'
	FileWrite $9 '    },$\r$\n'
	FileWrite $9 '    # vector datastore for uploads$\r$\n'
	FileWrite $9 '    "datastore" : {$\r$\n'
	FileWrite $9 '       "ENGINE": "django.contrib.gis.db.backends.postgis",$\r$\n'
	FileWrite $9 '       "NAME": "geonode_imports",$\r$\n'
	FileWrite $9 '       "USER" : "geonode",$\r$\n'
	FileWrite $9 '       "PASSWORD" : "geonode",$\r$\n'
	FileWrite $9 '       "HOST" : "localhost",$\r$\n'
	FileWrite $9 '       "PORT" : "5432",$\r$\n'
	FileWrite $9 '    }$\r$\n'
	FileWrite $9 '}$\r$\n'
	FileWrite $9 '$\r$\n'
	FileWrite $9 '# OGC (WMS/WFS/WCS) Server Settings$\r$\n'
	FileWrite $9 '# OGC (WMS/WFS/WCS) Server Settings$\r$\n'
	FileWrite $9 'OGC_SERVER = {$\r$\n'
	FileWrite $9 '    "default": {$\r$\n'
	FileWrite $9 '        "BACKEND": "geonode.geoserver",$\r$\n'
	FileWrite $9 '        "LOCATION": "http://localhost:$Port/geoserver/",$\r$\n'
	FileWrite $9 '        "PUBLIC_LOCATION": "http://localhost/geoserver/",$\r$\n'
	FileWrite $9 '        "USER": "$GSUser",$\r$\n'
	FileWrite $9 '        "PASSWORD": "$GSPass",$\r$\n'
	FileWrite $9 '        "MAPFISH_PRINT_ENABLED": True,$\r$\n'
	FileWrite $9 '        "PRINT_NG_ENABLED": True,$\r$\n'
	FileWrite $9 '        "GEONODE_SECURITY_ENABLED": True,$\r$\n'
	FileWrite $9 '        "GEOGIG_ENABLED": False,$\r$\n'
	FileWrite $9 '        "WMST_ENABLED": False,$\r$\n'
	FileWrite $9 '        "BACKEND_WRITE_ENABLED": True,$\r$\n'
	FileWrite $9 '        "WPS_ENABLED": False,$\r$\n'
	FileWrite $9 '        "LOG_FILE": "%s/geoserver/data/logs/geoserver.log" % os.path.abspath(os.path.join(PROJECT_ROOT, os.pardir)),$\r$\n'
	FileWrite $9 '        # Set to name of database in DATABASES dictionary to enable$\r$\n'
	FileWrite $9 '        "DATASTORE": "datastore",$\r$\n'
	FileWrite $9 '        "TIMEOUT": 10  # number of seconds to allow for HTTP requests$\r$\n'
	FileWrite $9 '    }$\r$\n'
	FileWrite $9 '}$\r$\n'
    
	FileClose $9 ; Closes the file
    
  ; -------------------------------------  GEONODE LOCAL SETTINGS
    
	; Prepare the Python Environment
	Push $R0
	  StrCpy $PythonHome "$INSTDIR\Python27"
	  StrCpy $GDALHome "${GDAL_HOME}"
	  
	  ReadEnvStr $R0 "PATH"
	  ClearErrors
	  
	  ; Write python env file
      Delete "python_env.bat"
      FileOpen $9 python_env.bat w ; Opens a Empty File and fills it  
  
	  FileWrite $9 '@echo off$\r$\n'
      FileWrite $9 'SET GEONODE_PATHEXT=$PythonHome;$PythonHome\Scripts;$GDALHome$\r$\n'
      FileWrite $9 'SET PATH=%GEONODE_PATHEXT%;$R0$\r$\n'
	  FileWrite $9 'SET GDAL_HOME=${GDAL_HOME}$\r$\n'
	  FileWrite $9 'SET GDAL_LIBRARY_PATH=${GDAL_HOME}\gdal111.dll$\r$\n'
	  FileWrite $9 'SET GEOS_LIBRARY_PATH=${GDAL_HOME}\geos_c.dll$\r$\n'
	  
	  FileClose $9 ; Closes the file
	Pop $R0

    ; Copy virtualenv setup script
    File virtualenv_setup.bat
	
    ; Run virtualenv setup script
    ExecWait 'virtualenv_setup.bat' ; run virtualenv setup
  
  ; -------------------------------------  GEOSERVER SECTION
  ; New users.properties file is created here
  StrCmp $IsExisting 1 NoWriteCreds WriteCreds

  WriteCreds:
    Delete "$DataDir\security\users.properties"
    FileOpen $R9 "$DataDir\security\users.properties" w
    FileWrite $R9 "$GSUser=$GSPass,ROLE_ADMINISTRATOR"
    FileClose $R9
    
    Delete "$DataDir\security\usergroup\default\users.xml"
    FileOpen $R9 "$DataDir\security\usergroup\default\users.xml" w
    FileWrite $R9 '<?xml version="1.0" encoding="UTF-8"?><userRegistry xmlns="http://www.geoserver.org/security/users" version="1.0"><users><user enabled="true" name="$GSUser" password="plain:$GSPass"/></users><groups/></userRegistry>'
    FileClose $R9

    Delete "$DataDir\security\role\default\roles.xml"
    FileOpen $R9 "$DataDir\security\role\default\roles.xml" w
    FileWrite $R9 '<?xml version="1.0" encoding="UTF-8"?><roleRegistry xmlns="http://www.geoserver.org/security/roles" version="1.0"><roleList><role id="ADMIN"/><role id="GROUP_ADMIN"/></roleList><userList><userRoles username="$GSUser"><roleRef roleID="ADMIN"/></userRoles></userList><groupList/></roleRegistry>'
    FileClose $R9
    
  
  NoWriteCreds:
  
  ; -------------------------------------  APACHE2 SECTION
  SetOutPath $INSTDIR

    File "${WINLAMP_EXE}"

    ExecWait "${WINLAMP_EXE} -GEOSERVER-PORT=$Port -GEONODE-FOLDER=$\"$INSTDIR\${GEONODE_FOLDER}$\" /D=$INSTDIR"

    ExecWait '$INSTDIR\${GEONODE_FOLDER}\python_env.bat' ; restart apache service  
    ExecWait '$SYSDIR\net stop was /y' ; stop World Wide Web Publishing service
    ;ExecWait '$SYSDIR\sc config "W3SVC" start= disabled' ; disable World Wide Web Publishing service
    ExecWait '$INSTDIR\Apache2\bin\Apache.exe -k restart -n "Apache2"' ; restart apache service  
	ExecWait '$SYSDIR\net start Apache2' ; start apache service
    
  ; -------------------------------------  APACHE TOMCAT SECTION
  SetOutPath "$INSTDIR\${TOMCAT_DIRNAME}\bin"

    Delete "setenv.bat"
    FileOpen $9 setenv.bat w ; Opens a Empty File and fills it
	
	FileWrite $9 'set CATALINA_HOME=$INSTDIR\${TOMCAT_DIRNAME}$\r$\n'
    FileWrite $9 'set CATALINA_BASE=%CATALINA_HOME%$\r$\n'
    FileWrite $9 'set CATALINA_PID=%CATALINA_BASE%\catalina.pid$\r$\n'
    FileWrite $9 'set JAVA_HOME=$JavaHome$\r$\n'
    FileWrite $9 'rem /////////////////////////// GEOx_OPTS /////////////////////////// $\r$\n'
    FileWrite $9 'set GEOSERVER_DATA_DIR="$DataDir"$\r$\n'
    FileWrite $9 'set GEOSERVER_URL="http://localhost:$Port/geoserver"$\r$\n'
    ;FileWrite $9 'set GEOWEBCACHE_CACHE_DIR=%CATALINA_BASE%/geowebcache_data_dir$\r$\n'
    FileWrite $9 'set GWC_METASTORE_DISABLED=false$\r$\n'
    FileWrite $9 'rem /////////////////////////// JAVA_OPTS /////////////////////////// $\r$\n'
    FileWrite $9 'set JAVA_OPTS=-Duser.timezone=GMT -Dport.http.nonssl=$Port -Xms$JavaHeapMinm -Xmx$JavaHeapMaxm -XX:MaxPermSize=128m -XX:PermSize=64m -XX:NewSize=48m $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -XX:+DisableExplicitGC -XX:+UseConcMarkSweepGC -XX:+UseParNewGC$\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -XX:+UseNUMA -XX:+CMSParallelRemarkEnabled -XX:MaxGCPauseMillis=500 -XX:+UseAdaptiveGCBoundary -XX:-UseGCOverheadLimit$\r$\n'
    FileWrite $9 'rem set JAVA_OPTS=%JAVA_OPTS% -XX:+UseBiasedLocking -XX:+UseFastAccessorMethods -XX:+UseStringCache -XX:+UseCompressedStrings -XX:+OptimizeStringConcat $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -XX:SoftRefLRUPolicyMSPerMB=36000 -XX:+UseLargePages -XX:+HeapDumpOnOutOfMemoryError -XX:+CMSIncrementalMode $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -Dorg.geotools.epsg.factory.timeout=0 $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -Dorg.geotools.imagemosaic.refineroi=true $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -Dorg.geotools.filter.function.simplify=true $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -Dorg.geotools.referencing.forceXY=true$\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -Dorg.geotools.shapefile.datetime=false $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -DGEOSERVER_DATA_DIR=%GEOSERVER_DATA_DIR% $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -DGEOMETRY_COLLECT_MAX_COORDINATES=50000 $\r$\n'
    FileWrite $9 'rem set JAVA_OPTS=%JAVA_OPTS% -DGEOWEBCACHE_CACHE_DIR=%GEOWEBCACHE_CACHE_DIR% $\r$\n'
    FileWrite $9 'set JAVA_OPTS=%JAVA_OPTS% -DGWC_METASTORE_DISABLED=%GWC_METASTORE_DISABLED%$\r$\n'
    FileWrite $9 'set JAVA_HEAP_MIN=$JavaHeapMin$\r$\n'
    FileWrite $9 'set JAVA_HEAP_MAX=$JavaHeapMax$\r$\n'
    FileWrite $9 'set TOMCAT_SERVICE_OPTS=-Duser.timezone=GMT;-Dport.http.nonssl=$Port;-XX:MaxPermSize=128m;-XX:PermSize=64m;-XX:NewSize=48m;-XX:+DisableExplicitGC;-XX:+UseConcMarkSweepGC;-XX:+UseParNewGC;-XX:+UseNUMA;-XX:+CMSParallelRemarkEnabled;-XX:MaxGCPauseMillis=500;-XX:+UseAdaptiveGCBoundary;-XX:-UseGCOverheadLimit;-XX:SoftRefLRUPolicyMSPerMB=36000;-XX:+UseLargePages;-XX:+HeapDumpOnOutOfMemoryError;-XX:+CMSIncrementalMode;-DGEOSERVER_DATA_DIR=%GEOSERVER_DATA_DIR%$\r$\n'

	FileClose $9 ; Closes the file

    ExecWait 'service.bat install' ; install apache tomcat service
	ExecWait '$SYSDIR\net start Tomcat7' ; start apache tomcat service

  ; -------------------------------------  GEOSERVER SECTION
  SetOutPath $INSTDIR\${GEONODE_FOLDER}
      
    AccessControl::GrantOnFile "$INSTDIR\" "(S-1-5-32-545)" "FullAccess"
    AccessControl::GrantOnFile "$INSTDIR\${GEONODE_FOLDER}" "(S-1-5-32-545)" "FullAccess"
    
    ;Start Menu
    !insertmacro MUI_STARTMENU_WRITE_BEGIN Application
    
    ;Create shortcuts
    CreateDirectory "$SMPROGRAMS\$STARTMENU_FOLDER"
    CreateShortCut "$SMPROGRAMS\$STARTMENU_FOLDER\GeoNode.lnk" "http://localhost/" \
                   "" "$INSTDIR\geonode_white.ico" 0
    CreateShortCut "$SMPROGRAMS\$STARTMENU_FOLDER\Uninstall.lnk" "$INSTDIR\uninstall_GeoNode.exe"
    
    CreateShortCut "$SMPROGRAMS\$STARTMENU_FOLDER\GeoNode VirtualEnv Setup.lnk" "$INSTDIR\${GEONODE_FOLDER}\virtualenv_setup.bat" \
                   "" "$INSTDIR\maintenance.ico" 0
    

  ; -------------------------------------  Import Default Layers
	  ; Write import layers file
      Delete "import_layers.bat"
      FileOpen $9 import_layers.bat w ; Opens a Empty File and fills it  
    
	  FileWrite $9 '@echo off$\r$\n'
      FileWrite $9 'call python_env.bat$\r$\n'
      FileWrite $9 'virtualenv .$\r$\n'
	  FileWrite $9 'call Scripts\activate.bat$\r$\n'
	  FileWrite $9 'python manage.py importlayers -v 3 "$INSTDIR\${GEONODE_FOLDER}\Lib\site-packages\gisdata\data\good\vector"$\r$\n'
	  
	  FileClose $9 ; Closes the file
      
    ExecWait 'import_layers.bat' ; run import layers

  !insertmacro MUI_STARTMENU_WRITE_END
  
  endInstall:
  
      ; Cleanup
      Delete "$INSTDIR\${TOMCAT_ZIP}"
      Delete "$INSTDIR\${GEOSERVER_DATA_ZIP}"
      Delete "$INSTDIR\${GEONODE_ZIP}"
	  
      ; registry settings, useful for add/remove programs
      WriteRegStr         HKEY_LOCAL_MACHINE \
                          "SOFTWARE\GeoNode" \
                          "Install_Dir" \
                          "$INSTDIR"
      WriteRegStr         HKEY_LOCAL_MACHINE \
                          "Software\Microsoft\Windows\CurrentVersion\Uninstall\GeoNode" \
                          "DisplayName" \
                          "GeoNode"
      WriteRegDWORD       HKEY_LOCAL_MACHINE \
                          "Software\Microsoft\Windows\CurrentVersion\Uninstall\GeoNode" \
                          "NoModify" \
                          "1"
      WriteRegDWORD       HKEY_LOCAL_MACHINE \
                          "Software\Microsoft\Windows\CurrentVersion\Uninstall\GeoNode" \
                          "NoRepair" \
                          "1"
      WriteRegStr         HKEY_LOCAL_MACHINE \
                          "Software\Microsoft\Windows\CurrentVersion\Uninstall\GeoNode" \
                          "DisplayVersion" \
                          "${VERSION}"
      WriteRegStr         HKEY_LOCAL_MACHINE \
                          "Software\Microsoft\Windows\CurrentVersion\Uninstall\GeoNode" \
                          "UninstallString" \
                          "$INSTDIR\uninstall_GeoNode.exe"
      
      ; create the uninstaller 
      WriteUninstaller $INSTDIR\uninstall_GeoNode.exe
  
SectionEnd

######################################################################
# UNINSTALL SECTION
######################################################################
Section "Uninstall"

  SetShellVarContext  all
  
  ; Stop Tomcat7 Service
  ExecWait '$INSTDIR\${TOMCAT_DIRNAME}\bin\tomcat7.exe //SS//Tomcat7' ; stop apache tomcat service
  ExecWait '$SYSDIR\net stop Tomcat7' ; stop apache tomcat service
  ExecWait '$INSTDIR\${TOMCAT_DIRNAME}\bin\service.bat remove' ; remove apache tomcat service
  ExecWait '$INSTDIR\${TOMCAT_DIRNAME}\bin\tomcat7.exe //DS//Tomcat7' ; remove apache tomcat service
  ExecWait '$SYSDIR\sc delete "Tomcat7"' ; remove tomcat service
  
  ; Uninstall JREInstall
  ;ExecWait '"msiexec" /x "$INSTDIR\${JRE_EXE}"'
  
  ; Uninstall Apache2
  ExecWait '$INSTDIR\Apache2\uninstall_WinLAMP.exe'
  Sleep 10000 ; to make sure it's fully stopped
  
  ; Uninstall Python and GDAL
  ExecWait '"msiexec" /x "$INSTDIR\${GDAL_CORE_MSI}" /passive TARGETDIR="$INSTDIR\GDAL"'
  ExecWait '"msiexec" /x "$INSTDIR\${VC_FOR_PYTHON_MSI}" /passive TARGETDIR="$INSTDIR\Python27"'
  ExecWait '"msiexec" /x "$INSTDIR\${GDAL_PYTHON_MSI}" /passive TARGETDIR="$INSTDIR\Python27"'
  ExecWait '"msiexec" /x "$INSTDIR\${PYTHON27_MSI}" /passive TARGETDIR="$INSTDIR\Python27"'
  
  ; Uninstall POstgreSQL and PostGIS
  ExecWait "$INSTDIR\postgres\${POSTGIS_UNINSTALL_EXE}"
  ExecWait "$INSTDIR\postgres\${POSTGRESQL_UNINSTALL_EXE}"
  ExecWait '$SYSDIR\net user postgres /delete' ; stop apache tomcat service
  
  ;Delete files and dirs in installation folder
  Delete $INSTDIR\uninstall_GeoNode.exe
  
  Delete "$INSTDIR\geonode.ico"
  Delete "$INSTDIR\geonode_white.ico"
  Delete "$INSTDIR\gs.ico"
  
  Delete "$INSTDIR\LICENSE.txt"
  
  RMDir /r "$INSTDIR\${GEONODE_FOLDER}"
  
  RMDir /r "$INSTDIR\${TOMCAT_DIRNAME}"
  
  ; Delete Shortcuts
  RMDir /r "$SMPROGRAMS\${APPNAMEANDVERSION}"
  RMDir /r "$SMPROGRAMS\$STARTMENU_FOLDER"
  RMDir /r "$SMPROGRAMS\${STARTMENU_FOLDER}"
  
  ;Remove environment variables
  Push "GDAL_HOME"
  Call un.DeleteEnvVar
  Push "GDAL_LIBRARY_PATH"
  Call un.DeleteEnvVar
  Push "GEOS_LIBRARY_PATH"  
  Call un.DeleteEnvVar
  Push "GEONODE_PATHEXT"
  Call un.DeleteEnvVar
  Push "JRE_HOME"
  Call un.DeleteEnvVar
  
  ; remove the path setting
  Push "%GEONODE_PATHEXT%"
  Call un.RemoveFromPath
  
  ; goodbye registry entries
  DeleteRegKey        HKEY_LOCAL_MACHINE "SOFTWARE\GeoNode"
  DeleteRegKey        HKEY_LOCAL_MACHINE "SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\GeoNode"

  ; and finally, goodbye to the GeoNode directory
  SetOutPath          "$INSTDIR"
  ExecWait            "echo Please wait while GeoNode directory is removed..."
  RMDir /r            "$INSTDIR" ; remove the empty directories
  ; /r doesn't seem to work on all systems, so here is insurance:
  ExecWait            'del /s /q *.*' ; delete all files in the directory
  ;SetOutPath          "$SMPROGRAMS"
  ;RMDir /r            "$INSTDIR" ; remove the empty directory
  
  ;Delete "$INSTDIR\*.*"

  ;RMDir "$INSTDIR\" ; no /r!

  IfFileExists "$INSTDIR\*.*" 0 +2
    MessageBox MB_OK|MB_ICONEXCLAMATION "Warning: Some files and folders could not be removed from:$\r$\n  $INSTDIR."
    
SectionEnd
