import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    phone: String,
    date_register: { type: Date, default: Date.now },
    date_last_activity: { type: Date, default: Date.now },
    musics: { type: Array, default: [] },
    likes: { type: Array, default: [] }
})