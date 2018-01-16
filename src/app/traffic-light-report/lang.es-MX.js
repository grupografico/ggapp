module.exports = {
    "title": "Reporte Semaforo",
    "labels": {
        "wo-id": "No. orden",
        "cl-id": "cliente",
        "cl-corporatename": "Razón social",
        "cl-name": "Nombre(s)",
        "cl-firstsurname": "1er apellido",
        "cl-secondsurname": "2do apellido",
        "cl-type": "Tipo de Cliente",
        "zo-id": "zona",
        "wo-orderedby": "Ordenado por",
        "wo-attention": "Atención",
        "ma-id": "Maquina",
        "wo-release": "Release",
        "wo-po": "Orden de compra",
        "wo-line": "Linea",
        "wo-linetotal": "De",
        "pr-id": "ID Producto",
        "pr-name": "Producto",
        "wo-qty": "Cantidad",
        "wo-packageqty": "Cantidad x paquete",
        "wo-excedentqty": "Excedente",
        "wo-foliosperformat": "Folios x formato",
        "wo-foliosseries": "Serie",
        "wo-foliosfrom": "Del",
        "wo-foliosto": "Al",
        "wo-type": "Tipo",
        "wo-commitmentdate": "Fecha compromiso",
        "wo-deliverydate": "Fecha de entrega",
        "wo-previousid": "ID anterior",
        "wo-previousdate": "Fecha anterior",
        "wo-notes": "Notas",
        "wo-price": "Precio",
        "wo-currency": "Moneda",
        "wo-email": "Enviar Correo",
        "wo-status": "Estatus del proceso",
        "wo-updatedby": "Actualizado por",
        "wo-updated": "Fecha de Actualización",
        "wo-createdby": "Creado por",
        "wo-date": "Fecha"
    },
    "columns": [
        { "binding": "wo_commitmentdate", "type": "Date" },
        { "binding": "wo_status", "type": "String" },    
        { "binding": "wo_id", "type": "Number" },
        { "binding": "cl_corporatename", "type": "String" },
        { "binding": "pr_id", "type": "Number" },
        { "binding": "pr_name", "type": "String" },
        { "binding": "wo_qty", "type": "Number" },
        { "binding": "wo_deliverydate", "type": "Date" },    
        { "binding": "cl_id", "type": "Number" },
        { "binding": "cl_name", "type": "String" },
        { "binding": "cl_firstsurname", "type": "String" },
        { "binding": "cl_secondsurname", "type": "String" },
        { "binding": "cl_type", "type": "String" },
        { "binding": "zo_id", "type": "Number" },
        { "binding": "wo_orderedby", "type": "String" },
        { "binding": "wo_attention", "type": "String" },
        { "binding": "ma_id", "type": "Number" },
        { "binding": "wo_release", "type": "String" },
        { "binding": "wo_po", "type": "String" },
        { "binding": "wo_line", "type": "Number" },
        { "binding": "wo_linetotal", "type": "Number" },   
        { "binding": "wo_packageqty", "type": "Number" },
        { "binding": "wo_excedentqty", "type": "Number" },
        { "binding": "wo_foliosperformat", "type": "Number" },
        { "binding": "wo_foliosseries", "type": "String" },
        { "binding": "wo_foliosfrom", "type": "Number" },
        { "binding": "wo_foliosto", "type": "Number" },
        { "binding": "wo_type", "type": "String" },
        { "binding": "wo_previousid", "type": "Number" },
        { "binding": "wo_previousdate", "type": "Date" },
        { "binding": "wo_notes", "type": "String" },
        { "binding": "wo_price", "type": "Number" },
        { "binding": "wo_currency", "type": "String" },
        { "binding": "wo_email", "type": "String" },
        { "binding": "wo_updatedby", "type": "String" },
        { "binding": "wo_updated", "type": "Date" },
        { "binding": "wo_createdby", "type": "String" },
        { "binding": "wo_date", "type": "Date" }
    ],
    "fields": require('../workflow/lang.es-MX').fields
}