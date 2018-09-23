select
	pjb.pr_process,
	COALESCE(sum(
		case when ((wo.wo_jsonb ? 'wo_deliverydate') = true) 
		then 1 else 0 end
	),0) as delivered,
	((count(wo_deliverydate)::numeric * 100) / count(pjb.pr_process)::numeric)::decimal(5,2) as percentage,
	COALESCE(sum(
		case when ((wo.wo_jsonb ? 'wo_deliverydate') = false) 
		then 1 else 0 end
	),0) as notdelivered,
	COALESCE(sum(
		case when ((wo.wo_jsonb ? 'wo_deliverydate') = true) 
			then case when (wo_deliverydate > wo_commitmentdate) 
				then 1 else 0 end
			else 0 end
	),0) as latedelivered,
	(((COALESCE(sum(
		case when ((wo.wo_jsonb ? 'wo_deliverydate') = true) 
			then case when (wo_deliverydate > wo_commitmentdate) 
				then 1 else 0 end
			else 0 end
	),0))::numeric * 100) / count(pjb.pr_process)::numeric)::decimal(5,2) as latepercentage,
	count(pjb.pr_process) as total
from wo wo,
jsonb_to_record(wo_jsonb) as wjb (
	pr_id int,
	wo_status text,
	wo_commitmentdate date,
	wo_deliverydate date
)
join product pr
on wjb.pr_id = pr.pr_id,
jsonb_to_record(pr_jsonb) as pjb (
	pr_process text
)
where wjb.wo_commitmentdate between $1 and $2
group by pjb.pr_process