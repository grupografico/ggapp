<?php include "../../../../inc/settings.php"; ?>
<?php
$_POST = json_decode(file_get_contents('php://input'), true);
$pgsql = new PDODB(DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, $_SESSION['logged_userDatabase']);
$pgsql->beginTransaction();
$result = $pgsql
        ->prepare("insert into public.ink
                    (in_jsonb)
                    values ('".json_encode($_POST['in_jsonb'])."');")
        ->execute()
        ->rowCount();
$pgsql->commit();
    echo $result;
$pgsql->disconnect();
?>