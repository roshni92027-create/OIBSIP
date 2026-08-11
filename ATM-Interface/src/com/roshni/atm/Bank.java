package com.roshni.atm;

import java.util.ArrayList;
import java.util.List;

public class Bank {

    private List<Account> accounts;

    public Bank() {
        accounts = new ArrayList<>();
        createSampleAccounts();
    }

    private void createSampleAccounts() {

        Account account1 = new Account(
                "user01",
                "1234",
                "Roshni",
                10000.00
        );

        Account account2 = new Account(
                "user02",
                "5678",
                "Rahul",
                15000.00
        );

        Account account3 = new Account(
                "user03",
                "2468",
                "Priya",
                20000.00
        );

        accounts.add(account1);
        accounts.add(account2);
        accounts.add(account3);
    }

    public Account findAccount(String userId) {

        for (Account account : accounts) {

            if (account.getUserId().equals(userId)) {
                return account;
            }
        }

        return null;
    }

    public Account authenticate(String userId, String pin) {

        Account account = findAccount(userId);

        if (account != null && account.getPin().equals(pin)) {
            return account;
        }

        return null;
    }

    public List<Account> getAccounts() {
        return accounts;
    }
}