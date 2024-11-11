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
    git clone https://github.com/your-username/spotify-clone.git
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
    ├── [index.js](http://_vscodecontentref_/1)
    ├── [package.json](http://_vscodecontentref_/2)
    ├── [db.sqlite](http://_vscodecontentref_/3)
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
    │       ├── [main.css](http://_vscodecontentref_/4)
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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
