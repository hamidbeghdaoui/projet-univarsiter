<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $user = new controller_user();
    switch ($_POST['but']) {
        case 'inscription':
            $user->Inscription();
            break;
        case 'Confirmation-Inscription':
            $user->ConfirmationInscription();
            break;
        case 'Login':
            $user->Login();
            break;
        case 'Confirmation-Login':
            $user->ConfirmationLogin();
            break;
        case 'get-Information-User':
            $user->getInformationUser();
            break;
        case 'get-ALL-Information-User':
            $user->getALLInformationUser();
            break;
        case 'parametre-saisie':
            $user->parametreSaisie();
            break;
        case 'parametre-info':
            $user->parametreInfo();
            break;
        default:
            break;
    }
}
