document.addEventListener("DOMContentLoaded", function() {
  Amplitude.init({
    "songs": [
      {
        "name": "拼凑的革命",
        "artist": "UnKnow",
        "album": "Na/N",
        "url": "media/track1.mp3",
        "cover_art_url": "media/cover1.jpg"
      },
      {
        "name": "南京杀人太少，应在南京多杀",
        "artist": "毛",
        "album": "Na/N",
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
