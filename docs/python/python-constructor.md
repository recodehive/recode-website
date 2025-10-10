---
id: python-constructor
title: Python Constructor
sidebar_label: Python Constructor #displays in sidebar
description: Learn about constructors in Python OOP, including the __init__ method, types of constructors, and real-world use cases.
sidebar_position: 19
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
    Tuple in Python
    Array in Python
    Functions in Python
    Recursion in Python
    Opps in Python
  ]
---

# Constructor in Python

In Python, a **constructor** is a special method used to initialize the newly created object of a class. It is called automatically when a new object is created.

The most commonly used constructor in Python is the `__init__()` method.

---

## What is a Constructor?

A **constructor** is a special method in a class that is automatically called when an object is instantiated. It allows you to define and initialize the attributes of the object.

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

# Creating an object
p1 = Person("Alice", 25)

print(p1.name)  # Output: Alice
print(p1.age)   # Output: 25
````

In the above example, `__init__()` is the constructor. It takes `name` and `age` as parameters and assigns them to the object's attributes.

---

## Syntax of `__init__()` Constructor

```python
def __init__(self, parameters):
    # initialization code
```

* `self` refers to the current instance of the class.
* You can pass additional parameters to set initial values for the object.

---

## Types of Constructors in Python

### 1. Default Constructor

A constructor that takes only the `self` argument.

```python
class Demo:
    def __init__(self):
        print("This is a default constructor")

obj = Demo()
```

### 2. Parameterized Constructor

A constructor that takes additional arguments to initialize the object.

```python
class Student:
    def __init__(self, name, grade):
        self.name = name
        self.grade = grade

s1 = Student("Ravi", "A")
print(s1.name)   # Output: Ravi
print(s1.grade)  # Output: A
```

---

## Constructor with Default Values

You can also define default values for constructor parameters.

```python
class Car:
    def __init__(self, brand="Tesla"):
        self.brand = brand

car1 = Car()
car2 = Car("BMW")

print(car1.brand)  # Output: Tesla
print(car2.brand)  # Output: BMW
```

---

## Constructor in Inheritance

When using inheritance, the constructor of the base class can be called using `super()`.

```python
class Animal:
    def __init__(self, species):
        self.species = species

class Dog(Animal):
    def __init__(self, species, name):
        super().__init__(species)
        self.name = name

d = Dog("Mammal", "Buddy")
print(d.species)  # Output: Mammal
print(d.name)     # Output: Buddy
```

---

## Real-World Use Case: Managing a Library System

### Use Case: Library Book Management

Suppose you're building a **Library Management System** where each book has the following data: title, author, and availability status.

A constructor helps **initialize** the book’s data automatically when a book object is created.

```python
class Book:
    def __init__(self, title, author, available=True):
        self.title = title
        self.author = author
        self.available = available

    def display_info(self):
        status = "Available" if self.available else "Checked Out"
        print(f"{self.title} by {self.author} - {status}")

# Creating books
book1 = Book("1984", "George Orwell")
book2 = Book("The Alchemist", "Paulo Coelho", available=False)

book1.display_info()   # Output: 1984 by George Orwell - Available
book2.display_info()   # Output: The Alchemist by Paulo Coelho - Checked Out
```

### Why Constructor is Important Here?

* Ensures every book created has all the necessary data.
* Automatically sets a default availability status (e.g., available = True).
* Prevents manual initialization after creating the object.
* Keeps the code clean, consistent, and modular.

Without a constructor, you'd have to write multiple lines of code every time a book is created, which can lead to errors and duplication.

---

## Summary

* Constructors are used to initialize object properties at the time of creation.
* Python uses the `__init__()` method as a constructor.
* Constructors can be default, parameterized, or inherited.
* They improve code organization and reduce repetition.
* Real-world use cases like Library Systems, Inventory Management, User Registration, etc., rely heavily on constructors for clean initialization.