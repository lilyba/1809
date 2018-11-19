<?php
   header("Access-Control-Allow-Origin:*");
   include("../config/connect.php");
   $name = $_POST["username"];
   $pwd = $_POST["password"];
   $tel = $_POST["tel"];
   $sql1 = "select * from user where tel = '$tel'";
   $exist = mysql_query($sql1);
	//	 如果存在不插入
   if(mysql_num_rows($exist)>0){
   		$arr1 = array('code' => 2);
   		echo json_encode($arr1);
   }else{
   		$sql = "insert into user (name,pwd,tel) values ('$name','$pwd','$tel')";
	    $isSuc = mysql_query($sql);
	    if($isSuc){
	   		$arr = array('code' => 1);
	   		echo json_encode($arr);
	   }
   }
  
   mysql_close();
   
?>