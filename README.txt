GeoNode Startup
===============

    To run GeoNode on Windows:

    1. Start GeoServer Service
	   GeoServer is running under Apache Tomcat7 which is installed as a "service" on your system.
	   The service should start automatically, however before starting GeoNode, make sure the Apache Tomcat7 is up and running.
       
    2. Start GeoNode
       This shortcut redirects you to the http://localhost, the GeoNode home page, on your default browser.

    The default GeoNode administrator is:
      username: admin
      password: admin

GeoNode Support
===============

    To get support, give feedbacks and suggestions please use the GeoNode official channels, the users mailing list: 
    http://lists.osgeo.org/pipermail/geonode-users/ and the developers mailing list: http://lists.osgeo.org/pipermail/geonode-devel/.

    This repository is used to track code changes and GeoNode issues, please DON'T open new issues to ask for support.

Notes on the installation
=========================

	a. Notice that sometimes the Apache HTTPD web service does not start automatically right after
	   the installation due to the system environment.
	   In that case, after the installation, run the "Apache2 Start" from the WinLAMP shortcut.
	   
	   Also please check through the Windows Services that the two services "Apache Tomcat7" and "Apache2"
	   are up and running.
	   
    b. If you have issues starting GeoNode, try to run the "GeoNode VirtualEnv Setup" shortcut.
       Make sure all the GeoNode Python dependencies have been correctly installed on the
       Virtual Environment.
       
       In case of problems, please ask for support on the mailing lists.