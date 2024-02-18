#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Predefined filters"
test mold -v apply predefined_filters.toml predefined_filters.txt.mold
