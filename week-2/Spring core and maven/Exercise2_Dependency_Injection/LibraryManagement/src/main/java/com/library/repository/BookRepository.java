package com.library.repository;

public class BookRepository {
    public void saveBook(String bookTitle) {
        System.out.println("[BookRepository] Successfully saved the book: " + bookTitle);
    }
}
