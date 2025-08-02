---
id: intro-sql
title: Introduction to SQL # Unique identifier, used for discussions mapping
sidebar_label: Introduction to SQL # Appears in sidebar
sidebar_position: 1
tags:
  [
    sql,
    introduction to sql,
    what is sql,
    why learn sql,
    how to use sql,
    sql structure,
    sql elements,
    sql attributes,
  ]
description: In this tutorial, you will learn about SQL, its importance, what SQL is, why to learn SQL, how to use SQL, steps to get started, and more.
---

## Introduction

**SQL** (Structured Query Language) is the standard programming language used to manage and manipulate relational databases. It enables users to store, retrieve, update, and delete data in a structured format. SQL became an ANSI standard in 1986 and an ISO standard in 1987.

:::note
**Key Features of SQL:**

- **Data Querying:** Retrieve data from tables using commands like `SELECT`.
- **DML (Data Manipulation Language):** Add, update, or delete records using `INSERT`, `UPDATE`, and `DELETE`.
- **DDL (Data Definition Language):** Define database structures using `CREATE`, `ALTER`, and `DROP`.
- **DCL (Data Control Language):** Control access and permissions with `GRANT` and `REVOKE`.
- **TCL (Transaction Control Language):** Manage transactions with `COMMIT` and `ROLLBACK`.
:::

<BrowserWindow url="https://github.com" bodyStyle={{padding: 0}}>     
  [![GitHub](./assets/01-sql-intro.png)](https://github.com/sanjay-kv)
</BrowserWindow>

:::success
Let’s talk about the history of data storage:

Data storage began with physical files and shelves. Later, companies started using tools like Excel and Access. However, these tools have limitations when handling large data volumes.

To overcome these challenges, companies developed database management systems (DBMS) such as SQL databases (like PostgreSQL and MySQL).

> There are two main types of databases:
> 
> - **SQL/Relational databases** (supports Online Transaction Processing [OLTP] and Online Analytical Processing [OLAP]).
> - **NoSQL databases** (key-value, graph, document)—often used for semi-structured or unstructured datasets. NoSQL databases provide more flexibility than relational databases because they don’t require fixed schemas.

> **Schema:** A schema is a named collection of tables and can also include views, indexes, datatypes, operators, and functions.
:::

:::info

| **#** | **Keyword/Concept**                             | **Description**                                                        |
|-------|--------------------------------------------------|------------------------------------------------------------------------|
| 1     | `SELECT`                                         | Retrieves data from one or more tables in a database.                  |
| 2     | `FROM`                                           | Specifies the table(s) to retrieve data from.                          |
| 3     | `WHERE`                                          | Filters rows based on specified conditions.                            |
| 4     | `JOIN`                                           | Combines rows from two or more tables based on a related column.       |
| 5     | `GROUP BY`                                       | Groups rows that have the same values into summary rows.               |
| 6     | `ORDER BY`                                       | Sorts the result set by one or more columns.                           |
| 7     | `HAVING`                                         | Filters data after grouping using `GROUP BY`.                          |
| 8     | `INSERT`                                         | Adds new records to a table.                                           |
| 9     | `UPDATE`                                         | Modifies existing records in a table.                                  |
| 10    | `DELETE`                                         | Removes records from a table.                                          |
| 11    | `CREATE`                                         | Creates a new database object (table, view, etc.).                     |
| 12    | `ALTER`                                          | Modifies an existing database object.                                  |
| 13    | `DROP`                                           | Deletes a database object.                                             |
| 14    | Aggregation Functions (`MIN`, `MAX`, `AVG`, `COUNT`) | Performs calculations on a set of values and returns a single value.   |
| 15    | Joins (`INNER`, `LEFT`, `FULL`)                  | Retrieves data from multiple tables with matching or non-matching values.|
| 16    | `CASE` Statement                                 | Adds conditional logic within SQL queries.                             |
| 17    | Window Functions (`RANK`, `DENSE_RANK`, `ROW_NUMBER`) | Performs calculations across sets of rows related to the current row.   |

#### Structure and Content

In SQL, the *structure* refers to how data is organized in tables; the *content* refers to the actual data stored within those tables.

| **Category**  | **Alias** | **Description** |
|---------------|-----------|-----------------|
| Tuple         | Row       | Record          |
| Attribute     | Column    | Field           |
:::

**Example: The following SQL code creates a table named `Students`.**

<Tabs>
  <TabItem value="Basic SQL">
-- Create a table
CREATE TABLE Students (
ID INT,
Name VARCHAR(50),
Age INT
);

-- Insert a record (recommended: specify column names)
INSERT INTO Students (ID, Name, Age) VALUES (1, 'Alice', 22);

-- Query the table
SELECT * FROM Students;

-- Update a record
UPDATE Students SET Age = 23 WHERE ID = 1;

-- Delete a record
DELETE FROM Students WHERE ID = 1;

text
</TabItem>
<TabItem value="Output">
-- After creating the table and inserting a record:
ID Name Age
1 Alice 22

-- After updating the record:
ID Name Age
1 Alice 23

-- After deleting the record:
(No rows returned)

text
</TabItem>
<TabItem value="DDL">
-- CREATE TABLE statement to create a new table with columns and data types
CREATE TABLE customers (
id INT PRIMARY KEY,
name VARCHAR(50),
email VARCHAR(50)
);

-- ALTER TABLE statement to add a new column to an existing table
ALTER TABLE customers ADD COLUMN phone VARCHAR(20);

-- DROP TABLE statement to remove a table from the database
DROP TABLE customers;

text
</TabItem>
<TabItem value="DML">
-- INSERT statement to add new data to a table
INSERT INTO customers (name, email) VALUES ('John Doe', 'johndoe@email.com');

-- UPDATE statement to modify existing data in a table
UPDATE customers SET email = 'new@email.com' WHERE name = 'John Doe';

-- DELETE statement to remove data from a table
DELETE FROM customers WHERE name = 'John Doe';

text
</TabItem>
<TabItem value="DCL">
-- CREATE USER and GRANT statements (syntax may vary by DBMS)
CREATE USER 'new_user' IDENTIFIED BY 'password';
GRANT SELECT, INSERT, UPDATE ON customers TO new_user;

text
</TabItem>
<TabItem value="TCL">
-- BEGIN TRANSACTION statement to start a new transaction
BEGIN TRANSACTION;

-- COMMIT statement to save changes made during a transaction
COMMIT;

-- ROLLBACK statement to undo changes made during a transaction
ROLLBACK;

text
</TabItem>
</Tabs>

---

### Advantages: Platform Independence — Yes and No

The core SQL language (based on ANSI/ISO standards) is platform independent, meaning the basic syntax and concepts—such as `SELECT`, `INSERT`, `UPDATE`, and `DELETE`—are the same across different database systems.

However, most Database Management Systems (DBMS)—like MySQL, PostgreSQL, Oracle, SQL Server, and SQLite—extend SQL differently:

- Use different data types (e.g., `VARCHAR`, `TEXT`)
- Offer custom functions and features
- Handle stored procedures, triggers, and syntax differently
- Provide varied tools and optimization strategies

As a result, SQL code written for one system might not work exactly the same on another without some adjustments.

---

# 🗃️ Why Learn SQL?

SQL (Structured Query Language) is the standard language for managing and querying relational databases—the most common method businesses use to store data. Whether it's **MySQL**, **PostgreSQL**, **SQL Server**, or **SQLite**—all use SQL!

Data engineering involves collecting, transforming, and storing data so it is accessible for analysis. SQL is a crucial tool in this process because it allows you to:

1. **Retrieve data:** Query the database for specific information based on criteria.
2. **Manipulate data:** Add, delete, or update data to keep it accurate and up to date.
3. **Manage data:** Create tables, define relationships, and set up permissions to keep data organized and secure.

---

## 📊 SQL: A Must-Have for Data-Driven Roles

SQL is a **critical skill** for anyone working with data. It empowers you to extract, analyze, and transform information efficiently.

Some roles where SQL is essential:

- **Data Analysts**
- **Data Engineers**
- **Data Scientists**
- **Business Intelligence Professionals**
- **Software Developers**
- **Marketers**
- **Product Managers**
- **Business Analysts**

From running ad-hoc queries to building data pipelines and dashboards, SQL is everywhere in data work!

---

### Steps to Start Using SQL

**1. Set up your development environment:**  
Go to the MySQL Workbench Downloads page.

**2. Download the installer:**  
- Select the version compatible with your operating system (Windows, macOS, or Linux).
- Click **Download** and follow the installation instructions.  
- Visit: https://dev.mysql.com/downloads/workbench

---

## Conclusion

Learning SQL empowers you to interact with data, unlock insights, and build data-driven solutions—making it one of the most valuable and versatile skills in the digital world.

<GiscusComments/>