---
id: alter-table
title: Alter Table Data
sidebar_label: Alter Table Data
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

# 📗 Alter Table Data

Let’s say you’re a small business owner, and your business is growing! You realize you need to keep
track of discounts for each order. To do this, you need to change the structure of your existing
table by adding a new column.

Suppose you have an `orders` table like this:

To track discounts, you want to add a `discount` column. In SQL, you can modify the table structure
using the `ALTER TABLE` statement:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
  ```sql title="Orders Table"
| order_no | order_status | place_of_order |
|----------|--------------|----------------|
| 101      | Delivered    | Amazon         |
| 512      | Delivered    | Amazon         |
| 432      | Shipped      | Pedbubble      |
| 984      | Processing   | Store          |
| 566      | Delivered    | Store          |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">

```sql
ALTER TABLE orders
ADD discount;
```

    </TabItem>

    <TabItem value="how-git-works" label="Output ">

| order_no | order_status | place_of_order | discount |
| -------- | ------------ | -------------- | -------- |
| 101      | Delivered    | Amazon         |          |
| 512      | Delivered    | Amazon         |          |
| 432      | Shipped      | Pedbubble      |          |
| 984      | Processing   | Store          |          |
| 566      | Delivered    | Store          |          |

    </TabItem>

</Tabs>

---

✅ This is your first step in understanding how data is structured in relational databases. Once you
master rows, you're on your way to writing powerful SQL queries!.

> We can add new col with `ADD` Keywords

:::

## 🗑️ Deleting a Column from a Table

Sometimes, you may need to remove a column from an existing table. You can do this using the
`DROP COLUMN` command with `ALTER TABLE`. For example, to remove the `place_of_order` column from
the `orders` table:

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
  
  ```sql title="Orders Table"
| order_no | order_status | order_amt | customer_id | place_of_order |
|----------|--------------|-----------|-------------|----------------|
| 101      | Delivered    | 550       | 3001        | Amazon         |
| 512      | Delivered    | 113       | 3001        | Amazon         |
| 984      | Processing   | 54        | 3012        | Store          |
| 566      | Delivered    | 850       | 3120        | Store          |
| 432      | Shipped      | 99        | 3003        | Amazon         |
```
  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">

```sql
ALTER TABLE orders
DROP COLUMN place_of_order;
SELECT * FROM orders;
```

  </TabItem>

  <TabItem value="Output" label="Output">

| order_no | order_status | order_amt | customer_id |
| -------- | ------------ | --------- | ----------- |
| 101      | Delivered    | 550       | 3001        |
| 512      | Delivered    | 113       | 3001        |
| 984      | Processing   | 54        | 3012        |
| 566      | Delivered    | 850       | 3120        |
| 432      | Shipped      | 99        | 3003        |

  </TabItem>
</Tabs>

:::tip ✅ Tip: Always double-check before dropping a column, as this operation is irreversible and
will permanently remove the data in that column. :::

## ✏️ Renaming a Column in a Table

You can rename a column in SQL using the `RENAME COLUMN` command with `ALTER TABLE`. Specify the
original column name after `RENAME COLUMN`, and the new name after `TO`. For example, to rename the
`order_amt` column to `amount` in the `orders` table:

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">

```sql title="Orders Table"
| order_no | order_status | order_amt | customer_id | discount |
|----------|--------------|-----------|-------------|----------|
| 101      | Delivered    | 550       | 3001        |          |
| 512      | Delivered    | 113       | 3001        |          |
| 984      | Processing   | 54        | 3012        |          |
| 566      | Delivered    | 850       | 3120        |          |
| 432      | Shipped      | 99        | 3003        |          |
```

  </TabItem>

  <TabItem value="SQL Code" label="SQL Code">

```sql
ALTER TABLE orders
RENAME COLUMN order_amt TO amount;
SELECT * FROM orders;
```

  </TabItem>

  <TabItem value="Output" label="Output">

| order_no | order_status | amount | customer_id | discount |
| -------- | ------------ | ------ | ----------- | -------- |
| 101      | Delivered    | 550    | 3001        |          |
| 512      | Delivered    | 113    | 3001        |          |
| 984      | Processing   | 54     | 3012        |          |
| 566      | Delivered    | 850    | 3120        |          |
| 432      | Shipped      | 99     | 3003        |          |

  </TabItem>
</Tabs>

:::tip ✅ Tip: Use `ALTER TABLE ... RENAME COLUMN ... TO ...` to safely rename columns without
losing data. :::

## ✅ What You Have Learned

In this module, you explored essential SQL table transformation skills, including:

- **Altering Table Structure**  
  How to use the `ALTER TABLE` statement to add, remove, or rename columns in an existing table.

- **Adding Columns**  
  Using `ADD` with `ALTER TABLE` to introduce new columns, such as tracking discounts for orders.

- **Deleting Columns**  
  Removing unnecessary columns with `DROP COLUMN` to keep your table structure relevant.

- **Renaming Columns**  
  Renaming columns safely using `RENAME COLUMN` to improve clarity or adapt to changing
  requirements.

- **Best Practices**  
  Double-checking before dropping columns (as this is irreversible), and using clear, descriptive
  column names for maintainability.

These skills help you adapt your database schema as your application or business needs evolve.

---

## 📝 Quiz: Test Your Knowledge

#### 1. How can you remove the `place_of_order` column from the `orders` table in SQL?

Here is the original `orders` table:

| order_no | order_status | order_amt | customer_id | place_of_order |
| -------- | ------------ | --------- | ----------- | -------------- |
| 101      | Delivered    | 550       | 3001        | Amazon         |
| 512      | Delivered    | 113       | 3001        | Amazon         |
| 984      | Processing   | 54        | 3012        | Store          |
| 566      | Delivered    | 850       | 3120        | Store          |
| 432      | Shipped      | 99        | 3003        | Amazon         |

<details>
  <summary>Answer</summary>
  <ul>
    <li>Use the <code>ALTER TABLE</code> statement with <code>DROP COLUMN</code> to remove the column:</li>
  </ul>

```sql
ALTER TABLE orders
DROP COLUMN place_of_order;
SELECT * FROM orders;
```

## </details>

#### 2. How can you add a new column called `discount` of type `int` to the `orders` table in SQL?

Here is the original `orders` table:

| order_no | order_status | order_amt | customer_id | place_of_order |
| -------- | ------------ | --------- | ----------- | -------------- |
| 101      | Delivered    | 550       | 3001        | Amazon         |
| 512      | Delivered    | 113       | 3001        | Amazon         |
| 984      | Processing   | 54        | 3012        | Store          |
| 566      | Delivered    | 850       | 3120        | Store          |
| 432      | Shipped      | 99        | 3003        | Amazon         |

<details>
  <summary>Answer</summary>
  <ul>
    <li>Use the <code>ALTER TABLE</code> statement with <code>ADD</code> to add the new column:</li>
  </ul>

```sql
ALTER TABLE orders ADD discount int;
SELECT * FROM orders;
```

</details>

<GiscusComments/>
