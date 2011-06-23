pushd /home/nfriedly/facebook/connect-js/
/usr/bin/wget https://connect.facebook.net/en_US/all.js -O all.js
/usr/bin/python jsbeautifier.py -o all_deminified.js all.js
/usr/bin/git add .
/usr/bin/git commit -m `date --rfc-3339=date`
/usr/bin/git push origin master
popd
