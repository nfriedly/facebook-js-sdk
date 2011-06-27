Since https://github.com/facebook/connect-js hasn't recieved a meaningfull update in months, even 
though facebook has pushed new JS to production nearly every week, this project aims to provide a 
useful resource to developers who are working with facebook's JS SDK and would like to see what has 
changed recently.

My server runs a nightly cronjob to download the latest file from 
http://connect.facebook.net/en_US/all.js, de-minify it, and push the changes to github.

The script removes the timestamp from the beginning of all.js because sometimes that is all that
had changed.

To run your own copy (which I recommend), you'll need to fork the github project, test the shell 
script, and then set up an appropriate crontab. Mine looks like this:

0 5 * * * /home/nfriedly/facebook/connect-js/./update_fb_github.sh 2>&1 > /dev/null


Documentation for the JavaScript SDK is at http://developers.facebook.com/docs/reference/javascript/ 
and bugs in it can be filled at http://http://bugs.developers.facebook.net/


Credit for the idea goes to Roger Hu - http://hustoknow.blogspot.com/

The shell script is copyright Nathan Friedly http://nfriedly.com - and released under an MIT 
License.

The JS is copyright Facebook, Inc. and, to the best of my knowledge, released under an Apache 2.0 
License

This is obviously not endorsed or supported by Facebook - if it was, they'd probably update their 
own github account.
