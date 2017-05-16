<?php
    session_start();
    setcookie('idUser', serialize(""),time()+604800);
    setcookie('nameUser', serialize(""),time()+604800);
    setcookie('postPass', serialize("0"),time()+604800);
    setcookie('postOwnPass', serialize("0"),time()+604800);
    $_SESSION['idUser']="0";
    var_dump($_SESSION['idUser']);
    echo("<script>window.location = '../index.html';</script>");
?>z