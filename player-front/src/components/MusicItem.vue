<template>
    <div class="item-wrapper">
        <div class="item">
            <div class="info">
                <div class="item__albumphoto">
                    <img :src="`${server.baseURL}/uploads/images/${props.item.albumPhoto}`" alt="Обложка">
                </div>
                <div class="titles">
                    <h2 class="item__title">{{ props.item.title }}</h2>
                    <p class="item__author">{{ props.item.author }}</p>
                </div>
            </div>
            <div class="rewind">
                <input type="range" min="0" :max="useMusicStore().getDuration" step="1" :value="currentTime" @input="useMusicStore().changeTime($event.target.value)" v-if="isPlaying" class="rewind-range">
            </div>
            <div class="controls">
                <input type="range" min="0" max="1" step="0.01" v-model="useMusicStore().currentVolume" class="range-input" v-if="isPlaying">
                <audio :src="`${server.baseURL}/uploads/musics/${props.item.filename}`" ref="audio" @timeupdate="updateTime"></audio>
                <button class="play" @click="useMusicStore().playMusic(audio); isPlaying = true;" v-if="!isPlaying">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" viewBox="0 0 24 24" fill="none">
                        <path d="M16.6582 9.28638C18.098 10.1862 18.8178 10.6361 19.0647 11.2122C19.2803 11.7152 19.2803 12.2847 19.0647 12.7878C18.8178 13.3638 18.098 13.8137 16.6582 14.7136L9.896 18.94C8.29805 19.9387 7.49907 20.4381 6.83973 20.385C6.26501 20.3388 5.73818 20.0469 5.3944 19.584C5 19.053 5 18.1108 5 16.2264V7.77357C5 5.88919 5 4.94701 5.3944 4.41598C5.73818 3.9531 6.26501 3.66111 6.83973 3.6149C7.49907 3.5619 8.29805 4.06126 9.896 5.05998L16.6582 9.28638Z" stroke="#000000" stroke-width="2" stroke-linejoin="round"/>
                    </svg>
                </button>
                <button class="stop" @click="useMusicStore().stopMusic(audio); isPlaying = false;" v-else>
                    <svg width="32px" height="32px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 5V19M16 5V19" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
  </template>
<script setup>
import { server } from '@/helpers/helper'
import { ref } from 'vue';
import { useMusicStore } from '@/stores/music.js'

const audio = ref(null);
const isPlaying = ref(false);
const currentTime = ref(0);

const props = defineProps({
    item: {
        type: Object,
        required: true
    }
})

const updateTime = (event) => {
    currentTime.value = audio.value.currentTime;
}
</script>
<style scoped>
button {
    height: auto;
    padding: 0 1rem;
    background-color: transparent;
    border: none;
    cursor: pointer;
}
.item__albumphoto {
    height: 64px;
    flex: 0 0 64px;
}
.item__albumphoto img {
    display: block;
    max-width: 100%;
    max-height: 100%;
}
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    gap: 1rem;
}
.item-wrapper {
    position: relative;
    padding: .5rem;
}
.item-wrapper:not(:first-child) {
    margin-top: 2rem;
}
.item-wrapper::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
}
.item-wrapper:hover::after {
    background-color: rgba(0, 0, 0, .4 );
}

.info {
    display: flex;
    gap: 1rem;
}
.titles {
    text-wrap: nowrap;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.controls {
    display: flex;
    align-items: center;
}
.range-input {
    cursor: pointer;
}
.rewind {
    flex: 1;
}
.rewind-range {
    width: 100%;
}
.item__title {
    font-weight: bold;
    font-size: 1rem;
}
.item__author {
    font-size: 0.8rem;
    line-height: 1;
}
</style>
  