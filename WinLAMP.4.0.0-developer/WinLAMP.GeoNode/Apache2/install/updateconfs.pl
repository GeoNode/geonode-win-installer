# retrieve hostname using ipconfig
open(IFCONFIGALL,"ipconfig/all|") || print "Can't open IPconfig!\n";
while (<IFCONFIGALL>) { last if (/Host Name/); }
$HOSTNAME = substr($_,index($_,':')+2,14);
chomp($HOSTNAME);
print " Current Host Name: $HOSTNAME \n\n";
close(IFCONFIGALL);

print " Hi. This Perl script is updating your config files \n with your local machine settings.\n\n";

# retrieve path &tc from command-line parameters
$INSTALLPATH    = $ARGV[0];
$CONFPATH       = $INSTALLPATH;
$CONFPATH       =~ s/\\/\//g;
$SERVERNAME     = $ARGV[1] || $HOSTNAME || "localhost";
# some complaints that ServerName was empty, so I added this default
if (!$ARGV[1]) {$SERVERNAME="localhost"}
$ADMINADDRESS   = $ARGV[2] || "admin\@email\.address";
$SERVERPORT     = $ARGV[3] || "80";
$GEOSERVERPORT  = $ARGV[4] || "8080";
$GEONODEPATH    = $ARGV[5] || "C:\GeoNode-2.4\geonode-2.4";
$GEONODEPATH    =~ s/\\/\//g;

print " installpath:    $INSTALLPATH \n";
print " confpath:       $CONFPATH \n";
print " servername:     $SERVERNAME \n";
print " adminaddress:   $ADMINADDRESS \n";
print " serverport:     $SERVERPORT \n";
print " geoserverport:  $GEOSERVERPORT \n";
print " geonodepath:    $GEONODEPATH \n";

# MODIFY APACHE HTTPD.CONF
# replace ServerName, and C:/Apache2 with new outpath
$filein = "$INSTALLPATH\\install\\httpd.winlamp.conf";
$fileout = "$INSTALLPATH\\conf\\httpd.conf";
print "\n $filein \n $fileout \n";
open (FILE, $filein) || die "Cannot read from $filein";
open (TMP, ">$fileout") || die "Cannot write to $fileout\n";
while (<FILE>) {
	s/C:\/Apache2/$CONFPATH/gi;
	s/ServerName localhost/ServerName $SERVERNAME/gi;
	s/winlamp\@example\.com/$ADMINADDRESS/gi;
	s/80/$SERVERPORT/gi;
    s/8080/$GEOSERVERPORT/gi;
	print TMP;
}
close FILE, TMP;
print "\n httpd.conf updated \n";

# MODIFY APACHE GEONODE.CONF
# replace ServerName, and C:/Apache2 with new outpath
$filein = "$INSTALLPATH\\install\\geonode.winlamp.conf";
$fileout = "$INSTALLPATH\\conf\\geonode.conf";
print "\n $filein \n $fileout \n";
open (FILE, $filein) || die "Cannot read from $filein";
open (TMP, ">$fileout") || die "Cannot write to $fileout\n";
while (<FILE>) {
	s/C:\/GeoNode-2.4/$GEONODEPATH/gi;
    s/8080/$GEOSERVERPORT/gi;
	print TMP;
}
close FILE, TMP;
print "\n geonode.conf updated \n";

# # MODIFY PHP PHP.INI
# # replace C:\Apache with new PATH
# $filein = "$INSTALLPATH\\install\\php.winlamp.ini";
# $fileout = "$INSTALLPATH\\modules\\php\\php.ini";
# print "\n $filein \n $fileout \n";
# open (FILE, $filein) || die "Cannot read from $filein";
# open (TMP, ">$fileout") || die "Cannot write to $fileout\n";
# while (<FILE>) {
# 	s/C:\\Apache2/$INSTALLPATH/gi;
# 	print TMP;
# }
# close FILE, TMP;
# print "\n php.ini updated \n";

sleep 3;