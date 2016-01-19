set PGPORT=5432
set PGHOST=localhost
set PGUSER=postgres
set PGPASSWORD=yourpasswordhere
set THEDB=template_postgis15
set PGBIN=C:\Program Files\PostgreSQL\8.4\bin\
set PGLIB=C:\Program Files\PostgreSQL\8.4\lib\
set POSTGISVER=1.5
xcopy bin\*.* "%PGBIN%"
xcopy /I /S bin\postgisgui\* "%PGBIN%\postgisgui"
xcopy lib\*.* "%PGLIB%"
"%PGBIN%\psql"  -c "CREATE DATABASE %THEDB%"
"%PGBIN%\psql"  -d "%THEDB%" -c "CREATE LANGUAGE plpgsql"
"%PGBIN%\psql"  -d "%THEDB%" -f "share\contrib\postgis-%POSTGISVER%\postgis.sql"
"%PGBIN%\psql"  -d "%THEDB%" -f "share\contrib\postgis-%POSTGISVER%\spatial_ref_sys.sql"
"%PGBIN%\psql"  -d "%THEDB%" -f "share\contrib\postgis-%POSTGISVER%\postgis_comments.sql"

REM Uncomment the below line if this is a template database
REM "%PGBIN%\psql" -d "%THEDB%" -c "UPDATE pg_database SET datistemplate = true WHERE datname = '%THEDB%';GRANT ALL ON geometry_columns TO PUBLIC; GRANT ALL ON spatial_ref_sys TO PUBLIC"


pause