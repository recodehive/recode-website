---
id: pandas-introduction
title: Introduction to Pandas
sidebar_label: Pandas
description: Learn the basics of the Pandas Python library, including Series, DataFrame, data input/output, and basic data analysis, to kickstart your ML/DS workflow.
sidebar_position: 20
tags:
  [
    Python,
    Pandas,
    Data Analysis,
    DataFrame,
    Series,
    Python Library,
    Machine Learning,
    Data Science,
    Python Basics
  ]
slug: /python/pandas-introduction
---


# Introduction to Pandas

Pandas is one of the most essential libraries in the Python data ecosystem.  
It provides rich, high-level data structures and tools designed for fast and flexible data manipulation, analysis, and visualization.  

If you're working in **data science**, **machine learning**, or **analytics**, Pandas is your foundation for cleaning, transforming, and understanding data.  
It sits beautifully on top of **NumPy**, integrating seamlessly with other libraries like **Matplotlib**, **Seaborn**, and **Scikit-learn**.

---

## 1. Why Pandas?

Working with raw data in Python used to mean juggling lists, dictionaries, and loops.  
Pandas simplifies all that by introducing *two powerful data structures* — the **Series** and the **DataFrame** — that behave much like spreadsheet tables or SQL tables.

Some reasons Pandas is so popular:

- Handles large datasets efficiently.
- Provides built-in methods for aggregation, cleaning, and reshaping.
- Easily reads and writes data from multiple sources like CSV, Excel, JSON, and SQL.
- Integrates tightly with visualization and machine learning libraries.

---

## 2. Installation

If Pandas isn’t already installed, you can add it via pip:

```bash
pip install pandas
```

You can also install it with Anaconda (which includes Pandas by default):

```bash
conda install pandas
```

---

## 3. Core Data Structures

### Series

A **Series** is a one-dimensional labeled array. You can think of it as a single column in a spreadsheet.

```python
import pandas as pd

# Create a simple Series
s = pd.Series([100, 200, 300, 400])
print(s)
```

**Output:**
```
0    100
1    200
2    300
3    400
dtype: int64
```

Each element has an **index** (on the left) and a **value** (on the right).  
You can assign your own custom index too:

```python
s = pd.Series([10, 20, 30], index=['A', 'B', 'C'])
print(s['B'])  # Accessing by label → 20
```

---

### DataFrame

A **DataFrame** is a two-dimensional labeled data structure — essentially a table with rows and columns.

```python
data = {
    'Name': ['Alice', 'Bob', 'Charlie', 'David'],
    'Age': [25, 30, 35, 40],
    'City': ['Delhi', 'Mumbai', 'Chennai', 'Kolkata']
}

df = pd.DataFrame(data)
print(df)
```

**Output:**
```
      Name  Age     City
0    Alice   25    Delhi
1      Bob   30   Mumbai
2  Charlie   35  Chennai
3    David   40  Kolkata
```

Each column in a DataFrame is actually a Series.  
You can access them individually:

```python
df['Name']       # Access a column
df[['Name', 'Age']]  # Access multiple columns
df.loc[2]        # Access a row by label
df.iloc[0]       # Access a row by position
```

---

## 4. Reading and Writing Data (Input/Output)

One of Pandas’ greatest strengths is its ability to easily load data from many file formats.  
Here are some commonly used functions:

| Format | Read | Write |
|:--------|:------|:------|
| CSV | `pd.read_csv()` | `DataFrame.to_csv()` |
| Excel | `pd.read_excel()` | `DataFrame.to_excel()` |
| JSON | `pd.read_json()` | `DataFrame.to_json()` |
| SQL | `pd.read_sql()` | `DataFrame.to_sql()` |

### Example: CSV Files

```python
# Reading from a CSV file
df = pd.read_csv('employees.csv')

# Writing to a CSV file
df.to_csv('employees_cleaned.csv', index=False)
```

By default, Pandas assumes that the first row of your CSV file contains column names.  
You can customize this behavior with parameters like `header=None` or `names=[...]`.

---

## 5. Basic Data Exploration

Once your data is loaded into a DataFrame, Pandas provides a variety of methods for quick exploration.

```python
df.head()        # Displays the first 5 rows
df.tail()        # Displays the last 5 rows
df.shape         # Returns (rows, columns)
df.columns       # Lists all column names
df.dtypes        # Shows data types for each column
df.info()        # Summary: column names, types, nulls, memory usage
df.describe()    # Statistical summary of numeric columns
```

**Example:**
```python
print(df.describe())
```

**Output:**
```
             Age
count   4.000000
mean   32.500000
std     6.454972
min    25.000000
25%    28.750000
50%    32.500000
75%    36.250000
max    40.000000
```

---

## 6. Data Selection and Filtering

Pandas allows flexible data filtering using both labels and conditions.

```python
# Select a single column
df['Age']

# Select multiple columns
df[['Name', 'City']]

# Conditional filtering
df[df['Age'] > 30]

# Combining multiple conditions
df[(df['Age'] > 25) & (df['City'] == 'Delhi')]
```

You can also use `.loc[]` for label-based selection or `.iloc[]` for position-based selection:

```python
df.loc[1:3, ['Name', 'City']]
df.iloc[0:2, 0:2]
```

---

## 7. Data Cleaning Basics

Real-world data is messy. Pandas makes cleaning painless.

### Handling Missing Values

```python
df.isnull()         # Check for missing values
df.dropna()         # Drop rows with missing values
df.fillna(0)        # Fill missing values with a placeholder
```

### Renaming Columns

```python
df.rename(columns={'Name': 'Employee_Name'}, inplace=True)
```

### Changing Data Types

```python
df['Age'] = df['Age'].astype(float)
```

---

## 8. Sorting and Grouping

Sorting your data:
```python
df.sort_values(by='Age', ascending=False)
```

Grouping (e.g., aggregating data by a category):
```python
grouped = df.groupby('City')['Age'].mean()
print(grouped)
```

**Output:**
```
City
Chennai    35.0
Delhi      25.0
Kolkata    40.0
Mumbai     30.0
Name: Age, dtype: float64
```

---

## 9. Basic Data Analysis

Let’s see some quick examples of what you can do once your data is cleaned:

```python
# Mean age
df['Age'].mean()

# Count how many from each city
df['City'].value_counts()

# Filter and sort together
df[df['Age'] > 30].sort_values(by='Age', ascending=False)
```

---

## 10. Visualizing Data with Pandas

Pandas integrates with **Matplotlib**, allowing quick visualization directly from your DataFrame.

```python
import matplotlib.pyplot as plt

df['Age'].plot(kind='bar', title='Age Distribution')
plt.xlabel('Index')
plt.ylabel('Age')
plt.show()
```

For more advanced visualizations, you can use libraries like Seaborn or Plotly with your Pandas data.

---

## 11. Summary

Pandas provides a clean, efficient interface for everything from data cleaning to basic analysis.  
It’s one of the first libraries every data professional should master because it forms the backbone of nearly every ML and data science workflow in Python.

**Next Steps:**
- Explore advanced Pandas operations (merging, reshaping, pivoting)
- Learn how Pandas integrates with NumPy and visualization libraries
- Try using Pandas in a small data project — like analyzing a CSV dataset from Kaggle

---

**References:**
- [Official Pandas Documentation](https://pandas.pydata.org/)
- [10 Minutes to Pandas (Official Guide)](https://pandas.pydata.org/pandas-docs/stable/user_guide/10min.html)
- [Pandas API Reference](https://pandas.pydata.org/pandas-docs/stable/reference/index.html)
