# Project Tree

```
my-tree-project/
  ├── node_modules/
  ├── src/
  │   ├── main.js
  │   ├── controllers/
  │   │   └── test/ 
  │   │   │   ├── main.js
  │   │   │   ├── router.js
  │   │   │   └── package.json
  │   ├── middleware/
  │   │   ├── environment.js
  │   │   └── error.js
  │   └── qore/
  │       └── qore.js
  └── .eslintrc.yml
  ├── package.json
  └── .babelrc
  └── .parcelrc
  └── .gcloudignore
  └── .env
  └── deploy-function.sh
```


# Benefit

Faster project initiation and iteration (debugging).

# Disadvantage

Exposed API keys and other sensitive information in deployed index.js because Parcel is unable to leave them as they are.

# Preps

1. Complete the tutorial by Mas Saepul, which can be found at https://gist.github.com/MochSM/aeb117be579e920b949a6d5797a7d236
2. Install the Google Cloud SDK and Python.
3. Run `npm i` 

# How to debug ?

1. Run npm `npm run build-root`, and then run `npm run watch`. 
2. Alternatively, run `npm run build-controller`, and then run `npm start ./src/controller/test/main.js` or whichever function you want to run.
3. You can test it with Postman, Insomnia, or a similar tool.

# How to deploy ?

1. Ensure that you have built the project by running `npm run build-root` or `npm run build` (build both the root and controller).
2. Modify `deploy-function.sh` and change `template` to your project name, also currently entry-point point to `main`, change as you please.
3. Ensure that all required dependencies for THAT SPECIFIC FUNCTION are declared in `../controller/*/package.json`. (You can leave libraries you use for other functions but that are not required in here.)
4. Open a Bash terminal and type `./deploy-function.sh FUNCTION_NAME` (ensure that the name matches the endpoint folder name and follows the standard naming convention by Google for Cloud Functions).
5. Done.

# EXTRA - ESlint

You can freely choose which preconfigured ESLint you prefer. In my case, I chose Google. Just run, `npm init @eslint/config`.

