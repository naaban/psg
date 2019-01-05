<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
include ("DB.php");
$response = array();
  /*if($_SERVER["REQUEST_METHOD"]=="POST"){
   
                $postdata = file_get_contents("php://input");
                $request = json_decode($postdata,true);*/
         // $admin_id =$request['admin_id'];
 
        $sql_p = "SELECT * FROM event";

        $res_p = mysqli_query($db, $sql_p);
    

            if (mysqli_num_rows($res_p)>0) {
                while ($row = mysqli_fetch_assoc($res_p)) {
                     array_push($response, array('event_id'=> $row['id'], 'event_name' => $row['name'], 'event_date'=> $row['event_date'], 'event_time'=>$row['event_time'], 'event_venue'=>$row['event_venue'],'day'=>$row['day']));
                }
               
                    
                        echo json_encode($response);
                }
                else{
                    $response= array('status'=>false, 'message'=>'No records found');
                    echo json_encode($response);
                }
            
        
  



?>