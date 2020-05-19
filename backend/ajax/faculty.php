<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $faculty = new controller_faculty();
    switch ($_POST['but']) {
        case 'get-all-spec-for-admin':
            echo json_encode($faculty->getAllSpicForAdmin());
            break;
        case 'get-cher-spec':
            $faculty->getCherSpec();
            break;
        case 'add-spec':
            $faculty->addSpec();
            break;
        case 'modifer-info-spic':
            $faculty->modiferInfoSpic();
            break;
    }
}
