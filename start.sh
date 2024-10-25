#! /bin/bash

# TODO: write env variables.

# install npm package and run in dev mode in parallel
cd server
pnpm install
pnpm run dev &

cd ../client
pnpm install
pnpm run dev &

wait
