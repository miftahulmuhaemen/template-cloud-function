# V2

This version not using Parcel/Babel to built, but rather simply copying the files directly to cloud function.
Because of that, it can utilize process.env still and maintain readable code.

<!-- All done with only bash script. Also I add backup and restore script. -->

# Project Tree

```
my-tree-project/
├── .env
├── .eslintrc.yml
├── .gitignore
├── backup.sh
├── deploy.sh
├── package.json
├── restore.sh
└── src
  ├── constant.js
  ├── controllers
  │  └── test
  │    ├── index.js
  │    ├── package.json
  │    └── router.js
  ├── index.js
  ├── middleware
  │  ├── environment.js
  │  └── error.js
  └── qore
    └── qore.js
```


# Benefit

Faster project initiation and iteration.

# Preps

1. Complete the tutorial by Mas Saepul, which can be found at https://gist.github.com/MochSM/aeb117be579e920b949a6d5797a7d236
2. Install the Google Cloud SDK and Python.
3. Run `npm i` 

# How to debug ?

1. Run `npm run watch`. 
2. You can test it with Postman, Insomnia, or a similar tool.

# How to deploy ?

1. Modify `deploy.sh` and change `template` to your project name, also currently entry-point point to `main`, change as you please.
2. Ensure that all required dependencies for THAT SPECIFIC FUNCTION are declared in `../controller/*/package.json`. (You can leave libraries you use for other functions but that are not required in here.)
3. Open a Bash terminal and type `./deploy.sh FUNCTION_NAME` (ensure that the name matches the endpoint folder name and follows the standard naming convention by Google for Cloud Functions).
4. Done.
<!-- 
# How to backup ?

1. Run `./backup.sh FUNCTION_NAME`

# How to restore ?

0. Run backup first if you haven't.
1. Run `./restore.sh`, this reupload all `.zip` files on the same directory the script exist. -->

# EXTRA - ESlint

You can freely choose which preconfigured ESLint you prefer. In my case, I chose Google. Just run, `npm init @eslint/config`.

