---
id: window-functions
title: SQL Window Functions - Complete Guide
sidebar_label: Window Functions
sidebar_position: 1
tags:
  [
    sql,
    window functions,
    over clause,
    partition by,
    row_number,
    rank,
    dense_rank,
    lag,
    lead,
    analytics,
    sql tutorial,
  ]
description: Master SQL Window Functions with practical examples. Learn ROW_NUMBER, RANK, LAG, LEAD, and more for powerful data analysis without grouping.
---

## What are Window Functions?

SQL **Window Functions** perform calculations across a set of rows that are related to the current row, but unlike GROUP BY, they don't collapse rows into a single output. Think of them as "looking through a window" at related rows while keeping all individual rows intact.

:::note
**Key Characteristics of Window Functions:**

- **No Row Reduction**: Unlike GROUP BY, every row remains in the result set.

- **Contextual Calculations**: Perform calculations based on a "window" of related rows.

- **OVER Clause**: The signature syntax that defines the window of rows.

- **Powerful Analytics**: Perfect for rankings, running totals, comparisons, and trends.
:::

:::success
**Why Window Functions are Game-Changers:**

Imagine you have a sales table and want to:
- Show each sale alongside the total sales for that month
- Rank salespeople by performance within each region
- Compare each day's sales to the previous day
- Calculate a running total of revenue

Without window functions, you'd need complex subqueries or multiple joins. Window functions make these tasks simple and elegant!

**Real-World Example:**
A sales manager wants to see each salesperson's individual sales while also showing their rank within their region and the regional average - all in one query. Window functions make this trivial.
:::

:::info 

## Basic Window Function Syntax

```sql
SELECT 
    column1,
    column2,
    WINDOW_FUNCTION() OVER (
        [PARTITION BY partition_column]
        [ORDER BY sort_column]
        [ROWS/RANGE frame_specification]
    ) AS result_column
FROM table_name;
```

| **Component** | **Purpose** | **Required?** |
|---------------|-------------|---------------|
| WINDOW_FUNCTION | The calculation to perform | Yes |
| OVER | Defines the window | Yes |
| PARTITION BY | Groups rows into partitions | Optional |
| ORDER BY | Orders rows within partitions | Optional* |
| ROWS/RANGE | Defines frame boundaries | Optional |

*Required for some functions like ROW_NUMBER, RANK, LAG, LEAD

## The OVER Clause - Your Window Control Panel

```sql
-- Simple window: entire table
SUM(amount) OVER ()

-- Partitioned window: separate calculations per group
SUM(amount) OVER (PARTITION BY department)

-- Ordered window: enables ranking and sequential functions
ROW_NUMBER() OVER (ORDER BY sales DESC)

-- Complete window: partition + order + frame
SUM(amount) OVER (
    PARTITION BY department 
    ORDER BY sale_date 
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
)
```

:::

## Essential Window Functions

    <Tabs>
      <TabItem value="ROW_NUMBER">
       ```sql
       -- Assign unique sequential numbers to rows
       SELECT 
           employee_name,
           department,
           salary,
           ROW_NUMBER() OVER (ORDER BY salary DESC) AS overall_rank,
           ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
       FROM employees;
       
       -- Result: Every row gets a unique number
       -- Perfect for: Pagination, removing duplicates, creating unique IDs
       
       -- Practical use: Top 3 earners per department
       WITH ranked AS (
           SELECT *,
                  ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
           FROM employees
       )
       SELECT employee_name, department, salary
       FROM ranked
       WHERE rn <= 3;
       ```
       </TabItem>
       <TabItem value="RANK & DENSE_RANK">
       ```sql
       -- RANK: Gives same rank for ties, skips numbers
       -- DENSE_RANK: Gives same rank for ties, no gaps
       
       SELECT 
           student_name,
           test_score,
           RANK() OVER (ORDER BY test_score DESC) AS rank,
           DENSE_RANK() OVER (ORDER BY test_score DESC) AS dense_rank,
           ROW_NUMBER() OVER (ORDER BY test_score DESC) AS row_num
       FROM test_results;
       
       -- Example output:
       -- Name    Score  RANK  DENSE_RANK  ROW_NUMBER
       -- Alice   95     1     1           1
       -- Bob     95     1     1           2  <- RANK skips 2, DENSE_RANK doesn't
       -- Carol   90     3     2           3
       -- Dave    90     3     2           4
       -- Eve     85     5     3           5
       
       -- Use RANK for: Competition rankings with ties
       -- Use DENSE_RANK for: Category rankings without gaps
       -- Use ROW_NUMBER for: Unique sequential numbering
       ```
       </TabItem>
       <TabItem value="LAG & LEAD">
       ```sql
       -- LAG: Look at previous row
       -- LEAD: Look at next row
       
       SELECT 
           sale_date,
           daily_sales,
           LAG(daily_sales, 1) OVER (ORDER BY sale_date) AS yesterday_sales,
           LEAD(daily_sales, 1) OVER (ORDER BY sale_date) AS tomorrow_sales,
           daily_sales - LAG(daily_sales, 1) OVER (ORDER BY sale_date) AS change_from_yesterday,
           ROUND(
               ((daily_sales - LAG(daily_sales, 1) OVER (ORDER BY sale_date)) / 
                LAG(daily_sales, 1) OVER (ORDER BY sale_date)) * 100, 
               2
           ) AS percent_change
       FROM daily_sales
       WHERE sale_date >= '2024-01-01'
       ORDER BY sale_date;
       
       -- Perfect for: Comparing consecutive records, trend analysis
       -- LAG(column, n, default) - n rows back, default if NULL
       -- LEAD(column, n, default) - n rows forward, default if NULL
       ```
       </TabItem>
      <TabItem value="SUM, AVG, COUNT">
       ```sql
       -- Running totals and moving averages
       
       SELECT 
           order_date,
           order_amount,
           customer_id,
           -- Running total for each customer
           SUM(order_amount) OVER (
               PARTITION BY customer_id 
               ORDER BY order_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
           ) AS running_total,
           
           -- Overall average across all orders
           AVG(order_amount) OVER () AS overall_avg,
           
           -- Customer's average up to this point
           AVG(order_amount) OVER (
               PARTITION BY customer_id 
               ORDER BY order_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
           ) AS customer_running_avg,
           
           -- 3-day moving average
           AVG(order_amount) OVER (
               ORDER BY order_date
               ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
           ) AS moving_avg_3day,
           
           -- Count orders per customer up to this point
           COUNT(*) OVER (
               PARTITION BY customer_id 
               ORDER BY order_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
           ) AS order_number
       FROM orders
       ORDER BY customer_id, order_date;
       ```
       </TabItem>
      <TabItem value="FIRST_VALUE & LAST_VALUE">
       ```sql
       -- Access first or last value in window
       
       SELECT 
           employee_name,
           department,
           hire_date,
           salary,
           -- First person hired in department
           FIRST_VALUE(employee_name) OVER (
               PARTITION BY department 
               ORDER BY hire_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
           ) AS first_hire,
           
           -- Highest salary in department
           FIRST_VALUE(salary) OVER (
               PARTITION BY department 
               ORDER BY salary DESC
               ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
           ) AS highest_dept_salary,
           
           -- Most recent hire in department
           LAST_VALUE(employee_name) OVER (
               PARTITION BY department 
               ORDER BY hire_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
           ) AS most_recent_hire,
           
           -- Compare salary to highest in department
           salary - FIRST_VALUE(salary) OVER (
               PARTITION BY department 
               ORDER BY salary DESC
               ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
           ) AS salary_gap_from_top
       FROM employees;
       
       -- Note: UNBOUNDED FOLLOWING is crucial for LAST_VALUE
       -- Without it, "last" means "current row"!
       ```
       </TabItem>
      <TabItem value="NTILE">
       ```sql
       -- Divide rows into N roughly equal groups
       
       SELECT 
           product_name,
           price,
           NTILE(4) OVER (ORDER BY price) AS price_quartile,
           NTILE(10) OVER (ORDER BY price) AS price_decile,
           CASE NTILE(3) OVER (ORDER BY price)
               WHEN 1 THEN 'Budget'
               WHEN 2 THEN 'Mid-Range'
               WHEN 3 THEN 'Premium'
           END AS price_category
       FROM products;
       
       -- Perfect for: Creating equal-sized groups, customer segmentation
       -- Each group gets (total_rows / N) or (total_rows / N) + 1 rows
       
       -- Practical: Customer segmentation by purchase history
       WITH customer_metrics AS (
           SELECT 
               customer_id,
               COUNT(*) AS total_orders,
               SUM(order_amount) AS total_spent
           FROM orders
           GROUP BY customer_id
       )
       SELECT 
           customer_id,
           total_spent,
           NTILE(4) OVER (ORDER BY total_spent DESC) AS value_quartile,
           CASE NTILE(4) OVER (ORDER BY total_spent DESC)
               WHEN 1 THEN 'VIP - Top 25%'
               WHEN 2 THEN 'High Value - 26-50%'
               WHEN 3 THEN 'Regular - 51-75%'
               WHEN 4 THEN 'Occasional - Bottom 25%'
           END AS customer_segment
       FROM customer_metrics;
       ```
       </TabItem>
    </Tabs>

## Understanding PARTITION BY

Think of PARTITION BY as creating separate "mini-tables" within your result set. Calculations reset for each partition.

```sql
-- Without PARTITION BY: One ranking across entire table
SELECT 
    employee_name,
    department,
    salary,
    RANK() OVER (ORDER BY salary DESC) AS company_rank
FROM employees;

-- With PARTITION BY: Separate rankings per department
SELECT 
    employee_name,
    department,
    salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM employees;
```

:::tip
**PARTITION BY Best Practices:**

- Use when you want separate calculations per group
- Can partition by multiple columns: `PARTITION BY region, department`
- Think of it as "invisible GROUP BY" - groups data without collapsing rows
- Each partition is processed independently
:::

## Frame Specifications - Defining Your Window

Frame specifications define which rows are included in the calculation.

```sql
-- Frame clause syntax
ROWS BETWEEN start_boundary AND end_boundary

-- Common frame specifications:
UNBOUNDED PRECEDING     -- From the first row of partition
UNBOUNDED FOLLOWING     -- To the last row of partition
CURRENT ROW            -- The current row
N PRECEDING            -- N rows before current
N FOLLOWING            -- N rows after current
```

    <Tabs>
      <TabItem value="Running Totals">
       ```sql
       -- Running total: Sum from start to current row
       SELECT 
           order_date,
           amount,
           SUM(amount) OVER (
               ORDER BY order_date
               ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
           ) AS running_total
       FROM orders;
       
       -- Shorthand (same result):
       SUM(amount) OVER (ORDER BY order_date)
       ```
       </TabItem>
       <TabItem value="Moving Averages">
       ```sql
       -- 7-day moving average
       SELECT 
           sale_date,
           daily_sales,
           AVG(daily_sales) OVER (
               ORDER BY sale_date
               ROWS BETWEEN 6 PRECEDING AND CURRENT ROW
           ) AS moving_avg_7day
       FROM daily_sales;
       
       -- Centered moving average (3 days: before, current, after)
       SELECT 
           sale_date,
           daily_sales,
           AVG(daily_sales) OVER (
               ORDER BY sale_date
               ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING
           ) AS centered_avg_3day
       FROM daily_sales;
       ```
       </TabItem>
       <TabItem value="Complete Window">
       ```sql
       -- Calculate percentage of total within each group
       SELECT 
           department,
           employee_name,
           salary,
           SUM(salary) OVER (
               PARTITION BY department
               ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
           ) AS dept_total_salary,
           ROUND(
               salary * 100.0 / SUM(salary) OVER (
                   PARTITION BY department
                   ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
               ),
               2
           ) AS percent_of_dept_payroll
       FROM employees;
       ```
       </TabItem>
    </Tabs>


## Window Functions Quick Reference

| Function | Purpose | Common Use Case |
|----------|---------|----------------|
| `ROW_NUMBER()` | Unique sequential number | Pagination, removing duplicates |
| `RANK()` | Ranking with gaps | Competition standings |
| `DENSE_RANK()` | Ranking without gaps | Category rankings |
| `NTILE(n)` | Divide into n groups | Customer segmentation |
| `LAG()` | Previous row value | Period-over-period comparison |
| `LEAD()` | Next row value | Forecasting, trend analysis |
| `FIRST_VALUE()` | First value in window | Baseline comparison |
| `LAST_VALUE()` | Last value in window | Final value comparison |
| `SUM()` | Running/windowed total | Cumulative sales |
| `AVG()` | Moving/windowed average | Smoothing trends |
| `COUNT()` | Windowed count | Running count |
| `MIN()`/`MAX()` | Windowed extremes | Range analysis |

## Practice Problems

Try these on your own to master window functions:

1. **Find the top 3 products by revenue in each category**
2. **Calculate each employee's salary as a percentage of their department total**
3. **Show month-over-month growth rate for sales**
4. **Identify customers whose last 3 purchases were all above $100**
5. **Find products that consistently rank in top 10 for 90 consecutive days**

## Conclusion

Window functions are incredibly powerful tools that transform how you analyze data in SQL. They allow you to perform complex analytics that would otherwise require multiple queries, subqueries, or even application-level processing. 

Start with simple examples like `ROW_NUMBER()` and `SUM() OVER()`, then gradually incorporate partitioning, frames, and more advanced functions. With practice, window functions will become your go-to solution for sophisticated data analysis.

**Remember:**
- Window functions keep all rows (unlike GROUP BY)
- The OVER clause defines your window
- PARTITION BY creates separate calculations per group
- ORDER BY is crucial for sequential functions
- Frame specifications control which rows are included

Happy querying! 🚀

<GiscusComments/>