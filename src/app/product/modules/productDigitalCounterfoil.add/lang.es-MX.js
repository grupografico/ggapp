module.exports = {
                    "title" : "Agregar producto",
                    "labels":{
                        "pr-id": "ID producto",
                        "cl-id": "ID cliente",
                        "pr-process": "Proceso",
                        "pr-type": "Tipo",
                        "pr-partno": "No. parte",
                        "pr-code": "Codigo",
                        "pr-language": "Lenguaje",
                        "pr-weight": "Peso (kg)",
                        "pr-name": "Nombre",
                        "pr-description": "Descripcion",
                        "pr-finalsizewidth": "Ancho",
                        "pr-finalsizeheight": "Largo",
                        "pr-finalsizemeasure": "Medida",
                        "pr-sheetsperset": "Hojas por juego",
                        "pr-inkfront": "Frente",
                        "pr-inkback": "Reverso",
                        "pa-id": "ID material",
                        "pr-materialsizewidth": "Ancho",
                        "pr-materialsizeheight": "Largo",
                        "pr-materialsizemeasure": "Medida",
                        "pr-materialformatsqty": "Formatos",
                        "pr-folio": "Folio",
                        "pr-precut": "Precorte",
                        "pr-reinforcement": "Refuerzo",
                        "pr-cord": "Cordón",
                        "pr-wire": "Alámbre",
                        "pr-drill": "Perforación",
                        "pr-blocks": "Blocks/Juegos",
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
                        "pr_language",
                        "pr_weight",
                        "pr_description",
                        "pr_finalsizewidth",
                        "pr_finalsizeheight",
                        "pr_finalsizemeasure",
                        "pr_sheetsperset",
                        "pr_inkfront",
                        "pr_inkback",
                        "mt_id",
                        "pr_materialsizewidth",
                        "pr_materialsizeheight",
                        "pr_materialsizemeasure",
                        "pr_materialformatsqty",
                        "pr_folio",
                        "pr_precut",                        
                        "pr_reinforcement",
                        "pr_cord",
                        "pr_wire",
                        "pr_drill",
                        "pr_blocks",
                        "pr_status",
                        "pr_date",
                    ],
                     "fields" : {
                        pr_languageoptions : [
                            {"label":"Español","value":"español"},
                            {"label":"Distintos al español","value":"distintos al español"}
                        ],
                        pr_finalsizemeasureoptions : [
                            {"label":"cm","value":"cm"},
                            {"label":"pulgadas","value":"in"}
                        ],
                        pr_sheetspersetoptions : [
                            {"label":"1","value":1},
                            {"label":"2","value":2},
                            {"label":"3","value":3},
                            {"label":"4","value":4},
                            {"label":"5","value":5}
                        ],
                        pr_inkfrontoptions : [
                            {"label":"0 tintas","value":0},
                            {"label":"1 tinta","value":1},
                            {"label":"2 tintas","value":2},
                            {"label":"3 tintas","value":3},
                            {"label":"4 tintas","value":4},
                            {"label":"5 tintas","value":5},
                            {"label":"6 tintas","value":6},
                            {"label":"7 tintas","value":7},
                            {"label":"8 tintas","value":8},
                        ],
                        pr_inkbackoptions : [
                            {"label":"0 tintas","value":0},
                            {"label":"1 tinta","value":1},
                            {"label":"2 tintas","value":2},
                            {"label":"3 tintas","value":3},
                            {"label":"4 tintas","value":4},
                            {"label":"5 tintas","value":5},
                            {"label":"6 tintas","value":6},
                            {"label":"7 tintas","value":7},
                            {"label":"8 tintas","value":8},
                        ],
                        pr_materialsizemeasureoptions : [
                            {"label":"cm","value":"cm"},
                            {"label":"pulgadas","value":"in"}
                        ],pr_foliooptions : [
                            {"label":"Si","value":"yes"},
                            {"label":"No","value":"no"}
                        ],pr_foldunitoptions : [
                            {"label":"0","value":0},
                            {"label":"1","value":1},
                            {"label":"2","value":2},
                            {"label":"3","value":3},
                            {"label":"4","value":4},
                            {"label":"5","value":5},
                            {"label":"6","value":6}
                        ],pr_precutoptions : [
                            {"label":"No","value":"no"},
                            {"label":"Horizontal","value":"horizontal"},
                            {"label":"Vertical","value":"vertical"},
                            {"label":"Ambas","value":"both"}
                        ],pr_reinforcementoptions : [
                            {"label":"No","value":"no"},
                            {"label":"Uno","value":"one"},
                            {"label":"Dos","value":"two"},
                        ],pr_cordoptions : [
                            {"label":"No","value":"no"},
                            {"label":"Colocado","value":"allocated"},
                            {"label":"Separado","value":"separated"},
                        ],pr_wireoptions : [
                            {"label":"No","value":"no"},
                            {"label":"Colocado","value":"allocated"},
                            {"label":"Separado","value":"separated"},
                        ],pr_drilloptions : [
                            {"label":"1","value":1},
                            {"label":"2","value":2},
                            {"label":"3","value":3},
                            {"label":"4","value":4},
                            {"label":"5","value":5}
                        ],pr_blocksoptions : [
                            {"label":"No","value":"no"},
                            {"label":"block de 20","value":20},
                            {"label":"block de 25","value":25},
                            {"label":"block de 50","value":50},
                            {"label":"block de 75","value":75},
                            {"label":"block de 100","value":100},
                            {"label":"En juegos","value":"sets"},
                        ],
                        pr_statusoptions : [
                            {"label":"Activo","value":"A"},
                            {"label":"Inactivo","value":"I"}
                        ]
                     }
                }