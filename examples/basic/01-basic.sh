#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "First basic example"
test mold -v apply foo.toml foo.txt.mold -o .
