# Dyno 🔍 🦕 - lint & test with Deno

javascript `deno lint` + `eslint` + `deno test` container setup - useful to lint or test your repo's JS for a CI/CD [test] phase

![Dino Inspecting](dyno.jpg)


## Using on the command line (without docker)
- [install deno](https://docs.deno.com/runtime/manual/getting_started/installation)
- `brew install node`
```sh
DYNODIR=$(pwd)/dyno
git clone https://github.com/internetarchive/dyno
cd $HOME
ln -s $DYNODIR/.eslintrc.cjs  .
ln -s $DYNODIR/package.json   .
npm i
# cd [to some project with JS]
# add $DYNODIR/lint to your $PATH and `lint` or:
$DYNODIR/lint
```

## Using on the command line (with docker/podman)
```bash
# lint check all JS found in your CWD
docker run --rm -it --pull=always -v $(pwd):/code ghcr.io/internetarchive/dyno:main sh -c 'cd /code; /app/lint'
```


## Using with GitHub repos
To setup CI/CD `lint` testing of your repo's JS code,
you can use this for a GitHub Actions CI/CD pipeline:
```yml
name: CICD
on: push

jobs:
  build:
    runs-on: ubuntu-latest
    permissions: { contents: read, packages: write, id-token: write }
    steps:
      # https://github.com/internetarchive/build/blob/main/action.yml
      - uses: internetarchive/build@v1
        with:
          REGISTRY_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  lint:
    runs-on: ubuntu-latest
    container:
      # https://github.com/internetarchive/dyno
      image: ghcr.io/internetarchive/dyno:main
    steps:
    - uses: actions/checkout@v4
    - run: /app/lint
```

You can copy that into your github repo into (likely new) subdir: `.github/workflows/cicd.yml`

[lint](lint) is the actual script that runs various linters over your JS files.

You can also run `mocha` + `expectations`-like tests over your JS files.


## Customizable rules and config
Though _this repo_ includes these 6 files with some customized `eslint` rules setup and more,
if your repo has any of these 6 files in the top of your repo, we'll use those instead.

- [package.json](package.json)
- [.eslintrc.cjs](.eslintrc.cjs)
- [deno.json](deno.json)

These 3 are for chasing down potential `Promise` or `async`/`await` usage potential issues, and you're probably less likely to want to customize: :)

- [.eslint.await.finder.cjs](.eslint.await.finder.cjs)
- [.eslint.await.finder.tsconfig.json](.eslint.await.finder.tsconfig.json)
- [tsconfig.json](tsconfig.json)


## Enhanced custom CI/CD?
You can test with an arbitrary docker image, the `dyno` docker image, split out multiple separate tests that can run in parallel, and more.

See this repo as a great base for you to consider:
- https://github.com/internetarchive/hello-js
- https://github.com/internetarchive/hello-js/blob/main/.github/workflows/cicd.yml


## Uses GitHub composite Actions
We use composite actions for minimizing boilerplate copying of our YAML into other repos.

This is our 'cicd' CI/CD action:
- https://github.com/internetarchive/cicd/blob/main/action.yml

Documentation:
- https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/
- https://docs.github.com/en/actions/creating-actions/creating-a-composite-action


## GitLab repos
If your repo is using GitLab, you can create a `.gitlab-ci.yml` file at the top of your repo like this:
```yml
include:
  # standard archive.org CI/CD setup
  - remote: 'https://gitlab.com/internetarchive/nomad/-/raw/master/.gitlab-ci.yml'

lint:
  # lint your repo JS code
  stage: test
  image: ghcr.io/internetarchive/dyno:main
  script:
    - /app/lint

# If your tests *don't* require pkgs or non-repo files from your docker build image,
# then you can use this nicely for testing files in your repo like 'test/something.test.js'
# along with a full code coverage report.
test:
  stage: test
  image: ghcr.io/internetarchive/dyno:main
  script:
    - /app/test/test.sh
```
