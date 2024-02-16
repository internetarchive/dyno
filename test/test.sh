#!/bin/zsh -e

# requirements:
# - Repo should have a `test/` directory at its top-level.
# - You run this script at the top-level of your repo with no cmd-line arguments or
#   a list of test filenames or test subdirs to test.

TOP=
while true; do
  [ -e test ] && TOP=$(pwd)
  [ -e test ] && break
  DIR=$(pwd)
  [ "$DIR" = "/" ] && break
  cd ..
done

# having a $HOME/test doesnt count ;-)
[ "$TOP" = "$HOME" ]  &&  TOP=

[ $TOP ] || echo 'wasnt able to find test/ subdir here or in any parent dir'
[ $TOP ] || exit 1

echo "running tests in $TOP"
cd $TOP

find coverage -delete 2>/dev/null || echo ''

deno test -A --coverage=$TOP/coverage --location=https://archive.org --no-check "$@"

deno coverage coverage --exclude=no-exclusions --lcov >| $TOP/coverage/lcov.lcov

lcov --derive-func-data --ignore-errors empty -l         $TOP/coverage/lcov.lcov
