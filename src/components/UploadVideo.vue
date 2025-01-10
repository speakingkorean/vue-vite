<template>
    <div>
        <div class="w3-modal" onclick="this.style.display='none'">
            <span class="w3-button w3-hover-red w3-xlarge w3-display-topright">&times;</span>
            <div class="w3-modal-content w3-animate-zoom">
                <!-- <img id="img01" style="width:100%"> -->
                test
            </div>
        </div>
        <div v-if="message">
            {{ message }}
        </div>
        <div v-if="error">
            <span color="red">Oh No!</span>
        </div>
        <button @click="activateUpload" v-if="!isUpload" class="spacing">
            + Upload
        </button>
        <div v-if="isUpload" class="spacing">
            <form @submit.prevent="sendFile" enctype="multipart/form-data">
                <input type="file" name="file" accept="video/*" @change="selectFile" />
                <br>
                <!-- <input type="text" name="caption" placeholder="Caption" /> -->
                <button type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";

const file = ref({ name: "" });
const fileName = computed(() => file.value.name)
const fileExtension = computed(() => fileName.value.substr(fileName.value.lastIndexOf(".") + 1))

const message = ref("")
const error = ref(false)
const isUpload = ref(false)

const activateUpload = () => {
    isUpload.value = true
}

async function selectFile(event: any) {
    file.value = event.target.files[0]
    message.value = ""
    error.value = false
    // todo: multiple
}

async function sendFile() {
    const formData = new FormData();
    formData.append("file", file.value)
    formData.append("videoName", fileName.value)
    formData.append("extension", fileExtension.value)
    try {
        // todo: export to .env file
        await axios.post("http://localhost:3000/api/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        console.log(`uploading ${fileName.value}`)
        message.value = "Hurray"
        error.value = false
    } catch (err) {
        console.log(err)
        message.value = "Something went wrong"
        error.value = true
    }

}
</script>

<style scoped>
.spacing {
    margin-bottom: 10px;
}

.w3-modal {
    z-index: 3;
    display: none;
    padding-top: 100px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4)
}

.w3-modal-content {
    margin: auto;
    background-color: #fff;
    position: relative;
    padding: 0;
    outline: 0;
    width: 600px
}

.w3-animate-zoom {
    animation: animatezoom 0.6s
}

@keyframes animatezoom {
    from {
        transform: scale(0)
    }

    to {
        transform: scale(1)
    }
}
</style>
