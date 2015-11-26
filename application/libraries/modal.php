<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

/************************************************************
 *
 * UT Cinema Inc.
 *
 * Copyright 2013. All Rights Reserved.
 * This file may not be redistributed in whole or part.
 *
 * Application: UT Cinema Web App
 *
 ************************************************************/

class Modal
{
    /**
     * Initialize the CI instance so we can access codeigniter model
     */
    public function __construct()
    {
        $this->CI =& get_instance();
    }
    /**
     * Get the string of html code for the theater selection
     *
     *
     * @return  $tableString (string)
     *
     */
    function createList()
    {
        $this->CI->load->model('recommendation');
        $query = $this->CI->recommendation->getAppsList();
        return $this->getTableStringByAppQuery($query);
    }

    function getTableStringByAppQuery($query)
    {
        $tableString = "<div class='gridrow'>";
        $counter = 0;
        foreach ($query->result() as $row)
        {
            $tableString = $tableString . 
                            "
                            <div id='".$row->AssetId."' class='appCellModal'>
                                <a href='https://store.office.com/app.aspx?assetid=".$row->AssetId."'>
                                    <div class='appIconBackgroup' style='border:1px solid #DDDDDD;'>
                                        <img class='appIcon' alt='Contextual for Word' src='https://az158878.vo.msecnd.net".$row->IconUrl."' width='96' height='96'>
                                    </div>
                                    <div class='appMetadata'>
                                        <div class='appDetails'>
                                            <div class='appTitle'><b>".$row->AppTitle."</b></div>
                                            <div class='appDescription'>".$row->AppDescription."</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            ";
            $counter += 1; 
            if($counter%4 == 0)
            {
                $tableString = $tableString . "
                                                </div>
                                                <div class='clearrow'></div>
                                                <div class='gridrow'>
                                                ";
            }
        }
        $tableString = $tableString . "</div><div class='clearrow'></div>";

        return $tableString;
    }

    function getRecommendedApps($assetIdList)
    {
        $userHash = $this->getClosestUserHash($assetIdList);
        $chosenArray = array();
        $limit = 15; 

        $dataCollector = ["WA104375277", "WA104237071", "WA104238076",  "WA104218073", "WA104238072", "WA104201648", "WA104233923"];
        $image = ["WA104199826", "WA103296784", "WA104040613", "WA104379405", "WA104038830", "WA104070070"];
        $writing = ["WA104104877", "WA104079622", "WA104185333", "WA103436790", "WA104041485", "WA104211266", "WA103982217"];
        $search = ["WA104184267", "WA104030860", "WA104312191", "WA104222178", "WA102924186"];
        $calendar = ["WA102957665", "WA104017332", "WA104184269"];
        $tips = ["WA104194620", "WA104187952", "WA104185327", "WA104197352", "WA104198733"];
        $school = ["WA104379264", "WA104323558", "WA104281577", "WA104281593", "WA104363477", "WA104320031", "WA104199813"];
        $dictionary = ["WA104159501", "WA104099688", "WA103136166", "WA104243194", "WA104379504", "WA102920437", "WA104379107", "WA104201652", "WA102925879"];
        $translator = ["WA104334910", "WA104114216", "WA104124372"];
        $geolocation = ["WA104374368", "WA103304320", "WA102957661", "WA104379512", "WA102957661"];
        $visualization = ["WA104379087", "WA104379213", "WA104204736", "WA104356536", "WA104068937", "WA103857593", "WA104067192", "WA104379481", "WA104379485", "WA104104476", "WA104042888", "WA103147117", "WA104379190", "WA104365670", "WA104168603", "WA104120594", "WA104379169"];
        $tools = ["WA104051163", "WA103992993", "WA104209731"];
        $finance = ["WA104356783", "WA104175802", "WA104379220", "WA102951169"];
        $social = ["WA104191381", "WA104197513", "WA104196685", "WA104371139", "WA104089605", "WA104194715", "WA104089605", "WA104032719"];
        $developer = ["WA104077907", "WA104379613", "WA104379501", "WA104364761", "WA104368324", "WA104315019", "WA103863850"];

        $groupList = [$dataCollector, $image, $writing, $search, $calendar, $tips, $school, $dictionary, $translator, $geolocation, $visualization, $tools, $finance, $social, $developer];

        foreach($groupList as $typeList)
        {
            $similarItemList = $this->getSimilarItems($assetIdList, $typeList);
            foreach($similarItemList as $item)
            {
                if($limit > 0)
                {
                    $chosenArray[] = $item;
                    $limit -= 1;
                }
            }
        }

        $recommendedApps = $this->getAzuremlRecommendedApps($userHash);
        foreach($recommendedApps as $app)
        {
            if(!in_array($app, $assetIdList) && $limit > 0)
            {
                $chosenArray[] = $app;
                $limit -= 1;
            }
        }

        $this->CI->load->model('recommendation');
        $query = $this->CI->recommendation->getRecommendedAppsList($chosenArray);
        echo $this->getTableStringByAppQuery($query);
    }

    function getSimilarItems($assetIdList, $typeList)
    {
        $limit = 7;
        $resultItems = array();

        if (count(array_intersect($assetIdList, $typeList)) > 0)
        {
            foreach($typeList as $item)
            {
                if(!in_array($item, $assetIdList) && $limit > 0)
                {
                    $resultItems[] = $item;
                    $limit -= 1;
                }
            }
        }
        return $resultItems;
    }

    function getAzuremlRecommendedApps($userHash)
    {
        $this->CI->load->model('recommendation');
        $query = $this->CI->recommendation->getUserAcquisition($userHash);

        $valueList = array();
        $counter = 5;
        foreach ($query->result() as $row)
        {
            $valueList[] = [$row->UserId, $row->AssetId, $counter];
            if($counter > 1)
            {
                $counter -= 1;
            }
        }

        error_reporting(E_ALL);
        ini_set('display_errors', 1);

        $url = 'https://ussouthcentral.services.azureml.net/workspaces/cb196175b0594b00abb51c4bf91bec22/services/c591fa096bab418880e6303bf7102199/execute?api-version=2.0&details=true';

        $api_key = 'a+nNxVgJlrxpT+DY63jlsnA2sE4vzl3ZqLXuCOCSUbCROOAbXiNrteT93Xr23LJxygCROODpIO2xtN6MnvPO5A==';


        $data = array(
            'Inputs'=> array(
                'input1'=> array(
                    'ColumnNames' => ['UserId', 'AssetId', 'Rating'],
                    'Values' => $valueList
                ),
            ),
                'GlobalParameters' => new StdClass(),
        );

        $body = json_encode($data);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer '.$api_key, 'Accept: application/json'));
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

        $response  = json_decode(curl_exec($ch), true);
        //echo 'Curl error: ' . curl_error($ch);
        curl_close($ch);

        $resultApps = $response["Results"]["output1"]["value"]["Values"][0];
        unset($resultApps[0]);
        return $resultApps;
    }

    function getClosestUserHash($assetIdList)
    {
        $this->CI->load->model('recommendation');
        $query = $this->CI->recommendation->getUserAcquisitionList();
        
        $userDistance = array();
        $userId = "";
        $score = count($assetIdList);
        foreach ($query->result() as $row)
        {
            if($userId == "")
            {
                $userId = $row->UserId;
            }

            if($row->UserId != $userId)
            {
                $userDistance[$userId] = $score;
                $score = count($assetIdList);
                $userId = $row->UserId;
            }

            if(in_array($row->AssetId, $assetIdList))
            {
                $score -= 1;
            }
            else
            {
                $score += 1;
            }

        }
        $userDistance[$userId] = $score;
        return array_keys($userDistance, min($userDistance))[0];
    }
}

/* End of file show.php */
/* Location: ../application/libraries/show.php */






