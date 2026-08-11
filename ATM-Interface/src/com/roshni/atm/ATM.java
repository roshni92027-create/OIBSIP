package com.roshni.atm;

import java.util.List;
import java.util.Scanner;

public class ATM {

    private Bank bank;
    private Scanner scanner;
    private Account currentAccount;

    public ATM(Bank bank) {
        this.bank = bank;
        this.scanner = new Scanner(System.in);
    }

    // =========================
    // LOGIN
    // =========================

    public void start() {

        System.out.println("======================================");
        System.out.println("          WELCOME TO ATM");
        System.out.println("======================================");

        if (!login()) {
            System.out.println("\nToo many failed attempts.");
            System.out.println("Your session has been terminated.");
            return;
        }

        showMenu();
    }

    private boolean login() {

        final int MAX_ATTEMPTS = 3;

        for (int attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {

            System.out.println("\nLogin Attempt " + attempt + " of " + MAX_ATTEMPTS);

            System.out.print("Enter User ID: ");
            String userId = scanner.nextLine().trim();

            System.out.print("Enter PIN: ");
            String pin = scanner.nextLine().trim();

            Account account = bank.authenticate(userId, pin);

            if (account != null) {
                currentAccount = account;

                System.out.println("\nLogin successful!");
                System.out.println("Welcome, " + currentAccount.getName() + "!");

                return true;
            }

            int remainingAttempts = MAX_ATTEMPTS - attempt;

            System.out.println("\nInvalid User ID or PIN.");

            if (remainingAttempts > 0) {
                System.out.println("Remaining attempts: " + remainingAttempts);
            }
        }

        return false;
    }

    // =========================
    // MAIN MENU
    // =========================

    private void showMenu() {

        boolean running = true;

        while (running) {

            System.out.println("\n======================================");
            System.out.println("              ATM MENU");
            System.out.println("======================================");
            System.out.println("1. Transaction History");
            System.out.println("2. Withdraw");
            System.out.println("3. Deposit");
            System.out.println("4. Transfer");
            System.out.println("5. Check Balance");
            System.out.println("6. Quit");
            System.out.println("======================================");

            System.out.print("Enter your choice: ");

            String choice = scanner.nextLine().trim();

            switch (choice) {

                case "1":
                    showTransactionHistory();
                    break;

                case "2":
                    withdraw();
                    break;

                case "3":
                    deposit();
                    break;

                case "4":
                    transfer();
                    break;

                case "5":
                    checkBalance();
                    break;

                case "6":
                    running = false;
                    quit();
                    break;

                default:
                    System.out.println("\nInvalid choice. Please select 1-6.");
            }
        }
    }

    // =========================
    // TRANSACTION HISTORY
    // =========================

    private void showTransactionHistory() {

        System.out.println("\n======================================");
        System.out.println("         TRANSACTION HISTORY");
        System.out.println("======================================");

        List<Transaction> transactions =
                currentAccount.getTransactions();

        if (transactions.isEmpty()) {
            System.out.println("No transactions available.");
            return;
        }

        System.out.printf(
                "%-12s %-12s %-30s %s%n",
                "TYPE",
                "AMOUNT",
                "DESCRIPTION",
                "DATE & TIME"
        );

        System.out.println(
                "--------------------------------------------------------------------------"
        );

        for (Transaction transaction : transactions) {
            System.out.println(transaction);
        }
    }

    // =========================
    // WITHDRAW
    // =========================

    private void withdraw() {

        System.out.println("\n======================================");
        System.out.println("             WITHDRAW");
        System.out.println("======================================");

        double amount = readAmount("Enter amount to withdraw: ₹");

        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
            return;
        }

        if (amount > currentAccount.getBalance()) {
            System.out.println("Insufficient Funds.");
            System.out.printf(
                    "Available balance: ₹%.2f%n",
                    currentAccount.getBalance()
            );
            return;
        }

        boolean successful = currentAccount.withdraw(amount);

        if (successful) {

            Transaction transaction = new Transaction(
                    "WITHDRAW",
                    amount,
                    "Cash withdrawn"
            );

            currentAccount.addTransaction(transaction);

            System.out.printf(
                    "₹%.2f withdrawn successfully.%n",
                    amount
            );

            System.out.printf(
                    "Remaining balance: ₹%.2f%n",
                    currentAccount.getBalance()
            );
        }
    }

    // =========================
    // DEPOSIT
    // =========================

    private void deposit() {

        System.out.println("\n======================================");
        System.out.println("              DEPOSIT");
        System.out.println("======================================");

        double amount = readAmount("Enter amount to deposit: ₹");

        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
            return;
        }

        currentAccount.deposit(amount);

        Transaction transaction = new Transaction(
                "DEPOSIT",
                amount,
                "Cash deposited"
        );

        currentAccount.addTransaction(transaction);

        System.out.printf(
                "₹%.2f deposited successfully.%n",
                amount
        );

        System.out.printf(
                "Current balance: ₹%.2f%n",
                currentAccount.getBalance()
        );
    }

    // =========================
    // TRANSFER
    // =========================

    private void transfer() {

        System.out.println("\n======================================");
        System.out.println("              TRANSFER");
        System.out.println("======================================");

        System.out.print("Enter receiver User ID: ");

        String receiverId = scanner.nextLine().trim();

        Account receiver = bank.findAccount(receiverId);

        if (receiver == null) {
            System.out.println("Receiver account not found.");
            return;
        }

        if (receiver == currentAccount) {
            System.out.println("You cannot transfer money to your own account.");
            return;
        }

        double amount = readAmount("Enter amount to transfer: ₹");

        if (amount <= 0) {
            System.out.println("Amount must be greater than zero.");
            return;
        }

        if (amount > currentAccount.getBalance()) {
            System.out.println("Insufficient Funds.");
            System.out.printf(
                    "Available balance: ₹%.2f%n",
                    currentAccount.getBalance()
            );
            return;
        }

        currentAccount.withdraw(amount);
        receiver.deposit(amount);

        Transaction senderTransaction = new Transaction(
                "TRANSFER",
                amount,
                "Transfer to " + receiver.getUserId()
        );

        Transaction receiverTransaction = new Transaction(
                "RECEIVED",
                amount,
                "Received from " + currentAccount.getUserId()
        );

        currentAccount.addTransaction(senderTransaction);
        receiver.addTransaction(receiverTransaction);

        System.out.printf(
                "₹%.2f transferred successfully to %s.%n",
                amount,
                receiver.getName()
        );

        System.out.printf(
                "Remaining balance: ₹%.2f%n",
                currentAccount.getBalance()
        );
    }

    // =========================
    // CHECK BALANCE
    // =========================

    private void checkBalance() {

        System.out.println("\n======================================");
        System.out.println("             BALANCE");
        System.out.println("======================================");

        System.out.printf(
                "Current balance: ₹%.2f%n",
                currentAccount.getBalance()
        );
    }

    // =========================
    // INPUT VALIDATION
    // =========================

    private double readAmount(String message) {

        while (true) {

            System.out.print(message);

            String input = scanner.nextLine().trim();

            try {

                return Double.parseDouble(input);

            } catch (NumberFormatException e) {

                System.out.println(
                        "Invalid amount. Please enter a valid number."
                );
            }
        }
    }

    // =========================
    // QUIT
    // =========================

    private void quit() {

        System.out.println("\n======================================");
        System.out.println("Thank you for using our ATM.");
        System.out.println("Have a great day!");
        System.out.println("======================================");
    }
}