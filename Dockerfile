FROM denoland/deno:alpine

RUN apk add zsh npm && \
    # for CI [test] coverage
    apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing  lcov

WORKDIR /app
COPY . .

RUN npm i

CMD deno eval 'import { serve } from "https://deno.land/std/http/server.ts"; serve(() => new Response("hai"), { port: 5000 });'
