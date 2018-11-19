<?php
   header("Access-Control-Allow-Origin:*");
   include("../config/connect.php");
   $userId = $_POST["userId"];
   $sql = "select * from cart where userId ='$userId'";
   $result = mysql_query($sql);
   $arr= array();
   while($row = mysql_fetch_assoc($result)){
   		array_push($arr,$row);
   }
   $data = array(
   	    "code"=>1,
   	    "data"=>$arr
   );
   echo json_encode($data);
   mysql_close();
   
?>