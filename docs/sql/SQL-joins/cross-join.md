---
id: cross-join
title: SQL CROSS JOIN #Remember to keep this unique, as it maps with giscus discussions in the recodehive/support/general discussions
sidebar_label: CROSS JOIN #displays in sidebar
sidebar_position: 6
tags:
  [
    sql,
    cross join,
    sql cross join,
    cartesian product,
    join tables,
    relational database,
    sql tutorial,
    database queries,
  ]
description: Learn about SQL CROSS JOIN, how it creates Cartesian products, syntax, examples, and when to use it for generating all possible combinations.
---

## 

SQL **CROSS JOIN** produces the Cartesian product of two tables, returning all possible combinations of rows from both tables. Unlike other joins, CROSS JOIN doesn't require a join condition and combines every row from the first table with every row from the second table.

:::note
**Key Characteristics of CROSS JOIN:**

- **Cartesian Product**: Creates all possible row combinations from both tables.

- **No Join Condition**: Doesn't use ON or WHERE clauses for joining logic.

- **Result Size**: Returns (Table1 rows × Table2 rows) total rows.

- **Use With Caution**: Can quickly generate enormous result sets.
:::

    <BrowserWindow url="https://github.com" bodyStyle={{padding: 0}}>    
     [![GitHub](./assets/cross-join.gif)](https://www.learnsqlonline.org/)
    </BrowserWindow>

:::success
**When to Use CROSS JOIN:**

- **Generating Combinations**: Creating all possible product-color combinations
- **Time Series Data**: Pairing dates with entities for complete time series
- **Report Templates**: Creating report structures with all possible categories
- **Test Data Generation**: Creating comprehensive test datasets
- **Mathematical Operations**: Matrix operations and mathematical calculations

**Real-World Example:**
A clothing retailer wants to create a product catalog showing all possible combinations of shirt styles (5 types) with available colors (8 colors), resulting in 40 unique product variants.
:::

:::warning
**⚠️ Important Considerations:**

CROSS JOIN can produce **very large result sets**:
- 1,000 rows × 1,000 rows = 1,000,000 rows
- 10,000 rows × 5,000 rows = 50,000,000 rows

Always consider the size of your tables before using CROSS JOIN!
:::

:::info 

## Basic CROSS JOIN Syntax

```sql
-- Method 1: Using CROSS JOIN keyword
SELECT column1, column2, ...
FROM table1
CROSS JOIN table2;

-- Method 2: Using comma-separated tables (implicit cross join)
SELECT column1, column2, ...
FROM table1, table2;
```

| **Component** | **Purpose** | **Example** |
|---------------|-------------|-------------|
| SELECT | Choose columns to display | `SELECT p.name, c.color_name` |
| FROM | First table | `FROM products p` |
| CROSS JOIN | Second table | `CROSS JOIN colors c` |

## Result Set Size Calculation

| **Table 1 Rows** | **Table 2 Rows** | **Result Rows** |
|-------------------|-------------------|-----------------|
| 3 | 4 | 12 |
| 10 | 5 | 50 |
| 100 | 20 | 2,000 |
| 1,000 | 1,000 | 1,000,000 |

:::

## Practical Examples

    <Tabs>
      <TabItem value="Basic Example">
       ```sql
       -- Create all possible product-color combinations
       SELECT 
           p.product_id,
           p.product_name,
           p.base_price,
           c.color_id,
           c.color_name,
           c.color_hex,
           (p.base_price + c.price_adjustment) AS final_price
       FROM products p
       CROSS JOIN colors c
       WHERE p.category = 'Shirts'
       ORDER BY p.product_name, c.color_name;
       
       -- Result: Every shirt paired with every available color
       ```
       </TabItem>
       <TabItem value="Time Series Generation">
       ```sql
       -- Generate complete date series for all employees
       SELECT 
           e.employee_id,
           e.employee_name,
           e.department,
           d.date_value,
           YEAR(d.date_value) AS year,
           MONTH(d.date_value) AS month,
           'Pending' AS attendance_status
       FROM employees e
       CROSS JOIN (
           SELECT DATE('2024-01-01') + INTERVAL (a.a + (10 * b.a)) DAY AS date_value
           FROM (SELECT 0 AS a UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
                 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9) a,
                (SELECT 0 AS a UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 
                 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 
                 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 
                 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 
                 UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 
                 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 
                 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29 
                 UNION SELECT 30 UNION SELECT 31 UNION SELECT 32 UNION SELECT 33 
                 UNION SELECT 34 UNION SELECT 35 UNION SELECT 36) b
           WHERE DATE('2024-01-01') + INTERVAL (a.a + (10 * b.a)) DAY <= '2024-12-31'
       ) d
       WHERE e.status = 'Active'
       ORDER BY e.employee_id, d.date_value;
       ```
       </TabItem>
       <TabItem value="Product Configuration">
       ```sql
       -- Generate all possible product configurations
       SELECT 
           p.product_name,
           s.size_name,
           s.size_multiplier,
           c.color_name,
           m.material_name,
           m.material_cost,
           CONCAT(p.product_name, ' - ', s.size_name, ' - ', c.color_name, ' - ', m.material_name) AS sku_description,
           (p.base_price * s.size_multiplier + c.price_adjustment + m.material_cost) AS final_price
       FROM products p
       CROSS JOIN sizes s
       CROSS JOIN colors c
       CROSS JOIN materials m
       WHERE p.category = 'Custom Items'
         AND s.available = 1
         AND c.available = 1
         AND m.available = 1
       ORDER BY p.product_name, final_price DESC;
       ```
       </TabItem>
      <TabItem value="Sales Territory Matrix">
       ```sql
       -- Create sales target matrix for all reps in all territories
       SELECT 
           sr.rep_id,
           sr.rep_name,
           t.territory_id,
           t.territory_name,
           t.region,
           t.base_target,
           sr.experience_level,
           CASE sr.experience_level
               WHEN 'Senior' THEN t.base_target * 1.2
               WHEN 'Mid-level' THEN t.base_target * 1.0
               WHEN 'Junior' THEN t.base_target * 0.8
           END AS adjusted_target,
           CONCAT(sr.rep_name, ' - ', t.territory_name) AS assignment_code
       FROM sales_reps sr
       CROSS JOIN territories t
       WHERE sr.status = 'Active'
         AND t.status = 'Open'
       ORDER BY t.region, sr.experience_level DESC, adjusted_target DESC;
       ```
       </TabItem>
      <TabItem value="Menu Combinations">
       ```sql
       -- Restaurant menu: all possible meal combinations
       SELECT 
           a.item_name AS appetizer,
           a.price AS appetizer_price,
           m.item_name AS main_course,
           m.price AS main_price,
           d.item_name AS dessert,
           d.price AS dessert_price,
           (a.price + m.price + d.price) AS combo_price,
           (a.price + m.price + d.price) * 0.9 AS discounted_price,
           CONCAT(a.item_name, ' + ', m.item_name, ' + ', d.item_name) AS combo_name
       FROM menu_items a
       CROSS JOIN menu_items m
       CROSS JOIN menu_items d
       WHERE a.category = 'Appetizer'
         AND m.category = 'Main Course'
         AND d.category = 'Dessert'
         AND a.available = 1
         AND m.available = 1
         AND d.available = 1
       HAVING combo_price <= 50  -- Filter expensive combinations
       ORDER BY combo_price;
       ```
       </TabItem>
      <TabItem value="Sample Output">
       ```plaintext
       -- Sample result for product-color cross join:
       
       product_id | product_name    | base_price | color_id | color_name | final_price
       -----------|-----------------|------------|----------|------------|------------
       1          | Classic T-Shirt | 19.99      | 1        | Red        | 21.99
       1          | Classic T-Shirt | 19.99      | 2        | Blue       | 21.99
       1          | Classic T-Shirt | 19.99      | 3        | Green      | 21.99
       1          | Classic T-Shirt | 19.99      | 4        | Black      | 22.99
       2          | Premium Polo    | 39.99      | 1        | Red        | 41.99
       2          | Premium Polo    | 39.99      | 2        | Blue       | 41.99
       2          | Premium Polo    | 39.99      | 3        | Green      | 41.99
       2          | Premium Polo    | 39.99      | 4        | Black      | 42.99
       
       -- Note: Every product appears with every color
       -- 2 products × 4 colors = 8 total combinations
       ```
       </TabItem>
    </Tabs>

## Advanced CROSS JOIN Patterns

:::tip
**Complex Scenarios:**

1. **Filtered Cross Join**:
   ```sql
   -- Create valid product combinations only
   SELECT 
       p.product_name,
       c.color_name,
       s.size_name
   FROM products p
   CROSS JOIN colors c
   CROSS JOIN sizes s
   WHERE p.category = c.compatible_category
     AND s.size_group = p.size_group
     AND p.discontinued = 0;
   ```

2. **Cross Join with Aggregation**:
   ```sql
   -- Calculate distance matrix between all store locations
   SELECT 
       s1.store_name AS from_store,
       s2.store_name AS to_store,
       SQRT(
           POW(s1.latitude - s2.latitude, 2) + 
           POW(s1.longitude - s2.longitude, 2)
       ) * 69 AS distance_miles  -- Rough conversion
   FROM stores s1
   CROSS JOIN stores s2
   WHERE s1.store_id != s2.store_id  -- Exclude same store
   ORDER BY distance_miles;
   ```

3. **Time Series with Cross Join**:
   ```sql
   -- Create complete monthly report template
   SELECT 
       months.month_name,
       months.month_number,
       dept.department_name,
       dept.budget,
       0 AS actual_spending,  -- Placeholder for actual data
       'Pending' AS status
   FROM (
       SELECT 1 as month_number, 'January' as month_name
       UNION SELECT 2, 'February' UNION SELECT 3, 'March'
       UNION SELECT 4, 'April' UNION SELECT 5, 'May'
       UNION SELECT 6, 'June' UNION SELECT 7, 'July'
       UNION SELECT 8, 'August' UNION SELECT 9, 'September'
       UNION SELECT 10, 'October' UNION SELECT 11, 'November'
       UNION SELECT 12, 'December'
   ) months
   CROSS JOIN departments dept
   WHERE dept.active = 1
   ORDER BY dept.department_name, months.month_number;
   ```
:::

## Performance & Optimization

:::caution
**Performance Considerations:**

1. **Result Set Size**: Always calculate expected result size before running
2. **Memory Usage**: Large cross joins can consume significant memory
3. **Processing Time**: Exponential growth in processing time with table size
4. **Network Traffic**: Large result sets increase network overhead

**Optimization Strategies:**
```sql
-- Use LIMIT to test queries first
SELECT p.product_name, c.color_name
FROM products p
CROSS JOIN colors c
LIMIT 100;  -- Test with small result set first

-- Use WHERE clauses to reduce combinations
SELECT p.product_name, c.color_name
FROM products p
CROSS JOIN colors c
WHERE p.category = 'Shirts'
  AND c.price_adjustment <= 5.00;

-- Consider using EXISTS instead for existence checks
SELECT p.product_name
FROM products p
WHERE EXISTS (
    SELECT 1 FROM colors c 
    WHERE c.compatible_category = p.category
);
```
:::
`

## Best Practices & Guidelines

:::info
**DO's and DON'Ts:**

**DO's:**
- Calculate result set size before executing
- Use WHERE clauses to limit combinations
- Test with LIMIT first
- Use for legitimate business scenarios (combinations, templates, etc.)
- Consider alternatives like window functions or recursive CTEs

**DON'Ts:**
- Use CROSS JOIN when other joins are more appropriate
- Run unbounded CROSS JOINs on large tables
- Use for simple data lookup operations
- Forget to filter results when possible

**Good Practice Example:**
```sql
-- Responsible CROSS JOIN usage
SELECT 
    p.product_name,
    c.color_name,
    COUNT(*) OVER() AS total_combinations  -- Show total for reference
FROM products p
CROSS JOIN colors c
WHERE p.category = 'Customizable'     -- Limit to relevant products
  AND c.available = 1                 -- Only available colors
  AND p.launch_date <= CURRENT_DATE   -- Only launched products
LIMIT 1000;  -- Safety limit
```
:::



## Conclusion

CROSS JOIN is a specialized tool that creates Cartesian products of tables. While powerful for generating combinations and creating comprehensive datasets, it must be used carefully due to its potential for creating extremely large result sets. Understanding when and how to use CROSS JOIN effectively will help you solve complex business problems involving combinations, permutations, and complete data templates.

<GiscusComments/>