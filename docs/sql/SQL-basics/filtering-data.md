---
id: filtering-data
title: SQL Filtering Data
sidebar_label: SQL Filtering Data
sidebar_position: 3
tags: [html, web-development, attributes, values, SQL]
description: This document is a tutorial on SQL data filtering techniques, designed for beginners learning database querying. It covers the fundamental concepts and practical applications of retrieving specific data from database tables.
keywords:  [sql filtering, sql where clause, sql distinct, sql select statement, sql tutorial, sql basics, sql data filtering, sql query tutorial, sql database filtering, sql conditional queries, sql duplicate removal, sql unique values, sql filtering examples, sql beginner tutorial, sql data retrieval, sql filtering techniques, sql where examples, sql distinct tutorial, sql filtering rows, sql column selection, sql 2024]
---

## 📙 Selecting Data

Welcome to the **Selecting Data** module! This foundational learning path is designed to help you master the basics of querying data, particularly focusing on how to retrieve specific information from databases effectively.

### 📘 Using Conditions with the WHERE Clause

In this tutorial, you'll learn how to interpret and use rows in a database table. Tables are essential to storing structured data, and each **row** in a table represents a unique **item or record**.
> The first step in filtering is selecting the items.
> We use **WHERE** keyword to filter the data by applying conditions. 
> We filter the table items, we select to get only items that satisfy certain conditions.
> The condition we want our items to fulfill comes after the where keyword


For example, consider a table named `Students`. Below is how a simple table might look:



:::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Select command with a condition"
  SELECT *		
  FROM Students	
  WHERE major = 'Biology';
   ```

  </TabItem>
    
  <TabItem value="Students" label="Output ">
| name      | year | major   |
|-----------|------|---------|
| Ava Smith | 1    | Biology |
| Lin Wong  | 3    | Biology |
    </TabItem>
</Tabs>
:::




### 📘 Practice Example

> To query data from a table, use the FROM clause followed by the table&apos;s name and then the WHERE clause to specify the conditions for the data you want to retrieve.


For example, consider a table named `Students`. Below is how a simple table might look:



:::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name | email             | type  |
|------|-------------------|-------|
| Sam  | sam17@mail.com    | free  |
| Re my | rem@mail.com     | pro   |
| Luis | luis.99@mail.com  | basic |
| Kim  | kimz@mail.com     | pro   |
```
  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">
  
```sql title="Data from the table where type is pro"
SELECT *
FROM Students
WHERE type = 'pro';
```
  </TabItem>
    
  <TabItem value="Students table" label="Output">
| name  | email         | type |
|-------|---------------|------|
| Re my | rem@mail.com  | pro  |
| Kim   | kimz@mail.com | pro  |
  </TabItem>
</Tabs>
:::



:::tip
When requesting data with SQL statements like SELECT, we say that we are making a query.
From helps in selecting columns from the table we are working on.
While not necessary but it&apos;s a good practice to finish the sql queries with ";" 
:::

### 🔄 Checking Equality

  > We use the = operator to check if the two values are equal.

  > The values like text values are written between single quotes. 

  > We can also use numeric values, we don&apos;t need to put them in the quotes. 

  > the = sign check if the two values are equal. 

:::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">
  
```sql title="Selecting data WHERE major = Biology"
SELECT *
FROM Students
WHERE major = 'Biology';
```
  </TabItem>
    
  <TabItem value="Students table" label="Output">
| name      | year | major   |
| --------- | ---- | ------- |
| Ava Smith | 1    | Biology |
| Lin Wong  | 3    | Biology |

  </TabItem>
</Tabs>
:::

### 🧹 Selecting Unique Values with DISTINCT

DISTINCT removes duplicate rows from the result set, returning only unique values or combinations.

> In the table below, duplicate rows (if any student appears multiple times with identical name, year, and major) will be removed.

---

:::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
| Ava Smith   | 1    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Selecting unique values."
SELECT DISTINCT name, year, major 
FROM Students;
  ```

  </TabItem>
    
  <TabItem value="Students table" label="Output">
| name        | year | major   |
| ----------- | ---- | ------- |
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
  </TabItem>
</Tabs>

:::

### 🧹 Filtering columns

When using conditions we don&apos;t have to select all columns with *, we can select only a couple like name and year. 
> We don&apos;t have to select all columns when filtering. 

---

:::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Selecting name and year columns."
SELECT name, year
FROM Students;
  ```

  </TabItem>
    
  <TabItem value="Table with selected columns" label="Output">
| name        | year |
| ----------- | ---- |
| Ava Smith   | 1    |
| Luis Garcia | 1    |
| Lin Wong    | 3    |

  </TabItem>
</Tabs>


:::


## ✅ What You have Learnt

This module covers four essential topics in data selection:

- **Rows and Columns**  
>  Learn how to access specific rows and columns in a dataset or table, the building blocks of any query.
>  We selected specific rows using conditions and columns using the SELECT statement.


- **Select Data**  
>  Understand the basic `SELECT` statement to retrieve data from a database.

- **Select Multiple Columns**  
>  Retrieve more than one column at a time in your queries to get the information you need all at once.

- **Select Distinct Values**  
>  Use `DISTINCT` to eliminate duplicate records and identify unique entries within your dataset.

---