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



      function rep_count($startTime,$endTime){


         // $query = $this->db->query("SELECT Case when sensorVal > 650 then 1 else 0  End AS up FROM sensordata as t1");
          $query = $this->db->query("SELECT UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 AS time, up FROM (SELECT ID, curTime, Case when sensorVal > 650 then 1 else 0  End AS up FROM sensordata) as t1 WHERE UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 > ".$startTime" and UNIX_TIMESTAMP(curTime) * 1000 + ID%1000 < ".$endTime" ORDER BY UNIX_TIMESTAMP(curTime) * 1000 + ID%1000");

          return $query;
     } 


     function get_all_down($startTime,$endTime){

          //$query = $this->db->query("SELECT t1.ID, t1.curTime, t1.up, sensorVal from (SELECT ID, curTime, Case when sensorVal > 650 then 1 else 0  End AS up FROM sensordata) as t1 inner join sensordata on t1.ID = sensordata.ID and t1.up = 0");
          $query = $this->db->query("SELECT t1.ID, UNIX_TIMESTAMP(t1.curTime) * 1000 + t1.ID%1000 AS time, t1.up, sensorVal from (SELECT ID, curTime, Case when sensorVal > 650 then 1 else 0  End AS up FROM sensordata) as t1 inner join sensordata on t1.ID = sensordata.ID and t1.up = 0 WHERE (UNIX_TIMESTAMP(t1.curTime) * 1000 + t1.ID%1000 < ".$endTime") and (UNIX_TIMESTAMP(t1.curTime) * 1000 + t1.ID%1000 > ".$startTime")")
          return $query;


     }

     function get_all_up($startTime,$endTime){

          $query = $this->db->query("SELECT t1.ID, UNIX_TIMESTAMP(t1.curTime) * 1000 + t1.ID%1000 AS time, t1.up, sensorVal from (SELECT ID, curTime, Case when sensorVal > 650 then 1 else 0  End AS up FROM sensordata) as t1 inner join sensordata on t1.ID = sensordata.ID and t1.up = 1 WHERE (UNIX_TIMESTAMP(t1.curTime) * 1000 + t1.ID%1000 < ".$endTime") and (UNIX_TIMESTAMP(t1.curTime) * 1000 + t1.ID%1000 > ".$startTime")")
     return $query;


     }


}

/* End of file admin.php */
/* Location: ../application/model/movie_model.php */