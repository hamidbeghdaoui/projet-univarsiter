<?php

include "../includes/autoloader.inc.php";
if (isset($_POST['but'])) {
    $faculty = new controller_faculty();
    $thisYear = new controller_historique();
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
        case 'get-all-module-for-admin':
            echo json_encode($faculty->getAllModuleForAdmin());
            break;
        case 'get-cher-module':
            $faculty->getCherModule();
            break;
        case 'add-module':
            $faculty->addModule();
            break;
        case 'modifer-info-module':
            $faculty->modiferInfoModule();
            break;
        case 'get-section-historique':
            echo json_encode($faculty->getSectionHistorique());
            break;
        case 'get-group-historique':
            echo json_encode($faculty->getGroupHistorique());
            break;
        case 'add-section':
            $faculty->addSection();
            break;
        case 'add-group':
            $faculty->addGroup();
            break;
        case 'modifer-section':
            $faculty->modiferSection();
            break;
        case 'modifer-group':
            $faculty->modiferGroup();
            break;
        case 'remove-section':
            $faculty->removeSection();
            break;
        case 'remove-group':
            $faculty->removeGroup();
            break;
        case 'affectation-get-module':
            $faculty->affectationGetModule();
            break;
        case 'get-all-group':
                 $faculty->getAllGroup($thisYear->getThisYear()->id);
            break;
    }
}
