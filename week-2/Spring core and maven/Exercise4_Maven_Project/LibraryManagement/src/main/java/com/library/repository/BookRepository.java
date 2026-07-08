package com.library.repository;

/**
 * BookRepository - Data Access Layer
 *
 * Responsible for persisting and retrieving Book records.
 * In a production environment, this class would interact with a database
 * via JPA/Hibernate or JDBC. For this exercise, it simulates persistence
 * with console output.
 */
public class BookRepository {

    /**
     * Persists a book record identified by its title.
     *
     * @param bookTitle the title of the book to save
     */
    public void saveBook(String bookTitle) {
        System.out.println("[BookRepository] Persisting book to data store: \"" + bookTitle + "\"");
    }

    /**
     * Retrieves a book record by its title.
     *
     * @param bookTitle the title of the book to find
     * @return a descriptive string representing the found book
     */
    public String findBook(String bookTitle) {
        System.out.println("[BookRepository] Querying data store for: \"" + bookTitle + "\"");
        return "Book[title=" + bookTitle + "]";
    }
}
