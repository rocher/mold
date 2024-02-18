#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Ignore undefined variables"
test mold -v apply foo.toml foo_bar.txt.mold -u ignore
test cat foo.toml
test cat foo_bar.txt.mold
test cat foo_bar.txt
