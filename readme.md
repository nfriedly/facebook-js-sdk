Facebook JS SDK, tracked and de-minified
===================================================

This project aims to provide a useful resource to developers who are working with 
Facebook's JS SDK and would like to see what has changed recently. 

The script here regularly downloads https://connect.facebook.net/en_US/sdk/debug.js,
commits any changes, and then pushes to github. 

(debug.js is the non-minified version of http://connect.facebook.net/en_US/sdk.js that 
you're probably using in production.)

The script does not commit if only the timestamp at the top has changed.

See also: https://github.com/andyblackwell/adtech-js-monitoring/ - tracks all.js as well as a variety of other scripts from Facebook and other vendors.

---

## Running your own copy

Running your own copy is easy, and recommended!

### Setup on GitHub

I think just forking this project will be enough to get your own instance that updates on the same schedule as this one.

Note that if GitHub were to ever take this repo down, they may take down forks also.

### Setup locally

Clone the github project, test the shell script, and then 
set up cronjob like so:

    MAILTO="you@[your_site].com"
    # m h dom mon dow command
    0 5 * * * /home/nfriedly/facebook/connect-js/update_fb_github.sh > /dev/null

This setup sends an email if there were errors, but not if everything worked successfully.

### Setup on Heroku

This used to work on a free Heroku instance, but I can't log into Heroku any more :shrug:. 

Official FB links
-----------------

**Documentation for the JavaScript SDK:** 

* https://developers.facebook.com/docs/javascript
* https://developers.facebook.com/docs/javascript/advanced-setup/

**Bug Tracker:** 

* https://developers.facebook.com/support/bugs/

**Recent Changes & Current Status:**

* Change Log: https://developers.facebook.com/docs/graph-api/changelog
* Platform Live Status: https://metastatus.com/graph-api

**Upcoming & Long-term Changes:** 

* Developer Blog: https://developers.facebook.com/blog/

---

To Do
-----

* Keep a copy of the minified sdk.js in addition to debug.js
* Track the beta js
* Figure out how to get error notifications if the heroku process fails

---

Credits
-------

Credit for the idea goes to Roger Hu - http://hustoknow.blogspot.com/

The shell scripts are copyright Nathan Friedly http://nfriedly.com and released under an MIT License.

The JS is copyright Facebook, Inc. and released under an Apache 2.0 License
