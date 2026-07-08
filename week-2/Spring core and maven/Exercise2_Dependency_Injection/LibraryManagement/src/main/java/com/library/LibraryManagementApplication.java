package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.library.service.BookService;

public class LibraryManagementApplication {
    public static void main(String[] args) {
        System.out.println("[LibraryManagementApplication] Bootstrapping Application Context...");

        // Load the Spring Application Context
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("[LibraryManagementApplication] Context initialized successfully. Retrieving bookService...");

        // Retrieve the BookService bean
        BookService bookService = (BookService) context.getBean("bookService");

        System.out.println("[LibraryManagementApplication] Testing dependency injection by adding a book...");
        // Test dependency injection
        bookService.addBook("Clean Architecture by Robert C. Martin");

        System.out.println("[LibraryManagementApplication] Verification complete!");
    }
}
