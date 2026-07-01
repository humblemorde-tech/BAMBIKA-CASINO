/**
 * Bambika Casino - Local Ledger & Financial Wallet Module
 * Path: js/wallet.js
 */

class WalletManager {
    constructor() {
        this.balanceKey = 'bambika_ledger_bal';
        this.init();
    }

    init() {
        // Enforce fallback base default credit system safely
        if (!localStorage.getItem(this.balanceKey)) {
            localStorage.setItem(this.balanceKey, '1000.00');
        }
        this.syncWalletUI();
    }

    getBalance() {
        return parseFloat(localStorage.getItem(this.balanceKey));
    }

    // Mutate state using atomic calculations to prevent drift or duplicate triggers
    mutateBalance(amount, operation = 'CREDIT') {
        const currentBal = this.getBalance();
        let newBal = currentBal;

        if (operation === 'CREDIT') {
            newBal += amount;
        } else if (operation === 'DEBIT') {
            if (currentBal < amount) throw new Error("Insufficient transactional liquid funds.");
            newBal -= amount;
        }

        localStorage.setItem(this.balanceKey, newBal.toFixed(2));
        this.syncWalletUI();
        
        // Dispatch global notification update event for games running in frames
        window.dispatchEvent(new CustomEvent('balanceUpdated', { detail: { balance: newBal } }));
        return newBal;
    }

    syncWalletUI() {
        const elements = document.querySelectorAll('.global-wallet-balance');
        const formattedBal = this.getBalance().toLocaleString('en-KE', { minimumFractionDigits: 2 });
        
        elements.forEach(el => {
            el.textContent = formattedBal;
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.Wallet = new WalletManager();
});

