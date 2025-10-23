---
id: sql-advanced-analytics
title: Advanced Analytical & BI Features in SQL
sidebar_label: Advanced Analytics
sidebar_position: 13
tags: [sql, analytics, business-intelligence, database, relational-databases]
description: In this super beginner-friendly guide, you’ll learn about advanced SQL analytical and BI features—powerful tools for summarizing, transforming, and analyzing data like a pro!
keywords: [sql, analytics, GROUPING SETS, CUBE, ROLLUP, pivot, unpivot, percentiles, ranking, moving averages, sql tutorial, sql for beginners, sql in 2025]
---



## 📙 Welcome to Advanced Analytical & BI Features!

Hey there, SQL beginner! Ready to level up? Advanced analytical and Business Intelligence (BI) features in SQL let you summarize, transform, and analyze data in powerful ways, like generating reports or finding trends. Think of these as your data superhero tools for slicing and dicing information. We’ll use a simple `students` table (with columns like `id`, `name`, `age`, `marks`, and `city`) to explain everything with clear examples. Let’s dive in step by step!

### 📘 What Are Advanced Analytical & BI Features?

These are specialized SQL features for complex data analysis and reporting:
- **GROUPING SETS, CUBE, ROLLUP**: Advanced grouping for summarizing data at multiple levels.
- **Pivot & Unpivot Queries**: Transform rows to columns (and vice versa) for better reporting.
- **Percentile, Ranking, Moving Averages**: Analytical functions for ranking data, finding percentiles, or calculating trends.

> **Pro Tip**: These features are perfect for BI tools and reports, but test them on small datasets first to understand their output!

### 📘 GROUPING SETS, CUBE, ROLLUP (Advanced Grouping!)

These features extend GROUP BY to create multiple summary levels in a single query, ideal for reports with subtotals and grand totals.

**Key Concepts**:
- **GROUPING SETS**: Lets you specify multiple group-by combinations explicitly.
- **ROLLUP**: Creates hierarchical subtotals (e.g., by city, then overall).
- **CUBE**: Creates all possible group-by combinations for the specified columns.

**Examples**:
    :::info
<Tabs>
  <TabItem value="GROUPING SETS" label="GROUPING SETS">
```sql title="Using GROUPING SETS"
SELECT city, AVG(marks) AS avg_marks
FROM students
GROUP BY GROUPING SETS (city, ()); -- Groups by city and grand total
```
  </TabItem>

  <TabItem value="GROUPING SETS Output" label="Output">
| city   | avg_marks |
|--------|-----------|
| Mumbai | 88.5      |
| Delhi  | 75.0      |
| NULL   | 84.0      | -- Grand total
  </TabItem>

  <TabItem value="ROLLUP" label="ROLLUP">
```sql title="Using ROLLUP"
SELECT city, age, AVG(marks) AS avg_marks
FROM students
GROUP BY ROLLUP (city, age); -- Subtotals for city, then city+age, then grand total
```
  </TabItem>

  <TabItem value="ROLLUP Output" label="Output">
| city   | age  | avg_marks |
|--------|------|-----------|
| Mumbai | 20   | 85.0      |
| Mumbai | 22   | 92.0      |
| Mumbai | NULL | 88.5      | -- Subtotal for Mumbai
| Delhi  | 19   | 75.0      |
| Delhi  | NULL | 75.0      | -- Subtotal for Delhi
| NULL   | NULL | 84.0      | -- Grand total
  </TabItem>

  <TabItem value="CUBE" label="CUBE">
```sql title="Using CUBE"
SELECT city, age, AVG(marks) AS avg_marks
FROM students
GROUP BY CUBE (city, age); -- All combinations: city, age, city+age, grand total
```
  </TabItem>

  <TabItem value="CUBE Output" label="Output">
| city   | age  | avg_marks |
|--------|------|-----------|
| Mumbai | 20   | 85.0      |
| Mumbai | 22   | 92.0      |
| Delhi  | 19   | 75.0      |
| Mumbai | NULL | 88.5      | -- Subtotal by city
| Delhi  | NULL | 75.0      |
| NULL   | 20   | 85.0      | -- Subtotal by age
| NULL   | 22   | 92.0      |
| NULL   | 19   | 75.0      |
| NULL   | NULL | 84.0      | -- Grand total
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: 
> - Don’t use CUBE with too many columns—it generates many combinations and can slow queries!
> - Don’t confuse ROLLUP (hierarchical) with CUBE (all combinations); choose based on your reporting needs.

### 🔄 Pivot & Unpivot Queries (Transforming Data Layout!)

**PIVOT** transforms rows into columns (e.g., turning cities into column headers), and **UNPIVOT** does the reverse, turning columns into rows. These are great for creating readable reports or normalizing data.

**Key Concepts**:
- **PIVOT**: Aggregates data and pivots a column’s values into new columns.
- **UNPIVOT**: Converts columns back into rows, useful for reversing pivoted data.

**Examples**:
    :::info
<Tabs>
  <TabItem value="PIVOT" label="PIVOT">
```sql title="Using PIVOT"
SELECT *
FROM (
    SELECT city, marks
    FROM students
) AS SourceTable
PIVOT (
    AVG(marks)
    FOR city IN ('Mumbai', 'Delhi')
) AS PivotTable;
```
  </TabItem>

  <TabItem value="PIVOT Output" label="Output">
| Mumbai | Delhi |
|--------|-------|
| 88.5   | 75.0  |
  </TabItem>

  <TabItem value="UNPIVOT" label="UNPIVOT">
```sql title="Using UNPIVOT"
SELECT city, avg_marks
FROM (
    SELECT 'Mumbai' AS Mumbai, 'Delhi' AS Delhi
    FROM (SELECT 88.5 AS Mumbai, 75.0 AS Delhi) AS PivotTable
) AS SourceTable
UNPIVOT (
    avg_marks FOR city IN (Mumbai, Delhi)
) AS UnpivotTable;
```
  </TabItem>

  <TabItem value="UNPIVOT Output" label="Output">
| city   | avg_marks |
|--------|-----------|
| Mumbai | 88.5      |
| Delhi  | 75.0      |
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: 
> - Don’t use PIVOT without an aggregate function (e.g., AVG)—it requires one!
> - Don’t UNPIVOT columns with mismatched data types—it’ll cause errors.

### 📘 Percentile, Ranking, Moving Averages (Analytical Functions!)

These **window functions** analyze data without grouping rows, perfect for ranking students, finding percentiles, or calculating trends like moving averages.

**Key Functions**:
- **Percentile**: E.g., `PERCENTILE_CONT` or `PERCENTILE_DISC` for finding median or other percentiles.
- **Ranking**: E.g., `RANK`, `DENSE_RANK`, `ROW_NUMBER` for ordering rows.
- **Moving Averages**: E.g., `AVG` with a window for trends over rows.

**Examples**:
    :::info
<Tabs>
  <TabItem value="Percentile" label="Percentile">
```sql title="Using PERCENTILE_CONT"
SELECT name, marks,
       PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY marks) OVER () AS median_marks
FROM students;
```
  </TabItem>

  <TabItem value="Percentile Output" label="Output">
| name  | marks | median_marks |
|-------|-------|--------------|
| Alice | 85    | 85.0         |
| Bob   | 92    | 85.0         |
| Carol | 75    | 85.0         |
  </TabItem>

  <TabItem value="Ranking" label="Ranking">
```sql title="Using RANK and DENSE_RANK"
SELECT name, marks,
       RANK() OVER (ORDER BY marks DESC) AS rank,
       DENSE_RANK() OVER (ORDER BY marks DESC) AS dense_rank
FROM students;
```
  </TabItem>

  <TabItem value="Ranking Output" label="Output">
| name  | marks | rank | dense_rank |
|-------|-------|------|------------|
| Bob   | 92    | 1    | 1          |
| Alice | 85    | 2    | 2          |
| Carol | 75    | 3    | 3          |
  </TabItem>

  <TabItem value="Moving Average" label="Moving Average">
```sql title="Using Moving Average"
SELECT name, marks,
       AVG(marks) OVER (ORDER BY id ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS moving_avg
FROM students;
```
  </TabItem>

  <TabItem value="Moving Average Output" label="Output">
| name  | marks | moving_avg |
|-------|-------|------------|
| Alice | 85    | 88.5       | -- Avg of Alice, Bob
| Bob   | 92    | 84.0       | -- Avg of Alice, Bob, Carol
| Carol | 75    | 83.5       | -- Avg of Bob, Carol
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: 
> - Don’t use window functions without understanding the `OVER` clause—it defines the window!
> - Don’t assume all DBMS support `PERCENTILE_CONT` (e.g., MySQL doesn’t)—check your database’s documentation.

## ✅ What You’ve Learned

You’re now a pro at SQL advanced analytical and BI features! You’ve mastered:
- **GROUPING SETS, CUBE, ROLLUP**: Summarizing data at multiple levels.
- **Pivot & Unpivot**: Transforming rows to columns and back for reports.
- **Percentiles, Ranking, Moving Averages**: Analyzing data with window functions.

Practice these with the `students` table to create powerful reports and analyses. Follow the “What NOT to Do” tips to keep your queries efficient and error-free!