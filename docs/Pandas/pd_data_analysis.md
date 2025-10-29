# Basic Data Analysis

Once you have loaded your data into a DataFrame, Pandas offers simple and powerful methods for quickly exploring and summarizing your data, which is the core of any Data Science workflow.

1. **Inspecting the Data**

Before performing any analysis, you must first understand the structure and quality of your dataset.
This step helps identify data types, missing values, and potential anomalies.

|Method|Description|
|:-----|:----------|
|`df.head()`|Displays the first n rows (default 5) for a quick look at the data.|
|`df.tail()`|Displays the last n rows (default 5).|
|`df.info()`|Shows column data types, non-null counts, and memory usage.|
|`df.describe()`|Generates summary statistics for numeric columns.|
|`df.shape`|Returns a tuple (rows, columns).|
|`df.dtypes`|Displays data types of all columns.|


2. **Handling Missing Data (NaN)**

Real-world data often has missing or incomplete entries.
Handling them correctly is essential to avoid biased or invalid results.

|Method|Description|
|:-----|:----------|
|`df.isnull().sum()`|Counts missing (NaN) values per column.|
|`df.dropna()`|Removes rows with missing values.|
|`df.fillna(value)`|Fills missing values with a specific value.|
|`df.fillna(df.mean())`|Fills missing values with the mean (for numeric columns).|


3. **Data Selection and Filtering**

Once the data is clean, you often need to focus on specific rows or columns to analyze relevant subsets.

|Method|Description|
|:-----|:----------|
|`df['col']`|Selects a single column (returns a Series).|
|`df[['col1','col2']]`|Selects multiple columns.|
|`df.loc[row_labels, col_labels]`|Selects by label (rows and columns).|
|`df.iloc[row_index, col_index]`|Selects by integer index position.|
|`df[df['col'] > value]`|Filters rows based on a condition.|


4. **Grouping and Aggregation**

After filtering, you often need to summarize or compare groups within your data.

|Method|Description|
|:-----|:----------|
|`df.groupby('col').agg()`|Groups data by the specified column, then applies an aggregate function (e.g., `mean()`, `sum()`, `count()`).|
|`df.describe()`|Generates descriptive statistics (mean, std, min, max, etc.) for numerical columns.|
|`df['col'].value_counts()`|Counts the frequency of unique values in a column.|


5. **Data Transformation & Cleaning**

Data transformation involves reshaping, reformatting, or correcting data to make it more consistent and analysis-ready.

|Method|Description|
|:-----|:----------|
|`df.rename(columns={'old':'new'})`|Renames columns.|
|`df.drop(columns=['col'])`|Removes one or more columns.|
|`df.replace(old, new)`|Replaces specific values.|
|`df.astype('type')`|Changes the data type of a column.|
|`df.sort_values(by='col')`|Sorts rows by column values.|
|`df.reset_index(drop=True)`|Resets the DataFrame index.|


***Quick Statistics***

Once the data is ready, you can compute summary statistics to get insights about its distribution and relationships.

|Method|Description|
|:-----|:----------|
|`df.mean()`|Computes the mean (average) for numeric columns.|
|`df.std()`|Computes the standard deviation for numeric columns.|
|`df.min()`|Returns the minimum value for each column.|
|`df.max()`|Returns the maximum value for each column.|
|`df.median()`|Computes the median (50th percentile) for numeric columns.|
|`df.corr()`|Computes pairwise correlation between numeric columns.|
 No newline at end of file