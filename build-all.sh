#!/usr/bin/env sh

for dir in ./src/*; do
    (
        cd "$dir"
        if grep -q '"build": "slidev' package.json; then
            npm run build
        fi
    )
done
