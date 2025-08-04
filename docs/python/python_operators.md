---
id: python-operators
title: Python Operators
sidebar_label: Python Operators #displays in sidebar
sidebar_position: 5
tags: [Python, Introduction of python, Python Syntax, Python Variables, Python Operators]
---

# Python Operators

In Python, **operators** are special symbols used to perform operations on variables and values.
Python supports a wide variety of operators categorized based on their functionality.

## Operator Categories

Python provides the following types of operators:

1. [Arithmetic Operators](#1-arithmetic-operators)
2. [Comparison Operators](#2-comparison-operators)
3. [Logical Operators](#3-logical-operators)
4. [Assignment Operators](#4-assignment-operators)
5. [Bitwise Operators](#5-bitwise-operators)
6. [Membership Operators](#6-membership-operators)
7. [Identity Operators](#7-identity-operators)
8. [Operator Precedence](#8-operator-precedence)

## Arithmetic Operators

Used to perform basic mathematical operations:

| Operator | Description         | Example   | Result |
| -------- | ------------------- | --------- | ------ |
| `+`      | Addition            | `10 + 5`  | `15`   |
| `-`      | Subtraction         | `10 - 5`  | `5`    |
| `*`      | Multiplication      | `10 * 5`  | `50`   |
| `/`      | Division            | `10 / 5`  | `2.0`  |
| `//`     | Floor Division      | `10 // 3` | `3`    |
| `%`      | Modulus (remainder) | `10 % 3`  | `1`    |
| `**`     | Exponentiation      | `2 ** 3`  | `8`    |

## Comparison Operators

Used to compare two values and return a Boolean result (`True` or `False`).

| Operator | Description           | Example  | Result  |
| -------- | --------------------- | -------- | ------- |
| `==`     | Equal to              | `5 == 5` | `True`  |
| `!=`     | Not equal to          | `5 != 3` | `True`  |
| `>`      | Greater than          | `5 > 3`  | `True`  |
| `<`      | Less than             | `5 < 3`  | `False` |
| `>=`     | Greater than or equal | `5 >= 5` | `True`  |
| `<=`     | Less than or equal    | `5 <= 3` | `False` |

## Logical Operators

Used to combine conditional statements.

| Operator | Description                    | Example          | Result  |
| -------- | ------------------------------ | ---------------- | ------- |
| `and`    | True if both operands are true | `True and False` | `False` |
| `or`     | True if at least one is true   | `True or False`  | `True`  |
| `not`    | Reverses the result            | `not True`       | `False` |

## Assignment Operators

Used to assign values to variables.

| Operator | Example   | Same as       |
| -------- | --------- | ------------- |
| `=`      | `x = 5`   | Assign 5 to x |
| `+=`     | `x += 3`  | `x = x + 3`   |
| `-=`     | `x -= 2`  | `x = x - 2`   |
| `*=`     | `x *= 4`  | `x = x * 4`   |
| `/=`     | `x /= 2`  | `x = x / 2`   |
| `//=`    | `x //= 2` | `x = x // 2`  |
| `%=`     | `x %= 2`  | `x = x % 2`   |
| `**=`    | `x **= 2` | `x = x ** 2`  |

## Bitwise Operators

Used to perform bit-level operations.

| Operator | Description | Example  | Result |
| -------- | ----------- | -------- | ------ | --- | --- |
| `&`      | AND         | `5 & 3`  | `1`    |
| `        | `           | OR       | `5     | 3`  | `7` |
| `^`      | XOR         | `5 ^ 3`  | `6`    |
| `~`      | NOT         | `~5`     | `-6`   |
| `<<`     | Left Shift  | `5 << 1` | `10`   |
| `>>`     | Right Shift | `5 >> 1` | `2`    |

## Membership Operators

Used to test if a sequence contains a value.

| Operator | Description                  | Example              | Result |
| -------- | ---------------------------- | -------------------- | ------ |
| `in`     | Value exists in the sequence | `"a" in "apple"`     | `True` |
| `not in` | Value not in sequence        | `"z" not in "apple"` | `True` |

## Identity Operators

Used to compare the memory location of two objects.

| Operator | Description                       | Example      | Result |
| -------- | --------------------------------- | ------------ | ------ |
| `is`     | Returns `True` if same object     | `x is y`     | `True` |
| `is not` | Returns `True` if not same object | `x is not y` | `True` |

## Use Cases of Python Operators

---

### 1. **Arithmetic Operators**

📌 **Use Case**: Shopping Cart Total

```python
price = 150
quantity = 3
total = price * quantity  # ➜ 450
discount = 0.10
final_amount = total - (total * discount)  # ➜ 405.0
```

**Explanation**: Calculates the total bill with a discount using `*` and `-`.

---

### 2. **Comparison Operators**

📌 **Use Case**: Age Verification for Voting

```python
age = 17
if age >= 18:
    print("Eligible to vote")
else:
    print("Not eligible")
```

**Explanation**: Compares age using `>=` to determine eligibility.

---

### 3. **Logical Operators**

📌 **Use Case**: Login System Authentication

```python
username = "admin"
password = "1234"

if username == "admin" and password == "1234":
    print("Login successful")
else:
    print("Invalid credentials")
```

**Explanation**: Combines two conditions using `and`.

---

### 4. **Assignment Operators**

📌 **Use Case**: Updating Game Score

```python
score = 0
score += 10  # Player scored
score += 5   # Bonus
# Final score = 15
```

**Explanation**: Increments the score using `+=`.

---

### 5. **Bitwise Operators**

📌 **Use Case**: File Permission System (Read = 4, Write = 2, Execute = 1)

```python
read = 4
write = 2
execute = 1

permission = read | write  # ➜ 6 (read + write)
has_write = permission & write  # ➜ 2 (True)
```

**Explanation**: Combines permissions using `|` and checks with `&`.

---

### 6. **Membership Operators**

📌 **Use Case**: Search Term Filtering

```python
query = "python"
if "python" in ["java", "python", "c++"]:
    print("Result found")
```

**Explanation**: Checks if a word exists in a list using `in`.

---

### 7. **Identity Operators**

📌 **Use Case**: Comparing Object Identity

```python
x = [1, 2, 3]
y = x
z = [1, 2, 3]

print(x is y)  # True
print(x is z)  # False
```

**Explanation**: Uses `is` to check if variables point to the same object in memory.

---

### 8. **Operator Precedence**

📌 **Use Case**: Evaluating an Expression

```python
result = 10 + 5 * 2  # ➜ 10 + (5 * 2) = 20
```

**Explanation**: `*` is evaluated before `+` due to higher precedence.

---

## Summary Table

| Operator Type | Example Use Case                   |
| ------------- | ---------------------------------- |
| Arithmetic    | Calculating total cost             |
| Comparison    | Validating age for access          |
| Logical       | Checking login credentials         |
| Assignment    | Updating scores or counters        |
| Bitwise       | Managing file permissions (bits)   |
| Membership    | Search and filter operations       |
| Identity      | Verifying object references        |
| Precedence    | Proper expression evaluation order |

## Conclusion

Operators are the core building blocks of logic and calculation in Python. Understanding how they
work is crucial to writing effective Python code.
