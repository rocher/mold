#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Cyclic definition of variables"
test mold -v apply vars-def-3.toml vars-def-1.txt.mold -o .
