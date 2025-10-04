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


# Python OOPs

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

---

### 🧠 Quiz 1: Classes and Objects

**Question 1:** What is the relationship between a class and an object?

<details>
<summary>Click to reveal answer</summary>

**Answer:** A class is a blueprint, and an object is an instance of that class

**Explanation:** Think of a class as a blueprint for a house (defining what it should have), and objects as the actual houses built from that blueprint. Each object can have different values for its attributes.
</details>

**Question 2:** What will be the output of this code?
```python
class Dog:
    def __init__(self, name):
        self.name = name

dog1 = Dog("Buddy")
print(dog1.name)
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Buddy`

**Explanation:** The `__init__` method is the constructor that initializes the object. When we create `dog1 = Dog("Buddy")`, the name attribute is set to "Buddy", which is then printed.
</details>

**Question 3:** What is the purpose of the `self` parameter in Python class methods?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It refers to the instance of the class itself

**Explanation:** `self` allows you to access the attributes and methods of the current object. It's automatically passed when you call a method, so `my_car.start()` is actually `Car.start(my_car)` behind the scenes.
</details>

---

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

---

### 🧠 Quiz 2: Encapsulation

**Question 1:** What does the double underscore `__` before a variable name signify in Python?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It makes the variable private (name mangling)

**Explanation:** Variables starting with `__` (like `__balance`) are considered private. They cannot be directly accessed from outside the class, providing encapsulation and data protection.
</details>

**Question 2:** How can you access the private variable `__balance` from outside the class?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Through public methods like `get_balance()` or using `_ClassName__variableName`

**Explanation:** The proper way is to use getter methods like `get_balance()`. While you can technically access it using `_BankAccount__balance`, this defeats the purpose of encapsulation and should be avoided.
</details>

**Question 3:** Why is encapsulation important in OOP?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It protects data from unauthorized access and modification, improving security and maintainability

**Explanation:** Encapsulation allows you to control how data is accessed and modified. For example, in a bank account, you can ensure deposits are positive numbers and prevent direct manipulation of the balance.
</details>

---

4. Inheritance - One class can inherit from another.

📌 **Use Case**: car (parent) class is getting inherited by (child) ElectricCar

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

---

### 🧠 Quiz 3: Inheritance

**Question 1:** What is the purpose of `super().__init__(brand, model)` in the code above?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It calls the parent class's `__init__` method to initialize inherited attributes

**Explanation:** `super()` allows the child class to access methods from the parent class. Here, it initializes `brand` and `model` from the parent `Car` class before adding the new `battery` attribute.
</details>

**Question 2:** Can an `ElectricCar` object use the `start()` method even though it's not defined in the `ElectricCar` class?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Yes, because it inherits the method from the parent `Car` class

**Explanation:** Inheritance allows child classes to use all methods and attributes from the parent class. `ElectricCar` inherits `start()` from `Car`, so `tesla.start()` works perfectly.
</details>

**Question 3:** What is the parent class in the code example above?

<details>
<summary>Click to reveal answer</summary>

**Answer:** `Car`

**Explanation:** `Car` is the parent (or base/super) class, and `ElectricCar` is the child (or derived/sub) class. This is shown by `class ElectricCar(Car):`.
</details>

---

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

---

### 🧠 Quiz 4: Polymorphism

**Question 1:** What does polymorphism mean in OOP?

<details>
<summary>Click to reveal answer</summary>

**Answer:** The ability of different objects to respond to the same method call in different ways

**Explanation:** Polymorphism (meaning "many forms") allows different classes to have methods with the same name but different implementations. In the example, both `Dog` and `Cat` have a `speak()` method, but they return different sounds.
</details>

**Question 2:** What will be the output of this code?
```python
class Bird:
    def move(self):
        return "Fly"

class Fish:
    def move(self):
        return "Swim"

animals = [Bird(), Fish()]
for animal in animals:
    print(animal.move())
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** 
```
Fly
Swim
```

**Explanation:** Each object responds to `move()` with its own implementation. The `Bird` object returns "Fly" and the `Fish` object returns "Swim", demonstrating polymorphism.
</details>

**Question 3:** Why is polymorphism useful in programming?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It allows you to write flexible code that can work with objects of different types through a common interface

**Explanation:** Polymorphism lets you write code like `for pet in pets: print(pet.speak())` without knowing the specific type of each pet. This makes code more flexible, maintainable, and easier to extend.
</details>

---

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

---

### 🧠 Quiz 5: Abstraction and OOP Concepts

**Question 1:** What happens if you try to create an instance of the abstract `Shape` class directly?
```python
shape = Shape()
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** It raises a `TypeError` - you cannot instantiate an abstract class

**Explanation:** Abstract classes (created using `ABC`) are meant to be templates that other classes inherit from. They cannot be instantiated directly. You must create a concrete subclass that implements all abstract methods.
</details>

**Question 2:** What is the purpose of the `@abstractmethod` decorator?

<details>
<summary>Click to reveal answer</summary>

**Answer:** It forces child classes to implement that specific method

**Explanation:** When a method is decorated with `@abstractmethod`, any class that inherits from the abstract class MUST provide an implementation for that method. This ensures a consistent interface across all child classes.
</details>

**Question 3:** Match each OOP principle with its description:

<details>
<summary>Click to reveal answer</summary>

**Answer:**
- **Encapsulation** → Hiding internal data and providing controlled access
- **Inheritance** → Creating new classes based on existing ones
- **Polymorphism** → Same method name, different behavior
- **Abstraction** → Hiding complex implementation details, showing only essential features

**Explanation:** These four pillars of OOP work together to create well-organized, maintainable code:
- Encapsulation protects data
- Inheritance promotes code reuse
- Polymorphism enables flexibility
- Abstraction simplifies complexity
</details>

**Question 4:** What would happen if the `Circle` class didn't implement the `area()` method?

<details>
<summary>Click to reveal answer</summary>

**Answer:** Python would raise a `TypeError` when trying to instantiate the `Circle` class

**Explanation:** Since `area()` is an abstract method in the parent `Shape` class, any concrete child class must implement it. If `Circle` doesn't provide an implementation, Python won't allow you to create a `Circle` object.
</details>

**Question 5:** Which OOP principle is demonstrated in this code?
```python
class PaymentProcessor:
    def process(self, amount):
        pass

class CreditCard(PaymentProcessor):
    def process(self, amount):
        print(f"Processing ${amount} via Credit Card")

class PayPal(PaymentProcessor):
    def process(self, amount):
        print(f"Processing ${amount} via PayPal")
```

<details>
<summary>Click to reveal answer</summary>

**Answer:** Both Inheritance and Polymorphism

**Explanation:** 
- **Inheritance**: `CreditCard` and `PayPal` inherit from `PaymentProcessor`
- **Polymorphism**: Both classes have their own implementation of the `process()` method
This allows you to treat different payment methods uniformly while each processes payments in its own way.
</details>

---

## Conclusion

Object-Oriented Programming in Python provides powerful tools for organizing code through classes, objects, encapsulation, inheritance, polymorphism, and abstraction. Mastering these concepts enables you to write more maintainable, reusable, and scalable code.

