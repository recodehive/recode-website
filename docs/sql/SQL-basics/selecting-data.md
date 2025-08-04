---
id: selecting-data
title: Selecting Data
sidebar_label: Selecting Data
sidebar_position: 1
tags: [GitHub, GitHub-development, document-structure, GitHub repo]
description:
  In this tutorial, you will learn about the how to create a GitHub repo by Online GUI interface.
---

# 📘 Selecting Data

Welcome to the **Selecting Data** module! This foundational learning path is designed to help you
master the basics of querying data, particularly focusing on how to retrieve specific information
from databases effectively.

### 📘 Creating SQL Table

In this tutorial, you'll learn how to interpret and use rows in a database table. Tables are
essential to storing structured data, and each **row** in a table represents a unique **item or
record**.

> Each row of a table represents a new item.

> Each column of a table represents a specific attribute of the data, such as `id`, `name`, or
> `username`. These columns define the **type of information** stored for each item in the table.

For example, consider a table named `Friends`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"
  | id | name            | username         |
|----|-----------------|------------------|
| 1  | John Doe        | @johndoe         |
| 2  | Jane Smith      | @janesmith       |
| 3  | Bob Johnson     | @bobjohnson      |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables & db. "

    -- creating database
    CREATE DATABASE my_database;

    -- use the database you created
    USE my_database;

-- Create the table CREATE TABLE friends ( id INT PRIMARY KEY, name VARCHAR(100), username
VARCHAR(100) );

-- Insert data into the table INSERT INTO friends (id, name, username) VALUES (1, 'John Doe',
'@johndoe'), (2, 'Jane Smith', '@janesmith'), (3, 'Bob Johnson', '@bobjohnson');

    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output ">
      | id | name            | username         |

|----|-----------------|------------------| | 1 | John Doe | @johndoe | | 2 | Jane Smith |
@janesmith | | 3 | Bob Johnson | @bobjohnson | </TabItem> </Tabs>

:::

## 🧾 Explanation

The **first row** of this table contains:

- `id`: **1**
- `name`: **John Doe**
- `username`: **@johndoe**

Each of the remaining rows represents a different friend, with unique ID, name, and username values.

---

✅ This is your first step in understanding how data is structured in relational databases. Once you
master rows, you're on your way to writing powerful SQL queries!

### 📘 Querying a Table with `FROM`

> To query data from a table, use the FROM clause followed by the table's name.

For example, consider a table named `Friends`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"
| id | name              | email                   |
|----|-------------------|--------------------------|
| 1  | Tony Stark        | ironman@avengers.com     |
| 2  | Bruce Wayne       | batman@gotham.com        |
| 3  | Leia Organa       | princess@rebellion.org   |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT name
FROM friends;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">
     | id | name              | email                   |

|----|-------------------|--------------------------| | 1 | Tony Stark | ironman@avengers.com | | 2
| Bruce Wayne | batman@gotham.com | | 3 | Leia Organa | princess@rebellion.org | </TabItem> </Tabs>

:::

:::tip When requesting data with SQL staments like SELECT, we say that we are making a query. From
helps in select the name col from While not necessary but its a good practice to finish the sql
queries with;

By following these best practices, :::

### 🔄 Selecting Multiple Columns in SQL

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="friends"
| id | name              | email                   |
|----|-------------------|--------------------------|
| 1  | Tony Stark        | ironman@avengers.com     |
| 2  | Bruce Wayne       | batman@gotham.com        |
| 3  | Leia Organa       | princess@rebellion.org   |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT name, email
FROM friends;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">
      | name              | email                   |

|------------------|--------------------------| | Tony Stark | ironman@avengers.com | | Bruce Wayne
| batman@gotham.com | | Leia Organa | princess@rebellion.org | </TabItem> </Tabs>

:::

## 🧹 Selecting Unique Values with `DISTINCT`

Sometimes your table might contain **duplicate values**, and you only want to see each unique value
**once** in your result.

That’s where the `DISTINCT` keyword comes in!

---

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Subscribers"
| name | email             | country  |
|------|-------------------|----------|
| Sam  | sam17@mail.com    | England  |
| Remy | rem@mail.com      | France   |
| Luis | luis_99@mail.com  | France   |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT DISTINCT country
FROM subscribers;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| country |
| ------- |
| England |
| France  |

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
