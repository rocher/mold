#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../test.sh
title "Second basic example"
test mold -v apply foo-bar.toml foo-bar.txt.mold -o .
