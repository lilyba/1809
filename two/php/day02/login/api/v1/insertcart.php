<?php
   header("Access-Control-Allow-Origin:*");
   include("../config/connect.php");
   $userId = $_POST["userId"];
   $goodsId = $_POST["goodsId"];
   $goodsprice= $_POST["goodsprice"];
   $goodsname = $_POST["goodsname"];
   $goodsnum = $_POST["goodsnum"];
   $goodscansu = $_POST["goodscansu"];
   $goodsImage = $_POST["goodsImage"];
   $sql1 = "select goodsnum from cart where goodsId = '$goodsId' and userId = '$userId'";
   $exist = mysql_query($sql1);
//	 如果存在则update，不存在则insert
   if(mysql_num_rows($exist)>0){
	    while($row = mysql_fetch_assoc($exist)){
	    	$goodsnum1 = $row["goodsnum"];
	    }
   		$goodsnum = $goodsnum1 + $goodsnum; 
   		 $sql = "update cart set goodsnum = '$goodsnum' where goodsId = '$goodsId' and userId = '$userId'";
   }else{
   		$sql = "insert into cart (userId,goodsId,goodsname,goodsprice,goodsnum,goodscansu,goodsImage) values ('$userId','$goodsId','$goodsname','$goodsprice','$goodsnum','$goodscansu','$goodsImage')";
   }

   $isSuc = mysql_query($sql);
   if($isSuc){
   		$arr = array('code' => 1);
   		echo json_encode($arr);
   }
   mysql_close();
   
?>