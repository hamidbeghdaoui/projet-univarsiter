<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $etudiant = new controller_etudiant();
    switch ($_POST['but']) {
        case 'publication-Etudiant':
            $etudiant->AjouterPublication();
            break;
        case 'get-all-etudiant':
            $etudiant->getAllEtudiant();
            break;
        case 'add-etudiant':
            $etudiant->addEtudiant();
            break;
        case 'modifer-info-etudiant':
            $etudiant->modiferInfoEtudiant();
            break;
        case 'get-pub':
            $etudiant->getPub();
            break;
        case 'insert-pub-Enregistrees':
            $etudiant->insertPubEnregistrees();
            break;
        case 'get-my-pub':
            $etudiant->getMyPub();
            break;
        case 'get-my-pub-enreg':
            $etudiant->getMyPubEnreg();
            break;
        case 'deleted-pub-Enregistrees':
            $etudiant->deletedPubEnregistrees();
            break;
        case 'get-all-prof-etudiant':
            $etudiant->getAllProfEtudiant();
            break;
        case 'get-all-pub-myUser':
            $etudiant->getPubMyUser();
            break;
        case 'get-all-myEtudiant':
            $etudiant->getMyEtudiant();
            break;
        case 'cher-Etudiant':
            $etudiant->getCherEtudiant();
            break;
        case 'get-cher-etudiant-for-admin':
            $etudiant->getCherEtudiantForAdmin();
            break;
        case 'affectation-get-all-etudiant-group':
            $etudiant->affectationGetAllEtudiantGroup();
            break;
        case 'affectation-get-all-etudiant':
            $etudiant->affectationGetAllEtudiant();
            break;
        case 'affecter-etudiant-in-group':
            $etudiant->affecterEtudiantInGroup();
            break;
        case 'supprimer-etudiant-in-group':
            $etudiant->supprimerEtudiantInGroup();
            break;
        case 'affectation-get-cher':
            $etudiant->affectationGetCher();
            break;
        case 'cher-prof':
            if (isset($_POST['moteDeCHer'])) {
                $prof = new controller_prof();
                echo json_encode($prof->cherProf($_POST['moteDeCHer']));
            }
            break;

        case 'get-all-admin':
                $admin = new controller_admin();
                echo json_encode($admin->getAlladmin());
            break;
    }
}
