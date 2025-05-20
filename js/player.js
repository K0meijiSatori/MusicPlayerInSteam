const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const trackTitle = document.getElementById('track-title');

// 你的播放列表
const playlist = [
  { src: 'media/track1.mp3', title: 'Track 1 – 我的歌曲' },
  { src: 'media/track2.mp3', title: 'Track 2 – 另一首歌' },
  // …更多曲目
];
let currentIndex = 0;

function loadTrack(index) {
  const track = playlist[index];
  audio.src = track.src;
  trackTitle.textContent = track.title;
}

playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playPauseBtn.textContent = '⏸️';
  } else {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  }
});

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playPauseBtn.textContent = '⏸️';
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadTrack(currentIndex);
  audio.play();
  playPauseBtn.textContent = '⏸️';
});

// 自动播放下一曲
audio.addEventListener('ended', () => nextBtn.click());

// 首次加载
loadTrack(currentIndex);
