module.exports = {
    "title": "clientes",
    "labels": {
        "cl-id": "id cliente",
        "cl-corporatename": "razón social",
        "cl-rfc": "RFC",
        "cl-ssntin": "SSN/TIN",
        "cl-name": "nombre(s)",
        "cl-firstsurname": "1er apellido",
        "cl-secondsurname": "2do apellido",
        "cl-street": "calle",
        "cl-streetnumber": "num. ext.",
        "cl-suitenumber": "num. int",
        "cl-neighborhood": "colonia",
        "cl-addressreference": "referencia",
        "cl-receiptschedule": "Horario de recibos",
        "cl-country": "país",
        "cl-state": "estado",
        "cl-city": "ciudad/delegacion",
        "cl-county": "municipio/condado",
        "cl-zipcode": "codigo postal",
        "cl-email": "correo electrónico",
        "cl-phone": "teléfono",
        "cl-phoneextension": "Ext.",
        "cl-mobile": "móvil",
        "cl-creditlimit": "limite de crédito",
        "cl-creditdays": "días de crédito",
        "cl-customerdiscount": "descuento",
        "cl-status": "estatus",
        "cl-type": "Tipo de Cliente",
        "cl-date": "Fec. de Creación",
    },
    "columns": [
        "cl_id",
        "cl_corporatename",
        "cl_rfc",
        "cl_ssntin",
        "cl_name",
        "cl_firstsurname",
        "cl_secondsurname",
        "cl_street",
        "cl_streetnumber",
        "cl_suitenumber",
        "cl_neighborhood",
        "cl_addressreference",
        "cl_receiptschedule",
        "cl_zipcode",
        "cl_email",
        "cl_phone",
        "cl_phoneextension",
        "cl_mobile",
        "cl_creditlimit",
        "cl_customerdiscount",
        "cl_status",
        "cl_type",
        "cl_date",
    ],
    "fields": {
        cl_statusoptions: [
            { "label": "Activo", "value": "A" },
            { "label": "Inactivo", "value": "I" }
        ],
        cl_typeoptions: [
            { "label": "Fisica", "value": "natural" },
            { "label": "Moral", "value": "legal" }
        ]
    }
}