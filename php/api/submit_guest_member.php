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

if($req['no_identitas'] == null || $req['no_identitas'] == ""){
    echo '{';
        echo '"success": false,';
        echo '"message": "No. Member yang dimasukkan kosong"';
    echo '}';
    exit(422); //Unprocessable Entity HTTP Code
}elseif (substr($req['no_identitas'],0, 3) != "481"){
    echo '{';
        echo '"success": false,';
        echo '"message": "Format No. Member yang dimasukkan salah"';
    echo '}';
    exit(422); //Unprocessable Entity HTTP Code
}

$member = new Member($connection);
$stmt = $member->readWhere($req['no_identitas']);
$rowCount = $stmt->rowCount();

if($rowCount == 0){
    echo '{';
        echo '"success": false,';
        echo '"message": "Member tidak ditemukan"';
    echo '}';
    exit(400); //General Error
}

$row = $stmt->fetch();

$guest = new Guest($connection);
$guest->setName($row['name']);
$guest->setIsMember(true);
$guest->setIdNumber($row['id']);
$guest->setAddress($row['address']);

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





