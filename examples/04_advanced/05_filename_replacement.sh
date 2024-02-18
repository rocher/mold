#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Predefined filters"
test mold -v apply settings_1.toml __foo__-and-__bar__.txt.mold
test cat __foo__-and-__bar__.txt.mold
test cat foo-and-foo.txt
