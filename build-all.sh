#!/bin/sh

output_dir=$1

for dir in */; do
    if [ -f "$dir/package.json" ]; then
        if grep -q "slidev" "$dir/package.json"; then
            cd "$dir"
            npx slidev build
            cp -r ./dist/ ../$output_dir/$dir
            cd ..
        fi
    fi
done
