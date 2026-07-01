// ========================================================
// 🚀 KALYAN VIP - DAILY DATABASE AUTO-SWITCH ENGINE 🚀
// ========================================================

// 1. WALLET CONFIG (Hamesha PURANA Database)
const walletConfig = {
    apiKey: "AIzaSyCy2zsDDJeVTQEbHCenkLIlz3lWWyo-Pqo",
    databaseURL: "https://kalyan-casino-default-rtdb.firebaseio.com",
    projectId: "kalyan-casino"
};

// 2. LIVE GAME CONFIG (Naya Engine)
const liveEngineConfig = {
    apiKey: "AIzaSyA3BdEPFah2Vj5ksxVgHrTV0NKu147YwjA", 
    databaseURL: "https://kalyan-live-engine-default-rtdb.firebaseio.com",
    projectId: "kalyan-live-engine"
};

// 👉 STEP 1: Always Initialize Wallet
if (!firebase.apps.length) {
    firebase.initializeApp(walletConfig);
}
const dbWallet = firebase.database();

// 👉 STEP 2: ROJANA WALA FORMULA (Even/Odd)
const today = new Date().getDate();
let activeGameConfig;

if (today % 2 === 0) {
    // Even Dates (2, 4, 6...): Purana Server
    activeGameConfig = walletConfig;
    console.log("🚦 ROJANA ENGINE: Old Server Active (Date: " + today + ")");
} else {
    // Odd Dates (1, 3, 5...): Naya Server
    activeGameConfig = liveEngineConfig;
    console.log("🚀 ROJANA ENGINE: New Live Server Active (Date: " + today + ")");
}

// 👉 STEP 3: Initialize Game Database
let dbGames;
if (activeGameConfig === walletConfig) {
    dbGames = firebase.database();
} else {
    firebase.initializeApp(activeGameConfig, "GameApp");
    dbGames = firebase.app("GameApp").database();
}

// ⚠️ GLOBAL OVERRIDE
window.db = {
    ref: function(path) {
        if (path.includes("users")) {
            return dbWallet.ref(path);
        }
        else if (path.includes(".info/connected")) {
            return dbWallet.ref(path);
        }
        else {
            return dbGames.ref(path);
        }
    }
};

console.log("✅ Universal Database Switcher (Daily Mode) Installed!");
