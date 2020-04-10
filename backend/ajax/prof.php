<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $prof = new controller_prof();
    switch ($_POST['but']) {
        case 'get-pub':
            $prof->getPub();
            break;
        case 'insert-pub-Enregistrees':
            $prof->insertPubEnregistrees();
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
            echo json_encode($faculty->getAllSpicProf($_POST['idProf'], '2019/2020'));
            break;
        case 'get-plus':
            $faculty = new controller_faculty();
            switch ($_POST['typePublication']) {
                case 'spécialité':
                    echo json_encode($faculty->getAllSectionSpicForProf($_POST['id_typePublication'], $_POST['idProf'], '2019/2020'));
                    break;
                case 'section':
                    echo json_encode($faculty->getAllGroupSectionForProf($_POST['id_typePublication'], $_POST['idProf'], '2019/2020'));
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
        case 'cher-prof':
            if (isset($_POST['moteDeCHer']) && $_POST['id_typeUser'])
                echo json_encode($prof->cherProfForProf($_POST['moteDeCHer'], $_POST['id_typeUser']));
            break;
        case 'get-all-pub-myUser':
            $prof->getPubMyUser();
            break;
        case 'get-all-group-prof':
            $faculty = new controller_faculty();
            if (isset($_POST['id_prof'])) $faculty->getAllGroupProf($_POST['id_prof'], '2019/2020');
            break;
        case 'cher-Etudiant':
            $prof->getCherEtudiant();
            break;
        case 'get-all-myEtudiant':
            $prof->getMyEtudiant();
            break;
    }
}
