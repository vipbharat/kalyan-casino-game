<?php
// ==========================================
// SINGLE FILE TOURNAMENT SYSTEM
// ==========================================

abstract class Api {
    public static function factory($type) {
        $className = ucwords(strtolower($type));
        if (class_exists($className)) {
            return new $className();
        }
        die("Error: Format nahi mila.");
    }
    abstract function response($code, $message, $data);
}

class Matchroom extends Api {
    public function response($code, $message, $data) {
        header('Content-Type: text/html; charset=utf-8');
        echo "<!DOCTYPE html><html lang='en'><head><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Match Lobby</title>";
        echo "<style>
            body { background: #121212; color: #fff; font-family: sans-serif; text-align: center; padding: 20px; margin: 0; }
            .box { border: 2px solid #FFD700; padding: 25px; border-radius: 15px; background: #1e1e1e; max-width: 400px; margin: 20px auto; box-shadow: 0px 4px 15px rgba(0,0,0,0.5); }
            .btn { display: block; background: #FFD700; color: #000; padding: 15px; text-decoration: none; font-weight: bold; border-radius: 10px; margin-top: 25px; font-size: 16px; }
            .copy-box { background: #333; padding: 15px; border-radius: 8px; margin: 15px 0; cursor: pointer; border: 1px dashed #777; transition: 0.2s; }
        </style></head><body>";

        echo "<div class='box'>";
        echo "<h2 style='margin-top: 0;'>MATCH READY!</h2>";
        echo "<p style='color:#00FF00; font-size: 14px;'>● " . htmlspecialchars($message) . "</p>";
        echo "<div class='copy-box' onclick='copyText(\"" . $data['room_id'] . "\")'>Room ID: <b style='font-size: 18px;'>" . $data['room_id'] . "</b><br><small style='color:#FFD700;'>(Tap to Copy)</small></div>";
        echo "<div class='copy-box' onclick='copyText(\"" . $data['pass'] . "\")'>Password: <b style='font-size: 18px;'>" . $data['pass'] . "</b><br><small style='color:#FFD700;'>(Tap to Copy)</small></div>";
        echo "<a href='intent://#Intent;scheme=freefire;package=com.dts.freefireth;end' class='btn'>ABHI GAME START KAREIN</a>";
        echo "<p style='color: #888; font-size: 11px; margin-top: 20px;'>Security: Payout ke baad token expire ho jayega.</p>";
        echo "</div>";

        echo "<script>function copyText(text) { navigator.clipboard.writeText(text); alert('Copied: ' + text); }</script>";
        echo "</body></html>";
        exit;
    }
}

// Yahan se aapka code run hoga
$matchData = ['room_id' => 'FF-99887766', 'pass' => '123456'];
$apiResponse = Api::factory('Matchroom');
$apiResponse->response(200, "1 vs 4 Tournament Started! ₹10,000 Pool", $matchData);
?>
