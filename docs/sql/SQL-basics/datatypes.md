


---
id: sql-datatypes
title: SQL Data Types
sidebar_label: SQL Data Types
sidebar_position: 5
tags:
  - sql
  - data-types
  - database
  - relational-databases
  - queries
  - sql tutorial
  - sql basics
  - database management
  - relational databases
  - sql data types tutorial
  - sql for beginners
description: In this beginner-friendly tutorial, you will learn about SQL data types, which define what kind of data can be stored in a column, making your database organized and efficient.
---

## 📙 Welcome to SQL Data Types!

Hey there! If you're new to SQL, data types are a fundamental concept. They are like labels that tell your database what kind of information (like numbers, text, or dates) can go into each column of a table. Think of them as rules to keep your data organized, efficient, and error-free!

## 📘 What Are Data Types?

Data types are super important because they:

* **Enforce Data Integrity:** Decide what kind of data you can store (e.g., numbers only or text only).
* **Optimize Storage:** Help save space in your database by allocating only what's needed.
* **Prevent Errors:** Stop you from putting letters in a number column or vice-versa.

Imagine a `students` table. Data types ensure the `student_id` is a number, `first_name` is text, and `enrollment_date` is a date.

Here’s a handy overview to get you started:


:::tip Pro Tip
Always pick the smallest, most appropriate data type for your data. For example, don’t use a text type for numbers you want to do math on!
:::

---

## ## Example: Building a `students` Table

Instead of looking at types one by one, let's create a single `students` table that uses all the most common data types. This is how you'd build a table in the real world!

**SQL Code:**

```sql
CREATE TABLE students (
    student_id INT UNSIGNED,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gpa DECIMAL(3, 2),
    enrollment_date DATE,
    is_active BOOLEAN,
    last_login TIMESTAMP
);

INSERT INTO students VALUES 
(1, 'Alice', 'Johnson', 3.75, '2023-08-14', TRUE, '2025-10-21 09:30:00'),
(2, 'Bob', 'Smith', 3.20, '2022-08-14', TRUE, '2025-10-20 15:00:00'),
(3, 'Charlie', 'Brown', 2.50, '2023-08-14', FALSE, NULL);

SELECT * FROM students;
Now, let's break down the types we used.
## Numeric Data Types (Numbers)
Numeric types are for numbers. We used INT, DECIMAL, and BOOLEAN (which stores 0 or 1).
TINYINT: A very small number (-128 to 127).
INT (or INTEGER): A standard whole number (approx. -2.1 billion to 2.1 billion). We used INT UNSIGNED for student_id. (More on UNSIGNED later!)
BIGINT: For huge whole numbers (up to 9 quintillion!).
DECIMAL(p, s): A fixed-point number, perfect for precision. DECIMAL(3, 2) (used for gpa) means 3 total digits, with 2 after the decimal (e.g., 9.99).
FLOAT / DOUBLE: "Floating-point" numbers, for scientific calculations where tiny rounding errors are acceptable.
:::warning What NOT to Do
Don't use FLOAT or DOUBLE for money or any value that must be exact (like GPA). They can cause small rounding errors. Always use DECIMAL for currency and other precise values.
:::
🔄 String Data Types (Text)
String types are for text. We used VARCHAR.
CHAR(length): Fixed length. CHAR(10) always uses 10 characters of space, even if you only store "Hi". It pads the rest with spaces. Good for data of a consistent length (e.g., state codes like 'NY', 'CA').
VARCHAR(length): Variable length. VARCHAR(50) (used for first_name) stores only the characters you insert, up to a max of 50. This is efficient and the most common choice for text.
TEXT: For long-form text, like blog posts or descriptions (up to 65,535 characters).
BLOB: For binary data like images or files.
:::warning What NOT to Do
Avoid using CHAR for text that varies in length (like names or email addresses)—it wastes space. Use VARCHAR instead!
:::
## Date and Time Data Types
These types are specifically for storing dates and times.
DATE: Stores a date (Year, Month, Day). We used this for enrollment_date.
Format: YYYY-MM-DD (e.g., 2025-08-14)
TIME: Stores a time (Hours, Minutes, Seconds).
Format: HH:MM:SS (e.g., 14:30:00)
DATETIME: Stores both date and time.
Format: YYYY-MM-DD HH:MM:SS
TIMESTAMP: Also stores date and time. It's special because it's often used to track when a row was last changed and can auto-update. We used this for last_login.
:::warning What NOT to Do
Don't store dates as VARCHAR (e.g., '08-14-2025')! Using proper DATE or DATETIME types allows you to perform calculations, like finding all students who enrolled in the last 30 days.
:::
🔄 Other Data Types (Special Cases)
BOOLEAN (or BOOL): Stores TRUE (1) or FALSE (0). We used this for is_active.
ENUM: Lets you define a list of allowed values (e.g., ENUM('Small', 'Medium', 'Large')).
BIT(x): Stores a specific number of bits (e.g., BIT(1) is similar to BOOLEAN).
🧹 Signed vs. Unsigned (Positive or Negative?)
For numeric types like INT, you have a choice:
SIGNED (Default): Allows both positive and negative numbers. An INT ranges from approx. -2.1 billion to +2.1 billion.
UNSIGNED: Allows only positive numbers (and zero). This shifts the range. An INT UNSIGNED ranges from 0 to approx. +4.2 billion.
In our students table, we used INT UNSIGNED for student_id. This is perfect because a student ID will never be negative, and it effectively doubles our available positive IDs!
:::tip Pro Tip
Use UNSIGNED for any number column that can never be negative (like an ID, age, or stock quantity).
:::
✅ What You've Learned
Great job! You’ve explored the most important SQL data types:
Numeric Types: INT, DECIMAL (for precision), and FLOAT.
String Types: CHAR (fixed) vs. VARCHAR (variable).
Date/Time Types: DATE, DATETIME, and TIMESTAMP.
Other Types: BOOLEAN for true/false values.
SIGNED vs. UNSIGNED: How to optimize your number ranges.
You've also seen how to build a single, logical table using a mix of these types. This is the foundation for building any good database!