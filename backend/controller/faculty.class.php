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
