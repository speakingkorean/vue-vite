<script setup lang="ts">
import UploadVideo from '../components/UploadVideo.vue'
import axios from "axios";
import { ref, watchEffect } from 'vue'

const vids = ref([])
const HOST_URL = 'http://localhost:3000'
const VIDEO_TITLES_API_URL = '/api/videoTitles'
watchEffect(async () => {
    // this effect will run immediately and then
    // re-run whenever vids.value changes
    const response = await axios.get(`${HOST_URL}${VIDEO_TITLES_API_URL}`)
    vids.value = response.data
})

const vidSrc = ref('')
const PRESIGNED_URL_API = '/api/signedUrl/'
const changeVidSrc = async (title: string) => {
    // const title = 'SampleVideo_1280x720_1mb.mp4'
    const response = await axios.get(`${HOST_URL}${PRESIGNED_URL_API}${title}`)
    vidSrc.value = response.data
    // cache urls? also need to check expiration
    // could cleanse every hour... that would be a constant job though
}

</script>

<template>
    <div class="row">
        <div class="column-left">
            <UploadVideo />
            <div v-for="vid in vids" class="video-link">
                <a @click="() => changeVidSrc(vid)">{{ vid }}</a>
                <!-- <VideoLink :text="vid" /> -->
            </div>
        </div>
        <div class="column-right">
            <video :src="vidSrc" width="100%" class="player" controls controlsList="nodownload"
            oncontextmenu="return false;">
            </video>
            <!-- <iframe class="player" width="100%" height="100%" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> -->
            <!-- <iframe class="player3" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe> -->
        </div>
    </div>
</template>

<style scoped>
.column-left {
    float: left;
    width: 30%;
}

.column-right {
    float: right;
    width: 70%;
}

.column-right video {
    display: block;
}

.video-link {
    margin-bottom: 10px;
}

.player {
    width: 420;
    height: 315;
}

.player3 {
    width: 800px;
    height: 600px;
}
</style>
