package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.library.service.BookService;

public class Main {
    public static void main(String[] args) {
        System.out.println("[Main] Loading applicationContext.xml...");
        
        // Load the Spring Application Context
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");

        System.out.println("[Main] Retrieving bookService bean...");
        // Retrieve the BookService bean
        BookService bookService = (BookService) context.getBean("bookService");

        System.out.println("[Main] Testing configuration...");
        // Test the configuration
        bookService.addBook("Design Patterns: Elements of Reusable Object-Oriented Software");
        
        System.out.println("[Main] Context loaded and verified successfully!");
    }
}
