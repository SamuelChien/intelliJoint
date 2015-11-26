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
        $this->load->view('home');
    }

    function sentData($dataVal)
    {
        $this->load->view('home');
        // $data['dataVal'] = $dataVal;
        // $this->load->view('displayData', $data);
    }
}

