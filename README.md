# Ramani Backend Challenge

Create a REST API that allows a user to manage a book directory.

## Installation

Use npm to install dependencies

```bash
npm install
```

## Usage
1. Create a .env file in the root of the project and add a URL for Mongodb (See .env.example)
2. Start Project with `npm start`
3. Use Postman collection to test different endpoints
    - For the GET books endpoint, there are 3 options:
        - Call without any query parameters: Returns a list of all books
        - Call with `groupByGenre` query parameter set to true: Returns books grouped by genre
        - Call with with `groupByGenre` and `groupByReleaseDate` query parameters both set to true: returns books grouped by genre then by release year
    - To add or remove reviews, the `bookId` is required
