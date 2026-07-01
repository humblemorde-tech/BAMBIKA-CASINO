/**
 * Bambika Casino - Gateway Access View Layout
 * Path: css/auth.css
 */

.auth-viewport-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Soft shifting neon ambient backdrop animation */
    background: linear-gradient(135deg, #0f1115 0%, #111b2d 50%, #0f1115 100%);
    background-size: 400% 400%;
    animation: ambientGlow 12s ease infinite;
    padding: 20px;
}

@keyframes ambientGlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.auth-form-shield {
    width: 100%;
    max-width: 440px;
    background: rgba(26, 28, 35, 0.85);
    /* Soft light blue outline glow */
    border: 1px solid rgba(144, 164, 174, 0.15);
    backdrop-filter: blur(12px);
    border-radius: var(--radius-lg);
    padding: 40px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 230, 118, 0.03);
}

.auth-brand-logo {
    font-size: 2.2rem;
    font-weight: 900;
    text-align: center;
    margin-bottom: 8px;
    letter-spacing: 2px;
    color: var(--text-primary);
}

.auth-brand-logo span {
    color: var(--brand-accent);
    text-shadow: 0 0 10px rgba(255, 0, 60, 0.6);
}

/* Fix for buttons and inputs alignment sizing */
.form-input {
    box-sizing: border-box;
    display: block;
    width: 100%;
    margin-top: 4px;
}

.auth-submit-action {
    display: block;
    width: 100%;
    box-sizing: border-box;
    text-align: center;
      }

