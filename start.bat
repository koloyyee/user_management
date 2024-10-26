
@REM to be confirmed

@echo off
set NODE_ENV=development

REM Install npm packages and run in dev mode in parallel
cd server
pnpm install
start pnpm run dev

cd ../client
pnpm install
start pnpm run dev

REM Wait for user input to keep the command prompt open
pause