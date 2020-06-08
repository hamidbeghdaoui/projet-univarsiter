<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $admin = new controller_admin();
    $thisYear = new controller_historique();
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
        case 'get-all-spic':
            $faculty = new controller_faculty();
            echo json_encode($faculty->getAllSpic());
            break;
        case 'get-plus':
            $faculty = new controller_faculty();
            switch ($_POST['typePublication']) {
                case 'spécialité':
                    echo json_encode($faculty->getAllSectionSpicPubAdmin($_POST['id_typePublication'], $thisYear->getThisYear()->id));
                    break;
                case 'section':
                    echo json_encode($faculty->getAllGroupSectionPubAdmin($_POST['id_typePublication'], $thisYear->getThisYear()->id));
                    break;
            }
            break;
        case 'publication-Etudiant':
            $admin->AjouterPublication();
            break;
        case 'get-my-pub':
            $admin->getMyPub();
            break;
    }
}
