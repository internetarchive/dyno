FROM denoland/deno:alpine

RUN apk add zsh npm && \
    # for CI [test] coverage
    apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing  lcov

WORKDIR /app
COPY . .

RUN npm i

# default to lint JS files in CWD
CMD /app/lint
