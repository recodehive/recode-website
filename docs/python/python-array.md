---
id: python-array
title: Array in Python
sidebar_label: Array in Python #displays in sidebar
sidebar_position: 9
tags:
  [
    Python,
    Array in Python,
    array module,
    python data structures,
    array methods,
    type codes,
  ]
description: Learn how to use arrays in Python using the built-in 'array' module. This guide covers array creation, indexing, slicing, methods, and type codes.
---

# Python Arrays

An **Array** in Python is a data structure that stores multiple elements of the **same data type** in contiguous memory locations.
Arrays are **ordered**, **mutable**, and **type-restricted**, making them more memory-efficient than lists for large numeric data.

In Python, arrays are provided by the built-in **`array`** module, which must be imported before use.

---

## Creating an Array

You create an array using the `array()` constructor from the `array` module.

```python
import array

# Empty array of integers
empty_array = array.array('i', [])

# Array of Integers
numbers = array.array('i', [1, 2, 3, 4, 5])

# Array of Floats
floats = array.array('f', [1.1, 2.2, 3.3])

print(numbers)  # array('i', [1, 2, 3, 4, 5])
