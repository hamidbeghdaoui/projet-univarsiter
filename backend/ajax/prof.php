<?php

include "../includes/autoloader.inc.php";

if (isset($_POST['but'])) {
    switch ($_POST['but']) {
        case 'publication-Etudiant':
            $etudiant = new controller_etudiant();
            $etudiant->AjouterPublication();
            break;
    }
}
