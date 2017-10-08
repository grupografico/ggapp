select 
    *
from  public.material, 
jsonb_to_record(mt_jsonb) as x (
    su_id text,
    mt_code text,
    mt_type text,
    mt_description text,
    mt_weight text,
    mt_width text,
    mt_measure text,
    mt_height text,
    mt_status text
);