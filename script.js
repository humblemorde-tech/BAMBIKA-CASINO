/**
 * Bambika Casino - Core Public Routing & Global View Utility
 * Path: js/script.js
 */
(function() {
    'use strict';

    class PublicGlobalController {
        constructor() {
            this.initLandingSessionCheck();
        }

        initLandingSessionCheck() {
            // Only update layout cards if running within the landing base shell
            const actionWrapper = document.getElementById('landingActionWrapper');
            if (!actionWrapper) return;

            // Verify if a token persists inside local database nodes
            if (window.AuthEngine && window.AuthEngine.isAuthenticated()) {
                const sessionUser = window.AuthEngine.getCurrentUser();
                
                // Update landing page UI layout for existing sessions
                actionWrapper.innerHTML = `
                    <a href="dashboard.html" class="cta-btn btn-primary" style="max-width: 100%;">
                        CONTINUE TO WORKSPACE PANEL (${sessionUser.username})
                    </a>
                `;
            }
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        window.BambikaPublic = new PublicGlobalController();
    });
})();

