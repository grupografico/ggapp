module.exports = {
                    "title" : "Agregar producto",
                    "labels":{
                        "pr-id": "ID producto",
                        "cl-id": "ID cliente",
                        "pr-process": "Proceso",
                        "pr-type": "Tipo",
                        "pr-partno": "No. parte",
                        "pr-code": "Codigo",
                        "pr-weight": "Peso (kg)",
                        "pr-name": "Nombre",
                        "pr-description": "Descripcion",
                        "pr-finalsizewidth": "Ancho",
                        "pr-finalsizeheight": "Largo",
                        "pr-finalsizemeasure": "Medida",
                        "pr-surface": "Superficie",
                        "pr-othersurface": "Nombre Sup.",
                        "pr-time": "Tiempo (min)",
                        "pr-status": "Estatus",
                        "pr-date": "Fecha",
                    },
                    "columns":[
                        "pr_id",
                        "cl_id",
                        "pr_process",
                        "pr_type",
                        "pr_partno",
                        "pr_code",
                        "pr_weight",
                        "pr_description",
                        "pr_finalsizewidth",
                        "pr_finalsizeheight",
                        "pr_finalsizemeasure",
                        "pr_surface",
                        "pr_othersurface",
                        "pr_time",
                        "pr_status",
                        "pr_date",
                    ],
                     "fields" : {
                        pr_finalsizemeasureoptions : [
                            {"label":"cm","value":"cm"},
                            {"label":"pulgadas","value":"in"}
                        ],
                        pr_inkfrontoptions : [
                            {"label":"0 tintas","value":0},
                            {"label":"1 tinta","value":1},
                            {"label":"2 tintas","value":2},
                            {"label":"3 tintas","value":3}
                        ],
                        pr_materialsizemeasureoptions : [
                            {"label":"cm","value":"cm"},
                            {"label":"pulgadas","value":"in"}
                        ],
                        pr_surfaceoptions : [
                            {"label":"Plastico","value":"plastic"},
                            {"label":"Hule","value":"rubber"},
                            {"label":"Metal","value":"metal"},
                            {"label":"Madera","value":"wood"},
                            {"label":"Ceramica","value":"ceramic"},
                            {"label":"Piel","value":"skin"},
                            {"label":"Papel","value":"paper"},
                            {"label":"Carton","value":"paperboard"},
                            {"label":"Vidrio","value":"glass"},
                            {"label":"Otros","value":"other"}
                        ],
                        pr_statusoptions : [
                            {"label":"Activo","value":"A"},
                            {"label":"Inactivo","value":"I"}
                        ]
                     }
                }