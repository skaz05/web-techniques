#!/bin/bash

# Initialize an array to store image file names
image_files=()

# Loop through all the files in the current directory
for file in *; do
    # Check if the item is a file and has a .jpg, .jpeg, or .png extension
    if [[ -f "$file" && ("$file" == *.jpg || "$file" == *.jpeg || "$file" == *.png) ]]; then
        # Append the file name to the array
        image_files+=("$file")
    fi
done

# Print the array elements
echo "${image_files[@]}"

