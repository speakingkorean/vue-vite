<template>
    <div>
        <div :if="message">
            {{message}}
        </div>
        <div :if="error">
            <span color="red">Oh No!</span>
        </div>
        <form @submit.prevent="sendFile" enctype="multipart/form-data">
            <input type="file" name="file" accept="video/*" @change="selectFile" />
            <hr>
            <!-- <input type="text" name="caption" placeholder="Caption" /> -->
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import axios from "axios";

const file = ref({ name: "" });
const fileName = computed(() => file.value?.name)
const fileExtension = computed(() => fileName.value?.substr(fileName.value?.lastIndexOf(".") + 1))

const message = ref("")
let error = false

const selectFile = async event => {
    file.value = event.target.files[0]
    message.value = ""
    error = false
    // todo: multiple
}

async function sendFile() {
    console.log(`fileName: ${fileName.value}`)
    console.log(`fileExtension: ${fileExtension.value}`)
    const formData = new FormData();
    formData.append("file", file.value)
    formData.append("videoName", fileName.value)
    formData.append("extension", fileExtension.value)
    // console.log(formData)
    try {
        await axios.post("http://localhost:3000/api/upload", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        message.value = "Hurray"
        error = false
    } catch (err) {
        console.log(err)
        message.value = "Something went wrong"
        error = true
    }
}
</script>