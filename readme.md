# V2

This version not using Parcel/Babel to built first the project per controller but rather directly flattening directory and send all files as is, meaning it not consist of two file (index and package.json) but also all file needed, like middleware or qore.

# Project Tree

```
my-tree-project/
  ├── node_modules/
  ├── src/
  │   ├── index.js
  │   ├── controllers/
  │   │   └── test/ 
  │   │   │   ├── index.js
  │   │   │   ├── router.js
  │   │   │   └── package.json
  │   ├── middleware/
  │   │   ├── environment.js
  │   │   └── error.js
  │   └── qore/
  │       └── qore.js
  └── .eslintrc.yml
  ├── package.json
  └── .env
  └── deploy.sh
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

2. Modify `deploy.sh` and change `template` to your project name, also currently entry-point point to `main`, change as you please.
3. Ensure that all required dependencies for THAT SPECIFIC FUNCTION are declared in `../controller/*/package.json`. (You can leave libraries you use for other functions but that are not required in here.)
4. Open a Bash terminal and type `./deploy.sh FUNCTION_NAME` (ensure that the name matches the endpoint folder name and follows the standard naming convention by Google for Cloud Functions).
5. Done.

# EXTRA - ESlint

You can freely choose which preconfigured ESLint you prefer. In my case, I chose Google. Just run, `npm init @eslint/config`.

