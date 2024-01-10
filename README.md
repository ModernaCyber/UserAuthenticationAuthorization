
# User Authentication and Authorization Express App

This project is an Express.js server built with TypeScript, Sequelize, and PostgreSQL for user authentication and authorization. It uses JSON Web Tokens (JWT) for token-based authentication and supports two user roles: "user" and "admin."

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Testing](#testing)
  - [Swagger Documentation](#swagger-documentation)
- [Folder Structure](#folder-structure)
- [License](#license)

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. Clone the repository:

   ```bash
<<<<<<< HEAD
   git clone https://github.com/ModernaCyber/UserAuthenticationAuthorization.git
=======
   git clone https://github.com/ModernaCyber/userauthenticationauthorization.git
>>>>>>> 982db9afb1bbfd4030caf10000334ea7f012c245
   ```

2. Navigate to the project directory:

   ```bash
   cd userauthenticationauthorization
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

## Usage

### Running the Server

- Run Build To generate js files in dist folder:

  ```bash
  npm run build
  ```

- Run the development server:

  ```bash
  npm run dev
  ```

- The server will be running at http://localhost:3000 by default.

- To Test the Api via Postman import the postman collection into postman.

### Testing

- Run tests:

  ```bash
  npm test
  ```

### Swagger Documentation

- Swagger documentation is available at http://localhost:3000/api-docs after starting the server.

## Folder Structure

- `dist/`: Compiled TypeScript files (output of the build process).
- `node_modules/`: Node.js modules and dependencies.
- `src/`: Source code.

  - `config/`: Configuration files.
  - `controllers/`: Request handlers.
  - `db/`: Sequelize Database configuration and connection.
  - `middleware/`: Middleware functions.
  - `models/`: Sequelize models.
  - `routes/`: Express route definitions.
  - `utils/`: Utility functions.
  - `server.ts`: Server entry point with Express application setup.

- `__test__/`: Test files.
- `.env`: Environment variables configuration.
- `jest.config.js`: Jest configuration.
- `tsconfig.json`: TypeScript configuration.
- `interviewAuthenticationAuthorizatio.postman_collection.json`: postman collection

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.
