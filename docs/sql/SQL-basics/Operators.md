

- ---
id: sql-operators
title: SQL Operators
sidebar_label: SQL Operators
sidebar_position: 6
tags:
  - sql
  - operators
  - database
  - relational-databases
  - queries
  - sql tutorial
  - sql basics
  - database queries
  - relational databases
  - sql operators tutorial
  - sql for beginners
description: In this beginner-friendly tutorial, you will learn about SQL operators, which help you filter, compare, and manipulate data in your database queries effectively.
---

## 📙 Welcome to SQL Operators!

Hey there! Ready to make your SQL queries more powerful? Operators are like tools that help you compare, calculate, and filter data in your database. Think of them as the "action words" that tell SQL what to do with your data. Let's dive in with simple examples that anyone can follow!

## 📘 What Are SQL Operators?

SQL operators are symbols or keywords that help you:

* Compare values (like finding students older than 18)
* Perform calculations (like adding prices)
* Filter data (like finding names that start with 'A')
* Combine conditions (like students who are seniors AND have good grades)

Imagine you have a `students` table and want to find specific information. Operators make this super easy!

:::tip Pro Tip
Operators are the building blocks of powerful SQL queries. Master them, and you'll be querying like a pro!
:::

---

## ## Arithmetic Operators (Math Made Simple)

These operators help you do math with your data:

* `+`: Addition
* `-`: Subtraction
* `*`: Multiplication
* `/`: Division
* `%`: Modulo (remainder after division)

**Example:**

```sql
CREATE TABLE products (
    id INT,
    price DECIMAL(10, 2),
    quantity INT
);

INSERT INTO products VALUES (1, 15.99, 10), (2, 25.50, 5);

-- Calculate total value for each product  
SELECT id, price, quantity, 
       price * quantity AS total_value,
       price + 2.00 AS price_with_tax
FROM products;
