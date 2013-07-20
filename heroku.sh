#! /bin/bash

# ./tmp is the only writeable directory on heroku instances. It is regularly wiped.
# so, we check if our file is already there, and if not, clone the repo to ./tmp
if [ ! -f tmp/debug.js ]; then
  git clone https://github.com/nfriedly/connect-js tmp
fi

# lastly, run our script
cd tmp/
../update_fb_github.sh