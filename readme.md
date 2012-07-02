Facebook's JS SDK, de-minified.
===============================

https://github.com/facebook/connect-js hasn't recieved a meaningfull update in months, meanwhile Facebook has pushed 
new JS/CSS to production nearly every week. This project aims to provide a useful resource to developers who are 
working with Facebook's JS SDK and would like to see what has changed recently. 

My server runs a nightly cronjob that downloads the latest http://connect.facebook.net/en_US/all.js and the 
accompanying all.css, de-minifies them, and push any changes to github.

The script does not commit if only the timestamp at the top has changed.

---

Setup
-----

To run your own copy (which I recommend), you'll need to fork the github project, test the shell script, and then 
set up an appropriate crontab. Mine looks like this:

    MAILTO="nathan@[my_site].com"
    # m h dom mon dow command
    0 5 * * * /home/nfriedly/facebook/connect-js/./update_fb_github.sh > /dev/null

This setup sends me an email if there were errors, but not if everything worked successfully.

The CSS Tidy wrapper requires php5-cli: ` sudo aptitude install php5-cli`

---

Official FB links
-----------------

**Documentation for the JavaScript SDK:** 

* http://developers.facebook.com/docs/reference/javascript/

**Bug Tracker:** 

* https://developers.facebook.com/bugs 

**Recent Changes & Current Status:**

* Change Log: https://developers.facebook.com/docs/changelog/
* Platform Live Status: https://developers.facebook.com/live_status
* JSON feed of current push status and most recent Platform Live Status issue: https://www.facebook.com/feeds/api_status.php

**Upcomming & Long-term Changes:** 

* Code that will be released within a day or two -- be sure to label any bugs as BETA: https://developers.facebook.com/support/beta-tier/
* Developer Blog: https://developers.facebook.com/blog/
* Platform Roadmap: https://developers.facebook.com/roadmap/

---

Credits
-------

Credit for the idea goes to Roger Hu - http://hustoknow.blogspot.com/

The shell script and csstidy wrapper are copyright Nathan Friedly http://nfriedly.com and released under an MIT License.

The JS is copyright Facebook, Inc. and, to the best of my knowledge, released under an Apache 2.0 License

Other files included in lib/ have their own licenses.

This is obviously not endorsed or supported by Facebook - if it was, they'd probably update their own github account.

---
Related
-------

https://github.com/tomwaddington/facebook-js-sdk is a similar project that gets updated 3 times per day.