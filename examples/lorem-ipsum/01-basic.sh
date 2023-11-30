#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Lot of varibables replaced"
test mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum.txt.mold -o .
