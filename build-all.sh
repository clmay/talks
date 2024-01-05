#!/bin/sh

output_dir=$1
base_path=$2

for dir in */; do
    if [ -f "$dir/package.json" ]; then
        if grep -q "slidev" "$dir/package.json"; then
            cd "$dir"
            npx slidev build --base /"$base_path"/"$dir"/
            cp -r ./dist/ ../"$output_dir"/"$base_path"/"$dir"
            cd ..
        fi
    fi
done
