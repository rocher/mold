#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Replacement in filenames: check source and dest files"
test mold -v apply defined_settings_1.toml __foo__-and-__bar__.txt.mold
test cat defined_settings_1.toml
test cat __foo__-and-__bar__.txt.mold
test cat foo-and-foo.txt
