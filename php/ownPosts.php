<?php
    session_start();
    if($_SESSION['idUser']!=0){
        $nPosts = $_POST['nPass'];
        if($nPosts==0) {
            $db = new PDO('mysql:host=localhost;dbname=coolblog', "homestead", "secret");

            $stmt = $db->prepare('SELECT * FROM posts WHERE name_user = ? ORDER BY date');
            $stmt->bindParam(1, unserialize($_COOKIE['nameUser']), PDO::PARAM_STR);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $max = count($result);
            $counter = 0;
            foreach ($result as $res) {
                if (!(sizeof($res['id']) == 0)) {
                    if (unserialize($_COOKIE['postOwnPass']) == 0 || unserialize($_COOKIE['postOwnPass']) == NULL) {
                        echo "<h2>" . $res['title'] . "</h2>";
                        $name = $res['name_user'];
                        echo "<h3>" . $name . " - " . $res['date'] . "</h3>";
                        echo "<p>" . $res['content'] . "</p>";

                        setcookie('postOwnPass', serialize("1"), time() + 604800);
                    }
                } else {
                    setcookie('postOwnPass', serialize("0"), time() + 604800);
                }
            }
        }
    }else{
        echo 2;
    }
?>
