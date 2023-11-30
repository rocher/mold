#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Warning on undefined variables, ignore it"
test mold -v apply foo.toml foo-bar.txt.mold -o -c ignore -l warning .
