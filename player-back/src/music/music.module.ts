import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { MusicController } from './music.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicSchema } from './schemas/music.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Music', schema: MusicSchema }])
    ],
    providers: [MusicService],
    controllers: [MusicController]
})
export class MusicModule {}
