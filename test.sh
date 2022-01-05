#!/bin/bash -ex

# runs lint then tests

./lint

./test/test.sh
