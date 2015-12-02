<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/************************************************************
 *
 * UT Cinema Inc.
 *
 * Copyright 2013. All Rights Reserved.
 * This file may not be redistributed in whole or part.
 *
 * Application: UT Cinema Web App
 * main.php
 *
 ************************************************************/
class Main extends CI_Controller {

    
    function __construct() {
    	// Call the Controller constructor
    	parent::__construct();
    }

    /**
     * Load initial main page.
     */
    function index() 
    {
        $this->load->view('main');
    }

    function sentData($dataVal)
    {
        $this->load->model('recommendation');
        $this->recommendation->insertData($dataVal);
        $data['dataVal'] = $dataVal;
        $this->load->view('displayData', $data);
    }



    function getGraphInitialData()
    {
        $this->load->model('recommendation');
        $query = $this->recommendation->getGraphInitalData();
        $output = array();
        foreach ($query->result() as $row)
        {
            array_push($output, [(int)$row->time, (int)$row->sensorVal]);
        }

        echo json_encode(array_reverse($output));
    }

    function getNextTwentyGraphingPoints($startTime)
    {
        $this->load->model('recommendation');
        $query = $this->recommendation->getNextTwentyGraphingPoints($startTime);
        $output = array();
        foreach ($query->result() as $row)
        {
            array_push($output, [(int)$row->time, (int)$row->sensorVal]);
        }

        echo json_encode($output);
    }

     function repcount(){

        
        $data['dataVal'] = $this->modal->get_rep_count();

        $this->load->view('displayData', $data);
    }

    function getmin(){

        $data['dataVal'] = $this->modal->get_min();

        $this->load->view('displayData', $data);

    }

    function getmax(){

    $data['dataVal'] = $this->modal->get_max();

    $this->load->view('displayData', $data);

    }

    function findalert(){

    $data['dataVal'] = $this->modal->find_alert();

    $this->load->view('displayData', $data);

    }


}


}

