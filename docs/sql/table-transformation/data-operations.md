---
id: data-operations
title: Data Operations
sidebar_label: Data Operations
sidebar_position: 1
tags: [GitHub, GitHub-development, document-structure, GitHub repo]
description:
  In this tutorial, you will learn about the how to create a GitHub repo by Online GUI interface.
---

# 📘 Data Operations

Welcome to the **Data Operations** module! This module we will learn how to add and remove the data
from the table. For adding new data we can use INSERT INTO.

### 📘 Inserting new data to SQL Table

This module we will learn how to add and remove the data from the table. For adding new data we can
use INSERT INTO.

> Insert Into inserts a new row filled with a new data into existing table.

> Then `values` add spesfic data to the newly added row. It spesfies the value to be inserted into a
> newly created row. These columns define the **type of information** stored for each item in the
> table.

For example, consider a table named `Orders`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
  ```sql title="Orders Table"
  | name           | id   | price |
  |----------------|------|-------|
  | Chocolate box  | 1235 | 14    |
  | Bath bombs     | 2337 | 9     |
  | Flower hamper  | 7483 | 21    |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Inserting SQL Tables & db. "

-- Insert a new order INSERT INTO orders(name, id, price) VALUES("Teddy bear", 6574, 13);

-- View all orders SELECT \* FROM orders;

    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output ">

| name          | id   | price |
| ------------- | ---- | ----- |
| Chocolate box | 1235 | 14    |
| Bath bombs    | 2337 | 9     |
| Flower hamper | 7483 | 21    |
| Teddy bear    | 6574 | 13    |

    </TabItem>

</Tabs>

---

✅ This is your first step in understanding how data is structured in relational databases. Once you
master rows, you're on your way to writing powerful SQL queries!

:::

:::tip You can delete the data from an entire table by not spesfying the condition, this is known as
Truncating. You can delete all `value` from the table using `DELETE FROM` without the condition.

By following these best practices, :::

### 🔄 Deleting Data from SQL

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
  ```sql title="Orders Table"
  | name           | id   | price |
  |----------------|------|-------|
  | Chocolate box  | 1235 | 14    |
  | Bath bombs     | 2337 | 9     |
  | Flower hamper  | 7483 | 21    |
  | Old console    | 6574 | 13    |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
DELETE FROM orders WHERE price > 10;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name       | id   | price |
| ---------- | ---- | ----- |
| Bath bombs | 2337 | 9     |

    </TabItem>

</Tabs>

:::

## 🧹 Deleting all the values

Sometimes your table might contain **duplicate values**, and you only want to see each unique value
**once** in your result.

That’s where the `DELETE` keyword comes in!

---

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Users"
| name  | id    | password |
|-------|-------|----------|
| Anita | 12345 | hello123 |
| Peter | 66574 | pete543  |
| Alex  | 98732 | alexOOl  |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
DELETE FROM users;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

No data

    </TabItem>

</Tabs>

:::

:::

## 🧹 Updating the data

Sometimes you need to update the existing table entries for sample scenario dinner reservation for
guest booking in a restaurent This example shows how to update the reservation time for a specific
guest in the `Reservations` table without creating duplicate entries.

> Update cannot be used to insert new entries into table it can be only used to change existing
> entries. An Update statment always starts with the keyword `UPDATE` Followed by the table name.
> Then the table name is followed by the KEYWORD `SET` and an expression settng the colomn to
> specified value. As you noticed the UPDATE can be used to update a coloumns value for every row,
> but often we want to change spesfic row. we can do that by WHERE A condition `>` can be used to
> update multiple coloumn

---

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Reservations"
| Id | name    | phonenumtoer   | time  | partysae |
|----|---------|----------------|-------|----------|
| 1  | Powers  | +16352637463   | 1800  | 4        |
| 2  | Miranda | +17487652839   | 1900  | 5        |
| 3  | Smith   | +17648373572   | 18:30 | 3        |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
UPDATE Reservations SET time = '19:00' WHERE name = 'Smith';
SELECT * FROM Reservations;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| Id  | name    | phonenumtoer | time  | partysae |
| --- | ------- | ------------ | ----- | -------- |
| 1   | Powers  | +16352637463 | 1800  | 4        |
| 2   | Miranda | +17487652839 | 1900  | 5        |
| 3   | Smith   | +17648373572 | 19:00 | 3        |

    </TabItem>

</Tabs>
You can see the change happened to Smith

:::

---

## ✅ What You Have Learned

This module covers four key operations for managing data within SQL tables:

- **Inserting Data**  
  Use `INSERT INTO` to add new rows to a table, specifying values for each column.

- **Deleting Data**  
  Learn how to remove specific rows with `DELETE FROM ... WHERE` or remove all rows without a
  condition.

- **Updating Data**  
  Use `UPDATE ... SET ... WHERE` to modify existing rows without creating duplicates, targeting
  specific entries with conditions.

- **Truncating Data**  
  Understand how deleting all rows from a table clears its content, useful for removing duplicates
  or resetting tables.

---
