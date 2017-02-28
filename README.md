"# geonode-win-installer" 

In order to compile the installer:

1. Make sure you have correctly installed and configured NSIS on you system:

   a) Install "NSIS Plugins/nsis-2.49-setup.exe"
   
   b) Copy and replace "NSIS Plugins/plugins/*.*" into "C:/Program Files (x86)/NSIS/"
   
2. Downlaod the "geonode-master.zip" source folder from https://github.com/GeoNode/geonode/archive/master.zip

3. Download and rename to "geoserver.war" from http://build.geonode.org/geoserver/latest/geoserver-2.9.x-oauth2.war

4. Download and rename to "data.zip" from http://build.geonode.org/geoserver/latest/data-2.9.x-oauth2.zip

5. Download "postgresql-9.6.2-2-windows.exe" from https://get.enterprisedb.com/postgresql/postgresql-9.6.2-2-windows.exe

6. Build "WinLAMP.4.0.0-geonode.exe"; Compile with NSIS the file "WinLAMP.4.0.0-developer/WinLAMP.4.0.0-geonode.nsi"
   Move the "WinLAMP.4.0.0-geonode.exe" into the GeoNode installer root dir

7. Compile "GeoNode-install.nsi" with NSIS
