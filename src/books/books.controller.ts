import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateBookDTO } from './dtos/create-book.dto';
import { CreateReviewDTO } from './dtos/create-review.dto';

@Controller('books')
export class BooksController {
    @Get()
    getAllBooks(@Query('groupByGenre') groupByGenre, @Query('groupByRelease') groupByRelease): string {
        // TODO
    }

    @Get('authors-ratings')
    getAggregateAuthorsRatings(): string {
        // TODO
    }

    @Post()
    createBook(@Body() createBookDTO: CreateBookDTO): string {
        // TODO
    }

    @Post(':bookId/reviews')
    createReview(@Body() createReview: CreateReviewDTO, @Param('bookId') bookId: string): string {
        // TODO
    }
    
    @Delete(':bookId/reviews/:reviewId')
    deleteReview(@Param('bookId') bookId: string, @Param('reviewId') reviewId: string): string {
        // TODO
    }
}
