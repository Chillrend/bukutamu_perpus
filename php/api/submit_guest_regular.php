<?php

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../db/DbConnection.php';
include_once '../popo/Member.php';
include_once '../popo/Guest.php';

$db = new DbConnection();
$connection = $db->getConnection();

$req = $_POST;

if($req['name'] == null || $req['name'] == "" || $req['address'] == null || $req['address'] == ""){
    echo '{';
    echo '"success": false,';
    echo '"message": "No. Member yang dimasukkan kosong"';
    echo '}';
    exit(422); //Unprocessable Entity HTTP Code
}

$guest = new Guest($connection);
$guest->setName($req['name']);
$guest->setIsMember(false);
$guest->setIdNumber(null);
$guest->setAddress($req['address']);

if($guest->store()){
    echo '{';
    echo '"success": true,';
    echo '"message": "Halo, ' .$guest->getName(). ' Anda telah masuk daftar tamu Index Librorum Prohibitorum"';
    echo '}';
}else{
    echo '{';
    echo '"success": false,';
    echo '"message": "Gagal memasukkan data, silahkan coba lagi"';
    echo '}';
    exit(400); //General Error
}
