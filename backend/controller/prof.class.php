<?php

/**
 * Class prof
 */
class controller_prof
{

	private $db;

	function __construct()
	{
		$this->db = new model_database();
	}

	/**
	 * getters
	 */

	public function getAllProfGroup($idGroup, $annee, $idSpes, $semestre)
	{
		$req =
			"SELECT user.id as idUser ,user.typeUser ,user.id_typeUser ,prof.id as id_prof ,prof.nom ,prof.prenom ,prof.image ,prof_groupe.role ,module.id as id_module ,module.nom_module 
		   ,module.semestre ,specialite.id as id_sp ,specialite.nom_spec ,specialite.annee 
		   FROM user ,prof_groupe ,module ,prof ,specialite
            WHERE prof_groupe.id_groupe = $idGroup
			and prof_groupe.annee = '$annee' and prof_groupe.id_prof = prof.id 
            and prof_groupe.id_module = module.id and module.semestre=$semestre
            and module.id_specialite = specialite.id and specialite.id =$idSpes
			and user.typeUser = 'prof' and user.id_typeUser= prof.id;";
		$this->db->query($req);
		return $this->db->resultSet();
	}

	public function cherProf($nomOUprenom)
	{
		$req = "SELECT User.id as idUser ,user.id_typeUser , user.typeUser,prof.* FROM prof ,user WHERE
			 prof.prenom LIKE '$nomOUprenom%' and user.typeUser = 'prof' and user.id_typeUser = prof.id ; ";
		$this->db->query($req);
		return $this->db->resultSet();
	}
	/**
	 * setters
	 */
}
