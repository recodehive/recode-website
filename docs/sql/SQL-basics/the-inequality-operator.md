---
id: the-inequality-operator
title: The Inequality Operator
sidebar_label: The Inequality Operator
sidebar_position: 4
tags: [sql, database, queries, operators]
description: In this tutorial, you will learn about the inequality operator and comparison operators in SQL to filter data effectively.
---


# 📗 The Inequality Operator
The inequality operator (`<>` or `!=`) helps you find records that **don't match** a specific value. Think of it as asking "show me everything except this!"

Let's start with a simple example. Imagine you have a `students` table and want to find all students who are NOT in their first year:



    :::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"

| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Finding students not in year 1"
SELECT *
FROM students
WHERE year <> 1;

    ```

    </TabItem>
    
    <TabItem value="Output" label="Output">
| name     | year | major   |
| -------- | ---- | ------- |
| Lin Wong | 3    | Biology |

    </TabItem>
</Tabs>




### 📘 Let's Practice Together

  > Here's another way to look at it: the FROM clause tells SQL which table to look in, and WHERE tells it what to filter.


For example, consider a table named `students`. Let's see the same example again to reinforce the concept:



    :::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Selecting non-first-year students"
SELECT *
FROM students
WHERE year <> 1;
    ```

    </TabItem>
    
    <TabItem value="Output" label="Output">
| name     | year | major   |
|----------|------|---------|
| Lin Wong | 3    | Biology |
    </TabItem>
</Tabs>


:::



:::tip 💡 Quick Tip
The inequality operator is your "everything except" tool! It's perfect when you want to exclude specific values from your results. 

**What it works with:**
- Numbers: `age <> 25` (everyone except 25-year-olds)
- Text: `major <> 'Biology'` (all majors except Biology)  
- Dates: `signup_date <> '2024-01-01'` (all dates except New Year's Day)

Pro tip: Use this when you know what you DON'T want in your results!
:::

### 🔄 More Powerful Comparisons

**The Problem:** Sometimes you need more than just "equal" or "not equal." 

**Real-world scenario:** You're analyzing air quality data and want to find cities with low pollution levels (under 100 on the pollution index).

> **Good to know:** 
> - Numbers don't need quotes: `pollution_index < 100` ✅
> - Text needs quotes: `city = 'Tokyo'` ✅  
> - The `<` symbol means "less than" - just like in math!

Here's how to find cities with clean air (pollution index under 100):
    :::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Pollution"
| city     | pollution_index |
|----------|-----------------|
| Delhi    | 168             |
| Milano   | 122             |
| Shanghai | 74              |
| Tokyo    | 21              |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Finding cities with low pollution"
SELECT *
FROM pollution
WHERE pollution_index < 100;
    ```

    </TabItem>
    
    <TabItem value="Output" label="Output">
| city     | pollution_index |
|----------|-----------------|
| Shanghai | 74              |
| Tokyo    | 21              |

    </TabItem>
</Tabs>


:::

## 🧹 Including the Boundary Value

**What if we want cities with "acceptable" pollution levels?** Let's say anything 122 or below is acceptable.

The `<=` operator means "less than or equal to" - it includes the exact value too!


    :::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Pollution"
| city     | pollution_index |
|----------|-----------------|
| Delhi    | 168             |
| Milano   | 122             |
| Shanghai | 74              |
| Tokyo    | 21              |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Finding cities with moderate pollution"
SELECT *
FROM pollution
WHERE pollution_index <= 122;
    ```

    </TabItem>
    
    <TabItem value="Output" label="Output">
| city     | pollution_index |
|----------|-----------------|
| Milano   | 122             |
| Shanghai | 74              |
| Tokyo    | 21              |


    </TabItem>
</Tabs>


:::

## 🎯 Getting Only What You Need

**Smart tip:** You don't always need all the data! Sometimes you only want specific columns to make your results cleaner and easier to read.

**Example:** Instead of seeing all student info, maybe you just want names and years. 
> **Memory trick:** Think of `SELECT *` as "give me everything" and `SELECT name, year` as "just give me the basics" 

---

    :::info
<Tabs>
  <TabItem value="SQL Table" label="SQL Table">
```sql title="Students"
| name        | year | major   |
|-------------|------|---------|
| Ava Smith   | 1    | Biology |
| Luis Garcia | 1    | Physics |
| Lin Wong    | 3    | Biology |
```
  </TabItem>

<TabItem value="SQL Code" label="SQL Code">
  
  ```sql title="Just names and years of first-year students"
SELECT name, year
FROM students
WHERE year = 1;
    ```

    </TabItem>
    
    <TabItem value="Output" label="Output">
| name        | year |
| ----------- | ---- |
| Ava Smith   | 1    |
| Luis Garcia | 1    |



    </TabItem>
</Tabs>


:::


## 🎉 What You've Mastered

Great job! You've learned the essential skills for smart data filtering:

**🚫 The "Not Equal" Expert**  
You can now use `<>` and `!=` to exclude specific values and find everything except what you don't want.

**📊 The Comparison Pro**  
You've mastered `<`, `>`, `<=`, and `>=` for finding records above, below, or within specific ranges.

**🎯 The Precision Selector**  
You know how to pick just the columns you need instead of grabbing everything with `*`.

**🔍 The Smart Filterer**  
You can combine `WHERE` clauses with any operator to create laser-focused queries that find exactly what you're looking for.

**Next up:** Try combining these operators with `AND` and `OR` to create even more powerful searches!

---
