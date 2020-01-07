<?php
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once '../db/DbConnection.php';
include_once '../popo/Book.php';

$db = new DbConnection();
$conn = $db->getConnection();
$req = $_POST;

$getbook = $conn->prepare("SELECT * FROM book where id = ". $req['id']);
$getbook->execute();
$books = $getbook->fetchAll();
$result = array();
foreach ($books as $book) {
      array_push($result,array(
            "id"=>$book['id'],
            "title"=>$book['title'],
			"writer"=>$book['writer'],
            "pub_year" => $book["pub_year"],
            "isbn_issn" => $book["isbn_issn"],
            "genre" => $book["genre"],
            "location" => $book["location"],
            "image" => $book["image"]      
         ));
}

$jsonData = json_encode($result);
echo $jsonData;

?>
