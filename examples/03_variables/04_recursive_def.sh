#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Recursive definition or variables"
test mold -v apply vars-def-2.toml vars-def-1.txt.mold
test cat vars-def-2.toml
