<?php

    session_start();
    if($_SESSION['idUser']==0) {

        $email ="";
        $date ="";
        $pass= "";
        $pass="";
        $confirm_pass="";
        $username="";
        if(isset($_POST['myData'])){
            $json = json_decode($_POST['myData']);
            $i = 0;

            foreach ($json as $key => $value) {
                if (!is_array($value)) {
                    switch ($i){
                        case 0:
                            $email = $value;
                            break;
                        case 1:
                            $pass = $value;
                            break;
                        case 2:
                            $date = $value;

                            break;
                        case 3:
                            $confirm_pass = $value;

                            break;
                        case 4:
                            $username = $value;
                    }
                    // echo $key . '=>' . $value . '<br />';
                    $i++;
                }
            }


                $db = new PDO('mysql:host=localhost;dbname=coolblog', "homestead", "secret");
                $stmt = $db->prepare('INSERT INTO user(email,pass,date,username) values(?,?,?,?)');
                $stmt->bindParam(1, $email, PDO::PARAM_STR);
                $stmt->bindParam(2, $pass, PDO::PARAM_STR);
                $stmt->bindParam(3, $date, PDO::PARAM_STR);
                $stmt->bindParam(4, $username, PDO::PARAM_STR);
                $stmt->execute();
                echo 1;

        } else {
            echo 0;
        }

    }else{

    echo 2;
    }
