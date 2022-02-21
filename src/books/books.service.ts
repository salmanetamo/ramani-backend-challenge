import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateBookDTO } from './dtos/create-book.dto';
import { CreateReviewDTO } from './dtos/create-review.dto';
import { Book, BookDocument } from './models/book';

@Injectable()
export class BooksService {

    constructor(@InjectModel(Book.name) private bookModel: mongoose.Model<BookDocument>) {}

    async getAllBooks(): Promise<Book[]> {
        return this.bookModel.find().exec();
    }

    async getBooksGroupedByGenre(): Promise<any[]> {
        return this.bookModel.aggregate([
            {
                $group: {
                    _id: {genre: '$genre'},
                    books: {
                        $push: {
                            name: '$name',
                            _id: '$_id'
                        }
                    }
                }
            }
        ]);
    }
    
    async getBooksGroupedByGenreAndReleaseDate(): Promise<any[]> {
        const queryResult = await this.bookModel.aggregate([
            {
                $group: {
                    _id: {
                        genre: '$genre',
                        releaseDate: {
                            $dateToString: { format: "%Y", date: "$releaseDate" }
                        }
                    },
                    books: {
                        $push: {
                            name: '$name',
                            releaseDate: {
                                $dateToString: { format: "%Y", date: "$releaseDate" }
                            },
                            _id: '$_id'
                        }
                    }
                }
            },
            {
                $group: {
                    _id: {genre: '$_id.genre'},
                    year: {
                        $push: {
                            releaseDate: '$_id.releaseDate'
                        }
                    },
                    books: {
                        $push: {
                            name: '$books.name',
                            _id: '$books._id'
                        }
                    }
                }
            }
        ]);
        const result = [];
        queryResult.forEach(queryResultEntry => {
            const booksPerReleaseYear = [];
            queryResultEntry.year.forEach((releaseYear, index) => {
                const books = queryResultEntry.books[index].name.map((name, indexBookName) => {
                    return {name,  _id: queryResultEntry.books[index]._id[indexBookName]};
                });
                booksPerReleaseYear.push({
                    releaseYear: releaseYear.releaseDate,
                    books
                });
            });
            result.push({
                genre: queryResultEntry._id.genre,
                booksPerReleaseYear
            });
        });
        return result;
    }

    async createBook(createBookDTO: CreateBookDTO): Promise<Book> {
        const newBook = new this.bookModel(createBookDTO);
        return newBook.save();
    }

    async addReview(createReviewDTO: CreateReviewDTO, bookId: string): Promise<Book> {
        const book = await this.bookModel.findOne({_id: bookId});
        book.reviews.push(createReviewDTO);
        return book.save(); 
    }

    async deleteReview(bookId: string, reviewId: string): Promise<Book> {
        const book = await this.bookModel.findOne({_id: bookId});
        book.reviews = book.reviews.filter(review => review._id.toString() !== new mongoose.Types.ObjectId(reviewId).toString());
        return book.save(); 
    }

    async getAggregateAuthorsRatings(): Promise<any[]> {
        const queryResult = await this.bookModel.aggregate([
            {
                $group: {
                    _id: {author: '$author'},
                    reviews: {
                        $push: '$reviews'
                    }
                }
            }
        ]);
        const result = [];
        queryResult.forEach(queryResultEntry => {
            let totalRating = 0;
            queryResultEntry.reviews.forEach(reviewsForSingleBook => {
                reviewsForSingleBook.forEach(review => {
                    totalRating += review.rating;
                });
            });
            result.push({
                author: queryResultEntry._id.author,
                totalRating
            });
        });
        return result;
    }
}
