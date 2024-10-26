#! /bin/bash

# TODO: write env variables.
export NODE_ENV=development
# export PORT=3000
# export CLIENT_PORT=3001
# install npm package and run in dev mode in parallel
cd server
pnpm install
pnpm run dev &

cd ../client
pnpm install
pnpm run dev &

wait
