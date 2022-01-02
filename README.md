# Dyno 🔍 🦕 - test & lint with Deno

![Dino Inspecting](dyno.jpg)


javascript `deno test` + `eslint` container setup - useful for `deno` or `node` project CI/CD [test] phase

- [.gitlab-ci.yml](.gitlab-ci.yml) for example usage.  you can copy that into your gitlab-stored repo (and extend - if desired - from there) xxx
- [lint](lint) is the actual script that runs various linters over your JS

You can also run `mocha` + `expectations` like tests over your JS files.

## Usage examples
```bash
docker run --rm -it ghcr.io/internetarchive/dyno:main

docker run --rm -it -v $(pwd):/code ghcr.io/internetarchive/dyno:main sh -c 'cd /code; /app/test/test.sh'
```
