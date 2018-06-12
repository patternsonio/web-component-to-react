#!/bin/bash

node demo/server.js >/dev/null &
CHILD_ID=$!
trap 'kill $CHILD_ID' EXIT
$(npm bin)/cypress run $1
