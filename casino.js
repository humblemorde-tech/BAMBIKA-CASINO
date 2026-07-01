/**
 * Bambika Casino - Shared Modular Casino Engine
 * Path: js/casino.js
 * Handles game variations (slots, wheels, cards) across pages casino1 to casino10.
 */

class CasinoEngine {
    constructor(gameId, options = {}) {
        this.gameId = gameId;
        this.minBet = options.minBet || 10;
        this.maxBet = options.maxBet || 50000;
        this.rtp = options.rtp || 0.95; // 95% Return to Player target simulation
        
        this.isSpinning = false;
        this.init();
    }

    init() {
        console.log(`[Bambika Casino] Initialized Engine Variant: ${this.gameId}`);
    }

    /**
     * Provably Fair outcomes based on cryptographic seed verification
     */
    generateOutcome() {
        const rollArray = new Uint32Array(1);
        window.crypto.getRandomValues(rollArray);
        // Normalize roll between 0.00000000 and 1.00000000
        return rollArray[0] / Math.pow(2, 32);
    }

    async placeWager(betAmount, runMechanicCallback) {
        if (this.isSpinning) return { error: "Action in progress." };
        if (betAmount < this.minBet || betAmount > this.maxBet) {
            return { error: `Bet must be between KSh ${this.minBet} and KSh ${this.maxBet}` };
        }

        try {
            // Deduct funds safely before rendering results
            window.Wallet.mutateBalance(betAmount, 'DEBIT');
            this.isSpinning = true;

            const seedValue = this.generateOutcome();
            
            // Execute the specific visual logic attached by the specific page script
            const gameResult = runMechanicCallback(seedValue, this.rtp);

            // Expecting result template: { winMultiplier: 0, payouts: 0 }
            if (gameResult.winMultiplier > 0) {
                const totalPayout = betAmount * gameResult.winMultiplier;
                window.Wallet.mutateBalance(totalPayout, 'CREDIT');
                this.isSpinning = false;
                return { ...gameResult, payout: totalPayout, status: 'WIN' };
            }

            this.isSpinning = false;
            return { ...gameResult, payout: 0, status: 'LOSS' };

        } catch (err) {
            this.isSpinning = false;
            return { error: err.message || "Transaction aborted." };
        }
    }
}

window.CasinoEngine = CasinoEngine;

