<script setup>
import MusicItem from './MusicItem.vue'
import { server } from '@/helpers/helper'
import { reactive } from 'vue'
import axios from 'axios'

let data = reactive({});

await axios.get(`${server.baseURL}/music/musics`).then(response => {
  data = response.data;
})
</script>

<template>
  <div id="content">
    <MusicItem v-for="(item, index) in data" :key="index" :item="item" />
  </div>
</template>
<style>
#content {
  padding-top: 5rem;
}
</style>