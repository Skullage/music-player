import { Controller, Get, Res, HttpStatus, Post, Body, Put, Query, NotFoundException, Delete, Param } from '@nestjs/common';
import { MusicService } from './music.service';
import { CreateMusicDTO } from './dto/create-music.dto';
import { diskStorage } from 'multer'
import { extname } from 'path'
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};

@Controller('music')
export class MusicController {
    constructor(private musicService: MusicService) { }

    // add a customer
    @Post('/create')
    async addMusic(@Res() res, @Body() CreateMusicDTO: CreateMusicDTO) {
        const music = await this.musicService.addMusic(CreateMusicDTO);
        return res.status(HttpStatus.OK).json({
            message: "Music has been created successfully",
            music
        })
    }

    @Post('/upload/image')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads/images',
            filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
              },
          }),
        }),
    )
    async uploadImage(@Res() res, @UploadedFile() file) {
        const image = await this.musicService.upload(file);
        return res.status(HttpStatus.OK).json({
            message: "Image has been created successfully",
            image
        })
    }

    @Post('/upload/music')
    @UseInterceptors(
        FileInterceptor('file', {
          storage: diskStorage({
            destination: './uploads/musics',
            filename: (req, file, cb) => {
                // Generating a 32 random chars long string
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
                //Calling the callback passing the random name generated with the original extension name
                cb(null, `${randomName}${extname(file.originalname)}`)
              },
          }),
        }),
    )
    async uploadMusic(@Res() res, @UploadedFile() file) {
        const music = await this.musicService.upload(file);
        return res.status(HttpStatus.OK).json({
            message: "Music has been created successfully",
            music
        })
    }

    // Retrieve customers list
    @Get('musics')
    async getAllMusics(@Res() res) {
        const musics = await this.musicService.getAllMusics();
        return res.status(HttpStatus.OK).json(musics);
    }

    // Fetch a particular customer using ID
    @Get('music/:musicID')
    async getMusic(@Res() res, @Param('musicID') musicID) {
        const music = await this.musicService.getMusic(musicID);
        if (!music) throw new NotFoundException('Music does not exist!');
        return res.status(HttpStatus.OK).json(music);
    }

    // Update a customer's details
    @Put('/update')
    async updateMusic(@Res() res, @Query('musicID') musicID, @Body() CreateMusicDTO: CreateMusicDTO) {
        const music = await this.musicService.updateMusic(musicID, CreateMusicDTO);
        if (!music) throw new NotFoundException('Music does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Music has been successfully updated',
            music
        });
    }

    // Delete a customer
    @Delete('/delete')
    async deleteMusic(@Res() res, @Query('musicID') musicID) {
        const music = await this.musicService.deleteMusic(musicID);
        if (!music) throw new NotFoundException('Music does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'Music has been deleted',
            music
        })
    }
}
