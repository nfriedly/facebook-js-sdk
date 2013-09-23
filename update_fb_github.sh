#! /bin/bash

# Facebook all.js/debug.js updater script.
#
# By Nathan Friedly - http://nfriedly.com
#
# This script is released under an MIT License. Accompanying files
# may have different licenses.


###
# Function that downloads the latest debug.js file and compares it to the old one.
#
# If only the timestamp has changed, it restores the old file
#
# @return {int} changed - 0 if nothing but the timestamp changed, 1 if other lines have changed
###
getChanges(){
	# make a backup copy to diff against the latest all.js/css.
	mv debug.js debug_old.js

	# download the latest facebook all.js/css
	curl --silent -O https://connect.facebook.net/en_US/all/debug.js
	
	# grab the timestamps from the old and new js files
	local new_timestamp=$(getTimestamp debug.js)
	local old_timestamp=$(getTimestamp debug_old.js)
	
	# only continue if the new file has a newer timestamp
	# this prevents accidental "reverse commits" that would result from hitting a stale cache
	if [[ new_timestamp -gt old_timestamp ]]; then
		
		# compare the latest with the backup to see if anything besides the
		# timestamp comment at the top changed
		local changes=$(/usr/bin/diff --brief --ignore-matching-lines=\/\*.*\*\/  debug.js debug_old.js)

		# an empty string is falsy, a string with text is truthy
		if [[ $changes ]]; then
			# something else has changed
			# get rid of the old file
			rm debug_old.js
		else
			# no changes, or only the timestamp changed
			# put back the old file
			mv debug_old.js debug.js
		fi

		# this is the "return" value - some text if there were changes or "" otherwise
		echo $changes
	
	fi
}

getTimestamp() {
	# The first number on the first line is the timestamp. Example:
	# /*1379959149,182005047,JIT Construction: v945041,en_US*/
	head -1 $1 | sed 's/\/\*\([0-9]*\),.*/\1/'
}

# change  to the directory where this script is located
# disabled for heroku, uncomment if necessary for your setup.
#cd `dirname $0`

# check for js changes
JS_CHANGES=$(getChanges)


# if anything has changed besides the timestamp in the JS
if [[ $JS_CHANGES ]]; then
	# add it to the staging area
	/usr/bin/git add *.js

	echo "Sending changes to github"

	# commit with the date and a short summary
	/usr/bin/git commit -m "FB update `date +'%A, %B %-d, %Y'` - `git diff --cached --shortstat | sed 's/1 files* changed, //'`"
	/usr/bin/git push -q origin master
else
	echo "No changes"
fi

