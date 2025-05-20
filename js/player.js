document.addEventListener("DOMContentLoaded", function() {
  Amplitude.init({
    "songs": [
      {
        "name": "Track One",
        "artist": "Artist A",
        "album": "Album X",
        "url": "media/track1.mp3",
        "cover_art_url": "media/cover1.jpg"
      },
      {
        "name": "Track Two",
        "artist": "Artist B",
        "album": "Album Y",
        "url": "media/track2.mp3",
        "cover_art_url": "media/cover2.jpg"
      },
      {
        "name": "Track Three",
        "artist": "Artist C",
        "album": "Album Z",
        "url": "media/track3.mp3",
        "cover_art_url": "media/cover3.jpg"
      }
    ],
    "volume": 50
  });
});
