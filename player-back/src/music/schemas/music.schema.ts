import * as mongoose from 'mongoose';

export const MusicSchema = new mongoose.Schema({
    title: { type: String, required: true },
    filename: { type: String, required: true },
    text: { type: String, default: null },
    albumPhoto: { type: String, default: 'placeholder.jpg' },
    author: { type: String, default: null },
    likes: { type: Number, default: 0 }
})