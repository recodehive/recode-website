---
id: python-casting
title: Type Casting
sidebar_label: Type Casting #displays in sidebar
sidebar_position: 6
tags:
  [
    Python,
    Type Casting,
    Type Conversion,
    Python Data Types,
    int(),
    float(),
    str(),
  ]
description: Learn how to convert a variable from one data type to another in Python using the built-in int(), float(), and str() functions.
---

# Python Casting

In Python, **casting** is the process of converting a variable from one data type to another. Python has built-in functions for converting between data types.

---

## `int()` - Integer Casting

Converts a value to an integer. This function truncates floats (it does not round) and works with numeric strings.

```python
x = int(1)      # 1
y = int(2.8)    # 2 (value is truncated)
z = int("3")    # 3
# w = int("abc")  # Raises a ValueError
