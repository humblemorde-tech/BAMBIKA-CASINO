/**
 * Bambika Casino - High Roller Competition Leaderboard
 * Path: js/leaderboard.js
 */

const LeaderboardManager = {
    domTableBodyId: 'leaderboardRows',
    updateInterval: null,

    init() {
        this.renderLiveMockData();
        // Constantly poll or simulate live high bets coming through
        this.updateInterval = setInterval(() => this.simulateLiveHighRollers(), 4000);
    },

    generateMockData() {
        return [
            { rank: 1, user: "Player_Alpha", game: "Crash 3", wager: 5000, multi: "24.50x", profit: 122500 },
            { rank: 2, user: "Nyeri_King", game: "Casino 1", wager: 10000, multi: "5.00x", profit: 50000 },
            { rank: 3, user: "BetMaster_254", game: "Crash 1", wager: 1500, multi: "12.10x", profit: 18150 },
            { rank: 4, user: "LadyLuck", game: "Casino 7", wager: 2000, multi: "4.50x", profit: 9000 },
            { rank: 5, user: "CryptoWhale", game: "Crash 9", wager: 25000, multi: "1.20x", profit: 5000 }
        ];
    },

    renderLiveMockData() {
        const tableBody = document.getElementById(this.domTableBodyId);
        if (!tableBody) return;

        const data = this.generateMockData();
        tableBody.innerHTML = ''; // Sanitize clean write

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>#${row.rank}</strong></td>
                <td>${row.user}</td>
                <td><span class="badge-game">${row.game}</span></td>
                <td>KSh ${row.wager.toLocaleString()}</td>
                <td style="color: #00e676;">${row.multi}</td>
                <td style="color: #00e676; font-weight: bold;">KSh ${row.profit.toLocaleString()}</td>
            `;
            tableBody.appendChild(tr);
        });
    },

    simulateLiveHighRollers() {
        const tableBody = document.getElementById(this.domTableBodyId);
        if (!tableBody || !tableBody.firstChild) return;

        // Visual alert notification helper for newly added high payouts
        const randomUsers = ["AviatorBoss", "Mombasa_Tech", "PlinkoGod", "Winner777"];
        const randomGames = ["Crash 1", "Crash 5", "Casino 4", "Casino 10"];
        
        const wager = Math.floor(Math.random() * 5000) + 500;
        const multiplier = (Math.random() * 8 + 1.1).toFixed(2);
        const profit = Math.floor(wager * multiplier);

        if (multiplier > 3.0) {
            const newRow = document.createElement('tr');
            newRow.style.backgroundColor = 'rgba(0, 230, 118, 0.05)';
            newRow.innerHTML = `
                <td><span class="live-flash">LIVE</span></td>
                <td>${randomUsers[Math.floor(Math.random() * randomUsers.length)]}</td>
                <td><span class="badge-game">${randomGames[Math.floor(Math.random() * randomGames.length)]}</span></td>
                <td>KSh ${wager.toLocaleString()}</td>
                <td style="color: #00e676;">${multiplier}x</td>
                <td style="color: #00e676; font-weight: bold;">KSh ${profit.toLocaleString()}</td>
            `;

            tableBody.insertBefore(newRow, tableBody.firstChild);
            if (tableBody.children.length > 8) {
                tableBody.removeChild(tableBody.lastChild);
            }
        }
    },

    destroy() {
        if (this.updateInterval) clearInterval(this.updateInterval);
    }
};

document.addEventListener('DOMContentLoaded', () => LeaderboardManager.init());
                
