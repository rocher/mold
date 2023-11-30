#1/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Including templates of templates"
test mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum-includes-03.txt.mold -o .
