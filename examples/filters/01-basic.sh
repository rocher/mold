#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Predefined filters"
test mold -v apply predefined-filters.toml predefined-filters.txt.mold -o .
