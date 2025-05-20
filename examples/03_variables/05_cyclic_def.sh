#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Cyclic definition of a set of variables\n--  check definitions file"
cmd mold -v apply vars-def-3.toml vars-def-1.txt.mold
