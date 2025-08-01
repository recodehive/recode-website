---
id: python-dictionaries
title: Python Dictionaries
description: Complete theoretical explanation of dictionaries in Python, covering creation, modification, methods, and use-cases.
sidebar_label: Python Dictionaries #displays in sidebar
sidebar_position: 11
tags:
  [
    Python,
    Introduction of python,
    List in Python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String,
    Tuple in Python,
    Python Dictionaries

  ]

---


# Python Dictionaries

A **dictionary** in Python is an unordered, mutable, and indexed collection of key-value pairs. It is one of the most powerful and flexible built-in data structures in Python, suitable for representing structured data.

## What is a Dictionary?

Dictionaries hold data in the form of key-value pairs. Each key is unique and maps to a specific value. Values can be of any data type, while keys must be immutable (like strings, numbers, or tuples).

### Example:
```python
person = {
    "name": "Alice",
    "age": 25,
    "city": "New York"
}
````

## Properties of Dictionaries

* Keys are unique.
* Keys must be immutable.
* Values can be of any data type.
* Dictionaries are mutable and can be changed after creation.
* In Python 3.7+, dictionaries maintain insertion order.

## Creating Dictionaries

### Using Curly Braces:

```python
data = {"a": 1, "b": 2}
```

### Using the `dict()` Constructor:

```python
data = dict(x=10, y=20)
```

### Creating an Empty Dictionary:

```python
empty = {}
```

## Accessing Dictionary Elements

### Using Key Indexing:

```python
person["name"]
```

### Using `get()` Method:

```python
person.get("age")
person.get("gender", "Not Found")
```

## Adding and Updating Items

### Add New Key-Value:

```python
person["gender"] = "Female"
```

### Update Existing Key:

```python
person["age"] = 30
```

### Use `update()` Method:

```python
person.update({"age": 35, "city": "Chicago"})
```

## Removing Elements

### Using `pop()`:

```python
person.pop("age")
```

### Using `del`:

```python
del person["city"]
```

### Using `clear()`:

```python
person.clear()
```

### Using `popitem()`:

Removes and returns the last inserted key-value pair.

```python
person.popitem()
```

## Dictionary Methods

| Method      | Description                                      |
| ----------- | ------------------------------------------------ |
| `get(key)`  | Returns value for key or `None` if key not found |
| `keys()`    | Returns a view of all keys                       |
| `values()`  | Returns a view of all values                     |
| `items()`   | Returns a view of key-value pairs                |
| `update()`  | Updates dictionary with another dictionary       |
| `pop(key)`  | Removes specified key                            |
| `popitem()` | Removes the last inserted item                   |
| `clear()`   | Removes all elements                             |
| `copy()`    | Returns a shallow copy                           |

## Iterating Through a Dictionary

### Loop Through Keys:

```python
for key in person:
    print(key)
```

### Loop Through Values:

```python
for value in person.values():
    print(value)
```

### Loop Through Key-Value Pairs:

```python
for key, value in person.items():
    print(key, value)
```

## Nested Dictionaries

A dictionary can contain other dictionaries as values, enabling hierarchical data storage.

```python
students = {
    "101": {"name": "John", "grade": "A"},
    "102": {"name": "Emma", "grade": "B"},
}
students["101"]["name"]  # Output: John
```

## Dictionary Comprehension

Like list comprehensions, dictionary comprehensions offer a concise way to create dictionaries.

```python
squares = {x: x*x for x in range(1, 6)}
```

## Use Cases of Dictionaries

* Representing JSON or structured data
* Frequency counting (e.g., word count)
* Lookup tables
* Configuration or settings
* Storing database records in memory

## Dictionary vs List

| Feature    | Dictionary               | List              |
| ---------- | ------------------------ | ----------------- |
| Structure  | Key-value pairs          | Indexed elements  |
| Access     | Via key                  | Via index         |
| Order      | Insertion ordered (3.7+) | Ordered           |
| Mutability | Mutable                  | Mutable           |
| Use Case   | Lookup, mapping          | Sequence of items |

## Best Practices

* Use `.get()` instead of direct key access to avoid `KeyError`.
* Use dictionary comprehension for cleaner and more readable code.
* Use keys that are hashable (e.g., strings, numbers).
* Use dictionaries for fast lookups and structured data representation.

## Summary

* Dictionaries are one of the most versatile data structures in Python.
* They store key-value pairs and allow fast retrieval based on keys.
* Keys must be unique and immutable.
* Dictionaries support powerful methods for data manipulation and traversal.
