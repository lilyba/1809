<?php
   header("Access-Control-Allow-Origin:*");
   include("../config/connect.php");
   $userId = $_POST["userId"];
   $id = $_POST["id"];
   $goodsnum = $_POST["goodsnum"];
   $sql = "update cart set goodsnum = '$goodsnum' where id = '$id'";
   $isSuc = mysql_query($sql);
   if($isSuc){
   		$arr = array('code' => 1);
   		echo json_encode($arr);
   }
   mysql_close();
   
?>