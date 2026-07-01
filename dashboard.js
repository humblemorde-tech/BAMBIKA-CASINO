/**
 * Bambika Casino - Operational Dashboard Interface Controller
 * Path: js/dashboard.js
 */

class DashboardController {
    constructor() {
        this.user = window.AuthEngine ? window.AuthEngine.getUser() : null;
        this.init();
    }

    init() {
        if (!this.user) return;
        this.renderUserProfile();
        this.setupEventListeners();
        this.fetchLiveStats();
    }

    renderUserProfile() {
        const profileContainer = document.getElementById('dashProfileName');
        if (profileContainer) {
            profileContainer.textContent = this.user.username;
        }
    }

    setupEventListeners() {
        const logoutBtn = document.getElementById('logoutAction');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.AuthEngine) window.AuthEngine.logout();
            });
        }
    }

    // Live UI metric tracking simulation
    async fetchLiveStats() {
        try {
            // Simulated endpoint telemetry checking
            const activePlayers = Math.floor(Math.random() * (1200 - 850 + 1)) + 850;
            const totalVolume = "2,481,900";

            this.updateMetricDOM('activePlayersCount', activePlayers);
            this.updateMetricDOM('totalPlatformVolume', `KSh ${totalVolume}`);
        } catch (error) {
            console.error("[Dashboard Telemetry Error]:", error);
        }
    }

    updateMetricDOM(elementId, value) {
        const el = document.getElementById(elementId);
        if (el) el.textContent = value;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.Dashboard = new DashboardController();
});

