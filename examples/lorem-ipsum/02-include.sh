#1/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Including lot of templates"
test mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum-includes-01.txt.mold -o .
