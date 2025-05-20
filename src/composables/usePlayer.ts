import { ref, onMounted, onUnmounted } from 'vue'

interface Song {
  name: string
  artist: string
  album: string
  url: string
  cover_art_url: string
}

export function usePlayer(songs: Song[]) {
  const currentSong = ref<Song | null>(null)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const duration = ref(0)
  const volume = ref(50)
  const currentIndex = ref(0)
  const audio = new Audio()

  // 初始化播放器
  onMounted(() => {
    currentSong.value = songs[0]
    audio.src = songs[0].url
    audio.volume = volume.value / 100

    // 事件监听
    audio.addEventListener('timeupdate', updateProgress)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadedmetadata', () => {
      duration.value = audio.duration
    })
    audio.addEventListener('play', () => {
      isPlaying.value = true
    })
    audio.addEventListener('pause', () => {
      isPlaying.value = false
    })
  })

  // 清理事件监听
  onUnmounted(() => {
    audio.removeEventListener('timeupdate', updateProgress)
    audio.removeEventListener('ended', handleEnded)
    audio.removeEventListener('play', () => {
      isPlaying.value = true
    })
    audio.removeEventListener('pause', () => {
      isPlaying.value = false
    })
    audio.pause()
  })

  // 更新进度
  const updateProgress = () => {
    currentTime.value = audio.currentTime
  }

  // 播放结束处理
  const handleEnded = () => {
    nextSong()
  }

  // 播放/暂停切换
  const togglePlay = async () => {
    try {
      if (isPlaying.value) {
        await audio.pause()
      } else {
        await audio.play()
      }
    } catch (error) {
      console.error('播放控制失败:', error)
    }
  }

  // 上一首
  const prevSong = () => {
    currentIndex.value = (currentIndex.value - 1 + songs.length) % songs.length
    loadSong(currentIndex.value)
  }

  // 下一首
  const nextSong = () => {
    currentIndex.value = (currentIndex.value + 1) % songs.length
    loadSong(currentIndex.value)
  }

  // 加载歌曲
  const loadSong = async (index: number) => {
    currentSong.value = songs[index]
    audio.src = songs[index].url
    currentTime.value = 0
    if (isPlaying.value) {
      try {
        await audio.play()
      } catch (error) {
        console.error('播放失败:', error)
        isPlaying.value = false
      }
    }
  }

  // 跳转到指定时间
  const seekTo = (event: Event) => {
    const target = event.target as HTMLInputElement
    const time = parseFloat(target.value)
    audio.currentTime = time
    currentTime.value = time
  }

  // 设置音量
  const setVolume = (event: Event) => {
    const target = event.target as HTMLInputElement
    const newVolume = parseInt(target.value)
    volume.value = newVolume
    audio.volume = newVolume / 100
  }

  return {
    currentSong,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    prevSong,
    nextSong,
    seekTo,
    setVolume
  }
} 