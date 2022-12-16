# INFO6250 Final Project - Chat App

This Chat App involves both:
- an express server.js to host RESTFUL services and act as a static file server
- a create-react-app-based SPA build as static files that consume those services

## Setup 

- In a terminal, run `npm install` 

## Running for production

- In a terminal, run `npm run build` to create the static files in the `build/` directory
- run `npm start` to start the express server
- Visit localhost on port **4000** 

## Running for development

- In a terminal, run `npm start` to start the express server
- In a DIFFERENT terminal, run `npm run dev` to start the development CRA server
- Visit localhost on port **3000** 

## Chat App Description

- This Chat App allows users to login and send messages between users and demonstrates the current logged-in users.The messages can be updated automatically by polling.

### Home Page

When the User loads the page
- the site will determine if the user is logged in

- If the user is not logged in:
  - the page will display a login form
  - the login form will ask for a username but will not ask for a password

- A logged in user will see:
  - Current logged-in users (Active Users)
  - Chat History content
  - A text area allows users to send messages
  - An option to logout

### Login Page 
- Login form only requires users to input valid username without password. 
- If the username is valid the server will respond with a `sid` cookie using a uuid.
- If the username is invalid, there will be a error message that contains the username being invalid.
-  "dog" will be treated as a denied user.

### Chat Page 
- When users are logged in, they will see:
  - A list of currently logged in users
  - A list of messages contains previous chat history
  - Every message will identify which user sent it
  - A text area that user can input message and a botton that send message
- Every second the client side will check to see if there are new messages and/or if the list of currently logged in users has changed
- Multiple users can be logged in at once and can send and see messages from one another
- A user can logout and return to the login screen
- The messages sent by user self are list on the right, and the messages sent by other users are list on the left.