#! /bin/bash
sass --watch sass:static/dist/css & nodemon -e js,html,css index.js ${1:-3030} && kill $!
