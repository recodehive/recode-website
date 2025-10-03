---
id: python-conditional-statements
title: Conditional Statements in Python
sidebar_label: Conditional Statements in Python
sidebar_position: 9
tags:
  [
    Python,
    Conditional Statements,
    if else,
    elif,
    Control Flow,
    Python Syntax
  ]

---

# Conditional Statements in Python

Conditional statements in Python allow you to make decisions in your code. They control the flow of execution depending on whether a given condition is **True** or **False**.

---

## The `if` Statement

The simplest conditional is the `if` statement.

**Syntax:**

```python
if condition:
    # block of code
```

**Example:**

```python
x = 10
if x > 5:
    print("x is greater than 5")
```

---

## The `if...else` Statement

The `else` block runs when the `if` condition is **False**.

```python
x = 3
if x > 5:
    print("x is greater than 5")
else:
    print("x is less than or equal to 5")
```

**Output:**
```
x is less than or equal to 5
```

---

## The `if...elif...else` Statement

`elif` stands for "else if". It lets you check multiple conditions.

```python
score = 85

if score >= 90:
    print("Grade A")
elif score >= 75:
    print("Grade B")
elif score >= 60:
    print("Grade C")
else:
    print("Grade D")
```

---

## Nested `if` Statements

You can put an `if` statement inside another `if` statement.

```python
x = 15
if x > 10:
    if x < 20:
        print("x is between 10 and 20")
```

---

## Conditional Expressions (Ternary Operator)

Python has a shorter way to write `if...else` using **ternary expressions**.

```python
age = 18
status = "Adult" if age >= 18 else "Minor"
print(status)
```

**Output:**
```
Adult
```

---

## Logical Operators in Conditions

You can combine multiple conditions using `and`, `or`, and `not`.

```python
x = 7
if x > 5 and x < 10:
    print("x is between 5 and 10")

if x < 5 or x > 10:
    print("x is outside 5 to 10")

if not x == 8:
    print("x is not 8")
```

---

## Comparing Multiple Values

You can check if a value exists in a sequence using `in`.

```python
fruits = ["apple", "banana", "cherry"]
if "apple" in fruits:
    print("Apple is in the list")
```

---

## Indentation Rules

In Python, indentation is important for defining code blocks.

```python
if True:
    print("This is indented correctly")
    print("Still inside if block")
print("Outside if block")
```

---

## Summary Table

| Statement Type          | Description                              |
|------------------------|------------------------------------------|
| `if`                   | Executes a block if condition is `True` |
| `if...else`            | Executes `else` block if condition is `False` |
| `if...elif...else`     | Checks multiple conditions               |
| Nested `if`            | `if` inside another `if`                 |
| Ternary Expression     | Short form of `if...else`                 |


###  **Practice Questions**

#### 1. **Positive / Negative / Zero Checker**

Write a Python program that takes a number as input and checks whether it is **positive**, **negative**, or **zero**.


#### 2. **Odd or Even**

Write a Python program to check whether a number is **even** or **odd**.


#### 3. **Age Eligibility for Voting**

Write a program to take a person’s age as input and check if they are **eligible to vote** (18 years or older).


#### 4. **Largest of Two Numbers**

Write a Python program that takes two numbers as input and prints the **larger number** using conditional statements.


#### 5. **Largest of Three Numbers**

Write a Python program to find the **largest among three numbers** entered by the user using `if`, `elif`, and `else`.


#### 6. **Grading System**

Write a Python program to take a student's marks as input and print the **grade** according to the following criteria:

* Marks ≥ 90 → Grade A
* Marks ≥ 75 and < 90 → Grade B
* Marks ≥ 50 and < 75 → Grade C
* Marks < 50 → Grade F


#### 7. **Leap Year Checker**

Write a program to check whether a given year is a **leap year** or not.
*(Hint: A year is leap if divisible by 4 but not 100, or divisible by 400)*


#### 8. **Nested If — Number Range Checker**

Write a program that takes a number as input and:

* Checks if it's **positive**.
* If positive, further checks if it is **less than 10**, **between 10 and 50**, or **greater than 50**.


#### 9. **Character Classification**

Write a program to input a single character and check whether it is:

* a **vowel**,
* a **consonant**,
* a **digit**, or
* a **special character**.


#### 10. **Login Authentication (Simple)**

Write a program that asks the user to enter a **username** and **password**.

* If the username is `"admin"` and the password is `"12345"`, print **“Login Successful”**.
* Otherwise, print **“Invalid credentials”**.


## Conclusion

Conditional statements are essential for decision-making in programs. Mastering `if`, `elif`, and `else` allows you to control your program's logic effectively.
