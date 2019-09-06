#!/usr/bin/env bash
# $1 is an npm token

# Exit when any command fail
set -eo pipefail

# Get local package version
PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

if npm show sudden version | grep -w "$PACKAGE_VERSION" > /dev/null; then
  echo "Already published!";
else
  npm set //registry.npmjs.org/:_authToken=$1
  npm publish;
fi
