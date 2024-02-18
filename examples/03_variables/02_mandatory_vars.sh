#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Mandatory vars: error when undefined"
test mold -v apply foo.toml mandatory_vars.txt.mold -u ignore
test cat mandatory_vars.txt.mold
test cat mandatory_vars.txt
