; PostGIS for PostgreSQL
;
; postgis.nsi - NSIS Script for NSIS 2.0
; Requires the ExecDos plugin (http://nsis.sourceforge.net/wiki/ExecDos)
;
; Copyright (c) 2003,2004 Steffen Macke, DORSCH Consult
; Copyright (c) 2004-2009 Mark Cave-Ayland
; Copyright (c) 2009-2012 Paragon Corporation
;
; This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 2 of the License, or; (at your option) any later version.
; This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
; You should have received a copy of the GNU General Public License along with this program; if not, write to the Free Software Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.

; Compression options
CRCCheck on
; Use better compression
;SetCompressor lzma
SetCompress     auto
SilentInstall   silent
SilentUnInstall silent

; Sections
!include "Sections.nsh"

!include FileFunc.nsh
!insertmacro GetParameters
!insertmacro GetOptions
; Modern User Interface
!include "MUI.nsh"

ReserveFile "${NSISDIR}\Plugins\InstallOptions.dll"
ReserveFile ".\postgis_dbconn.ini"
ReserveFile ".\postgis_dbname.ini"

; Constants

; Database connection info
!define UserName $7
!define Password $8
!define Port	 $9

; If creating a database after installation
!define DataBase $6

; The version of PostgreSQL for which we are building (define only one!)
;!define POSTGRESQL_9.1 2
;!define POSTGRESQL_9.0 2
!define POSTGRESQL_8.4 1
;!define POSTGRESQL_8.3 2

!ifdef POSTGRESQL_9.1
	!define PG_VERSION "9.1"
	!define PG_GUID "postgresql-9.1" ;they don't seem to use GUIDs anymore
	!define POSTGIS_PG_VERSION "pg91"
!endif

!ifdef POSTGRESQL_9.0
	!define PG_VERSION "9.0"
	!define PG_GUID "postgresql-9.0" ;they don't seem to use GUIDs anymore
	!define POSTGIS_PG_VERSION "pg90"
!endif


!ifdef POSTGRESQL_8.4
	!define PG_VERSION "8.4"
	!define PG_GUID "postgresql-8.4" ;they don't seem to use GUIDs anymore
	!define POSTGIS_PG_VERSION "pg84"
!endif

!ifdef POSTGRESQL_8.3
	!define PG_VERSION "8.3"
	;!define PG_GUID "{B823632F-3B72-4514-8861-B961CE263224}" ;they don't use GUID anymore for installation
	!define PG_GUID "postgresql-8.3"
	!define POSTGIS_PG_VERSION "pg83"
!endif



; End of PostgreSQL version specific section

!define GEOS_VERSION "3.3.5"
!define PROJ_VERSION "4.6.1"

!define POSTGIS_VERSION "1.5.4"
!define POSTGIS_VERSION_MINOR "1.5"
!define POSTGIS_VERSION_FOLDER "postgis-1.5"
!define POSTGIS_PRODUCT "PostGIS ${POSTGIS_VERSION} for PostgreSQL ${PG_VERSION}"
!define POSTGIS_PRODUCT_MINOR "PostGIS ${POSTGIS_VERSION_MINOR} for PostgreSQL ${PG_VERSION}"
!define POSTGIS_PACKAGING "2"

; Use the new WIN32DIST build directory
!define WIN32DIST_DIR "..\distfiles"

; Place all temporary files used by the installer in their own subdirectory under $TEMP (makes the files easier to find)
!define TEMPDIR "$TEMP\postgis_installer"

; The name of the PostGIS template database
!define POSTGIS_TEMPLATE "template_postgis"

; Configuration
	; General
	Name "${POSTGIS_PRODUCT}"
	OutFile "postgis-${POSTGIS_PG_VERSION}-setup-${POSTGIS_VERSION}-${POSTGIS_PACKAGING}.exe"

	; Remember install folder
	InstallDirRegKey HKLM "Software\PostGIS\PostgreSQL ${PG_VERSION}" ""

; Interface Settings
	!define MUI_ABORTWARNING
	!define MUI_COMPONENTSPAGE_CHECKBITMAP "${NSISDIR}\Contrib\Graphics\Checks\colorful.bmp"
	!define MUI_ICON "${NSISDIR}\Contrib\Graphics\Icons\box-install.ico"
	!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\box-uninstall.ico"
	!define MUI_HEADERIMAGE
	!define MUI_HEADERIMAGE_BITMAP "elephant.bmp"
	!define MUI_HEADERIMAGE_UNBITMAP "elephant.bmp"

; Install Pages
	!insertmacro MUI_PAGE_LICENSE "COPYING"
	!insertmacro MUI_PAGE_COMPONENTS
	!insertmacro MUI_PAGE_DIRECTORY

	; Custom database connection page
	Page custom PageDBConnInit PageDBConnExit ": Database Connection"

	; Custom database name page (only displayed if the create database option is selected)
	Page custom PageDBNameInit PageDBNameExit ": Database Name"

	!insertmacro MUI_PAGE_INSTFILES

; Uninstall Pages
	!insertmacro MUI_UNPAGE_CONFIRM
	!insertmacro MUI_UNPAGE_INSTFILES

; Languages
	!insertmacro MUI_LANGUAGE "English"

; Installer Sections

Section "PostGIS" SecPostGIS

	; By setting the output path to the temporary directory, we force NSIS to make the directory exist. This makes debugging the installer so much easier! Note that the file list in inputfile.nsh overrides this value anyway...
	SetOutPath "${TEMPDIR}"

	; This section must always be installed
	SectionIn RO

	; Set the shell context
	SetShellVarContext all

	; Checks whether installation folder is the PostgreSQL installation folder
	IfFileExists "$INSTDIR\bin\postgres.exe" postgres_available
	MessageBox MB_OK|MB_ICONSTOP "PostGIS has to be installed to the PostgreSQL folder."
	Abort "PostGIS has to be installed to the PostgreSQL folder."

	postgres_available:
		; Start the installation
		; Read the database connection settings
		ReadINIStr ${UserName} "$PLUGINSDIR\postgis_dbconn.ini" "Field 3" "State"
		DetailPrint "UserName=${UserName}"
		ReadINIStr ${Password} "$PLUGINSDIR\postgis_dbconn.ini" "Field 5" "State"
		DetailPrint "Password=${Password}"
		ReadINIStr ${Port} "$PLUGINSDIR\postgis_dbconn.ini" "Field 7" "State"
		DetailPrint "Port=${Port}"

		; Check to see whether the template database "template_postgis" exists
		Call CheckForTemplatePostGIS
		IntCmp $R9 1 postgis_template_exists postgis_install

		postgis_template_exists:
			; The template_postgis database exists from a previous installation
			;MessageBox MB_YESNO "WARNING: The installer has detected that the PostGIS template database '${POSTGIS_TEMPLATE}' already exists in your PostgreSQL installation. In order to install this version of PostGIS, it is necessary to create a new '${POSTGIS_TEMPLATE}' database, so any manual changes you have made to this database will be lost.$\r$\n$\r$\nDo you still wish to proceed with the installation?" /SD IDYES IDYES postgis_remove_template IDNO postgis_abort_install

			postgis_remove_template:
				; We need to remove the existing template_postgis
				Call RemoveTemplatePostGIS
				Goto postgis_install

			;postgis_abort_install:
				; Abort the installation
				;Abort

		postgis_install:

			; Include the input files
			!include inputfiles.nsh

			; Create the template database
			Call CreateTemplatePostGIS
			;Call EnablePostGISPgAdminPlugin

		; Create documentation shortcuts for PostGIS documentation and JDBC documentation
		!include paths.nsh

		;This is to get rid of the old doucmentation directory we created which we mis-named in old install
		RMDir /r "$SMPROGRAMS\PostGIS ${POSTGIS_VERSION_MINOR}.0 for PostgreSQL ${PG_VERSION}"
		RMDir /r "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}"
		
		;Now recreate and add short-cuts
		CreateDirectory "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}"
		; File "PostgIS Documentation URL"
		FileOpen $1 "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}\PostGIS Documentation On-Line.url" "w"
		FileWrite $1 "[InternetShortcut]$\r$\n"
		FileWrite $1 "URL=http://www.postgis.org/documentation/$\r$\n"
		FileWrite $1 "IconFile=http://www.postgis.org/favicon.ico$\r$\n"
		FileWrite $1 "IconIndex=1"
		FileClose $1
		
	; File "PostGIS Web Site URL"
		FileOpen $1 "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}\PostGIS Website.url" "w"
		FileWrite $1 "[InternetShortcut]$\r$\n"
		FileWrite $1 "URL=http://www.postgis.org/$\r$\n"
		FileWrite $1 "IconFile=http://www.postgis.org/favicon.ico$\r$\n"
		FileWrite $1 "IconIndex=1"
		FileClose $1
	; File "PostGIS JDBC On-Line Documentation"
		FileOpen $1 "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}\PostGIS JDBC Driver On-Line Documentation.url" "w"
		FileWrite $1 "[InternetShortcut]$\r$\n"
		FileWrite $1 "URL=http://www.postgis.org/documentation/javadoc/$\r$\n"
		FileWrite $1 "IconFile=http://www.postgis.org/favicon.ico$\r$\n"
		FileWrite $1 "IconIndex=1"
		FileClose $1
	; File "PostGIS PDF Documentation"	
		CreateShortcut "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}\PostGIS ${POSTGIS_VERSION} PDF Documentation.lnk" "$INSTDIR\${PATH_DOCDIR}\contrib\postgis-1.5.pdf"
	; File "PostGIS Shapefile and DBF loader"	
		CreateShortcut "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}\PostGIS Shapefile and DBF Loader.lnk" "$INSTDIR\bin\postgisgui\shp2pgsql-gui.exe"


		; Store install folder and Version ID for StackBuilder

		; IMPORTANT: be careful changing these, otherwise StackBuilder may not work correctly! (also don't forget the relevant uninstall section)
		WriteRegStr HKLM "Software\PostGIS\${POSTGIS_VERSION_MINOR}\PostgreSQL ${PG_VERSION}" "" $INSTDIR
		WriteRegStr HKLM "Software\PostGIS\${POSTGIS_VERSION_MINOR}\PostgreSQL ${PG_VERSION}" "Version" "${POSTGIS_VERSION}"

		; Store uninstall information
		WriteRegStr HKEY_LOCAL_MACHINE "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}" "DisplayName" "${POSTGIS_PRODUCT} (remove only)"
		WriteRegStr HKEY_LOCAL_MACHINE "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}" "UninstallString" '"$INSTDIR\uninstall-postgis-${POSTGIS_PG_VERSION}-${POSTGIS_VERSION}-${POSTGIS_PACKAGING}.exe"'
		WriteRegStr HKEY_LOCAL_MACHINE "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}" "DisplayIcon" '"$INSTDIR\uninstall-postgis-${POSTGIS_PG_VERSION}-${POSTGIS_VERSION}-${POSTGIS_PACKAGING}.exe"'

		; Create uninstaller
		WriteUninstaller "$INSTDIR\uninstall-postgis-${POSTGIS_PG_VERSION}-${POSTGIS_VERSION}-${POSTGIS_PACKAGING}.exe"

SectionEnd

Section "Create spatial database" SecCreateDb

	; Read the database name
	ReadINIStr ${DataBase} "$PLUGINSDIR\postgis_dbname.ini" "Field 3" "State"
	DetailPrint "DataBase=${DataBase}"

	; Create the database
	Call CreateSpatialDatabase

SectionEnd

; Language Strings

LangString DESC_SecPostGIS ${LANG_ENGLISH} "Install PostGIS ${POSTGIS_VERSION} for PostgreSQL ${PG_VERSION}, GEOS ${GEOS_VERSION}, PROJ ${PROJ_VERSION}."
LangString DESC_SecCreateDb ${LANG_ENGLISH} "Create a new spatial database."

!insertmacro MUI_FUNCTION_DESCRIPTION_BEGIN
!insertmacro MUI_DESCRIPTION_TEXT ${SecPostGIS} $(DESC_SecPostGIS)
!insertmacro MUI_DESCRIPTION_TEXT ${SecCreateDb} $(DESC_SecCreateDb)
!insertmacro MUI_FUNCTION_DESCRIPTION_END

; Uninstaller Section
Section "Uninstall"

	; Uninstall files - as yet we do not try to remove the template_postgis database

	!include uninstallfiles.nsh

	; Delete the directory itself
	RmDir /r "$INSTDIR\${PATH_SHAREDIR}\contrib\${POSTGIS_VERSION_FOLDER}"

	; Remove documentation shortcuts
	SetShellVarContext all
	RmDir /r "$SMPROGRAMS\${POSTGIS_PRODUCT_MINOR}"

	; Remove installer registry entries
	DeleteRegKey HKLM "Software\PostGIS\${POSTGIS_VERSION_MINOR}\PostgreSQL ${PG_VERSION}"
	DeleteRegValue HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}" "DisplayName"
	DeleteRegValue HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}" "UninstallString"
	DeleteRegValue HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}" "DisplayIcon"
	DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\${POSTGIS_PRODUCT_MINOR}"
	DeleteRegKey /ifempty HKLM "Software\PostGIS"

	; Remove the uninstaller itself
	Delete "$INSTDIR\uninstall-postgis-${POSTGIS_PG_VERSION}-${POSTGIS_VERSION}-${POSTGIS_PACKAGING}.exe"

SectionEnd

; Miscellaneous functions
Function .onInit

	; Initialise the plugins dir
	InitPluginsDir

	; If we have been passed a new directory on the command line then we allow it to override any defaults; skip straight to the database conneciton section.
	StrCmp $INSTDIR "" oninit_setdefaultdir oninit_databaseconn

oninit_setdefaultdir:
	; Folder selection page
	; (Read the default from the registry, and fall back to the default if we can't find it)
	ReadRegStr $0 HKLM "Software\PostgreSQL\Installations\${PG_GUID}" "Base Directory"
	StrCmp $0 "" oninit_usedefaultdir oninit_useregdir

oninit_usedefaultdir:
	; Use the default dir for $INSTDIR
	StrCpy $INSTDIR "C:\Program Files\PostgreSQL\${PG_VERSION}\"
	GoTo oninit_databaseconn

oninit_useregdir:
	; Use the copy from the registry
	StrCpy $INSTDIR $0

oninit_databaseconn:
	; Extract the database connection page info
	; (Read the defaults for the port/superuser if they exist)
	File /oname=$PLUGINSDIR\postgis_dbconn.ini ".\postgis_dbconn.ini"

	; First get the service ID (if this doesn't exist then we don't do anything since we are not dealing with a normal install)
	ReadRegStr $0 HKLM "Software\PostgreSQL\Installations\${PG_GUID}" "Service ID"
	StrCmp $0 "" oninit_usedefaultconnectinfo oninit_useregconnectinfo

oninit_useregconnectinfo:
	; Grab the superuser name from the registry
	ReadRegStr $1 HKLM "Software\PostgreSQL\Services\$0" "Database Superuser"
	WriteINIStr "$PLUGINSDIR\postgis_dbconn.ini" "Field 3" "State" "$1"

	; Grab the default port from the registry
	ReadRegDWORD $1 HKLM "Software\PostgreSQL\Services\$0" "Port"
	WriteINIStr "$PLUGINSDIR\postgis_dbconn.ini" "Field 7" "State" "$1"

oninit_usedefaultconnectinfo:
	; Extract the database name page info
	File /oname=$PLUGINSDIR\postgis_dbname.ini ".\postgis_dbname.ini"


; Command line Parameter overrides
    ${GetParameters} $R0
    ClearErrors
    Push $0
    ${GetOptions} $R0 /USERNAME= $0
    StrCmp $0 "" +2 0
	WriteINIStr "$PLUGINSDIR\postgis_dbconn.ini" "Field 3" "State" "$0"
    ${GetOptions} $R0 /PASSWORD= $0
    StrCmp $0 "" +2 0
	WriteINIStr "$PLUGINSDIR\postgis_dbconn.ini" "Field 5" "State" "$0"
    ${GetOptions} $R0 /PORT= $0
    StrCmp $0 "" +2 0
	WriteINIStr "$PLUGINSDIR\postgis_dbconn.ini" "Field 7" "State" "$0"
    ${GetOptions} $R0 /DATABASE= $0
    StrCmp $0 "" +2 0
	WriteINIStr "$PLUGINSDIR\postgis_dbname.ini" "Field 3" "State" "$0"

    Pop $0

FunctionEnd

; Init/Exit functions for the database connection page
Function PageDBConnInit

	; Set the header text
	!insertmacro MUI_HEADER_TEXT "Database Connection" "Specify the database connection"

	; Display the InstallOptions dialog
	Push $R0
	InstallOptions::dialog $PLUGINSDIR\postgis_dbconn.ini
	Pop $R0

FunctionEnd

Function PageDBConnExit
	; Do nothing
FunctionEnd

; Init/Exit functions for the database name page
Function PageDBNameInit

	; Get information from the "Create Database" item on the components page
	SectionGetFlags ${SecCreateDB} $R9

	; If the item is not selected ($R9 == 0) then skip this page
	IntCmp $R9 0 pdi_skip pdi_noskip

	pdi_noskip:
		; Create database option selected - show this page

		; Set the header text
		!insertmacro MUI_HEADER_TEXT "Database Name" "Specify the name of the spatial database to be created at the end of the installation process"

		; Display the InstallOptions dialog
		Push $R0
		InstallOptions::dialog $PLUGINSDIR\postgis_dbname.ini
		Pop $R0

		; Exit function
		Return

	pdi_skip:
		; Create database option not selected - skip this page
		Abort

FunctionEnd

Function PageDBNameExit
	; Do nothing
FunctionEnd

; Main installer functions
; CheckForTemplatePostGIS - determine whether the template_postgis database exists within the cluster. Returns 0 (False) or 1 (True) in R9.
Function CheckForTemplatePostGIS

	; File "check_templatepostgis.bat"
	FileOpen $1 "${TEMPDIR}\check_templatepostgis.bat" "w"
	FileWrite $1 "set PGPASSWORD=${Password}$\r$\n"
	FileWrite $1 "set PGPORT=${Port}$\r$\n"
	FileWrite $1 '"$INSTDIR\bin\psql.exe" -d ${POSTGIS_TEMPLATE} -U ${UserName} -h localhost -c "SELECT version();" 2> "${TEMPDIR}\check_templatepostgis_error.txt"$\r$\n'
	FileWrite $1 "exit %ERRORLEVEL%$\r$\n"
	FileClose $1

	; Execute check_templatepostgis.bat
	DetailPrint "Checking for existing PostGIS installation..."
	;ExecDos::exec '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\check_templatepostgis.bat"'
	ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\check_templatepostgis.bat"'
	Pop $1

	; If psql returned 0 then the database exists - otherwise an error occurred
	IntCmp $1 0 cftp_template_exists

	; Template doesn't exist - return 0
	StrCpy $R9 0
	Return

	cftp_template_exists:
		; Template exists - return 1
		StrCpy $R9 1
		Return

FunctionEnd

; RemoveTemplatePostGIS - removes the template_postgis db
Function RemoveTemplatePostGIS

	; File "remove_templatepostgis.bat"
	FileOpen $1 "${TEMPDIR}\remove_templatepostgis.bat" "w"
	FileWrite $1 "set PGPASSWORD=${Password}$\r$\n"
	FileWrite $1 "set PGPORT=${Port}$\r$\n"

	; NB: First we need to remove the datistemplate flag before we can drop it
	FileWrite $1 '"$INSTDIR\bin\psql.exe" -U ${UserName} -h localhost -c "UPDATE pg_database SET datistemplate=false WHERE datname=$\'${POSTGIS_TEMPLATE}$\'" ${POSTGIS_TEMPLATE} 2> "${TEMPDIR}\remove_templatepostgis_error.txt"$\r$\n'
	FileWrite $1 "if not %ERRORLEVEL%==0 exit %ERRORLEVEL%$\r$\n"

	; Drop the database
	FileWrite $1 '"$INSTDIR\bin\dropdb.exe" -U ${UserName} -h localhost ${POSTGIS_TEMPLATE} 2>> "${TEMPDIR}\remove_templatepostgis_error.txt"$\r$\n'
	FileWrite $1 "exit %ERRORLEVEL%$\r$\n"
	FileClose $1

	; Execute check_templatepostgis.bat
	DetailPrint "Removing existing ${POSTGIS_TEMPLATE} database..."
	;ExecDos::exec '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\remove_templatepostgis.bat"'
	ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\remove_templatepostgis.bat"'
	Pop $R9

	; If dropdb returned 0 then the drop suceeded
;	IntCmp $R9 0 rtp_removalsuccess

	; Looks like the removal failed so error out
;	StrCpy $R8 "Removal of ${POSTGIS_TEMPLATE} database failed."
;	StrCpy $R9 "${TEMPDIR}\remove_templatepostgis_error.txt"
;	Call AbortDisplayLogOption

	rtp_removalsuccess:
		; Return to caller
		Return

FunctionEnd

; CreateTemplatePostGIS - create the template_postgis db by loading in the postgis.sql and spatial_ref_sys.sql files.
Function CreateTemplatePostGIS

	; File "create_templatepostgis_db.bat"
	FileOpen $1 "${TEMPDIR}\create_templatepostgis_db.bat" "w"
	FileWrite $1 "set PGPASSWORD=${Password}$\r$\n"
	FileWrite $1 "set PGPORT=${Port}$\r$\n"
	;FileWrite $1 '"$INSTDIR\bin\createdb.exe" -U ${UserName} -h localhost --encoding=UNICODE ${POSTGIS_TEMPLATE} 2> "${TEMPDIR}\create_templatepostgis_db_error.txt"$\r$\n'
	FileWrite $1 '"$INSTDIR\bin\createdb.exe" -U ${UserName} -h localhost ${POSTGIS_TEMPLATE} 2> "${TEMPDIR}\create_templatepostgis_db_error.txt"$\r$\n'
	
	FileWrite $1 "exit %ERRORLEVEL%$\r$\n"
	FileClose $1

	; Execute create_postgis_db.bat
	DetailPrint "Creating template database..."
	;ExecDos::exec '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_templatepostgis_db.bat"'
	ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_templatepostgis_db.bat"'
	Pop $R9

	; If createdb returned 0 then the database was created successfully
;	IntCmp $R9 0 ctp_createdb_success

	; Looks like the creation failed so we abort
;	StrCpy $R8 "Database creation failed."
;	StrCpy $R9 "${TEMPDIR}\create_templatepostgis_db_error.txt"
;	Call AbortDisplayLogOption

	; Creation went well, so lets continue
	ctp_createdb_success:

		; File "create_templatepostgis_lang.bat"
		FileOpen $1 "${TEMPDIR}\create_templatepostgis_lang.bat" "w"
		FileWrite $1 "set PGPASSWORD=${Password}$\r$\n"
		FileWrite $1 "set PGPORT=${Port}$\r$\n"
		FileWrite $1 '"$INSTDIR\bin\createlang.exe" -U ${UserName} -h localhost plpgsql ${POSTGIS_TEMPLATE} 2> "${TEMPDIR}\create_templatepostgis_lang_error.txt"$\r$\n'
		
		;Taking this out - newer versions already have plpgsql enabled so can safely ignore error
		;FileWrite $1 "if not %ERRORLEVEL%==0 exit %ERRORLEVEL%$\r$\n"

		; NB: Set the template flag in the pg_database table
		FileWrite $1 '"$INSTDIR\bin\psql.exe" -U ${UserName} -h localhost -c "UPDATE pg_database SET datistemplate=true WHERE datname=$\'${POSTGIS_TEMPLATE}$\'" ${POSTGIS_TEMPLATE} 2>> "${TEMPDIR}\create_templatepostgis_lang_error.txt"$\r$\n'
		FileWrite $1 "exit %ERRORLEVEL%$\r$\n"
		FileClose $1

		; Execute create_postgis_lang.bat
		DetailPrint "Loading PLPGSQL language..."
		;ExecDos::exec '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_templatepostgis_lang.bat"'
		ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_templatepostgis_lang.bat"'
		Pop $1

		; If createlang returns 0, then the command succeeded
;		IntCmp $1 0 ctp_createlang_succeeded

		; If createlang returns 2, then the language is already installed
		; (this isn't an error so we can continue)
;		IntCmp $1 2 ctp_createlang_succeeded

		; An error occurred so abort the installation
;		StrCpy $R8 "Database installation of PLPGSQL failed."
;		StrCpy $R9 "${TEMPDIR}\create_templatepostgis_lang_error.txt"
;		Call AbortDisplayLogOption


	; PLPGSQL has been successfully loaded into the database, so continue
	ctp_createlang_succeeded:

		; File "create_templatepostgis_sql.bat"
		FileOpen $1 "${TEMPDIR}\create_templatepostgis_sql.bat" "w"
		FileWrite $1 "set PGPASSWORD=${Password}$\r$\n"
		FileWrite $1 "set PGPORT=${Port}$\r$\n"
		FileWrite $1 '"$INSTDIR\bin\psql.exe" -U ${UserName} -h localhost -f "$INSTDIR\${PATH_SHAREDIR}\contrib\${POSTGIS_VERSION_FOLDER}\postgis.sql" -d ${POSTGIS_TEMPLATE} --set ON_ERROR_STOP=1 2> "${TEMPDIR}\create_templatepostgis_sql_error.txt"$\r$\n'
		FileWrite $1 "if not %ERRORLEVEL%==0 exit %ERRORLEVEL%$\r$\n"
		FileWrite $1 '"$INSTDIR\bin\psql.exe" -U ${UserName} -h localhost -f "$INSTDIR\${PATH_SHAREDIR}\contrib\${POSTGIS_VERSION_FOLDER}\spatial_ref_sys.sql" -d ${POSTGIS_TEMPLATE} --set ON_ERROR_STOP=1 2>> "${TEMPDIR}\create_templatepostgis_sql_error.txt"$\r$\n'
		FileWrite $1 "if not %ERRORLEVEL%==0 exit %ERRORLEVEL%$\r$\n"
		FileWrite $1 '"$INSTDIR\bin\psql.exe" -U ${UserName} -h localhost -f "$INSTDIR\${PATH_SHAREDIR}\contrib\${POSTGIS_VERSION_FOLDER}\postgis_comments.sql" -d ${POSTGIS_TEMPLATE} --set ON_ERROR_STOP=1 2>> "${TEMPDIR}\create_templatepostgis_sql_error.txt"$\r$\n'
		FileWrite $1 "exit %ERRORLEVEL%$\r$\n"
		FileClose $1

		; Execute create_postgis_sql.bat
		DetailPrint "Loading PostGIS functions..."
		;ExecDos::exec '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_templatepostgis_sql.bat"'
		ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_templatepostgis_sql.bat"'
		Pop $R9

		; If either of the above files returned non-zero, an error occurred
;		IntCmp $R9 0 ctp_loadsql_success

		; If we get here then the load failed - abort installation
;		StrCpy $R8 "Database installation of PostGIS functions failed"
;		StrCpy $R9 "${TEMPDIR}\create_templatepostgis_sql_error.txt"
;		Call AbortDisplayLogOption


	ctp_loadsql_success:
		; We have successfully created the template_postgis database
		Return

FunctionEnd

; CreateSpatialDatabase - create a spatial database by copying from template_postgis
Function CreateSpatialDatabase

	; File "create_spatial_db.bat"
	FileOpen $1 "${TEMPDIR}\create_spatial_db.bat" "w"
	FileWrite $1 "set PGPASSWORD=${Password}$\r$\n"
	FileWrite $1 "set PGPORT=${Port}$\r$\n"
	FileWrite $1 '"$INSTDIR\bin\createdb.exe" -U ${UserName} -h localhost -T ${POSTGIS_TEMPLATE} ${DataBase} 2> "${TEMPDIR}\create_spatial_db_error.txt"$\r$\n'
	FileWrite $1 "exit %ERRORLEVEL%$\r$\n"
	FileClose $1

	; Execute create_spatial_db.bat
	DetailPrint "Creating spatial database..."
	;ExecDos::exec '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_spatial_db.bat"'
	ExecWait '"$SYSDIR\cmd.exe" /c "${TEMPDIR}\create_spatial_db.bat"'
	Pop $R9

	; If psql returned non-zero, an error occurred
;	IntCmp $R9 0 csd_createdb_success

	; Looks like the creation failed so we abort
;	StrCpy $R8 "Spatial database creation failed."
;	StrCpy $R9 "${TEMPDIR}\create_spatial_db_error.txt"
;	Call AbortDisplayLogOption

;	csd_createdb_success:
		; Simply return
		Return

FunctionEnd

; AbortDisplayLogOption - give the user the option to display an error log and abort the installation.
;	R8 - Error message
;	R9 - Log filename

Function AbortDisplayLogOption

	; Display a message box with the error
	MessageBox MB_YESNO|MB_ICONSTOP "$R8$\r$\n$\r$\nWould you like to view the error log '$R9'?" /SD IDNO IDYES adlo_show_error_log

	; If the user selects NO, simply abort the installation
	DetailPrint "$R8"
	Abort "$R8"
	Return

	adlo_show_error_log:
		; Otherwise show the error log first
		ExecShell "open" "$R9"
		DetailPrint "$R8"
		Abort "$R8"
		Return

FunctionEnd

; CreateTemplatePostGIS - create the template_postgis db by loading in the postgis.sql and spatial_ref_sys.sql files.
Function EnablePostGISPgAdminPlugin
; Display a message box offering to overwrite
	MessageBox MB_YESNO "Would you like to enable the shp2pgsql graphical loader plugin in PostgreSQL PgAdmin III? $\r$\n If you choose Yes, this will overwrite the plugins.ini in your PostgreSQL PgAdminIII subfolder and back it up to plugins.ini.bak. $\r$\n If you choose No, you can later replace your plugins.ini $\r$\nwith the plugins.postgis.ini file in your PgAdminIII PostgreSQL install folder?" /SD IDYES IDYES overwrite_pluginsini
	Return
	overwrite_pluginsini:
	  CopyFiles /SILENT /FILESONLY "$INSTDIR\PgAdmin III\plugins.ini" "$INSTDIR\PgAdmin III\plugins.ini.bak"
	  CopyFiles /SILENT /FILESONLY "$INSTDIR\PgAdmin III\plugins.postgis.ini" "$INSTDIR\PgAdmin III\plugins.ini"
  
	  Return
FunctionEnd