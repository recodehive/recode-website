---
id: list-drop-table
title: List and Drop Table
sidebar_label: List and Drop Table
sidebar_position: 4
tags: [html, web-development, document-structure]
description: In this tutorial, you will learn about the structure of an HTML document and how to create a basic HTML document.
---


## 📋 Listing All Tables in a Database

A database schema contains metadata about all objects in the database, including tables, views, and indexes. If you want to see only the tables in your database, you can query the schema for objects of type `table`.

Suppose you have a database with the following tables:

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">

  ```sql title="Tables in Database"
| Table Name   |
|--------------|
| past         |
| events       |
| crew         |
  ```

  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">

```sql
SELECT name 
FROM sqlite_schema 
WHERE type = 'table';
```

  </TabItem>

  <TabItem value="Output" label="Output">

| name   |
|--------|
| past   |
| events |
| crew   |

  </TabItem>
</Tabs>

:::tip
✅ Tip: Querying the schema is a reliable way to list all tables in your SQLite database.
:::

## 🎯 Example: Listing Table Names Only

To list all tables in your database, you only need the `name` column from the schema. Use a `SELECT` statement to retrieve just the table names.

<Tabs>


  <TabItem value="Sample Data" label="Sample Data">

| name          | entry | attendees |
|---------------|-------|-----------|
| Pride Party   | 10    | 79        |
| Classical Day | 15    | 76        |
| Wine tasting  | 8     | 43        |

  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">

```sql
SELECT name
FROM sqlite_schema
WHERE type = 'table';
```

  </TabItem>
</Tabs>

> To get only the table names, select the `name` column from `sqlite_schema` where `type` is `'table'`.


## 🗑️ Deleting a Table from the Database

Once you have listed all tables, you may want to remove an entire table from your database. You can do this using the `DROP TABLE` statement. For example, to delete the `past_events` table:

<Tabs>


  <TabItem value="Sample Data" label="Sample Data">

| name          | entry | attendees |
|---------------|-------|-----------|
| Pride Party   | 10    | 79        |
| Classical Day | 15    | 76        |
| Wine tasting  | 8     | 43        |

  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">

```sql
DROP TABLE past_events;
SELECT name FROM sqlite_schema WHERE type = 'table';
```

  </TabItem>

  <TabItem value="Output" label="Output">

| name   |
|--------|
| events |
| crew   |

  </TabItem>
</Tabs>

:::caution
⚠️ Caution: Dropping a table will permanently delete the table and all its data. Make sure you have backups if needed.
:::


## ✅ What You Have Learned

In this module, you learned how to manage tables in your SQL database, including:

- **Listing Tables**  
  Querying the database schema to view all tables present in your database.

- **Dropping Tables**  
  Using the `DROP TABLE` statement to permanently remove tables and their data.

- **Best Practices**  
  Always verify before dropping tables, as this action cannot be undone, and ensure you have backups if needed.

These skills are essential for maintaining and organizing your database as your project requirements change.

---

## 📝 Quiz: Test Your Knowledge

#### 1. Now that we have the list of tables, let's delete the entire `past_events` table with the `DROP TABLE` query.

Here is the original `past_events` table:

| name          | entry | attendees |
|---------------|-------|-----------|
| Pride Party   | 10    | 79        |
| Classical Day | 15    | 76        |
| Wine tasting  | 8     | 43        |

<details>
  <summary>Answer</summary>
  <ul>
    <li>Use the <code>DROP TABLE</code> statement to remove the entire table:</li>
  </ul>

  ```sql
  DROP TABLE past_events;
  SELECT name FROM sqlite_schema WHERE type = 'table';
  ```
</details>
---


#### 2. Which of the following statements is true for a schema?

Q Tap the correct answer

- [ ] A schema contains only table information.
- [x] A schema contains information about a database.

<details>
  <summary>Answer</summary>
  <ul>
    <li>A schema contains information about a database, including tables, views, indexes, and other objects.</li>
  </ul>
</details>

#### 3. Where is the list of tables stored in your database?

Q Tap the correct answer

- [ ] In the data rows of a table
- [x] In the schema

<details>
  <summary>Answer</summary>
  <ul>
    <li>  In the schema ,
    The list of tables is stored in the database schema, which contains metadata about all objects in the database.</li>
  </ul>
</details>



<GiscusComments/>