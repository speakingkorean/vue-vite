<template>
    <div>
        <section>
            <form @submit.prevent="sendFile" method="POST" enctype="multipart/form-data">
                <div class="container">
                    <div class="row">
                        <div class="preview-zone" v-show="fileName">
                            <div class="box">
                                <div class="box-header">
                                    <div><b>Preview</b></div>
                                    <div class="box-tools">
                                        <button type="button" @click="reset">
                                            X Reset This Form
                                        </button>
                                    </div>
                                </div>
                                <div class="box-body">
                                    <span style="color:black">{{ fileName }}</span>
                                </div>
                            </div>
                        </div>
                        <div v-show="!fileName" :class="['dropzone-wrapper', dragging ? 'drag-over' : '']"
                            @dragenter="dragging = true" @dragleave="dragging = false">
                            <div class="dropzone-description">
                                <p>Choose an video file or drag it here</p>
                            </div>
                            <input type="file" name="file" class="dropzone" accept="video/*" @change="selectFile">
                        </div>
                    </div>
                    <div class="upload-button" v-show="fileName">
                        <!-- <label>Upload</label> -->
                        <button type="submit">Upload</button>
                    </div>
                </div>
            </form>
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";

const file = ref({ name: "" });
const fileName = computed(() => file.value.name)
const dragging = ref(false)

function selectFile(event: any) {
    file.value = event.target.files[0]
    // todo: multiple
}

function reset() {
    file.value = { name: "" }
}

async function sendFile() {
    const formData = new FormData();
    formData.append("file", file.value)
    formData.append("videoName", fileName.value)
    try {
        // todo: export to .env file
        await axios.post("http://localhost:3000/api/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(`uploading ${fileName.value}`)
    } catch (err) {
        console.error(err)
    }
}
</script>

<style scoped>
.container {
    padding: 50px 10%;
}

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
    border-bottom: 1px solid #f4f4f4;
    margin-bottom: 10px;
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

.preview-zone .box {
    box-shadow: none;
    border-radius: 0;
    margin-bottom: 0;
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

.upload-button>button:hover {
    border-color: hsl(0, 0%, 21%);
}

.upload-button>button:active {
    background-color: hsl(0, 0%, 96%);
}

.upload-button>button>i {
    padding-right: 5px;
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
</style>