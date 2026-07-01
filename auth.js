/**
 * Bambika Casino - Authentication Engine
 * Path: js/auth.js
 */

const AuthEngine = {
    // Session State
    sessionKey: 'bambika_session_token',
    userKey: 'bambika_user_profile',

    init() {
        // Run security lifecycle verification automatically
        this.verifyRouteAccess();
    },

    // Mock API Authentication Endpoint
    async login(username, password) {
        // Enforce strict frontend verification before payload dispatch
        if (!username || !password) throw new Error("Missing structural credentials.");

        // In a live server build, substitute with a secure fetch/Axios routing request
        if (username.trim() && password.length >= 6) {
            const mockUser = {
                uid: "usr_827419",
                username: username,
                currency: "KSh",
                joined: "2026-07-01"
            };
            const mockToken = "jwt_bambika_crypto_sig_production_secure";
            
            localStorage.setItem(this.sessionKey, mockToken);
            localStorage.setItem(this.userKey, JSON.stringify(mockUser));
            return true;
        }
        throw new Error("Invalid username or password match.");
    },

    logout() {
        localStorage.removeItem(this.sessionKey);
        localStorage.removeItem(this.userKey);
        window.location.href = 'login.html';
    },

    isAuthenticated() {
        return localStorage.getItem(this.sessionKey) !== null;
    },

    getUser() {
        const user = localStorage.getItem(this.userKey);
        return user ? JSON.parse(user) : null;
    },

    verifyRouteAccess() {
        const currentPath = window.location.pathname;
        const publicPages = ['index.html', 'login.html', 'register.html', 'about.html', 'contact.html'];
        
        // Match path suffix accurately
        const isPublic = publicPages.some(page => currentPath.endsWith(page)) || currentPath === '/';

        if (!this.isAuthenticated() && !isPublic) {
            // Redirect unauthorized access directly back to authentication shell
            window.location.href = '../login.html'; 
        }
    }
};

document.addEventListener('DOMContentLoaded', () => AuthEngine.init());
window.AuthEngine = AuthEngine;

