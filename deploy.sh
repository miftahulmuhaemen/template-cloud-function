#!/bin/bash

# Set the name of the deploy folder
deploy_folder="./deploy"

# Create the deploy folder if it doesn't exist
if [ ! -d "$deploy_folder" ]; then
  mkdir "$deploy_folder"
fi

# Discover all controller directories in the project
controllers=($(find ./src/controllers -type d -mindepth 1 -maxdepth 1 -exec basename {} \;))

# Define a mapping between controller names and function names
declare -A function_map=()

for controller in "${controllers[@]}"; do
  function_map[$controller]="megavin-$controller"
done

# Get the function name from the mapping based on the endpoint name
function_name=${function_map[$1]}

if [ -z "$function_name" ]; then
  echo "Error: Invalid endpoint name"
  exit 1
fi

# Copy the controller directory to the deploy folder
cp -R "./src/controllers/$1" "$deploy_folder"

# Define an array of OBLIGATORY files to copy
files=("constant.js" "qore/qore.js" "middleware/environment.js" "middleware/error.js")

# Loop through the files and copy them to the $deploy_folder/$1 directory
for file in "${files[@]}"; do
  file_name=$(echo "$file" | sed 's/.*\///; s/\.js$//')
  cp "./src/$file" "$deploy_folder/$1/$file_name.js"
  sed -i "s|require('\.\./\(.*\)/\(.*\)');|require('./\2.js');|g" "$deploy_folder/$1/$file_name.js"
  sed -i "s|require('\.\./\(.*\)');|require('./\1.js');|g" "$deploy_folder/$1/$file_name.js"
done

# Define an array of NON-OBLIGATORY files to check for
files=("")

# Loop through the files and copy them if they are required in the index.js or router.js file
for file in "${files[@]}"; do
  file_name=$(echo "$file" | sed 's/.*\///; s/\.js$//')
  if grep -q "$file_name" "./src/controllers/$1/index.js" || grep -q "$file_name" "./src/controllers/$1/router.js"; then
    cp "./src/$file" "$deploy_folder/$1/$file_name.js"
    sed -i "s|require('\.\./\(.*\)/\(.*\)');|require('./\2.js');|g" "$deploy_folder/$1/$file_name.js"
    sed -i "s|require('\.\./\(.*\)');|require('./\1.js');|g" "$deploy_folder/$1/$file_name.js"
  fi
done

# Removing trail paths
sed -i "s|require('../../middleware/error')|require('./error.js')|g" "$deploy_folder/$1/index.js"
sed -i -e "s|require('\.\./\.\./\(.*\)/\(.*\)')|require('./\2.js')|g; s|require('\.\./\.\./middleware/\(.*\)')|require('./middleware/\1.js')|g; s|require('\.\./\.\./constant')|require('./constant.js')|g; s|require('\.\./\.\./qore/qore')|require('./qore.js')|g" "$deploy_folder/$1/router.js"

# Copy contents of .env file to a new file, .env.yaml
sed 's/\(.*\)=\(.*\)/\1: "\2"/' .env > .env.yaml
# Remove the line with `env_variables`
sed -i '/env_variables/d' .env.yaml

# Deploy the Cloud Function with the given name and package.json file
gcloud functions deploy $function_name --gen2 --runtime=nodejs18  --region=asia-southeast2 --source=./deploy/$1/ --entry-point=main --trigger-http --allow-unauthenticated --memory=256MB --timeout=30s --verbosity=info --env-vars-file .env.yaml

# # Remove everything after pushing
rm -rf ./deploy

