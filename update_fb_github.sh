# Facebook all.js deminifyier and updater script.
# Tracks changes to all.js & all.css with some help
#
# By Nathan Friedly - http://nfriedly.com
#
# This script is released under an MIT License. Accompanying files 
# may have different licenses.

# change  to the directory where this script is located
cd `dirname $0`

# make a backup copy to diff against the latest all.js/css. 
mv all.js all_old.js
mv all.css all_old.css

# download the latest facebook all.js/css
/usr/bin/wget https://connect.facebook.net/en_US/all.js -O all.js
/usr/bin/wget https://connect.facebook.net/en_US/all.css -O all.css

# compare the latest with the backup to see if anything besides the
# timestamp comment at the top changed
JS_CHANGES=$(/usr/bin/diff --brief --ignore-matching-lines=\/\*.*\*\/  all.js all_old.js)
CSS_CHANGES=$(/usr/bin/diff --brief --ignore-matching-lines=\/\*.*\*\/  all.css all_old.css)

# if anything has changed besides the timestamp
if [[ $JS_CHANGES != ""  || $CSS_CHANGES != "" ]]; then
	
	# get rid of the old file
	rm all_old.js
	rm all_old.css
	
	# deminify the script
	/usr/bin/python lib/jsbeautifier.py -o all_deminified.js all.js
	
	# this requires php5-cli
	/usr/bin/php lib/csstidy_wrapper.php all.css all_deminified.css

	# and, lastly, send it to github
	/usr/bin/git add *.js
	/usr/bin/git add *.css	
	
	# commit with yesterday's date since this is typically run
	# shortly after midnight
	/usr/bin/git commit -m "FB changes from `date --date=yesterday +'%A, %B %-d, %Y'`"
	/usr/bin/git push origin master
else 
	
	# put the old file back (keeps the timestamps in sync between
	# minified and deminified)
	mv all_old.js all.js
	mv all_old.css all.css
fi
