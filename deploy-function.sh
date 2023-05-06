#!/bin/bash

# Discover all controller directories in the project
controllers=($(find ./src/controllers -type d -mindepth 1 -maxdepth 1 -exec basename {} \;))

# Define a mapping between controller names and function names
declare -A function_map=()

for controller in "${controllers[@]}"; do
    function_map[$controller]="template-$controller"
done

# Get the function name from the mapping based on the endpoint name
function_name=${function_map[$1]}

if [ -z "$function_name" ]; then
  echo "Error: Invalid endpoint name"
  exit 1
fi

# Deploy the Cloud Function with the given name and package.json file
gcloud functions deploy $function_name --gen2 --runtime=nodejs18  --region=asia-southeast2 --source=./src/controllers/$1/ --entry-point=main --trigger-http --allow-unauthenticated --memory=256MB --timeout=30s --verbosity=info --ignore-file=../../../.gcloudignore