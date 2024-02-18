FROM alpine

RUN apk add zsh npm deno && \
    # for CI [test] coverage
    apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing  lcov

WORKDIR /app
COPY . .

RUN npm i

# default to lint JS files in CWD (which can often be passed in via `docker run --workdir=...`)
CMD /app/lint
