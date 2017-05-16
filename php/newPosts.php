<?php
    $title="";
    $content="";

    if(isset($_POST['title'])&isset($_POST['content'])){
        $title = $_POST['title'];
        $content = $_POST['content'];
        $nameUser = unserialize($_COOKIE['nameUser']);
        $db = new PDO('mysql:host=localhost;dbname=coolblog',"homestead","secret");

        $stmt = $db->prepare('SELECT * FROM posts WHERE title=?');
        $stmt->bindParam(1,$title,PDO::PARAM_STR);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if(sizeof($result['id'])== 0){
            $stmt = $db->prepare('INSERT INTO posts(title,content,date,name_user) values(?,?,?,?)');
            $stmt->bindParam(1,htmlentities($title),PDO::PARAM_STR);

            $stmt->bindParam(2,htmlentities($content),PDO::PARAM_STR);
            date_default_timezone_set('Europe/Spain');
            $date = date('Y/m/d H:i:s');
            $stmt->bindParam(3,$date,PDO::PARAM_STR);
            $stmt->bindParam(4,$nameUser,PDO::PARAM_STR);
            $stmt->execute();
            setcookie('postPass', serialize("0"),time()+604800);
            echo "<script>$('.input').val(\"\");</script>";
        }else{
            echo("<script>alert('Invalid title.')</script>");

        }
            echo("<script>window.location = '../index_blog.html';</script>");


    }
