Challenge:
Create a Simple User Dashboard with Role Management

Objective:
Build a small web application that displays a dashboard for users based on their role (e.g., "admin" or "regular user"). The dashboard should show simple statistics (like a welcome message and number of users in the system) and provide functionality for managing users if the logged-in user is an admin.

Requirements:

Front-End:

Implement a basic login form (no need for actual authentication, mock it).
Once logged in, show a dashboard:
Admin users should see the total number of users and a list of users with options to add, edit, or delete users.
Regular users should only see a welcome message.


Back-End:

Use Node.js to build a simple server that provides:
A list of users (mock data is fine, or you can store them in MongoDB if desired).
Endpoints to create, update, and delete users (again, you can use mock data or MongoDB).
Data Handling:

Use MongoDB (or mock data) for storing user details, including roles ("admin" or "regular user").
Provide appropriate validation when adding or editing user details.
Testing:

Write unit tests for at least one feature (e.g., the user creation endpoint).
Code Quality:

Structure your code to be readable and maintainable.
Automate the installation and configuration as much as possible
Use version control (GitHub repository) to show your progress and commit history.
Deliverables:

Link to the GitHub repository containing the code and documentation.
A README file explaining how to set up and run the application.
Brief explanation of the design choices made during development.
If you use AI tools, that fine, but be honest and tell us. Describe which prompts you used and tell us what you have modified and copy-pasted.
