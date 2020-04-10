<?php

/**
 * Class admin
 */
class controller_faculty
{

    private $db;

    function __construct()
    {
        $this->db = new model_database();
    }

    /**
     * getters
     */

    public  function getInformation($idEtudiant, $annee)
    {
        $req = "SELECT historique_etudiant.id_groupe as id_grp , groupe.nom_grp ,section.id as id_section , section.nom_sec ,specialite.id as id_spec ,specialite.nom_spec  
            FROM historique_etudiant, groupe ,section ,specialite 
            WHERE historique_etudiant.id_etudiant =$idEtudiant and historique_etudiant.annee='$annee'  and 
            historique_etudiant.id_groupe = groupe.id  and   groupe.id_section = section.id and
            section.id_specialite = specialite.id ;";
        $this->db->query($req);
        return $this->db->single();
    }

    public  function getAllGroupSection($idSection)
    {
        $req = "SELECT * FROM `groupe` WHERE `id_section` = $idSection ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSectionSpic($idSpic)
    {
        $req = "SELECT * FROM `section` WHERE `id_specialite` =$idSpic ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSpic()
    {
        $req = "SELECT * FROM specialite ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSpicProf($idPof, $annee)
    {
        $req = "SELECT specialite.id ,specialite.nom_spec ,specialite.annee 
        FROM prof , prof_groupe ,groupe ,section,specialite  
        WHERE prof.id=$idPof and prof_groupe.id_prof = prof.id and prof_groupe.id_groupe = groupe.id 
        and prof_groupe.annee = '$annee' and groupe.id_section = section.id 
        and section.id_specialite = specialite.id GROUP by specialite.id";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllGroupSectionForProf($idSection, $idProf, $annee)
    {
        $req = "SELECT specialite.nom_spec ,specialite.annee  ,section.nom_sec  ,groupe.id ,groupe.nom_grp
        FROM prof , prof_groupe ,groupe ,section,specialite 
        WHERE prof.id=$idProf and prof_groupe.id_prof = prof.id and
         prof_groupe.id_groupe = groupe.id and prof_groupe.annee = '$annee' and
          groupe.id_section = section.id and section.id_specialite = specialite.id and
           section.id = $idSection ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSectionSpicForProf($idSpic, $idProf, $annee)
    {
        $req = "SELECT specialite.nom_spec ,specialite.annee , section.id ,section.nom_sec 
        FROM prof , prof_groupe ,groupe ,section,specialite 
        WHERE prof.id=$idProf and prof_groupe.id_prof = prof.id and
         prof_groupe.id_groupe = groupe.id and prof_groupe.annee = '$annee' and
          groupe.id_section = section.id and section.id_specialite = specialite.id and
           specialite.id = $idSpic GROUP by section.id ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getAllGroupSpecForProf($idSpec, $idProf, $annee)
    {
        $req =
            "SELECT section.nom_sec ,groupe.id ,groupe.nom_grp 
            FROM prof , prof_groupe ,groupe ,section ,specialite 
            WHERE prof.id=$idProf and prof_groupe.id_prof = prof.id and prof_groupe.id_groupe = groupe.id 
            and prof_groupe.annee = '$annee' and groupe.id_section = section.id 
            and section.id_specialite = specialite.id and specialite.id = $idSpec";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getAllGroupProf($idProf, $annee)
    {
        $resultSpec = $this->getAllSpicProf($idProf, $annee);
        // echo json_encode($resultSpec);
        $arrayReturn = array();
        foreach ($resultSpec as $key => $value) {
            $resultGrp = $this->getAllGroupSpecForProf($value->id, $idProf, $annee);
            $arrayGrp = array();
            foreach ($resultGrp as $key => $val) {
                $ar = [
                    'id_grp' => $val->id,
                    'nom_grp' => $val->nom_grp,
                    'nom_sec' => $val->nom_sec
                ];
                array_push( $arrayGrp, $ar);
            }
            $arrayMain = [
                'id_spec' => $value->id,
                'nom_spec' => $value->nom_spec,
                'annee' => $value->annee,
                'plus' => $arrayGrp,
            ];
            array_push($arrayReturn, $arrayMain);
        }
        echo json_encode($arrayReturn);
    }
    /**
     * setters
     */

    public  function InsertAffichageGroupe($idPub, $idGroup)
    {
        $req = "INSERT INTO `affichage_groupe` (`id`, `id_publicationEtudiant`, `id_groupe`) 
            VALUES (NULL, '$idPub', '$idGroup');";
        $this->db->query($req);
        try {
            $this->db->execute();
            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}
