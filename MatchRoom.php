<?php
/**
 * ---------------------------------------------------------
 * SINGLE FILE TOURNAMENT SYSTEM (ALL-IN-ONE)
 * Is ek file mein Engine, UI, aur Data sab kuch shamil hai.
 * Aapko koi alag folder banane ki zaroorat nahi hai.
 * ---------------------------------------------------------
 */

// ==========================================
// PART 1: THE ENGINE (API CLASS)
// ==========================================
abstract class Api {
    public static function factory($type) {
        // Ab hum kisi folder se file nahi mangwa rahe, 
        // balki isi file mein likhi class ko call kar rahe hain.
        $className = ucwords(strtolower($type));
        if (class_exists($className)) {
            return new $className();
        }
        die("Error: Format nahi mila.");
    }
    abstract function response($code, $message, $data);
}

// ==========================================
// PART 2: THE UI & LAYOUT (MATCHROOM CLASS)
// ==========================================
class Matchroom extends Api {
    public function response($code, $message, $data) {
        // Mobile Browser ko batana ki HTML dikhana hai
        header('Content-Type: text/html; charset=utf-8');
        
        echo "<!DOCTYPE html>";
        echo "<html lang='en'><head>";
        echo "<meta name='viewport' content='width=device-width, initial-scale=1.0'>";
        echo "<title>Match Lobby</title>";
        
        // CSS Styling - Dark Gaming Theme
        echo "<style>
            body { background: #121212; color: #fff; font-family: sans-serif; text-align: center; padding: 20px; margin: 0; }
            .box { border: 2px solid #FFD700; padding: 25px; border-radius: 15px; background: #1e1e1e; max-width: 400px; margin: 20px auto; box-shadow: 0px 4px 15px rgba(0,0,0,0.5); }
            .btn { display: block; background: #FFD700; color: #000; padding: 15px; text-decoration: none; font-weight: bold; border-radius: 10px; margin-top: 25px; font-size: 16px; }
            .copy-box { background: #333; padding: 15px; border-radius: 8px; margin: 15px 0; cursor: pointer; border: 1px dashed #777; transition: 0.2s; }
            .copy-box:active { background: #444; }
        </style>";
        echo "</head><body>";

        // HTML Layout (Box ke andar ka content)
        echo "<div class='box'>";
        echo "<h2 style='margin-top: 0;'>MATCH READY!</h2>";
        echo "<p style='color:#00FF00; font-size: 14px;'>● " . htmlspecialchars($message) . "</p>";
        
        // Copy Room ID
        echo "<div class='copy-box' onclick='copyText(\"" . $data['room_id'] . "\")'>
                Room ID: <b style='font-size: 18px;'>" . $data['room_id'] . "</b><br>
                <small style='color:#FFD700;'>(Tap to Copy)</small>
              </div>";
        
        // Copy Password
        echo "<div class='copy-box' onclick='copyText(\"" . $data['pass'] . "\")'>
                Password: <b style='font-size: 18px;'>" . $data['pass'] . "</b><br>
                <small style='color:#FFD700;'>(Tap to Copy)</small>
              </div>";

        // Deep Link Button (Free Fire)
        echo "<a href='intent://#Intent;scheme=freefire;package=com.dts.freefireth;end' class='btn'>
                ABHI GAME START KAREIN
              </a>";
              
        echo "<p style='color: #888; font-size: 11px; margin-top: 20px;'>Security: Payout ke baad token expire ho jayega.</p>";
        echo "</div>";

        // JavaScript for Copy Function
        echo "<script>
                function copyText(text) {
                    navigator.clipboard.writeText(text);
                    alert('Copied successfully: ' + text);
                }
              </script>";
              
        echo "</body></html>";
        exit;
    }
}

// ==========================================
// PART 3: MAIN EXECUTION (DATA BHEJNA)
// ==========================================

// 1. Apna Live Match Data yahan dalein
$matchData = [
    'room_id' => 'FF-99887766',
    'pass'    => '123456'
];

// 2. Factory ko call karein (Upar wali class automatic load hogi)
$apiResponse = Api::factory('Matchroom');

// 3. Screen par Player ko Output dikhayein
$apiResponse->response(200, "1 vs 4 Tournament Started! ₹10,000 Pool", $matchData);

?>
