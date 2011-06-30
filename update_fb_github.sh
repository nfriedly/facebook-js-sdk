#! /bin/bash

# Facebook all.js deminifyier and updater script.
# Tracks changes to all.js & all.css with some help
#
# By Nathan Friedly - http://nfriedly.com
#
# This script is released under an MIT License. Accompanying files 
# may have different licenses.


###
# Function that downloads the latest all.js/css file and compares it to the old one.
# 
# If only the timestamp has changed, it restores the old file
#
# @param {string} fileType - "js" or "css"
# @return {int} changed - 0 if nothing but the timestamp changed, 1 if other lines have changed
###
getChanges(){
	# make a backup copy to diff against the latest all.js/css.
	mv all.$1 all_old.$1

	# download the latest facebook all.js/css
	/usr/bin/wget -q  -O all.$1 https://connect.facebook.net/en_US/all.$1

	# compare the latest with the backup to see if anything besides the
	# timestamp comment at the top changed
	local changes=$(/usr/bin/diff --brief --ignore-matching-lines=\/\*.*\*\/  all.$1 all_old.$1)
	
	if [[ changes == "" ]]; then 
		# no changes, or only the timestamp changed
		# put back the old file
		mv all_old.$1 all.$1
		return 0
	else
		# something else has changed
		# get rid of the old file
		rm all_old.$1
		return 1
	fi
}

# change  to the directory where this script is located
cd `dirname $0`


JS_CHANGES=$(getChanges "js")

CSS_CHANGES=$(getChanges "css")

# if anything has changed besides the timestamp in the JS
if [[ $JS_CHANGES ]]; then
	
	# deminify the script
	/usr/bin/python lib/jsbeautifier.py -o all_deminified.js all.js
	
	# add it to the staging area
	/usr/bin/git add *.js
fi

# if anything has changed besides the timestamp in the CSS
if [[ $CSS_CHANGES ]]; then
	
	# deminify the file	
	# this requires php5-cli
	/usr/bin/php lib/csstidy_wrapper.php all.css all_deminified.css
	
	# add it to the staging area
	/usr/bin/git add *.css
fi

# if anything changed in either file, commit and push to github
if [[ $JS_CHANGES || $CSS_CHANGES ]]; then

	echo "Sending changes to github"
	
	# commit with yesterday's date since this is typically run
	# shortly after midnight
	/usr/bin/git commit -m "FB changes from `date --date=yesterday +'%A, %B %-d, %Y'`"
	/usr/bin/git push -q origin master
	
else
	echo "No changes"
fi

