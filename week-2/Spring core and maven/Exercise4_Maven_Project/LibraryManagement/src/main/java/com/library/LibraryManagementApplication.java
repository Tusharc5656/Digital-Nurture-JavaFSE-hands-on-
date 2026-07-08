package com.library;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.library.service.BookService;

/**
 * LibraryManagementApplication - Application Entry Point
 *
 * Bootstraps the Spring IoC container from applicationContext.xml,
 * retrieves the BookService bean, and demonstrates that Dependency
 * Injection has been correctly configured via the Maven-managed project.
 *
 * Exercise 4: Creating and Configuring a Maven Project
 *  - Verifies that Spring Context, Spring AOP, and Spring WebMVC
 *    dependencies are resolved correctly through pom.xml.
 *  - Verifies that the Maven Compiler Plugin compiles the project
 *    using Java 1.8 source/target compatibility.
 */
public class LibraryManagementApplication {

    public static void main(String[] args) {

        System.out.println("=============================================================");
        System.out.println("   Library Management System - Maven Project (Exercise 4)   ");
        System.out.println("=============================================================");
        System.out.println();

        // Step 1: Bootstrap the Spring IoC Container
        System.out.println("[App] Loading Spring Application Context from applicationContext.xml...");
        ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        System.out.println("[App] Application Context initialized successfully.");
        System.out.println();

        // Step 2: Retrieve the BookService bean (DI already handled by Spring)
        System.out.println("[App] Retrieving 'bookService' bean from context...");
        BookService bookService = (BookService) context.getBean("bookService");
        System.out.println();

        // Step 3: Test addBook - delegates to BookRepository via DI
        System.out.println("[App] --- Test 1: Adding a book ---");
        bookService.addBook("Spring in Action by Craig Walls");
        System.out.println();

        // Step 4: Test getBook
        System.out.println("[App] --- Test 2: Retrieving a book ---");
        String result = bookService.getBook("Clean Code by Robert C. Martin");
        System.out.println("[App] Retrieved: " + result);
        System.out.println();

        System.out.println("=============================================================");
        System.out.println("   Exercise 4 Verification Complete!                        ");
        System.out.println("   Maven Project configured and Dependency Injection works.  ");
        System.out.println("=============================================================");
    }
}
