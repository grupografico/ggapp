update wo
set wo_jsonb = wo_jsonb || jsonb_build_object('wo_exportationinvoice', true)
where wo_id = any(string_to_array($1,',')::integer[]);