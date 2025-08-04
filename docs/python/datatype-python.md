---
id: datatype-python
title: Python Data Types
sidebar_label: Python Data Types #displays in sidebar
sidebar_position: 4
tags: [python, introduction of python, Data Type]
description: Learn all standard data types in Python with examples and explanations.
---

# Python Data Types

In Python, every value has a **data type**. Data types define the nature of a value, and Python
provides a wide variety of built-in data types to handle different kinds of data. Understanding
these is crucial for effective programming.

---

## Data Types in Python

| **Category**   | **Data Type**                      |
| -------------- | ---------------------------------- |
| Text Type      | `str`                              |
| Numeric Types  | `int`, `float`, `complex`          |
| Sequence Types | `list`, `tuple`, `range`           |
| Mapping Type   | `dict`                             |
| Set Types      | `set`, `frozenset`                 |
| Boolean Type   | `bool`                             |
| Binary Types   | `bytes`, `bytearray`, `memoryview` |
| None Type      | `NoneType`                         |

---

## Text Type: `str`

A sequence of Unicode characters.

```python
name = "Dhruba"
```

You can perform operations like:

- Slicing
- Concatenation
- Length check with `len()`

---

## Numeric Types

### `int`

Whole numbers:

```python
age = 25
```

### `float`

Decimal numbers:

```python
pi = 3.14
```

### `complex`

Numbers with real and imaginary parts:

```python
z = 2 + 3j
```

---

## Sequence Types

### `list`

Mutable, ordered sequence:

```python
fruits = ["apple", "banana", "cherry"]
```

### `tuple`

Immutable, ordered sequence:

```python
dimensions = (1024, 768)
```

### `range`

Represents a sequence of numbers:

```python
nums = range(5)
```

---

## Mapping Type: `dict`

Unordered collection of key-value pairs:

```python
person = {
  "name": "Alice",
  "age": 30
}
```

---

## Set Types

### `set`

Unordered, mutable, no duplicates:

```python
unique_ids = {1, 2, 3}
```

### `frozenset`

Immutable version of a set:

```python
readonly_ids = frozenset([1, 2, 3])
```

---

## Boolean Type: `bool`

Only `True` or `False`:

```python
is_active = True
```

---

## Binary Types

### `bytes`

Immutable byte sequence:

```python
b = b"Hello"
```

### `bytearray`

Mutable version:

```python
ba = bytearray([65, 66, 67])
```

### `memoryview`

Provides memory-efficient access:

```python
mv = memoryview(bytes([1, 2, 3]))
```

---

## None Type

Represents no value:

```python
response = None
```

---

## Type Checking and Conversion

### Check type

```python
type(3.14)  # Output: <class 'float'>
```

### Type Conversion

```python
int("5")     # Output: 5
str(10)      # Output: "10"
list("abc")  # Output: ['a', 'b', 'c']
```

---

## Conclusion

Python provides a variety of built-in data types to handle data in efficient and expressive ways.
Knowing when and how to use each data type is essential for writing clean and effective Python code.
