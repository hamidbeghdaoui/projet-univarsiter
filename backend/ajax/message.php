<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $message = new controller_message();
    switch ($_POST['but']) {
        case 'get-Message-navBar':
            $message->getMessageUser();
            break;
        case 'send-message':
            $message->sendMessage();
            break;
        case 'get-message-EnvoyeRecepteur':
            $message->getMessageEnvoyeRecepteur();
            break;
    }
}
