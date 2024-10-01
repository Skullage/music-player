import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue';

export const useMusicStore = defineStore('music', () => {
  const currentPlayer = ref(null);
  const currentVolume = ref(0.5);

  const isMusicPlayed = computed(() => {
    return currentPlayer.value !== null;
  })

  const getCurrentTime = computed(() => {
    return currentPlayer.value.currentTime;
  })

  const getDuration = computed(() => {
    return currentPlayer.value.duration;
  })

  const playMusic = (ref) => {
    if (isMusicPlayed.value) {
        stopMusic();
    } 
    currentPlayer.value = ref;
    currentPlayer.value.volume = currentVolume.value;
    currentPlayer.value.play();
  }
  const stopMusic = () => {
    currentPlayer.value.pause();
    currentPlayer.value = null;
  }

  const changeTime = (value) => {
    currentPlayer.value.currentTime = value;
  }
  
  watch(currentVolume, (newValue) => {
    currentPlayer.value.volume = newValue;
  })

  return { playMusic, stopMusic, changeTime, currentVolume, getCurrentTime, getDuration }
})
