# Grouping Data in SQL

When you work with a lot of data, you often want to **combine rows that have the same values** in certain columns and calculate something for each group.  
In SQL, this is done with the **`GROUP BY`** clause.



## Why Use GROUP BY?

Imagine you have a `sales` table:

| id | product   | category  | quantity | price |
|----|-----------|-----------|----------|-------|
| 1  | Apple     | Fruit     | 10       | 2.5   |
| 2  | Orange    | Fruit     | 5        | 3.0   |
| 3  | Carrot    | Vegetable | 7        | 1.5   |
| 4  | Apple     | Fruit     | 8        | 2.5   |

If you want **total quantity sold for each category**, you can group the rows by `category`.



## GROUP BY Syntax

```sql
SELECT column1, column2, ..., aggregate_function(column)
FROM table_name
GROUP BY column1, column2, ...;
````

* **`aggregate_function`**: Functions that calculate a value for a group, such as:

  * `COUNT()` → Counts rows
  * `SUM()` → Adds values
  * `AVG()` → Calculates average
  * `MIN()` → Finds smallest value
  * `MAX()` → Finds largest value


## Example: GROUP BY with SUM

```sql
SELECT category, SUM(quantity) AS total_quantity
FROM sales
GROUP BY category;
```

**Result:**

| category  | total\_quantity |
| --------- | --------------- |
| Fruit     | 23              |
| Vegetable | 7               |

**How it works:**

1. SQL looks at the `category` column.
2. Rows with the same category are grouped together.
3. The `SUM(quantity)` is calculated for each group.



## GROUP BY with Multiple Columns

You can group by **more than one column**.

```sql
SELECT category, product, SUM(quantity) AS total_quantity
FROM sales
GROUP BY category, product;
```

Now each unique **(category, product)** pair is its own group.



## Filtering Groups with HAVING

`WHERE` filters **rows before grouping**.
`HAVING` filters **groups after grouping**.

Example: Show only categories where total quantity > 10.

```sql
SELECT category, SUM(quantity) AS total_quantity
FROM sales
GROUP BY category
HAVING SUM(quantity) > 10;
```

**Result:**

| category | total\_quantity |
| -------- | --------------- |
| Fruit    | 23              |



## Difference Between WHERE and HAVING

| Clause | Filters On      | Works With Aggregates? |
| ------ | --------------- | ---------------------- |
| WHERE  | Individual rows | ❌ (no aggregates)      |
| HAVING | Grouped results | ✅ (with aggregates)    |



## Common Aggregate Functions

| Function    | Description       | Example         |
| ----------- | ----------------- | --------------- |
| COUNT(\*)   | Counts all rows   | `COUNT(*)`      |
| SUM(column) | Adds all values   | `SUM(quantity)` |
| AVG(column) | Average of values | `AVG(price)`    |
| MIN(column) | Minimum value     | `MIN(price)`    |
| MAX(column) | Maximum value     | `MAX(price)`    |

