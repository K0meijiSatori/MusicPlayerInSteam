# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

# 音乐播放器

一个基于 Vue 3 + TypeScript + Vite 开发的音乐播放器，支持拖拽、播放控制、进度条和音量调节等功能。

## 功能特点

- 🎵 音乐播放控制（播放/暂停、上一首/下一首）
- 🎨 美观的深色主题界面
- 🖱️ 支持拖拽移动播放器位置
- 📱 响应式设计，支持移动端
- ⏯️ 进度条控制和时间显示
- 🔊 音量调节

## 技术栈

- Vue 3
- TypeScript
- Vite
- CSS3

## 项目设置

### 安装依赖
```bash
npm install
```

### 开发环境运行
```bash
npm run dev
```

### 生产环境构建
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 项目结构

```
my-music-page/
├── src/
│   ├── composables/     # 组合式函数
│   │   ├── usePlayer.ts    # 播放器逻辑
│   │   └── useDraggable.ts # 拖拽功能
│   ├── App.vue          # 主组件
│   └── main.ts          # 入口文件
├── media/              # 媒体文件
│   ├── Songs.json      # 歌曲数据
│   ├── track*.mp3      # 音频文件
│   └── cover*.jpg      # 封面图片
└── public/             # 静态资源
```

## 使用说明

1. 确保 `media` 目录下包含所需的音频文件和封面图片
2. 在 `Songs.json` 中配置歌曲信息
3. 运行项目即可使用

## 自定义配置

- 修改 `Songs.json` 可以更新播放列表
- 在 `App.vue` 的 `<style>` 部分可以自定义界面样式
- 在 `usePlayer.ts` 中可以调整播放器的默认行为

## 许可证

MIT
