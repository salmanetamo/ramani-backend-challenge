import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Review {
    _id?: string;

    @Prop()
    review: string;

    @Prop()
    rating: number;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);