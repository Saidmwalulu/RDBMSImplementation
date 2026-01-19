# Simple In-Memory RDBMS Challenge

Snapshot from the project ( 13 Jan 2026 )

![Capture](https://github.com/Saidmwalulu/RDBMSImplementation/blob/main/output.png)


This project is a simplified, in-memory relational database management system (RDBMS) built as a Junior Developer Challenge.

The focus of this implementation is understanding core database concepts, not building a production-ready system.

# What It Supports

--> Interactive SQL REPL

--> Table creation with basic data types

--> CRUD operations (INSERT, SELECT, UPDATE, DELETE)

--> Primary key and unique key enforcement

--> Indexing using B+ Trees

--> Basic WHERE filtering

--> Simple JOIN support

--> Demo web app connecting to the database

# High-Level Design
SQL Input
 → SQL Parser
 → AST
 → Query Execution Engine
 → In-Memory Storage + Indexes


- SQL input is parsed into an AST using an external parser library

- The execution engine walks the AST and performs operations

- Tables and records are stored in memory

- Indexed columns use B+ Trees for fast lookup and constraint enforcement

# Indexing & Keys

--> Primary and unique keys are enforced using B+ Tree indexes

--> Duplicate key inserts are rejected at execution time

# Libraries & Acknowledgements

To focus on learning database internals within a limited timeline, this project uses:

--> A SQL parser library for query parsing

--> A B+ Tree library for indexing

--> libmexpr.a for expression evaluation

These libraries were used transparently and intentionally.
The goal was to understand how these components fit together in an RDBMS.

# Limitations

--> In-memory only (no persistence)

--> No transactions or concurrency

--> Limited SQL grammar

--> Minimal query optimization

# Motivation

This project demonstrates clear thinking, learning under pressure, and system design fundamentals, which aligns with the intent of the Developer challenge.

To Compile and build :
=====================

Download :  git clone https://github.com/Saidmwalulu/RDBMSImplementation.git and switch to branch 'main'
Download : git clone https://github.com/sachinites/MathExpressionParser and switch to branch 'Oops'

cd MathExpressionParser 
git checkout Oops
cd Course sh compile.sh

cd RDBMSImplementation
git checkout main
cd Course/SqlParser
sh compile.sh

./dbms.exe 


===== Thanks ================
