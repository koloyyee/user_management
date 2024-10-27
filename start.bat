@echo off
setlocal EnableDelayedExpansion

:: Store the root directory
set "ROOT_DIR=%cd%"

:: Create server .env file
echo Creating server .env file...
(
echo ATLAS="mongodb+srv://deep-code-challenge:ilcVEurQdwfqdLbp@cluster0.qg2td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
echo FRONTEND_URL=http://localhost:5173
echo FRONTEND_URL_PROD=http://localhost:
echo PORT=3000
echo SECRET=deep-code-challenge
) > "%ROOT_DIR%\server\.env"
echo Server .env file created

:: Create client .env file
echo Creating client .env file...
(
echo NODE_ENV=development
echo VITE_BACKEND_API=http://localhost:3000/api
) > "%ROOT_DIR%\client\.env"
echo Client .env file created

:: Check for pnpm
where pnpm >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    set "PACKAGE_MANAGER=pnpm"
) else (
    set "PACKAGE_MANAGER=npm"
)
echo Using %PACKAGE_MANAGER% as package manager

:: Start server
echo Starting server...
cd "%ROOT_DIR%\server"
call %PACKAGE_MANAGER% install
start cmd /k "cd /d "%ROOT_DIR%\server" && %PACKAGE_MANAGER% run dev"

:: Start client
echo Starting client...
cd "%ROOT_DIR%\client"
call %PACKAGE_MANAGER% install
start cmd /k "cd /d "%ROOT_DIR%\client" && %PACKAGE_MANAGER% run dev"

:: Return to root directory
cd "%ROOT_DIR%"

echo Both client and server are starting...
echo Server running on http://localhost:3000
echo Client running on http://localhost:5173

:: Keep the window open
pause