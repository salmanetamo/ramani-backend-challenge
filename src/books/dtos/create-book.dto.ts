export class CreateBookDTO {
    readonly name: string
    readonly author: string
    readonly releaseDate: Date
    readonly genre: string
    readonly reviews: string[]
}