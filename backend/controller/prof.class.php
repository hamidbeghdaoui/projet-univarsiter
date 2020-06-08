<?php

/**
 * Class prof
 */
class controller_prof
{

	private $db;
	private $thisYear;

	function __construct()
	{
		$this->db = new model_database();
		$this->thisYear = new controller_historique();
	}

	/**
	 * getters
	 */
	public function getAllProf($idProf)
	{
		$req = "SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,
		prof.id as id_prof ,prof.nom ,prof.prenom ,prof.image FROM prof ,user 
		WHERE user.typeUser='prof' and user.id_typeUser = prof.id and prof.id !=$idProf ;";
		$this->db->query($req);
		return $this->db->resultSet();
	}

	public function getProfForAdmin()
	{
		$req = "SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,
		prof.id as id_prof ,prof.nom ,prof.prenom ,prof.image FROM prof ,user 
		WHERE user.typeUser='prof' and user.id_typeUser = prof.id ;";
		$this->db->query($req);
		return $this->db->resultSet();
	}

	public function getAllProfGroup($idGroup, $annee, $idSpes, $semestre)
	{
		$req =
			"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,prof.id as id_prof ,prof.nom ,prof.prenom ,prof.image ,historique_prof.role ,module.id as id_module ,module.nom_module 
		   ,module.semestre ,specialite.id as id_sp ,specialite.nom_spec ,specialite.annee 
		   FROM user ,historique_prof ,module ,prof ,specialite
            WHERE historique_prof.id_groupe = $idGroup
			and historique_prof.annee = '$annee' and historique_prof.id_prof = prof.id 
            and historique_prof.id_module = module.id and module.semestre=$semestre and historique_prof.semestre=$semestre
            and module.id_specialite = specialite.id and specialite.id =$idSpes
			and user.typeUser = 'prof' and user.id_typeUser= prof.id;";
		$this->db->query($req);
		return $this->db->resultSet();
	}

	public function getPubMyUser()
	{
		$issets = isset($_POST['idUser']) && isset($_POST['id_typeUser']) && isset($_POST['typeUser']);
		if ($issets) {
			$resaltArray = array();
			$user = new controller_user();
			$userInfo = $user->getInfoUser($_POST['id_typeUser'], $_POST['typeUser']);
			//  echo json_encode($userInfo);
			$req =
				"SELECT publication_prof.id as id, publication_prof.pub, 
				publication_prof.augmenter, publication_prof.typeAugmenter,publication_prof.id_user, 
				publication_prof.date, user.typeUser, user.id_typeUser 
				FROM  publication_prof ,user WHERE publication_prof.id_user = user.id and
				 publication_prof.id_user=" . $_POST['idUser'];
			$this->db->query($req);
			$allPub = $this->db->resultSet();
			// echo json_encode($allPub);
			foreach ($allPub as $key => $value) {
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

	public function getPub()
	{
		if (isset($_POST['id_typeUser'])) {
			$resaltArray = array();
			$user = new controller_user();
			$req = "SELECT publication_prof.id, publication_prof.pub, publication_prof.augmenter,
			publication_prof.typeAugmenter ,publication_prof.id_user, publication_prof.date, user.typeUser, user.id_typeUser 
			FROM  publication_prof, user WHERE   user.id = publication_prof.id_user
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

	public function getMyPub()
	{
		if (isset($_POST['id_typeUser']) && isset($_POST['id_User'])) {
			$resaltArray = array();
			$user = new controller_user();
			$req = "SELECT publication_etudiant.id, publication_etudiant.pub, publication_etudiant.augmenter,
			publication_etudiant.typeAugmenter ,publication_etudiant.id_user, publication_etudiant.date,
			 user.typeUser, user.id_typeUser 
			FROM  publication_etudiant, user WHERE 
            user.id = publication_etudiant.id_user and user.id =" . $_POST['id_User'] . "
			ORDER by publication_etudiant.id DESC";
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

	public function getMyPubEnreg()
	{
		if (isset($_POST['id_typeUser'])) {
			$resaltArray = array();
			$user = new controller_user();
			$req = "SELECT publication_prof.id , publication_prof.pub, publication_prof.augmenter,
			publication_prof.typeAugmenter, publication_prof.id_user, publication_prof.date, user.typeUser, user.id_typeUser 
			FROM pub_enregistrees_prof, publication_prof, user WHERE 
            pub_enregistrees_prof.id_prof = " . $_POST['id_typeUser'] . " and  
			pub_enregistrees_prof.id_pub = publication_prof.id and publication_prof.id_user = user.id
			ORDER by pub_enregistrees_prof.id  DESC ;";
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

	public function cherProf($nomOUprenom)
	{
		$req = "SELECT User.id as idUser ,user.id_typeUser , user.typeUser,prof.* FROM prof ,user WHERE
			 prof.prenom LIKE '$nomOUprenom%' and user.typeUser = 'prof' and user.id_typeUser = prof.id ; ";
		$this->db->query($req);
		return $this->db->resultSet();
	}
	public function cherProfForProf($nomOUprenom, $idProf)
	{
		$req = "SELECT User.id as idUser ,user.id_typeUser , user.typeUser,prof.* FROM prof ,user WHERE
			 prof.prenom LIKE '$nomOUprenom%' and user.typeUser = 'prof' and user.id_typeUser = prof.id  
			 and prof.id != $idProf; ";
		$this->db->query($req);
		return $this->db->resultSet();
	}
	public function cherProfForAdmin($nomOUprenom)
	{
		$req = "SELECT User.id as idUser ,user.id_typeUser , user.typeUser,prof.* FROM prof ,user WHERE
			 prof.prenom LIKE '$nomOUprenom%' and user.typeUser = 'prof' and user.id_typeUser = prof.id ";
		$this->db->query($req);
		return $this->db->resultSet();
	}

	public function getCherEtudiant($annee)
	{
		if (isset($_POST['moteDeCHer'])) {
			$req =
				"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,etudiant.nom ,etudiant.prenom ,
			etudiant.image ,groupe.nom_grp , section.nom_sec ,specialite.nom_spec ,specialite.annee 
			FROM user,etudiant ,historique_etudiant, groupe ,section ,specialite 
			WHERE  user.typeUser='etudiant' and user.id_typeUser = etudiant.id 
			and historique_etudiant.id_etudiant = etudiant.id and etudiant.prenom LIKE '" . $_POST['moteDeCHer'] . "%'
			and historique_etudiant.id_groupe = groupe.id and historique_etudiant.annee ='$annee' 
			and groupe.id_section = section.id and section.id_specialite = specialite.id ;";
			$this->db->query($req);
			$result = $this->db->resultSet();
			echo json_encode($result);
		}
		// echo json_encode($this->faculty->getInformation($_POST['id_etudiant'], '2019/2020'));
	}

	public function getMyEtudiant($annee)
	{
		if (isset($_POST['id_Group'])) {
			$req =
				"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,etudiant.nom ,etudiant.prenom ,
			etudiant.image ,groupe.nom_grp , section.nom_sec ,specialite.nom_spec ,specialite.annee 
			FROM user,etudiant ,historique_etudiant, groupe ,section ,specialite 
			WHERE  user.typeUser='etudiant' and user.id_typeUser = etudiant.id 
			and groupe.id =" . $_POST['id_Group'] . " and historique_etudiant.id_etudiant = etudiant.id 
			and historique_etudiant.id_groupe = groupe.id and historique_etudiant.annee ='$annee' 
			and groupe.id_section = section.id and section.id_specialite = specialite.id ;";
			$this->db->query($req);
			$result = $this->db->resultSet();
			echo json_encode($result);
		}
		// echo json_encode($this->faculty->getInformation($_POST['id_etudiant'], '2019/2020'));
	}

	/**
	 * setters
	 */
	public function insertPubEnregistrees()
	{
		$issets = isset($_POST['id_typeUser']) && isset($_POST['idPub']);
		if ($issets) {
			$req = "SELECT * FROM `pub_enregistrees_prof` WHERE `id_prof`=:id_typeUser and `id_pub` =:idPub ;";
			$this->db->query($req);
			$this->db->bind(":id_typeUser", strip_tags(trim($_POST['id_typeUser'])));
			$this->db->bind(":idPub",  strip_tags(trim($_POST['idPub'])));
			if (empty($this->db->single())) {
				$req = "INSERT INTO `pub_enregistrees_prof` (`id`, `id_prof`, `id_pub`) VALUES (NULL, :id_typeUser, :idPub );";
				$this->db->query($req);
				$this->db->bind(":id_typeUser", strip_tags(trim($_POST['id_typeUser'])));
				$this->db->bind(":idPub",  strip_tags(trim($_POST['idPub'])));
				try {
					$this->db->execute();
					echo true;
				} catch (\Throwable $th) {
					echo false;
				}
			} else {
				echo true;
			}
		}
	}

	public function deletedPubEnregistrees()
	{
		$issets = isset($_POST['id_typeUser']) && isset($_POST['idPub']);
		if ($issets) {
			$req = "DELETE FROM `pub_enregistrees_prof` WHERE  `id_prof` = :id_typeUser and `id_pub` = :idPub;";
			$this->db->query($req);
			$this->db->bind(":id_typeUser", strip_tags(trim($_POST['id_typeUser'])));
			$this->db->bind(":idPub",  strip_tags(trim($_POST['idPub'])));
			try {
				$this->db->execute();
				echo true;
			} catch (\Throwable $th) {
				echo false;
			}
		}
	}

	public function AjouterPublication()
	{
		$issets = isset($_POST['idUser']) && isset($_POST['id_typeUser']) && isset($_POST['post']) && isset($_POST['file'])
			&& isset($_POST['typeFile']) && isset($_POST['typePublication']) && isset($_POST['id_typePublication']);
		echo json_encode($_POST);
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

	public function getAllProfForAdmin()
	{
		$result = array();
		$req = "SELECT * FROM `prof` ORDER by id  DESC";
		$this->db->query($req);
		$result = $this->db->resultSet();
		echo json_encode($result);
	}

	public function getCherProfForAdmin()
	{
		if (isset($_POST['moteDeCHer'])) {
			$req =
				"SELECT * FROM prof WHERE prof.nom LIKE '" . $_POST['moteDeCHer'] . "%';";
			$this->db->query($req);
			$result = $this->db->resultSet();
			echo json_encode($result);
		}
	}

	public function addProf()
	{
		$issets = isset($_POST['matricule']) && isset($_POST['nom'])
			&& isset($_POST['prenom']) && isset($_POST['passwordInscription']);
		if ($issets) {
			$req = "SELECT id FROM `prof` where matricule =:matricule";
			$this->db->query($req);
			$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
			if ($this->db->single() != null) {
				echo "M_NotUnique";
			} else {
				$req = "INSERT INTO `prof` (`id`, `matricule`, `nom`, `prenom`, `phone`, `email`, `image`, `password_inscription`) 
		 VALUES (NULL, :matricule, :nom, :prenom, NULL, NULL, NULL, :passwordInscription);";
				$this->db->query($req);
				$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
				$this->db->bind(":nom",  strip_tags(trim($_POST['nom'])));
				$this->db->bind(":prenom",  strip_tags(trim($_POST['prenom'])));
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

	public function modiferInfoProf()
	{
		$issets = isset($_POST['id']) && isset($_POST['matricule']) && isset($_POST['nom'])
			&& isset($_POST['prenom']) && isset($_POST['passwordInscription']);
		if ($issets) {
			$req = "SELECT id FROM `prof` where matricule =:matricule and id != :id ";
			$this->db->query($req);
			$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
			$this->db->bind(":id",  strip_tags(trim($_POST['id'])));
			if ($this->db->single() != null) {
				echo "M_NotUnique";
			} else {
				$req = "UPDATE `prof` SET `matricule` = :matricule, `nom` = :nom,
		  `prenom` = :prenom, `password_inscription` = :passwordInscription 
		  WHERE `prof`.`id` = :id;";
				$this->db->query($req);
				$this->db->bind(":id",  strip_tags(trim($_POST['id'])));
				$this->db->bind(":matricule",  strip_tags(trim($_POST['matricule'])));
				$this->db->bind(":nom",  strip_tags(trim($_POST['nom'])));
				$this->db->bind(":prenom",  strip_tags(trim($_POST['prenom'])));
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

	public function AffectationGetAllProfGroup()
	{
		if (isset($_POST['idGrp'])  && isset($_POST['annee']) && isset($_POST['semestre'])) {
			$req = "SELECT historique_prof.id as idHstoriqueProf, prof.id ,prof.matricule ,prof.nom ,prof.prenom ,prof.phone ,prof.email , historique_prof.id_module 
			,module.nom_module ,module.fondamentale ,module.coef ,historique_prof.role FROM `historique_prof` ,prof ,module 
			 WHERE historique_prof.id_prof = prof.id and historique_prof.id_module = module.id and
			 historique_prof.id_groupe = :idGrp and historique_prof.semestre = :semestre and historique_prof.annee= :annee ;";
			$this->db->query($req);
			$this->db->bind(":idGrp",  strip_tags(trim($_POST['idGrp'])));
			$this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
			$this->db->bind(":semestre",  strip_tags(trim($_POST['semestre'])));
			$result = $this->db->resultSet();
			echo json_encode($result);
		}
	}

	public function affecterProfInGroup()
	{
		$issets = isset($_POST['idGrp'])  && isset($_POST['idProf']) && isset($_POST['semestre'])
			&& isset($_POST['idModule'])  && isset($_POST['role']) && isset($_POST['annee']);
		if ($issets) {
			$req = "INSERT INTO `historique_prof` (`id`, `id_prof`, `id_groupe`, `id_module`, `semestre`, `role`, `annee`)
			 VALUES (NULL, :idProf, :idGrp, :idModule, :semestre, :role, :annee);";
			$this->db->query($req);
			$this->db->bind(":idProf",  strip_tags(trim($_POST['idProf'])));
			$this->db->bind(":idGrp",  strip_tags(trim($_POST['idGrp'])));
			$this->db->bind(":idModule",  strip_tags(trim($_POST['idModule'])));
			$this->db->bind(":semestre",  strip_tags(trim($_POST['semestre'])));
			$this->db->bind(":role",  strip_tags(trim($_POST['role'])));
			$this->db->bind(":annee",  strip_tags(trim($_POST['annee'])));
			try {
				$this->db->execute();
				echo "true";
			} catch (\Throwable $th) {
				echo "false";
			}
		}
	}

	public function modiferAffecterProfInGroup()
	{
		$issets =  isset($_POST['idProf']) && isset($_POST['idModule'])  && isset($_POST['role']) && isset($_POST['id']);
		if ($issets) {
			$req = "UPDATE `historique_prof` SET `id_module` = :idModule , id_prof= :idProf ,role= :role  
			WHERE `historique_prof`.`id` = :id;";
			$this->db->query($req);
			$this->db->bind(":idProf",  strip_tags(trim($_POST['idProf'])));
			$this->db->bind(":idModule",  strip_tags(trim($_POST['idModule'])));
			$this->db->bind(":role",  strip_tags(trim($_POST['role'])));
			$this->db->bind(":id",  strip_tags(trim($_POST['id'])));
			try {
				$this->db->execute();
				echo "true";
			} catch (\Throwable $th) {
				echo "false";
			}
		}
	}

	public function suprimerAffecterProfInGroup()
	{
		if (isset($_POST['id'])) {
			$req = "DELETE FROM `historique_prof` WHERE `historique_prof`.`id` =:id;";
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
}
