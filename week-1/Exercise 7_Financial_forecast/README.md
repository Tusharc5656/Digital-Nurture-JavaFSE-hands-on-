# Exercise 7: Financial Forecasting

## Scenario
You are developing a financial forecasting tool that predicts future values based on past data.

---

## 1. Understand Recursive Algorithms

### What is Recursion?

Recursion is a programming technique in which a function calls itself to solve a smaller version of the same problem. A recursive function contains:

- Base Case: The condition that stops the recursion.
- Recursive Case: The part where the function calls itself.

Recursion simplifies problems that can be broken down into smaller, similar subproblems.

### How Recursion Helps

Recursion makes the code easier to understand for problems involving repeated calculations, such as financial forecasting, tree traversal, factorial calculation, and Fibonacci series.

---

## 2. Setup

To predict future values, we use:

Future Value = Present Value × (1 + Growth Rate)^Years

Recursive Relation:

FV(n) = FV(n-1) × (1 + Growth Rate)

Base Case:

FV(0) = Present Value

Where:

- FV = Future Value
- Present Value = Current Investment Amount
- Growth Rate = Annual Growth Rate
- n = Number of Years

---

## 3. Implementation

The program uses a recursive method named `predictFutureValue()`.

Algorithm:

1. Accept current value, growth rate, and number of years.
2. If years equals 0, return the current value.
3. Otherwise, recursively calculate the value for the previous year.
4. Multiply the result by (1 + growth rate).
5. Return the final future value.

### Java Code

```java
public class FinancialForecast {

    public static double predictFutureValue(double currentValue,
                                            double growthRate,
                                            int years) {

        if (years == 0) {
            return currentValue;
        }

        return predictFutureValue(currentValue,
                                  growthRate,
                                  years - 1) * (1 + growthRate);
    }

    public static void main(String[] args) {

        double currentValue = 10000;
        double growthRate = 0.10;
        int years = 5;

        double futureValue = predictFutureValue(currentValue,
                                                growthRate,
                                                years);

        System.out.println("Future Value after "
                + years + " years = ₹" + futureValue);
    }
}
```

---

## 4. Analysis

### Time Complexity

The recursive function makes one recursive call for each year.

Recurrence Relation:

T(n) = T(n - 1) + O(1)

Therefore:

Time Complexity = O(n)

where n is the number of years.

### Space Complexity

Each recursive call is stored in the call stack.

Space Complexity = O(n)

---

## 5. Optimization

The recursive solution can be optimized to avoid excessive computation and memory usage.

### Iterative Approach

Instead of recursion, a loop can be used.

Advantages:

- Eliminates recursive call overhead.
- Uses constant memory.

Complexities:

- Time Complexity: O(n)
- Space Complexity: O(1)

### Mathematical Formula Approach

Using Java's Math.pow() function:

futureValue = currentValue * Math.pow(1 + growthRate, years);

Advantages:

- Faster execution.
- No recursion stack required.
- More efficient for large values of n.

Complexities:

- Time Complexity: Approximately O(log n)
- Space Complexity: O(1)

---

## Sample Input

Current Value = 10000

Growth Rate = 10%

Years = 5

---

## Sample Output

Future Value after 5 years = ₹16105.1

---

## Conclusion

This exercise demonstrates how recursion can be used to solve financial forecasting problems. Although recursion provides a simple and elegant solution, iterative and mathematical approaches are more efficient for large datasets because they require less memory and computation time.
