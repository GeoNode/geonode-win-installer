Name "Unzip32"
OutFile "Unzip32.exe"

!addplugindir "."
!include "WinMessages.nsh"

Var BANNER
Var COUNT
Var ARCHIVE

Function .onInit
	#Simple unpack
	nsUnzip::Extract "Test1.zip" /d=Test /END
	Pop $0
	MessageBox MB_OK "Simple unpack.$\nResult: $0"


	#With password ask
	GetFunctionAddress $0 PasswordCallback
	nsUnzip::Extract "Test2.zip" /d=Test /callP=$0 /END
	Pop $0
	MessageBox MB_OK "Unpack with password.$\nResult: $0"


	#List archive
	GetFunctionAddress $0 VerboseCallback
	nsUnzip::Extract "Test3.zip" /d=Test /callV=$0 /END
	Pop $0
	MessageBox MB_OK "List archive.$\nResult: $0"


	#With progress
	Banner::show /NOUNLOAD "Preparing.."
	Banner::getWindow /NOUNLOAD
	Pop $0
	GetDlgItem $BANNER $0 1030

	GetFunctionAddress $0 ServiceCallback
	nsUnzip::Extract "Test4.zip" /d=Test /callS=$0 /END
	Pop $0

	Banner::destroy
	MessageBox MB_OK "Unpack with progress.$\nResult: $0"


	Quit
FunctionEnd

Function PasswordCallback
	Pop $0  ;Archive name

	#Show password dialog.
	nsUnzip::GetPassword /NOUNLOAD "nsUnzip plugin" 'Password (correct: "123")' "$0" "OK" "Cancel"
	Pop $0

	Push $0 #Archive password
FunctionEnd

Function VerboseCallback
	Pop $0  ;File name
	Pop $1  ;Uncompressed size
	Pop $2  ;Compressed size
	Pop $3  ;CRC: ff00ff00
	Pop $4  ;Compress ratio
	Pop $5  ;File date: "dd.MM.yy"
	Pop $6  ;File time: "hh:mm"
	Pop $7  ;Method: "Stored", "Shrunk", "Reduce1", "Reduce2", "Reduce3", "Reduce4", "Implode", "Token", "Defl:#", "Def64#", "ImplDCL", "PKres11", "BZip2", "Unk:###"
	Pop $8  ;Encrypted: "E" or not " "
	MessageBox MB_OK "$$0={$0}$\n$$1={$1}$\n$$2={$2}$\n$$3={$3}$\n$$4={$4}$\n$$5={$5}$\n$$6={$6}$\n$$7={$7}$\n$$8={$8}"
FunctionEnd

Function ServiceCallback
	Pop $0  ;Archive name
	Pop $1  ;Archive size
	Pop $2  ;Entry file name
	Pop $3  ;Entry uncompressed size
	Pop $4  ;Entry compressed size
	Pop $5  ;Entry CRC: ff00ff00

	#Calculate percentage
	StrCmp $ARCHIVE $0 +3
	StrCpy $COUNT 0
	StrCpy $ARCHIVE $0

	IntOp $COUNT $COUNT + $4
	IntOp $R0 $COUNT * 100
	IntOp $R0 $R0 / $1
	SendMessage $BANNER ${WM_SETTEXT} 0 `STR:Extracting: "$0"... $R0%`
	Sleep 1000

	#Use "SetErrors" for stop extracting
FunctionEnd

Section
SectionEnd
