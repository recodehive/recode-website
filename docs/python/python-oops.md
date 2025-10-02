---
id: python-oops
title: Object-Oriented Programming
sidebar_label: OOPs in Python
sidebar_position: 11
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
  ]
---

# Object-Oriented Programming (OOPs) in Python

Python is an **object-oriented programming language**, which means it supports concepts like **classes, objects, inheritance, polymorphism, encapsulation, and abstraction**.  
OOP allows developers to structure programs so that properties and behaviors are bundled into objects, making code **modular, reusable, and easier to maintain**.

---

## 🔹 What is OOP?

- **Object-Oriented Programming (OOP)** is a programming paradigm based on the concept of **objects**.  
- Each object can hold **data (attributes)** and **functions (methods)** that operate on that data.  

 **Benefits of OOP in Python:**
- Reusability of code
- Encapsulation of data
- Modularity and abstraction
- Easier debugging and maintenance

---

## 🔹 Classes and Objects

A **class** is a blueprint for creating objects.  
An **object** is an instance of a class.  

```python
# Defining a class
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, my name is {self.name} and I am {self.age} years old."

# Creating objects
p1 = Person("Alice", 25)
p2 = Person("Bob", 30)

print(p1.greet())  # Output: Hello, my name is Alice and I am 25 years old.
print(p2.greet())  # Output: Hello, my name is Bob and I am 30 years old.
````



## 🔹 Attributes and Methods

* **Attributes** → Variables inside a class.
* **Methods** → Functions defined inside a class.

````python
class Car:
    wheels = 4  # Class attribute

    def __init__(self, brand, model):
        self.brand = brand   # Instance attribute
        self.model = model

    def info(self):         # Instance method
        return f"{self.brand} {self.model} has {Car.wheels} wheels."

c1 = Car("Tesla", "Model S")
print(c1.info())  # Tesla Model S has 4 wheels.
````

## 🔹 Encapsulation

Encapsulation means **restricting access** to certain variables/methods.
In Python, we use:

* `_protected_var` → convention for protected members
* `__private_var` → name mangling for private members

````python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance   # Private variable

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance

acc = BankAccount(1000)
acc.deposit(500)
print(acc.get_balance())   # 1500
````

---

## 🔹 Inheritance

Inheritance allows a class (child) to acquire properties of another class (parent).

````python
# Base class
class Animal:
    def speak(self):
        return "This is an animal."

# Derived class
class Dog(Animal):
    def speak(self):
        return "Woof! Woof!"

class Cat(Animal):
    def speak(self):
        return "Meow!"

d = Dog()
c = Cat()
print(d.speak())  # Woof! Woof!
print(c.speak())  # Meow!
````


## 🔹 Polymorphism

Polymorphism allows the same method name to perform different tasks depending on the object.

````python
for animal in [Dog(), Cat()]:
    print(animal.speak())

# Output:
# Woof! Woof!
# Meow!
````


## 🔹 Abstraction

Abstraction means **hiding implementation details** and showing only the necessary functionality.
In Python, we use the `abc` module to create abstract classes.

````python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius * self.radius

c = Circle(5)
print(c.area())  # 78.5
````

## 🔹 Summary

* **Class & Object** → Blueprint and instance
* **Attributes & Methods** → Data and behavior inside a class
* **Encapsulation** → Restricting access
* **Inheritance** → Reusing parent class features
* **Polymorphism** → Same function name, different behavior
* **Abstraction** → Hiding unnecessary details