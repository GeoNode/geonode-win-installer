
--
-- UPGRADE SCRIPT FROM PostGIS 1.4 TO PostGIS 1.5
--

BEGIN;

CREATE OR REPLACE FUNCTION postgis_major_version_check()
RETURNS text
AS '
DECLARE
	old_scripts text;
	new_scripts text;
	old_maj text;
	new_maj text;
BEGIN
	--
	-- This uses postgis_lib_version() rather then
	-- postgis_scripts_installed() as in 1.0 because
	-- in the 1.0 => 1.1 transition that would result
	-- in an impossible upgrade:
	--
	--   from 0.3.0 to 1.1.0
	--
	-- Next releases will still be ok as
	-- postgis_lib_version() and postgis_scripts_installed()
	-- would both return actual PostGIS release number.
	-- 
	SELECT into old_scripts postgis_lib_version();
	SELECT into new_scripts ''1.5'';
	SELECT into old_maj substring(old_scripts from 1 for 2);
	SELECT into new_maj substring(new_scripts from 1 for 2);

	IF old_maj != new_maj THEN
		RAISE EXCEPTION ''Upgrade from version % to version % requires a dump/reload. See PostGIS manual for instructions'', old_scripts, new_scripts;
	ELSE
		RETURN ''Scripts versions checked for upgrade: ok'';
	END IF;
END
'
LANGUAGE 'plpgsql';

SELECT postgis_major_version_check();

DROP FUNCTION postgis_major_version_check();
CREATE OR REPLACE FUNCTION st_spheroid_in(cstring)
	RETURNS spheroid
	AS '$libdir/postgis-1.5','ellipsoid_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_spheroid_out(spheroid)
	RETURNS cstring
	AS '$libdir/postgis-1.5','ellipsoid_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION spheroid_in(cstring)
	RETURNS spheroid
	AS '$libdir/postgis-1.5','ellipsoid_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION spheroid_out(spheroid)
	RETURNS cstring
	AS '$libdir/postgis-1.5','ellipsoid_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_in(cstring)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_out(geometry)
	RETURNS cstring
	AS '$libdir/postgis-1.5','LWGEOM_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_analyze(internal)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_analyze'
	LANGUAGE 'C' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_recv(internal)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_recv'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_send(geometry)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_send'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_in(cstring)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_out(geometry)
	RETURNS cstring
	AS '$libdir/postgis-1.5','LWGEOM_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_analyze(internal)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_analyze'
	LANGUAGE 'C' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION geometry_recv(internal)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_recv'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_send(geometry)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_send'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Affine(geometry,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_affine'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Affine(geometry,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8,float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_affine'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Affine(geometry,float8,float8,float8,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  $2, $3, 0,  $4, $5, 0,  0, 0, 1,  $6, $7, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Affine(geometry,float8,float8,float8,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  $2, $3, 0,  $4, $5, 0,  0, 0, 1,  $6, $7, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION RotateZ(geometry,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  cos($2), -sin($2), 0,  sin($2), cos($2), 0,  0, 0, 1,  0, 0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_RotateZ(geometry,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  cos($2), -sin($2), 0,  sin($2), cos($2), 0,  0, 0, 1,  0, 0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Rotate(geometry,float8)
	RETURNS geometry
	AS 'SELECT rotateZ($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Rotate(geometry,float8)
	RETURNS geometry
	AS 'SELECT rotateZ($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION RotateX(geometry,float8)
	RETURNS geometry
	AS 'SELECT affine($1, 1, 0, 0, 0, cos($2), -sin($2), 0, sin($2), cos($2), 0, 0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_RotateX(geometry,float8)
	RETURNS geometry
	AS 'SELECT affine($1, 1, 0, 0, 0, cos($2), -sin($2), 0, sin($2), cos($2), 0, 0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION RotateY(geometry,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  cos($2), 0, sin($2),  0, 1, 0,  -sin($2), 0, cos($2), 0,  0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_RotateY(geometry,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  cos($2), 0, sin($2),  0, 1, 0,  -sin($2), 0, cos($2), 0,  0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Translate(geometry,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1, 1, 0, 0, 0, 1, 0, 0, 0, 1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Translate(geometry,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1, 1, 0, 0, 0, 1, 0, 0, 0, 1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Translate(geometry,float8,float8)
	RETURNS geometry
	AS 'SELECT translate($1, $2, $3, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Translate(geometry,float8,float8)
	RETURNS geometry
	AS 'SELECT translate($1, $2, $3, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Scale(geometry,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  $2, 0, 0,  0, $3, 0,  0, 0, $4,  0, 0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Scale(geometry,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  $2, 0, 0,  0, $3, 0,  0, 0, $4,  0, 0, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Scale(geometry,float8,float8)
	RETURNS geometry
	AS 'SELECT scale($1, $2, $3, 1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Scale(geometry,float8,float8)
	RETURNS geometry
	AS 'SELECT scale($1, $2, $3, 1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION transscale(geometry,float8,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  $4, 0, 0,  0, $5, 0,
		0, 0, 1,  $2 * $4, $3 * $5, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_transscale(geometry,float8,float8,float8,float8)
	RETURNS geometry
	AS 'SELECT affine($1,  $4, 0, 0,  0, $5, 0,
		0, 0, 1,  $2 * $4, $3 * $5, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION shift_longitude(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_longitude_shift'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_shift_longitude(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_longitude_shift'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box3d_in(cstring)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box3d_out(box3d)
	RETURNS cstring
	AS '$libdir/postgis-1.5', 'BOX3D_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d_in(cstring)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d_out(box3d)
	RETURNS cstring
	AS '$libdir/postgis-1.5', 'BOX3D_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d_extent_in(cstring)
	RETURNS box3d_extent
	AS '$libdir/postgis-1.5', 'BOX3D_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d_extent_out(box3d_extent)
	RETURNS cstring
	AS '$libdir/postgis-1.5', 'BOX3D_extent_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d_extent(box3d_extent)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_extent_to_BOX3D'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box2d(box3d_extent)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX3D_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry(box3d_extent)
	RETURNS geometry
	AS '$libdir/postgis-1.5','BOX3D_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION xmin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_xmin'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_XMin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_xmin'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ymin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_ymin'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_YMin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_ymin'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION zmin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_zmin'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_ZMin(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_zmin'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION xmax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_xmax'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_XMax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_xmax'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ymax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_ymax'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_YMax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_ymax'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION zmax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_zmax'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_ZMax(box3d)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','BOX3D_zmax'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION chip_in(cstring)
	RETURNS chip
	AS '$libdir/postgis-1.5','CHIP_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION chip_out(chip)
	RETURNS cstring
	AS '$libdir/postgis-1.5','CHIP_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_chip_in(cstring)
	RETURNS chip
	AS '$libdir/postgis-1.5','CHIP_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_chip_out(chip)
	RETURNS cstring
	AS '$libdir/postgis-1.5','CHIP_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box2d_in(cstring)
	RETURNS box2d
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box2d_out(box2d)
	RETURNS cstring
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box2d_in(cstring)
	RETURNS box2d
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_in'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box2d_out(box2d)
	RETURNS cstring
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_out'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_lt(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_lt'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_le(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_le'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_gt(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_gt'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_ge(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_ge'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_eq(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_eq'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_cmp(geometry, geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5', 'lwgeom_cmp'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_lt(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_lt'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_le(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_le'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_gt(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_gt'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_ge(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_ge'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_eq(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'lwgeom_eq'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_cmp(geometry, geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5', 'lwgeom_cmp'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_gist_sel (internal, oid, internal, int4)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_gist_sel'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION postgis_gist_joinsel(internal, oid, internal, smallint)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_gist_joinsel'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION st_postgis_gist_sel (internal, oid, internal, int4)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_gist_sel'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION st_postgis_gist_joinsel(internal, oid, internal, smallint)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_gist_joinsel'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION st_geometry_overleft(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overleft'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_overright(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overright'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_overabove(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overabove'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_overbelow(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overbelow'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_left(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_left'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_right(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_right'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_above(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_above'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_below(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_below'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_contain(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_contain'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_contained(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_contained'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_overlap(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overlap'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry_same(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_samebox'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_same(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_samebox'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_gist_sel (internal, oid, internal, int4)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_gist_sel'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geometry_gist_joinsel(internal, oid, internal, smallint)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_gist_joinsel'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geometry_overleft(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overleft'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_overright(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overright'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_overabove(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overabove'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_overbelow(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overbelow'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_left(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_left'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_right(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_right'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_above(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_above'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_below(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_below'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_contain(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_contain'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_contained(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_contained'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_overlap(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_overlap'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry_samebox(geometry, geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_samebox'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LWGEOM_gist_consistent(internal,geometry,int4)
	RETURNS bool
	AS '$libdir/postgis-1.5' ,'LWGEOM_gist_consistent'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION LWGEOM_gist_compress(internal)
	RETURNS internal
	AS '$libdir/postgis-1.5','LWGEOM_gist_compress'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION LWGEOM_gist_penalty(internal,internal,internal)
	RETURNS internal
	AS '$libdir/postgis-1.5' ,'LWGEOM_gist_penalty'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION LWGEOM_gist_picksplit(internal, internal)
	RETURNS internal
	AS '$libdir/postgis-1.5' ,'LWGEOM_gist_picksplit'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION LWGEOM_gist_union(bytea, internal)
	RETURNS internal
	AS '$libdir/postgis-1.5' ,'LWGEOM_gist_union'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION LWGEOM_gist_same(box2d, box2d, internal)
	RETURNS internal
	AS '$libdir/postgis-1.5' ,'LWGEOM_gist_same'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION LWGEOM_gist_decompress(internal)
	RETURNS internal
	AS '$libdir/postgis-1.5' ,'LWGEOM_gist_decompress'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION addbbox(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_addBBOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_addbbox(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_addBBOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION dropbbox(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_dropBBOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_dropbbox(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_dropBBOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION getsrid(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5','LWGEOM_getSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION getbbox(geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_getbbox(geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION hasbbox(geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_hasBBOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_hasbbox(geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_hasBBOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION srid(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_srid(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION height(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getHeight'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_height(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getHeight'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION factor(chip)
	RETURNS FLOAT4
	AS '$libdir/postgis-1.5','CHIP_getFactor'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_factor(chip)
	RETURNS FLOAT4
	AS '$libdir/postgis-1.5','CHIP_getFactor'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION width(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getWidth'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_width(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getWidth'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION datatype(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getDatatype'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_datatype(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getDatatype'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION compression(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getCompression'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_compression(chip)
	RETURNS int4
	AS '$libdir/postgis-1.5','CHIP_getCompression'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION setSRID(chip,int4)
	RETURNS chip
	AS '$libdir/postgis-1.5','CHIP_setSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION setFactor(chip,float4)
	RETURNS chip
	AS '$libdir/postgis-1.5','CHIP_setFactor'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_setFactor(chip,float4)
	RETURNS chip
	AS '$libdir/postgis-1.5','CHIP_setFactor'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION mem_size(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_mem_size'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_mem_size(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_mem_size'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION summary(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5', 'LWGEOM_summary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_summary(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5', 'LWGEOM_summary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION npoints(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_npoints'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_npoints(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_npoints'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION nrings(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_nrings'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_nrings(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_nrings'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION length3d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_length_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_length3d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_length_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION length2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_length2d_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_length2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_length2d_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION length(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_length_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Length(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_length2d_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION length3d_spheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_length_ellipsoid_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_length3d_spheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_length_ellipsoid_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION length_spheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_length_ellipsoid_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_length_spheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_length_ellipsoid_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION length2d_spheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_length2d_ellipsoid'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_length2d_spheroid(geometry, spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_length2d_ellipsoid'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION perimeter3d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_perimeter_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_perimeter3d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_perimeter_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION perimeter2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_perimeter2d_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_perimeter2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_perimeter2d_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION perimeter(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_perimeter_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Perimeter(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_perimeter2d_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION area2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_area_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_area2d(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'LWGEOM_area_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION area(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_area_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Area(geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_area_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION distance_spheroid(geometry,geometry,spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_distance_ellipsoid'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_distance_spheroid(geometry,geometry,spheroid)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_distance_ellipsoid'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION distance_sphere(geometry,geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_distance_sphere'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_distance_sphere(geometry,geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5','LWGEOM_distance_sphere'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION distance(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_mindistance2d'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Distance(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_mindistance2d'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION point_inside_circle(geometry,float8,float8,float8)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_inside_circle_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_point_inside_circle(geometry,float8,float8,float8)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_inside_circle_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION azimuth(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_azimuth'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_azimuth(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_azimuth'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION force_2d(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_force_2d(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION force_3dz(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_3dz'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_force_3dz(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_3dz'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION force_3d(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_3dz'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_force_3d(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_3dz'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION force_3dm(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_3dm'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_force_3dm(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_3dm'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION force_4d(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_4d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_force_4d(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_4d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION force_collection(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_collection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_force_collection(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_collection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_CollectionExtract(geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'ST_CollectionExtract'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION multi(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_multi'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_multi(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_force_multi'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION expand(box3d,float8)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Expand(box3d,float8)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION expand(box2d,float8)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX2DFLOAT4_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_expand(box2d,float8)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX2DFLOAT4_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION expand(geometry,float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_expand(geometry,float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION envelope(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_envelope'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Envelope(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_envelope'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION reverse(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_reverse'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Reverse(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_reverse'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ForceRHR(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_forceRHR_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_ForceRHR(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_forceRHR_poly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION noop(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_noop'
	LANGUAGE 'C' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION postgis_noop(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_noop'
	LANGUAGE 'C' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION zmflag(geometry)
	RETURNS smallint
	AS '$libdir/postgis-1.5', 'LWGEOM_zmflag'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_zmflag(geometry)
	RETURNS smallint
	AS '$libdir/postgis-1.5', 'LWGEOM_zmflag'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ndims(geometry)
	RETURNS smallint
	AS '$libdir/postgis-1.5', 'LWGEOM_ndims'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_NDims(geometry)
	RETURNS smallint
	AS '$libdir/postgis-1.5', 'LWGEOM_ndims'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsEWKT(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asEWKT'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsEWKT(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asEWKT'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsEWKB(geometry)
	RETURNS BYTEA
	AS '$libdir/postgis-1.5','WKBFromLWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsEWKB(geometry)
	RETURNS BYTEA
	AS '$libdir/postgis-1.5','WKBFromLWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsHEXEWKB(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asHEXEWKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsHEXEWKB(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asHEXEWKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsHEXEWKB(geometry, text)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asHEXEWKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsHEXEWKB(geometry, text)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asHEXEWKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsEWKB(geometry,text)
	RETURNS bytea
	AS '$libdir/postgis-1.5','WKBFromLWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsEWKB(geometry,text)
	RETURNS bytea
	AS '$libdir/postgis-1.5','WKBFromLWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomFromEWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOMFromWKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromEWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOMFromWKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomFromEWKT(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','parse_WKT_lwgeom'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromEWKT(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','parse_WKT_lwgeom'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_cache_bbox()
	RETURNS trigger
	AS '$libdir/postgis-1.5', 'cache_bbox'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION MakePoint(float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakePoint(float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakePoint(float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakePoint(float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakePoint(float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakePoint(float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakePointM(float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint3dm'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakePointM(float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint3dm'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakeBox2d(geometry, geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX2DFLOAT4_construct'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakeBox2d(geometry, geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX2DFLOAT4_construct'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakeBox3d(geometry, geometry)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_construct'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakeBox3d(geometry, geometry)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_construct'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION makeline_garray (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makeline_garray'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakeLine_GArray (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makeline_garray'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakeLine (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makeline_garray'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineFromMultiPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_from_mpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LineFromMultiPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_from_mpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakeLine(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makeline'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakeLine(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makeline'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AddPoint(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_addpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AddPoint(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_addpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AddPoint(geometry, geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_addpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AddPoint(geometry, geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_addpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION RemovePoint(geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_removepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_RemovePoint(geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_removepoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SetPoint(geometry, integer, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_setpoint_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SetPoint(geometry, integer, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_setpoint_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakeEnvelope(float8, float8, float8, float8, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'ST_MakeEnvelope'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakePolygon(geometry, geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakePolygon(geometry, geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MakePolygon(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MakePolygon(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoly'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION BuildArea(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_buildarea'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_BuildArea(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_buildarea'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION Polygonize_GArray (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'polygonize_garray'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Polygonize_GArray (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'polygonize_garray'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Polygonize (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'polygonize_garray'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION LineMerge(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'linemerge'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_LineMerge(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'linemerge'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Dump(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-1.5', 'LWGEOM_dump'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION DumpRings(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-1.5', 'LWGEOM_dump_rings'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_DumpRings(geometry)
	RETURNS SETOF geometry_dump
	AS '$libdir/postgis-1.5', 'LWGEOM_dump_rings'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_DumpPoints(the_geom geometry, cur_path integer[]) RETURNS SETOF geometry_dump AS $$
DECLARE
  tmp geometry_dump;
  tmp2 geometry_dump;
  nb_points integer;
  nb_geom integer;
  i integer;
  j integer;
  g geometry;
  
BEGIN
  
  RAISE DEBUG '%,%', cur_path, ST_GeometryType(the_geom);

  -- Special case (MULTI* OR GEOMETRYCOLLECTION) : iterate and return the DumpPoints of the geometries
  SELECT ST_NumGeometries(the_geom) INTO nb_geom;

  IF (nb_geom IS NOT NULL) THEN
    
    i = 1;
    FOR tmp2 IN SELECT (ST_Dump(the_geom)).* LOOP

      FOR tmp IN SELECT * FROM _ST_DumpPoints(tmp2.geom, cur_path || tmp2.path) LOOP
	    RETURN NEXT tmp;
      END LOOP;
      i = i + 1;
      
    END LOOP;

    RETURN;
  END IF;
  

  -- Special case (POLYGON) : return the points of the rings of a polygon
  IF (ST_GeometryType(the_geom) = 'ST_Polygon') THEN

    FOR tmp IN SELECT * FROM _ST_DumpPoints(ST_ExteriorRing(the_geom), cur_path || ARRAY[1]) LOOP
      RETURN NEXT tmp;
    END LOOP;
    
    j := ST_NumInteriorRings(the_geom);
    FOR i IN 1..j LOOP
        FOR tmp IN SELECT * FROM _ST_DumpPoints(ST_InteriorRingN(the_geom, i), cur_path || ARRAY[i+1]) LOOP
          RETURN NEXT tmp;
        END LOOP;
    END LOOP;
    
    RETURN;
  END IF;

    
  -- Special case (POINT) : return the point
  IF (ST_GeometryType(the_geom) = 'ST_Point') THEN

    tmp.path = cur_path || ARRAY[1];
    tmp.geom = the_geom;

    RETURN NEXT tmp;
    RETURN;

  END IF;


  -- Use ST_NumPoints rather than ST_NPoints to have a NULL value if the_geom isn't
  -- a LINESTRING or CIRCULARSTRING.
  SELECT ST_NumPoints(the_geom) INTO nb_points;

  -- This should never happen
  IF (nb_points IS NULL) THEN
    RAISE EXCEPTION 'Unexpected error while dumping geometry %', ST_AsText(the_geom);
  END IF;

  FOR i IN 1..nb_points LOOP
    tmp.path = cur_path || ARRAY[i];
    tmp.geom := ST_PointN(the_geom, i);
    RETURN NEXT tmp;
  END LOOP;
   
END
$$ LANGUAGE plpgsql;

-----------------------------------------------------------------------
-- ST_DumpPoints()
-----------------------------------------------------------------------
-- This function mimicks that of ST_Dump for collections, but this function 
-- that returns a path and all the points that make up a particular geometry.
-- This current implementation in plpgsql does not scale very well at all.
-- and should be ported to C at some point.
-- Availability: 1.5.0
CREATE OR REPLACE FUNCTION ST_DumpPoints(geometry) RETURNS SETOF geometry_dump AS $$
  SELECT * FROM _ST_DumpPoints($1, NULL);
$$ LANGUAGE SQL  STRICT;


------------------------------------------------------------------------

--
-- Aggregate functions
--

-- Deprecation in 1.2.3
CREATE OR REPLACE FUNCTION combine_bbox(box2d,geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX2DFLOAT4_combine'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_Combine_BBox(box2d,geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX2DFLOAT4_combine'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION combine_bbox(box3d_extent,geometry)
	RETURNS box3d_extent
	AS '$libdir/postgis-1.5', 'BOX3D_combine'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_Combine_BBox(box3d_extent,geometry)
	RETURNS box3d_extent
	AS '$libdir/postgis-1.5', 'BOX3D_combine'
	LANGUAGE 'C' IMMUTABLE;
DROP AGGREGATE IF EXISTS Extent(geometry);
CREATE AGGREGATE Extent(
	sfunc = ST_combine_bbox,
	basetype = geometry,
	stype = box3d_extent
	);
DROP AGGREGATE IF EXISTS ST_Extent(geometry);
CREATE AGGREGATE ST_Extent(
	sfunc = ST_combine_bbox,
	basetype = geometry,
	stype = box3d_extent
	);
CREATE OR REPLACE FUNCTION combine_bbox(box3d,geometry)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_combine'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_Combine_BBox(box3d,geometry)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_combine'
	LANGUAGE 'C' IMMUTABLE;
DROP AGGREGATE IF EXISTS Extent3d(geometry);
CREATE AGGREGATE Extent3d(
	sfunc = combine_bbox,
	basetype = geometry,
	stype = box3d
	);
DROP AGGREGATE IF EXISTS ST_Extent3d(geometry);
CREATE AGGREGATE ST_Extent3d(
	sfunc = ST_combine_bbox,
	basetype = geometry,
	stype = box3d
	);
CREATE OR REPLACE FUNCTION estimated_extent(text,text,text) RETURNS box2d AS
	'$libdir/postgis-1.5', 'LWGEOM_estimated_extent'
	LANGUAGE 'C' IMMUTABLE STRICT SECURITY DEFINER;
CREATE OR REPLACE FUNCTION ST_estimated_extent(text,text,text) RETURNS box2d AS
	'$libdir/postgis-1.5', 'LWGEOM_estimated_extent'
	LANGUAGE 'C' IMMUTABLE STRICT SECURITY DEFINER;
CREATE OR REPLACE FUNCTION estimated_extent(text,text) RETURNS box2d AS
	'$libdir/postgis-1.5', 'LWGEOM_estimated_extent'
	LANGUAGE 'C' IMMUTABLE STRICT SECURITY DEFINER;
CREATE OR REPLACE FUNCTION ST_estimated_extent(text,text) RETURNS box2d AS
	'$libdir/postgis-1.5', 'LWGEOM_estimated_extent'
	LANGUAGE 'C' IMMUTABLE STRICT SECURITY DEFINER;
CREATE OR REPLACE FUNCTION find_extent(text,text,text) RETURNS box2d AS
$$
DECLARE
	schemaname alias for $1;
	tablename alias for $2;
	columnname alias for $3;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT extent("' || columnname || '") FROM "' || schemaname || '"."' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_find_extent(text,text,text) RETURNS box2d AS
$$
DECLARE
	schemaname alias for $1;
	tablename alias for $2;
	columnname alias for $3;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT extent("' || columnname || '") FROM "' || schemaname || '"."' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION find_extent(text,text) RETURNS box2d AS
$$
DECLARE
	tablename alias for $1;
	columnname alias for $2;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT extent("' || columnname || '") FROM "' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_find_extent(text,text) RETURNS box2d AS
$$
DECLARE
	tablename alias for $1;
	columnname alias for $2;
	myrec RECORD;

BEGIN
	FOR myrec IN EXECUTE 'SELECT extent("' || columnname || '") FROM "' || tablename || '"' LOOP
		return myrec.extent;
	END LOOP;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION rename_geometry_table_constraints() RETURNS text
AS
$$
SELECT 'rename_geometry_table_constraint() is obsoleted'::text
$$
LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION fix_geometry_columns() RETURNS text
AS
$$
DECLARE
	mislinked record;
	result text;
	linked integer;
	deleted integer;
	foundschema integer;
BEGIN

	-- Since 7.3 schema support has been added.
	-- Previous postgis versions used to put the database name in
	-- the schema column. This needs to be fixed, so we try to
	-- set the correct schema for each geometry_colums record
	-- looking at table, column, type and srid.
	UPDATE geometry_columns SET f_table_schema = n.nspname
		FROM pg_namespace n, pg_class c, pg_attribute a,
			pg_constraint sridcheck, pg_constraint typecheck
			WHERE ( f_table_schema is NULL
		OR f_table_schema = ''
			OR f_table_schema NOT IN (
					SELECT nspname::varchar
					FROM pg_namespace nn, pg_class cc, pg_attribute aa
					WHERE cc.relnamespace = nn.oid
					AND cc.relname = f_table_name::name
					AND aa.attrelid = cc.oid
					AND aa.attname = f_geometry_column::name))
			AND f_table_name::name = c.relname
			AND c.oid = a.attrelid
			AND c.relnamespace = n.oid
			AND f_geometry_column::name = a.attname

			AND sridcheck.conrelid = c.oid
		AND sridcheck.consrc LIKE '(srid(% = %)'
			AND sridcheck.consrc ~ textcat(' = ', srid::text)

			AND typecheck.conrelid = c.oid
		AND typecheck.consrc LIKE
		'((geometrytype(%) = ''%''::text) OR (% IS NULL))'
			AND typecheck.consrc ~ textcat(' = ''', type::text)

			AND NOT EXISTS (
					SELECT oid FROM geometry_columns gc
					WHERE c.relname::varchar = gc.f_table_name
					AND n.nspname::varchar = gc.f_table_schema
					AND a.attname::varchar = gc.f_geometry_column
			);

	GET DIAGNOSTICS foundschema = ROW_COUNT;

	-- no linkage to system table needed
	return 'fixed:'||foundschema::text;

END;
$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION populate_geometry_columns()
	RETURNS text AS
$$
DECLARE
	inserted    integer;
	oldcount    integer;
	probed      integer;
	stale       integer;
	gcs         RECORD;
	gc          RECORD;
	gsrid       integer;
	gndims      integer;
	gtype       text;
	query       text;
	gc_is_valid boolean;

BEGIN
	SELECT count(*) INTO oldcount FROM geometry_columns;
	inserted := 0;

	EXECUTE 'TRUNCATE geometry_columns';

	-- Count the number of geometry columns in all tables and views
	SELECT count(DISTINCT c.oid) INTO probed
	FROM pg_class c,
		 pg_attribute a,
		 pg_type t,
		 pg_namespace n
	WHERE (c.relkind = 'r' OR c.relkind = 'v')
	AND t.typname = 'geometry'
	AND a.attisdropped = false
	AND a.atttypid = t.oid
	AND a.attrelid = c.oid
	AND c.relnamespace = n.oid
	AND n.nspname NOT ILIKE 'pg_temp%';

	-- Iterate through all non-dropped geometry columns
	RAISE DEBUG 'Processing Tables.....';

	FOR gcs IN
	SELECT DISTINCT ON (c.oid) c.oid, n.nspname, c.relname
		FROM pg_class c,
			 pg_attribute a,
			 pg_type t,
			 pg_namespace n
		WHERE c.relkind = 'r'
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND n.nspname NOT ILIKE 'pg_temp%'
	LOOP

	inserted := inserted + populate_geometry_columns(gcs.oid);
	END LOOP;

	-- Add views to geometry columns table
	RAISE DEBUG 'Processing Views.....';
	FOR gcs IN
	SELECT DISTINCT ON (c.oid) c.oid, n.nspname, c.relname
		FROM pg_class c,
			 pg_attribute a,
			 pg_type t,
			 pg_namespace n
		WHERE c.relkind = 'v'
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
	LOOP

	inserted := inserted + populate_geometry_columns(gcs.oid);
	END LOOP;

	IF oldcount > inserted THEN
	stale = oldcount-inserted;
	ELSE
	stale = 0;
	END IF;

	RETURN 'probed:' ||probed|| ' inserted:'||inserted|| ' conflicts:'||probed-inserted|| ' deleted:'||stale;
END

$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION populate_geometry_columns(tbl_oid oid)
	RETURNS integer AS
$$
DECLARE
	gcs         RECORD;
	gc          RECORD;
	gsrid       integer;
	gndims      integer;
	gtype       text;
	query       text;
	gc_is_valid boolean;
	inserted    integer;

BEGIN
	inserted := 0;

	-- Iterate through all geometry columns in this table
	FOR gcs IN
	SELECT n.nspname, c.relname, a.attname
		FROM pg_class c,
			 pg_attribute a,
			 pg_type t,
			 pg_namespace n
		WHERE c.relkind = 'r'
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND n.nspname NOT ILIKE 'pg_temp%'
		AND c.oid = tbl_oid
	LOOP

	RAISE DEBUG 'Processing table %.%.%', gcs.nspname, gcs.relname, gcs.attname;

	DELETE FROM geometry_columns
	  WHERE f_table_schema = gcs.nspname
	  AND f_table_name = gcs.relname
	  AND f_geometry_column = gcs.attname;

	gc_is_valid := true;

	-- Try to find srid check from system tables (pg_constraint)
	gsrid :=
		(SELECT replace(replace(split_part(s.consrc, ' = ', 2), ')', ''), '(', '')
		 FROM pg_class c, pg_namespace n, pg_attribute a, pg_constraint s
		 WHERE n.nspname = gcs.nspname
		 AND c.relname = gcs.relname
		 AND a.attname = gcs.attname
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%srid(% = %');
	IF (gsrid IS NULL) THEN
		-- Try to find srid from the geometry itself
		EXECUTE 'SELECT srid(' || quote_ident(gcs.attname) || ')
				 FROM ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				 WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1'
			INTO gc;
		gsrid := gc.srid;

		-- Try to apply srid check to column
		IF (gsrid IS NOT NULL) THEN
			BEGIN
				EXECUTE 'ALTER TABLE ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
						 ADD CONSTRAINT ' || quote_ident('enforce_srid_' || gcs.attname) || '
						 CHECK (srid(' || quote_ident(gcs.attname) || ') = ' || gsrid || ')';
			EXCEPTION
				WHEN check_violation THEN
					RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not apply constraint CHECK (srid(%) = %)', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname), quote_ident(gcs.attname), gsrid;
					gc_is_valid := false;
			END;
		END IF;
	END IF;

	-- Try to find ndims check from system tables (pg_constraint)
	gndims :=
		(SELECT replace(split_part(s.consrc, ' = ', 2), ')', '')
		 FROM pg_class c, pg_namespace n, pg_attribute a, pg_constraint s
		 WHERE n.nspname = gcs.nspname
		 AND c.relname = gcs.relname
		 AND a.attname = gcs.attname
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%ndims(% = %');
	IF (gndims IS NULL) THEN
		-- Try to find ndims from the geometry itself
		EXECUTE 'SELECT st_ndims(' || quote_ident(gcs.attname) || ') As ndims
				 FROM ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				 WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1'
			INTO gc;
		gndims := gc.ndims;

		-- Try to apply ndims check to column
		IF (gndims IS NOT NULL) THEN
			BEGIN
				EXECUTE 'ALTER TABLE ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
						 ADD CONSTRAINT ' || quote_ident('enforce_dims_' || gcs.attname) || '
						 CHECK (st_ndims(' || quote_ident(gcs.attname) || ') = '||gndims||')';
			EXCEPTION
				WHEN check_violation THEN
					RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not apply constraint CHECK (st_ndims(%) = %)', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname), quote_ident(gcs.attname), gndims;
					gc_is_valid := false;
			END;
		END IF;
	END IF;

	-- Try to find geotype check from system tables (pg_constraint)
	gtype :=
		(SELECT replace(split_part(s.consrc, '''', 2), ')', '')
		 FROM pg_class c, pg_namespace n, pg_attribute a, pg_constraint s
		 WHERE n.nspname = gcs.nspname
		 AND c.relname = gcs.relname
		 AND a.attname = gcs.attname
		 AND a.attrelid = c.oid
		 AND s.connamespace = n.oid
		 AND s.conrelid = c.oid
		 AND a.attnum = ANY (s.conkey)
		 AND s.consrc LIKE '%geometrytype(% = %');
	IF (gtype IS NULL) THEN
		-- Try to find geotype from the geometry itself
		EXECUTE 'SELECT geometrytype(' || quote_ident(gcs.attname) || ') As geometrytype
				 FROM ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				 WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1'
			INTO gc;
		gtype := gc.geometrytype;
		--IF (gtype IS NULL) THEN
		--    gtype := 'GEOMETRY';
		--END IF;

		-- Try to apply geometrytype check to column
		IF (gtype IS NOT NULL) THEN
			BEGIN
				EXECUTE 'ALTER TABLE ONLY ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				ADD CONSTRAINT ' || quote_ident('enforce_geotype_' || gcs.attname) || '
				CHECK ((geometrytype(' || quote_ident(gcs.attname) || ') = ' || quote_literal(gtype) || ') OR (' || quote_ident(gcs.attname) || ' IS NULL))';
			EXCEPTION
				WHEN check_violation THEN
					-- No geometry check can be applied. This column contains a number of geometry types.
					RAISE WARNING 'Could not add geometry type check (%) to table column: %.%.%', gtype, quote_ident(gcs.nspname),quote_ident(gcs.relname),quote_ident(gcs.attname);
			END;
		END IF;
	END IF;

	IF (gsrid IS NULL) THEN
		RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not determine the srid', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname);
	ELSIF (gndims IS NULL) THEN
		RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not determine the number of dimensions', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname);
	ELSIF (gtype IS NULL) THEN
		RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not determine the geometry type', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname);
	ELSE
		-- Only insert into geometry_columns if table constraints could be applied.
		IF (gc_is_valid) THEN
			INSERT INTO geometry_columns (f_table_catalog,f_table_schema, f_table_name, f_geometry_column, coord_dimension, srid, type)
			VALUES ('', gcs.nspname, gcs.relname, gcs.attname, gndims, gsrid, gtype);
			inserted := inserted + 1;
		END IF;
	END IF;
	END LOOP;

	-- Add views to geometry columns table
	FOR gcs IN
	SELECT n.nspname, c.relname, a.attname
		FROM pg_class c,
			 pg_attribute a,
			 pg_type t,
			 pg_namespace n
		WHERE c.relkind = 'v'
		AND t.typname = 'geometry'
		AND a.attisdropped = false
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND n.nspname NOT ILIKE 'pg_temp%'
		AND c.oid = tbl_oid
	LOOP
		RAISE DEBUG 'Processing view %.%.%', gcs.nspname, gcs.relname, gcs.attname;

	DELETE FROM geometry_columns
	  WHERE f_table_schema = gcs.nspname
	  AND f_table_name = gcs.relname
	  AND f_geometry_column = gcs.attname;
	  
		EXECUTE 'SELECT st_ndims(' || quote_ident(gcs.attname) || ') As ndims
				 FROM ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				 WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1'
			INTO gc;
		gndims := gc.ndims;

		EXECUTE 'SELECT st_srid(' || quote_ident(gcs.attname) || ') As srid
				 FROM ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				 WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1'
			INTO gc;
		gsrid := gc.srid;

		EXECUTE 'SELECT geometrytype(' || quote_ident(gcs.attname) || ') As geometrytype
				 FROM ' || quote_ident(gcs.nspname) || '.' || quote_ident(gcs.relname) || '
				 WHERE ' || quote_ident(gcs.attname) || ' IS NOT NULL LIMIT 1'
			INTO gc;
		gtype := gc.geometrytype;

		IF (gndims IS NULL) THEN
			RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not determine ndims', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname);
		ELSIF (gsrid IS NULL) THEN
			RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not determine srid', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname);
		ELSIF (gtype IS NULL) THEN
			RAISE WARNING 'Not inserting ''%'' in ''%.%'' into geometry_columns: could not determine gtype', quote_ident(gcs.attname), quote_ident(gcs.nspname), quote_ident(gcs.relname);
		ELSE
			query := 'INSERT INTO geometry_columns (f_table_catalog,f_table_schema, f_table_name, f_geometry_column, coord_dimension, srid, type) ' ||
					 'VALUES ('''', ' || quote_literal(gcs.nspname) || ',' || quote_literal(gcs.relname) || ',' || quote_literal(gcs.attname) || ',' || gndims || ',' || gsrid || ',' || quote_literal(gtype) || ')';
			EXECUTE query;
			inserted := inserted + 1;
		END IF;
	END LOOP;

	RETURN inserted;
END

$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION probe_geometry_columns() RETURNS text AS
$$
DECLARE
	inserted integer;
	oldcount integer;
	probed integer;
	stale integer;
BEGIN

	SELECT count(*) INTO oldcount FROM geometry_columns;

	SELECT count(*) INTO probed
		FROM pg_class c, pg_attribute a, pg_type t,
			pg_namespace n,
			pg_constraint sridcheck, pg_constraint typecheck

		WHERE t.typname = 'geometry'
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND sridcheck.connamespace = n.oid
		AND typecheck.connamespace = n.oid
		AND sridcheck.conrelid = c.oid
		AND sridcheck.consrc LIKE '(%srid('||a.attname||') = %)'
		AND typecheck.conrelid = c.oid
		AND typecheck.consrc LIKE
		'((geometrytype('||a.attname||') = ''%''::text) OR (% IS NULL))'
		;

	INSERT INTO geometry_columns SELECT
		''::varchar as f_table_catalogue,
		n.nspname::varchar as f_table_schema,
		c.relname::varchar as f_table_name,
		a.attname::varchar as f_geometry_column,
		2 as coord_dimension,
		trim(both  ' =)' from
			replace(replace(split_part(
				sridcheck.consrc, ' = ', 2), ')', ''), '(', ''))::integer AS srid,
		trim(both ' =)''' from substr(typecheck.consrc,
			strpos(typecheck.consrc, '='),
			strpos(typecheck.consrc, '::')-
			strpos(typecheck.consrc, '=')
			))::varchar as type
		FROM pg_class c, pg_attribute a, pg_type t,
			pg_namespace n,
			pg_constraint sridcheck, pg_constraint typecheck
		WHERE t.typname = 'geometry'
		AND a.atttypid = t.oid
		AND a.attrelid = c.oid
		AND c.relnamespace = n.oid
		AND sridcheck.connamespace = n.oid
		AND typecheck.connamespace = n.oid
		AND sridcheck.conrelid = c.oid
		AND sridcheck.consrc LIKE '(st_srid('||a.attname||') = %)'
		AND typecheck.conrelid = c.oid
		AND typecheck.consrc LIKE
		'((geometrytype('||a.attname||') = ''%''::text) OR (% IS NULL))'

			AND NOT EXISTS (
					SELECT oid FROM geometry_columns gc
					WHERE c.relname::varchar = gc.f_table_name
					AND n.nspname::varchar = gc.f_table_schema
					AND a.attname::varchar = gc.f_geometry_column
			);

	GET DIAGNOSTICS inserted = ROW_COUNT;

	IF oldcount > probed THEN
		stale = oldcount-probed;
	ELSE
		stale = 0;
	END IF;

	RETURN 'probed:'||probed::text||
		' inserted:'||inserted::text||
		' conflicts:'||(probed-inserted)::text||
		' stale:'||stale::text;
END

$$
LANGUAGE 'plpgsql' VOLATILE;
CREATE OR REPLACE FUNCTION AddGeometryColumn(varchar,varchar,varchar,varchar,integer,varchar,integer)
	RETURNS text
	AS
$$
DECLARE
	catalog_name alias for $1;
	schema_name alias for $2;
	table_name alias for $3;
	column_name alias for $4;
	new_srid alias for $5;
	new_type alias for $6;
	new_dim alias for $7;
	rec RECORD;
	sr varchar;
	real_schema name;
	sql text;

BEGIN

	-- Verify geometry type
	IF ( NOT ( (new_type = 'GEOMETRY') OR
			   (new_type = 'GEOMETRYCOLLECTION') OR
			   (new_type = 'POINT') OR
			   (new_type = 'MULTIPOINT') OR
			   (new_type = 'POLYGON') OR
			   (new_type = 'MULTIPOLYGON') OR
			   (new_type = 'LINESTRING') OR
			   (new_type = 'MULTILINESTRING') OR
			   (new_type = 'GEOMETRYCOLLECTIONM') OR
			   (new_type = 'POINTM') OR
			   (new_type = 'MULTIPOINTM') OR
			   (new_type = 'POLYGONM') OR
			   (new_type = 'MULTIPOLYGONM') OR
			   (new_type = 'LINESTRINGM') OR
			   (new_type = 'MULTILINESTRINGM') OR
			   (new_type = 'CIRCULARSTRING') OR
			   (new_type = 'CIRCULARSTRINGM') OR
			   (new_type = 'COMPOUNDCURVE') OR
			   (new_type = 'COMPOUNDCURVEM') OR
			   (new_type = 'CURVEPOLYGON') OR
			   (new_type = 'CURVEPOLYGONM') OR
			   (new_type = 'MULTICURVE') OR
			   (new_type = 'MULTICURVEM') OR
			   (new_type = 'MULTISURFACE') OR
			   (new_type = 'MULTISURFACEM')) )
	THEN
		RAISE EXCEPTION 'Invalid type name - valid ones are:
	POINT, MULTIPOINT,
	LINESTRING, MULTILINESTRING,
	POLYGON, MULTIPOLYGON,
	CIRCULARSTRING, COMPOUNDCURVE, MULTICURVE,
	CURVEPOLYGON, MULTISURFACE,
	GEOMETRY, GEOMETRYCOLLECTION,
	POINTM, MULTIPOINTM,
	LINESTRINGM, MULTILINESTRINGM,
	POLYGONM, MULTIPOLYGONM,
	CIRCULARSTRINGM, COMPOUNDCURVEM, MULTICURVEM
	CURVEPOLYGONM, MULTISURFACEM,
	or GEOMETRYCOLLECTIONM';
		RETURN 'fail';
	END IF;


	-- Verify dimension
	IF ( (new_dim >4) OR (new_dim <2) ) THEN
		RAISE EXCEPTION 'invalid dimension';
		RETURN 'fail';
	END IF;

	IF ( (new_type LIKE '%M') AND (new_dim!=3) ) THEN
		RAISE EXCEPTION 'TypeM needs 3 dimensions';
		RETURN 'fail';
	END IF;


	-- Verify SRID
	IF ( new_srid != -1 ) THEN
		SELECT SRID INTO sr FROM spatial_ref_sys WHERE SRID = new_srid;
		IF NOT FOUND THEN
			RAISE EXCEPTION 'AddGeometryColumns() - invalid SRID';
			RETURN 'fail';
		END IF;
	END IF;


	-- Verify schema
	IF ( schema_name IS NOT NULL AND schema_name != '' ) THEN
		sql := 'SELECT nspname FROM pg_namespace ' ||
			'WHERE text(nspname) = ' || quote_literal(schema_name) ||
			'LIMIT 1';
		RAISE DEBUG '%', sql;
		EXECUTE sql INTO real_schema;

		IF ( real_schema IS NULL ) THEN
			RAISE EXCEPTION 'Schema % is not a valid schemaname', quote_literal(schema_name);
			RETURN 'fail';
		END IF;
	END IF;

	IF ( real_schema IS NULL ) THEN
		RAISE DEBUG 'Detecting schema';
		sql := 'SELECT n.nspname AS schemaname ' ||
			'FROM pg_catalog.pg_class c ' ||
			  'JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace ' ||
			'WHERE c.relkind = ' || quote_literal('r') ||
			' AND n.nspname NOT IN (' || quote_literal('pg_catalog') || ', ' || quote_literal('pg_toast') || ')' ||
			' AND pg_catalog.pg_table_is_visible(c.oid)' ||
			' AND c.relname = ' || quote_literal(table_name);
		RAISE DEBUG '%', sql;
		EXECUTE sql INTO real_schema;

		IF ( real_schema IS NULL ) THEN
			RAISE EXCEPTION 'Table % does not occur in the search_path', quote_literal(table_name);
			RETURN 'fail';
		END IF;
	END IF;


	-- Add geometry column to table
	sql := 'ALTER TABLE ' ||
		quote_ident(real_schema) || '.' || quote_ident(table_name)
		|| ' ADD COLUMN ' || quote_ident(column_name) ||
		' geometry ';
	RAISE DEBUG '%', sql;
	EXECUTE sql;


	-- Delete stale record in geometry_columns (if any)
	sql := 'DELETE FROM geometry_columns WHERE
		f_table_catalog = ' || quote_literal('') ||
		' AND f_table_schema = ' ||
		quote_literal(real_schema) ||
		' AND f_table_name = ' || quote_literal(table_name) ||
		' AND f_geometry_column = ' || quote_literal(column_name);
	RAISE DEBUG '%', sql;
	EXECUTE sql;


	-- Add record in geometry_columns
	sql := 'INSERT INTO geometry_columns (f_table_catalog,f_table_schema,f_table_name,' ||
										  'f_geometry_column,coord_dimension,srid,type)' ||
		' VALUES (' ||
		quote_literal('') || ',' ||
		quote_literal(real_schema) || ',' ||
		quote_literal(table_name) || ',' ||
		quote_literal(column_name) || ',' ||
		new_dim::text || ',' ||
		new_srid::text || ',' ||
		quote_literal(new_type) || ')';
	RAISE DEBUG '%', sql;
	EXECUTE sql;


	-- Add table CHECKs
	sql := 'ALTER TABLE ' ||
		quote_ident(real_schema) || '.' || quote_ident(table_name)
		|| ' ADD CONSTRAINT '
		|| quote_ident('enforce_srid_' || column_name)
		|| ' CHECK (ST_SRID(' || quote_ident(column_name) ||
		') = ' || new_srid::text || ')' ;
	RAISE DEBUG '%', sql;
	EXECUTE sql;

	sql := 'ALTER TABLE ' ||
		quote_ident(real_schema) || '.' || quote_ident(table_name)
		|| ' ADD CONSTRAINT '
		|| quote_ident('enforce_dims_' || column_name)
		|| ' CHECK (ST_NDims(' || quote_ident(column_name) ||
		') = ' || new_dim::text || ')' ;
	RAISE DEBUG '%', sql;
	EXECUTE sql;

	IF ( NOT (new_type = 'GEOMETRY')) THEN
		sql := 'ALTER TABLE ' ||
			quote_ident(real_schema) || '.' || quote_ident(table_name) || ' ADD CONSTRAINT ' ||
			quote_ident('enforce_geotype_' || column_name) ||
			' CHECK (GeometryType(' ||
			quote_ident(column_name) || ')=' ||
			quote_literal(new_type) || ' OR (' ||
			quote_ident(column_name) || ') is null)';
		RAISE DEBUG '%', sql;
		EXECUTE sql;
	END IF;

	RETURN
		real_schema || '.' ||
		table_name || '.' || column_name ||
		' SRID:' || new_srid::text ||
		' TYPE:' || new_type ||
		' DIMS:' || new_dim::text || ' ';
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION AddGeometryColumn(varchar,varchar,varchar,integer,varchar,integer) RETURNS text AS $$
DECLARE
	ret  text;
BEGIN
	SELECT AddGeometryColumn('',$1,$2,$3,$4,$5,$6) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' STABLE STRICT;
CREATE OR REPLACE FUNCTION AddGeometryColumn(varchar,varchar,integer,varchar,integer) RETURNS text AS $$
DECLARE
	ret  text;
BEGIN
	SELECT AddGeometryColumn('','',$1,$2,$3,$4,$5) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION DropGeometryColumn(varchar, varchar,varchar,varchar)
	RETURNS text
	AS
$$
DECLARE
	catalog_name alias for $1;
	schema_name alias for $2;
	table_name alias for $3;
	column_name alias for $4;
	myrec RECORD;
	okay boolean;
	real_schema name;

BEGIN


	-- Find, check or fix schema_name
	IF ( schema_name != '' ) THEN
		okay = 'f';

		FOR myrec IN SELECT nspname FROM pg_namespace WHERE text(nspname) = schema_name LOOP
			okay := 't';
		END LOOP;

		IF ( okay <> 't' ) THEN
			RAISE NOTICE 'Invalid schema name - using current_schema()';
			SELECT current_schema() into real_schema;
		ELSE
			real_schema = schema_name;
		END IF;
	ELSE
		SELECT current_schema() into real_schema;
	END IF;

	-- Find out if the column is in the geometry_columns table
	okay = 'f';
	FOR myrec IN SELECT * from geometry_columns where f_table_schema = text(real_schema) and f_table_name = table_name and f_geometry_column = column_name LOOP
		okay := 't';
	END LOOP;
	IF (okay <> 't') THEN
		RAISE EXCEPTION 'column not found in geometry_columns table';
		RETURN 'f';
	END IF;

	-- Remove ref from geometry_columns table
	EXECUTE 'delete from geometry_columns where f_table_schema = ' ||
		quote_literal(real_schema) || ' and f_table_name = ' ||
		quote_literal(table_name)  || ' and f_geometry_column = ' ||
		quote_literal(column_name);

	-- Remove table column
	EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) || '.' ||
		quote_ident(table_name) || ' DROP COLUMN ' ||
		quote_ident(column_name);

	RETURN real_schema || '.' || table_name || '.' || column_name ||' effectively removed.';

END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION DropGeometryColumn(varchar,varchar,varchar)
	RETURNS text
	AS
$$
DECLARE
	ret text;
BEGIN
	SELECT DropGeometryColumn('',$1,$2,$3) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION DropGeometryColumn(varchar,varchar)
	RETURNS text
	AS
$$
DECLARE
	ret text;
BEGIN
	SELECT DropGeometryColumn('','',$1,$2) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION DropGeometryTable(varchar, varchar,varchar)
	RETURNS text
	AS
$$
DECLARE
	catalog_name alias for $1;
	schema_name alias for $2;
	table_name alias for $3;
	real_schema name;

BEGIN

	IF ( schema_name = '' ) THEN
		SELECT current_schema() into real_schema;
	ELSE
		real_schema = schema_name;
	END IF;

	-- Remove refs from geometry_columns table
	EXECUTE 'DELETE FROM geometry_columns WHERE ' ||
		'f_table_schema = ' || quote_literal(real_schema) ||
		' AND ' ||
		' f_table_name = ' || quote_literal(table_name);

	-- Remove table
	EXECUTE 'DROP TABLE IF EXISTS '
		|| quote_ident(real_schema) || '.' ||
		quote_ident(table_name);

	RETURN
		real_schema || '.' ||
		table_name ||' dropped.';

END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION DropGeometryTable(varchar,varchar) RETURNS text AS
$$ SELECT DropGeometryTable('',$1,$2) $$
LANGUAGE 'sql' WITH (isstrict);
CREATE OR REPLACE FUNCTION DropGeometryTable(varchar) RETURNS text AS
$$ SELECT DropGeometryTable('','',$1) $$
LANGUAGE 'sql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION UpdateGeometrySRID(varchar,varchar,varchar,varchar,integer)
	RETURNS text
	AS
$$
DECLARE
	catalog_name alias for $1;
	schema_name alias for $2;
	table_name alias for $3;
	column_name alias for $4;
	new_srid alias for $5;
	myrec RECORD;
	okay boolean;
	cname varchar;
	real_schema name;

BEGIN


	-- Find, check or fix schema_name
	IF ( schema_name != '' ) THEN
		okay = 'f';

		FOR myrec IN SELECT nspname FROM pg_namespace WHERE text(nspname) = schema_name LOOP
			okay := 't';
		END LOOP;

		IF ( okay <> 't' ) THEN
			RAISE EXCEPTION 'Invalid schema name';
		ELSE
			real_schema = schema_name;
		END IF;
	ELSE
		SELECT INTO real_schema current_schema()::text;
	END IF;

	-- Ensure that column_name is in geometry_columns
	okay = 'f';
	FOR myrec IN SELECT * from geometry_columns where f_table_schema = text(real_schema) and f_table_name = table_name and f_geometry_column = column_name LOOP
		okay := 't';
	END LOOP;
	IF (okay <> 't') THEN
		RAISE EXCEPTION 'column not found in geometry_columns table';
		RETURN 'f';
	END IF;

	-- Ensure that new_srid is valid
	IF ( new_srid != -1 ) THEN
		IF ( SELECT count(*) = 0 from spatial_ref_sys where srid = new_srid ) THEN
			RAISE EXCEPTION 'invalid SRID: % not found in spatial_ref_sys', new_srid;
			RETURN false;
		END IF;
	END IF;

	-- Update ref from geometry_columns table
	EXECUTE 'UPDATE geometry_columns SET SRID = ' || new_srid::text ||
		' where f_table_schema = ' ||
		quote_literal(real_schema) || ' and f_table_name = ' ||
		quote_literal(table_name)  || ' and f_geometry_column = ' ||
		quote_literal(column_name);

	-- Make up constraint name
	cname = 'enforce_srid_'  || column_name;

	-- Drop enforce_srid constraint
	EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) ||
		'.' || quote_ident(table_name) ||
		' DROP constraint ' || quote_ident(cname);

	-- Update geometries SRID
	EXECUTE 'UPDATE ' || quote_ident(real_schema) ||
		'.' || quote_ident(table_name) ||
		' SET ' || quote_ident(column_name) ||
		' = ST_SetSRID(' || quote_ident(column_name) ||
		', ' || new_srid::text || ')';

	-- Reset enforce_srid constraint
	EXECUTE 'ALTER TABLE ' || quote_ident(real_schema) ||
		'.' || quote_ident(table_name) ||
		' ADD constraint ' || quote_ident(cname) ||
		' CHECK (st_srid(' || quote_ident(column_name) ||
		') = ' || new_srid::text || ')';

	RETURN real_schema || '.' || table_name || '.' || column_name ||' SRID changed to ' || new_srid::text;

END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION UpdateGeometrySRID(varchar,varchar,varchar,integer)
	RETURNS text
	AS $$
DECLARE
	ret  text;
BEGIN
	SELECT UpdateGeometrySRID('',$1,$2,$3,$4) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION UpdateGeometrySRID(varchar,varchar,integer)
	RETURNS text
	AS $$
DECLARE
	ret  text;
BEGIN
	SELECT UpdateGeometrySRID('','',$1,$2,$3) into ret;
	RETURN ret;
END;
$$
LANGUAGE 'plpgsql' VOLATILE STRICT;
CREATE OR REPLACE FUNCTION find_srid(varchar,varchar,varchar) RETURNS int4 AS
$$
DECLARE
	schem text;
	tabl text;
	sr int4;
BEGIN
	IF $1 IS NULL THEN
	  RAISE EXCEPTION 'find_srid() - schema is NULL!';
	END IF;
	IF $2 IS NULL THEN
	  RAISE EXCEPTION 'find_srid() - table name is NULL!';
	END IF;
	IF $3 IS NULL THEN
	  RAISE EXCEPTION 'find_srid() - column name is NULL!';
	END IF;
	schem = $1;
	tabl = $2;
-- if the table contains a . and the schema is empty
-- split the table into a schema and a table
-- otherwise drop through to default behavior
	IF ( schem = '' and tabl LIKE '%.%' ) THEN
	 schem = substr(tabl,1,strpos(tabl,'.')-1);
	 tabl = substr(tabl,length(schem)+2);
	ELSE
	 schem = schem || '%';
	END IF;

	select SRID into sr from geometry_columns where f_table_schema like schem and f_table_name = tabl and f_geometry_column = $3;
	IF NOT FOUND THEN
	   RAISE EXCEPTION 'find_srid() - couldnt find the corresponding SRID - is the geometry registered in the GEOMETRY_COLUMNS table?  Is there an uppercase/lowercase missmatch?';
	END IF;
	return sr;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION get_proj4_from_srid(integer) RETURNS text AS
$$
BEGIN
	RETURN proj4text::text FROM spatial_ref_sys WHERE srid= $1;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_transform_geometry(geometry,text,text,int)
	RETURNS geometry
	AS '$libdir/postgis-1.5','transform_geom'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION transform(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5','transform'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Transform(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5','transform'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION postgis_version() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_proj_version() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_scripts_installed() RETURNS text
	AS 'SELECT ''1.5 r9707''::text AS version'
	LANGUAGE 'sql' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_lib_version() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE; -- a new lib will require a new session
CREATE OR REPLACE FUNCTION postgis_scripts_released() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_uses_stats() RETURNS bool
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_geos_version() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_libxml_version() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_scripts_build_date() RETURNS text
	AS 'SELECT ''2012-07-21 09:15:26''::text AS version'
	LANGUAGE 'sql' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_lib_build_date() RETURNS text
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION postgis_full_version() RETURNS text
AS $$
DECLARE
	libver text;
	projver text;
	geosver text;
	libxmlver text;
	usestats bool;
	dbproc text;
	relproc text;
	fullver text;
BEGIN
	SELECT postgis_lib_version() INTO libver;
	SELECT postgis_proj_version() INTO projver;
	SELECT postgis_geos_version() INTO geosver;
	SELECT postgis_libxml_version() INTO libxmlver;
	SELECT postgis_uses_stats() INTO usestats;
	SELECT postgis_scripts_installed() INTO dbproc;
	SELECT postgis_scripts_released() INTO relproc;

	fullver = 'POSTGIS="' || libver || '"';

	IF  geosver IS NOT NULL THEN
		fullver = fullver || ' GEOS="' || geosver || '"';
	END IF;

	IF  projver IS NOT NULL THEN
		fullver = fullver || ' PROJ="' || projver || '"';
	END IF;

	IF  libxmlver IS NOT NULL THEN
		fullver = fullver || ' LIBXML="' || libxmlver || '"';
	END IF;

	IF usestats THEN
		fullver = fullver || ' USE_STATS';
	END IF;

	-- fullver = fullver || ' DBPROC="' || dbproc || '"';
	-- fullver = fullver || ' RELPROC="' || relproc || '"';

	IF dbproc != relproc THEN
		fullver = fullver || ' (procs from ' || dbproc || ' need upgrade)';
	END IF;

	RETURN fullver;
END
$$
LANGUAGE 'plpgsql' IMMUTABLE;
CREATE OR REPLACE FUNCTION st_box2d(geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box3d(geometry)
	RETURNS box3d
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX3D'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box(geometry)
	RETURNS box
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box2d(box3d)
	RETURNS box2d
	AS '$libdir/postgis-1.5','BOX3D_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box3d(box2d)
	RETURNS box3d
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_to_BOX3D'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box(box3d)
	RETURNS box
	AS '$libdir/postgis-1.5','BOX3D_to_BOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_text(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5','LWGEOM_to_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry(box2d)
	RETURNS geometry
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry(box3d)
	RETURNS geometry
	AS '$libdir/postgis-1.5','BOX3D_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','parse_WKT_lwgeom'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry(chip)
	RETURNS geometry
	AS '$libdir/postgis-1.5','CHIP_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_bytea'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_bytea(geometry)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_to_bytea'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box3d_extent(box3d_extent)
	RETURNS box3d
	AS '$libdir/postgis-1.5', 'BOX3D_extent_to_BOX3D'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_box2d(box3d_extent)
	RETURNS box2d
	AS '$libdir/postgis-1.5', 'BOX3D_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION st_geometry(box3d_extent)
	RETURNS geometry
	AS '$libdir/postgis-1.5','BOX3D_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box2d(geometry)
	RETURNS box2d
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d(geometry)
	RETURNS box3d
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX3D'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box(geometry)
	RETURNS box
	AS '$libdir/postgis-1.5','LWGEOM_to_BOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box2d(box3d)
	RETURNS box2d
	AS '$libdir/postgis-1.5','BOX3D_to_BOX2DFLOAT4'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3d(box2d)
	RETURNS box3d
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_to_BOX3D'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box(box3d)
	RETURNS box
	AS '$libdir/postgis-1.5','BOX3D_to_BOX'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION text(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5','LWGEOM_to_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION box3dtobox(box3d)
	RETURNS box
	AS 'SELECT box($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry(box2d)
	RETURNS geometry
	AS '$libdir/postgis-1.5','BOX2DFLOAT4_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry(box3d)
	RETURNS geometry
	AS '$libdir/postgis-1.5','BOX3D_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','parse_WKT_lwgeom'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry(chip)
	RETURNS geometry
	AS '$libdir/postgis-1.5','CHIP_to_LWGEOM'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geometry(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_bytea'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION bytea(geometry)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_to_bytea'
	LANGUAGE 'C' IMMUTABLE STRICT;
DROP CAST IF EXISTS (geometry AS box2d);
CREATE CAST (geometry AS box2d) WITH FUNCTION box2d(geometry) AS IMPLICIT;
DROP CAST IF EXISTS (geometry AS box3d);
CREATE CAST (geometry AS box3d) WITH FUNCTION box3d(geometry) AS IMPLICIT;
DROP CAST IF EXISTS (geometry AS box);
CREATE CAST (geometry AS box) WITH FUNCTION box(geometry) AS IMPLICIT;
DROP CAST IF EXISTS (box3d AS box2d);
CREATE CAST (box3d AS box2d) WITH FUNCTION box2d(box3d) AS IMPLICIT;
DROP CAST IF EXISTS (box2d AS box3d);
CREATE CAST (box2d AS box3d) WITH FUNCTION box3d(box2d) AS IMPLICIT;
DROP CAST IF EXISTS (box2d AS geometry);
CREATE CAST (box2d AS geometry) WITH FUNCTION geometry(box2d) AS IMPLICIT;
DROP CAST IF EXISTS (box3d AS box);
CREATE CAST (box3d AS box) WITH FUNCTION box(box3d) AS IMPLICIT;
DROP CAST IF EXISTS (box3d AS geometry);
CREATE CAST (box3d AS geometry) WITH FUNCTION geometry(box3d) AS IMPLICIT;
DROP CAST IF EXISTS (text AS geometry);
CREATE CAST (text AS geometry) WITH FUNCTION geometry(text) AS IMPLICIT;
DROP CAST IF EXISTS (geometry AS text);
CREATE CAST (geometry AS text) WITH FUNCTION text(geometry) AS IMPLICIT;
DROP CAST IF EXISTS (chip AS geometry);
CREATE CAST (chip AS geometry) WITH FUNCTION geometry(chip) AS IMPLICIT;
DROP CAST IF EXISTS (bytea AS geometry);
CREATE CAST (bytea AS geometry) WITH FUNCTION geometry(bytea) AS IMPLICIT;
DROP CAST IF EXISTS (geometry AS bytea);
CREATE CAST (geometry AS bytea) WITH FUNCTION bytea(geometry) AS IMPLICIT;
DROP CAST IF EXISTS (box3d_extent AS box3d);
CREATE CAST (box3d_extent AS box3d) WITH FUNCTION box3d_extent(box3d_extent) AS IMPLICIT;
DROP CAST IF EXISTS (box3d_extent AS box2d);
CREATE CAST (box3d_extent AS box2d) WITH FUNCTION box2d(box3d_extent) AS IMPLICIT;
DROP CAST IF EXISTS (box3d_extent AS geometry);
CREATE CAST (box3d_extent AS geometry) WITH FUNCTION geometry(box3d_extent) AS IMPLICIT;
CREATE OR REPLACE FUNCTION Simplify(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_simplify2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Simplify(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_simplify2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SnapToGrid(geometry, float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_snaptogrid'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_snaptogrid'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SnapToGrid(geometry, float8, float8)
	RETURNS geometry
	AS 'SELECT SnapToGrid($1, 0, 0, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, float8, float8)
	RETURNS geometry
	AS 'SELECT ST_SnapToGrid($1, 0, 0, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SnapToGrid(geometry, float8)
	RETURNS geometry
	AS 'SELECT SnapToGrid($1, 0, 0, $2, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, float8)
	RETURNS geometry
	AS 'SELECT ST_SnapToGrid($1, 0, 0, $2, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SnapToGrid(geometry, geometry, float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_snaptogrid_pointoff'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SnapToGrid(geometry, geometry, float8, float8, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_snaptogrid_pointoff'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Segmentize(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_segmentize2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Segmentize(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_segmentize2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION line_interpolate_point(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_interpolate_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_line_interpolate_point(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_interpolate_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION line_substring(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_substring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_line_substring(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_substring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION line_locate_point(geometry, geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_line_locate_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_line_locate_point(geometry, geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_line_locate_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION locate_between_measures(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_locate_between_m'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_locate_between_measures(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_locate_between_m'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION locate_along_measure(geometry, float8)
	RETURNS geometry
	AS $$ SELECT locate_between_measures($1, $2, $2) $$
	LANGUAGE 'sql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_locate_along_measure(geometry, float8)
	RETURNS geometry
	AS $$ SELECT locate_between_measures($1, $2, $2) $$
	LANGUAGE 'sql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AddMeasure(geometry, float8, float8) 
	RETURNS geometry 
	AS '$libdir/postgis-1.5', 'ST_AddMeasure' 
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION intersection(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','intersection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Intersection(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','intersection'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION buffer(geometry,float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5','buffer'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Buffer(geometry,float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5','buffer'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION _ST_Buffer(geometry,float8,cstring)
	RETURNS geometry
	AS '$libdir/postgis-1.5','buffer'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Buffer(geometry,float8,integer)
	RETURNS geometry
	AS $$ SELECT _ST_Buffer($1, $2,
		CAST('quad_segs='||CAST($3 AS text) as cstring))
	   $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_buffer(geometry,float8,text)
	RETURNS geometry
	AS $$ SELECT _ST_Buffer($1, $2,
		CAST( regexp_replace($3, '^[0123456789]+$',
			'quad_segs='||$3) AS cstring)
		)
	   $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION buffer(geometry,float8,integer)
	RETURNS geometry
	AS 'SELECT ST_Buffer($1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION convexhull(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','convexhull'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_ConvexHull(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','convexhull'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION _ST_LineCrossingDirection(geometry, geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5', 'ST_LineCrossingDirection'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_LineCrossingDirection(geometry, geometry)
	RETURNS integer AS
	$$ SELECT CASE WHEN NOT $1 && $2 THEN 0 ELSE _ST_LineCrossingDirection($1,$2) END $$
	LANGUAGE 'sql' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_LocateBetweenElevations(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'ST_LocateBetweenElevations'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SimplifyPreserveTopology(geometry, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5','topologypreservesimplify'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_IsValidReason(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5', 'isvalidreason'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_HausdorffDistance(geometry, geometry)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'hausdorffdistance'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_HausdorffDistance(geometry, geometry, float8)
	RETURNS FLOAT8
	AS '$libdir/postgis-1.5', 'hausdorffdistancedensify'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION difference(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','difference'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Difference(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','difference'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION boundary(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','boundary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Boundary(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','boundary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION symdifference(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','symdifference'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SymDifference(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','symdifference'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION symmetricdifference(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','symdifference'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_symmetricdifference(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','symdifference'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomUnion(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','geomunion'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Union(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','geomunion'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION collect(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_collect'
	LANGUAGE 'C' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_collect(geometry, geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_collect'
	LANGUAGE 'C' IMMUTABLE;
DROP AGGREGATE IF EXISTS memcollect(geometry);
CREATE AGGREGATE memcollect(
	sfunc = ST_collect,
	basetype = geometry,
	stype = geometry
	);
DROP AGGREGATE IF EXISTS ST_memcollect(geometry);
CREATE AGGREGATE ST_memcollect(
	sfunc = ST_collect,
	basetype = geometry,
	stype = geometry
	);
CREATE OR REPLACE FUNCTION ST_collect (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_collect_garray'
	LANGUAGE 'C' IMMUTABLE STRICT;
DROP AGGREGATE IF EXISTS MemGeomUnion(geometry);
CREATE AGGREGATE MemGeomUnion (
	basetype = geometry,
	sfunc = geomunion,
	stype = geometry
	);
DROP AGGREGATE IF EXISTS ST_MemUnion(geometry);
CREATE AGGREGATE ST_MemUnion (
	basetype = geometry,
	sfunc = ST_Union,
	stype = geometry
	);
CREATE OR REPLACE FUNCTION pgis_abs_in(cstring)
	RETURNS pgis_abs
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION pgis_abs_out(pgis_abs)
	RETURNS cstring
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION pgis_geometry_accum_transfn(pgis_abs, geometry)
	RETURNS pgis_abs
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION pgis_geometry_accum_finalfn(pgis_abs)
	RETURNS geometry[]
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION pgis_geometry_union_finalfn(pgis_abs)
	RETURNS geometry
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION pgis_geometry_collect_finalfn(pgis_abs)
	RETURNS geometry
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION pgis_geometry_polygonize_finalfn(pgis_abs)
	RETURNS geometry
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION pgis_geometry_makeline_finalfn(pgis_abs)
	RETURNS geometry
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C';
DROP AGGREGATE IF EXISTS accum(geometry);
CREATE AGGREGATE accum (
	sfunc = pgis_geometry_accum_transfn,
	basetype = geometry,
	stype = pgis_abs,
	finalfunc = pgis_geometry_accum_finalfn
	);
DROP AGGREGATE IF EXISTS ST_Accum(geometry);
CREATE AGGREGATE ST_Accum (
	sfunc = pgis_geometry_accum_transfn,
	basetype = geometry,
	stype = pgis_abs,
	finalfunc = pgis_geometry_accum_finalfn
	);
CREATE OR REPLACE FUNCTION unite_garray (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'pgis_union_geometry_array'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_unite_garray (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5','pgis_union_geometry_array'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Union (geometry[])
	RETURNS geometry
	AS '$libdir/postgis-1.5','pgis_union_geometry_array'
	LANGUAGE 'C' IMMUTABLE STRICT;
DROP AGGREGATE IF EXISTS ST_Union(geometry);
CREATE AGGREGATE ST_Union (
	basetype = geometry,
	sfunc = pgis_geometry_accum_transfn,
	stype = pgis_abs,
	finalfunc = pgis_geometry_union_finalfn
	);
DROP AGGREGATE IF EXISTS collect(geometry);
CREATE AGGREGATE collect (
	basetype = geometry,
	sfunc = pgis_geometry_accum_transfn,
	stype = pgis_abs,
	finalfunc = pgis_geometry_collect_finalfn
);
DROP AGGREGATE IF EXISTS ST_Collect(geometry);
CREATE AGGREGATE ST_Collect (
	BASETYPE = geometry,
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = pgis_abs,
	FINALFUNC = pgis_geometry_collect_finalfn
	);
DROP AGGREGATE IF EXISTS Polygonize(geometry);
CREATE AGGREGATE Polygonize (
	BASETYPE = geometry,
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = pgis_abs,
	FINALFUNC = pgis_geometry_polygonize_finalfn
	);
DROP AGGREGATE IF EXISTS ST_Polygonize(geometry);
CREATE AGGREGATE ST_Polygonize (
	BASETYPE = geometry,
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = pgis_abs,
	FINALFUNC = pgis_geometry_polygonize_finalfn
	);
DROP AGGREGATE IF EXISTS makeline(geometry);
CREATE AGGREGATE makeline (
	BASETYPE = geometry,
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = pgis_abs,
	FINALFUNC = pgis_geometry_makeline_finalfn
	);
DROP AGGREGATE IF EXISTS ST_MakeLine(geometry);
CREATE AGGREGATE ST_MakeLine (
	BASETYPE = geometry,
	SFUNC = pgis_geometry_accum_transfn,
	STYPE = pgis_abs,
	FINALFUNC = pgis_geometry_makeline_finalfn
	);
CREATE OR REPLACE FUNCTION relate(geometry,geometry)
	RETURNS text
	AS '$libdir/postgis-1.5','relate_full'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_relate(geometry,geometry)
	RETURNS text
	AS '$libdir/postgis-1.5','relate_full'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION relate(geometry,geometry,text)
	RETURNS boolean
	AS '$libdir/postgis-1.5','relate_pattern'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Relate(geometry,geometry,text)
	RETURNS boolean
	AS '$libdir/postgis-1.5','relate_pattern'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION disjoint(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Disjoint(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','disjoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION touches(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Touches(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','touches'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Touches(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Touches($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION _ST_DWithin(geometry,geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_dwithin'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_DWithin(geometry, geometry, float8)
	RETURNS boolean
	AS 'SELECT $1 && ST_Expand($2,$3) AND $2 && ST_Expand($1,$3) AND _ST_DWithin($1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION intersects(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Intersects(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','intersects'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Intersects(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Intersects($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION crosses(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Crosses(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','crosses'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Crosses(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Crosses($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION within(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Within(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','within'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Within(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Within($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION Contains(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Contains(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','contains'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Contains(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Contains($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION _ST_CoveredBy(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'coveredby'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_CoveredBy(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_CoveredBy($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION _ST_Covers(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'covers'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Covers(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Covers($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION _ST_ContainsProperly(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','containsproperly'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_ContainsProperly(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_ContainsProperly($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION overlaps(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Overlaps(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','overlaps'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Overlaps(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Overlaps($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION IsValid(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'isvalid'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_IsValid(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'isvalid'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION Centroid(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Centroid(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'centroid'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION IsRing(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_IsRing(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'isring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PointOnSurface(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PointOnSurface(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'pointonsurface'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION IsSimple(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'issimple'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_IsSimple(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'issimple'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Equals(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','geomequals'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Equals(geometry,geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5','geomequals'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Equals(geometry,geometry)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Equals($1,$2)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_GeomFromGML(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','geom_from_gml'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GMLToSQL(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','geom_from_gml'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromKML(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','geom_from_kml'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsSVG(geometry,int4,int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','assvg_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsSVG(geometry,int4,int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','assvg_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsSVG(geometry,int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','assvg_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsSVG(geometry,int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','assvg_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsSVG(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','assvg_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsSVG(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','assvg_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsGML(int4, geometry, int4, int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asGML'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsGML(geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML(2, $1, $2, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML(2, $1, $2, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsGML(geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML(2, $1, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML(2, $1, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(int4, geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML($1, $2, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(int4, geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML($1, $2, $3, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(geometry, int4, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML(2, $1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(int4, geometry, int4, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGML($1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsKML(int4, geometry, int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asKML'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsKML(geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML(2, transform($1,4326), $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML(2, ST_Transform($1,4326), $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsKML(geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML(2, transform($1,4326), 15)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsKML(int4, geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML($1, transform($2,4326), $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML(2, ST_Transform($1,4326), 15)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(int4, geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML($1, ST_Transform($2,4326), 15)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(int4, geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsKML($1, ST_Transform($2,4326), $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsGeoJson(int4, geometry, int4, int4)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asGeoJson'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGeoJson(1, $1, $2, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsGeoJson(1, $1, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(int4, geometry)
	RETURNS TEXT
	AS 'SELECT _ST_AsGeoJson($1, $2, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(int4, geometry, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGeoJson($1, $2, $3, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geometry, int4, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGeoJson(1, $1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(int4, geometry, int4, int4)
	RETURNS TEXT
	AS 'SELECT _ST_AsGeoJson($1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeoHash(geometry, int4)
	RETURNS TEXT
		AS '$libdir/postgis-1.5', 'ST_GeoHash'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeoHash(geometry)
	RETURNS TEXT
	AS 'SELECT ST_GeoHash($1, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION NumPoints(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_numpoints_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_NumPoints(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_numpoints_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION NumGeometries(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_numgeometries_collection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_NumGeometries(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_numgeometries_collection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeometryN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_geometryn_collection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeometryN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_geometryn_collection'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Dimension(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_dimension'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Dimension(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5', 'LWGEOM_dimension'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ExteriorRing(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_exteriorring_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_ExteriorRing(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_exteriorring_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION NumInteriorRings(geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5','LWGEOM_numinteriorrings_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_NumInteriorRings(geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5','LWGEOM_numinteriorrings_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION NumInteriorRing(geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5','LWGEOM_numinteriorrings_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_NumInteriorRing(geometry)
	RETURNS integer
	AS '$libdir/postgis-1.5','LWGEOM_numinteriorrings_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION InteriorRingN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_interiorringn_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_InteriorRingN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_interiorringn_polygon'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeometryType(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5', 'LWGEOM_getTYPE'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeometryType(geometry)
	RETURNS text
	AS '$libdir/postgis-1.5', 'geometry_geometrytype'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PointN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_pointn_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PointN(geometry,integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_pointn_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION X(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_x_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_X(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_x_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Y(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_y_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Y(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_y_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION Z(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_z_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Z(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_z_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION M(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_m_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_M(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_m_point'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION StartPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_startpoint_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_StartPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_startpoint_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION EndPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_endpoint_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_EndPoint(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_endpoint_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION IsClosed(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_isclosed_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_IsClosed(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_isclosed_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION IsEmpty(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_isempty'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_IsEmpty(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_isempty'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SRID(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5','LWGEOM_getSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SRID(geometry)
	RETURNS int4
	AS '$libdir/postgis-1.5','LWGEOM_getSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SetSRID(geometry,int4)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_setSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_SetSRID(geometry,int4)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_setSRID'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsBinary(geometry)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_asBinary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsBinary(geometry)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_asBinary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsBinary(geometry,text)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_asBinary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsBinary(geometry,text)
	RETURNS bytea
	AS '$libdir/postgis-1.5','LWGEOM_asBinary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION AsText(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asText'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsText(geometry)
	RETURNS TEXT
	AS '$libdir/postgis-1.5','LWGEOM_asText'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeometryFromText(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeometryFromText(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeometryFromText(text, int4)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeometryFromText(text, int4)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomFromText(text)
	RETURNS geometry AS 'SELECT geometryfromtext($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromText(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomFromText(text, int4)
	RETURNS geometry AS 'SELECT geometryfromtext($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromText(text, int4)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PointFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = ''POINT''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PointFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''POINT''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PointFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = ''POINT''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PointFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''POINT''
	THEN ST_GeomFromText($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = ''LINESTRING''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LineFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''LINESTRING''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = ''LINESTRING''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LineFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = ''LINESTRING''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineStringFromText(text)
	RETURNS geometry
	AS 'SELECT LineFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineStringFromText(text, int4)
	RETURNS geometry
	AS 'SELECT LineFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolyFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = ''POLYGON''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolyFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''POLYGON''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolyFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = ''POLYGON''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolyFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''POLYGON''
	THEN ST_GeomFromText($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolygonFromText(text, int4)
	RETURNS geometry
	AS 'SELECT PolyFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolygonFromText(text, int4)
	RETURNS geometry
	AS 'SELECT PolyFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolygonFromText(text)
	RETURNS geometry
	AS 'SELECT PolyFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolygonFromText(text)
	RETURNS geometry
	AS 'SELECT ST_PolyFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MLineFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromText($1, $2)) = ''MULTILINESTRING''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MLineFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromText($1, $2)) = ''MULTILINESTRING''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MLineFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = ''MULTILINESTRING''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MLineFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''MULTILINESTRING''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiLineStringFromText(text)
	RETURNS geometry
	AS 'SELECT ST_MLineFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiLineStringFromText(text)
	RETURNS geometry
	AS 'SELECT ST_MLineFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiLineStringFromText(text, int4)
	RETURNS geometry
	AS 'SELECT MLineFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiLineStringFromText(text, int4)
	RETURNS geometry
	AS 'SELECT MLineFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPointFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1,$2)) = ''MULTIPOINT''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPointFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = ''MULTIPOINT''
	THEN GeomFromText($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPointFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = ''MULTIPOINT''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPointFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''MULTIPOINT''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPointFromText(text, int4)
	RETURNS geometry
	AS 'SELECT MPointFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPointFromText(text)
	RETURNS geometry
	AS 'SELECT MPointFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPointFromText(text)
	RETURNS geometry
	AS 'SELECT ST_MPointFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPointFromText(text)
	RETURNS geometry
	AS 'SELECT MPointFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPointFromText(text)
	RETURNS geometry
	AS 'SELECT MPointFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPolyFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1, $2)) = ''MULTIPOLYGON''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPolyFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1, $2)) = ''MULTIPOLYGON''
	THEN ST_GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPolyFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromText($1)) = ''MULTIPOLYGON''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPolyFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromText($1)) = ''MULTIPOLYGON''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPolygonFromText(text, int4)
	RETURNS geometry
	AS 'SELECT MPolyFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPolygonFromText(text, int4)
	RETURNS geometry
	AS 'SELECT MPolyFromText($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPolygonFromText(text)
	RETURNS geometry
	AS 'SELECT MPolyFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPolygonFromText(text)
	RETURNS geometry
	AS 'SELECT MPolyFromText($1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomCollFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromText($1, $2)) = ''GEOMETRYCOLLECTION''
	THEN GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomCollFromText(text, int4)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromText($1, $2)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromText($1,$2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomCollFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromText($1)) = ''GEOMETRYCOLLECTION''
	THEN GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomCollFromText(text)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromText($1)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromText($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomFromWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_WKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromWKB(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_WKB'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomFromWKB(bytea, int)
	RETURNS geometry
	AS 'SELECT ST_SetSRID(GeomFromWKB($1), $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomFromWKB(bytea, int)
	RETURNS geometry
	AS 'SELECT ST_SetSRID(ST_GeomFromWKB($1), $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''POINT''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''POINT''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''POINT''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''POINT''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''LINESTRING''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''LINESTRING''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LinestringFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''LINESTRING''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LinestringFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''LINESTRING''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION LinestringFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''LINESTRING''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LinestringFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''LINESTRING''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''POLYGON''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''POLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''POLYGON''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''POLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolygonFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1,$2)) = ''POLYGON''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolygonFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1,$2)) = ''POLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION PolygonFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''POLYGON''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_PolygonFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''POLYGON''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1,$2)) = ''MULTIPOINT''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''MULTIPOINT''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''MULTIPOINT''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1,$2)) = ''MULTIPOINT''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPointFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1,$2)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''MULTIPOINT''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPointFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOINT''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiLineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''MULTILINESTRING''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiLineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''MULTILINESTRING''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiLineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''MULTILINESTRING''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiLineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTILINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MLineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''MULTILINESTRING''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MLineFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTILINESTRING''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MLineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''MULTILINESTRING''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MLineFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTILINESTRING''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''MULTIPOLYGON''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MPolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''MULTIPOLYGON''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MPolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1, $2)) = ''MULTIPOLYGON''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPolyFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1, $2)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION MultiPolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(GeomFromWKB($1)) = ''MULTIPOLYGON''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MultiPolyFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE WHEN geometrytype(ST_GeomFromWKB($1)) = ''MULTIPOLYGON''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomCollFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromWKB($1, $2)) = ''GEOMETRYCOLLECTION''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomCollFromWKB(bytea, int)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromWKB($1, $2)) = ''GEOMETRYCOLLECTION''
	THEN GeomFromWKB($1, $2)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION GeomCollFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(GeomFromWKB($1)) = ''GEOMETRYCOLLECTION''
	THEN GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeomCollFromWKB(bytea)
	RETURNS geometry
	AS '
	SELECT CASE
	WHEN geometrytype(ST_GeomFromWKB($1)) = ''GEOMETRYCOLLECTION''
	THEN ST_GeomFromWKB($1)
	ELSE NULL END
	'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION max_distance(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_maxdistance2d_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION _ST_MaxDistance(geometry,geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'LWGEOM_maxdistance2d_linestring'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION ST_MaxDistance(geometry,geometry)
	RETURNS float8
	AS 'SELECT _ST_MaxDistance(ST_ConvexHull($1), ST_ConvexHull($2))'
	LANGUAGE 'SQL' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION ST_ClosestPoint(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_closestpoint'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_ShortestLine(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_shortestline2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_LongestLine(geometry,geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_longestline2d'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LongestLine(geometry,geometry)
	RETURNS geometry
	AS 'SELECT _ST_LongestLine(ST_ConvexHull($1), ST_ConvexHull($2))'
	LANGUAGE 'SQL' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION _ST_DFullyWithin(geometry,geometry,float8)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_dfullywithin'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION ST_DFullyWithin(geometry, geometry, float8)
	RETURNS boolean
	AS 'SELECT $1 && ST_Expand($2,$3) AND $2 && ST_Expand($1,$3) AND _ST_DFullyWithin(ST_ConvexHull($1), ST_ConvexHull($2), $3)'
	LANGUAGE 'SQL' IMMUTABLE; 
CREATE OR REPLACE FUNCTION BdPolyFromText(text, integer)
RETURNS geometry
AS $$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := BuildArea(mline);

	IF GeometryType(geom) != 'POLYGON'
	THEN
		RAISE EXCEPTION 'Input returns more then a single polygon, try using BdMPolyFromText instead';
	END IF;

	RETURN geom;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_BdPolyFromText(text, integer)
RETURNS geometry
AS $$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := ST_BuildArea(mline);

	IF GeometryType(geom) != 'POLYGON'
	THEN
		RAISE EXCEPTION 'Input returns more then a single polygon, try using BdMPolyFromText instead';
	END IF;

	RETURN geom;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION BdMPolyFromText(text, integer)
RETURNS geometry
AS $$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := multi(BuildArea(mline));

	RETURN geom;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_BdMPolyFromText(text, integer)
RETURNS geometry
AS $$
DECLARE
	geomtext alias for $1;
	srid alias for $2;
	mline geometry;
	geom geometry;
BEGIN
	mline := ST_MultiLineStringFromText(geomtext, srid);

	IF mline IS NULL
	THEN
		RAISE EXCEPTION 'Input is not a MultiLinestring';
	END IF;

	geom := multi(ST_BuildArea(mline));

	RETURN geom;
END;
$$
LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION UnlockRows(text)
	RETURNS int
	AS $$ 
DECLARE
	ret int;
BEGIN

	IF NOT LongTransactionsEnabled() THEN
		RAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';
	END IF;

	EXECUTE 'DELETE FROM authorization_table where authid = ' ||
		quote_literal($1);

	GET DIAGNOSTICS ret = ROW_COUNT;

	RETURN ret;
END;
$$
LANGUAGE 'plpgsql'  VOLATILE STRICT;
CREATE OR REPLACE FUNCTION LockRow(text, text, text, text, timestamp)
	RETURNS int
	AS $$ 
DECLARE
	myschema alias for $1;
	mytable alias for $2;
	myrid   alias for $3;
	authid alias for $4;
	expires alias for $5;
	ret int;
	mytoid oid;
	myrec RECORD;
	
BEGIN

	IF NOT LongTransactionsEnabled() THEN
		RAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';
	END IF;

	EXECUTE 'DELETE FROM authorization_table WHERE expires < now()'; 

	SELECT c.oid INTO mytoid FROM pg_class c, pg_namespace n
		WHERE c.relname = mytable
		AND c.relnamespace = n.oid
		AND n.nspname = myschema;

	-- RAISE NOTICE 'toid: %', mytoid;

	FOR myrec IN SELECT * FROM authorization_table WHERE 
		toid = mytoid AND rid = myrid
	LOOP
		IF myrec.authid != authid THEN
			RETURN 0;
		ELSE
			RETURN 1;
		END IF;
	END LOOP;

	EXECUTE 'INSERT INTO authorization_table VALUES ('||
		quote_literal(mytoid::text)||','||quote_literal(myrid)||
		','||quote_literal(expires::text)||
		','||quote_literal(authid) ||')';

	GET DIAGNOSTICS ret = ROW_COUNT;

	RETURN ret;
END;
$$
LANGUAGE 'plpgsql'  VOLATILE STRICT;
CREATE OR REPLACE FUNCTION LockRow(text, text, text, text)
	RETURNS int
	AS
$$ SELECT LockRow($1, $2, $3, $4, now()::timestamp+'1:00'); $$
	LANGUAGE 'sql'  VOLATILE STRICT;
CREATE OR REPLACE FUNCTION LockRow(text, text, text)
	RETURNS int
	AS
$$ SELECT LockRow(current_schema(), $1, $2, $3, now()::timestamp+'1:00'); $$
	LANGUAGE 'sql'  VOLATILE STRICT;
CREATE OR REPLACE FUNCTION LockRow(text, text, text, timestamp)
	RETURNS int
	AS
$$ SELECT LockRow(current_schema(), $1, $2, $3, $4); $$
	LANGUAGE 'sql'  VOLATILE STRICT;
CREATE OR REPLACE FUNCTION AddAuth(text)
	RETURNS BOOLEAN
	AS $$ 
DECLARE
	lockid alias for $1;
	okay boolean;
	myrec record;
BEGIN
	-- check to see if table exists
	--  if not, CREATE TEMP TABLE mylock (transid xid, lockcode text)
	okay := 'f';
	FOR myrec IN SELECT * FROM pg_class WHERE relname = 'temp_lock_have_table' LOOP
		okay := 't';
	END LOOP; 
	IF (okay <> 't') THEN 
		CREATE TEMP TABLE temp_lock_have_table (transid xid, lockcode text);
			-- this will only work from pgsql7.4 up
			-- ON COMMIT DELETE ROWS;
	END IF;

	--  INSERT INTO mylock VALUES ( $1)
--	EXECUTE 'INSERT INTO temp_lock_have_table VALUES ( '||
--		quote_literal(getTransactionID()) || ',' ||
--		quote_literal(lockid) ||')';

	INSERT INTO temp_lock_have_table VALUES (getTransactionID(), lockid);

	RETURN true::boolean;
END;
$$
LANGUAGE PLPGSQL;
CREATE OR REPLACE FUNCTION CheckAuth(text, text, text)
	RETURNS INT
	AS $$ 
DECLARE
	schema text;
BEGIN
	IF NOT LongTransactionsEnabled() THEN
		RAISE EXCEPTION 'Long transaction support disabled, use EnableLongTransaction() to enable.';
	END IF;

	if ( $1 != '' ) THEN
		schema = $1;
	ELSE
		SELECT current_schema() into schema;
	END IF;

	-- TODO: check for an already existing trigger ?

	EXECUTE 'CREATE TRIGGER check_auth BEFORE UPDATE OR DELETE ON ' 
		|| quote_ident(schema) || '.' || quote_ident($2)
		||' FOR EACH ROW EXECUTE PROCEDURE CheckAuthTrigger('
		|| quote_literal($3) || ')';

	RETURN 0;
END;
$$
LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION CheckAuth(text, text)
	RETURNS INT
	AS
	$$ SELECT CheckAuth('', $1, $2) $$
	LANGUAGE 'SQL';
CREATE OR REPLACE FUNCTION CheckAuthTrigger()
	RETURNS trigger AS 
	'$libdir/postgis-1.5', 'check_authorization'
	LANGUAGE C;
CREATE OR REPLACE FUNCTION GetTransactionID()
	RETURNS xid AS 
	'$libdir/postgis-1.5', 'getTransactionID'
	LANGUAGE C;
CREATE OR REPLACE FUNCTION EnableLongTransactions()
	RETURNS TEXT
	AS $$ 
DECLARE
	"query" text;
	exists bool;
	rec RECORD;

BEGIN

	exists = 'f';
	FOR rec IN SELECT * FROM pg_class WHERE relname = 'authorization_table'
	LOOP
		exists = 't';
	END LOOP;

	IF NOT exists
	THEN
		"query" = 'CREATE TABLE authorization_table (
			toid oid, -- table oid
			rid text, -- row id
			expires timestamp,
			authid text
		)';
		EXECUTE "query";
	END IF;

	exists = 'f';
	FOR rec IN SELECT * FROM pg_class WHERE relname = 'authorized_tables'
	LOOP
		exists = 't';
	END LOOP;

	IF NOT exists THEN
		"query" = 'CREATE VIEW authorized_tables AS ' ||
			'SELECT ' ||
			'n.nspname as schema, ' ||
			'c.relname as table, trim(' ||
			quote_literal(chr(92) || '000') ||
			' from t.tgargs) as id_column ' ||
			'FROM pg_trigger t, pg_class c, pg_proc p ' ||
			', pg_namespace n ' ||
			'WHERE p.proname = ' || quote_literal('checkauthtrigger') ||
			' AND c.relnamespace = n.oid' ||
			' AND t.tgfoid = p.oid and t.tgrelid = c.oid';
		EXECUTE "query";
	END IF;

	RETURN 'Long transactions support enabled';
END;
$$
LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION LongTransactionsEnabled()
	RETURNS bool
AS $$ 
DECLARE
	rec RECORD;
BEGIN
	FOR rec IN SELECT oid FROM pg_class WHERE relname = 'authorized_tables'
	LOOP
		return 't';
	END LOOP;
	return 'f';
END;
$$
LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION DisableLongTransactions()
	RETURNS TEXT
	AS $$ 
DECLARE
	rec RECORD;

BEGIN

	--
	-- Drop all triggers applied by CheckAuth()
	--
	FOR rec IN
		SELECT c.relname, t.tgname, t.tgargs FROM pg_trigger t, pg_class c, pg_proc p
		WHERE p.proname = 'checkauthtrigger' and t.tgfoid = p.oid and t.tgrelid = c.oid
	LOOP
		EXECUTE 'DROP TRIGGER ' || quote_ident(rec.tgname) ||
			' ON ' || quote_ident(rec.relname);
	END LOOP;

	--
	-- Drop the authorization_table table
	--
	FOR rec IN SELECT * FROM pg_class WHERE relname = 'authorization_table' LOOP
		DROP TABLE authorization_table;
	END LOOP;

	--
	-- Drop the authorized_tables view
	--
	FOR rec IN SELECT * FROM pg_class WHERE relname = 'authorized_tables' LOOP
		DROP VIEW authorized_tables;
	END LOOP;

	RETURN 'Long transactions support disabled';
END;
$$
LANGUAGE 'plpgsql';
CREATE OR REPLACE FUNCTION ST_WKTToSQL(text)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION ST_WKBToSQL(bytea)
	RETURNS geometry
	AS '$libdir/postgis-1.5','LWGEOM_from_WKB'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION ST_CoordDim(geometry)
	RETURNS smallint
	AS '$libdir/postgis-1.5', 'LWGEOM_ndims'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION _ST_OrderingEquals(geometry, geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_same'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_OrderingEquals(geometry, geometry)
	RETURNS boolean
	AS $$ 
	SELECT $1 ~= $2 AND _ST_OrderingEquals($1, $2)
	$$	
	LANGUAGE 'SQL' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION SE_Is3D(geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_hasz'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SE_IsMeasured(geometry)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'LWGEOM_hasm'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Point(float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_makepoint'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION SE_Z(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_z_point'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION SE_M(geometry)
	RETURNS float8
	AS '$libdir/postgis-1.5','LWGEOM_m_point'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION ST_Polygon(geometry, int)
	RETURNS geometry
	AS $$ 
	SELECT setSRID(makepolygon($1), $2)
	$$	
	LANGUAGE 'SQL' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION SE_EnvelopesIntersect(geometry,geometry)
	RETURNS boolean
	AS $$ 
	SELECT $1 && $2
	$$	
	LANGUAGE 'SQL' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION SE_LocateAlong(geometry, float8)
	RETURNS geometry
	AS $$ SELECT locate_between_measures($1, $2, $2) $$
	LANGUAGE 'sql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION SE_LocateBetween(geometry, float8, float8)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_locate_between_m'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_typmod_in(cstring[])
	RETURNS integer
	AS '$libdir/postgis-1.5','geography_typmod_in'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION geography_typmod_out(integer)
	RETURNS cstring
	AS '$libdir/postgis-1.5','geography_typmod_out'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION geography_in(cstring, oid, integer)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_in'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION geography_out(geography)
	RETURNS cstring
	AS '$libdir/postgis-1.5','geography_out'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION geography_analyze(internal)
	RETURNS bool
	AS '$libdir/postgis-1.5','geography_analyze'
	LANGUAGE 'C' VOLATILE STRICT; 
CREATE TYPE geography (
	internallength = variable,
	input = geography_in,
	output = geography_out,
	typmod_in = geography_typmod_in,
	typmod_out = geography_typmod_out,
	analyze = geography_analyze,
	storage = main,
	alignment = double
);
CREATE OR REPLACE FUNCTION gidx_in(cstring)
	RETURNS gidx
	AS '$libdir/postgis-1.5','gidx_in'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE OR REPLACE FUNCTION gidx_out(gidx)
	RETURNS cstring
	AS '$libdir/postgis-1.5','gidx_out'
	LANGUAGE 'C' IMMUTABLE STRICT; 
CREATE TYPE gidx (
	internallength = variable,
	input = gidx_in,
	output = gidx_out,
	storage = plain,
	alignment = double
);
CREATE OR REPLACE FUNCTION geography(geography, integer, boolean)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_enforce_typmod'
	LANGUAGE 'C' IMMUTABLE STRICT; 
DROP CAST IF EXISTS (geography AS geography);
CREATE CAST (geography AS geography) WITH FUNCTION geography(geography, integer, boolean) AS IMPLICIT;
CREATE OR REPLACE FUNCTION ST_AsText(geography)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsText(text)
	RETURNS text AS
	$$ SELECT ST_AsText($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeographyFromText(text)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeogFromText(text)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_from_text'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsBinary(geography)
	RETURNS bytea
	AS '$libdir/postgis-1.5','geography_as_binary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsBinary(text)
	RETURNS bytea AS
	$$ SELECT ST_AsBinary($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_GeogFromWKB(bytea)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_from_binary'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_typmod_dims(integer)
	RETURNS integer
	AS '$libdir/postgis-1.5','geography_typmod_dims'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_typmod_srid(integer)
	RETURNS integer
	AS '$libdir/postgis-1.5','geography_typmod_srid'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_typmod_type(integer)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_typmod_type'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE VIEW geography_columns AS
	SELECT
		current_database() AS f_table_catalog, 
		n.nspname AS f_table_schema, 
		c.relname AS f_table_name, 
		a.attname AS f_geography_column,
		geography_typmod_dims(a.atttypmod) AS coord_dimension,
		geography_typmod_srid(a.atttypmod) AS srid,
		geography_typmod_type(a.atttypmod) AS type
	FROM 
		pg_class c, 
		pg_attribute a, 
		pg_type t, 
		pg_namespace n
	WHERE t.typname = 'geography'
        AND a.attisdropped = false
        AND a.atttypid = t.oid
        AND a.attrelid = c.oid
        AND c.relnamespace = n.oid
        AND NOT pg_is_other_temp_schema(c.relnamespace);
CREATE OR REPLACE FUNCTION geography(geometry)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_from_geometry'
	LANGUAGE 'C' IMMUTABLE STRICT;
DROP CAST IF EXISTS (geometry AS geography);
CREATE CAST (geometry AS geography) WITH FUNCTION geography(geometry) AS IMPLICIT;
CREATE OR REPLACE FUNCTION geometry(geography)
	RETURNS geometry
	AS '$libdir/postgis-1.5','geometry_from_geography'
	LANGUAGE 'C' IMMUTABLE STRICT;
DROP CAST IF EXISTS (geography AS geometry);
CREATE CAST (geography AS geometry) WITH FUNCTION geometry(geography) ;
CREATE OR REPLACE FUNCTION geography_gist_consistent(internal,geometry,int4) 
	RETURNS bool 
	AS '$libdir/postgis-1.5' ,'geography_gist_consistent'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_compress(internal) 
	RETURNS internal 
	AS '$libdir/postgis-1.5','geography_gist_compress'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_penalty(internal,internal,internal) 
	RETURNS internal 
	AS '$libdir/postgis-1.5' ,'geography_gist_penalty'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_picksplit(internal, internal) 
	RETURNS internal 
	AS '$libdir/postgis-1.5' ,'geography_gist_picksplit'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_union(bytea, internal) 
	RETURNS internal 
	AS '$libdir/postgis-1.5' ,'geography_gist_union'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_same(box2d, box2d, internal) 
	RETURNS internal 
	AS '$libdir/postgis-1.5' ,'geography_gist_same'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_decompress(internal) 
	RETURNS internal 
	AS '$libdir/postgis-1.5' ,'geography_gist_decompress'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_selectivity (internal, oid, internal, int4)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'geography_gist_selectivity'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_gist_join_selectivity(internal, oid, internal, smallint)
	RETURNS float8
	AS '$libdir/postgis-1.5', 'geography_gist_join_selectivity'
	LANGUAGE 'C';
CREATE OR REPLACE FUNCTION geography_overlaps(geography, geography) 
	RETURNS boolean 
	AS '$libdir/postgis-1.5' ,'geography_overlaps'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OPERATOR && (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_overlaps,
	COMMUTATOR = '&&',
	RESTRICT = geography_gist_selectivity, 
	JOIN = geography_gist_join_selectivity
);
CREATE OPERATOR CLASS gist_geography_ops
	DEFAULT FOR TYPE geography USING GIST AS
	STORAGE 	gidx,
	OPERATOR        3        &&	,
--	OPERATOR        6        ~=	,
--	OPERATOR        7        ~	,
--	OPERATOR        8        @	,
	FUNCTION        1        geography_gist_consistent (internal, geometry, int4),
	FUNCTION        2        geography_gist_union (bytea, internal),
	FUNCTION        3        geography_gist_compress (internal),
	FUNCTION        4        geography_gist_decompress (internal),
	FUNCTION        5        geography_gist_penalty (internal, internal, internal),
	FUNCTION        6        geography_gist_picksplit (internal, internal),
	FUNCTION        7        geography_gist_same (box2d, box2d, internal);
CREATE OR REPLACE FUNCTION geography_lt(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'geography_lt'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_le(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'geography_le'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_gt(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'geography_gt'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_ge(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'geography_ge'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_eq(geography, geography)
	RETURNS bool
	AS '$libdir/postgis-1.5', 'geography_eq'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION geography_cmp(geography, geography)
	RETURNS integer
	AS '$libdir/postgis-1.5', 'geography_cmp'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OPERATOR < (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_lt,
	COMMUTATOR = '>', NEGATOR = '>=',
	RESTRICT = contsel, JOIN = contjoinsel
);
CREATE OPERATOR <= (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_le,
	COMMUTATOR = '>=', NEGATOR = '>',
	RESTRICT = contsel, JOIN = contjoinsel
);
CREATE OPERATOR = (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_eq,
	COMMUTATOR = '=', -- we might implement a faster negator here
	RESTRICT = contsel, JOIN = contjoinsel
);
CREATE OPERATOR >= (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_ge,
	COMMUTATOR = '<=', NEGATOR = '<',
	RESTRICT = contsel, JOIN = contjoinsel
);
CREATE OPERATOR > (
	LEFTARG = geography, RIGHTARG = geography, PROCEDURE = geography_gt,
	COMMUTATOR = '<', NEGATOR = '<=',
	RESTRICT = contsel, JOIN = contjoinsel
);
CREATE OPERATOR CLASS btree_geography_ops
	DEFAULT FOR TYPE geography USING btree AS
	OPERATOR	1	< ,
	OPERATOR	2	<= ,
	OPERATOR	3	= ,
	OPERATOR	4	>= ,
	OPERATOR	5	> ,
	FUNCTION	1	geography_cmp (geography, geography);
CREATE OR REPLACE FUNCTION ST_AsSVG(geography,int4,int4)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_svg'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsSVG(geography,int4)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_svg'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsSVG(geography)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_svg'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsSVG(text)
	RETURNS text AS
	$$ SELECT ST_AsSVG($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsGML(int4, geography, int4, int4)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_gml'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(geography, int4)
	RETURNS text
	AS 'SELECT _ST_AsGML(2, $1, $2, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(geography)
	RETURNS text
	AS 'SELECT _ST_AsGML(2, $1, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(text)
	RETURNS text AS
	$$ SELECT ST_AsGML($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(int4, geography)
	RETURNS text
	AS 'SELECT _ST_AsGML($1, $2, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(int4, geography, int4)
	RETURNS text
	AS 'SELECT _ST_AsGML($1, $2, $3, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(geography, int4, int4)
	RETURNS text
	AS 'SELECT _ST_AsGML(2, $1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGML(int4, geography, int4, int4)
	RETURNS text
	AS 'SELECT _ST_AsGML($1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsKML(int4, geography, int4)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_kml'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(geography, int4)
	RETURNS text
	AS 'SELECT _ST_AsKML(2, $1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(geography)
	RETURNS text
	AS 'SELECT _ST_AsKML(2, $1, 15)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(text)
	RETURNS text AS
	$$ SELECT ST_AsKML($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(int4, geography)
	RETURNS text
	AS 'SELECT _ST_AsKML($1, $2, 15)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsKML(int4, geography, int4)
	RETURNS text
	AS 'SELECT _ST_AsKML($1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_AsGeoJson(int4, geography, int4, int4)
	RETURNS text
	AS '$libdir/postgis-1.5','geography_as_geojson'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geography, int4)
	RETURNS text
	AS 'SELECT _ST_AsGeoJson(1, $1, $2, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geography)
	RETURNS text
	AS 'SELECT _ST_AsGeoJson(1, $1, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(text)
	RETURNS text AS
	$$ SELECT ST_AsGeoJson($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(int4, geography)
	RETURNS text
	AS 'SELECT _ST_AsGeoJson($1, $2, 15, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(int4, geography, int4)
	RETURNS text
	AS 'SELECT _ST_AsGeoJson($1, $2, $3, 0)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(geography, int4, int4)
	RETURNS text
	AS 'SELECT _ST_AsGeoJson(1, $1, $2, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_AsGeoJson(int4, geography, int4, int4)
	RETURNS text
	AS 'SELECT _ST_AsGeoJson($1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Distance(geography, geography, float8, boolean)
	RETURNS float8
	AS '$libdir/postgis-1.5','geography_distance'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION _ST_DWithin(geography, geography, float8, boolean)
	RETURNS boolean
	AS '$libdir/postgis-1.5','geography_dwithin'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Distance(geography, geography, boolean)
	RETURNS float8
	AS 'SELECT _ST_Distance($1, $2, 0.0, $3)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Distance(geography, geography)
	RETURNS float8
	AS 'SELECT _ST_Distance($1, $2, 0.0, true)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Distance(text, text)
	RETURNS float8 AS
	$$ SELECT ST_Distance($1::geometry, $2::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Expand(geography, float8)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_expand'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_DWithin(geography, geography, float8, boolean)
	RETURNS boolean
	AS 'SELECT $1 && _ST_Expand($2,$3) AND $2 && _ST_Expand($1,$3) AND _ST_DWithin($1, $2, $3, $4)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_DWithin(geography, geography, float8)
	RETURNS boolean
	AS 'SELECT $1 && _ST_Expand($2,$3) AND $2 && _ST_Expand($1,$3) AND _ST_DWithin($1, $2, $3, true)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_DWithin(text, text, float8)
	RETURNS boolean AS
	$$ SELECT ST_DWithin($1::geometry, $2::geometry, $3);  $$
	LANGUAGE 'SQL' IMMUTABLE ;
CREATE OR REPLACE FUNCTION ST_Area(geography, boolean)
	RETURNS float8
	AS '$libdir/postgis-1.5','geography_area'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Area(geography)
	RETURNS float8
	AS 'SELECT ST_Area($1, true)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Area(text)
	RETURNS float8 AS
	$$ SELECT ST_Area($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Length(geography, boolean)
	RETURNS float8
	AS '$libdir/postgis-1.5','geography_length'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Length(geography)
	RETURNS float8
	AS 'SELECT ST_Length($1, true)'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_Length(text)
	RETURNS float8 AS
	$$ SELECT ST_Length($1::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_PointOutside(geography)
	RETURNS geography
	AS '$libdir/postgis-1.5','geography_point_outside'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_Covers(geography, geography)
	RETURNS boolean
	AS '$libdir/postgis-1.5','geography_covers'
	LANGUAGE 'C' IMMUTABLE STRICT
	COST 100;
CREATE OR REPLACE FUNCTION ST_Covers(geography, geography)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Covers($1, $2)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Covers(text, text)
	RETURNS boolean AS
	$$ SELECT ST_Covers($1::geometry, $2::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE ;
CREATE OR REPLACE FUNCTION ST_CoveredBy(geography, geography)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Covers($2, $1)'
	LANGUAGE 'SQL' IMMUTABLE ;
CREATE OR REPLACE FUNCTION ST_CoveredBy(text, text)
	RETURNS boolean AS
	$$ SELECT ST_CoveredBy($1::geometry, $2::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE ;
CREATE OR REPLACE FUNCTION ST_Intersects(geography, geography)
	RETURNS boolean
	AS 'SELECT $1 && $2 AND _ST_Distance($1, $2, 0.0, false) < 0.00001'
	LANGUAGE 'SQL' IMMUTABLE;
CREATE OR REPLACE FUNCTION ST_Intersects(text, text)
	RETURNS boolean AS
	$$ SELECT ST_Intersects($1::geometry, $2::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE ;
CREATE OR REPLACE FUNCTION _ST_BestSRID(geography, geography)
	RETURNS integer
	AS '$libdir/postgis-1.5','geography_bestsrid'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION _ST_BestSRID(geography)
	RETURNS integer
	AS 'SELECT _ST_BestSRID($1,$1)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Buffer(geography, float8)
	RETURNS geography
	AS 'SELECT geography(ST_Transform(ST_Buffer(ST_Transform(geometry($1), _ST_BestSRID($1)), $2), 4326))'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Buffer(text, float8)
	RETURNS geometry AS
	$$ SELECT ST_Buffer($1::geometry, $2);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Intersection(geography, geography)
	RETURNS geography
	AS 'SELECT geography(ST_Transform(ST_Intersection(ST_Transform(geometry($1), _ST_BestSRID($1, $2)), ST_Transform(geometry($2), _ST_BestSRID($1, $2))), 4326))'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_Intersection(text, text)
	RETURNS geometry AS
	$$ SELECT ST_Intersection($1::geometry, $2::geometry);  $$
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_CurveToLine(geometry, integer)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_curve_segmentize'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_CurveToLine(geometry)
	RETURNS geometry AS 'SELECT ST_CurveToLine($1, 32)'
	LANGUAGE 'SQL' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_HasArc(geometry)
	RETURNS boolean
	AS '$libdir/postgis-1.5', 'LWGEOM_has_arc'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_LineToCurve(geometry)
	RETURNS geometry
	AS '$libdir/postgis-1.5', 'LWGEOM_line_desegmentize'
	LANGUAGE 'C' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MinimumBoundingCircle(inputgeom geometry, segs_per_quarter integer)
	RETURNS geometry AS
$BODY$
	DECLARE
	hull GEOMETRY;
	ring GEOMETRY;
	center GEOMETRY;
	radius DOUBLE PRECISION;
	dist DOUBLE PRECISION;
	d DOUBLE PRECISION;
	idx1 integer;
	idx2 integer;
	l1 GEOMETRY;
	l2 GEOMETRY;
	p1 GEOMETRY;
	p2 GEOMETRY;
	a1 DOUBLE PRECISION;
	a2 DOUBLE PRECISION;


	BEGIN

	-- First compute the ConvexHull of the geometry
	hull = ST_ConvexHull(inputgeom);
	--A point really has no MBC
	IF ST_GeometryType(hull) = 'ST_Point' THEN
		RETURN hull;
	END IF;
	-- convert the hull perimeter to a linestring so we can manipulate individual points
	--If its already a linestring force it to a closed linestring
	ring = CASE WHEN ST_GeometryType(hull) = 'ST_LineString' THEN ST_AddPoint(hull, ST_StartPoint(hull)) ELSE ST_ExteriorRing(hull) END;

	dist = 0;
	-- Brute Force - check every pair
	FOR i in 1 .. (ST_NumPoints(ring)-2)
		LOOP
			FOR j in i .. (ST_NumPoints(ring)-1)
				LOOP
				d = ST_Distance(ST_PointN(ring,i),ST_PointN(ring,j));
				-- Check the distance and update if larger
				IF (d > dist) THEN
					dist = d;
					idx1 = i;
					idx2 = j;
				END IF;
			END LOOP;
		END LOOP;

	-- We now have the diameter of the convex hull.  The following line returns it if desired.
	-- RETURN MakeLine(PointN(ring,idx1),PointN(ring,idx2));

	-- Now for the Minimum Bounding Circle.  Since we know the two points furthest from each
	-- other, the MBC must go through those two points. Start with those points as a diameter of a circle.

	-- The radius is half the distance between them and the center is midway between them
	radius = ST_Distance(ST_PointN(ring,idx1),ST_PointN(ring,idx2)) / 2.0;
	center = ST_Line_interpolate_point(ST_MakeLine(ST_PointN(ring,idx1),ST_PointN(ring,idx2)),0.5);

	-- Loop through each vertex and check if the distance from the center to the point
	-- is greater than the current radius.
	FOR k in 1 .. (ST_NumPoints(ring)-1)
		LOOP
		IF(k <> idx1 and k <> idx2) THEN
			dist = ST_Distance(center,ST_PointN(ring,k));
			IF (dist > radius) THEN
				-- We have to expand the circle.  The new circle must pass trhough
				-- three points - the two original diameters and this point.

				-- Draw a line from the first diameter to this point
				l1 = ST_Makeline(ST_PointN(ring,idx1),ST_PointN(ring,k));
				-- Compute the midpoint
				p1 = ST_line_interpolate_point(l1,0.5);
				-- Rotate the line 90 degrees around the midpoint (perpendicular bisector)
				l1 = ST_Translate(ST_Rotate(ST_Translate(l1,-X(p1),-Y(p1)),pi()/2),X(p1),Y(p1));
				--  Compute the azimuth of the bisector
				a1 = ST_Azimuth(ST_PointN(l1,1),ST_PointN(l1,2));
				--  Extend the line in each direction the new computed distance to insure they will intersect
				l1 = ST_AddPoint(l1,ST_Makepoint(X(ST_PointN(l1,2))+sin(a1)*dist,Y(ST_PointN(l1,2))+cos(a1)*dist),-1);
				l1 = ST_AddPoint(l1,ST_Makepoint(X(ST_PointN(l1,1))-sin(a1)*dist,Y(ST_PointN(l1,1))-cos(a1)*dist),0);

				-- Repeat for the line from the point to the other diameter point
				l2 = ST_Makeline(ST_PointN(ring,idx2),ST_PointN(ring,k));
				p2 = ST_Line_interpolate_point(l2,0.5);
				l2 = ST_Translate(ST_Rotate(ST_Translate(l2,-X(p2),-Y(p2)),pi()/2),X(p2),Y(p2));
				a2 = ST_Azimuth(ST_PointN(l2,1),ST_PointN(l2,2));
				l2 = ST_AddPoint(l2,ST_Makepoint(X(ST_PointN(l2,2))+sin(a2)*dist,Y(ST_PointN(l2,2))+cos(a2)*dist),-1);
				l2 = ST_AddPoint(l2,ST_Makepoint(X(ST_PointN(l2,1))-sin(a2)*dist,Y(ST_PointN(l2,1))-cos(a2)*dist),0);

				-- The new center is the intersection of the two bisectors
				center = ST_Intersection(l1,l2);
				-- The new radius is the distance to any of the three points
				radius = ST_Distance(center,ST_PointN(ring,idx1));
			END IF;
		END IF;
		END LOOP;
	--DONE!!  Return the MBC via the buffer command
	RETURN ST_Buffer(center,radius,segs_per_quarter);

	END;
$BODY$
	LANGUAGE 'plpgsql' IMMUTABLE STRICT;
CREATE OR REPLACE FUNCTION ST_MinimumBoundingCircle(geometry)
 RETURNS geometry AS
'SELECT ST_MinimumBoundingCircle($1, 48)'
 LANGUAGE 'sql' IMMUTABLE STRICT;
DROP AGGREGATE IF EXISTS geomunion(geometry);
DROP AGGREGATE IF EXISTS st_geomunion(geometry);
DROP AGGREGATE IF EXISTS accum_old(geometry);
DROP AGGREGATE IF EXISTS st_accum_old(geometry);
DROP FUNCTION IF EXISTS box2d_overleft(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_overright(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_left(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_right(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_contain(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_contained(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_overlap(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_same(box2d, box2d);
DROP FUNCTION IF EXISTS box2d_intersects(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_overleft(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_overright(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_left(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_right(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_contain(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_contained(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_overlap(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_same(box2d, box2d);
DROP FUNCTION IF EXISTS st_box2d_intersects(box2d, box2d);
DROP FUNCTION IF EXISTS st_addbbox(geometry);
DROP FUNCTION IF EXISTS st_dropbbox(geometry); 
DROP FUNCTION IF EXISTS st_hasbbox(geometry); 
DROP FUNCTION IF EXISTS cache_bbox();
DROP FUNCTION IF EXISTS st_cache_bbox();
DROP FUNCTION IF EXISTS transform_geometry(geometry,text,text,int);
DROP FUNCTION IF EXISTS collector(geometry, geometry);
DROP FUNCTION IF EXISTS st_collector(geometry, geometry);
DROP FUNCTION IF EXISTS geom_accum (geometry[],geometry);
DROP FUNCTION IF EXISTS st_geom_accum (geometry[],geometry);
DROP FUNCTION IF EXISTS collect_garray (geometry[]);
DROP FUNCTION IF EXISTS st_collect_garray (geometry[]);
DROP FUNCTION IF EXISTS geosnoop(geometry);
DROP FUNCTION IF EXISTS jtsnoop(geometry);
DROP FUNCTION IF EXISTS st_noop(geometry);
DROP FUNCTION IF EXISTS st_max_distance(geometry, geometry);
COMMIT;
