/**
 * Bambika Casino - Core Local Mock Database Engine
 * Path: js/database.js
 */
(function() {
    'use strict';

    const DB_KEYS = {
        USERS: 'bambika_users_node',
        SESSION: 'bambika_active_session',
        LEDGER: 'bambika_global_ledger'
    };

    // Fallback seed accounts for a lively ecosystem out of the box
    const SEED_USERS = [
        { username: 'Nyeri_King', password: 'password123', balance: 14500 },
        { username: 'Matatu_Racer', password: 'password123', balance: 3200 },
        { username: 'Mombasa_Shark', password: 'password123', balance: 85000 }
    ];

    class LocalDatabase {
        constructor() {
            this.initStorage();
        }

        initStorage() {
            if (!localStorage.getItem(DB_KEYS.USERS)) {
                localStorage.setItem(DB_KEYS.USERS, JSON.stringify(SEED_USERS));
            }
            if (!localStorage.getItem(DB_KEYS.LEDGER)) {
                localStorage.setItem(DB_KEYS.LEDGER, JSON.stringify([]));
            }
        }

        // --- User Core Methods ---
        getUsers() {
            return JSON.parse(localStorage.getItem(DB_KEYS.USERS)) || [];
        }

        saveUsers(users) {
            localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
        }

        findUser(username) {
            return this.getUsers().find(u => u.username.toLowerCase() === username.toLowerCase());
        }

        createUser(username, password) {
            const users = this.getUsers();
            if (this.findUser(username)) {
                throw new Error("System Identity Error: Username already registered in this cell.");
            }
            
            const newUser = { username, password, balance: 1000 }; // New accounts start with 1,000 KSh welcome credit
            users.push(newUser);
            this.saveUsers(users);
            return newUser;
        }

        // --- Active Session Management ---
        getActiveSession() {
            return JSON.parse(localStorage.getItem(DB_KEYS.SESSION)) || null;
        }

        setActiveSession(user) {
            localStorage.setItem(DB_KEYS.SESSION, JSON.stringify(user));
        }

        clearActiveSession() {
            localStorage.removeItem(DB_KEYS.SESSION);
        }

        // --- Wallet Mutation Methods ---
        updateUserBalance(username, newBalance) {
            const users = this.getUsers();
            const userIndex = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
            
            if (userIndex !== -1) {
                users[userIndex].balance = newBalance;
                this.saveUsers(users);

                // Sync current active session if it matches the mutated balance user
                const currentSession = this.getActiveSession();
                if (currentSession && currentSession.username.toLowerCase() === username.toLowerCase()) {
                    currentSession.balance = newBalance;
                    this.setActiveSession(currentSession);
                }
            }
        }
    }

    // Bind instance securely onto global namespace window object
    window.LocalDB = new LocalDatabase();
})();
