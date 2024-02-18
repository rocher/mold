#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Multiline variables: check variables file"
test mold -v apply multiline.toml multiline.txt.mold
