#! /bin/bash

# create .env file
function create_client_env {
	# env variables in case no .env established.
	export "NODE_ENV=development" > .env
	export "VITE_BACKEND_API=http://localhost:3000/api" >> .env
	echo "create .env at client/ with env variables"
}

function create_server_env {
	# env variables in case no .env established.
	echo "ATLAS=\"mongodb_address\"" > .env
	echo "FRONTEND_URL=http://localhost:5173" >> .env
	echo "FRONTEND_URL_PROD=http://localhost:5174" >> .env
	echo "PORT=3000" >> .env
	echo "SECRET=deep-code-challenge" >> .env
	echo "create .env at server/ with env variables"
}

# check if the system have pnpm if not use npm
function check_pnpm {
	if command -v pnpm &> /dev/null
	then
		echo "pnpm found"
		return 0
	else 
		echo "pnpm not found, using npm"
		return 1
	fi
}


cd server
# create .env file in server
	if [ ! -f .env ]; then
			create_server_env
		else
			echo ".env already in server dir existed"
	fi 
# install npm package and run in dev mode
if check_pnpm; then
  pnpm install
  pnpm run dev &
else
  npm install
  npm run dev &
fi

cd ../client
# create .env file in client
if [ ! -f .env ]; then
		create_client_env
	else
		echo ".env already in client dir existed"
fi
if check_pnpm; then
  pnpm install
  pnpm run dev &
else
  npm install
  npm run dev &
fi

# "wait" and "&" make both client and server "run dev" run in parallel
wait
