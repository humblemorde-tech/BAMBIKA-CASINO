/**
 * Bambika Casino - Reactive Security Authentication Pipeline
 * Path: js/auth.js
 */
(function() {
    'use strict';

    class AuthenticationEngine {
        constructor() {
            this.initSessionSync();
        }

        initSessionSync() {
            // Automatically log users out if they try to touch dashboard frames without token
            const session = window.LocalDB.getActiveSession();
            const isAuthPage = window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html');

            if (!session && !isAuthPage && !window.location.pathname.endsWith('/') && !window.location.pathname.includes('index.html')) {
                window.location.href = 'login.html';
            }
        }

        isAuthenticated() {
            return window.LocalDB.getActiveSession() !== null;
        }

        getCurrentUser() {
            return window.LocalDB.getActiveSession();
        }

        async login(username, password) {
            // Artificial delay to simulate network latency processing lag
            await new Promise(resolve => setTimeout(resolve, 600));

            const user = window.LocalDB.findUser(username);
            if (!user || user.password !== password) {
                throw new Error("Access Rejection: Invalid profile credentials.");
            }

            window.LocalDB.setActiveSession(user);
            return true;
        }

        async register(username, password) {
            await new Promise(resolve => setTimeout(resolve, 800));
            
            // Creates the account data schema inside local storage memory
            const newUser = window.LocalDB.createUser(username, password);
            window.LocalDB.setActiveSession(newUser);
            return true;
        }

        logout() {
            window.LocalDB.clearActiveSession();
            window.location.href = 'login.html';
        }
    }

    window.AuthEngine = new AuthenticationEngine();

    // Bind common logout button triggers across panels instantly
    document.addEventListener('DOMContentLoaded', () => {
        const logoutBtn = document.getElementById('logoutAction');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.AuthEngine.logout();
            });
        }
    });
})();
  
