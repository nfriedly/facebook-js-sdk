# Facebook all.js deminifyier and updater script.
# Tracks changes to all.js with some help
#
# By Nathan Friedly - http://nfriedly.com
#
# This script is released under an MIT License. Accompanying files 
# may have different licenses.

# change  to the directory where this script is located
cd `dirname $0`

# make a backup copy to diff against the latest all.js. 
mv all.js all_old.js

# download the latest facebook all.js
/usr/bin/wget https://connect.facebook.net/en_US/all.js -O all.js

# compare the latest with the backup to see if anything besides the
# timestamp comment at the top changed
DIFF=$(/usr/bin/diff --brief --ignore-matching-lines=\/\*.*\*\/  all.js all_old.js)

# if anything has changed besides the timestamp
if [[ $DIFF != "" ]]; then
	
	# get rid of the old file
	rm all_old.js
	
	# deminify the script
	/usr/bin/python jsbeautifier.py -o all_deminified.js all.js

	# and, lastly, send it to github
	/usr/bin/git add *.js
	
	# commit with yesterday's date since this is typically run
	# shortly after midnight
	/usr/bin/git commit -m "FB changes from `date --date=yesterday +'%A, %B %-d, %Y'`"
	/usr/bin/git push origin master
else 
	
	# put the old file back (keeps the timestamps in sync between
	# minified and deminified)
	mv all_old.js all.js
fi
