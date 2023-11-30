#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Variables defined with variables"
test mold -v apply vars-def-1.toml vars-def-1.txt.mold -o .
