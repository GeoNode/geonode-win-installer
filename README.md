"# geonode-win-installer" 

In order to compile the installer:

1. Make sure you have correctly installed and configured NSIS on you system:

   a) Install "NSIS Plugins/nsis-2.49-setup.exe"
   
   b) Copy and replace "NSIS Plugins/plugins/*.*" into "C:/Program Files (x86)/NSIS/"
   
2. Downlaod the "geonode-2.4.x.zip" source folder from https://github.com/GeoNode/geonode/archive/2.4.x.zip

3. Download "geoserver.war" from http://build.geonode.org/geoserver/latest/geoserver.war

4. Download "data.zip" from http://build.geonode.org/geoserver/latest/data.zip

5. Compile "GeoNode-install.nsi" with NSIS