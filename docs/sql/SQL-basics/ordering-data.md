---
id: ordering-data
title: Ordering Data
sidebar_label: Ordering Data
sidebar_position: 2
tags: [html, web-development, document-structure]
description:
  In this tutorial, you will learn about the structure of an HTML document and how to create a basic
  HTML document.
---

# 📗 Ordering Data

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

## Task: Sort a table using the `ORDER BY` clause

### Lesson Overview

After using `ORDER BY`, we specify the column by which we want to order the entries.  
For example, to sort by the `name` column:

The first step in ordering table is the SELECT ORDER BY helps you to arrange data in readable form
Here **FROM** specify the table we are selecting from ountries. Here the query is ordering the
number by name/.

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"
| name    | username |
-----------|---------|
 Smith     | 19      |
 Jones     | 60      |
 Wilson    | 25      |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables & db. "

    -- creating orders

SELECT \* FROM patients ORDER BY name;

    ```



    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name   | age |
| ------ | --- |
| Smith  | 19  |
| Jones  | 60  |
| Wilson | 25  |

    </TabItem>

</Tabs>

:::

### Example Practice

> To query data from a table, use the FROM clause followed by the table's name.

For example, consider a table named `Friends`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"
| name    | gdp     |
|---------|---------|
| Greece  | 187.46  |
| Sweden  | 474.15  |
| Iceland | 21.6    |
| Germany | 3449.05 |

````
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">

  ```sql title="Creating SQL Tables. "
SELECT *
FROM countries
ORDER BY name;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">
| name    | gdp     |
|---------|---------|
| Germany | 3449.05 |
| Greece  | 187.46  |
| Iceland | 21.6    |
| Sweden  | 474.15  |

    </TabItem>
</Tabs>


:::



:::tip
 When requesting data with SQL staments like SELECT, we say that we are making a query.
From helps in select the name col from
While not necessary but its a good practice to finish the sql queries with;


By following these best practices, ASC is the default sort ordering method followed.
:::

### 🔄 Arranging ORDERS BY with ASC , DESC

    :::info
    Ordering text properties like name is different when comparing to the age
    We can order items in asseding starting with smalest value or deceding.
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="friends"
| name   | age |
|--------|-----|
| Smith  | 19  |
| Jones  | 60  |
| Wilson | 25  |

````

  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM patients
ORDER BY age ASC;

    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name   | age |
| ------ | --- |
| Smith  | 19  |
| Wilson | 25  |
| Jones  | 60  |

    </TabItem>

</Tabs>

:::

## 🧹 Selecting with `DESC`

For Text value it order by Alphabetically When arranging numerical value the item with smallest
value in that coloumn comes first

---

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Subscribers"
| name   | age |
|--------|-----|
| Smith  | 19  |
| Jones  | 60  |
| Wilson | 25  |

````
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">

  ```sql title="Creating SQL Tables. "
SELECT *
FROM patients
ORDER BY age DESC;

    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">
| name   | age |
|--------|-----|
| Jones  | 60  |
| Wilson | 25  |
| Smith  | 19  |


    </TabItem>
</Tabs>


:::




# ✅ What You Have Learned

This module covers essential concepts related to ordering data in SQL:

- **ORDER BY Clause**
Learn how to sort query results based on one or more columns using the `ORDER BY` keyword.

- **Ascending Order** (ASC)
Understand that SQL sorts in ascending order by default, which is the same as explicitly using `ASC`.

- **Descending Order** (DESC)
Use the `DESC` keyword to sort results from highest to lowest or reverse alphabetical order.

- **Sort by Column Values**
Practice sorting by numeric or text column values to organize data meaningfully.

---
````
