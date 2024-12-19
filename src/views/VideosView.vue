<script setup lang="ts">
import vid from '../assets/Saintway – Here Comes The Fire.mp4'
</script>

<template>
    <iframe class="player" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
    <video :src="vid" width="420" class="player" controls controlsList="nodownload" oncontextmenu="return false;"></video>
</template>

<style scoped>
.player {
    width: 420;
    height: 315;
}
</style>
