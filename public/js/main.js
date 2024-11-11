document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const audioSource = document.getElementById('audio-source');
    const likedSongsContainer = document.getElementById('liked-songs');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentSongArtist = document.getElementById('current-song-artist');

    function playSong(song, title, artist) {
        audioSource.src = `/songs/${song}`;
        audioPlayer.load();
        audioPlayer.play();
        currentSongTitle.textContent = title;
        currentSongArtist.textContent = artist;
    }

    document.querySelectorAll('.song-card').forEach(card => {
        card.addEventListener('click', () => {
            const song = card.getAttribute('data-song');
            const title = card.querySelector('h3').innerText;
            const artist = card.querySelector('p').innerText;
            playSong(song, title, artist);
        });

        card.querySelector('.like-button').addEventListener('click', (e) => {
            e.stopPropagation();
            const song = card.getAttribute('data-song');
            const title = card.querySelector('h3').innerText;
            const artist = card.querySelector('p').innerText;

            if (!document.querySelector(`.liked-song[data-song="${song}"]`)) {
                const likedSong = document.createElement('div');
                likedSong.classList.add('liked-song');
                likedSong.setAttribute('data-song', song);
                likedSong.innerHTML = `<strong>${title}</strong> - ${artist}`;
                likedSong.addEventListener('click', () => {
                    playSong(song, title, artist);
                });
                likedSongsContainer.appendChild(likedSong);
            }
        });

        card.querySelector('.dislike-button').addEventListener('click', (e) => {
            e.stopPropagation();
            const song = card.getAttribute('data-song');
            const likedSong = document.querySelector(`.liked-song[data-song="${song}"]`);
            if (likedSong) {
                likedSongsContainer.removeChild(likedSong);
            }
        });
    });
});