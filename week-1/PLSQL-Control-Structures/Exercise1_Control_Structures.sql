-- =====================================================
-- Exercise 1 : Control Structures (PL/SQL)
-- =====================================================

---------------------------------------------------------
-- Create Customers Table
---------------------------------------------------------

CREATE TABLE Customers (
    CustomerID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    Age NUMBER,
    Balance NUMBER(10,2),
    IsVIP VARCHAR2(5)
);

---------------------------------------------------------
-- Create Loans Table
---------------------------------------------------------

CREATE TABLE Loans (
    LoanID NUMBER PRIMARY KEY,
    CustomerID NUMBER,
    InterestRate NUMBER(5,2),
    DueDate DATE,
    CONSTRAINT FK_Customer
    FOREIGN KEY (CustomerID)
    REFERENCES Customers(CustomerID)
);

---------------------------------------------------------
-- Insert Sample Data
---------------------------------------------------------

INSERT INTO Customers VALUES (1,'Rahul',65,12000,'FALSE');
INSERT INTO Customers VALUES (2,'Aman',45,8000,'FALSE');
INSERT INTO Customers VALUES (3,'Priya',70,15000,'FALSE');
INSERT INTO Customers VALUES (4,'Riya',55,5000,'FALSE');

INSERT INTO Loans VALUES (101,1,10,DATE '2026-07-20');
INSERT INTO Loans VALUES (102,2,12,DATE '2026-08-30');
INSERT INTO Loans VALUES (103,3,9,DATE '2026-07-15');
INSERT INTO Loans VALUES (104,4,11,DATE '2026-07-25');

COMMIT;

---------------------------------------------------------
-- Display Initial Data
---------------------------------------------------------

SELECT * FROM Customers;

SELECT * FROM Loans;

---------------------------------------------------------
-- Scenario 1
-- Apply 1% discount to loan interest rates
-- for customers above 60 years
---------------------------------------------------------

BEGIN
    FOR c IN (
        SELECT CustomerID
        FROM Customers
        WHERE Age > 60
    )
    LOOP
        UPDATE Loans
        SET InterestRate = InterestRate - 1
        WHERE CustomerID = c.CustomerID;
    END LOOP;

    COMMIT;
END;
/

---------------------------------------------------------
-- Verify Scenario 1
---------------------------------------------------------

SELECT * FROM Loans;

---------------------------------------------------------
-- Scenario 2
-- Promote customers to VIP
-- if Balance > 10000
---------------------------------------------------------

BEGIN
    FOR c IN (
        SELECT CustomerID
        FROM Customers
        WHERE Balance > 10000
    )
    LOOP
        UPDATE Customers
        SET IsVIP = 'TRUE'
        WHERE CustomerID = c.CustomerID;
    END LOOP;

    COMMIT;
END;
/

---------------------------------------------------------
-- Verify Scenario 2
---------------------------------------------------------

SELECT * FROM Customers;

---------------------------------------------------------
-- Scenario 3
-- Print reminder for loans due
-- within the next 30 days
---------------------------------------------------------

SET SERVEROUTPUT ON;

BEGIN
    FOR r IN (
        SELECT c.CustomerName,
               l.DueDate
        FROM Customers c
        JOIN Loans l
        ON c.CustomerID = l.CustomerID
        WHERE l.DueDate BETWEEN SYSDATE AND SYSDATE + 30
    )
    LOOP
        DBMS_OUTPUT.PUT_LINE(
            'Reminder: Loan payment for '
            || r.CustomerName
            || ' is due on '
            || TO_CHAR(r.DueDate,'DD-MON-YYYY')
        );
    END LOOP;
END;
/

---------------------------------------------------------
-- Final Output
---------------------------------------------------------

SELECT * FROM Customers;

SELECT * FROM Loans;