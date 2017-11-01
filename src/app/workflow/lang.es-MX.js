module.exports = {
    "title": "Flujo de Trabajo",
    "labels": {
        "wo-id": "No. orden",
        "cl-id": "cliente",
        "cl-corporatename": "Razón social",
        "cl-firstsurname": "1er apellido",
        "cl-secondsurname": "2do apellido",
        "zo-id": "zona",
        "wo-orderedby": "Ordenado por",
        "wo-attention": "Atención",
        "ma-id": "Maquina",
        "wo-release": "Release",
        "wo-po": "Orden de compra",
        "wo-line": "Linea",
        "wo-linetotal": "De",
        "pr-id": "Producto",
        "wo-qty": "Cantidad",
        "wo-packageqty": "Cantidad x paquete",
        "wo-excedentqty": "Excedente",
        "wo-foliosperformat": "Folios x formato",
        "wo-foliosseries": "Serie",
        "wo-foliosfrom": "Del",
        "wo-foliosto": "Al",
        "wo-type": "Tipo",
        "wo-commitmentdate": "Fecha compromiso",
        "wo-previousid": "ID anterior",
        "wo-previousdate": "Fecha anterior",
        "wo-notes": "Notas",
        "wo-price": "Precio",
        "wo-currency": "Moneda",
        "wo-email": "Enviar Correo",
        "wo-status": "Estatus",
        "wo-date": "Fecha"
    },
    "columns": [
        "wo_id",
        "cl_id",
        "cl_corporatename",
        "cl_firstsurname",
        "cl_secondsurname",
        "zo_id",
        "wo_orderedby",
        "wo_attention",
        "ma_id",
        "wo_release",
        "wo_po",
        "wo_line",
        "wo_linetotal",
        "pr_id",
        "wo_qty",
        "wo_packageqty",
        "wo_excedentqty",
        "wo_foliosperformat",
        "wo_foliosseries",
        "wo_foliosfrom",
        "wo_foliosto",
        "wo_type",
        "wo_commitmentdate",
        "wo_previousid",
        "wo_previousdate",
        "wo_notes",
        "wo_price",
        "wo_currency",
        "wo_email",
        "wo_status",
        "wo_date"
    ],
    "fields": {
        wo_statusoptions: [
            { "label": "Activo", "value": 0, "desc": "Orden Activa", "us_group": "sales", "wo_prevstatus": [] },
            { "label": "En espera de material", "value": 1, "desc": "No hay material en el almacén", "us_group": "warehouse", "wo_prevstatus": [0, 4, 7, 14] },
            { "label": "Material disponible", "value": 2, "desc": "Hay material en el almacén pero aun no se ha iniciado el trabajo", "us_group": "warehouse", "wo_prevstatus": [0, 1, 7, 14] },
            { "label": "En producción", "value": 3, "desc": "En producción", "us_group": "production", "wo_prevstatus": [2, 4] },
            { "label": "Detenido", "value": 4, "desc": "La orden se detuvo en producción", "us_group": "production", "wo_prevstatus": [3] },
            { "label": "Terminado", "value": 5, "desc": "Terminado en producción", "us_group": "production", "wo_prevstatus": [3] },
            { "label": "Departamento de calidad", "value": 6, "desc": "Inspeccion de calidad en proceso", "us_group": "quality_assurance", "wo_prevstatus": [5] },
            { "label": "Rechazado por calidad", "value": 7, "desc": "Rechazado por calidad", "us_group": "quality_assurance", "wo_prevstatus": [6] },
            { "label": "Aprobado por calidad", "value": 8, "desc": "Aprobado por calidad", "us_group": "quality_assurance", "wo_prevstatus": [6] },
            { "label": "Empaque", "value": 9, "desc": "En proceso de empaque", "us_group": "packaging", "wo_prevstatus": [8] },
            { "label": "Listo para entrega", "value": 10, "desc": "Listo para embarque", "us_group": "packaging", "wo_prevstatus": [9] },
            { "label": "Facturado/Lista de Embarque", "value": 11, "desc": "Facturado", "us_group": "warehouse", "wo_prevstatus": [10] },
            { "label": "Enviado", "value": 12, "desc": "Los articulos fueron enviados", "us_group": "warehouse", "wo_prevstatus": [11] },
            { "label": "No se pudo entregar", "value": 13, "desc": "El producto no se pudo entregar", "us_group": "warehouse", "wo_prevstatus": [12] },
            { "label": "Rechazado por el cliente", "value": 14, "desc": "El producto fue rechazado por el cliente", "us_group": "warehouse", "wo_prevstatus": [12, 13] },
            { "label": "Entregado", "value": 15, "desc": "El producto se entrego al cliente con éxito", "us_group": "warehouse", "wo_prevstatus": [12, 13] },
            { "label": "Cancelada", "value": 16, "desc": "La orden de trabajo fue cancelada", "us_group": "admin", "wo_prevstatus": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }
        ]
    }
}