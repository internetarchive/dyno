# Dyno 🔍 🦕 - test & lint with Deno

javascript `deno test` + `eslint` container setup - useful to lint or test your repo's JS for a CI/CD [test] phase

![Dino Inspecting](dyno.jpg)

- [example.yml](example.yml) for a CI/CD pipeline.  You can copy that into your github repo into (likely new) subdir: `.github/workflows/`
- You can extend the example with testing or otherwise
- [.github/workflows/cicd.yml](.github/workflows/cicd.yml) shows `test` and `lint` additional jobs
- [lint](lint) is the actual script that runs various linters over your JS

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

## Command line usage examples
```bash
docker run --rm -it ghcr.io/internetarchive/dyno:main

# lint check all JS found in your CWD
docker run --rm -it -v $(pwd):/code ghcr.io/internetarchive/dyno:main sh -c 'cd /code; /app/lint'
```

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

