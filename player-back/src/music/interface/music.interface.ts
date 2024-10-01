import { Document } from 'mongoose';

export interface Music extends Document {
    readonly title: string;
    readonly filename: string;
    readonly text: string;
    readonly albumPhoto: string;
    readonly author: string;
    readonly likes: Object;
}