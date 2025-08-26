---
id: sql-operators
title: SQL Operators
sidebar_label: SQL Operators
sidebar_position: 6
tags: [sql, operators, database, relational-databases, queries]
description: In this beginner-friendly tutorial, you will learn about SQL operators, which help you filter, compare, and manipulate data in your database queries effectively.
keywords: [sql, operators, sql tutorial, sql basics, database queries, relational databases, sql operators tutorial, sql for beginners, sql in 2025]
---

## 📙 Welcome to SQL Operators!

Hey there! Ready to make your SQL queries more powerful? Operators are like tools that help you compare, calculate, and filter data in your database. Think of them as the "action words" that tell SQL what to do with your data. Let's dive in with simple examples that anyone can follow!

### 📘 What Are SQL Operators?

SQL operators are symbols or keywords that help you:
- Compare values (like finding students older than 18)
- Perform calculations (like adding prices)
- Filter data (like finding names that start with 'A')
- Combine conditions (like students who are seniors AND have good grades)

Imagine you have a `students` table and want to find specific information. Operators make this super easy!

:::tip Pro Tip
Operators are the building blocks of powerful SQL queries. Master them, and you'll be querying like a pro!
:::

### 📘 Arithmetic Operators (Math Made Simple)

These operators help you do math with your data:

- **+**: Addition
- **-**: Subtraction
- **\***: Multiplication
- **/**: Division
- **%**: Modulo (remainder after division)

**Example**:

```sql title="Using Arithmetic Operators"
CREATE TABLE products (
    id INT,
    price DECIMAL(10,2),
    quantity INT
);

INSERT INTO products VALUES (1, 15.99, 10), (2, 25.50, 5);

-- Calculate total value for each product  
SELECT id, price, quantity, 
       price * quantity AS total_value,
       price + 2.00 AS price_with_tax
FROM products;
```

**Output:**
| id | price | quantity | total_value | price_with_tax |
|----|-------|----------|-------------|----------------|
| 1  | 15.99 | 10       | 159.90      | 17.99          |
| 2  | 25.50 | 5        | 127.50      | 27.50          |

:::warning What NOT to Do
Don't divide by zero—it will cause an error! Always check your divisor values.
:::

### 🔍 Comparison Operators (Finding What You Need)

These operators help you compare values and find specific data:

- **=**: Equal to
- **!=** or **&lt;&gt;**: Not equal to
- **&gt;**: Greater than
- **&lt;**: Less than
- **&gt;=**: Greater than or equal to
- **&lt;=**: Less than or equal to

**Example**:

```sql title="Using Comparison Operators"
CREATE TABLE students (
    id INT,
    name VARCHAR(50),
    age INT,
    grade CHAR(1)
);

INSERT INTO students VALUES 
(1, 'Alice', 20, 'A'), 
(2, 'Bob', 18, 'B'), 
(3, 'Charlie', 22, 'A');

-- Find students older than 18
SELECT * FROM students WHERE age > 18;

-- Find students with grade A
SELECT * FROM students WHERE grade = 'A';
```

**Output:**

**Students older than 18:**
| id | name    | age | grade |
|----|---------|-----|-------|
| 1  | Alice   | 20  | A     |
| 3  | Charlie | 22  | A     |

**Students with grade A:**
| id | name    | age | grade |
|----|---------|-----|-------|
| 1  | Alice   | 20  | A     |
| 3  | Charlie | 22  | A     |

:::warning What NOT to Do
Don't use = for NULL values—use IS NULL or IS NOT NULL instead!
:::

### 🔄 Logical Operators (Combining Conditions)

These operators help you combine multiple conditions:

- **AND**: Both conditions must be true
- **OR**: At least one condition must be true
- **NOT**: Opposite of the condition
- **IN**: Value matches any in a list
- **BETWEEN**: Value is within a range

**Example**:

```sql title="Using Logical Operators"
-- Find students who are older than 18 AND have grade A
SELECT * FROM students 
WHERE age > 18 AND grade = 'A';

-- Find students who are either 18 OR 22 years old
SELECT * FROM students 
WHERE age = 18 OR age = 22;

-- Find students whose age is between 19 and 21
SELECT * FROM students 
WHERE age BETWEEN 19 AND 21;

-- Find students with grades A or B
SELECT * FROM students 
WHERE grade IN ('A', 'B');
```

**Output:**

**Age &gt; 18 AND grade = 'A':**
| id | name    | age | grade |
|----|---------|-----|-------|
| 1  | Alice   | 20  | A     |
| 3  | Charlie | 22  | A     |

**Age = 18 OR age = 22:**
| id | name    | age | grade |
|----|---------|-----|-------|
| 2  | Bob     | 18  | B     |
| 3  | Charlie | 22  | A     |

:::warning What NOT to Do
Don't forget parentheses when combining AND/OR—they control the order of operations!
:::

### 📘 Pattern Matching Operators (Finding Text Patterns)

These operators help you search for text patterns:

- **LIKE**: Pattern matching with wildcards
  - **%**: Matches any number of characters
  - **\_**: Matches exactly one character
- **REGEXP**: Regular expression matching (advanced)

**Example**:

```sql title="Using Pattern Matching"
CREATE TABLE employees (
    id INT,
    name VARCHAR(50),
    email VARCHAR(100)
);

INSERT INTO employees VALUES 
(1, 'Alice Johnson', 'alice@company.com'),
(2, 'Bob Smith', 'bob@gmail.com'),
(3, 'Charlie Brown', 'charlie@company.com');

-- Find names starting with 'A'
SELECT * FROM employees WHERE name LIKE 'A%';

-- Find company emails
SELECT * FROM employees WHERE email LIKE '%@company.com';

-- Find names with exactly 3 characters before 'ice'
SELECT * FROM employees WHERE name LIKE '___ice%';
```

**Output:**

**Names starting with 'A':**
| id | name          | email            |
|----|---------------|------------------|
| 1  | Alice Johnson | alice@company.com |

**Company emails:**
| id | name          | email             |
|----|---------------|-------------------|
| 1  | Alice Johnson | alice@company.com |
| 3  | Charlie Brown | charlie@company.com |

:::warning What NOT to Do
Don't forget the % wildcard—'A' is different from 'A%' (exact match vs. starts with)!
:::

### 🔄 NULL Operators (Handling Missing Data)

These operators help you work with NULL (missing) values:

- **IS NULL**: Checks if value is NULL
- **IS NOT NULL**: Checks if value is not NULL
- **COALESCE()**: Returns first non-NULL value

**Example**:

```sql title="Handling NULL Values"
CREATE TABLE customers (
    id INT,
    name VARCHAR(50),
    phone VARCHAR(20)
);

INSERT INTO customers VALUES 
(1, 'Alice', '123-456-7890'),
(2, 'Bob', NULL),
(3, 'Charlie', '987-654-3210');

-- Find customers without phone numbers
SELECT * FROM customers WHERE phone IS NULL;

-- Find customers with phone numbers
SELECT * FROM customers WHERE phone IS NOT NULL;

-- Replace NULL with default value
SELECT id, name, 
       COALESCE(phone, 'No Phone') AS contact
FROM customers;
```

**Output:**

**Customers without phone:**
| id | name | phone |
|----|------|-------|
| 2  | Bob  | NULL  |

**With default values:**
| id | name    | contact      |
|----|---------|--------------|
| 1  | Alice   | 123-456-7890 |
| 2  | Bob     | No Phone     |
| 3  | Charlie | 987-654-3210 |

:::warning What NOT to Do
Never use = or != with NULL—they won't work! Always use IS NULL or IS NOT NULL.
:::

### 🧹 Operator Precedence (Order Matters!)

Just like math, SQL operators have an order of priority:

1. **Parentheses** `()`
2. **Arithmetic** `*, /, %`
3. **Arithmetic** `+, -`
4. **Comparison** `=, !=, <, >, <=, >=`
5. **NOT**
6. **AND**
7. **OR**

**Example**:

```sql title="Operator Precedence Examples"
-- This might not work as expected
SELECT * FROM students 
WHERE age = 20 OR age = 22 AND grade = 'A';

-- Better: Use parentheses to be clear
SELECT * FROM students 
WHERE (age = 20 OR age = 22) AND grade = 'A';

-- Or this way
SELECT * FROM students 
WHERE age = 20 OR (age = 22 AND grade = 'A');
```

**Output:**
- **Without parentheses:** Might return unexpected results
- **With parentheses:** Clear logic and predictable results

:::warning What NOT to Do
Don't rely on operator precedence—use parentheses to make your intentions crystal clear!
:::

### 🎯 Practical Tips for Using Operators

1. **Start Simple**: Begin with basic comparisons, then add complexity
2. **Test Your Logic**: Use parentheses to group conditions clearly
3. **Handle NULLs**: Always consider how NULL values affect your queries
4. **Use Appropriate Types**: Don't compare strings with numbers without conversion
5. **Index Wisely**: Operators on indexed columns perform better

**Common Mistakes to Avoid**:
- Using `=` with NULL values
- Forgetting wildcards in LIKE patterns
- Not using parentheses with complex conditions
- Comparing different data types without conversion

## ✅ What You've Learned

Awesome work! You've mastered:
- **Arithmetic Operators**: +, -, \*, /, % for calculations
- **Comparison Operators**: =, !=, &gt;, &lt;, &gt;=, &lt;= for filtering
- **Logical Operators**: AND, OR, NOT, IN, BETWEEN for combining conditions
- **Pattern Matching**: LIKE with % and \_ wildcards
- **NULL Handling**: IS NULL, IS NOT NULL, COALESCE
- **Operator Precedence**: Using parentheses for clarity

Now you can write powerful queries that find exactly the data you need. Practice with different combinations and remember the "What NOT to Do" tips to avoid common pitfalls!

---