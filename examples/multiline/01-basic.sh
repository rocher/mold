#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Multiline variables"
test mold -v apply multiline.toml multiline.txt.mold -o .
