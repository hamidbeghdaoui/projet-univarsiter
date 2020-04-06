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

	public  function FunctionName2()
	{
		# code...
	}
}
