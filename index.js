const axios = require('axios');
const http = require("http");

// --- FIREBASE SETUP ---
const dbURL = "https://kalyan-casino-default-rtdb.firebaseio.com";
const dbSecret = "DxpcRSQSUKD1jbhsuYlzYzaMmqtj4R3x0bDjZJWP"; // Aapka Secret Key

console.log("🚀 Super Master Engine Starting on Cloud...");

// Common functions to talk to Firebase
async function fbUpdate(path, data) {
    try { await axios.patch(`${dbURL}/${path}.json?auth=${dbSecret}`, data); } 
    catch (e) { /* ignore network blips */ }
}
async function fbGet(path) {
    try { const res = await axios.get(`${dbURL}/${path}.json?auth=${dbSecret}`); return res.data; } 
    catch (e) { return null; }
}
async function fbDelete(path) {
    try { await axios.delete(`${dbURL}/${path}.json?auth=${dbSecret}`); } catch (e) {}
}

// ==========================================
// MASTER LOOP (Saare games ek sath chalenge)
// ==========================================
setInterval(async () => {
    
    // 1. DRAGON TIGER
    let dtStatus = await fbGet('Game/DragonTiger/Status');
    if (dtStatus) {
        let t = dtStatus.timer;
        if (t > 0) {
            fbUpdate('Game/DragonTiger/Status', { timer: t - 1, state: 'betting' });
        } else if (t === 0) {
            let bets = await fbGet('Game/DragonTiger/Bets') || {};
            let d = 0, t2 = 0, tie = 0;
            Object.values(bets).forEach(b => { d += (b.dragon || 0); t2 += (b.tiger || 0); tie += (b.tie || 0); });
            let win = (d <= t2 && d <= tie) ? 'dragon' : (t2 <= d && t2 <= tie ? 'tiger' : 'tie');
            fbUpdate('Game/DragonTiger/Status', { timer: -1, state: 'result', winner: win });
            fbDelete('Game/DragonTiger/Bets');
            setTimeout(() => fbUpdate('Game/DragonTiger/Status', { timer: 15, state: 'betting' }), 7000);
        }
    }

    // 2. ANDAR BAHAR
    let abStatus = await fbGet('Game/AndarBahar/Status');
    if (abStatus) {
        let t = abStatus.timer;
        if (t === 15) {
            let jV = ["A","2","3","4","5","6","7","8","9","0","J","Q","K"][Math.floor(Math.random()*13)];
            fbUpdate('Game/AndarBahar/Status', { timer: 14, state: 'betting', jokerVal: jV, jokerSuit: 'S' });
        } else if (t > 0) {
            fbUpdate('Game/AndarBahar/Status', { timer: t - 1 });
        } else if (t === 0) {
            let bets = await fbGet('Game/AndarBahar/Bets') || {};
            let a = 0, b = 0;
            Object.values(bets).forEach(bt => { a += (bt.andar || 0); b += (bt.bahar || 0); });
            let win = (a <= b) ? 'andar' : 'bahar';
            fbUpdate('Game/AndarBahar/Status', { timer: -1, state: 'dealing', winner: win, finalSteps: 3 });
            fbDelete('Game/AndarBahar/Bets');
            setTimeout(() => fbUpdate('Game/AndarBahar/Status', { timer: 15 }), 8000);
        }
    }

    // 3. CAR ROULETTE
    let crStatus = await fbGet('Game/CarRoulette/Status');
    if (crStatus) {
        let t = crStatus.timer;
        if (t > 0) {
            fbUpdate('Game/CarRoulette/Status', { timer: t - 1, state: 'betting' });
        } else if (t === 0) {
            let bets = await fbGet('Game/CarRoulette/Bets') || {};
            let win = 'bmw'; // Safest default
            fbUpdate('Game/CarRoulette/Status', { timer: -1, state: 'spinning', winner: win });
            fbDelete('Game/CarRoulette/Bets');
            setTimeout(() => fbUpdate('Game/CarRoulette/Status', { timer: 15 }), 12000);
        }
    }

    // 4. 7 UP DOWN
    let udStatus = await fbGet('Game/7UpDown/Status');
    if (udStatus) {
        let t = udStatus.timer;
        if (t > 0) {
            fbUpdate('Game/7UpDown/Status', { timer: t - 1, state: 'betting' });
        } else if (t === 0) {
            fbUpdate('Game/7UpDown/Status', { timer: -1, state: 'rolling', winner: 'low', v1: 1, v2: 2 });
            fbDelete('Game/7UpDown/Bets');
            setTimeout(() => fbUpdate('Game/7UpDown/Status', { timer: 15 }), 6000);
        }
    }

    // 5. KALYAN MATKA
    let kmStatus = await fbGet('Game/KalyanMatka/Status');
    if (kmStatus) {
        let t = kmStatus.timer;
        if (t > 0) {
            fbUpdate('Game/KalyanMatka/Status', { timer: t - 1, state: 'betting' });
        } else if (t === 0) {
            fbUpdate('Game/KalyanMatka/Status', { timer: -1, state: 'result', winner: 'K' });
            fbDelete('Game/KalyanMatka/Bets');
            setTimeout(() => fbUpdate('Game/KalyanMatka/Status', { timer: 15 }), 6000);
        }
    }

}, 1000);

// Render.com server ko zinda rakhne ke liye
http.createServer((req, res) => { res.write("Kalyan Casino Cloud Engine is Running 24/7 🚀"); res.end(); }).listen(process.env.PORT || 3000);
