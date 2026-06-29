// ========================================================
// 🚀 KALYAN VIP - MASTER DATABASE AUTO-SWITCH ENGINE 🚀
// ========================================================

// 1. WALLET CONFIG (Hamesha PURANA Database - Paise aur Login ke liye)
const walletConfig = {
    apiKey: "AIzaSyCy2zsDDJeVTQEbHCenkLIlz3lWWyo-Pqo",
    databaseURL: "https://kalyan-casino-default-rtdb.firebaseio.com",
    projectId: "kalyan-casino"
};

// 2. LIVE GAME CONFIG (Mahine ke aakhri 15 din ke liye NAYA Engine)
const liveEngineConfig = {
    apiKey: "AIzaSyA3BdEPFah2Vj5ksxVgHrTV0NKu147YwjA", 
    databaseURL: "https://kalyan-live-engine-default-rtdb.firebaseio.com",
    projectId: "kalyan-live-engine"
};

// 👉 STEP 1: Always Initialize Wallet (Default App)
// Isse users ka login aur winning_balance hamesha purane par jayega
if (!firebase.apps.length) {
    firebase.initializeApp(walletConfig);
}
const dbWallet = firebase.database(); // Paiso ka connection

// 👉 STEP 2: Auto-Switch Logic for Games based on Date
const today = new Date().getDate();
let activeGameConfig;

if (today >= 2 && today <= 15) {
    // 2 se 15 tareekh tak: Games ka saara load PURANE Database par chalega
    activeGameConfig = walletConfig;
    console.log("🚦 BRAHMASTRA ENGINE: Old Server Active (Date: " + today + ")");
} else {
    // 16 se 1 tareekh tak: Games ka saara load NAYE Database par shift ho jayega
    activeGameConfig = liveEngineConfig;
    console.log("🚀 BRAHMASTRA ENGINE: New Live Server Active (Date: " + today + ")");
}

// 👉 STEP 3: Initialize the Game App connection
// Agar same config hai toh naya connection nahi banayenge (purane se hi dbGames le lenge)
let dbGames;
if (activeGameConfig === walletConfig) {
    dbGames = firebase.database();
} else {
    firebase.initializeApp(activeGameConfig, "GameApp");
    dbGames = firebase.app("GameApp").database();
}

// ========================================================
// ⚠️ GLOBAL OVERRIDE (Ekdum Magic Trick!) ⚠️
// ========================================================
// Ab game ki HTML files me code change ki mehnat bachane ke liye:
// Hum ek custom 'db' object banayenge jo decide karega ki reference kahan bhejna hai.

window.db = {
    ref: function(path) {
        // Agar path me 'users' hai (Yani paiso ka len-den) -> Hamesha Wallet (Purana DB)
        if (path.includes("users")) {
            return dbWallet.ref(path);
        }
        // Agar path me '.info/connected' hai (Yani network check) -> Default check
        else if (path.includes(".info/connected")) {
            return dbWallet.ref(path);
        }
        // Baaki sab kuch (Games, Bets, Status, Timer) -> Jo bhi Engine chal raha ho (dbGames)
        else {
            return dbGames.ref(path);
        }
    }
};

// Console msg confirm karne ke liye ki engine load ho gaya
console.log("✅ Universal Database Switcher Installed Successfully!");
