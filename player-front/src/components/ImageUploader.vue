<template>
    <div class="form-group">
        <div class="preview" v-if="imagePreview">
            <img :src="imagePreview" alt="Preview">
        </div>
        <div class="file-group" @dragover.prevent="dragover" @dragleave.prevent="dragleave" @drop.prevent="dropImage" @click="fileupload.click()">
            <label>
                <p v-show="isDragging">
                    Release to drop files here.
                </p>
                <p v-show="!isDragging">
                    Drop files here or <u>click here</u> to upload.
                </p>
                <input type="file" accept="image/*" @change="onUploadImage" ref="fileupload">
            </label>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const isDragging = ref(false);
const fileupload = ref(null);
const imagePreview = ref(null);

const emit = defineEmits(['onChange']);

const onUploadImage = (event) => {
    emit('onChange', event.target.files[0]);
    setPreview(event.target.files[0]);
}
const dropImage = (event) => {
    if (/\.(jpe?g|png|gif)$/i.test(event.dataTransfer.files[0].name) ) {
        emit('onChange', event.dataTransfer.files[0])
        setPreview(event.dataTransfer.files[0]);
    }
    isDragging.value = false;
}
const dragover = (event) => {
    isDragging.value = true;
}
const dragleave = (event) => {
    isDragging.value = false;
}
const setPreview = (img) => {
    let reader  = new FileReader();
    reader.addEventListener("load", function () {
      imagePreview.value = reader.result;
    }.bind(this), false);
    reader.readAsDataURL(img);
}
</script>
<style scoped>
label {
    display: flex;
    flex-direction: column;
}
.file-group {
    width: 100%;
    border: 1px dashed black;
    padding: 1rem 2rem;
    cursor: pointer;
}
.file-group label {
    pointer-events: none;
}
input[type=file] {
    display: none;
}
.preview {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
}
.preview img {
    display: block;
    max-width: 100%;
    height: auto;
}
</style>