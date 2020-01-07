<?php

header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../db/DbConnection.php';
include_once '../popo/Member.php';

$db = new DbConnection();
$connection = $db->getConnection();

$req = $_POST;

if(strlen($req['name']) == 0 || strlen($req['address']) == 0 || strlen($req['birthdate']) == 0 || strlen($req['occupation']) == 0) {
    ?>
    <h1>Salah satu form belum terisi, silahkan coba lagi</h1>
    <a href="http://localhost/bukutamu_perpus/register.html">Klik disini untuk kembali ke form registrasi</a>
    <?php
    exit();
}

$member = new Member($connection);

$uid = uniqid("481",false);

$member->setId($uid);
$member->setName($req['name']);
$member->setAddress($req['address']);
$member->setBirthdate($req['birthdate']);
$member->setOccupation($req['occupation']);

if($member->store()){
    ?>
    <div style="text-align: center">
        <h1>Selamat <?php echo $member->getName() ?> Anda telah berhasil mendaftar sebagai member Index Librorum Prohibitorum</h1>
        <h3>Berikut adalah nomor identitas Anda sebagai member yang dapat digunakan untuk mengisi buku tamu dan meminjam buku</h3>
        <h3><em><b><?php echo $member->getId() ?></b></em></h3>

        <a href="http://localhost/bukutamu_perpus/">Klik disini untuk kembali ke halaman awal</a>
    </div>
    <?php
    exit();
}else{
    ?>
    <h1>Terjadi kesalahan, silahkan coba lagi</h1>
    <a href="http://localhost/bukutamu_perpus/register.html">Klik disini untuk kembali ke form registrasi</a>
    <?php
    exit();
}
