---
id: filtering-data
title: SQL Filtering Data
sidebar_label: SQL Filtering Data
sidebar_position: 3
tags: [html, web-development, attributes, values]
description:
  In this tutorial, you will learn about HTML attributes and values. HTML attributes provide
  additional information about elements, and values define the specific settings or properties of
  the attributes.
keywords:
  [
    html,
    web development,
    attributes,
    values,
    html attributes,
    html values,
    html tutorial,
    html basics,
    web design,
    web pages,
    websites,
    html structure,
    html attributes tutorial,
    html values tutorial,
    html in 2024,
  ]
---

## 📙 Using Conditions

Welcome to the **Selecting Data** module! This foundational learning path is designed to help you
master the basics of querying data, particularly focusing on how to retrieve specific information
from databases effectively.

### 📘 Using Coditions

In this tutorial, you'll learn how to interpret and use rows in a database table. Tables are
essential to storing structured data, and each **row** in a table represents a unique **item or
record**.

> The first step in filtering is selecting the Items We use WHERE keyword to filter the data., we
> also apply the condition over there. We filter the table items we slect to get only items that
> satisy certain conditions. The condition we want our items to fulfil comes after the where keyword

For example, consider a table named `Friends`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables & db. "
SELECT *		
FROM students	
WHERE major = 'Biology';

    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output ">

| name      | year | major   |
| --------- | ---- | ------- |
| Ava Smith | 1    | Biology |
| Lin Wong  | 3    | Biology |

    </TabItem>

</Tabs>

### 📘 Practise Example

> To query data from a table, use the FROM clause followed by the table's name.

For example, consider a table named `Friends`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"
| name | email             | type  |
|------|-------------------|-------|
| Sam  | sam17@mail.com    | free  |
| Re my | rem@mail.com     | pro   |
| Luis | luis.99@mail.com  | basic |
| Kim  | kimz@mail.com     | pro   |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM friends
WHERE type = 'pro';
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name  | email         | type |
| ----- | ------------- | ---- |
| Re my | rem@mail.com  | pro  |
| Kim   | kimz@mail.com | pro  |

    </TabItem>

</Tabs>

:::

:::tip When requesting data with SQL staments like SELECT, we say that we are making a query. From
helps in select the name col from While not necessary but its a good practice to finish the sql
queries with;

By following these best practices, :::

### 🔄 Checking Equality

> We use the = operator to check if the two values are equal.

> The values like text values are writtern between single quotes.

> We can also use the numeric properties , it dont need to put in the quotes.

> the = sign check if the two values are equal.

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="friends"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM students
WHERE major = 'Biology';
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name      | year | major   |
| --------- | ---- | ------- |
| Ava Smith | 1    | Biology |
| Lin Wong  | 3    | Biology |

    </TabItem>

</Tabs>

:::

## 🧹 Selecting Unique Values with numeric

We can also use `=` with numeric properties, like selecting only students that have the year value
`1`.

---

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Subscribers"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM students
WHERE year = 1;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name        | year | major   |
| ----------- | ---- | ------- |
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |

    </TabItem>

</Tabs>

:::

## 🧹 Filtering coloumns

When using contions we dont have to select all coloumns with \*, we can select only a couple like
name and year.

> We dont have to select all colouns when filtering.

---

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Subscribers"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM students
WHERE year = 1;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name        | year | major   |
| ----------- | ---- | ------- |
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |

    </TabItem>

</Tabs>

:::

## ✅ What You have Learned

This module covers four essential topics in data selection:

- **Rows and Columns**  
  Learn how to access specific rows and columns in a dataset or table, the building blocks of any
  query.

- **Select Data**  
  Understand the basic `SELECT` statement to retrieve data from a database.

- **Select Multiple Columns**  
  Retrieve more than one column at a time in your queries to get the information you need all at
  once.

- **Select Distinct Values**  
  Use `DISTINCT` to eliminate duplicate records and identify unique entries within your dataset.

---
