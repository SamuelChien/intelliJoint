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
	function insertData($data){
		$this->db->query("INSERT INTO sensordata (sensorVal) VALUES (".$data.")");
	}
}

/* End of file admin.php */
/* Location: ../application/model/movie_model.php */