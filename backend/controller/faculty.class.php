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
            WHERE historique_etudiant.id_etudiant =$idEtudiant and historique_etudiant.annee=$annee  and 
            historique_etudiant.id_groupe = groupe.id  and   groupe.id_section = section.id and
            section.id_specialite = specialite.id;";
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

    public  function getAllGroupSectionPubAdmin($idSection, $annee)
    {
        $req = "SELECT * FROM `groupe` WHERE `id_section` = $idSection and annee= $annee ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSectionSpicPubAdmin($idSpic, $annee)
    {
        $req = "SELECT * FROM `section` WHERE `id_specialite` =$idSpic and annee=$annee;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSpic()
    {
        $req = "SELECT * FROM specialite ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSpicForAdmin()
    {
        $req = "SELECT  specialite.id ,specialite.nom_spec ,specialite.annee ,specialite.id_profResponsable 
        ,prof.matricule ,prof.nom ,prof.prenom FROM specialite , prof 
        WHERE specialite.id_profResponsable = prof.id ORDER by id  DESC;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSpicProf($idPof, $annee, $semaste)
    {
        $req = "SELECT specialite.id ,specialite.nom_spec ,specialite.annee 
        FROM prof , historique_prof ,groupe ,section,specialite  
        WHERE prof.id=$idPof and historique_prof.id_prof = prof.id and historique_prof.id_groupe = groupe.id 
        and historique_prof.annee = '$annee' and historique_prof.semestre = '$semaste' and groupe.id_section = section.id 
        and section.id_specialite = specialite.id GROUP by specialite.id";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllGroupSectionForProf($idSection, $idProf, $annee, $semestre)
    {
        $req = "SELECT specialite.nom_spec ,specialite.annee  ,section.nom_sec  ,groupe.id ,groupe.nom_grp ,
        historique_prof.role
        FROM prof , historique_prof ,groupe ,section,specialite 
        WHERE prof.id=$idProf and historique_prof.id_prof = prof.id and
         historique_prof.id_groupe = groupe.id and historique_prof.annee = '$annee' and
          historique_prof.semestre = '$semestre' and
          groupe.id_section = section.id and section.id_specialite = specialite.id and
           section.id = $idSection  GROUP BY historique_prof.id_groupe ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public  function getAllSectionSpicForProf($idSpic, $idProf, $annee, $semestre)
    {
        $req = "SELECT specialite.nom_spec ,specialite.annee , section.id ,section.nom_sec 
        FROM prof , historique_prof ,groupe ,section,specialite 
        WHERE prof.id=$idProf and historique_prof.id_prof = prof.id and
         historique_prof.id_groupe = groupe.id and historique_prof.annee = '$annee' 
         and historique_prof.semestre = '$semestre' and
          groupe.id_section = section.id and section.id_specialite = specialite.id and
           specialite.id = $idSpic GROUP by section.id ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getAllGroupSpecForProf($idSpec, $idProf, $annee, $semestre)
    {
        $req =
            "SELECT section.nom_sec ,groupe.id ,groupe.nom_grp 
            FROM prof , historique_prof ,groupe ,section ,specialite 
            WHERE prof.id=$idProf and historique_prof.id_prof = prof.id and historique_prof.id_groupe = groupe.id 
            and historique_prof.annee = '$annee' and historique_prof.semestre = '$semestre' and groupe.id_section = section.id 
            and section.id_specialite = specialite.id and specialite.id = $idSpec 
            GROUP BY historique_prof.id_groupe ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getAllGroupProf($idProf, $annee, $semaste)
    {
        $resultSpec = $this->getAllSpicProf($idProf, $annee, $semaste);
        // echo json_encode($resultSpec);
        $arrayReturn = array();
        foreach ($resultSpec as $key => $value) {
            $resultGrp = $this->getAllGroupSpecForProf($value->id, $idProf, $annee, $semaste);
            $arrayGrp = array();
            foreach ($resultGrp as $key => $val) {
                $ar = [
                    'id_grp' => $val->id,
                    'nom_grp' => $val->nom_grp,
                    'nom_sec' => $val->nom_sec
                ];
                array_push($arrayGrp, $ar);
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

    public function getCherSpec()
    {
        if (isset($_POST['moteDeCHer'])) {
            $req =
                "SELECT  specialite.id ,specialite.nom_spec ,specialite.annee ,specialite.id_profResponsable 
                ,prof.matricule ,prof.nom ,prof.prenom FROM specialite , prof 
                WHERE specialite.id_profResponsable = prof.id 
                and specialite.nom_spec LIKE '" . $_POST['moteDeCHer'] . "%';";
            $this->db->query($req);
            $result = $this->db->resultSet();
            echo json_encode($result);
        }
    }

    public function addSpec()
    {
        $issets = isset($_POST['nom_spec']) && isset($_POST['annee']) && isset($_POST['id_profResponsable']);
        if ($issets) {
            $req = "SELECT id FROM `specialite` where nom_spec =:nom_spec";
            $this->db->query($req);
            $this->db->bind(":nom_spec",  strip_tags(trim($_POST['nom_spec'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "INSERT INTO `specialite` (`id`, `nom_spec`, `annee`, `id_profResponsable`) 
     VALUES (NULL, :nom_spec, :annee, :id_profResponsable);";
                $this->db->query($req);
                $this->db->bind(":nom_spec",  strip_tags(trim($_POST['nom_spec'])));
                $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
                $this->db->bind(":id_profResponsable",  strip_tags(trim($_POST['id_profResponsable'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function modiferInfoSpic()
    {
        $issets = isset($_POST['id']) && isset($_POST['nom_spec'])
            && isset($_POST['annee']) && isset($_POST['id_profResponsable']);
        if ($issets) {
            $req = "SELECT id FROM `specialite` where nom_spec =:nom_spec and id != :id ";
            $this->db->query($req);
            $this->db->bind(":nom_spec",  strip_tags(trim($_POST['nom_spec'])));
            $this->db->bind(":id",  strip_tags(trim($_POST['id'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "UPDATE `specialite` SET `nom_spec` = :nom_spec, `annee` = :annee,
                `id_profResponsable` = :id_profResponsable WHERE `specialite`.`id` = :id;";
                $this->db->query($req);
                $this->db->bind(":id",  strip_tags(trim($_POST['id'])));
                $this->db->bind(":nom_spec",  strip_tags(trim($_POST['nom_spec'])));
                $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
                $this->db->bind(":id_profResponsable",  strip_tags(trim($_POST['id_profResponsable'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function getAllModuleForAdmin()
    {
        $req = "SELECT module.`id` , module.`nom_module` ,module.`fondamentale` ,module.`coef` 
        ,module.`semestre` ,module.`id_specialite` ,specialite.nom_spec , specialite.annee 
        FROM `module` ,specialite WHERE specialite.id = module.id_specialite ORDER by id  DESC;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getCherModule()
    {
        if (isset($_POST['moteDeCHer'])) {
            $req = "SELECT module.`id` , module.`nom_module` ,module.`fondamentale` ,module.`coef` 
        ,module.`semestre` ,module.`id_specialite` ,specialite.nom_spec , specialite.annee 
        FROM `module` ,specialite WHERE specialite.id = module.id_specialite 
        and module.`nom_module` LIKE '" . $_POST['moteDeCHer'] . "%';";
            $this->db->query($req);
            echo json_encode($this->db->resultSet());
        }
    }

    public function addModule()
    {
        $issets = isset($_POST['nom_module']) && isset($_POST['fondamentale'])
            && isset($_POST['coef']) && isset($_POST['semestre']) && isset($_POST['id_specialite']);
        if ($issets) {
            $req = "SELECT id FROM `module` where nom_module =:nom_module";
            $this->db->query($req);
            $this->db->bind(":nom_module",  strip_tags(trim($_POST['nom_module'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "INSERT INTO `module` (`id`, `nom_module`, `fondamentale`, `coef`, `semestre`, `id_specialite`) 
                 VALUES (NULL, :nom_module, :fondamentale, :coef, :semestre, :id_specialite);";
                $this->db->query($req);
                $this->db->bind(":nom_module",  strip_tags(trim($_POST['nom_module'])));
                $this->db->bind(":fondamentale",  strip_tags(trim($_POST['fondamentale'])));
                $this->db->bind(":coef",  strip_tags(trim($_POST['coef'])));
                $this->db->bind(":semestre",  strip_tags(trim($_POST['semestre'])));
                $this->db->bind(":id_specialite",  strip_tags(trim($_POST['id_specialite'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function modiferInfoModule()
    {
        $issets = isset($_POST['id']) && isset($_POST['nom_module']) && isset($_POST['fondamentale'])
            && isset($_POST['coef']) && isset($_POST['semestre']) && isset($_POST['id_specialite']);

        if ($issets) {
            $req = "SELECT id FROM `module` where nom_module =:nom_module and id != :id ";
            $this->db->query($req);
            $this->db->bind(":nom_module",  strip_tags(trim($_POST['nom_module'])));
            $this->db->bind(":id",  strip_tags(trim($_POST['id'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "UPDATE `module` SET `nom_module` = :nom_module, `fondamentale` = :fondamentale,
                `coef` = :coef, `semestre` = :semestre, `id_specialite` = :id_specialite WHERE `module`.`id` = :id;";
                $this->db->query($req);
                $this->db->bind(":id",  strip_tags(trim($_POST['id'])));
                $this->db->bind(":nom_module",  strip_tags(trim($_POST['nom_module'])));
                $this->db->bind(":fondamentale",  strip_tags(trim($_POST['fondamentale'])));
                $this->db->bind(":coef",  strip_tags(trim($_POST['coef'])));
                $this->db->bind(":semestre",  strip_tags(trim($_POST['semestre'])));
                $this->db->bind(":id_specialite",  strip_tags(trim($_POST['id_specialite'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function getSectionHistorique()
    {
        $issets = isset($_POST['annee']) && isset($_POST['idSpec']);
        if ($issets) {
            $req = "SELECT section.id ,section.nom_sec ,section.id_specialite ,section.annee 
           FROM `section` , specialite WHERE section.annee = :annee and section.id_specialite = specialite.id
           and specialite.id = :idSpec  ORDER BY `section`.`id` DESC ;";
            $this->db->query($req);
            $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
            $this->db->bind(":idSpec",  strip_tags(trim($_POST['idSpec'])));
            return $this->db->resultSet();
        }
    }

    public function getGroupHistorique()
    {
        $issets = isset($_POST['annee']) && isset($_POST['idSection']);
        if ($issets) {
            $req = "SELECT groupe.id ,groupe.nom_grp ,groupe.id_section ,groupe.annee 
            FROM `groupe` , section WHERE groupe.annee = :annee and groupe.id_section = section.id
            and section.id = :idSection  ORDER BY `groupe`.`id` DESC ;";
            $this->db->query($req);
            $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
            $this->db->bind(":idSection",  strip_tags(trim($_POST['idSection'])));
            return $this->db->resultSet();
        }
    }

    public function addSection()
    {
        $issets = isset($_POST['nomSection']) && isset($_POST['idSpec']) && isset($_POST['annee']);
        if ($issets) {
            $req = "SELECT id FROM `section` where nom_sec =:nomSection and id_specialite =:idSpec and annee =:annee ;";
            $this->db->query($req);
            $this->db->bind(":nomSection",  strip_tags(trim($_POST['nomSection'])));
            $this->db->bind(":idSpec",  strip_tags(trim($_POST['idSpec'])));
            $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "INSERT INTO `section` (`id`, `nom_sec`, `id_specialite`, `annee`)
                 VALUES (NULL, :nomSection, :idSpec, :annee);";
                $this->db->query($req);
                $this->db->bind(":nomSection",  strip_tags(trim($_POST['nomSection'])));
                $this->db->bind(":idSpec",  strip_tags(trim($_POST['idSpec'])));
                $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function addGroup()
    {
        $issets = isset($_POST['nomGroup']) && isset($_POST['idSection']) && isset($_POST['annee']);
        if ($issets) {
            $req = "SELECT id FROM `groupe` where nom_grp =:nomGroup and id_section=:idSection and annee =:annee";
            $this->db->query($req);
            $this->db->bind(":nomGroup",  strip_tags(trim($_POST['nomGroup'])));
            $this->db->bind(":idSection",  strip_tags(trim($_POST['idSection'])));
            $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "INSERT INTO `groupe` (`id`, `nom_grp`, `id_section`, `annee`) 
                VALUES (NULL, :nomGroup, :idSection, :annee);";
                $this->db->query($req);
                $this->db->bind(":nomGroup",  strip_tags(trim($_POST['nomGroup'])));
                $this->db->bind(":idSection",  strip_tags(trim($_POST['idSection'])));
                $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function modiferSection()
    {
        $issets = isset($_POST['nomSection']) && isset($_POST['idSection']) && isset($_POST['annee'])
            && isset($_POST['idSpec']);
        if ($issets) {
            $req = "SELECT id FROM `section` where nom_sec =:nomSection and annee =:annee and id_specialite=:idSpec and id != :idSection ;";
            $this->db->query($req);
            $this->db->bind(":nomSection",  strip_tags(trim($_POST['nomSection'])));
            $this->db->bind(":idSection",  strip_tags(trim($_POST['idSection'])));
            $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
            $this->db->bind(":idSpec",  strip_tags(trim($_POST['idSpec'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "UPDATE `section` SET `nom_sec` = :nomSection WHERE `section`.`id` = :idSection;";
                $this->db->query($req);
                $this->db->bind(":nomSection",  strip_tags(trim($_POST['nomSection'])));
                $this->db->bind(":idSection",  strip_tags(trim($_POST['idSection'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function modiferGroup()
    {
        $issets = isset($_POST['nomGroup']) && isset($_POST['idGroup']) && isset($_POST['annee'])
            && isset($_POST['idSection']);
        if ($issets) {
            $req = "SELECT id FROM `groupe` where nom_grp =:nomGroup and annee =:annee and id_section=:idSection and id != :idGroup ;";
            $this->db->query($req);
            $this->db->bind(":nomGroup",  strip_tags(trim($_POST['nomGroup'])));
            $this->db->bind(":idGroup",  strip_tags(trim($_POST['idGroup'])));
            $this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
            $this->db->bind(":idSection",  strip_tags(trim($_POST['idSection'])));
            if ($this->db->single() != null) {
                echo "M_NotUnique";
            } else {
                $req = "UPDATE `groupe` SET `nom_grp` = :nomGroup WHERE `groupe`.`id` = :idGroup;";
                $this->db->query($req);
                $this->db->bind(":nomGroup",  strip_tags(trim($_POST['nomGroup'])));
                $this->db->bind(":idGroup",  strip_tags(trim($_POST['idGroup'])));
                try {
                    $this->db->execute();
                    echo "true";
                } catch (\Throwable $th) {
                    echo "false";
                }
            }
        }
    }

    public function removeSection()
    {
        if (isset($_POST['id'])) {
            $req = "DELETE FROM `section` WHERE `section`.`id` = :id;";
            $this->db->query($req);
            $this->db->bind(":id",  strip_tags(trim($_POST['id'])));
            try {
                $this->db->execute();
                echo "true";
            } catch (\Throwable $th) {
                echo "false";
            }
        }
    }

    public function removeGroup()
    {
        if (isset($_POST['id'])) {
            $req = "DELETE FROM `groupe` WHERE `groupe`.`id` = :id;";
            $this->db->query($req);
            $this->db->bind(":id",  strip_tags(trim($_POST['id'])));
            try {
                $this->db->execute();
                echo "true";
            } catch (\Throwable $th) {
                echo "false";
            }
        }
    }

    public function affectationGetModule()
    {
        $issets = isset($_POST['idGrp']) && isset($_POST['semestre']);
        if ($issets) {
            $req = "SELECT * FROM `module` WHERE module.semestre = :semestre and module.id_specialite in 
            (SELECT id_specialite FROM specialite , section , groupe 
            WHERE specialite.id = section.id_specialite and section.id = groupe.id_section and groupe.id = :idGrp  );";
            $this->db->query($req);
            $this->db->bind(":idGrp",  strip_tags(trim($_POST['idGrp'])));
            $this->db->bind(":semestre",  strip_tags(trim($_POST['semestre'])));
            echo json_encode($this->db->resultSet());
        }
    }

    public function getSpec($annee)
    {
        $req = "SELECT specialite.id ,specialite.nom_spec ,specialite.annee  
        FROM `groupe` ,section ,specialite 
        WHERE groupe.annee=$annee and groupe.id_section = section.id 
        and section.id_specialite = specialite.id GROUP by specialite.id";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getGroup($idSpec, $annee)
    {
        $req =
            "SELECT section.nom_sec ,groupe.id ,groupe.nom_grp 
            FROM groupe ,section ,specialite 
            WHERE  groupe.id_section = section.id  and groupe.annee = $annee
            and section.id_specialite = specialite.id and specialite.id = $idSpec ;";
        $this->db->query($req);
        return $this->db->resultSet();
    }

    public function getAllGroup($annee)
    {
        $resultSpec = $this->getSpec($annee);
        // echo json_encode($resultSpec);
        $arrayReturn = array();
        foreach ($resultSpec as $key => $value) {
            $resultGrp = $this->getGroup($value->id, $annee);
            $arrayGrp = array();
            foreach ($resultGrp as $key => $val) {
                $ar = [
                    'id_grp' => $val->id,
                    'nom_grp' => $val->nom_grp,
                    'nom_sec' => $val->nom_sec
                ];
                array_push($arrayGrp, $ar);
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
}
