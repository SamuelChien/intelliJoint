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

     function getGraphInitalData(){
          $query = $this->db->query("SELECT UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 AS time, sensorVal FROM sensordata ORDER BY UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 DESC LIMIT 100");
          return $query;
     }

     function getNextTwentyGraphingPoints($startTime)
     {
          $query = $this->db->query("SELECT UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 AS time, sensorVal FROM sensordata WHERE UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 > ".$startTime." ORDER BY UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 LIMIT 2");
          return $query;
     }
}

/* End of file admin.php */
/* Location: ../application/model/movie_model.php */