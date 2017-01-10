"# geonode-win-installer" 

In order to compile the installer:

1. Make sure you have correctly installed and configured NSIS on you system:

   a) Install "NSIS Plugins/nsis-2.49-setup.exe"
   
   b) Copy and replace "NSIS Plugins/plugins/*.*" into "C:/Program Files (x86)/NSIS/"
   
2. Downlaod the "geonode-2.5.5.zip" source folder from https://github.com/GeoNode/geonode/archive/2.5.5.zip

3. Download "geoserver.war" from http://build.geonode.org/geoserver/latest/geoserver-2.9.x.war

4. Download "data.zip" from http://build.geonode.org/geoserver/latest/data-2.9.x.zip

5. Build "postgis-pg84-setup-1.5.4-2.exe"; Compile with NSIS the file "postgis-pg84-1.5.4-installersrc/win32inst/postgis.nsi"
   Move the "postgis-pg84-setup-1.5.4-2.exe" into the GeoNode installer root dir

6. Build "WinLAMP.4.0.0-geonode.exe"; Compile with NSIS the file "WinLAMP.4.0.0-developer/WinLAMP.4.0.0-geonode.nsi"
   Move the "WinLAMP.4.0.0-geonode.exe" into the GeoNode installer root dir

7. Compile "GeoNode-install.nsi" with NSIS
