<?php

/**
 * Class admin
 */
class controller_admin
{

	private $db;

	function __construct()
	{
		$this->db = new model_database();
	}

	/**
	 * getters
	 */

	public  function getAlladmin()
	{
		if (isset($_POST['typeUser'])) {
			$req = "";
			if ($_POST['typeUser'] != "admin") {
				$req =
					"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser , departement.id as id_admin 
			        ,departement.nom ,departement.prenom , departement.role ,departement.image 
			        FROM departement ,user
			        WHERE departement.id = user.id_typeUser and user.typeUser='admin'";
			} else {
				$req =
					"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser , departement.id as id_admin 
			        ,departement.nom ,departement.prenom , departement.role ,departement.image 
			        FROM departement ,user
			        WHERE departement.id = user.id_typeUser and departement.id != " . $_POST['idAdmin'] . " and user.typeUser='admin'";
			}
			$this->db->query($req);
			return $this->db->resultSet();
		}
	}

	/**
	 * setters
	 */

	public  function getAllAdminForAdmin()
	{
		$result = array();
		$req = "SELECT * FROM `departement` ORDER by id  DESC";
		$this->db->query($req);
		$result = $this->db->resultSet();
		echo json_encode($result);
	}

	public  function getCherAdmin()
	{
		if (isset($_POST['moteDeCHer'])) {
			$req =
				"SELECT * FROM departement WHERE departement.nom LIKE '" . $_POST['moteDeCHer'] . "%';";
			$this->db->query($req);
			$result = $this->db->resultSet();
			echo json_encode($result);
		}
	}

	public  function addAdmin()
	{
		$issets = isset($_POST['matricule']) && isset($_POST['nom'])
			&& isset($_POST['prenom']) && isset($_POST['role']) && isset($_POST['passwordInscription']);
		if ($issets) {
			$req = "SELECT id FROM `departement` where matricule =:matricule";
			$this->db->query($req);
			$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
			if ($this->db->single() != null) {
				echo "M_NotUnique";
			} else {
				$req = "INSERT INTO `departement` (`id`, `matricule`, `nom`, `prenom`, `role`, `phone`, `email`, `image`, `password_inscription`) 
	            VALUES (NULL, :matricule, :nom, :prenom, :role, NULL, NULL, NULL, :passwordInscription);";
				$this->db->query($req);
				$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
				$this->db->bind(":nom",  strip_tags(trim($_POST['nom'])));
				$this->db->bind(":prenom",  strip_tags(trim($_POST['prenom'])));
				$this->db->bind(":role",  strip_tags(trim($_POST['role'])));
				$this->db->bind(":passwordInscription",  strip_tags(trim($_POST['passwordInscription'])));
				try {
					$this->db->execute();
					echo "true";
				} catch (\Throwable $th) {
					echo "false";
				}
			}
		}
	}

	public  function modiferInfoAdmin()
	{
		$issets = isset($_POST['id']) && isset($_POST['matricule']) && isset($_POST['nom'])
			&& isset($_POST['prenom']) && isset($_POST['role']) && isset($_POST['passwordInscription']);
		if ($issets) {
			$req = "SELECT id FROM `departement` where matricule =:matricule and id != :id ";
			$this->db->query($req);
			$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
			$this->db->bind(":id",  strip_tags(trim($_POST['id'])));
			if ($this->db->single() != null) {
				echo "M_NotUnique";
			} else {
				$req = "UPDATE `departement` SET `matricule` = :matricule, `nom` = :nom,
	            `prenom` = :prenom, `role` = :role, `password_inscription` = :passwordInscription 
	             WHERE `departement`.`id` = :id;";
				$this->db->query($req);
				$this->db->bind(":id",  strip_tags(trim($_POST['id'])));
				$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
				$this->db->bind(":nom",  strip_tags(trim($_POST['nom'])));
				$this->db->bind(":prenom",  strip_tags(trim($_POST['prenom'])));
				$this->db->bind(":role",  strip_tags(trim($_POST['role'])));
				$this->db->bind(":passwordInscription",  strip_tags(trim($_POST['passwordInscription'])));
				try {
					$this->db->execute();
					echo "true";
				} catch (\Throwable $th) {
					echo "false";
				}
			}
		}
	}

	public function AjouterPublication()
	{
		if (isset($_POST['targetGroup'])) {
			if ($_POST['targetGroup'] === 'etudiant') {
				$this->AjouterPublicationEtudiant();
			} else {
				$this->AjouterPublicationProf();
			}
		}
	}

	public function AjouterPublicationProf()
	{
		$issets = isset($_POST['idUser']) && isset($_POST['id_typeUser']) && isset($_POST['post']) && isset($_POST['file'])
			&& isset($_POST['typeFile']);
		$faculty = new controller_faculty();
		if ($issets) {
			$augmenter = NULL;
			$typeAugmenter = NULL;
			if (!empty($_POST['file'])) {
				$augmenter = $_POST['file'];
				$typeAugmenter = $_POST['typeFile'];
			}
			$req =
				"INSERT INTO `publication_prof` (`id`, `pub`, `augmenter`, `typeAugmenter`, `date`, `id_user`) 
			     VALUES (NULL, :post, :augmenter, :typeAugmenter, CURRENT_TIMESTAMP, :idUser);";
			$this->db->query($req);
			$this->db->bind(":idUser", strip_tags(trim($_POST['idUser'])));
			$this->db->bind(":post",  strip_tags(trim($_POST['post'])));
			$this->db->bind(":augmenter", $augmenter);
			$this->db->bind(":typeAugmenter", $typeAugmenter);
			try {
				$this->db->execute();
				echo json_encode(true);
			} catch (Exception $e) {
				echo false;
			}
		} else {
			echo false;
		}
	}

	public function AjouterPublicationEtudiant()
	{
		$issets = isset($_POST['idUser']) && isset($_POST['id_typeUser']) && isset($_POST['post']) && isset($_POST['file'])
			&& isset($_POST['typeFile']) && isset($_POST['typePublication']) && isset($_POST['id_typePublication']);
		$faculty = new controller_faculty();
		if ($issets) {
			$augmenter = NULL;
			$typeAugmenter = NULL;
			if (!empty($_POST['file'])) {
				$augmenter = $_POST['file'];
				$typeAugmenter = $_POST['typeFile'];
			}
			$req =
				"INSERT INTO `publication_etudiant` (`id`, `pub`, `augmenter`, `typeAugmenter`, `date`, `id_user`) 
			     VALUES (NULL, :post, :augmenter, :typeAugmenter, CURRENT_TIMESTAMP, :idUser);";
			$this->db->query($req);
			$this->db->bind(":idUser", strip_tags(trim($_POST['idUser'])));
			$this->db->bind(":post",  strip_tags(trim($_POST['post'])));
			$this->db->bind(":augmenter", $augmenter);
			$this->db->bind(":typeAugmenter", $typeAugmenter);
			try {
				$this->db->execute();
				$idPub = $this->db->LastId();
				switch ($_POST['typePublication']) {
					case 'spécialité':
						foreach ($faculty->getAllSectionSpic($_POST['id_typePublication']) as $key => $value) {
							foreach ($faculty->getAllGroupSection($value->id) as $key => $val) {
								$faculty->InsertAffichageGroupe($idPub, $val->id);
							}
						}
						break;
					case 'section':
						foreach ($faculty->getAllGroupSection($_POST['id_typePublication']) as $key => $val) {
							$faculty->InsertAffichageGroupe($idPub, $val->id);
						}
						break;
					case 'group':
						$faculty->InsertAffichageGroupe($idPub, $_POST['id_typePublication']);
						break;
				}
				echo json_encode(true);
			} catch (Exception $e) {
				echo false;
			}
		} else {
			echo false;
		}
	}

	public function getMyPub()
	{
		if (isset($_POST['id_typeUser']) && isset($_POST['id_User']) && isset($_POST['targetGroup'])) {
			$resaltArray = array();
			$user = new controller_user();

			$req = "SELECT publication_etudiant.id, publication_etudiant.pub, publication_etudiant.augmenter,
			publication_etudiant.typeAugmenter ,publication_etudiant.id_user, publication_etudiant.date,
			 user.typeUser, user.id_typeUser 
			FROM  publication_etudiant, user WHERE 
            user.id = publication_etudiant.id_user and user.id =" . $_POST['id_User'] . "
			ORDER by publication_etudiant.id DESC";

			if ($_POST['targetGroup'] === "prof")
				$req = "SELECT publication_prof.id, publication_prof.pub, publication_prof.augmenter,
			     publication_prof.typeAugmenter ,publication_prof.id_user, publication_prof.date,
			     user.typeUser, user.id_typeUser 
			     FROM  publication_prof, user WHERE 
                 user.id = publication_prof.id_user and user.id =" . $_POST['id_User'] . "
				ORDER by publication_prof.id DESC";

			$this->db->query($req);
			$allPub = $this->db->resultSet();
			// echo json_encode($allPub );
			foreach ($allPub as $key => $value) {
				$userInfo = $user->getInfoUser($value->id_typeUser, $value->typeUser);
				$resalt = [
					'id_pub' => $value->id,
					'pub' => $value->pub,
					'augmenter' => $value->augmenter,
					'typeAugmenter' => $value->typeAugmenter,
					'date' => $value->date,
					'idUser' => $value->id_user,
					'idTypeUser' => $value->id_typeUser,
					'typeUser' => $value->typeUser,
					'nom' => $userInfo->nom,
					'prenom' => $userInfo->prenom,
					'phone' => $userInfo->phone,
					'email' => $userInfo->email,
					'image' => $userInfo->image,
				];
				array_push($resaltArray, $resalt);
			}
			echo json_encode($resaltArray);
		}
	}
}
