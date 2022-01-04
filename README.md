# Dyno 🔍 🦕 - test & lint with Deno

javascript `deno test` + `eslint` container setup - useful to lint or test your repo's JS for a CI/CD [test] phase

![Dino Inspecting](dyno.jpg)

- [example.yml](example.yml) for a CI/CD pipeline.  You can copy that into your github repo into (likely new) subdir: `.github/workflows/`
- You can extend the example with testing or otherwise
- [.github/workflows/cicd.yml](.github/workflows/cicd.yml) shows a `test` and `lint` additional job
- [lint](lint) is the actual script that runs various linters over your JS

You can also run `mocha` + `expectations` like tests over your JS files.

## Command line usage examples
```bash
docker run --rm -it ghcr.io/internetarchive/dyno:main

# lint check all JS found in your CWD
docker run --rm -it -v $(pwd):/code ghcr.io/internetarchive/dyno:main sh -c 'cd /code; /app/lint'
```

## Uses GitHub composite Actions
We use composite actions for minimizing boilerplate copying of our YAML into other repos.

This is our 'build' action:
- https://github.com/internetarchive/build/blob/main/action.yml

Documentation:
- https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/
- https://docs.github.com/en/actions/creating-actions/creating-a-composite-action
