<?php
/**
 * Final MatchRoom Response
 * Yeh file User ko Game ka ID/Pass dikhayegi aur Game launch karegi.
 */
class MatchRoom extends Api {

    public function response($code, $message, $data) {
        // Mobile UI ke liye HTML output
        header('Content-Type: text/html; charset=utf-8');

        // Styles for Gaming Theme
        echo "
        <style>
            body { background: #121212; color: white; font-family: 'Segoe UI', sans-serif; text-align: center; padding: 20px; }
            .card { background: #1e1e1e; border-radius: 15px; padding: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.5); border: 1px solid #333; }
            .btn-launch { display: inline-block; background: #FFD700; color: black; padding: 15px 30px; border-radius: 8px; 
                          text-decoration: none; font-weight: bold; margin-top: 20px; transition: 0.3s; }
            .copy-box { background: #333; padding: 10px; border-radius: 5px; cursor: pointer; margin: 10px 0; border: 1px dashed #777; }
            .status { color: #00FF00; font-size: 14px; margin-bottom: 10px; }
        </style>
        ";

        echo "<div class='card'>";
            echo "<h2>Tournament Lobby</h2>";
            echo "<p class='status'>● Match Status: " . htmlspecialchars($message) . "</p>";

            // Room ID Copy Logic
            echo "<div class='copy-box' onclick='copyText(\"" . $data['room_id'] . "\")'>
                    Room ID: <b id='rid'>" . $data['room_id'] . "</b> (Tap to Copy)
                  </div>";

            // Password Copy Logic
            echo "<div class='copy-box' onclick='copyText(\"" . $data['pass'] . "\")'>
                    Password: <b>" . $data['pass'] . "</b> (Tap to Copy)
                  </div>";

            // Deep Link Button (Free Fire Example)
            // Note: Agar PUBG hai toh scheme badal kar 'bgmi://' kar dein
            echo '<a href="intent://#Intent;scheme=freefire;package=com.dts.freefireth;end" class="btn-launch">
                    LAUNCH GAME & JOIN
                  </a>';

            echo "<p style='color: #888; font-size: 11px; margin-top: 20px;'>
                    Warning: Token will be rejected/expired after payout.
                  </p>";
        echo "</div>";

        // JavaScript for Copy Feature
        echo "
        <script>
            function copyText(text) {
                navigator.clipboard.writeText(text);
                alert('Copied: ' + text);
            }
        </script>
        ";
        
        exit;
    }
}
