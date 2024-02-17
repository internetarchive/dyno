#!/bin/zsh -ex

# runs lint then tests

MYDIR=${0:a:h}

$MYDIR/lint

$MYDIR/test/test.sh
