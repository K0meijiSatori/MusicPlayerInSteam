document.addEventListener('DOMContentLoaded', function() {
  // 初始化 Amplitude 播放器
  Amplitude.init({
    "songs": [
      {
        "name": "Song One",
        "artist": "Artist A",
        "url": "/media/song1.mp3",
        "cover_art_url": "",
        "lyrics": "song1.md"
      },
      {
        "name": "Song Two",
        "artist": "Artist B",
        "url": "/media/song2.mp3",
        "cover_art_url": "",
        "lyrics": "song2.md"
      }
    ]
  });

  // 歌词加载函数
  function updateLyrics() {
    var song = Amplitude.getActiveSongMetadata();
    if (!song || !song.lyrics) return;
    fetch('/lyrics/' + song.lyrics)
      .then(res => res.text())
      .then(md => {
        document.getElementById('lyricsContent').innerHTML = marked.parse(md);
      });
  }
  // 初次加载歌词
  updateLyrics();

  // Amplitude 音频元素事件，更新歌词及图标
  var audio = Amplitude.getAudio();
  audio.addEventListener('play', function() {
    updateLyrics();
    document.getElementById('playPause').classList.add('playing');
  });
  audio.addEventListener('pause', function() {
    document.getElementById('playPause').classList.remove('playing');
  });
  audio.addEventListener('ended', updateLyrics);

  // 上一曲/下一曲 按钮后更新歌词
  document.querySelector('.amplitude-next').addEventListener('click', updateLyrics);
  document.querySelector('.amplitude-prev').addEventListener('click', updateLyrics);

  // 歌词切换按钮
  var lyricsPanel = document.getElementById('lyricsPanel');
  document.getElementById('toggleLyrics').addEventListener('click', function() {
    lyricsPanel.classList.toggle('visible');
  });

  // 主题切换按钮
  document.getElementById('themeToggle').addEventListener('click', function() {
    document.body.classList.toggle('dark');
  });

  // 视差交互：背景元素随鼠标移动
  document.addEventListener('mousemove', function(e) {
    var x = (e.clientX / window.innerWidth - 0.5) * 30;
    var y = (e.clientY / window.innerHeight - 0.5) * 30;
    document.querySelectorAll('#background > div').forEach(function(el, idx) {
      var speed = (idx + 1) * 0.5;
      el.style.transform = 'translate(' + (x * speed) + 'px, ' + (y * speed) + 'px)';
    });
  });
});
