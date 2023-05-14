#!/bin/bash

# set your project ID
PROJECT_ID=accenture-283510

# loop over all zip files in the current directory and deploy them
for ZIP_FILE in *.zip
do
  # get the function name from the zip file name
  FUNCTION_NAME=$(basename $ZIP_FILE .zip)

  # deploy the function
  gcloud functions deploy $FUNCTION_NAME \
    --project $PROJECT_ID \
    --entry-point <entry-point-function> \
    --runtime <runtime> \
    --trigger-http \
    --memory <memory> \
    --timeout <timeout> \
    --source $ZIP_FILE
done
