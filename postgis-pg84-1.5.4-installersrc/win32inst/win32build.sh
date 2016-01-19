#!/bin/sh

# Win32 PostGIS for PostgreSQL build script written by Mark Cave-Ayland
# Copyright 2006

# The dcmms directory should be copied into the postgis-1.x.x directory created
# by untarring the postgis-1.x.x.tar.gz file.
#
# IMPORTANT:
# Before running this script, first apply any patches in the patches/ subdirectory
# to the source tree. If any of the patches make changes to configure.in, you will
# also need to run ./autogen.sh supplied with PostGIS before running this script.


# Installation directories - should be the same as those passed as
# configure --prefix=<DIR> at build time
PGSQL_DIR=/home/mca/pg83/rel-8.3.1
GEOS_DIR=/home/mca/geos/rel-3.1.0
PROJ_DIR=/home/mca/proj/rel-4.6.1

# Directory of running PostgreSQL instance
PGSQL_RUNDIR="/c/Program Files/PostgreSQL/8.3"

# PostGIS JDBC version and path to the PostgreSQL driver JAR file
JDBC_VERSION=1.3.6
JDBC_PGJAR="/c/Program Files/PostgreSQL/8.1/jdbc/postgresql-8.1-405.jdbc2.jar"

# Connection details for regression test database
REG_PGUSER=pg83
REG_PGPORT=5483

# Directory containing pre-compiled libxslt/xsltproc
LIBXSLT=/home/mca/xslt/bin

# Path to longname relative to win32dist directory
# This converts short pathnames (8.3) from pg_config back to their original form
PATH=$PATH:../win32inst/longname
LONGNAME=longname

# Pointer to a libiconv-2.dll file to include
LIBICONVDLL=/home/mca/iconv/rel-1.12.0/bin/libiconv-2.dll

# Path to Ant installation directory (required for JDBC drivers)
ANTPATH=/home/mca/apache-ant-1.7.0


# Save current directory
pushd .
cd ..

# First build PostGIS with a reference to ICONV and execute regression tests
echo "#### Building PostGIS..."
pushd .
PATH=$LIBXSLT:$PATH ./configure --with-pgsql=$PGSQL_DIR/bin/pg_config.exe --with-geos=$GEOS_DIR/bin/geos-config --with-proj=$PROJ_DIR

# Bug report from Akio Takubo: stripped versions of liblwgeom.dll do not load correctly under WinXP SP2
# Japanese edition. Therefore we manually remove the debug (-g) option from the resulting Makefile in
# order to keep the size of the resulting executable reasonable.
cp lwgeom/Makefile lwgeom/Makefile.tmp
cat lwgeom/Makefile.tmp | sed 's/\-Wall \-g/\-Wall/g' > lwgeom/Makefile

# Execute make
CFLAGS="-I$PGSQL_DIR/include -L$PGSQL_DIR/lib" make

# Also build the documentation
echo "#### Building HTML documentation..."
cd doc
PATH=$LIBXSLT:$PATH make
cd ..

echo "#### Running regression tests..."
cp lwgeom/liblwgeom.dll `"$PGSQL_RUNDIR/bin/pg_config" --libdir`
cp $GEOS_DIR/bin/libgeos-3-1-0.dll `"$PGSQL_RUNDIR/bin/pg_config" --bindir`
cp $GEOS_DIR/bin/libgeos_c-1.dll `"$PGSQL_RUNDIR/bin/pg_config" --bindir`
cp $PROJ_DIR/lib/libproj.dll `"$PGSQL_RUNDIR/bin/pg_config" --bindir`
cp loader/shp2pgsql.exe `"$PGSQL_RUNDIR/bin/pg_config" --bindir`
cp loader/pgsql2shp.exe `"$PGSQL_RUNDIR/bin/pg_config" --bindir`
PATH="$PGSQL_RUNDIR/bin:$PGSQL_RUNDIR/lib:$PATH" PGUSER=$REG_PGUSER PGPORT=$REG_PGPORT make test
rm `"$PGSQL_RUNDIR/bin/pg_config" --bindir`"/pgsql2shp.exe"
rm `"$PGSQL_RUNDIR/bin/pg_config" --bindir`"/shp2pgsql.exe"
rm `"$PGSQL_RUNDIR/bin/pg_config" --bindir`"/libproj.dll"
rm `"$PGSQL_RUNDIR/bin/pg_config" --bindir`"/libgeos_c-1.dll"
rm `"$PGSQL_RUNDIR/bin/pg_config" --bindir`"/libgeos-3-1-0.dll"

echo "#### Building topology SQL file..."
cd topology
make
popd

# Build the JDBC drivers
echo "#### Building PostGIS JDBC drivers..."
pushd .
cd java/jdbc
PATH=$ANTPATH/bin:$PATH ant -Dclasspath="$JDBC_PGJAR"
popd

# Build the longname utility to help us build
echo "#### Building longname..."
pushd win32inst/longname
make
popd


# Copy the files we want to a distribution directory
echo "#### Generating Win32 dist directory..."
rm -rf win32dist
mkdir win32dist
cd win32dist


# Path mangling: different versions of PostgreSQL have different
# locations for various files such as DLL and share/. So we deduce
# the BASEDIR for the install using pg_config --bindir which returns
# the bin/ path in pg_config format, and then remove the "bin" to
# find the base path. We use the longname utility to preserve the
# long directory names in Win32 from the short pg_config originals.
BASEDIR=`"$PGSQL_RUNDIR/bin/pg_config" --bindir | sed "s#\([^.]\)bin#\1#" | $LONGNAME`

## bin directory
BINDIR=`"$PGSQL_RUNDIR/bin/pg_config" --bindir | $LONGNAME | sed "s#$BASEDIR##"`
mkdir $BINDIR

cp $GEOS_DIR/bin/libgeos-3-1-0.dll $BINDIR
cp $GEOS_DIR/bin/libgeos_c-1.dll $BINDIR
cp $PROJ_DIR/lib/libproj.dll $BINDIR

cp ../loader/pgsql2shp.exe $BINDIR
cp ../loader/shp2pgsql.exe $BINDIR

## pkglib directory
PKGLIBDIR=`"$PGSQL_RUNDIR/bin/pg_config" --pkglibdir | $LONGNAME | sed "s#$BASEDIR##"`
mkdir -p $PKGLIBDIR


## doc directory
DOCDIR=`"$PGSQL_RUNDIR/bin/pg_config" --docdir | $LONGNAME | sed "s#$BASEDIR##"`
#echo "BASEDIR: $BASEDIR"
#echo "DOCDIR: $DOCDIR"
mkdir -p $DOCDIR/contrib/html/postgis

cp ../README.postgis $DOCDIR/contrib
cp ../loader/README.shp2pgsql $DOCDIR/contrib
cp ../loader/README.pgsql2shp $DOCDIR/contrib
cp ../doc/html/*.html $DOCDIR/contrib/html/postgis
cp ../doc/html/style.css $DOCDIR/contrib/html/postgis

mkdir -p $DOCDIR/contrib/html/postgis/jdbc
cp -R ../java/jdbc/javadoc-build/* $DOCDIR/contrib/html/postgis/jdbc


## share directory
SHAREDIR=`"$PGSQL_RUNDIR/bin/pg_config" --sharedir | $LONGNAME | sed "s#$BASEDIR##"`
mkdir -p $SHAREDIR/contrib/postgis

cp ../lwpostgis.sql $SHAREDIR/contrib
cp ../spatial_ref_sys.sql $SHAREDIR/contrib
cp ../postgis_comments.sql $SHAREDIR/contrib

mkdir -p $SHAREDIR/contrib/postgis/utils

cp ../utils/create_undef.pl $SHAREDIR/contrib/postgis/utils
cp ../utils/postgis_restore.pl $SHAREDIR/contrib/postgis/utils
cp ../utils/postgis_proc_upgrade.pl $SHAREDIR/contrib/postgis/utils
cp ../lwpostgis_upgrade.sql $SHAREDIR/contrib/postgis

mkdir -p $SHAREDIR/contrib/postgis/topology
cp ../topology/README $SHAREDIR/contrib/postgis/topology/
cp ../topology/topology.sql $SHAREDIR/contrib/postgis/topology/

mkdir -p $SHAREDIR/contrib/postgis/proj
cp $PROJ_DIR/share/proj/* $SHAREDIR/contrib/postgis/proj


## jdbc directory
mkdir jdbc

cp ../java/jdbc/postgis_$JDBC_VERSION.jar jdbc


# Strip any DLL and EXE files in the distribution tree
find -name *.dll | xargs strip
find -name *.exe | xargs strip

# Finally copy the unstripped liblwgeom.dll into the distribution tree
cp ../lwgeom/liblwgeom.dll "$PKGLIBDIR"


# Pop directory
popd

# Generate the .nsh include files by scanning the directories
echo "#### Generating NSIS file lists for win32dist distribution directory..."

# First output any useful paths for NSIS (for example DOCDIR is needed
# to point the menus to the right place) with \s rather than /s
echo "; Paths for this PostgreSQL installation" > paths.nsh
echo "!define PATH_DOCDIR $DOCDIR" | sed 's#/#\\#g' >> paths.nsh
echo "!define PATH_SHAREDIR $SHAREDIR" | sed 's#/#\\#g' >> paths.nsh

# Create an initial entry for libiconv-2.dll - we only overwrite if it doesn't already exist
echo "SetOverWrite off" > inputfiles.nsh
echo "SetOutPath \"\$INSTDIR\bin\"" >> inputfiles.nsh
echo "File \"\${WIN32DIST_DIR}\bin\libiconv-2.dll\"" >> inputfiles.nsh
echo "SetOverWrite on" >> inputfiles.nsh

# Generate the remainder of the input files
./geninputfiles.sh >> inputfiles.nsh

# Now we've built the file list, copy the libiconv dll into the bin directory
# so that we don't include it in the standard overwrite file listing
cp $LIBICONVDLL ../win32dist/$BINDIR

# Generate the uninstall file list
./genuninstallfiles.sh > uninstallfiles.nsh.tmp

# Remove libiconv-2.dll from the output uninstall list
cat uninstallfiles.nsh.tmp | grep -v libiconv > uninstallfiles.nsh
rm uninstallfiles.nsh.tmp

# Completed
echo "#### Done. The complete distribution can be found in the ../win32dist/ directory."
