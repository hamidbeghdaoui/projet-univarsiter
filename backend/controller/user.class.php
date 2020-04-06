<?php

/**
 * Class user
 */

class controller_user
{

	private $db;

	function __construct()
	{
		$this->db = new model_database();
	}

	/**
	 * getters
	 */

	public function Inscription()
	{
		$issets = isset($_POST['typeUser']) && isset($_POST['matricule']) && isset($_POST['password_inscription']);
		if ($issets) {
			$req = ' ';
			switch ($_POST['typeUser']) {
				case 'etudiant':
					$req = 'SELECT id FROM `etudiant` WHERE `matricule` =:matricule and `password_inscription` =:password_inscription and etudiant.id NOT in ( SELECT user.id_typeUser FROM user WHERE user.typeUser="etudiant" );';
					break;
				case 'prof':
					$req = 'SELECT id FROM `prof` WHERE `matricule`=:matricule and `password_inscription`=:password_inscription and prof.id NOT in ( SELECT user.id_typeUser FROM user WHERE user.typeUser="prof" ); ;';
					break;
				case 'admin':
					$req = 'SELECT id FROM `departement` WHERE `matricule`=:matricule and `password_inscription`=:password_inscription and departement.id NOT in ( SELECT user.id_typeUser FROM user WHERE user.typeUser="admin" ); ;';
					break;
			}

			$this->db->query($req);
			$this->db->bind(":matricule", strip_tags(trim($_POST['matricule'])));
			$this->db->bind(":password_inscription", strip_tags($_POST['password_inscription']));
			if ($this->db->single()) {
				echo json_encode(['idTypeUser' => $this->db->single()->id, 'typeUser' => $_POST['typeUser']]);
			} else {
				echo json_encode(false);
			}
		}
	}

	public function Login()
	{
		$issets = isset($_POST['user']) && isset($_POST['password']);
		if ($issets) {
			// get password
			$this->db->query("SELECT * FROM `user` WHERE `userName` = :user");
			$this->db->bind(":user", strip_tags(trim($_POST['user'])));
			// verify password
			$resalt = $this->db->single();
			if (!empty($resalt)) {
				if (password_verify($_POST['password'], $resalt->password)) {
					echo json_encode($resalt);
				} else {
					echo json_encode(false);
				}
			} else {
				echo json_encode(false);
			}
		}
	}

	public function ConfirmationLogin()
	{
		$issets = isset($_POST['user']) && isset($_POST['password']);
		if ($issets) {
			$this->db->query("SELECT * FROM `user` WHERE `userName`=:user and `password`=:password ;");
			$this->db->bind(":user", strip_tags(trim($_POST['user'])));
			$this->db->bind(":password", $_POST['password']);
			$resalt = $this->db->single();
			if (!empty($resalt)) {
				echo json_encode(true);
			} else {
				echo json_encode(false);
			}
		}
	}

	public function getInformationUser()
	{
		$issets = isset($_POST['idTypeUser']) && isset($_POST['typeUser']);
		$req = '';
		if ($issets) {
			switch ($_POST['typeUser']) {
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
			$this->db->bind(":id", strip_tags(trim($_POST['idTypeUser'])));
			$resalt = $this->db->single();
			if (!empty($resalt)) {
				echo json_encode($resalt);
			} else {
				echo json_encode(false);
			}
		}
	}

	public function getALLInformationUser()
	{
		$issets = isset($_POST['idTypeUser']) && isset($_POST['typeUser']);

		if ($issets) {
			$req =
				"SELECT user.id as idUser ,user.userName ,user.password ,typeUser ,id_typeUser FROM `user` 
			WHERE `typeUser`=:typeUser and `id_typeUser`=:idTypeUser ;";
			$this->db->query($req);
			$this->db->bind(":idTypeUser", strip_tags(trim($_POST['idTypeUser'])));
			$this->db->bind(":typeUser", strip_tags(trim($_POST['typeUser'])));
			$resaltInfUser = $this->db->single();

			switch ($_POST['typeUser']) {
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
			$this->db->bind(":id", strip_tags(trim($_POST['idTypeUser'])));
			$resaltInfoTypeUser = $this->db->single();
			if (!empty($resaltInfoTypeUser)) {
				$resaltReturn = [
					'idUser' => $resaltInfUser->idUser,
					'userName' => $resaltInfUser->userName,
					'password' => $resaltInfUser->password,
					'id_typeUser' => $resaltInfUser->id_typeUser,
					'typeUser' => $resaltInfUser->typeUser,
					'nom' => $resaltInfoTypeUser->nom,
					'prenom' => $resaltInfoTypeUser->prenom,
					'phone' => $resaltInfoTypeUser->phone,
					'email' => $resaltInfoTypeUser->email,
					'image' => $resaltInfoTypeUser->image,
				];

				echo json_encode($resaltReturn);
			} else {
				echo json_encode(false);
			}
		}
	}

	public function getInfoUser($idTypeUser, $typeUser)
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


	/**
	 * setters
	 */

	public function ConfirmationInscription()
	{
		$returnResalt = ['updateTypeUser' => false, 'addUser' => false];
		$issets = isset($_POST['idTypeUser']) && isset($_POST['typeUser']) && isset($_POST['user'])
			&& isset($_POST['password']) && isset($_POST['email']) && isset($_POST['Phone']) && isset($_POST['image']);

		if ($issets) {
			$image = NULL;
			if (!empty($_POST['image'])) $image = $_POST['image'];
			//--------------------------- add info Type User {etudiant , prof , admin} --------------------------------------
			$req = "";
			switch ($_POST['typeUser']) {
				case 'etudiant':
					$req = "UPDATE `etudiant` SET `phone` = :Phone, `email` = :email, `image` = :image WHERE `etudiant`.`id` = :idTypeUser;";
					break;
				case 'prof':
					$req = "UPDATE `prof` SET `phone` = :Phone, `email` = :email, `image` = :image WHERE `prof`.`id` = :idTypeUser;";
					break;
				case 'admin':
					$req = "UPDATE `departement` SET `phone` = :Phone, `email` = :email, `image` = :image WHERE `departement`.`id` = :idTypeUser;";
					break;
			}
			$this->db->query($req);
			$this->db->bind(":idTypeUser", strip_tags(trim($_POST['idTypeUser'])));
			$this->db->bind(":email", strip_tags(trim($_POST['email'])));
			$this->db->bind(":Phone", strip_tags(trim($_POST['Phone'])));
			$this->db->bind(":image", $image);
			try {
				$this->db->execute();
				$returnResalt['updateTypeUser'] = true;
			} catch (Exception $e) {
				$returnResalt['updateTypeUser'] = false;
			}

			//--------------------------- insert  User --------------------------------------
			$req = "INSERT INTO `user` (`id`, `userName`, `password`, `typeUser`, `id_typeUser`) VALUES (NULL, :userName,:password, :typeUser, :id_typeUser);";
			$this->db->query($req);
			$this->db->bind(":userName", strip_tags(trim($_POST['user'])));
			$this->db->bind(":password", password_hash($_POST['password'], PASSWORD_DEFAULT));
			$this->db->bind(":typeUser", strip_tags(trim($_POST['typeUser'])));
			$this->db->bind(":id_typeUser", strip_tags(trim($_POST['idTypeUser'])));
			try {
				$this->db->execute();
				$returnResalt['addUser'] = true;
			} catch (Exception $e) {
				$returnResalt['addUser'] = false;
			}
			//--------------------------- return resalte --------------------------------------
		}
		echo json_encode($returnResalt);
	}

	public function parametreInfo()
	{

		$issets = isset($_POST['id_user']) && isset($_POST['email']) && isset($_POST['phone'])
			&& isset($_POST['image']);

		if ($issets) {
			$req = "SELECT user.id as idUser ,user.userName ,user.password ,typeUser ,id_typeUser FROM `user` 
			WHERE `id`=:id_user ";
			$this->db->query($req);
			$this->db->bind(":id_user", strip_tags(trim($_POST['id_user'])));
			$resaltInfoUser = $this->db->single();
			$resaltInfoTypeUser = $this->getInfoUser($resaltInfoUser->id_typeUser, $resaltInfoUser->typeUser);
			if ($resaltInfoTypeUser->image != NULL) if (!empty($_POST['image'])) {
				DeletePic("../file/user/" . $resaltInfoTypeUser->image);
			}
			$image = $resaltInfoTypeUser->image;
			if (!empty($_POST['image'])) $image = $_POST['image'];
			//--------------------------- add info Type User {etudiant , prof , admin} --------------------------------------
			$req = "";
			switch ($resaltInfoUser->typeUser) {
				case 'etudiant':
					$req = "UPDATE `etudiant` SET `phone` = :phone, `email` = :email, `image` = :image WHERE `etudiant`.`id` = ".$resaltInfoUser->id_typeUser.";";
					break;
				case 'prof':
					$req = "UPDATE `prof` SET `phone` = :phone, `email` = :email, `image` = :image WHERE `prof`.`id` = ".$resaltInfoUser->id_typeUser.";";
					break;
				case 'admin':
					$req = "UPDATE `departement` SET `phone` = :phone, `email` = :email, `image` = :image WHERE `departement`.`id` = ".$resaltInfoUser->id_typeUser.";";
					break;
			}
			$this->db->query($req);
			$this->db->bind(":email", strip_tags(trim($_POST['email'])));
			$this->db->bind(":phone", strip_tags(trim($_POST['phone'])));
			$this->db->bind(":image", $image);
			try {
				$this->db->execute();
				echo json_encode(true);
			} catch (Exception $e) {
				echo json_encode($resaltInfoUser->typeUser);
			}
		}else{
			echo json_encode("false2");
		}
	}

	public function parametreSaisie()
	{
		$issets = isset($_POST['id_user']) && isset($_POST['username']) && isset($_POST['passwordN']) &&
			isset($_POST['Password']);
		if ($issets) {
			$req = "SELECT * FROM `user` WHERE id =:id_user ;";
			$this->db->query($req);
			$this->db->bind(":id_user", strip_tags(trim($_POST['id_user'])));
			$result = $this->db->single();
			if (password_verify($_POST['Password'], $result->password)) {
				$req = "SELECT COUNT(*) as number FROM user WHERE id != :id_user and userName=:userName ;";
				$this->db->query($req);
				$this->db->bind(":id_user", strip_tags(trim($_POST['id_user'])));
				$this->db->bind(":userName", strip_tags(trim($_POST['username'])));
				if ($this->db->single()->number === "0") {
					$req = "UPDATE `user` SET `userName` =:userName ,`password`=:passwordN WHERE `user`.`id` = :id_user;";
					$this->db->query($req);
					$this->db->bind(":id_user", strip_tags(trim($_POST['id_user'])));
					$this->db->bind(":userName", strip_tags(trim($_POST['username'])));
					$this->db->bind(":passwordN", password_hash($_POST['passwordN'], PASSWORD_DEFAULT));
					try {
						$this->db->execute();
						echo json_encode(true);
					} catch (Exception $e) {
						echo json_encode(false);
					}
				} else {
					echo json_encode(false);
				}
			} else {
				echo json_encode(false);
			}
		}
	}
}
