<?php
    session_start();
    $email="";
    $pass="";
    if($_SESSION['idUser']==0){
        if(isset($_POST['email'])&isset($_POST['pass'])){
            $email = $_POST['email'];
            $pass = $_POST['pass'];
            $db = new PDO('mysql:host=localhost;dbname=coolblog',"homestead","secret");

            if (filter_var($email,FILTER_VALIDATE_EMAIL)) {

                $stmt = $db->prepare('SELECT * FROM user WHERE email=? AND pass=?');
                $stmt->bindParam(1,$email,PDO::PARAM_STR);
                $stmt->bindParam(2,$pass,PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if(sizeof($result['id'])== 0){
                    $_SESSION['idUser']=0;
                    echo 0;

                }else{
                    $info=$result['id'];
                    setcookie('idUser', serialize($info),time()+3600);
                    $_SESSION['idUser']=$info;
                    setcookie('postPass', serialize("0"),time()+3600);
                    setcookie('postOwnPass', serialize("0"),time()+3600);
                    setcookie('nameUser', serialize($result['username']),time()+3600);
                    echo 1;
                }

            }else{

                $stmt = $db->prepare('SELECT * FROM user WHERE username=? AND pass=?');
                $stmt->bindParam(1,$email,PDO::PARAM_STR);
                $stmt->bindParam(2,$pass,PDO::PARAM_STR);
                $stmt->execute();
                $result = $stmt->fetch(PDO::FETCH_ASSOC);
                if(sizeof($result['id'])== 0){
                    $_SESSION['idUser']=0;
                    echo 0;
                }else{
                    $info=$result['id'];
                    setcookie('idUser', serialize($info),time()+3600);
                    $_SESSION['idUser']=$info;
                    setcookie('nameUser', serialize($result['username']),time()+3600);
                    setcookie('postPass', serialize("0"),time()+3600);
                    setcookie('postOwnPass', serialize("0"),time()+3600);

                    echo 1;
                }
            }
        }
    }else{
       echo 2;
    }
