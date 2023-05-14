#!/bin/bash

# set your project ID
PROJECT_ID=accenture-283510

# check if function name is provided as argument
if [ $# -ne 1 ]; then
  echo "Usage: $0 <function-name>"
  exit 1
fi

# get the function name from the command line argument
FUNCTION_NAME=$1

# list all functions in the project and extract their source code URLs and names
FUNCTIONS=$(gcloud functions list  --project $PROJECT_ID --filter="name:$FUNCTION_NAME" --format='value(name,sourceArchiveUrl)')

# loop over the functions and download the source code for the matching function
for FUNC in $FUNCTIONS
do
  # split the function name and source code URL
  NAME=$(echo $FUNC | cut -f1 -d' ')
  URL=$(echo $FUNC | cut -f2 -d' ')
  
  # use the function name as the filename
  FILENAME="$NAME.zip"
  
  echo "Downloading $FILENAME"
  wget -O $FILENAME $URL
done