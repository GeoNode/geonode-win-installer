PostGIS 1.3,1.4,1.5,2.0 can coexist in the same PostgreSQL server, but must be installed in separate databases.  This makes it a little easier to cross test different versions.  
However -- all versions will share the same proj (sharing of proj may change for PostGIS 2.0 before release) and geos dlls so you
may want to back these up libproj.dll, geos*.dll, shp2pgsql, pgsql2shp, libxml2-2.dll, postgisgui in the bin folder of your PostgreSQL install before continuing. 

-- create a postgis enabled database --
1) Edit the batch script changing ports etc. to your settings
2) You should uncomment the dattemplate line to make it a template database if you want
3) Run the batch script

-- THE SHP2PGSQL-GUI -- 
The shp2pgsql-gui can run standalone or as a plugin under PgAdminIII. To run under a PgAdminIII install,
1) copy the postgis-gui folder to your bin directory which is identified in PgAdminIII -> Options -> General -> PG-binpath
2) In PgAdmin I.13+,copy the plugins.d folder to your PgAdmin III folder.  The script should do this for you.

----Start here --
The way to install plugins for pgAdmin III has changed in 1.13.  Please refer to for details below if you are running PgAdmin 1.13 or above
http://www.postgresonline.com/journal/archives/180-PgAdmin-III-1.13-change-in-plugin-architecture-and-PostGIS-Plugins.html

--- End Here --

--NOTE FOR UPGRADERS --
PostGIS 1.5, 1.4,1.3,2.0  can coexist on the same PostgreSQL install but must reside in different databases, but if you wish to maintain more than one
, setup a separately named template database so as to not get confused.


The only caveat is that there can only be one proj and one geos install, so when you copy the above, you 
will automatically upgrade your proj to 4.6.1.


If you are upgrading from 1.3 or 1.4 to 1.5 you can use the soft upgrade approach
-- SOFT UPGRADE --
In the share/postgis-1.5 folder -- there are postgis_upgrade_*.sql files.  Run the respective one to upgrade your install.
If  you are not sure which version you are currently running, run the query:
SELECT postgis_full_version();

-- HARD UPGRADE
1) Backup your existing database with PgAmin III (make sure not to choose drop objects before restore)
2) Create a new postgis database using the above instructions
3) Restore your backup into this new postgis db (again you can use PgAdmin III for this).  You'll get a lot of errors that you can safely ignore.

NOTE: For PostgreSQL 9.0 the escape default has changed.
If you are having trouble viewing your geometries in your desktop app, set this setting in your db
ALTER DATABASE my_database_name_goes_here SET bytea_output to 'escape'; 