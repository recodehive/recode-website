# Data Input/Output

One of the greatest strengths of Pandas is its ability to effortlessly read data into and write data out of a DataFrame from various file formats. This is achieved primarily through the functions prefixed with `pd.read_` and the methods prefixed with `df.to_`.

## Reading Data into a DataFrame
To load data into a Pandas DataFrame, you use the appropriate `pd.read_...()` function. The most common input format is CSV.

|Function|File Type|Example Usage|
|:-------|:--------|:------------|
|`pd.read_csv()`|Comma-Separated Values (Text files)|`df = pd.read_csv('data.csv')`|
|`pd.read_excel()`|Microsoft Excel files|`df = pd.read_excel('data.xlsx')`|
|`pd.read_json()`|JavaScript Object Notation|`df = pd.read_json('data.json')`|
|`pd.read_sql()`|SQL database tables|`df = pd.read_sql(query, connection)`|


**Example**: Reading a CSV File

The `read_csv()` function is highly flexible, supporting parameters to handle delimiters, missing values, and specific column selection.

```Python
# Load data from a CSV file into a DataFrame
df_sales = pd.read_csv('sales_data.csv')
```

## Writing Data from a DataFrame

After you've cleaned, transformed, or analyzed your data, you'll use a `.to_...()` method on the DataFrame object to save the results.

|Method|File Type|Example Usage|
|:-----|:--------|:------------|
|`df.to_csv()`|Comma-Separated Values|`df.to_csv('cleaned_data.csv', index=False)`|
|`df.to_excel()`|Microsoft Excel files|`df.to_excel('analysis.xlsx', sheet_name='Summary')`|
|`df.to_json()`|JavaScript Object Notation|`df.to_json('data_output.json')`|


**Example**: Writing to a CSV File

When writing to a CSV, it is best practice to use `index=False` to prevent the DataFrame's row indices (the 0, 1, 2, ... numbers) from being saved as an unnecessary extra column in the file.

```Python
# index=False ensures the row index is NOT included in the file
df_sales.to_csv('processed_sales.csv', index=False)
```