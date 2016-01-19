/*
 * Convert short filenames to long filenames
 *
 * Used for PostGIS builds to allow us to mimic the
 * directory structure of multiple PostgreSQL
 * versions using pg_config output
 *
 * (C) Copyright 2007 Mark Cave-Ayland
 *
 * Distributed under the GPLv2 license
 */

#define _WIN32_WINNT 0x500

#include <stdio.h>
#include <windows.h>



int WINAPI WinMain (HINSTANCE hInstance, 
					HINSTANCE hPrevInstance, 
					PSTR szCmdLine, 
					int iCmdShow) 
{
	char strPath[256];
	char longPath[MAX_PATH];

	char buffer[2];
	int len;

	strPath[0] = '\0';

	while(len = read(0, buffer, 1))
	{	
		buffer[len] = '\0';
		
		if (buffer[0] == '\n')
		{
			/* Do the conversion */
			GetLongPathName(strPath, longPath, MAX_PATH);
			printf("%s\n", longPath);

			strPath[0] = '\0';
		}
		else
		{
			/* Otherwise append path */
			strncat(strPath, buffer, sizeof(strPath));
		}
	}

	return (0);
}
