<?php
	header("Access-Control-Allow-Origin:*");
	include("../config/connect.php");
	$id = $_POST["id"];
	$listItemId = $_POST["listItemId"];
	if(empty($id) && empty($listItemId)){
		$sql = "select * from goods;";
	}elseif(empty($listItemId)){
		$sql = "select * from goods where id = '$id'";
	}else{
		
		$sql = "select * from goods where listItemId = '$listItemId'";
	}
    $result = mysql_query($sql);
    $arr = array();
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