#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Lot of single varibables replaced: check source and definitions files"
test mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum.txt.mold .
