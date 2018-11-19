<?php
	header("Access-Control-Allow-Origin:*");
	include("../config/connect.php");
	$name = $_POST["username"];
    $pwd = $_POST["password"];
    $sql = "select * from user where (name = '$name' or tel ='$name') and pwd = '$pwd'";
    $result = mysql_query($sql);
    $arr = array();
	while($row = mysql_fetch_assoc($result)){
    	array_push($arr,$row);
    }
    
    if($result){
    	if(mysql_num_rows($result)>0){
    		 $data = array(
		    	"code"=>1,
		    	 "data"=>$arr
		    	);
    	}else{
    		 $data = array("code"=>2);
    	}
    	echo json_encode($data);
    }
    mysql_close();

?>