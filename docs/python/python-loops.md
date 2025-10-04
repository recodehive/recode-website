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

---

## 🎯 Quiz 1: For Loops & Range Function

**Question 1:** What will be the output?
```python
for i in range(3):
    print(i)
```
<details>
<summary>Show Answer</summary>

**Output:**
```
0
1
2
```

**Explanation:** `range(3)` generates numbers from 0 up to (but not including) 3. So it produces: 0, 1, 2.
</details>

**Question 2:** How would you use `range()` to print only odd numbers from 1 to 9?
<details>
<summary>Show Answer</summary>

```python
for i in range(1, 10, 2):
    print(i)
```

**Output:**
```
1
3
5
7
9
```

**Explanation:** `range(start, stop, step)` where:
- `start = 1` (first odd number)
- `stop = 10` (goes up to but not including 10)
- `step = 2` (skip every other number)
</details>

**Question 3:** What's the difference between `range(5)` and `range(1, 6)`?
<details>
<summary>Show Answer</summary>

**`range(5)`:** Produces `0, 1, 2, 3, 4` (starts from 0)

**`range(1, 6)`:** Produces `1, 2, 3, 4, 5` (starts from 1)

Both generate 5 numbers, but with different starting points. Remember: the stop value is always **exclusive** (not included).
</details>

---

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

---

## 🎯 Quiz 2: While Loops

**Question 1:** What's the most common mistake that leads to an infinite loop?
<details>
<summary>Show Answer</summary>

**Forgetting to update the condition variable!**

**Infinite loop example:**
```python
count = 0
while count < 5:
    print(count)
    # Forgot to increment count!
```

**Fixed version:**
```python
count = 0
while count < 5:
    print(count)
    count += 1  # Update the variable!
```

Always ensure your loop condition will eventually become `False`.
</details>

**Question 2:** What will happen with this code?
```python
x = 10
while x > 5:
    print(x)
    x -= 2
```
<details>
<summary>Show Answer</summary>

**Output:**
```
10
8
6
```

**Explanation:** 
- First iteration: x = 10 (10 > 5 is True, print 10, x becomes 8)
- Second iteration: x = 8 (8 > 5 is True, print 8, x becomes 6)
- Third iteration: x = 6 (6 > 5 is True, print 6, x becomes 4)
- Fourth iteration: x = 4 (4 > 5 is False, loop stops)
</details>

**Question 3:** When should you use a `while` loop instead of a `for` loop?
<details>
<summary>Show Answer</summary>

Use a **`while` loop** when:
- You don't know how many iterations you need in advance
- The loop depends on a condition that may change unpredictably
- You're waiting for user input or an event

**Examples:**
```python
# Unknown iterations - input validation
password = ""
while password != "secret":
    password = input("Enter password: ")

# Unknown iterations - game loop
game_running = True
while game_running:
    # Game logic
    if player_quits:
        game_running = False
```

Use a **`for` loop** when you know the sequence or number of iterations in advance.
</details>

---

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

---

## 🎯 Quiz 3: Loop Control Statements

**Question 1:** What's the difference between `break` and `continue`?
<details>
<summary>Show Answer</summary>

**`break`:** **Exits** the entire loop immediately
```python
for i in range(5):
    if i == 2:
        break
    print(i)
# Output: 0, 1 (loop stops completely)
```

**`continue`:** **Skips** the rest of the current iteration and moves to the next one
```python
for i in range(5):
    if i == 2:
        continue
    print(i)
# Output: 0, 1, 3, 4 (skips only i=2)
```
</details>

**Question 2:** What will be the output?
```python
for i in range(1, 6):
    if i == 3:
        continue
    if i == 5:
        break
    print(i)
```
<details>
<summary>Show Answer</summary>

**Output:**
```
1
2
4
```

**Explanation:**
- i=1: prints 1
- i=2: prints 2
- i=3: `continue` skips printing
- i=4: prints 4
- i=5: `break` exits loop (5 is never printed)
</details>

**Question 3:** When would you use the `pass` statement?
<details>
<summary>Show Answer</summary>

Use `pass` when you need a **syntactically valid placeholder** but don't want any action:

**1. During development:**
```python
def future_function():
    pass  # Will implement later
```

**2. In conditional statements:**
```python
for num in numbers:
    if num < 0:
        pass  # Ignore negative numbers for now
    else:
        process(num)
```

**3. In exception handling:**
```python
try:
    risky_operation()
except ValueError:
    pass  # Silently ignore ValueError
```

Without `pass`, you'd get a syntax error for an empty block!
</details>

---

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

---

## 🎯 Quiz 4: Nested Loops

**Question 1:** How many times will "Hello" be printed?
```python
for i in range(3):
    for j in range(4):
        print("Hello")
```
<details>
<summary>Show Answer</summary>

**Answer: 12 times**

**Explanation:** 
- Outer loop runs 3 times
- For each outer iteration, inner loop runs 4 times
- Total: 3 × 4 = 12

The pattern: outer iterations × inner iterations = total iterations
</details>

**Question 2:** What will this code print?
```python
for i in range(3):
    for j in range(i):
        print("*", end="")
    print()
```
<details>
<summary>Show Answer</summary>

**Output:**
```

*
**
```

**Explanation:**
- i=0: inner loop runs 0 times → (empty line)
- i=1: inner loop runs 1 time → `*`
- i=2: inner loop runs 2 times → `**`

This creates a growing triangle pattern!
</details>

**Question 3:** Can you use `break` in a nested loop? What happens?
<details>
<summary>Show Answer</summary>

**Yes, but `break` only exits the innermost loop it's in.**

```python
for i in range(3):
    print(f"Outer loop: {i}")
    for j in range(3):
        if j == 1:
            break  # Only breaks inner loop
        print(f"  Inner loop: {j}")
```

**Output:**
```
Outer loop: 0
  Inner loop: 0
Outer loop: 1
  Inner loop: 0
Outer loop: 2
  Inner loop: 0
```

To break out of **all** loops, you need a flag variable or use a function with `return`.
</details>

---

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

---

## 🎯 Quiz 5: Looping Through Data Types

**Question 1:** What will be printed?
```python
word = "Hi"
for char in word:
    print(char * 2)
```
<details>
<summary>Show Answer</summary>

**Output:**
```
HH
ii
```

**Explanation:** The loop iterates through each character ('H', then 'i'), and `char * 2` repeats each character twice.
</details>

**Question 2:** What's the output?
```python
scores = {"math": 90, "english": 85}
for subject, score in scores.items():
    print(f"{subject}: {score}")
```
<details>
<summary>Show Answer</summary>

**Output:**
```
math: 90
english: 85
```

**Explanation:** `.items()` returns key-value pairs as tuples, which are unpacked into `subject` and `score` variables.

**Note:** Using just `for subject in scores:` would only iterate through the keys!
</details>

**Question 3:** How would you loop through a list backwards?
<details>
<summary>Show Answer</summary>

**Method 1: Using `reversed()`**
```python
fruits = ["apple", "banana", "cherry"]
for fruit in reversed(fruits):
    print(fruit)
# Output: cherry, banana, apple
```

**Method 2: Using negative step in range with indexing**
```python
for i in range(len(fruits) - 1, -1, -1):
    print(fruits[i])
```

**Method 3: Using slice notation**
```python
for fruit in fruits[::-1]:
    print(fruit)
```

**Method 1 is the most Pythonic and readable!**
</details>

---

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

---

## 🎯 Quiz 6: Loop Patterns & Else Clause

**Question 1:** When does the `else` clause of a loop execute?
<details>
<summary>Show Answer</summary>

The `else` clause executes when the loop **completes normally** (without encountering a `break`).

**Example 1: else executes**
```python
for i in range(3):
    print(i)
else:
    print("Done!")
# Output: 0, 1, 2, Done!
```

**Example 2: else does NOT execute**
```python
for i in range(5):
    if i == 2:
        break
    print(i)
else:
    print("Done!")
# Output: 0, 1 (no "Done!" because of break)
```

**Common use case:** Searching for an item
```python
numbers = [1, 3, 5, 7]
target = 4

for num in numbers:
    if num == target:
        print("Found!")
        break
else:
    print("Not found!")  # Executes if loop completes without finding
```
</details>

**Question 2:** Implement a loop pattern to find the maximum number in a list without using `max()`.
<details>
<summary>Show Answer</summary>

```python
numbers = [3, 7, 2, 9, 1, 5]

# Initialize with first element
max_num = numbers[0]

# Compare with rest
for num in numbers[1:]:
    if num > max_num:
        max_num = num

print(f"Maximum: {max_num}")  # Output: Maximum: 9
```

**Alternative: Check for empty list**
```python
def find_max(numbers):
    if not numbers:
        return None
    
    max_num = numbers[0]
    for num in numbers:
        if num > max_num:
            max_num = num
    return max_num
```
</details>

**Question 3:** What's wrong with this accumulation pattern?
```python
numbers = [1, 2, 3, 4, 5]
for num in numbers:
    total = 0
    total += num
print(total)
```
<details>
<summary>Show Answer</summary>

**Problem:** `total = 0` is **inside** the loop, so it resets to 0 every iteration!

**Output:** `5` (only the last number)

**Fixed version:**
```python
numbers = [1, 2, 3, 4, 5]
total = 0  # Initialize OUTSIDE the loop
for num in numbers:
    total += num
print(total)  # Output: 15
```

This is a very common beginner mistake! Always initialize accumulator variables **before** the loop.
</details>

---

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

## Conclusion

Loops are fundamental to programming in Python. Whether you're processing data, automating tasks, or building complex algorithms, mastering `for` and `while` loops will make your code more efficient and powerful. Practice with different data types and loop patterns to become proficient in using loops effectively.

---

## 🎯 Final Quiz: Comprehensive Loop Challenge

**Question 1:** What will be the final output?
```python
result = 0
for i in range(1, 5):
    if i == 3:
        continue
    result += i
print(result)
```
<details>
<summary>Show Answer</summary>

**Output:** `7`

**Step-by-step:**
- i=1: result = 0 + 1 = 1
- i=2: result = 1 + 2 = 3
- i=3: `continue` skips this iteration
- i=4: result = 3 + 4 = 7
</details>

**Question 2:** Write a loop to print this pattern:
```
*
**
***
**
*
```
<details>
<summary>Show Answer</summary>

```python
# Growing phase
for i in range(1, 4):
    print("*" * i)

# Shrinking phase
for i in range(2, 0, -1):
    print("*" * i)
```

**Alternative: Single loop approach**
```python
for i in [1, 2, 3, 2, 1]:
    print("*" * i)
```
</details>

**Question 3:** Fix this infinite loop:
```python
x = 0
while x < 10:
    print(x)
    if x == 5:
        continue
    x += 1
```
<details>
<summary>Show Answer</summary>

**Problem:** When x reaches 5, `continue` skips the increment, so x stays 5 forever!

**Fixed version 1: Increment before continue**
```python
x = 0
while x < 10:
    if x == 5:
        x += 1
        continue
    print(x)
    x += 1
```

**Fixed version 2: Increment at the top**
```python
x = 0
while x < 10:
    x += 1
    if x == 5:
        continue
    print(x)
```

**Lesson:** Always ensure your loop variable is updated in all execution paths!
</details>

**Question 4:** Create a function that checks if a number is prime using loops.
<details>
<summary>Show Answer</summary>

```python
def is_prime(n):
    """Check if a number is prime."""
    if n < 2:
        return False
    
    # Check divisibility from 2 to sqrt(n)
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False  # Found a divisor
    
    return True  # No divisors found

# Tests
print(is_prime(7))   # True
print(is_prime(10))  # False
print(is_prime(13))  # True
print(is_prime(1))   # False
```

**With else clause:**
```python
def is_prime(n):
    if n < 2:
        return False
    
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            return False
    else:
        return True  # Only executes if no break occurred
```
</details>

**Question 5:** What's the output of this nested loop with break?
```python
for i in range(3):
    for j in range(3):
        if i == j == 1:
            break
        print(f"({i}, {j})")
```
<details>
<summary>Show Answer</summary>

**Output:**
```
(0, 0)
(0, 1)
(0, 2)
(1, 0)
(2, 0)
(2, 1)
(2, 2)
```

**Explanation:**
- Outer loop i=0: prints all j values (0,1,2) → 3 prints
- Outer loop i=1: prints j=0, then breaks when j=1 → 1 print
- Outer loop i=2: prints all j values (0,1,2) → 3 prints
- Total: 7 prints

The `break` only exits the **inner** loop, not the outer one!
</details>

---

🎉 **Congratulations!** You've mastered Python Loops. Practice these patterns in real projects to become a loop expert!