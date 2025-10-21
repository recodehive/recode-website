---
id: sql-constraints
title: SQL Constraints
sidebar_label: SQL Constraints
sidebar_position: 6
tags: [sql, constraints, database, relational-databases]
description: In this super beginner-friendly guide, you’ll learn about SQL constraints—rules that keep your database data safe, accurate, and organized!
keywords: [sql, constraints, sql tutorial, sql basics, database management, relational databases, sql constraints tutorial, sql for beginners, sql in 2025]
---

## 📙 Welcome to SQL Constraints!

Hey there, new SQL learner! Imagine organizing a big toy box and making sure no toy gets lost or mixed up. Constraints are like special rules you set for your database tables to keep everything in order. They help stop mistakes, like adding a negative age or leaving a name blank. We’ll use a `students` table (with columns like `id`, `name`, and `age`) to show you how it works, step by step!

### 📘 What Are Constraints?

Constraints are like guardrails for your data. They are rules you add to columns in a table to:
- Prevent invalid data (e.g., no negative ages like -5).
- Make sure some data is unique (e.g., no two students with the same ID).
- Keep everything consistent across your database.

There are several types of constraints, like NOT NULL, UNIQUE, CHECK, and DEFAULT. Let’s explore each type with simple examples!

> 💡 **Pro Tip**: Add constraints when creating tables to catch mistakes early—like setting the rules before the game begins!

### 📘 NOT NULL Constraint (No Empty Spots!)

This rule makes sure a column always has a value—it can’t be empty (NULL). It’s perfect for things like names or IDs that you always need.

**How It Works**: If you mark a column as NOT NULL, you must fill it in when adding a new row. If you don’t, SQL will say, “Oops, you forgot something!”

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Creating Table with NOT NULL"
CREATE TABLE students (
    id INT,
    name VARCHAR(50) NOT NULL, -- Name must have a value
    age INT
);
INSERT INTO students (id, name, age) VALUES (1, 'Alice', 20); -- This works!
-- This will fail: INSERT INTO students (id, age) VALUES (2, 21); -- No name!
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | name  | age |
|----|-------|-----|
| 1  | Alice | 20  |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Always use NOT NULL for critical fields like names or IDs—leaving them blank can mess up your records and make it data harder to track.

### 🔄 UNIQUE Constraint (No Doubles Allowed!)

This rule ensures that every value in a column is different—no duplicates. It’s great for things like email addresses or student IDs.

**How It Works**: If you try to add the same value twice (e.g., two students with the same email), SQL will stop you and say, “Hey, that’s already taken!”

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Creating Table with UNIQUE"
CREATE TABLE students (
    id INT,
    email VARCHAR(50) UNIQUE -- No two students can have the same email
);
INSERT INTO students (id, email) VALUES (1, 'alice@example.com'); -- Works!
-- This will fail: INSERT INTO students (id, email) VALUES (2, 'alice@example.com'); -- Duplicate!
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | email              |
|----|--------------------|
| 1  | alice@example.com  |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Avoid using UNIQUE on columns that might repeat naturally, like ages (e.g., two 20-year-olds)—it’ll block valid data and cause errors!

### 📘 CHECK Constraint (Set Your Own Rules!)

This lets you create a custom rule for a column, like saying “age must be 18 or older.” It’s like setting a limit on what’s allowed.

**How It Works**: You write a condition, and SQL checks it every time you add or change data. If the data doesn’t match, it won’t let you save it.

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Creating Table with CHECK"
CREATE TABLE students (
    id INT,
    age INT CHECK (age >= 18) -- Only ages 18 or higher are allowed
);
INSERT INTO students (id, age) VALUES (1, 20); -- Works!
-- This will fail: INSERT INTO students (id, age) VALUES (2, 16); -- Too young!
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | age |
|----|-----|
| 1  | 20  |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Avoid overly strict CHECK rules too (e.g., age > 100)—you might block valid data and frustrate yourself!

### 🔄 DEFAULT Constraint (Auto-Fill Magic!)

This sets a default value for a column if you don’t provide one. It’s handy for things like setting a default city.

**How It Works**: If you leave a column blank, SQL fills it with the default value you chose, saving you time.

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Creating Table with DEFAULT"
CREATE TABLE students (
    id INT,
    city VARCHAR(50) DEFAULT 'Unknown' -- If no city is given, it’s 'Unknown'
);
INSERT INTO students (id) VALUES (1); -- No city provided, uses default
INSERT INTO students (id, city) VALUES (2, 'Delhi'); -- Overrides default
```
  </TabItem>

  <TabItem value="Output" label="Output">
| id | city    |
|----|---------|
| 1  | Unknown |
| 2  | Delhi   |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Avoid setting a silly default (e.g., age = 0)—it could lead to confusing or wrong data later!

## ✅ What You’ve Learned

Wow, you’re doing great! You’ve learned:
- **NOT NULL**: Keeps columns from being empty.
- **UNIQUE**: Stops duplicates.
- **CHECK**: Sets custom limits.
- **DEFAULT**: Adds automatic values.

Try adding these constraints to your own tables and play around with them. Watch out for the "What NOT to Do" tips to keep your database happy and error-free!

---