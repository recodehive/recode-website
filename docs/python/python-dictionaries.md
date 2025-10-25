---
id: python-dictionaries
title: Python Dictionaries
description: Complete theoretical explanation of dictionaries in Python, covering creation, modification, methods, and use-cases.
sidebar_label: Python Dictionaries #displays in sidebar
sidebar_position: 11
tags:
  [
    Python,
    Python Dictionaries,
    dict,
    python data structures,
    key-value pairs,
    dictionary methods,
    dictionary comprehension
  ]

---


# Python Dictionaries

A **dictionary** in Python is a **mutable** collection that stores data as **key-value pairs**. As of Python 3.7+, dictionaries are **ordered**, meaning they maintain the insertion order of items. It is one of the most powerful and flexible built-in data structures in Python, suitable for representing structured data.

## What is a Dictionary?

Dictionaries hold data in the form of key-value pairs. Each key is unique and maps to a specific value. Values can be of any data type, while keys must be immutable (like strings, numbers, or tuples).

### Example:
```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
