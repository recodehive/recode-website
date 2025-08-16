---
id: sql-operators
title: SQL Operators
sidebar_label: SQL Operators
sidebar_position: 8
tags: [sql, operators, database, relational-databases]
description: In this super beginner-friendly guide, you’ll learn about SQL operators—the tools that help you do math, compare things, and make decisions in your queries!
keywords: [sql, operators, sql tutorial, sql basics, database management, relational databases, sql operators tutorial, sql for beginners, sql in 2025]
---

## 📙 Welcome to SQL Operators!

Hey there, SQL beginner! Operators are like magic symbols in SQL that let you add numbers, compare values, or combine conditions. Think of them as the plus (+) or equals (=) signs you use in math, but for databases. They’re super useful in queries, especially in WHERE clauses to filter data. We’ll use a simple `students` table (with columns like `id`, `name`, `age`, `marks`, and `city`) to explain everything with easy examples. Let’s dive in step by step!

### 📘 What Are Operators?

Operators are symbols or keywords that perform operations on data. They help you:
- Do calculations (arithmetic operators).
- Compare values (comparison operators).
- Combine conditions (logical operators).
- Check for patterns or ranges (special operators like LIKE or BETWEEN).

You’ll often use them in SELECT statements to filter or calculate results.

> **Pro Tip**: Operators make your queries smarter—practice them to find exactly the data you need!

### 📘 Arithmetic Operators (Math in SQL!)

These operators let you add, subtract, multiply, divide, or find remainders. They’re great for calculating things like total marks.

The main ones:
- **+** (Addition): Adds numbers.
- **-** (Subtraction): Subtracts numbers.
- *** (Multiplication): Multiplies numbers.
- **/** (Division): Divides numbers.
- **%** (Modulus): Gives the remainder.

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Using Arithmetic Operators"
-- Assume students table has marks column
SELECT id, name, marks + 10 AS bonus_marks -- Add 10 to marks
FROM students
WHERE marks > 80;
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | name  | bonus_marks |
|----|-------|-------------|
| 1  | Alice | 95          |
| 2  | Bob   | 102         |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Don’t divide by zero (e.g., marks / 0)—it’ll cause an error. Always check for zero first!

### 🔄 Comparison Operators (Checking If Things Match!)

These help you compare values, like finding students older than 18. They’re used in WHERE to filter rows.

The main ones:
- **=** (Equal): Checks if equal.
- **!=** or **<>** (Not Equal): Checks if not equal.
- **>** (Greater Than): Bigger than.
- **<** (Less Than): Smaller than.
- **>=** (Greater Than or Equal): Bigger or same.
- **<=** (Less Than or Equal): Smaller or same.

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Using Comparison Operators"
SELECT id, name, age
FROM students
WHERE age >= 18 AND marks > 80; -- Adults with high marks
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | name  | age |
|----|-------|-----|
| 1  | Alice | 20  |
| 2  | Bob   | 22  |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Don’t use = for strings without quotes (e.g., WHERE city = Delhi)—always quote text like 'Delhi' to avoid errors!

### 📘 Logical Operators (Combining Conditions!)

These let you mix multiple conditions, like finding students who are young OR high-scorers.

The main ones:
- **AND**: Both conditions must be true.
- **OR**: At least one condition is true.
- **NOT**: Reverses a condition (true becomes false).

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Using Logical Operators"
SELECT id, name, marks
FROM students
WHERE (marks > 90 OR age < 18) AND NOT city = 'Delhi'; -- High marks or young, not from Delhi
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | name  | marks |
|----|-------|-------|
| 3  | Carol | 95    |
| 4  | Dave  | 45    |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Don’t overuse AND/OR without parentheses (e.g., A AND B OR C)—it can confuse the order. Use (A AND B) OR C to be clear!

### 🔄 Special Operators (Fancy Filters!)

These are extra helpful for patterns or ranges:
- **BETWEEN**: Checks a range (e.g., marks BETWEEN 70 AND 90).
- **IN**: Checks against a list (e.g., city IN ('Delhi', 'Mumbai')).
- **LIKE**: Pattern matching (e.g., name LIKE 'A%' for names starting with A).
- **IS NULL / IS NOT NULL**: Checks for empty values.

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Using Special Operators"
SELECT id, name, city
FROM students
WHERE marks BETWEEN 80 AND 90 AND name LIKE 'A%'; -- Marks 80-90, name starts with A
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | name  | city  |
|----|-------|-------|
| 1  | Alice | Mumbai|
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Don’t use LIKE without % or _ wildcards (e.g., name LIKE 'Alice')—it’s the same as = and less efficient for patterns!

## ✅ What You’ve Learned

You’re a SQL operator pro now! You’ve explored:
- **Arithmetic Operators**: +, -, *, /, % for calculations.
- **Comparison Operators**: =, !=, >, etc., for checks.
- **Logical Operators**: AND, OR, NOT for combining.
- **Special Operators**: BETWEEN, IN, LIKE, IS NULL for advanced filters.

Practice by writing queries with these operators on a sample table. Avoid the "What NOT to Do" tips to keep your queries error-free and fast!

---