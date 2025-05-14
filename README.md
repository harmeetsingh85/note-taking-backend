# Notes App - User and Note Management

This document outlines the core components for user authentication and note management within the application.

## `userControllers.js`

Handles user registration, login, and note operations.

### Functions

-   **`signUpController`**: Registers new users, validating input with `zod`, hashing passwords with `bcryptjs`, and storing user data using the `userModel`.
-   **`signInController`**: Authenticates users, validating credentials with `zod`, comparing passwords with `bcryptjs`, and issuing JWTs using `jsonwebtoken` upon successful login.
-   **`createNoteController`**: Creates new notes, associating them with the authenticated user (obtained from middleware). **Note:** Input validation with `zod` is recommended.
-   **`myNoteController`**: Retrieves all notes belonging to the authenticated user.
-   **`deleteNoteController`**: Deletes a specific note based on its ID.

### Dependencies

-   `zod`: Input validation.
-   `bcryptjs`: Password hashing.
-   `jsonwebtoken`: JWT generation.
-   `mongoose`: MongoDB interaction.
-   `userModel`: User data model.
-   `notesModel`: Note data model.

## `app.js`

Sets up the Express application, connects to MongoDB, and mounts route handlers.

### Core Functionality

-   Initializes Express.
-   Connects to MongoDB using the URI from `.env`.
-   Uses `express.json()` middleware for request body parsing.
-   Mounts the `userRoutes` at the `/user` path.
-   Starts the server on port 3000.

### Dependencies

-   `express`: Web framework.
-   `mongoose`: MongoDB integration.
-   `dotenv`: Environment variable loading.
-   `userRoutes`: User-related route definitions.

## `routes/userRoutes.js`

Defines the API endpoints for user authentication and note management.

### Endpoints

-   `POST /user/signUp`: User registration.
-   `POST /user/signIn`: User login.
-   `POST /user/createNote`: Create a new note (requires authentication via `userMiddleware`).
-   `GET /user/myNote`: Retrieve user's notes (requires authentication via `userMiddleware`).
-   `DELETE /user/delNote`: Delete a note (requires authentication via `userMiddleware`).

### Dependencies

-   `express`: Router creation.
-   `userControllers`: Route handler functions.
-   `userMiddleware`: Authentication middleware.