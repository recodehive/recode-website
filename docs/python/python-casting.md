---
id: python-casting
title: Type Casting
sidebar_label: Type Casting #displays in sidebar
sidebar_position: 6
tags:
  [Python, Introduction of python, Python Syntax, Python Variables, Python Operators, Type Casting]
---

# Python Casting

In Python, **casting** is the process of converting a variable from one type to another. Python has
built-in functions for converting between data types.

---

### Specify a Variable Type

Python is an **object-oriented language**, and **variables are objects**.  
You can specify the data type using casting functions:

```python
x = int(1)     # x will be 1
y = int(2.8)   # y will be 2
z = int("3")   # z will be 3
```

### `int()` - Integer Casting

Converts a value to an integer. Works with floats and numeric strings.

```python
x = int(1)      # 1
y = int(2.8)    # 2
z = int("3")    # 3
# w = int("abc")  # Error
```

### `float()` - Floating-Point Casting

Converts a value to a float. Works with integers and numeric strings.

```python
a = float(1)      # 1.0
b = float("2.5")  # 2.5
c = float(3.0)    # 3.0
```

### `str()` - String Casting

Converts numbers or other types into a string.

```python
x = str("s1")   # 's1'
y = str(2)      # '2'
z = str(3.0)    # '3.0'
```

### Invalid Casting

Some values can't be casted directly:

```python
int("hello")     # ValueError
float("abc")     # ValueError
```

Use `try`/`except` to handle safely:

```python
value = "abc"
try:
    number = int(value)
except ValueError:
    print("Invalid conversion")
```

### Summary Table

| Function  | Converts to | Example Input | Output  |
| --------- | ----------- | ------------- | ------- |
| `int()`   | Integer     | `"3"`         | `3`     |
| `float()` | Float       | `"3.5"`       | `3.5`   |
| `str()`   | String      | `3.5`         | `"3.5"` |

### Quick Notes

- Use casting to convert types manually.
- Useful when handling user input, math, or data from files.
- Always validate input before casting to avoid errors.
