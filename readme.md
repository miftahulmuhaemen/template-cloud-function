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

Exposed API-Key and such in deployed `index.js` because Parcel unable to leave them as it is.

# Preps

1. Finish tutorial made by mas Saepul, https://gist.github.com/MochSM/aeb117be579e920b949a6d5797a7d236
2. Install gcloud sdk and python
3. Run `npm i` 

# How to debug ?

1. `npm run build-root`, then you can run `npm run watch`.
2. Or `npm run build-controller`, then you can run `npm start ./src/controller/test/main.js` or whatever function you want to run.
3. You can test it with Postman/Insomnia (or similar tool).

# How to deploy ?

1. Make sure you already built the project by running `npm run build-root` or `npm run build` (build both root and controller).
2. Modify `deploy-function.sh ` and change `template` to your project name.
5. Make sure all required dependency for THAT SPECIFIC FUNCTION declared in `../controller/*/package.json`. (You can leave library you use for other function but not required in here).
6. Open Bash and type `./deploy-function.sh FUNCTION_NAME` (Make sure the name match with endpoint folder name and following standard naming by Google for Cloud Function).
7. Done.

# EXTRA - ESlint

You can freely choose which preconfig eslint you prefer, in my case, I choose Google.
Just hit, `npm init @eslint/config`.

