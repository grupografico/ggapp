<?php 
    if (!isset($_SESSION)) {
      session_start();
    }
    header("Content-Type: application/json");
	define("LOG_DIR","./log");
	define("LOG_FILE","log.txt");
	define("DB_TYPE","pgsql");
	define("DB_HOST","localhost");
	define("DB_PORT","5432");
	define("DB_USER","Alejandro");
	define("DB_PASS","a186419.ASB");
	include "../../../../../inc/log.class.php";
	include "../../../../../inc/pdodb.class.php";
?>
<?php
$_POST = json_decode(file_get_contents('php://input'), true);
$pgsql = new PDODB(DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, $_SESSION['logged_userDatabase']);
$pgsql->beginTransaction();
$result = $pgsql
        ->prepare("insert into public.user
                    (us_jsonb)
                    values ('".json_encode($_POST['us_jsonb'])."');")
        ->execute()
        ->rowCount();
$pgsql->commit();
    echo $result;
$pgsql->disconnect();
?>