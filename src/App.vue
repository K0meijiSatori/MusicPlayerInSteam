<script setup lang="ts">
import { ref } from 'vue'
import { useDraggable } from './composables/useDraggable'
import { usePlayer } from './composables/usePlayer'
import songsData from '../media/Songs.json'

interface Song {
    name: string
    artist: string
    album: string
    url: string
    cover_art_url: string
}

const songs: Song[] = Object.values(songsData)

const playerRef = ref<HTMLElement | null>(null)
const {
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
} = usePlayer(songs)

// 使用拖拽功能
useDraggable(playerRef)

// 格式化时间
const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
}
</script>

<template>
    <div class="player" ref="playerRef">
        <img class="cover-art" :src="currentSong?.cover_art_url" :alt="currentSong?.name">
        <div class="song-info">
            <h2>{{ currentSong?.name }}</h2>
            <h3>{{ currentSong?.artist }}</h3>
        </div>
        <div class="controls">
            <span class="amplitude-prev" @click="prevSong">⏮</span>
            <span class="amplitude-play-pause" @click="togglePlay" :class="{ 'amplitude-playing': isPlaying }">
                {{ isPlaying ? '⏸' : '▶' }}
            </span>
            <span class="amplitude-next" @click="nextSong">⏭</span>
        </div>
        <div class="progress">
            <span>{{ formatTime(currentTime) }}</span>
            <input type="range" class="amplitude-song-slider" :value="currentTime" @input="seekTo" step="0.1" />
            <span>{{ formatTime(duration) }}</span>
        </div>
        <div class="volume">
            <label for="volume-slider">音量</label>
            <input id="volume-slider" type="range" class="amplitude-volume-slider" min="0" max="100" :value="volume"
                @input="setVolume" />
        </div>
    </div>
</template>

<style>
/* 页面整体样式 */
body {
    margin: 0;
    font-family: "Helvetica Neue", sans-serif;
    background: #000;
    color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* 播放器容器 */
.player {
    background: #111;
    padding: 20px;
    border: 2px solid #440000;
    border-radius: 12px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
    width: 320px;
    text-align: center;
    cursor: grab;
    user-select: none;
}

.player:active {
    cursor: grabbing;
}

/* 专辑封面 */
.cover-art {
    width: 100%;
    border: 1px solid #550000;
    border-radius: 6px;
    margin-bottom: 10px;
}

/* 歌曲信息 */
.song-info h2 {
    margin: 5px 0;
    font-size: 1.2rem;
    color: #FF6666;
}

.song-info h3 {
    margin: 2px 0;
    font-size: 1rem;
    color: #FFD700;
    font-weight: normal;
}

/* 控件按钮 */
.controls span {
    display: inline-block;
    margin: 0 10px;
    width: 32px;
    height: 32px;
    background: #440000;
    border-radius: 4px;
    line-height: 32px;
    cursor: pointer;
    transition: background 0.3s;
    color: #FFD700;
    font-weight: bold;
}

.controls span:hover {
    background: #550000;
}

/* 进度条和时间 */
.progress {
    margin: 10px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
}

.progress input[type="range"] {
    flex: 1;
    margin: 0 5px;
}

/* 音量控制 */
.volume {
    margin-top: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
}

.volume label {
    margin-right: 5px;
}

.volume input[type="range"] {
    width: 100px;
}

/* 响应式调整 */
@media (max-width: 400px) {
    .player {
        width: 90%;
        padding: 15px;
    }

    .controls span {
        margin: 0 5px;
        width: 28px;
        height: 28px;
        line-height: 28px;
    }
}
</style>
