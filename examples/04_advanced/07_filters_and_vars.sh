#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Filters and variable substitution"
cmd mold show-vars filters+vars.toml | sort
test cat filters+vars.toml
