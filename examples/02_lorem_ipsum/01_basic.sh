#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Lot of single variables replaced\n--  check source and definitions files"
cmd mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum.txt.mold .
