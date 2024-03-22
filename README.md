# Sample Authentication App

This is a simple authentication app built with Node.js, Express.js, and bcrypt for password hashing.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Ishwarya312/authenticate-using-bcrypt.git
    ```

2. Navigate to the project directory:

    ```bash
    cd authenticate-using-bcrypt
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Start the server:

    ```bash
    npm start
    ```

## Usage

### Registering a User

- To register a new user, send a POST request to `/register` with JSON body containing `username` and `password`. For example:

### Logging In

- To log in, send a POST request to `/login` with JSON body containing `username` and `password`. 

## Endpoints

### POST /register

- Registers a new user.
- Request body:

    ```json
    {
        "username": "exampleuser",
        "password": "secretpassword"
    }
    ```

### POST /login

- Logs in a user.
- Request body:

    ```json
    {
        "username": "exampleuser",
        "password": "secretpassword"
    }
    ```

## License

This project is licensed under the MIT License.
