---
id: sql-having-vs-group-by
title: Difference Between HAVING and GROUP BY in SQL
sidebar_label: HAVING vs GROUP BY
sidebar_position: 4
tags: [sql, having, group-by, database, relational-databases]
description: In this super beginner-friendly guide, you’ll learn the key differences between SQL’s HAVING and GROUP BY clauses, how they work together, and when to use each for powerful data analysis!
keywords: [sql, having, group by, sql tutorial, sql basics, database management, sql for beginners, sql in 2025]
---

## 📙 Welcome to HAVING vs GROUP BY!

Hey there, SQL beginner! If you’ve ever wondered how to group data and filter those groups in SQL, you’ve likely come across **GROUP BY** and **HAVING**. These clauses are powerful tools for summarizing and filtering data, but they serve different purposes and are often confused. Using a simple `students` table (with columns `id`, `name`, `age`, `marks`, and `city`), we’ll break down their differences, show how they work together, provide a handy comparison table, and include clear examples to make you a pro. Let’s dive in!

### 📘 What Are GROUP BY and HAVING?

- **GROUP BY**: Organizes rows into groups based on one or more columns and is typically used with aggregate functions (e.g., `COUNT`, `AVG`, `SUM`) to summarize data within each group.
- **HAVING**: Filters the grouped results based on conditions involving aggregate functions, acting like a `WHERE` clause but for groups rather than individual rows.

Think of `GROUP BY` as sorting your data into buckets (e.g., grouping students by city), and `HAVING` as deciding which buckets to keep (e.g., only cities with an average mark above 80). They’re often used together in SQL queries, but they have distinct roles and rules.

> **Pro Tip**: Always write `GROUP BY` before `HAVING` in a query, as SQL processes `GROUP BY` first to create groups, then applies `HAVING` to filter them!

### 📘 Detailed Differences Between GROUP BY and HAVING

To understand when and how to use `GROUP BY` and `HAVING`, let’s explore their differences in detail, followed by a comparison table summarizing the key points.

#### 1. Purpose
- **GROUP BY**:
  - Groups rows with identical values in specified columns into summary rows.
  - Used to aggregate data (e.g., calculate averages, counts) within each group.
  - Example: Group students by `city` to find the average marks per city.
- **HAVING**:
  - Filters the groups created by `GROUP BY` based on conditions involving aggregate functions.
  - Acts like a gatekeeper, keeping only the groups that meet the condition.
  - Example: Keep only cities where the average marks are above 80.

#### 2. What They Operate On
- **GROUP BY**:
  - Operates on individual rows to organize them into groups.
  - Works with raw column values (e.g., `city`, `age`) to define groups.
  - Must be used with aggregate functions (e.g., `AVG`, `COUNT`) in the `SELECT` clause for meaningful results.
- **HAVING**:
  - Operates on the grouped results after `GROUP BY` is applied.
  - Works with aggregate functions (e.g., `AVG(marks)`, `COUNT(id)`) to filter groups.
  - Cannot reference non-aggregated columns unless they’re in the `GROUP BY` clause.

#### 3. Position in Query
- **GROUP BY**:
  - Appears after the `FROM` and `WHERE` clauses in a SQL query.
  - Precedes `HAVING` in both syntax and execution order.
  - Syntax order: `SELECT` → `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `ORDER BY` → `LIMIT`.
- **HAVING**:
  - Appears immediately after `GROUP BY` in a query.
  - Applied after groups are formed, filtering the aggregated results.
  - Cannot be used without `GROUP BY` in standard SQL, as it relies on grouped data.

#### 4. Conditions They Support
- **GROUP BY**:
  - Doesn’t support conditions directly; it defines how rows are grouped.
  - Example: `GROUP BY city` groups all rows by unique city values.
- **HAVING**:
  - Supports conditions using aggregate functions (e.g., `AVG(marks) > 80`).
  - Can also include non-aggregated columns if they’re part of the `GROUP BY` clause (e.g., `city = 'Mumbai'`).
  - Example: `HAVING AVG(marks) > 80` keeps groups with high average marks.

#### 5. Comparison with WHERE
- **GROUP BY**:
  - Works with `WHERE` to filter individual rows before grouping.
  - Example: Use `WHERE age > 18` to filter students before grouping by city.
- **HAVING**:
  - Acts like `WHERE` but for groups, applied after `GROUP BY`.
  - Cannot use with non-aggregated data unless grouped, unlike `WHERE`.
  - Example: Use `HAVING COUNT(id) > 2` to keep groups with more than two students.

#### 6. Execution Order
- **GROUP BY**:
  - Executed after `FROM` and `WHERE`, grouping rows based on specified columns.
  - Part of the query execution pipeline: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY` → `LIMIT`.
- **HAVING**:
  - Executed after `GROUP BY`, filtering the grouped results.
  - Only processes the aggregated data produced by `GROUP BY`.

#### 7. Use Cases
- **GROUP BY**:
  - Summarizing data (e.g., average marks per city).
  - Creating reports with aggregated metrics (e.g., total students per age group).
  - Preparing data for further filtering with `HAVING`.
- **HAVING**:
  - Filtering groups based on aggregates (e.g., cities with high average marks).
  - Refining reports to show only relevant groups (e.g., groups with more than one student).
  - Combining with `GROUP BY` for advanced analysis.

#### 8. As of 2025
- Modern DBMS (e.g., SQL Server 2025, PostgreSQL 17) optimize `GROUP BY` with parallel processing for large datasets.
- `HAVING` benefits from improved query planners, allowing complex aggregate conditions with better performance.
- Some DBMS (e.g., PostgreSQL) support advanced grouping extensions like `GROUPING SETS` that work with `HAVING` for multi-level summaries.

#### Comparison Table

Here’s a concise table summarizing the key differences between `GROUP BY` and `HAVING`:

| **Aspect**                | **GROUP BY**                                                                 | **HAVING**                                                                 |
|---------------------------|------------------------------------------------------------------------------|---------------------------------------------------------------------------|
| **Purpose**               | Groups rows with identical values in specified columns for summarization.     | Filters groups based on conditions involving aggregate functions.          |
| **Operates On**           | Individual rows, organizing them into groups based on column values.          | Grouped results after `GROUP BY`, using aggregate functions.               |
| **Query Position**        | After `FROM` and `WHERE`, before `HAVING`.                                    | After `GROUP BY`, before `ORDER BY`.                                      |
| **Conditions**            | Defines groups (e.g., `GROUP BY city`); no direct conditions.                 | Uses aggregate conditions (e.g., `HAVING AVG(marks) > 80`).                |
| **Relation to WHERE**     | Works with `WHERE` to filter rows before grouping.                            | Acts like `WHERE` for groups, applied after grouping.                      |
| **Execution Order**       | After `WHERE`, before `HAVING` in the query pipeline.                         | After `GROUP BY`, before `SELECT` in the query pipeline.                   |
| **Typical Use Cases**     | Summarize data (e.g., average marks by city).                                 | Filter groups (e.g., cities with average marks > 80).                      |
| **Dependencies**          | Can be used without `HAVING`.                                                | Requires `GROUP BY` in standard SQL.                                       |

### 📘 Examples to Illustrate Differences

Let’s use the `students` table to show how `GROUP BY` and `HAVING` work together and differ. Assume the table has the following data:

| id | name  | age | marks | city   |
|----|-------|-----|-------|--------|
| 1  | Alice | 20  | 85    | Mumbai |
| 2  | Bob   | 22  | 92    | Mumbai |
| 3  | Carol | 19  | 75    | Delhi  |
| 4  | Dave  | 20  | 88    | Mumbai |

**Examples**:
    :::info
<Tabs>
  <TabItem value="GROUP BY Alone" label="GROUP BY Alone">
```sql title="Using GROUP BY to Summarize Data"
SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY city;
```
  </TabItem>

  <TabItem value="GROUP BY Output" label="Output">
| city   | avg_marks |
|--------|-----------|
| Mumbai | 88.33     |
| Delhi  | 75.0      |
  </TabItem>

  <TabItem value="GROUP BY with HAVING" label="GROUP BY with HAVING">
```sql title="Using GROUP BY and HAVING to Filter Groups"
SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY city
HAVING AVG(marks) > 80;
```
  </TabItem>

  <TabItem value="HAVING Output" label="Output">
| city   | avg_marks |
|--------|-----------|
| Mumbai | 88.33     |
  </TabItem>

  <TabItem value="GROUP BY with WHERE and HAVING" label="WHERE and HAVING">
```sql title="Combining WHERE, GROUP BY, and HAVING"
SELECT city, COUNT(id) AS student_count
FROM students
WHERE age > 19
GROUP BY city
HAVING COUNT(id) >= 2;
```
  </TabItem>

  <TabItem value="WHERE and HAVING Output" label="Output">
| city   | student_count |
|--------|---------------|
| Mumbai | 2             |
  </TabItem>
</Tabs>
:::

**Explanation of Examples**:
- **GROUP BY Alone**: Groups students by `city` and calculates the average marks for each city. All cities appear in the result.
- **GROUP BY with HAVING**: Adds a `HAVING` clause to filter groups, keeping only cities where the average marks exceed 80 (only Mumbai qualifies).
- **WHERE and HAVING**: Uses `WHERE` to filter individual rows (age > 19) before grouping, then `GROUP BY` to group by city, and `HAVING` to keep only groups with at least two students.

### 📘 Key Rules and Best Practices

- **GROUP BY**:
  - Always list all non-aggregated columns in the `SELECT` clause in the `GROUP BY` clause (e.g., `SELECT city, AVG(marks)` requires `GROUP BY city`).
  - Use with aggregate functions like `COUNT`, `SUM`, `AVG`, `MAX`, `MIN`.
  - Can group by multiple columns (e.g., `GROUP BY city, age`).
- **HAVING**:
  - Only use aggregate functions or columns listed in `GROUP BY` in the condition.
  - Place after `GROUP BY` in the query.
  - Use for group-level filtering, not row-level (use `WHERE` for that).
- **Combining Them**:
  - Use `WHERE` to filter rows before grouping, `GROUP BY` to create groups, and `HAVING` to filter those groups.
  - Example: Filter students by age (`WHERE`), group by city (`GROUP BY`), then keep groups with high averages (`HAVING`).

> **What NOT to Do**: 
> - **GROUP BY**:
  - Don’t include non-aggregated columns in `SELECT` without adding them to `GROUP BY`—it causes errors in most DBMS (e.g., MySQL strict mode, PostgreSQL).
  - Don’t use `GROUP BY` without an aggregate function unless you want unique combinations (rare).
  - Don’t group by unnecessary columns—it increases query complexity and slows performance.
- **HAVING**:
  - Don’t use `HAVING` for row-level filtering—use `WHERE` instead to filter before grouping for better performance.
  - Don’t use column aliases in `HAVING` (e.g., `HAVING avg_marks > 80`)—use the aggregate function directly (e.g., `HAVING AVG(marks) > 80`).
  - Don’t place `HAVING` before `GROUP BY`—it’s a syntax error.
- **General**:
  - Don’t skip testing with small datasets; `GROUP BY` and `HAVING` can produce unexpected results with complex queries.
  - Don’t assume `HAVING` works without `GROUP BY`—it’s invalid in standard SQL.

### ✅ What You’ve Learned

You’re now a pro at understanding the differences between `GROUP BY` and `HAVING`! You’ve mastered:
- **GROUP BY**: Groups rows by columns for summarization, used with aggregates like `AVG` or `COUNT`.
- **HAVING**: Filters groups based on aggregate conditions, applied after `GROUP BY`.
- **Key Differences**: Purpose, what they operate on, query position, conditions, and more, as summarized in the comparison table.
- **Best Practices**: Use `WHERE` for row filtering, `GROUP BY` for grouping, and `HAVING` for group filtering in the correct order.

Practice these with the `students` table to create powerful summaries and reports. Follow the “What NOT to Do” tips to write efficient, error-free queries!