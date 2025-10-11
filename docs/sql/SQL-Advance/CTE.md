---
id: common-table-expressions
title: SQL Common Table Expressions (CTEs)
sidebar_label: CTEs (WITH Clause)
sidebar_position: 2
tags:
  [
    sql,
    cte,
    common table expressions,
    with clause,
    recursive cte,
    sql tutorial,
    subqueries,
    database queries,
    query optimization,
  ]
description: Learn about SQL Common Table Expressions (CTEs), how to use the WITH clause, recursive CTEs, syntax, examples, and best practices for writing cleaner, more maintainable queries.
---

## What are Common Table Expressions (CTEs)?

SQL **Common Table Expressions (CTEs)** are temporary named result sets that exist only during the execution of a single query. Defined using the `WITH` clause, CTEs make complex queries more readable and maintainable by breaking them into logical, named components that can be referenced multiple times within the main query.

:::note
**Key Characteristics of CTEs:**

- **Temporary & Named**: Creates a named result set that exists only for the query duration.

- **Improved Readability**: Makes complex queries easier to understand and maintain.

- **Reusable**: Can be referenced multiple times in the same query without recalculation.

- **Recursive Capable**: Supports recursive queries for hierarchical data structures.

- **No Storage Overhead**: Doesn't create physical tables, only logical references.
:::


:::success
**When to Use CTEs:**

- **Complex Subqueries**: Replace nested subqueries with readable named expressions
- **Multiple References**: When you need to reference the same result set multiple times
- **Hierarchical Data**: Traverse organizational charts, category trees, bill of materials
- **Step-by-Step Logic**: Break down complex calculations into logical steps
- **Recursive Operations**: Process parent-child relationships of unknown depth

**Real-World Example:**
Instead of writing deeply nested subqueries to calculate monthly sales rankings, use CTEs to first calculate monthly totals, then calculate rankings, then filter top performers - each step clearly named and easy to understand.
:::

:::warning
**⚠️ Important Considerations:**

- **Scope**: CTEs only exist within the statement where they're defined
- **Not Materialized**: Results aren't stored; may be recalculated if referenced multiple times
- **Database Support**: Supported in PostgreSQL, SQL Server, MySQL 8.0+, Oracle, DB2
- **Performance**: May not always be faster than alternatives; test with actual data
- **Recursion Limits**: Recursive CTEs have depth limits (varies by database)
:::

:::info 

## Basic CTE Syntax

```sql
-- Single CTE
WITH cte_name AS (
    SELECT column1, column2, ...
    FROM table_name
    WHERE condition
)
SELECT *
FROM cte_name;
```
```sql
-- Multiple CTEs
WITH 
cte1 AS (
    SELECT ... FROM table1
),
cte2 AS (
    SELECT ... FROM cte1  -- Can reference previous CTEs
),
cte3 AS (
    SELECT ... FROM table2
)
SELECT *
FROM cte1
JOIN cte2 ON cte1.id = cte2.id
JOIN cte3 ON cte2.id = cte3.id;
```

| **Component** | **Purpose** | **Example** |
|---------------|-------------|-------------|
| WITH | Starts CTE definition | `WITH sales_summary AS` |
| CTE Name | Names the temporary result set | `monthly_totals` |
| AS | Separates name from query | `AS (SELECT ...)` |
| SELECT | Defines the CTE query | `SELECT customer_id, SUM(amount)` |
| Main Query | Uses the CTE | `SELECT * FROM monthly_totals` |

## CTE vs Subquery vs Temp Table

| **Feature** | **CTE** | **Subquery** | **Temp Table** |
|-------------|---------|--------------|----------------|
| Readability | Excellent | Poor (nested) | Good |
| Reusability | Yes (in same query) | No | Yes (in session) |
| Performance | Good | Good | Varies |
| Recursion | Yes | No | No |
| Scope | Single statement | Single reference | Session |
| Storage | None | None | Physical |

:::

## Practical Examples

    <Tabs>
      <TabItem value="Basic CTE">
       ```sql
       -- Get total spending per customer
       -- Think of CTE as creating a summary table first, then using it
       
       WITH customer_totals AS (
           SELECT 
               customer_id,
               SUM(total_amount) AS total_spent,
               COUNT(*) AS order_count
           FROM orders
           GROUP BY customer_id
       )
       SELECT 
           c.customer_name,
           ct.total_spent,
           ct.order_count
       FROM customers c
       JOIN customer_totals ct ON c.customer_id = ct.customer_id
       WHERE ct.total_spent > 1000
       ORDER BY ct.total_spent DESC;
       
       -- Why use CTE here? 
       -- 1. Makes the query easier to read
       -- 2. Separates the calculation from the final selection
       ```
       </TabItem>
       <TabItem value="Multiple CTEs">
       ```sql
       -- Calculate customer categories step by step
       
       WITH 
       -- Step 1: Get order totals for each customer
       order_summary AS (
           SELECT 
               customer_id,
               COUNT(*) AS total_orders,
               SUM(total_amount) AS total_spent
           FROM orders
           GROUP BY customer_id
       ),
       -- Step 2: Categorize customers based on spending
       customer_categories AS (
           SELECT 
               customer_id,
               total_orders,
               total_spent,
               CASE 
                   WHEN total_spent > 5000 THEN 'VIP'
                   WHEN total_spent > 1000 THEN 'Regular'
                   ELSE 'Occasional'
               END AS category
           FROM order_summary
       )
       -- Step 3: Get the final result with customer names
       SELECT 
           c.customer_name,
           cc.category,
           cc.total_orders,
           cc.total_spent
       FROM customers c
       JOIN customer_categories cc ON c.customer_id = cc.customer_id
       ORDER BY cc.total_spent DESC;
       
       -- This breaks down a complex query into simple, logical steps
       ```
       </TabItem>
       <TabItem value="Replacing Subquery">
       ```sql
       -- WITHOUT CTE (harder to read)
       SELECT 
           c.customer_name,
           (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.customer_id) AS order_count,
           (SELECT SUM(total_amount) FROM orders o WHERE o.customer_id = c.customer_id) AS total_spent
       FROM customers c;
       
       -- WITH CTE (much clearer)
       WITH customer_stats AS (
           SELECT 
               customer_id,
               COUNT(*) AS order_count,
               SUM(total_amount) AS total_spent
           FROM orders
           GROUP BY customer_id
       )
       SELECT 
           c.customer_name,
           cs.order_count,
           cs.total_spent
       FROM customers c
       LEFT JOIN customer_stats cs ON c.customer_id = cs.customer_id;
       
       -- The CTE version is easier to understand and maintain
       ```
       </TabItem>
      <TabItem value="Recursive CTE - Simple">
       ```sql
       -- Find employee and their manager chain
       -- Recursive CTE keeps going until it reaches the top (CEO)
       
       WITH RECURSIVE employee_chain AS (
           -- Start with one employee
           SELECT 
               employee_id,
               employee_name,
               manager_id,
               1 AS level
           FROM employees
           WHERE employee_id = 101  -- Start with employee 101
           
           UNION ALL
           
           -- Keep finding their managers
           SELECT 
               e.employee_id,
               e.employee_name,
               e.manager_id,
               ec.level + 1
           FROM employees e
           JOIN employee_chain ec ON e.employee_id = ec.manager_id
       )
       SELECT 
           employee_name,
           level,
           CASE WHEN level = 1 THEN 'You' 
                WHEN level = 2 THEN 'Your Manager'
                WHEN level = 3 THEN 'Your Manager\'s Manager'
                ELSE 'Upper Management'
           END AS relationship
       FROM employee_chain
       ORDER BY level;
       
       -- Shows the reporting chain: You -> Your Boss -> Their Boss -> etc.
       ```
       </TabItem>
      <TabItem value="Recursive CTE - Numbers">
       ```sql
       -- Generate a list of numbers from 1 to 10
       -- Useful for creating reports with all months, even if no data
       
       WITH RECURSIVE numbers AS (
           -- Start with 1
           SELECT 1 AS num
           
           UNION ALL
           
           -- Add 1 each time until we reach 10
           SELECT num + 1
           FROM numbers
           WHERE num < 10
       )
       SELECT num AS month_number
       FROM numbers;
       
       -- Result: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10
       -- You can then join this with your sales data to show all months
       ```
       </TabItem>
      <TabItem value="Finding Gaps">
       ```sql
       -- Find customers who haven't ordered in the last 30 days
       
       WITH recent_orders AS (
           SELECT DISTINCT customer_id
           FROM orders
           WHERE order_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
       )
       SELECT 
           c.customer_id,
           c.customer_name,
           c.email
       FROM customers c
       LEFT JOIN recent_orders ro ON c.customer_id = ro.customer_id
       WHERE ro.customer_id IS NULL  -- No recent orders
       ORDER BY c.customer_name;
       
       -- Perfect for finding inactive customers for marketing campaigns
       ```
       </TabItem>
       <TabItem value="Sample Output">
       ```plaintext
       -- Sample result for basic CTE example:
       
       customer_name    | total_spent | order_count
       -----------------|-------------|-------------
       John Smith       | 5,250.00    | 12
       Sarah Johnson    | 3,890.50    | 8
       Mike Williams    | 2,100.75    | 5
       Emily Davis      | 1,450.00    | 3
       
       -- Only customers who spent more than $1000 are shown
       -- Data is sorted by total spending (highest first)
       
       
       -- Sample result for recursive employee chain:
       
       employee_name    | level | relationship
       -----------------|-------|---------------------------
       Bob Smith        | 1     | You
       Alice Johnson    | 2     | Your Manager
       Carol White      | 3     | Your Manager's Manager
       David CEO        | 4     | Upper Management
       
       -- Shows the complete reporting chain from employee to CEO
       ```
       </TabItem>
    </Tabs>

## Advanced CTE Patterns

:::tip
**Complex Scenarios:**

1. **Running Totals with CTEs**:
   ```sql
   WITH daily_revenue AS (
       SELECT 
           DATE(order_date) AS order_day,
           SUM(total_amount) AS daily_total
       FROM orders
       WHERE YEAR(order_date) = 2024
       GROUP BY DATE(order_date)
   )
   SELECT 
       order_day,
       daily_total,
       SUM(daily_total) OVER (ORDER BY order_day) AS running_total,
       AVG(daily_total) OVER (
           ORDER BY order_day 
           ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
       ) AS seven_day_avg
   FROM daily_revenue
   ORDER BY order_day;
   ```

2. **CTEs with Window Functions**:
   ```sql
   WITH product_sales AS (
       SELECT 
           product_id,
           category,
           SUM(quantity) AS units_sold,
           SUM(quantity * unit_price) AS revenue
       FROM order_items
       GROUP BY product_id, category
   )
   SELECT 
       product_id,
       category,
       revenue,
       RANK() OVER (PARTITION BY category ORDER BY revenue DESC) AS category_rank,
       ROUND(revenue / SUM(revenue) OVER (PARTITION BY category) * 100, 2) AS category_percentage,
       ROUND(revenue / SUM(revenue) OVER () * 100, 2) AS total_percentage
   FROM product_sales
   ORDER BY category, category_rank;
   ```

3. **Chained CTEs for Complex Calculations**:
   ```sql
   WITH 
   base_metrics AS (
       SELECT product_id, SUM(revenue) AS total_revenue
       FROM sales GROUP BY product_id
   ),
   growth_metrics AS (
       SELECT product_id, total_revenue,
              LAG(total_revenue) OVER (ORDER BY product_id) AS prev_revenue
       FROM base_metrics
   ),
   final_metrics AS (
       SELECT product_id, total_revenue,
              (total_revenue - prev_revenue) / NULLIF(prev_revenue, 0) * 100 AS growth_rate
       FROM growth_metrics
   )
   SELECT * FROM final_metrics WHERE growth_rate > 10;
   ```
:::

## Recursive CTE Deep Dive

:::info
**Understanding Recursive CTEs:**

Recursive CTEs have two parts:
1. **Anchor Member**: Initial query that doesn't reference the CTE
2. **Recursive Member**: Query that references the CTE itself

```sql
WITH RECURSIVE cte_name AS (
    -- Anchor member (executed once)
    SELECT initial_data
    FROM base_table
    WHERE starting_condition
    
    UNION ALL
    
    -- Recursive member (executed repeatedly)
    SELECT next_data
    FROM base_table
    INNER JOIN cte_name ON join_condition
    WHERE termination_condition
)
SELECT * FROM cte_name;
```

**Key Points:**
- Always include a termination condition to prevent infinite loops
- Use `UNION ALL` (not `UNION`) for better performance
- Most databases have maximum recursion depth limits
- Great for hierarchies, graphs, and tree structures
:::

**Common Recursive Patterns:**

1. **Bill of Materials (BOM)**:
   ```sql
   WITH RECURSIVE parts_explosion AS (
       -- Anchor: Top-level product
       SELECT 
           product_id,
           component_id,
           quantity,
           1 AS level,
           CAST(product_id AS VARCHAR(1000)) AS path
       FROM product_components
       WHERE product_id = 'BIKE-001'
       
       UNION ALL
       
       -- Recursive: Sub-components
       SELECT 
           pc.product_id,
           pc.component_id,
           pe.quantity * pc.quantity,
           pe.level + 1,
           CONCAT(pe.path, ' > ', pc.product_id)
       FROM product_components pc
       INNER JOIN parts_explosion pe ON pc.product_id = pe.component_id
       WHERE pe.level < 5
   )
   SELECT * FROM parts_explosion;
   ```

2. **Category Tree Navigation**:
   ```sql
   WITH RECURSIVE category_tree AS (
       -- Root categories
       SELECT 
           category_id,
           category_name,
           parent_category_id,
           1 AS depth,
           category_name AS full_path
       FROM categories
       WHERE parent_category_id IS NULL
       
       UNION ALL
       
       -- Child categories
       SELECT 
           c.category_id,
           c.category_name,
           c.parent_category_id,
           ct.depth + 1,
           CONCAT(ct.full_path, ' / ', c.category_name)
       FROM categories c
       INNER JOIN category_tree ct ON c.parent_category_id = ct.category_id
   )
   SELECT * FROM category_tree ORDER BY full_path;
   ```

## Performance & Optimization

:::tip
**Performance Considerations:**

1. **CTE Materialization**: Some databases materialize CTEs, others don't
2. **Multiple References**: Referencing a CTE multiple times may cause recalculation
3. **Indexing**: Ensure base tables have proper indexes
4. **Recursion Depth**: Deep recursion can be expensive
5. **Row Count**: Large CTEs can impact memory usage

**Optimization Strategies:**
```sql
-- Add early filtering in CTEs
WITH filtered_orders AS (
    SELECT *
    FROM orders
    WHERE order_date >= '2024-01-01'  -- Filter early
      AND status = 'Completed'
    -- This runs once, reducing data for subsequent operations
)
SELECT * FROM filtered_orders;
```
```sql
-- Use indexes on CTE join columns
CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);

```
:::

## CTE vs Alternatives: When to Use What

| **Scenario** | **Best Choice** | **Reason** |
|--------------|-----------------|------------|
| Complex multi-step logic | CTE | Readability and maintainability |
| Single use subquery | Subquery | Simpler, less overhead |
| Used across multiple queries | View | Reusable definition |
| Large intermediate results | Temp Table | Better performance with indexes |
| Hierarchical data | Recursive CTE | Only option for recursion |
| Simple filtering | WHERE clause | Direct and efficient |

## Best Practices & Guidelines

:::info
**DO's:**
- Use descriptive CTE names that explain the data they contain
- Break complex logic into multiple CTEs for clarity
- Add comments explaining business logic
- Filter data early in the CTE chain
- Use CTEs to replace deeply nested subqueries
- Test recursive CTEs with depth limits

**DON'Ts:**
- Don't create overly complex CTE chains (keep it under 5-6 levels)
- Don't use CTEs when a simple subquery suffices
- Don't forget termination conditions in recursive CTEs
- Don't assume CTEs are always faster than alternatives
- Don't reference the same CTE dozens of times (consider temp tables)

**Good Practice Example:**
```sql
-- Well-structured CTE with clear purpose and comments
WITH 
-- Calculate base metrics for active customers only
active_customers AS (
    SELECT customer_id, customer_name, email
    FROM customers
    WHERE status = 'Active' 
      AND registration_date >= '2023-01-01'
),
-- Aggregate order data for these customers
customer_spending AS (
    SELECT 
        ac.customer_id,
        ac.customer_name,
        COUNT(o.order_id) AS order_count,
        SUM(o.total_amount) AS total_spent
    FROM active_customers ac
    LEFT JOIN orders o ON ac.customer_id = o.customer_id
    WHERE o.order_date >= '2024-01-01'
    GROUP BY ac.customer_id, ac.customer_name
)
-- Final output with segmentation
SELECT 
    customer_name,
    order_count,
    total_spent,
    CASE 
        WHEN total_spent > 5000 THEN 'Premium'
        WHEN total_spent > 1000 THEN 'Standard'
        ELSE 'Basic'
    END AS segment
FROM customer_spending
WHERE order_count > 0
ORDER BY total_spent DESC;
```
:::


## Conclusion

Common Table Expressions are one of the most powerful features in modern SQL for writing clean, maintainable queries. They shine when you need to break down complex logic into understandable steps, work with hierarchical data, or eliminate repetitive subqueries. While not always the fastest option, their benefits in code clarity and maintainability often outweigh minor performance differences. Master CTEs, and you'll find yourself writing better SQL that your future self (and colleagues) will thank you for.

<GiscusComments/>