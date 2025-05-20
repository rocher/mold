#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Optional variables: replaced when defined"
cmd mold -v apply foo.toml optional_vars.txt.mold -u ignore
test cat foo.toml
test cat optional_vars.txt.mold
test cat optional_vars.txt
