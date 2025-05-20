#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Replacement in filenames\n--  check source and dest files"
cmd mold -v apply defined_settings_1.toml __foo__-and-__bar__.txt.mold
test cat defined_settings_1.toml
test cat __foo__-and-__bar__.txt.mold
test cat foo-and-foo.txt
