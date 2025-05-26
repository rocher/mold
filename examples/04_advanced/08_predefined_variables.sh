#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Predefined variables"
cmd mold apply empty.toml predefined_vars.txt.mold
test cat predefined_vars.txt.mold
test cat predefined_vars.txt
