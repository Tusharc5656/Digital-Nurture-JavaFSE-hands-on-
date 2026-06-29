-- =====================================================
-- Exercise 3 : Stored Procedures
-- =====================================================

---------------------------------------------------------
-- Drop Existing Tables
---------------------------------------------------------

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Accounts';
EXCEPTION
    WHEN OTHERS THEN NULL;
END;
/

BEGIN
    EXECUTE IMMEDIATE 'DROP TABLE Employees';
EXCEPTION
    WHEN OTHERS THEN NULL;
END;
/

---------------------------------------------------------
-- Create Accounts Table
---------------------------------------------------------

CREATE TABLE Accounts (
    AccountID NUMBER PRIMARY KEY,
    CustomerName VARCHAR2(50),
    AccountType VARCHAR2(20),
    Balance NUMBER(10,2)
);

---------------------------------------------------------
-- Create Employees Table
---------------------------------------------------------

CREATE TABLE Employees (
    EmployeeID NUMBER PRIMARY KEY,
    EmployeeName VARCHAR2(50),
    Department VARCHAR2(30),
    Salary NUMBER(10,2)
);

---------------------------------------------------------
-- Insert Sample Data
---------------------------------------------------------

INSERT INTO Accounts VALUES (101,'Rahul','Savings',10000);
INSERT INTO Accounts VALUES (102,'Aman','Savings',15000);
INSERT INTO Accounts VALUES (103,'Priya','Current',12000);
INSERT INTO Accounts VALUES (104,'Riya','Savings',8000);

INSERT INTO Employees VALUES (1,'Rohit','IT',50000);
INSERT INTO Employees VALUES (2,'Anjali','HR',45000);
INSERT INTO Employees VALUES (3,'Karan','IT',60000);
INSERT INTO Employees VALUES (4,'Sneha','Finance',55000);

COMMIT;

---------------------------------------------------------
-- Display Initial Data
---------------------------------------------------------

SELECT * FROM Accounts;

SELECT * FROM Employees;

---------------------------------------------------------
-- Scenario 1
-- Process Monthly Interest
---------------------------------------------------------

CREATE OR REPLACE PROCEDURE ProcessMonthlyInterest
IS
BEGIN
    UPDATE Accounts
    SET Balance = Balance + (Balance * 0.01)
    WHERE AccountType='Savings';

    COMMIT;
END;
/

BEGIN
    ProcessMonthlyInterest;
END;
/

---------------------------------------------------------
-- Verify Scenario 1
---------------------------------------------------------

SELECT * FROM Accounts;

---------------------------------------------------------
-- Scenario 2
-- Update Employee Bonus
---------------------------------------------------------

CREATE OR REPLACE PROCEDURE UpdateEmployeeBonus(
    p_department IN VARCHAR2,
    p_bonus IN NUMBER
)
IS
BEGIN
    UPDATE Employees
    SET Salary = Salary + (Salary * p_bonus / 100)
    WHERE Department = p_department;

    COMMIT;
END;
/

BEGIN
    UpdateEmployeeBonus('IT',10);
END;
/

---------------------------------------------------------
-- Verify Scenario 2
---------------------------------------------------------

SELECT * FROM Employees;

---------------------------------------------------------
-- Scenario 3
-- Transfer Funds
---------------------------------------------------------

CREATE OR REPLACE PROCEDURE TransferFunds(
    p_fromAccount IN NUMBER,
    p_toAccount IN NUMBER,
    p_amount IN NUMBER
)
IS
    v_balance NUMBER;
BEGIN

    SELECT Balance
    INTO v_balance
    FROM Accounts
    WHERE AccountID = p_fromAccount;

    IF v_balance >= p_amount THEN

        UPDATE Accounts
        SET Balance = Balance - p_amount
        WHERE AccountID = p_fromAccount;

        UPDATE Accounts
        SET Balance = Balance + p_amount
        WHERE AccountID = p_toAccount;

        COMMIT;

        DBMS_OUTPUT.PUT_LINE('Transfer Successful');

    ELSE

        DBMS_OUTPUT.PUT_LINE('Insufficient Balance');

    END IF;

END;
/

SET SERVEROUTPUT ON;

BEGIN
    TransferFunds(101,104,2000);
END;
/

---------------------------------------------------------
-- Verify Scenario 3
---------------------------------------------------------

SELECT * FROM Accounts;