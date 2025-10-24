---
id: sql-transactions-concurrency
title: SQL Transactions & Concurrency
sidebar_label: Transactions & Concurrency
sidebar_position: 13
tags: [sql, transactions, concurrency, database, relational-databases]
description: In this super beginner-friendly guide, you’ll learn about SQL transactions and concurrency—how to manage data changes safely and handle multiple users accessing the database at once!
keywords: [sql, transactions, concurrency, ACID, isolation levels, locking, sql tutorial, sql basics, database management, sql for beginners, sql in 2025]
---



## 📙 Welcome to SQL Transactions & Concurrency!

Hey there, SQL beginner! Transactions and concurrency are all about keeping your database safe and consistent when multiple operations or users are involved. Think of transactions as a way to group changes (like bank transfers) to ensure they’re done correctly, and concurrency as the rules for handling multiple users accessing the database at the same time. We’ll use a simple `students` table (with columns like `id`, `name`, `age`, `marks`, and `city`) to explain everything with clear examples. Let’s dive in step by step!

### 📘 What Are Transactions & Concurrency?

A **transaction** is a sequence of SQL operations (e.g., INSERT, UPDATE) treated as a single unit—either all succeed or none do. **Concurrency** deals with how databases manage multiple transactions happening simultaneously without causing issues like data corruption. Together, they ensure your database remains reliable.

We’ll cover:
- **ACID Properties**: The rules that make transactions trustworthy.
- **Transaction Commands**: COMMIT, ROLLBACK, SAVEPOINT for controlling transactions.
- **Isolation Levels**: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE for managing concurrency.
- **Locking**: Row-level vs. table-level locks to prevent conflicts.

> **Pro Tip**: Understanding transactions and concurrency helps you avoid errors like lost updates or inconsistent data in multi-user environments!

### 📘 ACID Properties (The Rules of Safe Transactions!)

ACID stands for **Atomicity**, **Consistency**, **Isolation**, and **Durability**—the four properties that ensure transactions are reliable.

**The Four Properties**:
- **Atomicity**: Ensures all operations in a transaction complete successfully, or none are applied (all-or-nothing).
- **Consistency**: Guarantees the database remains in a valid state before and after a transaction (e.g., no broken rules like foreign key violations).
- **Isolation**: Ensures transactions are independent, so partial changes from one transaction aren’t visible to others until complete.
- **Durability**: Guarantees that once a transaction is committed, changes are permanently saved, even if the system crashes.

**Example**:
    :::info
<Tabs>
  <TabItem value="SQL Code" label="SQL Code">
```sql title="Demonstrating ACID in a Transaction"
START TRANSACTION;
UPDATE students SET marks = marks + 10 WHERE id = 1; -- Atomicity: Part of a single unit
INSERT INTO students (id, name, age, marks, city) VALUES (4, 'Dave', 18, 80, 'Mumbai');
-- Consistency: Ensures marks are valid, no duplicates in id
COMMIT; -- Durability: Changes saved permanently
-- Isolation: Other users don’t see changes until COMMIT
```
  </TabItem>

  <TabItem value="Output" label="Output">
1 row updated, 1 row inserted in `students`. Transaction committed.
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: Don’t assume all databases enforce ACID fully—some (e.g., older NoSQL systems) may sacrifice consistency for performance. Check your DBMS documentation!

### 🔄 Transaction Commands (Controlling Your Changes!)

These commands manage transactions to ensure data integrity. They belong to TCL (Transaction Control Language).

**Three Key Commands**:
- **COMMIT**: Saves all changes in a transaction permanently.
- **ROLLBACK**: Undoes all changes since the transaction started.
- **SAVEPOINT**: Sets a checkpoint to partially roll back to.

**Examples**:
    :::info
<Tabs>
  <TabItem value="COMMIT" label="COMMIT">
```sql title="Using COMMIT"
START TRANSACTION;
INSERT INTO students (id, name, age, marks, city) VALUES (3, 'Carol', 19, 75, 'Delhi');
COMMIT; -- Saves the INSERT
```
  </TabItem>

  <TabItem value="COMMIT Output" label="COMMIT Output">
1 row inserted. Transaction committed.
  </TabItem>

  <TabItem value="ROLLBACK" label="ROLLBACK">
```sql title="Using ROLLBACK"
START TRANSACTION;
UPDATE students SET marks = 100 WHERE id = 3;
ROLLBACK; -- Undoes the UPDATE
```
  </TabItem>

  <TabItem value="ROLLBACK Output" label="ROLLBACK Output">
Transaction rolled back; no changes saved.
  </TabItem>

  <TabItem value="SAVEPOINT" label="SAVEPOINT">
```sql title="Using SAVEPOINT"
START TRANSACTION;
INSERT INTO students (id, name, age, marks, city) VALUES (5, 'Eve', 21, 88, 'Delhi');
SAVEPOINT save1;
UPDATE students SET marks = 90 WHERE id = 5;
ROLLBACK TO save1; -- Keeps INSERT, undoes UPDATE
COMMIT;
```
  </TabItem>

  <TabItem value="SAVEPOINT Output" label="SAVEPOINT Output">
1 row inserted. Rolled back to save1; UPDATE undone. Transaction committed.
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: 
> - Don’t forget to COMMIT or ROLLBACK—uncommitted transactions can lock resources!
> - Don’t overuse SAVEPOINTs; they can make transaction logic hard to follow.

### 📘 Isolation Levels (Managing Concurrent Transactions!)

Isolation levels define how much one transaction’s changes are visible to others, balancing consistency with performance. They control concurrency issues like **dirty reads** (reading uncommitted data), **non-repeatable reads** (data changing during a transaction), and **phantom reads** (new rows appearing).

**Four Standard Levels** (from least to most strict):
- **READ UNCOMMITTED**: Allows reading uncommitted changes (risk of dirty reads).
- **READ COMMITTED**: Only reads committed data, but allows non-repeatable reads.
- **REPEATABLE READ**: Ensures consistent reads within a transaction, but phantom reads are possible.
- **SERIALIZABLE**: Strictest; transactions run as if one at a time, preventing all concurrency issues.

**Examples**:
    :::info
<Tabs>
  <TabItem value="READ UNCOMMITTED" label="READ UNCOMMITTED">
```sql title="Setting READ UNCOMMITTED"
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
START TRANSACTION;
SELECT marks FROM students WHERE id = 1; -- May see uncommitted changes
COMMIT;
```
  </TabItem>

  <TabItem value="READ UNCOMMITTED Output" label="Output">
| marks |
|-------|
| 85    | -- Could include uncommitted data
Transaction committed.
  </TabItem>

  <TabItem value="READ COMMITTED" label="READ COMMITTED">
```sql title="Setting READ COMMITTED"
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
START TRANSACTION;
SELECT marks FROM students WHERE id = 1; -- Only committed data
COMMIT;
```
  </TabItem>

  <TabItem value="READ COMMITTED Output" label="Output">
| marks |
|-------|
| 85    |
Transaction committed.
  </TabItem>

  <TabItem value="REPEATABLE READ" label="REPEATABLE READ">
```sql title="Setting REPEATABLE READ"
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT marks FROM students WHERE id = 1; -- Consistent during transaction
-- Another SELECT here returns same marks
COMMIT;
```
  </TabItem>

  <TabItem value="REPEATABLE READ Output" label="Output">
| marks |
|-------|
| 85    |
Transaction committed.
  </TabItem>

  <TabItem value="SERIALIZABLE" label="SERIALIZABLE">
```sql title="Setting SERIALIZABLE"
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
START TRANSACTION;
SELECT * FROM students WHERE city = 'Mumbai'; -- No phantom rows
COMMIT;
```
  </TabItem>

  <TabItem value="SERIALIZABLE Output" label="Output">
| id | name  | age | marks | city   |
|----|-------|-----|-------|--------|
| 1  | Alice | 20  | 85    | Mumbai |
Transaction committed.
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: 
> - Don’t use READ UNCOMMITTED unless you’re okay with potentially inconsistent data!
> - Don’t default to SERIALIZABLE for all queries—it can slow down performance due to heavy locking.

### 🔄 Locking: Row-Level vs. Table-Level Locks (Preventing Conflicts!)

Locking prevents conflicts when multiple transactions access the same data. Locks can be **row-level** (affecting specific rows) or **table-level** (affecting the entire table).

**Row-Level vs. Table-Level**:
- **Row-Level Locks**: Only lock specific rows involved in a transaction, allowing other rows to be accessed. Common in UPDATE or SELECT ... FOR UPDATE.
- **Table-Level Locks**: Lock the entire table, restricting access to all rows. Used in DDL operations or explicit LOCK TABLE commands.

**Examples**:
    :::info
<Tabs>
  <TabItem value="Row-Level Lock" label="Row-Level Lock">
```sql title="Using Row-Level Lock"
START TRANSACTION;
SELECT * FROM students WHERE id = 1 FOR UPDATE; -- Locks only row with id=1
UPDATE students SET marks = 95 WHERE id = 1;
COMMIT;
```
  </TabItem>

  <TabItem value="Row-Level Lock Output" label="Output">
Row with id=1 locked and updated. Transaction committed.
  </TabItem>

  <TabItem value="Table-Level Lock" label="Table-Level Lock">
```sql title="Using Table-Level Lock"
LOCK TABLES students WRITE; -- Locks entire table
UPDATE students SET marks = marks + 5;
UNLOCK TABLES;
```
  </TabItem>

  <TabItem value="Table-Level Lock Output" label="Output">
Table `students` locked, all rows updated, table unlocked.
  </TabItem>
</Tabs>
:::

> **What NOT to Do**: 
> - Don’t use table-level locks for small updates—row-level locks are more efficient!
> - Don’t hold locks longer than necessary; it can cause deadlocks or slow down other users.

## ✅ What You’ve Learned

You’re now a pro at SQL transactions and concurrency! You’ve mastered:
- **ACID Properties**: Atomicity, Consistency, Isolation, Durability for reliable transactions.
- **Transaction Commands**: COMMIT, ROLLBACK, SAVEPOINT for controlling changes.
- **Isolation Levels**: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE for managing concurrency.
- **Locking**: Row-level vs. table-level locks to prevent conflicts.

Practice these concepts with the `students` table in a multi-user environment. Follow the “What NOT to Do” tips to keep your database safe and performant!