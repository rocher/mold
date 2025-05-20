#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "First basic example"
cmd mold apply foo.toml foo.txt.mold
test cat foo.toml
test cat foo.txt.mold
test cat foo.txt
