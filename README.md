# Dyno 🔍 🦕 - test & lint with Deno

javascript `deno test` + `eslint` container setup - useful to lint or test your repo's JS for a CI/CD [test] phase

![Dino Inspecting](dyno.jpg)

- [.gitlab-ci.yml](.gitlab-ci.yml) for example usage.  you can copy that into your gitlab-stored repo (and extend - if desired - from there) xxx
- [lint](lint) is the actual script that runs various linters over your JS

You can also run `mocha` + `expectations` like tests over your JS files.

## Usage examples
```bash
docker run --rm -it ghcr.io/internetarchive/dyno:main

docker run --rm -it -v $(pwd):/code ghcr.io/internetarchive/dyno:main sh -c 'cd /code; /app/test/test.sh'
```

## To Do
composite actions for minimizing boilerplate copying of our YAML into other repos
- https://github.blog/changelog/2021-08-25-github-actions-reduce-duplication-with-action-composition/
- https://docs.github.com/en/actions/creating-actions/creating-a-composite-action