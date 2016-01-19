#!/bin/sh

# Input/Output generation functions
function generate_dir_input_list ()
{
	# Using the given directory as an argument, create
	# the input file list.
	this_dir=$1

	# Create the output file directory, relative to the root dir,
	# in windows path format
	this_rel_dir_win=`echo $this_dir | sed -e s#$ROOT_DIR##g | sed -e 's#/#\\\\#g'`
	echo "SetOutPath \"\$INSTDIR$this_rel_dir_win\""

	# Output the file list, relative to the root dir, in windows path
	# format
	file_list_win=`find $this_dir -type f -maxdepth 1 -print | sed -e s#$ROOT_DIR##g | sed -e 's#/#\\\\#g'`
	for this_file in $file_list_win;
	do
		echo "File \"\${WIN32DIST_DIR}$this_file\"";
	done;

	# Output a blank line
	echo
}



# Find all the subdirectories below ROOT_DIR
ROOT_DIR=../distfiles
DIR_LIST=`find $ROOT_DIR -type d -print | xargs`

for THIS_DIR in ${DIR_LIST};
do
	# Get the count of files in this directory
	FILE_COUNT=`find $THIS_DIR -type f -maxdepth 1 -print | wc -l`

	# If there is at least one file in the directory then
	# include it
	if [ $FILE_COUNT -gt 0 ];
	then
		generate_dir_input_list $THIS_DIR;
	fi
done;

