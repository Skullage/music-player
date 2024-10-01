<template>
    <div class="form-group">
        <p v-if="filename">{{ filename }}</p>
        <div class="file-group" @dragover.prevent="dragover" @dragleave.prevent="dragleave" @drop.prevent="dropMusic" @click="fileupload.click()">
            <label>
                <p v-show="isDragging">
                    Release to drop files here.
                </p>
                <p v-show="!isDragging">
                    Drop files here or <u>click here</u> to upload.
                </p>
                <input type="file" accept="audio/*" @change="onUploadMusic" ref="fileupload">
            </label>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
const isDragging = ref(false);
const fileupload = ref(null);
const filename = ref(null);

const emit = defineEmits(['onChange']);

const onUploadMusic = (event) => {
    emit('onChange', event.target.files[0])
    filename.value = event.target.files[0].name;
}
const dropMusic = (event) => {
    if ( /\.(mp3|wav|gif|aac|wma|alac)$/i.test( event.dataTransfer.files[0].name ) ) {
        emit('onChange', event.dataTransfer.files[0]);
        filename.value = event.dataTransfer.files[0].name;
    }
    isDragging.value = false;
}
const dragover = (event) => {
    isDragging.value = true;
}
const dragleave = (event) => {
    isDragging.value = false;
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
</style>