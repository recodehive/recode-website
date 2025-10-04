---
id: python-loops
title: Loops in Python
sidebar_label: Loops in Python
sidebar_position: 10
tags:
  - Python
  - Loops
  - for loop
  - while loop
  - Control Flow
  - Iteration
  - Python Syntax
---

# Loops in Python

Loops in Python allow you to execute a block of code repeatedly. They are essential for automating repetitive tasks and processing collections of data efficiently.

## The `for` Loop

The `for` loop is used to iterate over a sequence (like a list, tuple, string, or range).

**Syntax:**

```python
for variable in sequence:
    # block of code
```

**Example:**

```python
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
```

**Output:**
```
apple
banana
cherry
```

## The `range()` Function

The `range()` function generates a sequence of numbers, commonly used with `for` loops.

```python
# Print numbers 0 to 4
for i in range(5):
    print(i)

# Print numbers 2 to 6
for i in range(2, 7):
    print(i)

# Print even numbers from 0 to 8
for i in range(0, 10, 2):
    print(i)
```

**Output:**
```
0
1
2
3
4
```

## The `while` Loop

The `while` loop continues executing as long as a condition is **True**.

**Syntax:**

```python
while condition:
    # block of code
```

**Example:**

```python
count = 1
while count <= 5:
    print(f"Count: {count}")
    count += 1
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

## Loop Control Statements

### The `break` Statement

`break` exits the loop immediately.

```python
for i in range(10):
    if i == 5:
        break
    print(i)
```

**Output:**
```
0
1
2
3
4
```

### The `continue` Statement

`continue` skips the current iteration and moves to the next one.

```python
for i in range(5):
    if i == 2:
        continue
    print(i)
```

**Output:**
```
0
1
3
4
```

### The `pass` Statement

`pass` is a placeholder that does nothing. Useful when you need syntactically correct code but no action.

```python
for i in range(3):
    if i == 1:
        pass  # Do nothing for i == 1
    else:
        print(i)
```

## Nested Loops

You can place one loop inside another loop.

```python
# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i * j}")
    print()  # Empty line after each row
```

**Output:**
```
1 x 1 = 1
1 x 2 = 2
1 x 3 = 3

2 x 1 = 2
2 x 2 = 4
2 x 3 = 6

3 x 1 = 3
3 x 2 = 6
3 x 3 = 9
```

## Looping Through Different Data Types

### Strings

```python
word = "Python"
for letter in word:
    print(letter)
```

### Dictionaries

```python
student = {"name": "Alice", "age": 20, "grade": "A"}

# Loop through keys
for key in student:
    print(key)

# Loop through values
for value in student.values():
    print(value)

# Loop through key-value pairs
for key, value in student.items():
    print(f"{key}: {value}")
```

### Lists with Index

```python
colors = ["red", "green", "blue"]

# Using enumerate() to get index and value
for index, color in enumerate(colors):
    print(f"{index}: {color}")
```

**Output:**
```
0: red
1: green
2: blue
```

## The `else` Clause in Loops

Loops can have an `else` clause that executes when the loop completes normally (not broken by `break`).

```python
# With for loop
for i in range(3):
    print(i)
else:
    print("Loop completed!")

# With while loop
count = 0
while count < 3:
    print(count)
    count += 1
else:
    print("While loop finished!")
```

## Common Loop Patterns

### Counting Pattern

```python
# Count occurrences
text = "hello world"
count = 0
for char in text:
    if char == 'l':
        count += 1
print(f"Letter 'l' appears {count} times")
```

### Accumulation Pattern

```python
# Sum of numbers
numbers = [1, 2, 3, 4, 5]
total = 0
for num in numbers:
    total += num
print(f"Sum: {total}")
```

### Finding Pattern

```python
# Find first even number
numbers = [1, 3, 5, 8, 9, 10]
for num in numbers:
    if num % 2 == 0:
        print(f"First even number: {num}")
        break
```

## Best Practices

1. **Use `for` loops** when you know the number of iterations
2. **Use `while` loops** when the condition determines when to stop
3. **Avoid infinite loops** by ensuring the condition eventually becomes `False`
4. **Use meaningful variable names** in loops
5. **Consider list comprehensions** for simple transformations

## Summary Table

| Loop Type               | Use Case                                    |
|------------------------|---------------------------------------------|
| `for` loop             | Iterating over sequences (lists, strings)  |
| `while` loop           | Repeating until a condition is met         |
| `break`                | Exit loop immediately                       |
| `continue`             | Skip current iteration                      |
| `pass`                 | Placeholder for empty loop body             |
| Nested loops           | Working with multi-dimensional data         |
| List comprehensions    | Creating lists with concise syntax          |



### **Practice Questions:**

#### **1. Print Even Numbers**

Write a Python program to print all **even numbers from 1 to 20** using a `for` loop.

**Expected Output:**

```
2 4 6 8 10 12 14 16 18 20
```

---

#### **2. Sum of Natural Numbers**

Write a program to calculate the **sum of the first 10 natural numbers** using a loop.

**Expected Output:**

```
The sum is: 55
```

---

#### **3. Loop Through a String**

Given the string:

```python
word = "Python"
```

Write a loop to print each **character on a new line**.

---

#### **4. Reverse a List Using Loop**

Without using the built-in `reverse()` or slicing, write a program to **print a list in reverse order** using a loop.

```python
numbers = [1, 2, 3, 4, 5]
```

**Expected Output:**

```
5
4
3
2
1
```

---

#### **5. Multiplication Table**

Write a Python program to **print the multiplication table of 7** using a loop.

**Expected Output:**

```
7 x 1 = 7  
7 x 2 = 14  
...  
7 x 10 = 70
```

---

#### **6. Using `break` Statement**

Write a loop that prints numbers from 1 to 10.

* If the number is **5**, use `break` to stop the loop.

**Expected Output:**

```
1  
2  
3  
4
```

---

#### **7. Using `continue` Statement**

Write a loop that prints numbers from 1 to 10.

* **Skip** printing the number **5** using `continue`.

**Expected Output:**

```
1  
2  
3  
4  
6  
7  
8  
9  
10
```

---

#### **8. Nested Loop – Pattern Printing**

Write a program using **nested loops** to print the following pattern:

```
*
* *
* * *
* * * *
* * * * *
```

---

## Conclusion

Loops are fundamental to programming in Python. Whether you're processing data, automating tasks, or building complex algorithms, mastering `for` and `while` loops will make your code more efficient and powerful. Practice with different data types and loop patterns to become proficient in using loops effectively.