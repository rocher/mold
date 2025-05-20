#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Variables defined with variables"
cmd mold -v apply vars-def-1.toml vars-def-1.txt.mold
test cat vars-def-1.toml
test cat vars-def-1.txt.mold
test cat vars-def-1.txt
