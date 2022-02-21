import { CreateReviewDTO } from "./create-review.dto"

export class CreateBookDTO {
    readonly name: string
    readonly author: string
    readonly releaseDate: Date
    readonly genre: string
    readonly reviews: CreateReviewDTO[]
}