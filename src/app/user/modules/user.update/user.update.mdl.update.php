<?php include "../../../../inc/settings.php"; ?>
<?php
$_POST = json_decode(file_get_contents('php://input'), true);
$pgsql = new PDODB(DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, $_SESSION['logged_userDatabase']);
$pgsql->beginTransaction();
$result = $pgsql
        ->prepare("update public.user
                    set us_jsonb = '".json_encode($_POST['us_jsonb'])."'
                    where us_id = '".$_POST['us_id']."';")
        ->execute()
        ->rowCount();
$pgsql->commit();
    echo $result;
$pgsql->disconnect();
?>