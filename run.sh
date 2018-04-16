#! /bin/bash
sass --watch sass:css &
nodemon -e js,html,css index.js ${1:-3030}
