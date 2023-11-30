#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Error on undefined variable"
test mold -v apply foo.toml foo-bar.txt.mold -o -l error .
