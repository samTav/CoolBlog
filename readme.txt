Flow page:
  1. index.html--> Pagina que ens permet iniciar sessio i registrar un nou usuari, aquest accedirà a dos fitxers php, login.php i register.php, aquests es troben protegits mitjançant la variable de la sessió  i si les variables de post tenen un valor.
  2.index_blog.html--> Pagina singlepage, en que te diverses seccions en que en el moment en que es passi el ratolí per sobre de la secció es farà la corresponent petició a la base de dades. Aquest html accedirà als fitxers php i javascript:

    --> logout.php: Fitxer que sempre que s'executi redireccionarà a la pagina de login i registre i inicialitzara la varibale de sessió i les cookies que utilitzo per guardar el nom d'usuari.

    --> newPosts.php: Aquest només s'executrà en el cas que per ajax tinguis al post les variables amb el contingut del formulari.

    --> posts.php: només s'executara si l'usuari no ha passat per la secció corresponent als posts, cal destacar que es controla amb una variable que s'envia per ajax i es guarda al post, pero es gestiona amb javascript.

    --> ownPosts.php: Encarregat de carregar els posts generats per l'usuari i que només es realitzarà si l'usuari no ha passat mai sobre la secció corresponent.

    --> controlPhp.js: Fitxer javavscript que s'encarregarà de realitzar les peticions als fitxers corresponents a la pagina del blog i de gestionar les alertes generades per el php.

    --> welcome.js: Es l'encarregat de gestionar el login i registre dels usuris, cridant per ajax als fitxers php corresponent, controlant a l'hora els errors generats al php, cal destacar que també es aquet el fitxer encarregat de controlar els errors per part de l'usuari.