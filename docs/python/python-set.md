---
id: python-set
title: Set in Python
sidebar_label: Set in Python #displays in sidebar
sidebar_position: 10
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
    Set in Python,
  ]
---

# Set in Python

A **Set** in Python is a built-in data structure used to store multiple **unique** elements in a
single variable. Sets are **unordered** and **mutable**, making them an efficient tool for
membership tests, eliminating duplicates, and performing mathematical set operations.

## Why Use Sets?

Sets are commonly used when:

- You need to **store unique values only**
- The order of elements **does not matter**
- You want to perform **fast membership testing**
- You need efficient **union, intersection, and difference operations**

## Key Characteristics

- **Unordered:** Elements have no defined order.
- **Unique:** No duplicates allowed.
- **Mutable:** You can add or remove items.
- **Iterable:** You can loop through a set.

## Creating a Set

There are two main ways to create a set:

### Using Curly Braces `{}`

```python
fruits = {"apple", "banana", "cherry"}
print(fruits)  # Output: {'banana', 'apple', 'cherry'}
```

### Using the `set()` Constructor

```python
numbers = set([1, 2, 3, 2])
print(numbers)  # Output: {1, 2, 3}
```

> **Important:** Empty curly braces `{}` create an **empty dictionary**, not a set. Use `set()`
> instead:

> ```python
> empty_set = set()
> ```

## Adding Elements to a Set

You can add elements using the `add()` method:

```python
colors = {"red", "green"}
colors.add("blue")
print(colors)  # Output: {'red', 'green', 'blue'}
```

## Removing Elements from a Set

Python provides several methods to remove elements:

### `remove()`

Removes the specified item. Raises an error if the item does not exist.

```python
colors = {"red", "green"}
colors.remove("red")
print(colors)  # Output: {'green'}
```

> If you try to remove an item not present:
>
> ```python
> colors.remove("yellow")  # KeyError
> ```

### `discard()`

Removes the specified item without raising an error if the item is not found.

```python
colors = {"green"}
colors.discard("yellow")  # No error
```

### `pop()`

Removes and returns an arbitrary element.

```python
colors = {"red", "blue"}
removed = colors.pop()
print("Removed:", removed)
print("Remaining:", colors)
```

### `clear()`

Removes all elements.

```python
colors.clear()
print(colors)  # Output: set()
```

## Updating a Set

To add multiple items at once, use `update()`:

```python
a = {1, 2}
a.update([3, 4], {5, 6})
print(a)  # Output: {1, 2, 3, 4, 5, 6}
```

## Membership Testing

Check if an item is in a set using `in` or `not in`:

```python
nums = {1, 2, 3}
print(2 in nums)        # Output: True
print(5 not in nums)    # Output: True
```

## Common Set Operations

Python sets support powerful operations:

| Operation            | Syntax                                 | Description                          |                                     |
| -------------------- | -------------------------------------- | ------------------------------------ | ----------------------------------- |
| Union                | \`a                                    | b`or`a.union(b)\`                    | Combine all elements from both sets |
| Intersection         | `a & b` or `a.intersection(b)`         | Elements common to both sets         |                                     |
| Difference           | `a - b` or `a.difference(b)`           | Elements in `a` but not in `b`       |                                     |
| Symmetric Difference | `a ^ b` or `a.symmetric_difference(b)` | Elements in either set, but not both |                                     |

---

### Example

```python
a = {1, 2, 3}
b = {3, 4, 5}

# Union
print(a | b)   # {1, 2, 3, 4, 5}

# Intersection
print(a & b)   # {3}

# Difference
print(a - b)   # {1, 2}

# Symmetric Difference
print(a ^ b)   # {1, 2, 4, 5}
```

---

## Iterating Over a Set

Loop through elements with a `for` loop:

```python
animals = {"cat", "dog", "rabbit"}
for animal in animals:
    print(animal)
```

> Since sets are unordered, the output order may differ every time.

## Frozenset

A **frozenset** is an immutable version of a set. Once created, you cannot modify it.

```python
fs = frozenset([1, 2, 3])
print(fs)  # frozenset({1, 2, 3})

# fs.add(4)  #  AttributeError
```

Use `frozenset` when you need a **hashable set**, e.g., as dictionary keys.

## When to Use Sets?

- Removing duplicates from lists
- Fast membership tests
- Performing set algebra (union, intersection)
- Representing unique collections

## Best Practices

- Use `set()` to create empty sets.
- Use `discard()` if you are not sure whether an element exists.
- Prefer sets over lists when you need uniqueness or fast lookups.

---

## Practice Exercises

1. **Create a set of your favorite fruits. Add one more fruit and remove another.**
2. **Find the union and intersection of `{1, 2, 3}` and `{3, 4, 5}`.**
3. **Write a program that removes duplicates from a list using a set.**
4. **Create a frozenset and show that it cannot be modified.**

---

## Summary Table

| Feature               | Description                                  |
| --------------------- | -------------------------------------------- |
| **Mutable**           | Yes (can add/remove elements)                |
| **Ordered**           | No                                           |
| **Duplicates**        | Not allowed                                  |
| **Empty Declaration** | `set()`                                      |
| **Immutable Variant** | `frozenset`                                  |
| **Typical Use Cases** | Membership tests, uniqueness, set operations |
