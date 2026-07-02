// ========================================================
// 🧠 SMART ROUTER ENGINE (SPLIT DATABASE MODE) 🧠
// ========================================================

const oldConfig = {
    apiKey: "AIzaSyCy2zsDDJeVTQEbHCenkLIlz3lWWyo-Pqo",
    databaseURL: "https://kalyan-casino-default-rtdb.firebaseio.com",
    projectId: "kalyan-casino"
};

const newConfig = {
    apiKey: "AIzaSyA3BdEPFah2Vj5ksxVgHrTV0NKu147YwjA", 
    databaseURL: "https://kalyan-live-engine-default-rtdb.firebaseio.com",
    projectId: "kalyan-live-engine"
};

// 👉 1. Initialize Old App (For Wallet & Old Games)
if (!firebase.apps.length) {
    firebase.initializeApp(oldConfig);
}
const dbOld = firebase.database();

// 👉 2. Initialize New App (For Roulettes & New Games)
firebase.initializeApp(newConfig, "NewEngine");
const dbNew = firebase.app("NewEngine").database();

// 👉 3. List of Games strictly on OLD Server
const oldServerGames = ['AndarBahar', 'AndarBahar2', 'DragonTiger', 'DragonTiger2', 'MegaSpin'];

// ⚠️ GLOBAL ROUTER OVERRIDE
window.db = {
    ref: function(path) {
        // Paison ka len-den, recharge, withdraw hamesha OLD par
        if (path.includes("users") || path.includes("recharge") || path.includes("withdrawal") || path.includes(".info/connected")) {
            return dbOld.ref(path);
        }
        
        // Check karega ki kya yeh game purane server wala hai
        let isOldGame = oldServerGames.some(g => path.includes(g));
        if (isOldGame) {
            return dbOld.ref(path);
        } 
        // Baaki saare games (Zoo, Car, 7UpDown, Matka) NEW par
        else {
            return dbNew.ref(path);
        }
    }
};

console.log("🔥 SMART SPLIT ENGINE ACTIVE: Wallet & DT/AB on OLD, Roulettes on NEW!");
