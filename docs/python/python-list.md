---
id: python-list
title: List in Python
sidebar_label: List in Python #displays in sidebar
sidebar_position: 8
tags:
  [
    Python,
    List in Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String
  ]

---


# Lists in Python

A **List** in Python is a data structure that allows you to store multiple items in a single variable. Lists are **ordered**, **mutable**, and **can contain elements of different data types**.


## Creating a List

You create a list using square brackets `[]`:

```python
# Empty List
empty_list = []

# List of Integers
numbers = [1, 2, 3, 4, 5]

# List of Strings
fruits = ["apple", "banana", "cherry"]

# Mixed Data Types
mixed = [1, "hello", 3.14, True]
````



## Indexing

**Indexing** means accessing elements by their position.

* Index starts from **0** in Python:

```python
fruits = ["apple", "banana", "cherry"]

print(fruits[0])  # apple
print(fruits[1])  # banana
print(fruits[2])  # cherry
```

* Negative indexing starts from the end:

```python
print(fruits[-1])  # cherry
print(fruits[-2])  # banana
print(fruits[-3])  # apple
```



## Slicing

**Slicing** lets you extract a sublist:

```python
numbers = [10, 20, 30, 40, 50]

print(numbers[1:4])    # [20, 30, 40]
print(numbers[:3])     # [10, 20, 30]
print(numbers[2:])     # [30, 40, 50]
print(numbers[-3:-1])  # [30, 40]
```

**Syntax:**

```
list[start:stop:step]
```

**Example with step:**

```python
print(numbers[::2])  # [10, 30, 50]
```


## Modifying Elements

Lists are **mutable**, which means you can change their contents:

```python
fruits = ["apple", "banana", "cherry"]
fruits[1] = "mango"
print(fruits)  # ['apple', 'mango', 'cherry']
```


## List Methods

Python provides many built-in methods for lists:

| Method         | Description                                           |
| -------------- | ----------------------------------------------------- |
| `append(x)`    | Adds an item to the end of the list                   |
| `insert(i, x)` | Inserts an item at a specific index                   |
| `extend(iter)` | Adds all elements from another iterable               |
| `remove(x)`    | Removes the first occurrence of the item              |
| `pop([i])`     | Removes and returns the item at the given index       |
| `clear()`      | Removes all elements                                  |
| `index(x)`     | Returns the index of the first occurrence of the item |
| `count(x)`     | Counts how many times the item appears                |
| `sort()`       | Sorts the list in ascending order                     |
| `reverse()`    | Reverses the list                                     |
| `copy()`       | Returns a shallow copy of the list                    |

---

### Examples

#### append()

```python
nums = [1, 2, 3]
nums.append(4)
print(nums)  # [1, 2, 3, 4]
```

#### insert()

```python
nums.insert(1, 100)
print(nums)  # [1, 100, 2, 3, 4]
```

#### extend()

```python
nums.extend([5, 6])
print(nums)  # [1, 100, 2, 3, 4, 5, 6]
```

#### remove() and pop()

```python
nums.remove(100)
print(nums)  # [1, 2, 3, 4, 5, 6]

nums.pop()   # Removes the last element
print(nums)  # [1, 2, 3, 4, 5]

nums.pop(2)  # Removes index 2
print(nums)  # [1, 2, 4, 5]
```


## Iterating Through a List

**Using a for loop:**

```python
fruits = ["apple", "banana", "cherry"]

for item in fruits:
    print(item)
```

**Output:**

```
apple
banana
cherry
```

**Using indices:**

```python
for i in range(len(fruits)):
    print(i, fruits[i])
```


## Membership Test

Check whether an item exists in the list:

```python
print("apple" in fruits)       # True
print("mango" not in fruits)   # True
```


## Nested Lists

Lists can contain other lists:

```python
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0])       # [1, 2, 3]
print(matrix[1][2])    # 6
```


## List Comprehensions

A **concise way** to create new lists:

```python
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]
```

**With a condition:**

```python
even = [x for x in range(10) if x % 2 == 0]
print(even)  # [0, 2, 4, 6, 8]
```


## Copying Lists

Be careful! Assigning directly creates a reference:

```python
a = [1, 2, 3]
b = a
b.append(4)

print(a)  # [1, 2, 3, 4]
```

To create an **independent copy:**

```python
c = a.copy()
c.append(5)

print(a)  # [1, 2, 3, 4]
print(c)  # [1, 2, 3, 4, 5]
```


## Conclusion

Python Lists are a **powerful and flexible** data structure used everywhere—from collecting and processing data to building complex programs. Practice using list methods and experiment to become confident.
