#!/bin/bash
CWD="$(realpath $(dirname $0))"
source $CWD/../common.sh
title "Including templates of templates\n--  check source and definition files"
cmd mold -v apply toml/lorem-ipsum.toml mold/lorem-ipsum-includes-02.txt.mold .
