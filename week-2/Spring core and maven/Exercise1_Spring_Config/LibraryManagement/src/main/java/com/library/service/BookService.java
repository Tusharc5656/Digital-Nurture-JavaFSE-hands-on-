package com.library.service;

import com.library.repository.BookRepository;

public class BookService {
    private BookRepository bookRepository;

    // Setter for Spring's setter dependency injection
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public void addBook(String bookTitle) {
        System.out.println("[BookService] Processing request to add book: " + bookTitle);
        bookRepository.saveBook(bookTitle);
    }
}
