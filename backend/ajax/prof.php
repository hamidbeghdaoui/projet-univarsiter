<?php

include "../includes/autoloader.inc.php";
if (isset($_POST['but'])) {
    $prof = new controller_prof();
    $thisYear = new controller_historique();
    switch ($_POST['but']) {
        case 'get-pub':
            $prof->getPub();
            break;
        case 'insert-pub-Enregistrees':
            $prof->insertPubEnregistrees();
            break;
        case 'get-all-prof-for-admin':
            $prof->getAllProfForAdmin();
            break;
        case 'get-cher-prof-for-admin':
            $prof->getCherProfForAdmin();
            break;
        case 'add-prof':
            $prof->addProf();
            break;
        case 'modifer-info-prof':
            $prof->modiferInfoProf();
            break;
        case 'get-my-pub':
            $prof->getMyPub();
            break;
        case 'get-my-pub-enreg':
            $prof->getMyPubEnreg();
            break;
        case 'deleted-pub-Enregistrees':
            $prof->deletedPubEnregistrees();
            break;
        case 'get-all-spic-prof':
            $faculty = new controller_faculty();
            echo json_encode($faculty->getAllSpicProf($_POST['idProf'],  $thisYear->getThisYear()->id, $thisYear->getThisYear()->semestre));
            break;
        case 'get-plus':
            $faculty = new controller_faculty();
            switch ($_POST['typePublication']) {
                case 'spécialité':
                    echo json_encode($faculty->getAllSectionSpicForProf($_POST['id_typePublication'], $_POST['idProf'], $thisYear->getThisYear()->id, $thisYear->getThisYear()->semestre));
                    break;
                case 'section':
                    echo json_encode($faculty->getAllGroupSectionForProf($_POST['id_typePublication'], $_POST['idProf'], $thisYear->getThisYear()->id, $thisYear->getThisYear()->semestre));
                    break;
            }
            break;
        case 'publication-Etudiant':
            $prof->AjouterPublication();
            break;
        case 'get-all-prof':
            if (isset($_POST['id_typeUser']))
                echo json_encode($prof->getAllProf($_POST['id_typeUser']));
            break;
        case 'get-prof-fpr-admin':
                echo json_encode($prof->getProfForAdmin());
            break;
        case 'cher-prof':
            if (isset($_POST['moteDeCHer']) && $_POST['id_typeUser'])
                echo json_encode($prof->cherProfForProf($_POST['moteDeCHer'], $_POST['id_typeUser']));
            break;

        case 'cher-prof-for-admin':
            if (isset($_POST['moteDeCHer']))
                echo json_encode($prof->cherProfForAdmin($_POST['moteDeCHer']));
            break;

        case 'get-all-pub-myUser':
            $prof->getPubMyUser();
            break;
        case 'get-all-group-prof':
            $faculty = new controller_faculty();
            if (isset($_POST['id_prof'])) $faculty->getAllGroupProf($_POST['id_prof'], $thisYear->getThisYear()->id, $thisYear->getThisYear()->semestre);
            break;
        case 'cher-Etudiant':
            $prof->getCherEtudiant($thisYear->getThisYear()->id);
            break;
        case 'get-all-myEtudiant':
            $prof->getMyEtudiant($thisYear->getThisYear()->id);
            break;
        case 'affectation-get-all-prof-group':
            $prof->AffectationGetAllProfGroup();
            break;
        case 'affectation-get-all-prof':
            $prof->getAllProfForAdmin();
            break;
        case 'affecter-prof-in-group':
            $prof->affecterProfInGroup();
            break;
        case 'modifer-affecter-prof-in-group':
            $prof->modiferAffecterProfInGroup();
            break;
        case 'suprimer-affecter-prof-in-group':
            $prof->suprimerAffecterProfInGroup();
            break;
    }
}
