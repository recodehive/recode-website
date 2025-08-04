---
id: python-tuple
title: Tuple in Python
sidebar_label: Tuple in Python #displays in sidebar
sidebar_position: 9
tags:
  [
    Python,
    List in Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String,
    Tuple in Python,
  ]
---

# Tuples in Python

A **Tuple** is an immutable, ordered collection of elements.  
Unlike lists, **tuples cannot be changed after creation**, which makes them useful for storing fixed
collections of data.

## Creating a Tuple

Tuples are created using parentheses `()` or simply commas:

```python
# Empty Tuple
empty_tuple = ()

# Tuple with multiple items
fruits = ("apple", "banana", "cherry")

# Tuple without parentheses (comma-separated)
numbers = 1, 2, 3

# Single-element Tuple (Note the comma!)
single = ("hello",)
```

**Important:** Without the comma, Python does not recognize it as a tuple:

```python
not_a_tuple = ("hello")  # This is a string, NOT a tuple
```

## Accessing Elements

Use indexing just like lists:

```python
fruits = ("apple", "banana", "cherry")

print(fruits[0])   # apple
print(fruits[1])   # banana
print(fruits[-1])  # cherry
```

## Slicing Tuples

Tuples support slicing operations:

```python
numbers = (10, 20, 30, 40, 50)

print(numbers[1:4])    # (20, 30, 40)
print(numbers[:3])     # (10, 20, 30)
print(numbers[2:])     # (30, 40, 50)
```

## Tuple Immutability

Tuples cannot be modified after creation:

```python
fruits = ("apple", "banana", "cherry")

# This will raise an error:
fruits[1] = "mango"
```

**Output:**

```
TypeError: 'tuple' object does not support item assignment
```

This property makes tuples **safe for constant data**, like coordinates, fixed configurations, etc.

## Tuple Methods

Tuples have only **two built-in methods**:

| Method     | Description                                      |
| ---------- | ------------------------------------------------ |
| `count(x)` | Counts how many times `x` occurs in the tuple    |
| `index(x)` | Returns the index of the first occurrence of `x` |

### Example

```python
numbers = (1, 2, 3, 2, 2, 4)

print(numbers.count(2))  # 3
print(numbers.index(3))  # 2
```

## Tuple Packing and Unpacking

**Packing:** Combining values into a tuple:

```python
data = "John", 25, "Engineer"
print(data)  # ('John', 25, 'Engineer')
```

**Unpacking:** Assigning tuple elements to variables:

```python
name, age, profession = data

print(name)       # John
print(age)        # 25
print(profession) # Engineer
```

## Nested Tuples

Tuples can contain other tuples or collections:

```python
nested = (
    (1, 2, 3),
    ("a", "b", "c"),
    (True, False)
)

print(nested[1])        # ('a', 'b', 'c')
print(nested[1][2])     # 'c'
```

## Tuple vs. List

| Feature     | Tuple                     | List                           |
| ----------- | ------------------------- | ------------------------------ |
| Syntax      | `(1, 2, 3)`               | `[1, 2, 3]`                    |
| Mutability  | Immutable (cannot change) | Mutable (can change)           |
| Methods     | count(), index() only     | Many built-in methods          |
| Use Case    | Fixed data, safe storage  | Dynamic data, frequent changes |
| Performance | Slightly faster           | Slightly slower                |

## When to Use Tuples

**Use tuples when:**

- Data should **not change**.
- You need **hashable** objects (e.g., as dictionary keys).
- You want to protect data integrity.

**Examples:**

- Geographic coordinates: `(latitude, longitude)`
- RGB color codes: `(255, 255, 255)`
- Database records

## Tuple Comprehension

**Note:** Python does NOT have tuple comprehensions. However, you can use a **generator expression**
in parentheses:

```python
gen = (x*x for x in range(5))
print(gen)  # <generator object ...>
```

To create a tuple from it, use `tuple()`:

```python
squares = tuple(x*x for x in range(5))
print(squares)  # (0, 1, 4, 9, 16)
```

## Conclusion

Tuples are a **fundamental** data type in Python, providing a simple, efficient, and immutable way
to store ordered data. Understanding when to choose a tuple over a list is essential for writing
clear and robust code.
