/**
 * Bambika Casino - User Account Settings Management
 * Path: js/settings.js
 */

const SettingsController = {
    formId: 'profileSettingsForm',
    riskToggleId: 'responsibleGamblingLimit',

    init() {
        this.bindDOMEvents();
        this.loadCurrentPreferences();
    },

    loadCurrentPreferences() {
        const user = window.AuthEngine ? window.AuthEngine.getUser() : null;
        if (!user) return;

        const emailField = document.getElementById('settingsEmail');
        const usernameField = document.getElementById('settingsUsername');
        
        if (usernameField) usernameField.value = user.username;
        if (emailField) emailField.value = `${user.username.toLowerCase()}@bambika-client.com`;
    },

    bindDOMEvents() {
        const form = document.getElementById(this.formId);
        if (form) {
            form.addEventListener('submit', (e) => this.handleFormSave(e));
        }
    },

    handleFormSave(e) {
        e.preventDefault();
        
        const usernameInput = document.getElementById('settingsUsername')?.value.trim();
        const maxBetLimit = parseFloat(document.getElementById(this.riskToggleId)?.value || "0");

        if (!usernameInput || usernameInput.length < 3) {
            alert("Error: Username criteria validation failed (minimum 3 characters required).");
            return;
        }

        // Fetch current active user profile cache state
        const updatedUser = window.AuthEngine.getUser() || {};
        updatedUser.username = usernameInput;
        updatedUser.maxWagerRestriction = maxBetLimit;

        localStorage.setItem(window.AuthEngine.userKey, JSON.stringify(updatedUser));
        
        // Notify user securely
        const visualNotice = document.getElementById('settingsSuccessAlert');
        if (visualNotice) {
            visualNotice.style.display = 'block';
            setTimeout(() => visualNotice.style.display = 'none', 3000);
        } else {
            alert("Settings profile configuration committed securely.");
        }
    }
};

document.addEventListener('DOMContentLoaded', () => SettingsController.init());

