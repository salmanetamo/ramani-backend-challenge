import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Review, ReviewSchema } from "./review";

@Schema()
export class Book {
    id?: string;
    
    @Prop()
    name: string;
    
    @Prop()
    author: string;
    
    @Prop()
    releaseDate: Date;
    
    @Prop()
    genre: string;
    
    @Prop({ type: [{ type: ReviewSchema, ref: Review.name }] })
    reviews: Review[];
}

export const BookSchema = SchemaFactory.createForClass(Book);

export type BookDocument = Book & Document;
