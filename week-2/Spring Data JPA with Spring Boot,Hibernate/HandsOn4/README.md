
# Hands-on 4: Difference between JPA, Hibernate, and Spring Data JPA

## Objective

To understand the differences between **JPA**, **Hibernate**, and **Spring Data JPA**, and how they simplify database operations in Java applications.

---

## Java Persistence API (JPA)

* JPA (Java Persistence API) is a **Java specification (JSR 338)** for Object Relational Mapping (ORM).
* It defines standard APIs for persisting, retrieving, updating, and deleting data from a database.
* JPA is **only a specification** and does not provide an implementation.
* It requires an implementation such as **Hibernate**, **EclipseLink**, or **OpenJPA**.

### Advantages

* Standard API for database persistence.
* Improves portability across different ORM providers.
* Reduces dependency on vendor-specific implementations.

---

## Hibernate

* Hibernate is a **popular ORM framework** and one of the implementations of JPA.
* It maps Java classes to database tables automatically.
* Hibernate provides features such as:

  * Automatic table mapping
  * HQL (Hibernate Query Language)
  * Caching
  * Lazy Loading
  * Automatic schema generation

### Advantages

* Powerful ORM framework.
* Reduces manual SQL coding.
* Provides advanced features like caching and lazy loading.

### Disadvantages

* Requires more boilerplate code when using Hibernate APIs directly.
* Sessions and transactions are managed manually.

---

## Spring Data JPA

* Spring Data JPA is a **Spring Framework module** built on top of JPA.
* It is **not** a JPA implementation.
* It internally uses a JPA implementation such as Hibernate.
* It significantly reduces boilerplate code by providing ready-made repository interfaces.
* Transaction management is integrated with Spring.

### Advantages

* Minimal code required.
* Automatic CRUD operations.
* Easy integration with Spring Boot.
* Supports custom query methods.

---

## Comparison Table

| Feature                | JPA                       | Hibernate                | Spring Data JPA         |
| ---------------------- | ------------------------- | ------------------------ | ----------------------- |
| Type                   | Specification             | JPA Implementation (ORM) | Spring Framework Module |
| Provides ORM           | No                        | Yes                      | Uses Hibernate/JPA      |
| Implementation         | No                        | Yes                      | No                      |
| Boilerplate Code       | Moderate                  | High                     | Very Low                |
| Transaction Management | External                  | Manual                   | Automatic               |
| Repository Support     | No                        | No                       | Yes (`JpaRepository`)   |
| SQL Generation         | Depends on implementation | Yes                      | Through Hibernate/JPA   |

---

## Hibernate Example

```java
public Integer addEmployee(Employee employee){
    Session session = factory.openSession();
    Transaction tx = null;
    Integer employeeID = null;

    try {
        tx = session.beginTransaction();
        employeeID = (Integer) session.save(employee);
        tx.commit();
    } catch (HibernateException e) {
        if (tx != null)
            tx.rollback();
        e.printStackTrace();
    } finally {
        session.close();
    }

    return employeeID;
}
```

---

## Spring Data JPA Example

### EmployeeRepository.java

```java
public interface EmployeeRepository extends JpaRepository<Employee, Integer> {

}
```

### EmployeeService.java

```java
@Autowired
private EmployeeRepository employeeRepository;

@Transactional
public void addEmployee(Employee employee) {
    employeeRepository.save(employee);
}
```

---

## Conclusion

* **JPA** is a specification that defines standards for ORM in Java.
* **Hibernate** is an implementation of JPA that provides ORM functionality.
* **Spring Data JPA** is built on top of JPA and simplifies database operations by reducing boilerplate code and automatically managing repositories and transactions.

---

## References

1. https://dzone.com/articles/what-is-the-difference-between-hibernate-and-sprin-1
2. https://www.javaworld.com/article/3379043/what-is-jpa-introduction-to-the-java-persistence-api.html
