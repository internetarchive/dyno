# Dyno 🔍 🦕 - test & lint with Deno

javascript `deno test` + `eslint` container setup - useful to lint or test your repo's JS for a CI/CD [test] phase

![Dino Inspecting](dyno.jpg)

- [.github/workflows/cicd.yml](.github/workflows/cicd.yml) for example usage.  you can copy that into your github repo, using same subdir structure (and extend - if desired - from there)
- [lint](lint) is the actual script that runs various linters over your JS

You can also run `mocha` + `expectations` like tests over your JS files.

## Command line usage examples
```bash
docker run --rm -it ghcr.io/internetarchive/dyno:main

# lint check all JS found in your CWD
docker run --rm -it -v $(pwd):/code ghcr.io/internetarchive/dyno:main sh -c 'cd /code; /app/lint'
```

## To Do
composite actions for minimizing boilerplate copying of our YAML into other repos
- https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/
- https://docs.github.com/en/actions/creating-actions/creating-a-composite-action
