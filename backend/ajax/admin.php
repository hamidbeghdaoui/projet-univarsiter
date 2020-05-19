<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $admin = new controller_admin();
    switch ($_POST['but']) {
        case 'get-all-admin-for-admin':
           $admin->getAllAdminForAdmin();
            break;
        case 'get-cher-admin':
           $admin->getCherAdmin();
            break;
        case 'add-admin':
           $admin->addAdmin();
            break;
        case 'modifer-info-admin':
           $admin->modiferInfoAdmin();
            break;

    }
}
