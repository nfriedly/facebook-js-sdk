# Facebook all.js deminifyier and updater script.
# Tracks changes to all.js with some help
#
# By Nathan Friedly <nathan@nfriedly.com>
#
# This script is released under an MIT License. Accompanying files 
# may have different licenses.

# change  to the directory where this script is located
cd `dirname $0`
#download the latest facebook all.js
/usr/bin/wget https://connect.facebook.net/en_US/all.js -O all.js

# use sed to remove the timestamp from the beginning
# (avoids usless commits where nothing but the timestamp changed)
/bin/sed -i 's/\/\*[0-9]\+,[0-9]\+,JIT/\/*\[timestamp removed\],JIT/' all.js

# deminify the script
/usr/bin/python jsbeautifier.py -o all_deminified.js all.js

# and, lastly, send it to github
/usr/bin/git add *.js
/usr/bin/git commit -m `date --rfc-3339=date`
/usr/bin/git push origin master
