#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Warning on undefined variables, empty replacement"
test mold -v apply foo.toml foo-bar.txt.mold -o -c empty -l warning .
