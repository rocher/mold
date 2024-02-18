#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Warning on undefined variables, empty replacement"
test mold -v apply foo.toml foo_bar.txt.mold -u empty
test cat foo.toml
test cat foo_bar.txt.mold
test cat foo_bar.txt
