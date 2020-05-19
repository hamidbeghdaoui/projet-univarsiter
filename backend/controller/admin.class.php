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
		$req =
			"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser , departement.id as id_admin 
			,departement.nom ,departement.prenom , departement.role ,departement.image 
			FROM departement ,user
			WHERE departement.id = user.id_typeUser and user.typeUser='admin'";
		$this->db->query($req);
		return $this->db->resultSet();
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
}
