FROM alpine

RUN apk add zsh npm deno && \
    # for CI [test] coverage (NOTE: `community` was `testing` before 5/2024)
    apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/community lcov

WORKDIR /app
COPY . .

RUN npm i

# default to lint JS files in CWD (which can often be passed in via `docker run --workdir=...`)
CMD /app/lint
