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
```

---

## 🎯 Quiz 1: Classes and Objects Basics

**Question 1:** What's the difference between a class and an object?
<details>
<summary>Show Answer</summary>

- **Class:** A blueprint or template that defines the structure and behavior
- **Object:** An actual instance created from that blueprint

**Analogy:** 
- Class = Cookie cutter (blueprint)
- Object = Actual cookie (instance)

```python
class Dog:  # Blueprint
    def bark(self):
        return "Woof!"

dog1 = Dog()  # Object/Instance 1
dog2 = Dog()  # Object/Instance 2
```

You can create multiple objects from one class, each with its own data.
</details>

**Question 2:** What is the purpose of the `__init__` method?
<details>
<summary>Show Answer</summary>

**`__init__`** is the **constructor method** that:
- Automatically runs when you create a new object
- Initializes the object's attributes
- Sets up the initial state of the object

```python
class Student:
    def __init__(self, name, grade):
        self.name = name      # Initialize attribute
        self.grade = grade    # Initialize attribute
        print(f"{name} enrolled!")

s1 = Student("Alice", "A")  # __init__ runs automatically
# Output: Alice enrolled!
```

**Note:** `self` refers to the instance being created.
</details>

**Question 3:** What will be the output?
```python
class Counter:
    def __init__(self):
        self.count = 0
    
    def increment(self):
        self.count += 1

c1 = Counter()
c2 = Counter()
c1.increment()
c1.increment()
c2.increment()
print(c1.count, c2.count)
```
<details>
<summary>Show Answer</summary>

**Output:** `2 1`

**Explanation:** 
- Each object has its **own separate** instance attributes
- `c1.count` is independent of `c2.count`
- c1 was incremented twice (0 → 1 → 2)
- c2 was incremented once (0 → 1)

This demonstrates **encapsulation** - each object maintains its own state.
</details>

---

## 🔹 Attributes and Methods

* **Attributes** → Variables inside a class.
* **Methods** → Functions defined inside a class.

```python
class Car:
    wheels = 4  # Class attribute

    def __init__(self, brand, model):
        self.brand = brand   # Instance attribute
        self.model = model

    def info(self):         # Instance method
        return f"{self.brand} {self.model} has {Car.wheels} wheels."

c1 = Car("Tesla", "Model S")
print(c1.info())  # Tesla Model S has 4 wheels.
```

---

## 🎯 Quiz 2: Attributes and Methods

**Question 1:** What's the difference between class attributes and instance attributes?
<details>
<summary>Show Answer</summary>

**Class Attributes:**
- Shared by **all instances** of the class
- Defined directly in the class body
- Same value for all objects (unless overridden)

**Instance Attributes:**
- Unique to **each instance**
- Defined in `__init__` using `self`
- Different values for different objects

```python
class Dog:
    species = "Canis familiaris"  # Class attribute (shared)
    
    def __init__(self, name):
        self.name = name  # Instance attribute (unique)

dog1 = Dog("Buddy")
dog2 = Dog("Max")

print(dog1.species)  # Canis familiaris (shared)
print(dog2.species)  # Canis familiaris (shared)
print(dog1.name)     # Buddy (unique)
print(dog2.name)     # Max (unique)
```
</details>

**Question 2:** What happens if you modify a class attribute?
```python
class Test:
    value = 10

t1 = Test()
t2 = Test()
Test.value = 20
print(t1.value, t2.value)
```
<details>
<summary>Show Answer</summary>

**Output:** `20 20`

**Explanation:** Changing the class attribute affects **all instances** that don't have their own instance attribute with the same name.

**But watch this:**
```python
class Test:
    value = 10

t1 = Test()
t2 = Test()
t1.value = 30      # Creates instance attribute for t1
Test.value = 20    # Changes class attribute

print(t1.value)    # 30 (uses instance attribute)
print(t2.value)    # 20 (uses class attribute)
print(Test.value)  # 20 (class attribute)
```

Instance attributes **shadow** class attributes!
</details>

**Question 3:** What is `self` in Python methods?
<details>
<summary>Show Answer</summary>

**`self`** is a reference to the **current instance** of the class. It:
- Must be the first parameter of instance methods
- Allows you to access instance attributes and methods
- Is automatically passed when you call a method

```python
class Person:
    def __init__(self, name):
        self.name = name  # self refers to the specific object
    
    def greet(self):
        # self allows access to this object's attributes
        return f"Hi, I'm {self.name}"

p1 = Person("Alice")
p1.greet()  # Python automatically passes p1 as self
# Equivalent to: Person.greet(p1)
```

**Note:** You can name it anything, but `self` is the convention!
</details>

---

## 🔹 Encapsulation

Encapsulation means **restricting access** to certain variables/methods.
In Python, we use:

* `_protected_var` → convention for protected members
* `__private_var` → name mangling for private members

```python
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
```

---

## 🎯 Quiz 3: Encapsulation

**Question 1:** Why use private variables (with `__` prefix)?
<details>
<summary>Show Answer</summary>

**Private variables prevent:**
- Accidental modification from outside the class
- Direct access to sensitive data
- Breaking the class's internal logic

```python
class BankAccount:
    def __init__(self, balance):
        self.__balance = balance
    
    def withdraw(self, amount):
        if amount <= self.__balance:
            self.__balance -= amount
            return True
        return False

acc = BankAccount(1000)
# acc.__balance = 9999999  # Doesn't work! (name mangling)
acc.withdraw(500)  # Controlled access through method
```

This ensures **data integrity** and **controlled access**.
</details>

**Question 2:** What happens when you try to access a private variable?
```python
class Secret:
    def __init__(self):
        self.__password = "secret123"

s = Secret()
print(s.__password)
```
<details>
<summary>Show Answer</summary>

**Error:** `AttributeError: 'Secret' object has no attribute '__password'`

**Explanation:** Python uses **name mangling** - it internally renames `__password` to `_Secret__password`.

**You can still access it (but shouldn't!):**
```python
print(s._Secret__password)  # secret123 (not recommended!)
```

**Proper way - use getter methods:**
```python
class Secret:
    def __init__(self):
        self.__password = "secret123"
    
    def get_password(self):
        return self.__password

s = Secret()
print(s.get_password())  # secret123
```
</details>

**Question 3:** What's the difference between `_var`, `__var`, and `var`?
<details>
<summary>Show Answer</summary>

| Naming Convention | Meaning | Accessible? |
|------------------|---------|-------------|
| `var` | Public | Yes, from anywhere |
| `_var` | Protected (convention) | Yes, but shouldn't access from outside |
| `__var` | Private (name mangling) | Not directly accessible |

```python
class Example:
    def __init__(self):
        self.public = "Everyone can access"
        self._protected = "Please don't access directly"
        self.__private = "Can't access easily"

e = Example()
print(e.public)      # ✅ Works
print(e._protected)  # ⚠️ Works, but discouraged
print(e.__private)   # ❌ AttributeError
```

**Important:** These are mainly **conventions** (except `__var` which has actual name mangling). Python doesn't enforce strict access control like Java or C++.
</details>

---

## 🔹 Inheritance

Inheritance allows a class (child) to acquire properties of another class (parent).

```python
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
```

---

## 🎯 Quiz 4: Inheritance

**Question 1:** What are the benefits of inheritance?
<details>
<summary>Show Answer</summary>

**Benefits of Inheritance:**
1. **Code Reusability** - Don't repeat common code
2. **Hierarchical Organization** - Natural parent-child relationships
3. **Extensibility** - Easy to add new features
4. **Maintainability** - Changes in parent affect all children

```python
class Vehicle:
    def __init__(self, brand):
        self.brand = brand
    
    def start(self):
        return f"{self.brand} is starting..."

# Reuse Vehicle code in Car
class Car(Vehicle):
    def honk(self):
        return "Beep beep!"

# Reuse Vehicle code in Motorcycle
class Motorcycle(Vehicle):
    def wheelie(self):
        return "Doing a wheelie!"

car = Car("Toyota")
print(car.start())  # Inherited from Vehicle
print(car.honk())   # Car's own method
```
</details>

**Question 2:** What will be the output?
```python
class Parent:
    def __init__(self):
        self.value = "Parent"
    
    def show(self):
        print(self.value)

class Child(Parent):
    def __init__(self):
        super().__init__()
        self.value = "Child"

c = Child()
c.show()
```
<details>
<summary>Show Answer</summary>

**Output:** `Child`

**Explanation:**
1. `Child.__init__` is called
2. `super().__init__()` calls `Parent.__init__`, setting `self.value = "Parent"`
3. Then `self.value = "Child"` overwrites it
4. `show()` is inherited from Parent, but uses Child's `value`

**Without super():**
```python
class Child(Parent):
    def __init__(self):
        # No super() call!
        self.value = "Child"

c = Child()
# Parent's __init__ never runs
```
</details>

**Question 3:** Can a child class have multiple parents in Python?
<details>
<summary>Show Answer</summary>

**Yes!** Python supports **multiple inheritance**.

```python
class Father:
    def gardening(self):
        return "I like gardening"

class Mother:
    def cooking(self):
        return "I like cooking"

class Child(Father, Mother):  # Multiple inheritance
    def playing(self):
        return "I like playing"

c = Child()
print(c.gardening())  # From Father
print(c.cooking())    # From Mother
print(c.playing())    # Own method
```

**Method Resolution Order (MRO):**
```python
print(Child.__mro__)
# Shows the order Python searches for methods
```

**Note:** Multiple inheritance can get complex. Use carefully!
</details>

---

## 🔹 Polymorphism

Polymorphism allows the same method name to perform different tasks depending on the object.

```python
for animal in [Dog(), Cat()]:
    print(animal.speak())

# Output:
# Woof! Woof!
# Meow!
```

---

## 🎯 Quiz 5: Polymorphism

**Question 1:** What is polymorphism in simple terms?
<details>
<summary>Show Answer</summary>

**Polymorphism** means "many forms" - the same interface (method name) can have different implementations.

**Example:**
```python
class Shape:
    def area(self):
        pass

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14 * self.radius ** 2

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

# Same method name, different behavior!
shapes = [Circle(5), Rectangle(4, 6)]
for shape in shapes:
    print(shape.area())  # Polymorphism in action!
```

**Key Point:** You can treat different objects uniformly through a common interface.
</details>

**Question 2:** What will this demonstrate?
```python
class Bird:
    def move(self):
        return "Flying"

class Fish:
    def move(self):
        return "Swimming"

class Snake:
    def move(self):
        return "Slithering"

animals = [Bird(), Fish(), Snake()]
for animal in animals:
    print(animal.move())
```
<details>
<summary>Show Answer</summary>

**Output:**
```
Flying
Swimming
Slithering
```

**This demonstrates:**
- **Polymorphism** - Same method name (`move()`), different behaviors
- **Duck Typing** - "If it walks like a duck and quacks like a duck, it's a duck"

In Python, you don't need a common parent class. Objects just need to have the same method name!

```python
# Python doesn't care about the type, just the interface
def make_animal_move(animal):
    print(animal.move())  # Works for any object with move()

make_animal_move(Bird())   # Flying
make_animal_move(Fish())   # Swimming
```
</details>

**Question 3:** How is polymorphism different from method overriding?
<details>
<summary>Show Answer</summary>

**Method Overriding:**
- A specific type of polymorphism
- Child class redefines a parent's method
- Requires inheritance

```python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):  # Overriding
        return "Woof!"
```

**Polymorphism (broader concept):**
- Different classes implementing the same interface
- Doesn't require inheritance
- Can work across unrelated classes

```python
# No inheritance needed!
class Duck:
    def speak(self):
        return "Quack"

class Person:
    def speak(self):
        return "Hello"

# Polymorphism - same interface, different classes
for thing in [Duck(), Person()]:
    print(thing.speak())
```

**Summary:** Method overriding is a way to achieve polymorphism, but polymorphism is a broader concept.
</details>

---

## 🔹 Abstraction

Abstraction means **hiding implementation details** and showing only the necessary functionality.
In Python, we use the `abc` module to create abstract classes.

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
        return 3.14 * self.radius * self.radius

c = Circle(5)
print(c.area())  # 78.5
```

---

## 🎯 Quiz 6: Abstraction

**Question 1:** Why use abstract classes?
<details>
<summary>Show Answer</summary>

**Abstract classes are used to:**
1. **Define a contract** - Force child classes to implement certain methods
2. **Prevent instantiation** - Can't create objects of abstract class
3. **Ensure consistency** - All subclasses follow the same interface
4. **Provide partial implementation** - Share common code while requiring specific implementations

```python
from abc import ABC, abstractmethod

class PaymentMethod(ABC):
    @abstractmethod
    def process_payment(self, amount):
        pass
    
    def validate(self):  # Concrete method in abstract class
        return True

class CreditCard(PaymentMethod):
    def process_payment(self, amount):
        return f"Processing ${amount} via Credit Card"

class PayPal(PaymentMethod):
    def process_payment(self, amount):
        return f"Processing ${amount} via PayPal"

# payment = PaymentMethod()  # ❌ Error! Can't instantiate
cc = CreditCard()  # ✅ Must implement process_payment
print(cc.process_payment(100))
```
</details>

**Question 2:** What happens if you don't implement an abstract method?
```python
from abc import ABC, abstractmethod

class Animal(ABC):
    @abstractmethod
    def sound(self):
        pass

class Dog(Animal):
    pass

d = Dog()
```
<details>
<summary>Show Answer</summary>

**Error:** `TypeError: Can't instantiate abstract class Dog with abstract method sound`

**Explanation:** If a child class doesn't implement all abstract methods, it remains abstract and can't be instantiated.

**Fixed version:**
```python
class Dog(Animal):
    def sound(self):  # Must implement
        return "Woof!"

d = Dog()  # ✅ Now works
print(d.sound())
```

**Partially implementing:**
```python
class Dog(Animal):
    # Still abstract - didn't implement sound()
    def eat(self):
        return "Eating"

# d = Dog()  # ❌ Still can't instantiate
```
</details>

**Question 3:** What's the difference between abstraction and encapsulation?
<details>
<summary>Show Answer</summary>

| Concept | Purpose | Implementation |
|---------|---------|----------------|
| **Abstraction** | Hide complexity, show only essential features | Abstract classes, interfaces |
| **Encapsulation** | Hide data, control access | Private variables, getter/setter |

**Abstraction Example:**
```python
from abc import ABC, abstractmethod

class Database(ABC):
    @abstractmethod
    def connect(self):
        pass  # Hide HOW connection works
    
    @abstractmethod
    def query(self, sql):
        pass  # Hide implementation details

# User doesn't need to know MySQL vs PostgreSQL internals
```

**Encapsulation Example:**
```python
class User:
    def __init__(self):
        self.__password = None  # Hide data
    
    def set_password(self, pwd):
        # Control HOW data is accessed/modified
        if len(pwd) >= 8:
            self.__password = pwd
    
    def verify_password(self, pwd):
        return self.__password == pwd
```

**Key Difference:**
- **Abstraction** = Hiding **complexity** (what you can do)
- **Encapsulation** = Hiding **data** (how it's stored/accessed)
</details>

---

## 🔹 Summary

* **Class & Object** → Blueprint and instance
* **Attributes & Methods** → Data and behavior inside a class
* **Encapsulation** → Restricting access
* **Inheritance** → Reusing parent class features
* **Polymorphism** → Same function name, different behavior
* **Abstraction** → Hiding unnecessary details

---

## 🎯 Final Quiz: Comprehensive OOP Challenge

**Question 1:** Design a simple class hierarchy for a library system.
<details>
<summary>Show Answer</summary>

```python
class LibraryItem:
    def __init__(self, title, item_id):
        self.title = title
        self.item_id = item_id
        self.is_checked_out = False
    
    def checkout(self):
        if not self.is_checked_out:
            self.is_checked_out = True
            return f"{self.title} checked out"
        return "Already checked out"
    
    def return_item(self):
        self.is_checked_out = False
        return f"{self.title} returned"

class Book(LibraryItem):
    def __init__(self, title, item_id, author, pages):
        super().__init__(title, item_id)
        self.author = author
        self.pages = pages
    
    def info(self):
        return f"Book: {self.title} by {self.author}, {self.pages} pages"

class DVD(LibraryItem):
    def __init__(self, title, item_id, director, duration):
        super().__init__(title, item_id)
        self.director = director
        self.duration = duration
    
    def info(self):
        return f"DVD: {self.title} directed by {self.director}, {self.duration} mins"

# Usage
book = Book("Python Basics", "B001", "John Doe", 300)
dvd = DVD("Learn Python", "D001", "Jane Smith", 120)

print(book.checkout())
print(book.info())
```
</details>

**Question 2:** What will be the output?
```python
class A:
    def __init__(self):
        self.x = 10
        self.__y = 20

class B(A):
    def __init__(self):
        super().__init__()
        self.x = 30

    def show(self):
        print(self.x)
        print(self.__y)

b = B()
b.show()
```
<details>
<summary>Show Answer</summary>

**Output:**
```
30
AttributeError: 'B' object has no attribute '_B__y'
```

**Explanation:**
- `self.x = 30` works fine (public attribute)
- `self.__y` doesn't exist in B's namespace due to name mangling
- Parent's `__y` is actually named `_A__y`

**Fixed version:**
```python
class B(A):
    def show(self):
        print(self.x)
        print(self._A__y)  # Access parent's private variable

b = B()
b.show()
# Output: 30, 20
```

**Best Practice:** Use getter methods instead of accessing private variables directly!
</details>

**Question 3:** Create a banking system with proper encapsulation.
<details>
<summary>Show Answer</summary>

```python
class BankAccount:
    def __init__(self, account_number, holder_name, initial_balance=0):
        self.__account_number = account_number
        self.__holder_name = holder_name
        self.__balance = initial_balance
        self.__transaction_history = []
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            self.__transaction_history.append(f"Deposit: +${amount}")
            return True
        return False
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            self.__transaction_history.append(f"Withdrawal: -${amount}")
            return True
        return False
    
    def get_balance(self):
        return self.__balance
    
    def get_statement(self):
        statement = f"Account: {self.__account_number}\n"
        statement += f"Holder: {self.__holder_name}\n"
        statement += f"Balance: ${self.__balance}\n"
        statement += "Transactions:\n"
        for transaction in self.__transaction_history:
            statement += f"  {transaction}\n"
        return statement

# Usage
account = BankAccount("ACC123", "Alice", 1000)
account.deposit(500)
account.withdraw(200)
print(account.get_statement())
```

**Key Features:**
- All sensitive data is private (`__balance`, `__account_number`)
- Controlled access through methods
- Validation in deposit/withdraw
- Transaction history tracking
</details>

**Question 4:** Implement polymorphism for different payment methods.
<details>
<summary>Show Answer</summary>

```python
class PaymentProcessor:
    def process(self, amount):
        raise NotImplementedError("Subclass must implement process()")

class CreditCardPayment(PaymentProcessor):
    def __init__(self, card_number):
        self.card_number = card_number
    
    def process(self, amount):
        return f"Charged ${amount} to card ending in {self.card_number[-4:]}"

class PayPalPayment(PaymentProcessor):
    def __init__(self, email):
        self.email = email
    
    def process(self, amount):
        return f"Sent ${amount} via PayPal to {self.email}"

class BitcoinPayment(PaymentProcessor):
    def __init__(self, wallet_address):
        self.wallet_address = wallet_address
    
    def process(self, amount):
        return f"Transferred ${amount} worth of BTC to {self.wallet_address[:8]}..."

# Polymorphism in action!
def checkout(payment_method, amount):
    print(payment_method.process(amount))

# All work with the same interface
payments = [
    CreditCardPayment("1234567890123456"),
    PayPalPayment("user@example.com"),
    BitcoinPayment("1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa")
]

for payment in payments:
    checkout(payment, 99.99)
```
</details>

**Question 5:** What OOP principles are demonstrated here?
```python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand):
        self._brand = brand
        self.__mileage = 0
    
    @abstractmethod
    def start(self):
        pass
    
    def add_miles(self, miles):
        self.__mileage += miles
    
    def get_mileage(self):
        return self.__mileage

class Car(Vehicle):
    def start(self):
        return f"{self._brand} car engine started"

class Motorcycle(Vehicle):
    def start(self):
        return f"{self._brand} motorcycle engine started"
```
<details>
<summary>Show Answer</summary>

**OOP Principles Demonstrated:**

1. **Abstraction** 
   - `Vehicle` is abstract with `@abstractmethod start()`
   - Hides implementation details

2. **Encapsulation**
   - `__mileage` is private
   - `_brand` is protected
   - Controlled access via `get_mileage()` and `add_miles()`

3. **Inheritance**
   - `Car` and `Motorcycle` inherit from `Vehicle`
   - Reuse common functionality

4. **Polymorphism**
   - Both subclasses implement `start()` differently
   - Can be used interchangeably through Vehicle interface

```python
vehicles = [Car("Toyota"), Motorcycle("Harley")]
for vehicle in vehicles:
    print(vehicle.start())  # Polymorphism
    vehicle.add_miles(100)   # Shared behavior
    print(f"Mileage: {vehicle.get_mileage()}")  # Encapsulation
```

**All four pillars of OOP in one example!**
</details>

---

🎉 **Congratulations!** You've mastered Object-Oriented Programming in Python. These concepts are fundamental to building scalable, maintainable applications!