select
	wo_id,
	case
		when cl.cl_jsonb->>'cl_type' = 'natural' 
			then ((cl.cl_jsonb->>'cl_name') || ' ' || (cl.cl_jsonb->>'cl_firstsurname') || ' ' || coalesce(cl.cl_jsonb->>'cl_secondsurname',''))
		else cl_jsonb->>'cl_corporatename'
	end as cl_corporatename,
	wo_qty,
    wo_packageqty,
	pr.pr_jsonb->'pr_description' pr_description,
	pr.pr_jsonb->'pr_partno' pr_partno
from  wo, jsonb_to_record(wo_jsonb) as wo_jsonb (
	cl_id integer,
    pr_id integer,
    wo_packageqty integer,
	wo_qty integer
)
left join product pr
on wo_jsonb.pr_id = pr.pr_id
left join client cl
on wo_jsonb.cl_id = cl.cl_id
where wo_id = $1