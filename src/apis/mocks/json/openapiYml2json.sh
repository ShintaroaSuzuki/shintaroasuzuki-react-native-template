#!/bin/bash

cd `dirname $0`

exit_code=0

execute_files=("http_for_app.yml")

for file in $execute_files; do
	echo "Converting ./server/openapi/$file to json"
	yarn swagger-cli -r -t json -o ./src/apis/mocks/json/${file%.*}.json bundle ./server/openapi/$file
	if [ $? -ne 0 ]; then
		exit_code=1
	fi
done

exit $exit_code
