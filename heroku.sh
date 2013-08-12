#! /bin/bash

# ./tmp is the only writeable directory on heroku instances, and it is regularly wiped.
# so, we check if our file is already there, and if not, clone the repo to ./tmp
if [ ! -f tmp/debug.js ]; then
  # you must set the $GH_USER & $GH_PASS variables with `heroku config:add GH_USER=username`
  git clone https://$GH_USER:$GH_PASS@github.com/$GH_USER/facebook-js-sdk tmp
fi

# lastly, run our script
cd tmp/
../update_fb_github.sh