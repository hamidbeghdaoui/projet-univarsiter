<?php

/**
 * Class etudiant
 */
class controller_etudiant
{

	private $db;
	private $faculty;

	function __construct()
	{
		$this->db = new model_database();
		$this->faculty = new controller_faculty();
	}

	/**
	 * getters
	 */
	public function getPub()
	{
		if (isset($_POST['id_etudiant'])) {
			$resaltArray = array();
			$user = new controller_user();
			$InfoFaculty = $this->faculty->getInformation($_POST['id_etudiant'], '2019/2020');
			$req = "SELECT affichage_groupe.id_publicationEtudiant, publication_etudiant.pub, publication_etudiant.augmenter,
			publication_etudiant.typeAugmenter,publication_etudiant.id_user, publication_etudiant.date, user.typeUser, user.id_typeUser 
			FROM affichage_groupe, publication_etudiant, user WHERE affichage_groupe.id_groupe =" . $InfoFaculty->id_grp . " 
			and affichage_groupe.id_publicationEtudiant = publication_etudiant.id and user.id = publication_etudiant.id_user
			ORDER by publication_etudiant.id DESC";
			$this->db->query($req);
			$allPub = $this->db->resultSet();
			// echo json_encode($allPub );
			foreach ($allPub as $key => $value) {
				$userInfo = $user->getInfoUser($value->id_typeUser, $value->typeUser);
				$resalt = [
					'id_pub' => $value->id_publicationEtudiant,
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
		if (isset($_POST['id_etudiant']) && isset($_POST['id_User'])) {
			$resaltArray = array();
			$user = new controller_user();
			$InfoFaculty = $this->faculty->getInformation($_POST['id_etudiant'], '2019/2020');
			$req = "SELECT affichage_groupe.id_publicationEtudiant, publication_etudiant.pub, publication_etudiant.augmenter,
			publication_etudiant.typeAugmenter,publication_etudiant.id_user, publication_etudiant.date, user.typeUser, user.id_typeUser 
			FROM affichage_groupe, publication_etudiant, user WHERE affichage_groupe.id_groupe =" . $InfoFaculty->id_grp . " 
			and affichage_groupe.id_publicationEtudiant = publication_etudiant.id and user.id = publication_etudiant.id_user
            and user.id = " . $_POST['id_User'] . " ORDER by publication_etudiant.id  DESC";
			$this->db->query($req);
			$allPub = $this->db->resultSet();
			// echo json_encode($allPub );
			foreach ($allPub as $key => $value) {
				$userInfo = $user->getInfoUser($value->id_typeUser, $value->typeUser);
				$resalt = [
					'id_pub' => $value->id_publicationEtudiant,
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

	public function getPubMyUser()
	{
		$issets=isset($_POST['idUser']) && isset($_POST['id_typeUser']) &&isset($_POST['typeUser']) ;
		if ( $issets) {
			$resaltArray = array();
			$user = new controller_user();
			$userInfo = $user->getInfoUser($_POST['id_typeUser'], $_POST['typeUser']);
			$InfoFaculty = $this->faculty->getInformation($_POST['id_typeUser'], '2019/2020');
			//  echo json_encode($userInfo);
			$req =
				"SELECT publication_etudiant.id as id_publicationEtudiant, publication_etudiant.pub, 
				publication_etudiant.augmenter, publication_etudiant.typeAugmenter,publication_etudiant.id_user, 
				publication_etudiant.date, user.typeUser, user.id_typeUser 
				FROM affichage_groupe , publication_etudiant ,user WHERE publication_etudiant.id_user = user.id and
				 publication_etudiant.id_user=".$_POST['idUser']." and affichage_groupe.id_publicationEtudiant = publication_etudiant.id 
				 and affichage_groupe.id_groupe=".$InfoFaculty->id_grp;
			$this->db->query($req);
			$allPub = $this->db->resultSet();
			// echo json_encode($allPub);
			foreach ($allPub as $key => $value) {
				$resalt = [
					'id_pub' => $value->id_publicationEtudiant,
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
		if (isset($_POST['id_etudiant'])) {
			$resaltArray = array();
			$user = new controller_user();
			$InfoFaculty = $this->faculty->getInformation($_POST['id_etudiant'], '2019/2020');
			$req = "SELECT publication_etudiant.id as id_publicationEtudiant , publication_etudiant.pub, publication_etudiant.augmenter,
			publication_etudiant.typeAugmenter, publication_etudiant.id_user, publication_etudiant.date, user.typeUser, user.id_typeUser 
			FROM pub_enregistrees_etudiant, publication_etudiant, user WHERE 
            pub_enregistrees_etudiant.id_etudiant = " . $_POST['id_etudiant'] . " and  
			pub_enregistrees_etudiant.id_pub = publication_etudiant.id and publication_etudiant.id_user = user.id
			ORDER by pub_enregistrees_etudiant.id  DESC ;";
			$this->db->query($req);
			$allPub = $this->db->resultSet();
			// echo json_encode($allPub );
			foreach ($allPub as $key => $value) {
				$userInfo = $user->getInfoUser($value->id_typeUser, $value->typeUser);
				$resalt = [
					'id_pub' => $value->id_publicationEtudiant,
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

	public function getAllProfEtudiant()
	{
		if (isset($_POST['id_etudiant'])) {
			$faculty = $this->faculty->getInformation($_POST['id_etudiant'], '2019/2020');
			$prof = new controller_prof();
			$result = $prof->getAllProfGroup(
				$faculty->id_grp,
				'2019/2020',
				$faculty->id_spec,
				1
			);
			echo json_encode($result);
		}
		// echo json_encode($this->faculty->getInformation($_POST['id_etudiant'], '2019/2020'));
	}

	public function getMyEtudiant()
	{
		if (isset($_POST['id_etudiant'])) {
			$faculty = $this->faculty->getInformation($_POST['id_etudiant'], '2019/2020');
			$req=
			"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,etudiant.nom ,etudiant.prenom ,
			etudiant.image ,groupe.nom_grp , section.nom_sec ,specialite.nom_spec ,specialite.annee 
			FROM user,etudiant ,historique_etudiant, groupe ,section ,specialite 
			WHERE  user.typeUser='etudiant' and user.id_typeUser = etudiant.id and etudiant.id !=".$_POST['id_etudiant']." 
			and groupe.id =".$faculty->id_grp." and historique_etudiant.id_etudiant = etudiant.id 
			and historique_etudiant.id_groupe = groupe.id and historique_etudiant.annee ='2019/2020' 
			and groupe.id_section = section.id and section.id_specialite = specialite.id ;";
			$this->db->query($req);
			$result = $this->db->resultSet();
			echo json_encode($result);
		}
		// echo json_encode($this->faculty->getInformation($_POST['id_etudiant'], '2019/2020'));
	}

	public function getCherEtudiant()
	{
		if ( isset($_POST['id_etudiant']) && isset($_POST['moteDeCHer']) ) {
			$faculty = $this->faculty->getInformation($_POST['id_etudiant'], '2019/2020');
			$req=
			"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,etudiant.nom ,etudiant.prenom ,
			etudiant.image ,groupe.nom_grp , section.nom_sec ,specialite.nom_spec ,specialite.annee 
			FROM user,etudiant ,historique_etudiant, groupe ,section ,specialite 
			WHERE  user.typeUser='etudiant' and user.id_typeUser = etudiant.id and etudiant.id !=".$_POST['id_etudiant']." 
			and historique_etudiant.id_etudiant = etudiant.id and etudiant.prenom LIKE '".$_POST['moteDeCHer']."%'
			and historique_etudiant.id_groupe = groupe.id and historique_etudiant.annee ='2019/2020' 
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

	public function AjouterPublication()
	{
		$issets = isset($_POST['idUser']) && isset($_POST['id_typeUser']) && isset($_POST['post']) && isset($_POST['file'])
			&& isset($_POST['typeFile']) && isset($_POST['typePublication']);
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
				$InfoFaculty = $this->faculty->getInformation($_POST['id_typeUser'], '2019/2020');
				switch ($_POST['typePublication']) {
					case 'spécialité':
						foreach ($this->faculty->getAllSectionSpic($InfoFaculty->id_spec) as $key => $value) {
							foreach ($this->faculty->getAllGroupSection($value->id) as $key => $val) {
								$this->faculty->InsertAffichageGroupe($idPub, $val->id);
							}
						}
						break;
					case 'section':
						foreach ($this->faculty->getAllGroupSection($InfoFaculty->id_section) as $key => $val) {
							$this->faculty->InsertAffichageGroupe($idPub, $val->id);
						}
						break;
					case 'group':
						$this->faculty->InsertAffichageGroupe($idPub, $InfoFaculty->id_grp);
						break;
				}
				echo json_encode(true);
			} catch (Exception $e) {
				echo ("catch false");
			}
		} else {
			echo ("else false");
		}
	}

	public function insertPubEnregistrees()
	{
		$issets = isset($_POST['id_etudiant']) && isset($_POST['idPub']);
		if ($issets) {
			$req = "SELECT * FROM `pub_enregistrees_etudiant` WHERE `id_etudiant`=:id_etudiant and `id_pub` =:idPub ;";
			$this->db->query($req);
			$this->db->bind(":id_etudiant", strip_tags(trim($_POST['id_etudiant'])));
			$this->db->bind(":idPub",  strip_tags(trim($_POST['idPub'])));
			if (empty($this->db->single())) {
				$req = "INSERT INTO `pub_enregistrees_etudiant` (`id`, `id_etudiant`, `id_pub`) VALUES (NULL, :id_etudiant, :idPub );";
				$this->db->query($req);
				$this->db->bind(":id_etudiant", strip_tags(trim($_POST['id_etudiant'])));
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
		$issets = isset($_POST['id_etudiant']) && isset($_POST['idPub']);
		if ($issets) {
			$req = "DELETE FROM `pub_enregistrees_etudiant` WHERE  `id_etudiant` = :id_etudiant and `id_pub` = :idPub;";
			$this->db->query($req);
			$this->db->bind(":id_etudiant", strip_tags(trim($_POST['id_etudiant'])));
			$this->db->bind(":idPub",  strip_tags(trim($_POST['idPub'])));
			try {
				$this->db->execute();
				echo true;
			} catch (\Throwable $th) {
				echo false;
			}
		}
	}
}
