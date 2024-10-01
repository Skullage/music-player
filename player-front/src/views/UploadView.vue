<template>
    <div class="upload">
      <h1>Загрузить песню</h1>
      <form @submit.prevent="submit">
        <MusicUploader @onChange="file = $event; title = $event.name;" required />
        <div class="form-group">
           <label>
                Название
                <input type="text" v-model="title" required>  
            </label>
        </div>
        <div class="form-group">
           <label>
                Исполнитель
                <input type="text" v-model="author">  
            </label>
        </div>
        <div class="form-group">
           <label>
                Текст песни
                <textarea v-model="text" rows="5"></textarea>
            </label>
        </div>
        <ImageUploader @onChange="albumPhoto = $event;" />
        <input type="submit" value="Загрузить" class="upload-btn">
      </form>
    </div>
</template>
<script setup>
import ImageUploader from '@/components/ImageUploader.vue';
import MusicUploader from '@/components/MusicUploader.vue';
import { ref } from 'vue';
import axios from "axios";
import { server } from "@/helpers/helper.js";
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref(null);
const file = ref(null);
const author = ref(null);
const text = ref(null);
const albumPhoto = ref(null);


const submit = async () => {
    if(title.value && file.value) {
        let data = {
            title: title.value,
            text: text.value,
            author: author.value
        }
        if(albumPhoto.value) {
            let formDataImage = new FormData();
            formDataImage.append('file', albumPhoto.value);
            await axios.post(`${server.baseURL}/music/upload/image`, formDataImage).then((response) => {
                data['albumPhoto'] = response.data.image.filename;
            })
        }
        let formDataMusic = new FormData();
        formDataMusic.append('file', file.value);
        await axios.post(`${server.baseURL}/music/upload/music`, formDataMusic).then((response) => {
            data['filename'] = response.data.music.filename;
        })
        await axios.post(`${server.baseURL}/music/create`, data).then(() => {
            router.push('/');
        })
    } else {
        console.error('Не введены все обязательные поля');
    }
}
</script>
<style scoped>
h1 {
    margin-bottom: 1rem;
}
form {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.upload {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-width: 350px;
}
.form-group input, .form-group textarea {
    display: block;
    width: 100%;
}
.upload-btn {
    background-color: transparent;
    padding: 1rem 2rem;
    cursor: pointer;
    border-radius: 5px;
    text-transform: uppercase;
    transition-duration: 0.5s;
}
.upload-btn:hover {
    background-color: hsla(160, 100%, 37%, 0.8);
}
</style>  