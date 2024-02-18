#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Second basic example: -v to see verbose info"
test mold -v apply foo_bar.toml foo_bar.txt.mold
test cat foo_bar.txt.mold
test cat foo_bar.txt
