#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Error on undefined variable"
cmd mold -v apply foo.toml foo_bar.txt.mold
test cat foo.toml
test cat foo_bar.txt.mold
test cat foo_bar.txt
