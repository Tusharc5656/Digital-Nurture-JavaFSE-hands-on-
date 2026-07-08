package com.library.service;

import com.library.repository.BookRepository;

/**
 * BookService - Business Logic / Service Layer
 *
 * Orchestrates library operations by delegating persistence tasks to
 * the BookRepository. The BookRepository dependency is injected by
 * the Spring IoC container via setter injection (Dependency Injection).
 */
public class BookService {

    /** Injected by Spring using setter-based Dependency Injection */
    private BookRepository bookRepository;

    // -------------------------------------------------------------------------
    // Setter Injection - Spring calls this method to wire the dependency
    // -------------------------------------------------------------------------

    /**
     * Setter method used by Spring's IoC container to inject the
     * BookRepository dependency at runtime.
     *
     * @param bookRepository the repository bean managed by Spring
     */
    public void setBookRepository(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
        System.out.println("[BookService] BookRepository dependency injected successfully.");
    }

    // -------------------------------------------------------------------------
    // Business Operations
    // -------------------------------------------------------------------------

    /**
     * Adds a new book to the library system by delegating persistence
     * to the BookRepository.
     *
     * @param bookTitle the title of the book to add
     */
    public void addBook(String bookTitle) {
        System.out.println("[BookService] Processing addBook request for: \"" + bookTitle + "\"");
        bookRepository.saveBook(bookTitle);
        System.out.println("[BookService] Book added successfully.");
    }

    /**
     * Retrieves a book from the library by title.
     *
     * @param bookTitle the title of the book to retrieve
     * @return a descriptive string of the found book
     */
    public String getBook(String bookTitle) {
        System.out.println("[BookService] Processing getBook request for: \"" + bookTitle + "\"");
        return bookRepository.findBook(bookTitle);
    }
}
