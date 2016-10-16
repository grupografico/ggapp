select 
    *
from  public.zone, 
jsonb_to_record(zo_jsonb) as x (
    zo_type text,
    cl_id text,
    zo_zone text,
    zo_corporatename text,
    zo_tin text,
    zo_immex text,
    zo_name text,
    zo_fatherslastname text,
    zo_motherslastname text,
    zo_street text,
    zo_streetnumber text,
    zo_suitenumber text,
    zo_neighborhood text,
    zo_addressreference text,
    zo_country text,
    zo_state text,
    zo_city text,
    zo_county text,
    zo_zipcode text,
    zo_email text,
    zo_phone text,
    zo_mobile text,
    zo_status text
)
where zo_jsonb->>'cl_id' = $1