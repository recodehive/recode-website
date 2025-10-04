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

### 🧠 Quiz 1: Basic Conditionals

**Question 1:** What will be the output of the following code?
```python
x = 7
if x > 10:
    print("Large")
else:
    print("Small")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Small`

**Explanation:** Since 7 is not greater than 10, the condition `x > 10` is False, so the `else` block executes and prints "Small".
</details>

**Question 2:** What does `elif` stand for in Python?

<details>
<summary>Click to reveal answer</summary>

**Answer:** "else if"

**Explanation:** `elif` is short for "else if" and is used to check multiple conditions in sequence.
</details>

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

### 🧠 Quiz 2: Ternary Operator & Nested Conditions

**Question 1:** What will the variable `result` contain after this code runs?
```python
temperature = 25
result = "Hot" if temperature > 30 else "Cold"
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `"Cold"`

**Explanation:** Since 25 is not greater than 30, the condition is False, so the value after `else` ("Cold") is assigned to `result`.
</details>

**Question 2:** What will be printed by this nested if statement?
```python
x = 12
if x > 5:
    if x < 15:
        print("Valid")
    else:
        print("Too high")
else:
    print("Too low")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Valid`

**Explanation:** First, `x > 5` is True (12 > 5), so we enter the outer if block. Then, `x < 15` is also True (12 < 15), so "Valid" is printed.
</details>

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

### 🧠 Quiz 3: Logical Operators

**Question 1:** What will be the output?
```python
a = 10
b = 20
if a > 5 and b < 15:
    print("Both true")
else:
    print("At least one false")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `At least one false`

**Explanation:** While `a > 5` is True (10 > 5), `b < 15` is False (20 is not less than 15). Since `and` requires both conditions to be True, the result is False and the else block executes.
</details>

**Question 2:** What does this code print?
```python
x = 8
if not x == 8:
    print("Not eight")
else:
    print("Is eight")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Is eight`

**Explanation:** `x == 8` is True, but the `not` operator negates it to False. So the if condition fails and the else block runs, printing "Is eight".
</details>

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

Write a program to take a person's age as input and check if they are **eligible to vote** (18 years or older).


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

* If the username is `"admin"` and the password is `"12345"`, print **"Login Successful"**.
* Otherwise, print **"Invalid credentials"**.

---

### 🧠 Quiz 4: Code Output Prediction

**Question 1:** What will this code output?
```python
marks = 82
if marks >= 90:
    print("A")
elif marks >= 75:
    print("B")
elif marks >= 60:
    print("C")
else:
    print("D")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `B`

**Explanation:** The code checks conditions in order. Since 82 is not ≥ 90 but is ≥ 75, it prints "B" and stops checking further conditions.
</details>

**Question 2:** Predict the output:
```python
fruits = ["apple", "banana", "cherry"]
if "mango" in fruits:
    print("Found")
else:
    print("Not found")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Not found`

**Explanation:** "mango" is not in the fruits list, so the condition is False and the else block executes.
</details>

---

### 🧠 Quiz 5: Challenge Questions

**Question 1:** What's wrong with this code?
```python
x = 5
if x > 3:
print("Greater")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** Missing indentation

**Explanation:** The print statement must be indented to be inside the if block. Python uses indentation to define code blocks, and this code will raise an `IndentationError`.
</details>

**Question 2:** What will be printed?
```python
year = 2024
if year % 4 == 0 and year % 100 != 0:
    print("Leap")
elif year % 400 == 0:
    print("Leap")
else:
    print("Not Leap")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Leap`

**Explanation:** 2024 is divisible by 4 (2024 % 4 == 0) and not divisible by 100 (2024 % 100 == 24, not 0), so the first condition is True and "Leap" is printed.
</details>

**Question 3:** Write a single line of code using a ternary operator to assign "Pass" to a variable `result` if `score` is 50 or more, otherwise assign "Fail".

<details>
<summary>Click to reveal answer</summary>

**Answer:** 
```python
result = "Pass" if score >= 50 else "Fail"
```

**Explanation:** The ternary operator format is `value_if_true if condition else value_if_false`.
</details>

---

## Conclusion

Conditional statements are essential for decision-making in programs. Mastering `if`, `elif`, and `else` allows you to control your program's logic effectively.