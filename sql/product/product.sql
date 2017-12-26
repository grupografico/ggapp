select
	pr.pr_id, 
    case
		when cl.cl_jsonb->>'cl_type' = 'natural' 
			then ((cl.cl_jsonb->>'cl_name') || ' ' || (cl.cl_jsonb->>'cl_firstsurname') || ' ' || coalesce(cl.cl_jsonb->>'cl_secondsurname',''))
		else cl.cl_jsonb->>'cl_corporatename'
	end as cl_corporatename,
    x.*,
	(
		select 
			max(wo_id)
		from wo
		where (wo_jsonb->>'pr_id')::integer = pr.pr_id
	) as wo_previousid,
	pr.pr_date
from  public.product pr, 
jsonb_to_record(pr_jsonb) as x (
    cl_id int,
    pr_partno text,
    pr_code text,
    pr_name text,
    pr_process text,
    pr_type text,
    pr_folio text,
    pr_status text
)
left join client cl
on x.cl_id = cl.cl_id
where x.cl_id = $1;