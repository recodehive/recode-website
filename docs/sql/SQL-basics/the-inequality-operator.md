---
id: the-inequality-operator
title: The Inequality Operator
sidebar_label: The Inequality Operator
sidebar_position: 4
tags: [html, web-development, document-structure]
description:
  In this tutorial, you will learn about the structure of an HTML document and how to create a basic
  HTML document.
---

# 📗 The Inequality Operator

To check if a coloumns value is not equal to another we use the inequality operator.

For example, consider a table named `Friends`. Below is how a simple table might look:

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Friends"

| name        | year | major   |
| ----------- | ---- | ------- |
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |

````
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">

  ```sql title="Creating SQL Tables & db. "
SELECT *
FROM students
WHERE year <> 1;

    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output ">
| name     | year | major   |
| -------- | ---- | ------- |
| Lin Wong | 3    | Biology |

    </TabItem>
</Tabs>




### 📘 Practise Example

  > To query data from a table, use the FROM clause followed by the table's name.


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
````

  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM students
WHERE year <> 1;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| name     | year | major   |
| -------- | ---- | ------- |
| Lin Wong | 3    | Biology |

    </TabItem>

</Tabs>

:::

:::tip The Inequality sign is useful when we want to get all items that dont satisfy a criterion. it
checks the value are not equal. It can apply to all types of numbers.

By following these best practices, :::

### 🔄 Comparison Operator.

> Sometimes, comparison with = and are not felxible enoguh like when filtering by price of a grocery
> itesm We can use conditions to select items having a property les s than a threshold value like
> chocolate items with a price less than 2$ We can also use the numeric properties , it dont need to
> put in the quotes. the = sign check if the two values are equal. We want to code a condition to
> select records from the pollution table where the pollution_index is less than 100.

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="friends"
| city     | pollution_index |
|----------|-----------------|
| Delhi    | 168             |
| Milano   | 122             |
| Shanghai | 74              |
| Tokyo    | 21              |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM pollution
WHERE pollution_index < 100;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| city     | pollution_index |
| -------- | --------------- |
| Shanghai | 74              |
| Tokyo    | 21              |

    </TabItem>

</Tabs>

:::

## 🧹 Selecting Unique Values with numeric

We want to code a condition to select records from the pollution table where the pollution_index is
less than or equal to 122.

    :::info

<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Subscribers"
| city     | pollution_index |
|----------|-----------------|
| Delhi    | 168             |
| Milano   | 122             |
| Shanghai | 74              |
| Tokyo    | 21              |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Creating SQL Tables. "
SELECT *
FROM pollution
WHERE pollution_index <= 122;
    ```

    </TabItem>

    <TabItem value="how-git-works" label="Output">

| city     | pollution_index |
| -------- | --------------- |
| Milano   | 122             |
| Shanghai | 74              |
| Tokyo    | 21              |

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
