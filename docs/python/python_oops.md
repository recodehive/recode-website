---
id: python-OOPs
title: Python OOPs concept
sidebar_label: Python OOPs concept #displays in sidebar
sidebar_position: 19
author: Seema Kumari Patel
description: OOPs concept in Python
tags:
  [
    Python,
    Introduction of python,
    Python Syntax,
    Python Variables,
    Python Operators,
  ]
---


# Python OOPs concept

**OOP** is a way of organizing code that uses objects and classes to represent real-world entities and their behavior. In OOP, object has attributes thing that has specific data and can perform certain actions using methods.


Characteristics of OOP (Object Oriented Programming)
Python supports the core principles of object-oriented programming, which are the building blocks for designing robust and reusable software. The diagram below demonstrates these core principles:

1. Class - A blueprint for creating objects.

📌 **Use Case**: create a class - car

```python
class Car:
    def __init__(self, brand, model):
        self.brand = brand
        self.model = model

    def start(self):
        print(f"{self.brand} {self.model} is starting...")
```

2. Object - An instance of a class.

📌 **Use Case**: instantiate the variables

```python
my_car = Car("Tesla", "Model S")
my_car.start()  # Tesla Model S is starting...
```


3. Encapsulation - Hiding the internal details and only exposing necessary parts.

📌 **Use Case**: Not letting data to be accessed by other class

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance  # private variable

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance
```


4. Inheritance - One class can inherit from another.

📌 **Use Case**: Car (parent) class is inherited by ElectricCar (child) class

```python
class ElectricCar(Car):
    def __init__(self, brand, model, battery):
        super().__init__(brand, model)
        self.battery = battery

    def battery_info(self):
        print(f"Battery: {self.battery} kWh")

tesla = ElectricCar("Tesla", "Model X", 100)
tesla.start()
tesla.battery_info()
```


5. Polymorphism - Same function name, but different behavior depending on the object.

📌 **Use Case**: Different classes using single method for different purposes.

```python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

pets = [Dog(), Cat()]
for pet in pets:
    print(pet.speak())  # Woof! / Meow!
```


6. Abstraction - Hiding implementation details, showing only essential features (using abc module).

📌 **Use Case**: Hiding low level details

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def area(self):
        return 3.14 * self.radius ** 2

c = Circle(5)
print(c.area())  # 78.5
```


