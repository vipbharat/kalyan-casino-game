<?php
// Response/MatchRoom.php
class MatchRoom extends Api {
    public function response($code, $message, $data) {
        header('Content-Type: application/json');
        
        $finalResponse = [
            'status' => $code,
            'message' => $message,
            'room_details' => [
                'room_id'   => $data['room_id'],
                'password'  => $data['pass'],
                'launch_link' => 'freefire://gameplay', // Yeh link game trigger karega
            ],
            'instruction' => 'ID aur Password copy karein aur niche diye link se game join karein.'
        ];

        echo json_encode($finalResponse);
        exit;
    }
}
