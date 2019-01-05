<?php
header("Content-Type:application/json");
header("Access-Control-Allow-Origin: *");
include ("DB.php");
  if($_SERVER["REQUEST_METHOD"]=="POST"){
     $postdata = file_get_contents("php://input");
     $request = json_decode($postdata,true);
//    about details attributes
    $name = $request['name'];
    $date = $request['date'];
    $phone = $request['phone'];
    $email = $request['email'];
    $address = $request['address'];
    $city= $request['city'];
    $state = $request['state'];
    $country = $request['country'];
    $alumni_dept = $request['alumni_dept'];
    $achievement = $request['achievement'];
    // family details attributes

    $spouse_name = $request['spouse_name'];
    $childrens = $request['childrens'];
    $wed_date = $request['wed_date'];
    $clg_photo = $request['clg_photo'];
    $family_photo = $request['family_photo'];
 
    // working details attributes

    $occupation = $request['occupation'];
    $company = $request['company'];
    $current_position = $request['current_position'];

    // travel details attributes

    $travel_mode = $request['travel_mode'];
    $destination_date = $request['destination_date'];
    $destination_time = $request['destination_time'];
    $departure_date = $request['departure_date'];
    $departure_time = $request['departure_time'];
    
    // booking details attributes
    
    $food_type = $request['food_type'];
    $smoking = $request['smoking'];
    $liquor = $request['liquor'];

 
        $sql_p = "SELECT * FROM about WHERE mobile='$phone' AND email='$email'";

        $res_p = mysqli_query($db, $sql_p);
        if (mysqli_num_rows($res_p) > 0) {
            $response= array('status' => false, 'message'=>'Email or Phone already taken' );
            echo json_encode($response);
        } else {
            $sql = "INSERT INTO about (name,dates,mobile,email,address,city,state,country,alumni_dept,achievement,flm_spouse,flm_child,flm_wed_date,wrk_occupation,wrk_company,wrk_position,trl_mode,trl_dep_date,trl_dep_time,trl_des_date,trl_des_time,book_food,book_smoke,book_liquor,clg_photo,family_photo) VALUES ('$name','$date','$phone','$email','$address','$city','$state','$country','$alumni_dept','$achievement','$spouse_name',$childrens,'$wed_date','$occupation','$company','$current_position','$travel_mode','$departure_date','$departure_time','$destination_date','$destination_time','$food_type','$smoking','$liquor','$clg_photo','$family_photo')";

            $result = mysqli_query($db, $sql);
            
            if ($result) {
               
                        $response= array('status' => true, 'message'=>'Data Inserted Successfully' );
                        echo json_encode($response);
                }
                else{
                    $response= array('status'=>false, 'message'=>'Data Insertion Failed');
                    echo json_encode($response);
                }
            }
        }
  

else
{
    $response(0,"Somthing Error",NULL);
}

?>