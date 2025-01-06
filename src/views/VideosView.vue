<script setup lang="ts">
import UploadVideo from '../components/UploadVideo.vue'
import axios from "axios";

import { ref, watchEffect } from 'vue'

const API_URL = `http://localhost:3000/api/videoTitles`
const vids = ref([])

watchEffect(async () => {
  // this effect will run immediately and then
  // re-run whenever vids.value changes
  const response = await axios.get(API_URL)
  vids.value = response.data
})
</script>

<template>
    <UploadVideo />
    <hr>
    <div v-for="vid in vids">
        {{ vid }}
    </div>
    <!-- <iframe class="player" width="450" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> -->
    <!-- <iframe class="player3" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> -->
    <!-- <video :src="vid" width="420" class="player" controls controlsList="nodownload"
        oncontextmenu="return false;"></video> -->
</template>

<style scoped>
.player {
    width: 420;
    height: 315;
}

.player3 {
    width: 420;
    height: 315;
}
</style>
