<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    $historique = new controller_historique();
    switch ($_POST['but']) {
        case 'get-all-annee':
           echo json_encode($historique->getAllAnnee());
            break;
        case 'new-year':
           $historique->newYear();
            break;
        case 'new-semestre2':
           $historique->newSemestre2();
            break;
    }
}
