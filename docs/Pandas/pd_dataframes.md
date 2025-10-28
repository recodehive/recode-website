## Key Data Structures: Series and DataFrame

Pandas introduces two primary data structures: the Series and the DataFrame. Understanding these is crucial, as they form the basis of nearly all operations in the library.

## The Series (1D)

A Series is a one-dimensional labeled array capable of holding any data type (integers, strings, floats, Python objects, etc). You can think of a Series as a single column in a spreadsheet or a single vector in a dataset.

***Key components***:

**Data**: The actual values stored.

**Index** (Label): The labels used to access the data.

Creating a Series

```Python
import pandas as pd

# Creating a Series from a list
data = [10, 20, 30, 40]
s = pd.Series(data, name='Example_Series')
print(s)
```

Output:
```Python
0    10    <-- Index (Default integer)
1    20
2    30
3    40
Name: Example_Series, dtype: int64
```

## The DataFrame (2D)

A DataFrame is a two-dimensional, size-mutable, and potentially heterogeneous tabular data structure. It is the most common object you will work with in Pandas and is analogous to a complete spreadsheet or a table in a database.

***Key components***:

**Data**: The actual values arranged in rows and columns.

**Rows Index**: Labels for each row.

**Column Index**: Labels for each column (the column names).

Creating a DataFrame
The most common way to create a DataFrame is from a Python dictionary, where the keys become the column names.

```Python
# Creating a DataFrame from a dictionary
data = {
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 22],
    'City': ['New York', 'London', 'Paris']
}

df = pd.DataFrame(data)

print(df)
```

Output:
```Python
       Name  Age      City
0     Alice   25  New York  <-- Row Index
1       Bob   30    London
2   Charlie   22     Paris
^-- Column Names/Index
```