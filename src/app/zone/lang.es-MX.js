module.exports = {
    "title": "direcciones de envio",
    "labels": {
        "zo-id": "id zona",
        "cl-id": "id cliente",
        "zo-type": "tipo",
        "zo-zone": "zona",
        "zo-corporatename": "razón social",
        "zo-rfc": "RFC",
        "zo-immex": "immex",
        "zo-name": "nombre",
        "zo-firstsurname": "1er apellido",
        "zo-secondsurname": "2do apellido",
        "zo-street": "calle",
        "zo-streetnumber": "num. ext.",
        "zo-suitenumber": "num. int.",
        "zo-neighborhood": "colonia",
        "zo-addressreference": "referencia",
        "zo-receiptschedule": "horario de recibos",
        "zo-country": "país",
        "zo-state": "estado",
        "zo-city": "ciudad",
        "zo-county": "municipio",
        "zo-zipcode": "codigo postal",
        "zo-email": "correo electrónico",
        "zo-phone": "teléfono",
        "zo-phoneextension": "Ext.",
        "zo-mobile": "móvil",
        "zo-status": "estatus",
        "zo-date": "Fec. de Creación",

    },
    "columns": [
        "zo_id",
        "cl_id",
        "zo_zone",
        "zo_corporatename",
        "zo_rfc",
        "zo_immex",
        "zo_name",
        "zo_firstsurname",
        "zo_secondsurname",
        "zo_street",
        "zo_streetnumber",
        "zo_suitenumber",
        "zo_neighborhood",
        "zo_addressreference",
        "zo_zipcode",
        "zo_email",
        "zo_phone",
        "zo_phoneextension",
        "zo_mobile",
        "zo_status",
        "zo_type",
        "zo_date",
    ],
    "fields": {
        zo_statusoptions: [
            { "label": "Activo", "value": "A" },
            { "label": "Inactivo", "value": "I" }
        ],
        zo_typeoptions: [
            { "label": "Fisica", "value": "natural" },
            { "label": "Moral", "value": "legal" }
        ]
    }
}