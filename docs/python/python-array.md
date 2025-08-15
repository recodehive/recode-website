---
id: python-array
title: Array in Python
sidebar_label: Array in Python #displays in sidebar
sidebar_position: 9
tags:
  [
    Python,
    Array in Python,
    Introduction of python,
    Python Syntax,
    Variables,
    Operators,
    Type Casting,
    String
  ]

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
```

---

## Type Codes

Arrays in Python require a **type code** to specify the element type:

| Type Code | C Type          | Python Type | Size (bytes) |
| --------- | --------------- | ----------- | ------------ |
| `'i'`     | signed int      | int         | 2 or 4       |
| `'I'`     | unsigned int    | int         | 2 or 4       |
| `'f'`     | float           | float       | 4            |
| `'d'`     | double          | float       | 8            |
| `'b'`     | signed char     | int         | 1            |
| `'B'`     | unsigned char   | int         | 1            |
| `'u'`     | Py_UNICODE      | Unicode     | 2            |

---

## Indexing

Just like lists, arrays use **zero-based indexing**.

```python
nums = array.array('i', [10, 20, 30, 40, 50])

print(nums[0])   # 10
print(nums[2])   # 30
print(nums[-1])  # 50
```

---

## Slicing

You can slice arrays to get sub-arrays.

```python
print(nums[1:4])   # array('i', [20, 30, 40])
print(nums[:3])    # array('i', [10, 20, 30])
print(nums[::2])   # array('i', [10, 30, 50])
```

**Syntax:**

```
array[start:stop:step]
```

---

## Modifying Elements

Arrays are **mutable**, so you can change elements:

```python
nums[1] = 99
print(nums)  # array('i', [10, 99, 30, 40, 50])
```

---

## Array Methods

Python's `array` module provides several useful methods:

| Method             | Description                                           |
| ------------------ | ----------------------------------------------------- |
| `append(x)`        | Adds an element to the end                            |
| `insert(i, x)`     | Inserts an element at index `i`                       |
| `extend(iterable)` | Adds elements from another iterable                   |
| `remove(x)`        | Removes the first occurrence of the item              |
| `pop([i])`         | Removes and returns the item at index `i`             |
| `index(x)`         | Returns the index of the first occurrence of the item |
| `count(x)`         | Counts how many times the item appears                |
| `reverse()`        | Reverses the array                                    |
| `buffer_info()`    | Returns a tuple (memory address, length)              |
| `tobytes()`        | Converts the array to a bytes object                  |
| `frombytes(b)`     | Appends items from a bytes object                     |

---

### Examples

#### append()

```python
nums = array.array('i', [1, 2, 3])
nums.append(4)
print(nums)  # array('i', [1, 2, 3, 4])
```

#### insert()

```python
nums.insert(1, 100)
print(nums)  # array('i', [1, 100, 2, 3, 4])
```

#### extend()

```python
nums.extend([5, 6])
print(nums)  # array('i', [1, 100, 2, 3, 4, 5, 6])
```

#### remove() and pop()

```python
nums.remove(100)
print(nums)  # array('i', [1, 2, 3, 4, 5, 6])

nums.pop()   # Removes last element
print(nums)  # array('i', [1, 2, 3, 4, 5])

nums.pop(2)  # Removes index 2
print(nums)  # array('i', [1, 2, 4, 5])
```

---

## Iterating Through an Array

**Using a for loop:**

```python
for num in nums:
    print(num)
```

**Using indices:**

```python
for i in range(len(nums)):
    print(i, nums[i])
```

---

## Membership Test

Check if an element exists in an array:

```python
print(10 in nums)     # True or False
print(100 not in nums) # True or False
```

---

## Array from List

```python
list_data = [1, 2, 3, 4]
arr = array.array('i', list_data)
print(arr)
```

---

## Copying Arrays

Assigning directly creates a reference:

```python
a = array.array('i', [1, 2, 3])
b = a
b.append(4)
print(a)  # array('i', [1, 2, 3, 4])
```

To make an independent copy:

```python
c = array.array(a.typecode, a)
c.append(5)

print(a)  # array('i', [1, 2, 3, 4])
print(c)  # array('i', [1, 2, 3, 4, 5])
```

---

## Conclusion

Python Arrays are useful when you need to store large amounts of **numeric data** of the same type efficiently.  
They provide faster performance and smaller memory footprint compared to lists for numerical operations.
