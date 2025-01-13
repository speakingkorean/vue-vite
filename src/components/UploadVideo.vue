<template>
    <form @submit.prevent="sendFile" method="POST" enctype="multipart/form-data">
        <div v-show="!fileLoaded" :class="['dropzone-wrapper', dragging ? 'drag-over' : '']"
            @dragenter="dragging = true" @dragleave="dragging = false">
            <div class="dropzone-description">
                <p>Choose a video file or drag it here</p>
            </div>
            <input type="file" name="file" class="dropzone" accept="video/*" @change="selectFile">
        </div>
        <div class="preview-zone" v-show="fileLoaded">
            <div class="box">
                <div class="box-header">
                    <div><b>Preview</b></div>
                    <div class="box-tools">
                        <button type="button" @click="reset">
                            Reset
                        </button>
                    </div>
                </div>
                <video @durationchange="updateDuration" ref="videoElement" :src="fileUrl" width="500px"
                    controls></video>
            </div>
        </div>
        <div class="input-box" v-show="fileLoaded">
            <label>Title *</label>
            <input v-model="videoTitle" class="mid" required>
            <label>Duration</label>
            <p>{{ displayDuration(videoDuration) }}</p>
            <!-- optional -->
            <label>Date</label>
            <input v-model="videoDate" type="date" class="mid">
            <label>Tags</label>
            <div v-for="tag of tags">
                <label>
                    <input type="checkbox" :value="tag" v-model="checkedTags"> {{ tag }}
                </label>
            </div>
            <div class="upload-button" v-show="fileName">
                <button type="submit">Upload</button>
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from "vue"
import axios from "axios"

const emptyFile = new File([], "")
const file = ref(emptyFile)
const fileLoaded = computed(() => file.value.size > 0)
const fileUrl = ref('')
const fileName = computed(() => file.value.name)
const videoTitle = ref('')
const videoDuration = ref(0)
// const videoDate = ref(new Date().toISOString().split('T')[0]) // nullable so no default today
const videoDate = ref(null)
const dragging = ref(false)
const tags = reactive([
    'tag1',
    'tag2',
    'tag3',
    'tag4',
    'tag5',
    'tag6',
])
const checkedTags = ref([])

function selectFile(event: Event) {
    const fileInput = event.target as HTMLInputElement
    if (fileInput && fileInput.files)
        file.value = fileInput.files[0]
    videoTitle.value = fileName.value
    fileUrl.value = URL.createObjectURL(file.value)
    // todo: multiple
}

function updateDuration(event: Event) {
    const videoEl = event.target as HTMLMediaElement
    videoDuration.value = Math.round(videoEl.duration)
}

function displayDuration(duration: number) {
    return new Date(duration * 1000).toISOString().slice(11, 19);
}

watch(file, () => {
    URL.revokeObjectURL(fileUrl.value)
})

function reset() {
    file.value = emptyFile
}

async function sendFile() {
    const formData = new FormData();
    formData.append("file", file.value)
    formData.append("videoName", videoTitle.value)
    try {
        // todo: export to .env file
        await axios.post("http://localhost:3000/api/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(`uploading ${fileName.value}`)
    } catch (err) {
        console.error(err)
    }
    // modal dialog
    reset()
}
</script>

<style scoped>
.box {
    position: relative;
    background: #ffffff;
    width: 100%;
}

.box-header {
    color: #444;
    display: block;
    padding: 10px;
    position: relative;
}

.box-tools {
    position: absolute;
    right: 10px;
    top: 5px;
}

.dropzone-wrapper {
    border: 2px dashed #91b0b3;
    color: #92b0b3;
    position: relative;
    height: 150px;
}

.dropzone-description {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    text-align: center;
    width: 40%;
    top: 50px;
    font-size: 16px;
}

.dropzone,
.dropzone:focus {
    position: absolute;
    outline: none !important;
    width: 100%;
    height: 150px;
    cursor: pointer;
    opacity: 0;
}

.dropzone-wrapper:hover,
.dropzone-wrapper.drag-over {
    background: #ecf0f5;
}

.preview-zone {
    text-align: center;
}

.upload-button {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

.upload-button>button {
    font-size: 1rem;
    font-weight: 300;
    cursor: pointer;
    outline: 0;
    user-select: none;
    border-color: rgb(216, 216, 216) rgb(209, 209, 209) rgb(186, 186, 186);
    border-style: solid;
    border-radius: 4px;
    border-width: 1px;
    background-color: hsl(0, 0%, 100%);
    color: hsl(0, 0%, 29%);
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.upload-button>button {
    color: hsl(204, 86%, 53%);
    border-color: hsl(204, 86%, 53%);
}

.upload-button>button:hover {
    border-color: hsl(204, 86%, 53%);
    background-color: hsl(204, 86%, 96%);
}

.upload-button>button:active {
    background-color: hsl(204, 86%, 91%);
}

@keyframes pulse {
    0% {
        color: hsl(48, 100%, 67%);
    }

    50% {
        color: hsl(48, 100%, 38%);
    }

    100% {
        color: hsl(48, 100%, 67%);
    }
}

.input-box {
    margin: auto;
    width: 300px;
    height: 300px;
}

.mid {
    width: 100%;
    margin-bottom: 10px;
    background: rgba(255, 255, 255, 0.9);
    padding: 10px;
    font-size: 13px;
    color: #0c0c0c;
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 4px;
}

input:focus {
    box-shadow: inset 0 -5px 45px rgba(100, 100, 100, 0.4), 0 1px 1px rgba(255, 255, 255, 0.2);
}
</style>