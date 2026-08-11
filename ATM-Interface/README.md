# 🏦 ATM Interface

A console-based **ATM Interface** developed using **Java** as part of the **Oasis Infobyte Internship Program (OIBSIP)**.

This project simulates a basic ATM banking system where users can authenticate using a User ID and PIN and perform operations such as checking balance, depositing money, withdrawing money, transferring money, and viewing transaction history.

The application is designed using **Object-Oriented Programming (OOP)** principles and separates responsibilities across multiple Java classes.

---

## 📌 Project Overview

The ATM Interface is a Java console application that provides a simple simulation of an ATM banking environment.

After successful authentication, a user can access an ATM menu containing the following operations:

1. Transaction History
2. Withdraw
3. Deposit
4. Transfer
5. Check Balance
6. Quit

The application maintains account information and transaction history during the execution of the program.

Each transaction records:

- Transaction type
- Transaction amount
- Description
- Date and time

The project also includes input validation and handles several invalid-operation scenarios such as incorrect login credentials, invalid amounts, insufficient funds, invalid recipient accounts, and transfers to the same account.

---

# 🎯 Project Objective

The main objectives of this project are:

- To build a functional ATM simulation using Java.
- To implement user authentication.
- To practice Object-Oriented Programming concepts.
- To manage account information using Java classes and objects.
- To implement banking operations such as deposit, withdrawal, and transfer.
- To maintain transaction history.
- To implement input validation.
- To practice Java collections such as `ArrayList`.
- To use `LocalDateTime` for recording transaction timestamps.
- To organize a Java project into multiple classes with clearly defined responsibilities.

---

# ✨ Features

## 🔐 1. User Authentication

The application requires the user to enter:

- User ID
- PIN

The credentials are checked against the accounts maintained by the `Bank` class.

The application allows a maximum of **3 login attempts**.

If all three attempts fail, the session is terminated.

---

## 💰 2. Check Balance

After successful login, the user can check the current account balance.

The balance is displayed with two decimal places.

Example:

```text
Current balance: ₹10000.00
