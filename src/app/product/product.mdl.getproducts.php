<?php include "../../inc/settings.php"; ?>
<?php
$_POST = json_decode(file_get_contents('php://input'), true);
$pgsql = new PDODB(DB_TYPE, DB_HOST, DB_PORT, DB_USER, DB_PASS, 'ggapp'/*$_SESSION['logged_userDatabase']*/);
$pgsql->beginTransaction();
$result = $pgsql
        ->prepare("select 
                        *
                    from  public.product, 
                    jsonb_to_record(pr_jsonb, true) as x (
                        cl_id text,
                        pr_partno text,
                        pr_process text,
                        pr_type text,
                        pr_status text
                    )
                    where pr_jsonb->>'cl_id' = '".$_POST['cl_id']."';")
        ->execute()
        ->fetchAll();
$pgsql->commit();
    echo json_encode($result);
$pgsql->disconnect();
?>