# Spotify Clone

This project is a simple Spotify clone built using Node.js, Express, SQLite, and vanilla JavaScript. It allows users to register, log in, and play songs. Users can like and dislike songs, and the liked songs will be displayed in a sidebar.

## Features

- User registration and login
- Play songs from a list
- Like and dislike songs
- Display liked songs in a sidebar
- Logout functionality

## Prerequisites

- Node.js and npm installed on your machine

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/RaresRacsan/Spotify-Clone.git
    cd spotify-clone
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create the SQLite database:

    ```sh
    type NUL > db.sqlite
    ```

4. Ensure you have the following directory structure:

    ```
    project-root/
    ├── index.js
    ├── package.json
    ├── db.sqlite
    ├── public/
    │   ├── js/
    │   │   └── main.js
    │   ├── songs/
    │   │   ├── funtime-juicewrld.mp3
    │   │   ├── googleme-cochise.mp3
    │   │   ├── mo-travisscott.mp3
    │   │   ├── timeless-playboicarti.mp3
    │   │   └── tobey-eminem.mp3
    │   └── styles/
    │       ├── main.css
    │       ├── login.css
    │       └── register.css
    └── views/
        ├── login.html
        ├── register.html
        └── main.html
    ```

## Running the Application

1. Start the server:

    ```sh
    npm start
    ```

2. Open your web browser and navigate to:

    ```
    http://localhost:3000
    ```

## Project Structure

- `index.js`: The main server file that sets up the Express server and routes.
- `package.json`: Contains the project dependencies and scripts.
- `db.sqlite`: The SQLite database file.
- `public/js/main.js`: Contains the client-side JavaScript for handling song playback and like/dislike functionality.
- `public/songs/`: Directory containing the MP3 files.
- `public/styles/`: Directory containing the CSS files.
- `views/`: Directory containing the HTML files.

## Contributors

I welcome contributions to this project. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear and concise messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.
