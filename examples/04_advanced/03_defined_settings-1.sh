#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Defined Settings: check variables file"
test mold -v apply defined_settings_1.toml defined_settings.txt.mold
test cat defined_settings_1.toml
test cat defined_settings.txt
