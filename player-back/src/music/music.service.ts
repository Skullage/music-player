import { Injectable, UploadedFile } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Music } from './interface/music.interface';
import { CreateMusicDTO } from './dto/create-music.dto';

@Injectable()
export class MusicService {
    constructor(@InjectModel('Music') private readonly musicModel) { }
    // fetch all customers
    async getAllMusics(): Promise<Music[]> {
        const musics = await this.musicModel.find().exec();
        return musics;
    }
    // Get a single customer
    async getMusic(musicID): Promise<Music> {
        const music = await this.musicModel.findById(musicID).exec();
        return music;
    }
    async upload(file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename
        };
        return response;
    }
    // post a single customer
    async addMusic(CreateMusicDTO: CreateMusicDTO): Promise<Music> {
        const newMusic = await this.musicModel(CreateMusicDTO);
        return newMusic.save();
    }
    // Edit customer details
    async updateMusic(musicID, CreateMusicDTO: CreateMusicDTO): Promise<Music> {
        const updatedMusic = await this.musicModel
            .findByIdAndUpdate(musicID, CreateMusicDTO, { new: true });
        return updatedMusic;
    }
    // Delete a customer
    async deleteMusic(musicID): Promise<any> {
        const deletedMusic = await this.musicModel.findByIdAndRemove(musicID);
        return deletedMusic;
    }
}
