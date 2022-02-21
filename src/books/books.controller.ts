import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDTO } from './dtos/create-book.dto';
import { CreateReviewDTO } from './dtos/create-review.dto';
import { Book } from './models/book';

@Controller('books')
export class BooksController {

    constructor(private readonly booksService: BooksService) {}

    @Get()
    getAllBooks(@Query('groupByGenre') groupByGenre, @Query('groupByReleaseDate') groupByReleaseDate): Promise<any[]> {
        if (groupByGenre && groupByReleaseDate) {
            return this.booksService.getBooksGroupedByGenreAndReleaseDate();
        } else if (groupByGenre) {
            return this.booksService.getBooksGroupedByGenre();
        }
        return this.booksService.getAllBooks();
    }

    @Get('authors-ratings')
    getAggregateAuthorsRatings(): Promise<any[]> {
        return this.booksService.getAggregateAuthorsRatings();
    }

    @Post()
    createBook(@Body() createBookDTO: CreateBookDTO): Promise<Book> {
        return this.booksService.createBook(createBookDTO);
    }

    @Post(':bookId/reviews')
    createReview(@Body() createReview: CreateReviewDTO, @Param('bookId') bookId: string): Promise<Book> {
        return this.booksService.addReview(createReview, bookId);
    }
    
    @Delete(':bookId/reviews/:reviewId')
    deleteReview(@Param('bookId') bookId: string, @Param('reviewId') reviewId: string): Promise<Book> {
        return this.booksService.deleteReview(bookId, reviewId);
    }
}
