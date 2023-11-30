#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Recursive definition or variable"
test mold -v apply vars-def-2.toml vars-def-1.txt.mold -o .
