<?php

/**
 * Class message
 */
class controller_message
{

	private $db;

	function __construct()
	{
		$this->db = new model_database();
	}

	/**
	 * getters
	 */

	public function getMessageUser()
	{
		if (isset($_POST['idUser'])) {
			$rsultArry = array();
			$this->db->query(
				"SELECT messegrie.id, messegrie.message, messegrie.typeMessage, messegrie.date,
				 messegrie.statut,user.id as idUser ,user.id_typeUser, user.typeUser 
				 FROM `messegrie`,`user` 
				 WHERE `id_userRecepteur`=:id_userRecepteur and `id_userEnvoye` =user.id and  messegrie.id IN 
				 ( SELECT max(messegrie.id) as id FROM messegrie GROUP by `id_userEnvoye` ORDER by id DESC ) 
			     ORDER by messegrie.id DESC
				;"
			);
			$this->db->bind(":id_userRecepteur", strip_tags(trim($_POST['idUser'])));
			if ($this->db->resultSet()) {
				foreach ($this->db->resultSet() as $key => $value) {
					$this->getInformationUser($value->id_typeUser, $value->typeUser);
					$userInfo = $this->getInformationUser($value->id_typeUser, $value->typeUser);
					$resalt = [
						'idMessage' => $value->id,
						'message' => $value->message,
						'typeMessage' => $value->typeMessage,
						'date' => $value->date,
						'statut' => $value->statut,
						'idUser' => $value->idUser,
						'idTypeUser' => $value->id_typeUser,
						'typeUser' => $value->typeUser,
						'nom' => $userInfo->nom,
						'prenom' => $userInfo->prenom,
						'phone' => $userInfo->phone,
						'email' => $userInfo->email,
						'image' => $userInfo->image,
					];
					array_push($rsultArry, $resalt);
				}
				echo json_encode($rsultArry);
			} else {
				echo json_decode(false);
			}
		}
	}


	public function getInformationUser($idTypeUser, $typeUser)
	{
		$req = '';
		switch ($typeUser) {
			case 'etudiant':
				$req = "SELECT * FROM `etudiant` WHERE id=:id";
				break;
			case 'prof':
				$req = "SELECT * FROM `prof` WHERE id=:id";
				break;
			case 'admin':
				$req = "SELECT * FROM `departement` WHERE id=:id";
				break;
		}
		$this->db->query($req);
		$this->db->bind(":id", strip_tags(trim($idTypeUser)));
		return $this->db->single();
	}

	public function getMessageEnvoyeRecepteur()
	{
		$issets = isset($_POST['id_userEnvoye']) && isset($_POST['id_userRecepteur']);
		if ($issets) {
			$req = "SELECT * FROM `messegrie` WHERE (`id_userRecepteur`=:id_userRecepteur 
			and `id_userEnvoye` =:id_userEnvoye) or (`id_userRecepteur`=:id_userEnvoye 
			and `id_userEnvoye` = :id_userRecepteur) ;";
			$this->db->query($req);
			$this->db->bind(":id_userEnvoye", strip_tags(trim($_POST['id_userEnvoye'])));
			$this->db->bind(":id_userRecepteur", strip_tags(trim($_POST['id_userRecepteur'])));
			$resalt = $this->db->resultSet();
			if (!empty($resalt)) {
				echo json_encode($resalt);
				$req =
					"UPDATE messegrie SET `statut` = 'oui'
				     WHERE `id_userEnvoye`=:id_userEnvoye 
				     and `id_userRecepteur`=:id_userRecepteur ;
				     ";
				$this->db->query($req);
				$this->db->bind(":id_userEnvoye", strip_tags(trim($_POST['id_userEnvoye'])));
				$this->db->bind(":id_userRecepteur", strip_tags(trim($_POST['id_userRecepteur'])));
				try {
					$this->db->execute();
				} catch (Exception $e) {
					echo json_encode([]);
				}
			} else {
				echo json_encode([]);
			}
		}
	}

	/**
	 * setters
	 */

	public function sendMessage()
	{
		$issets = isset($_POST['message']) && isset($_POST['typeMessage']) &&
			isset($_POST['id_userEnvoye']) && isset($_POST['id_userRecepteur']);
		if ($issets) {
			$req =
				"INSERT INTO `messegrie` (`id`, `id_userEnvoye`, `id_userRecepteur`, `message`, `typeMessage`, `date`, `statut`)
				 VALUES (NULL, :id_userEnvoye, :id_userRecepteur, :message , :typeMessage , CURRENT_TIMESTAMP, 'non');
				 ";
			$this->db->query($req);
			$this->db->bind(":message", strip_tags(trim($_POST['message'])));
			$this->db->bind(":typeMessage", strip_tags(trim($_POST['typeMessage'])));
			$this->db->bind(":id_userEnvoye", strip_tags(trim($_POST['id_userEnvoye'])));
			$this->db->bind(":id_userRecepteur", strip_tags(trim($_POST['id_userRecepteur'])));
			try {
				$this->db->execute();
				echo json_encode(true);
			} catch (Exception $e) {
				echo json_encode(false);
			}
		}
	}
}
