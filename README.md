# talks

Talks, presentations, slide decks, etc.

## Workflow

```sh
# create a new project:

mkdir <new-project-name> && cd <new-project-name>

npm init slidev
```

```sh
# run / build an existing project:

cd <path/to/talk>

npm install

npm run dev
# or
npm run build
```

```sh
# build all the talks contained in this repo:

./build-all

# commit the newly-generated `index.html` files:

git add .
git commit -m "<commit message>"

# deploy to website
git push
```
