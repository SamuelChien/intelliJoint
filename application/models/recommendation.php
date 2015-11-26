<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/************************************************************
 *
 * UT Cinema Inc.
 *
 * Copyright 2013. All Rights Reserved.
 * This file may not be redistributed in whole or part.
 *
 * Application: UT Cinema Web App
 * Movie_model.php
 *
 ************************************************************/
class Recommendation extends CI_Model {

	/**
     * Get the ticket info query
     *
     *
     * @return  $query (query)
     *
     */
	function getAppsList(){
		$query = $this->db->query("SELECT * FROM appDetail");
		return $query;
	}

	function getUserAcquisitionList(){
		$query = $this->db->query("SELECT * FROM userAcquisition");
		return $query;
	}

	function getRecommendedAppsList($recommendedApps){
		$queryString = "SELECT * FROM appDetail WHERE AssetId IN ('" . implode("','", $recommendedApps) . "') ORDER BY FIELD(AssetId,'" . implode("','", $recommendedApps) . "')";
		$query = $this->db->query($queryString);
		return $query;
	}

	function getUserAcquisition($userHash)
	{
		$queryString = "SELECT * FROM userAcquisition WHERE UserId = '" . $userHash . "'";
		$query = $this->db->query($queryString);
		return $query;
	}
}

/* End of file admin.php */
/* Location: ../application/model/movie_model.php */