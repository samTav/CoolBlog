<?php
$nPosts = $_POST['num'];
   if($nPosts==0){
       $db = new PDO('mysql:host=localhost;dbname=coolblog', "homestead", "secret");

       $stmt = $db->prepare('SELECT * FROM posts ORDER BY date DESC LIMIT 10');
       $stmt->bindParam(1,$nPosts,PDO::PARAM_STR);
       $stmt->execute();
       $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
       $max = count($result);
       $counter = 0;
       foreach ($result as $res) {
           if (!(sizeof($res['id']) == 0)) {
               echo "<h2>" . $res['title'] . "</h2>";
               $name = $res['name_user'];
               echo "<h3>" . $name . " - " . $res['date'] . "</h3>";
               echo "<p>" . $res['content'] . "</p>";
               setcookie('lastDate', serialize("{$res['date']}"), time() + 604800);
           }
       }
   }
?>
