const express = require('express');
const axios = require('axios');
const admin = require('firebase-admin');

// 1. FIREBASE MASTER CHABI AUR URL
// Ye file 'kalyan-firebase-key.json' aapke GitHub par isi server.js ke sath honi chahiye
const serviceAccount = require('./kalyan-firebase-key.json'); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://kalyan-casino-default-rtdb.firebaseio.com" // Aapka asli Kalyan URL
});

const db = admin.database();
const app = express();

// 2. UPTIMEROBOT KE LIYE (Server ko 24/7 jagane ke liye)
app.get('/', (req, res) => {
    res.send("👑 Kalyan 11 Master Engine ekdum solid chal raha hai! 🚀");
});

// 3. AUTO-UPDATE ENGINE (Har 1 Minute mein points update karega)
setInterval(async () => {
    try {
        console.log("Live score check kar raha hoon...");
        
        // --- NOTE FOR VIP BHARAT ---
        // Abhi test karne ke liye maine isme random points ka logic lagaya hai.
        // Jab aap Free API dhundh loge, toh yahan uska link dalenge.
        
        const matchId = "CUSTOM_1700000000000"; // Test Match ID
        const playerId = "IND_0"; // Test Player ID
        
        // Dummy Point Calculation (1 se 10 ke beech koi bhi number)
        let testPoints = Math.floor(Math.random() * 10) + 1; 

        // FIREBASE MEIN DIRECT UPDATE
        await db.ref(`Game/Kalyan11/MatchPlayers/${matchId}/${playerId}`).update({
            livePoints: testPoints
        });

        console.log(`✅ Firebase mein points update ho gaye: ${testPoints}`);

    } catch (error) {
        console.log("⚠️ Error aagaya: ", error.message);
    }
}, 60000); // 60000 ms = Har 1 Minute mein chalega

// 4. SERVER CHALU KAREIN
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🔥 Kalyan 11 Engine port ${PORT} par start ho gaya hai!`);
});
