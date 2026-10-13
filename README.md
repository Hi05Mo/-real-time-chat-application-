# Chat App

A simple real-time chat application built with Node.js and WebSockets.

## Description

This project is a real-time chat application that allows users to connect with a username, exchange messages instantly, and receive notifications when users join or leave the chat.

It uses WebSockets to establish a persistent connection between the client and server, allowing messages to be broadcast to all connected users without refreshing the page.

## Technologies

- HTML5
- CSS3
- JavaScript
- Node.js
- WebSocket (`ws`)
- ES Modules

## Usage

Install the dependencies:

```bash
npm install
```

Start the server with:

```bash
npm start
```

If the `start` script is not defined in `package.json`, run:

```bash
node server.js
```

The server runs on port `3001`.

Open the application using the URL provided by your development environment.

## Features

- Connect to the chat using a username.
- Send and receive messages in real time.
- Broadcast messages to all connected clients.
- Display notifications when users join or leave the chat.
- Show the current connection status.
- Send messages by clicking the Send button or pressing Enter.
- Escape HTML characters when displaying usernames and messages.

## How It Works

1. A user connects to the WebSocket server with a username.
2. The server broadcasts a notification when the user joins.
3. When a user sends a message, the server broadcasts it to all connected clients.
4. When a user disconnects, the server broadcasts a notification that the user has left.

## Project Structure

```text
build-a-chat-app/
├── public/
│   ├── index.html
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Learning Objectives

This project demonstrates how to:

- Create an HTTP server using Node.js.
- Establish real-time communication using WebSockets.
- Handle connection, message, and disconnection events.
- Exchange JSON data between the client and server.
- Dynamically update the user interface with JavaScript.

## License

MIT