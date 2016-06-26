select
    *
from  public.ink, 
jsonb_to_record(in_jsonb, true) as x (
    in_code text
)
where in_jsonb->>'in_status'='A';