# User Management

### Abstract

The goal is to deliver a prototype in a short time with a JavaScript based technology stack, for familiarity I have decided to use the "Client-Server" architecture, the frontend technology with ReactJS, backend driven by ExpressJS, with TypeScript and Vite as build tool, persistent storage with MongoDB Atlas.

For more details in design details go to [Design Detail](#design)

## Setup

Git Clone the project.

```
git clone https://github.com/koloyyee/deep-code-challenge.git
```

`cd user_management`

### Auto Step

#### Linux, MacOS Users

```
chmod +x ./start.sh
./start.sh
```

### Windows User

```sh
start.bat
```

#### if the scripting failed here is the manual process

this allow permission to run the bash script file, check the if .env file exist, install package in pnpm or npm, test and run the application.


[Unix manual setup](#unix)
[Windows manual setup](#windows)

### Unix

```
cd client
touch .env

```

#### open the `.env` file with text editor (e.g: VS Code / (Neo)Vim / Emacs), and add the followings

```
VITE_BACKEND_API="http://localhost:3000/api"
```

#### use pnpm if you have

```pnpm
pnpm run dev
```

#### or npm

```npm
npm run dev
```

#### start another terminal

```
cd server
touch .env
```

#### open the `.env` file with text editor (e.g: VS Code / (Neo)Vim / Emacs), and add the followings

```
ATLAS="mongodb+srv://deep-code-challenge:ilcVEurQdwfqdLbp@cluster0.qg2td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
FRONTEND_URL="http://localhost:5173"
FRONTEND_URL_PROD="http://localhost:5174"
PORT=3000
SECRET="deep-code-challenge"
NODE_ENV=dev
```

#### use pnpm if you have

```pnpm
pnpm run test
pnpm run dev
```

#### or npm

```
npm run dev
```

### Windows
NOTE: Windows has an error with npm installing bcrypt and/or nodemon, current is not working and I am finding ways to fix it, I highly recommend running this program in [WSL2](https://learn.microsoft.com/en-us/windows/wsl/install)

#### If the scripting failed here is the manual process

`cd client`

#### Create the `.env` file and open it with a text editor (e.g: VS Code / (Neo)Vim / Emacs), and add the following

```
VITE_BACKEND_API="http://localhost:3000/api"
```

#### Use pnpm if you have

`pnpm run dev`

#### or npm

```npm
npm run dev
```

#### start another terminal

```
cd server
```

#### create the `.env` file and open with text editor (e.g: VS Code / (Neo)Vim / Emacs), and add the followings

```
ATLAS="mongodb+srv://deep-code-challenge:ilcVEurQdwfqdLbp@cluster0.qg2td.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
FRONTEND_URL="http://localhost:5173"
FRONTEND_URL_PROD="http://localhost:5174"
PORT=3001
SECRET="deep-code-challenge"
```

#### use pnpm if you have

```pnpm
pnpm run dev
```

#### or npm

```npm
npm run dev
```
---
### Testing

Testing is supported in `server/`

```sh
cd server
pnpm run test 
# or 
npm run test
```

**CAVEAT!** 
1. The storing session sometimes cannot be retrieved instantly, try running the test a few times.
2. The MongoDB is a personal Atlas, I am exposing it for the purpose of this co-op challenge, it will be torn after the co-op period.


---

## Design

### Frontend

The frontend is built using ReactJS with TypeScript for type inference and safety. React Router v6 is used for navigation. The frontend communicates with the backend using the Fetch API for CRUD operations, requiring a session ID for minimum security support.

### Backend

The backend is developed with ExpressJS for fast development and CORS support. It connects to MongoDB Atlas with readWrite access to a specific collection for security reasons. Create and update operations and validate the password, email, first name, and last name before storing them in MongoDB. Jest and supertest are used for testing.

### Database

The application uses MongoDB Atlas for storing user details, including roles ("admin" or "regular user"). Appropriate validation is provided when adding or editing user details. As suggested in the requirement MongoDB is allowed to be used therefore a cloud support Atlas collection was created for this challenge for storing and retrieving user data.

## Code Quality

The code is structured to be readable and maintainable. Automated installation and configuration are provided as much as possible. Version control (GitHub repository) is used to show progress and commit history.

## Deliverables

- Link to the GitHub repository containing the code and documentation.
- A README file explaining how to set up and run the application.
- Brief explanation of the design choices made during development.
- Description of any AI tools used, including prompts and modifications made.


### Technology

ReactJS, ExpressJS, MongoDB, Jest

## AI assistance claims

GitHub: co-pilot **ONLY limited** to co-pilot **Chat**, for reference, syntax checking, documentation, bash script and window bat scripts

Claude: ExpressJS and Mongo reference and syntax checking, Claude is responsible for creating the .bat script.
