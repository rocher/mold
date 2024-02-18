#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Including lot of templates: check source and definition files"
test mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum-includes-01.txt.mold .
