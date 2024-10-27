@echo off
setlocal

REM Set environment variables
set NODE_ENV=development
set PORT=3000
set VITE_BACKEND_API=http://localhost:3000/api

REM Function to create .env file for client
:CREATE_CLIENT_ENV
echo VITE_BACKEND_API=http://localhost:3000/api > .env
echo .env file created for client.
goto :EOF

REM Function to create .env file for server
:CREATE_SERVER_ENV
echo NODE_ENV=development > .env
echo PORT=3000 >> .env
echo .env file created for server.
goto :EOF

REM Check if pnpm is installed
where pnpm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo pnpm found
    set USE_PNPM=1
) else (
    echo pnpm not found, using npm
    set USE_PNPM=0
)

REM Change to server directory
cd server

REM Create .env file in server if it doesn't exist
if not exist .env call :CREATE_SERVER_ENV

REM Install npm packages and run tests
if %USE_PNPM% EQU 1 (
    pnpm install
    pnpm run test
) else (
    npm install
    npm run test
)

REM Check if tests passed
if %ERRORLEVEL% NEQ 0 (
    echo Tests failed. Exiting.
    exit /b 1
)

REM Start server in dev mode
if %USE_PNPM% EQU 1 (
    start pnpm run dev
) else (
    start npm run dev
)

REM Change to client directory
cd ../client

REM Create .env file in client if it doesn't exist
if not exist .env call :CREATE_CLIENT_ENV

REM Install npm packages and run tests
if %USE_PNPM% EQU 1 (
    pnpm install
    pnpm run test
) else (
    npm install
    npm run test
)

REM Check if tests passed
if %ERRORLEVEL% NEQ 0 (
    echo Tests failed. Exiting.
    exit /b 1
)

REM Start client in dev mode
if %USE_PNPM% EQU 1 (
    start pnpm run dev
) else (
    start npm run dev
)

REM Wait for user input to keep the command prompt open
pause