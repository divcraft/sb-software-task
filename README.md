# Betting App

This repository contains a simple betting system composed of three workspaces: a frontend application, a websocket-based data provider, and a shared package for type definitions.

The goal of the project is to fetch betting data in real time, display it to the user, and allow placing stakes on selected outcomes.

## Architecture

The repository is organized into the following workspaces:

- betting-app - a web application built with Next.js. It uses Redux Toolkit (including RTK Query) for state management and Tailwind for styling.
  The websocket connection is handled through a singleton pattern to prevent multiple connections as the application scales.

- betting-feed - a websocket server that provides dynamically generated betting data to connected clients.

- shared - a common package that contains TypeScript types shared between the frontend and backend to ensure consistency.

## How to run

To start the development environment, run:

```
npm i
npm run dev
```

and then enter the link: http://localhost:3000

This command runs both the betting-feed server (port 4040) and the betting-app client (port 3000) with the concurrently library.
