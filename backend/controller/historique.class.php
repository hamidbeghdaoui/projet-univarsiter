<?php

/**
 * Class admin
 */
class controller_historique
{

	private $db;

	function __construct()
	{
		$this->db = new model_database();
	}

	/**
	 * getters
	 */

	public  function getThisYear()
	{
		$req = "SELECT * FROM `historique` WHERE `statut`='1';";
		$this->db->query($req);
		return $this->db->single();
	}

	public  function getAllAnnee()
	{
		$req = "SELECT * FROM `historique`;";
		$this->db->query($req);
		return $this->db->resultSet();
	}

	public function newYear()
	{
		$allYears = $this->getAllAnnee();
		$lastYeas = @end(@explode('/', @end($allYears)->annee));
		$presentTime = @explode('.', date("Y.m.d"));
		$isNewYear = false;
		$newYear = "";
		if ($lastYeas < $presentTime[0]) {
			$isNewYear = true;
			$newYear = $presentTime[0] . '/' . ($presentTime[0] + 1) . "";
		} else if ($lastYeas === $presentTime[0] && $presentTime[1] >= 7) {
			$isNewYear = true;
			$newYear = $presentTime[0] . '/' . $presentTime[0] + 1;
		}
		if ($isNewYear) {
			foreach ($allYears as $key => $value) {
				$req = "UPDATE `historique` SET `statut` = '0' WHERE `historique`.`id` =" . $value->id . ";";
				$this->db->query($req);
				try {
					$this->db->execute();
				} catch (\Throwable $th) {
				}
			}
			$req = "INSERT INTO `historique` (`id`, `annee`, `semestre`, `statut`) VALUES (NULL, '$newYear', '1', '1');";
			$this->db->query($req);
			try {
				$this->db->execute();
				echo "true";
			} catch (\Throwable $th) {
				echo "false";
			}
		} else {
			echo "false";
		}
	}

	public function newSemestre2()
	{
		if (isset($_POST['idYear'])) {
			$presentTime = @explode('.', date("Y.m.d"));
			if ($presentTime[1] >= 3) {
				$req = "UPDATE `historique` SET `semestre` = '2' WHERE `historique`.`id` =" . $_POST['idYear'] . ";";
				$this->db->query($req);
				try {
					$this->db->execute();
					echo "true";
				} catch (\Throwable $th) {
					echo "false";
				}
			} else {
				echo "false";
			}
		}
	}


	/**
	 * setters
	 */
}
