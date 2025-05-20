#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Detection of circular references in included files\n--  check source and definition files"
cmd mold -v apply defined_settings_1.toml circular-ref.txt.mold .
