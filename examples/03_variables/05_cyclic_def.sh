#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Cyclic definition of a set of variables: check definitions file"
test mold -v apply vars-def-3.toml vars-def-1.txt.mold
