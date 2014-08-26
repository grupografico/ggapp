(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.element(document).ready(function(){
    //ALEJANDRO
    'use strict';
    
    var app = angular.module('app', [
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'gg-fields',
        require('./auth').name,
        require('./client').name,
        require('./user').name,
        require('./home').name,
        require('./wo').name
    ]);
    
    app.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {
        // when there is an empty route, redirect to /index   
        $urlRouterProvider.when('', '/auth');
        // when root, redirect to /home  
        $urlRouterProvider.when('/', '/auth');
    }]);
    
    app.run(function ($rootScope, AUTH_EVENTS, credentialsFac, $location) {
        credentialsFac.credentials().then(function(promise){
            if(promise.data.success) {
                $rootScope.user = promise.data;
            }
            console.log(JSON.stringify(promise.data));
        }).then(function(){
            $rootScope.$on('$stateChangeStart', function (event, next) {
                var authorizedRoles = next.data.authorizedRoles;
                if (authorizedRoles.indexOf($rootScope.user.userRole) == -1) {
                    event.preventDefault();
                    if (!!$rootScope.user.user) {
                        console.log('user is not allowed');
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                        $location.path('/auth');
                    } else {
                        console.log('user is not logged in');
                        $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                        $location.path('/auth');
                    }
                }
            });
        });
    });
    
    app.filter('i18n',require('./app/filters/i18n.filter'));
    
    app.factory('langFac',require('./app/services/lang.fac'));
    
    app.factory('logoutFac',require('./app/services/logout.fac'));
    
    app.factory('credentialsFac',require('./app/services/user.credentials.fac'));
    
    app.controller('appCtrl',require('./app/controllers/app.ctrl'));
    
    angular.bootstrap(document, ['app']);
    
});
},{"./app/controllers/app.ctrl":2,"./app/filters/i18n.filter":3,"./app/services/lang.fac":6,"./app/services/logout.fac":7,"./app/services/user.credentials.fac":8,"./auth":10,"./client":13,"./home":22,"./user":25,"./wo":34}],2:[function(require,module,exports){
'use strict';

module.exports = function ($scope,$rootScope,langFac,logoutFac,i18nFilter,USER_ROLES,$location) {
    
    langFac.getLang().then(function(promise){
        if(promise.data.success) {
            $rootScope.currentLanguage = promise.data.lang;
            $scope.navItems = i18nFilter("GENERAL.NAV");
        }
        console.log(JSON.stringify(promise.data.lang));
    });
    
    for(var item in $scope.navItems) {
        if ($scope.navItems[item].subMenu) {
            $scope.lastSubmenu = item;   
        }
    }
    
    $scope.lang = function (lang) {
        langFac.setLang(lang).then(function(promise){
            if(promise.data.success) {
                $rootScope.currentLanguage = promise.data.lang;
                $scope.navItems = i18nFilter("GENERAL.NAV");
            }
            console.log(JSON.stringify(promise.data.lang));
        });
    }
    $scope.logout = function() {
        logoutFac.logout().then(function(promise){
            if(promise.data.success) {
                $rootScope.user = {
                    user:null,
                    userRole:USER_ROLES.guest,
                    userName:null,
                    userFathersLastName:null,
                    userMothersLastName:null, 
                    userDatabase:null
                }
                $location.path("/auth");
            }
        });
    }
};
},{}],3:[function(require,module,exports){
'use strict';

module.exports = ['$rootScope', function($rootScope) {
return function (input,param) {
        var translations = {
            "es-MX" : require('../languages/es-MX'),
            "en-US" : require('../languages/en-US')
        };
        var currentLanguage = $rootScope.currentLanguage || 'es-MX',
        keys = input.split('.'),
        data = translations[currentLanguage],
        value = undefined;
        try {
            for(var key in keys) {
              data = data[keys[key]];
            }
            if (!!data) {
                return (typeof param === "undefined") ? data : data.replace('@@', param);
            } else {
                return input;
            } 
        }
        catch (e) {
            console.log(e.description);
            return input;
        }
            
    }
}];
},{"../languages/en-US":4,"../languages/es-MX":5}],4:[function(require,module,exports){
module.exports = {
                "GENERAL":{
                    "NAV":[
                        {"name":"Home","url":"#/home"},
                        {"name":"Clientes","url":"#/client","subMenu": 
                         [
                             {"name": "Agregar","url": "#/client/add"}
                         ]
                        },
                        {"name":"Products","url":"#/product","subMenu": 
                         [
                             {"name": "Add","url": "#/product/add"}
                         ]
                        },
                        {"name":"Work Orders","url":"#/wo","subMenu": 
                         [
                             {"name": "Add","url": "#/product/add"}
                         ]
                        },
                        {"name":"Users","url":"#/user","subMenu": 
                         [
                             {"name": "Add","url": "#/user/add"}
                         ]
                        },
                        {"name":"Login","url":"#/"},
                        {"name":"Reports","url":"#/reports","subMenu": 
                         [
                            {"name": "sub1","url": "../login"},
                            {"name": "sub2","url": "../login"},
                            {"name": "sub3","url": "../login"}
                         ]
                        }
                    ],
                    "BUTTONS":{
                        "EDIT":"Edit",
                        "DUPLICATE":"Duplicate",
                    },
                    "SUBMIT":"Submit",
                    "COPYRIGHT":"©2014 Grupo Grafico de México S.A. de C.V. All rights reserved."
                },
                "HOME":{
                    "TITLE" : "Home",
                    "WELCOME" : "Welcome @@!"
                },
                "CLIENT":{
                    "TITLE" : "Clientes",
                    "FIELDS":{
                        "CL_ID":"Client ID",
                        "CL_CORPORATENAME":"Corporate Name",
                        "CL_TIN":"TIN",
                        "CL_NAME":"Name",
                        "CL_FATHERSLASTNAME":"Fathers Lastname",
                        "CL_MOTHERSLASTNAME":"Mothers Lastname",
                        "CL_STREET":"Street",
                        "CL_STREETNUMBER":"Street Number",
                        "CL_SUITENUMBER":"Suite Number",
                        "CL_NEIGHBORHOOD":"Neighborhood",
                        "CL_ADDRESSREFERENCE":"Address Reference",
                        "CL_COUNTRY":"Country",
                        "CL_STATE":"State",
                        "CL_CITY":"City",
                        "CL_COUNTY":"County",
                        "CL_ZIPCODE":"Zip Code",
                        "CL_EMAIL":"E-mail",
                        "CL_PHONE":"Phone",
                        "CL_MOBILE":"Mobile",
                        "CL_CREDITLIMIT":"Credit Limit",
                        "CL_CUSTOMERDISCOUNT":"Discount",
                        "CL_STATUS":"Status",
                    }
                },
                "CLIENT_ADD":{
                    "TITLE" : "Add Client",
                },
                "CLIENT_UPDATE":{
                    "TITLE" : "Update Client",
                },
                "USER":{
                    "TITLE" : "Users",
                    "FIELDS":{
                        "US_ID": "User ID",
                        "GR_ID": "Group ID",
                        "US_USER": "User",
                        "US_PASSWORD": "Password",
                        "US_NAME": "Name",
                        "US_FATHERSLASTNAME": "Fathers Lastname",
                        "US_MOTHERSLASTNAME": "Mothers Lastname",
                        "US_EMAIL": "E-mail",
                        "US_PHONE": "Phone",
                        "US_MOBILE": "Mobile",
                        "US_STATUS": "Status",
                        "US_DATE": "Date"
                    }
                },
                "USER_ADD":{
                    "TITLE" : "Add User",
                },
                "USER_UPDATE":{
                    "TITLE" : "Update User",
                },
                "WO":{
                    "TITLE" : "Work Orders",
                    "FIELDS":{
                        "WO_ID" : "Order No.",
                        "WO_DATE" : "Date",
                        "CL_ID" : "Client ID",
                        "ZO_ID" : "Zone ID",
                        "WO_ORDEREDBY" : "Ordered By",
                        "WO_ATTENTION" : "Attention",
                        "WO_RFQ" : "RFQ",
                        "WO_PROCESS" : "Process",
                        "WO_RELEASE" : "Release",
                        "WO_PO" : "Purchase Order",
                        "WO_LINE" : "Line",
                        "WO_LINETOTAL" : "Total Lines",
                        "PRSE_ID" : "Product ID",
                        "WO_STATUS" : "Status",
                        "WO_COMMITMENTDATE" : "Commitment Date",
                        "WO_PREVIOUSID" : "Previous ID",
                        "WO_PREVIOUSDATE" : "Previous Date",
                        "SH_ID" : "Shipment ID",
                        "SH_DATE" : "Shipment Date",
                        "WO_TRACKINGNO" : "Tracking No.",
                        "WO_SHIPPINGDATE" : "Shipping Date",
                        "WO_DELIVERYDATE" : "Delivery Date",
                        "WO_INVOICENO" : "Invoice No.",
                        "WO_INVOICEDATE" : "Invoice Date",
                        "WO_NOTES" : "Notes"
                    }
                },
                "WO_ADD":{
                    "TITLE" : "Add Work Order",
                },
                "WO_UPDATE":{
                    "TITLE" : "Update Work Order",
                },
                "AUTH":{
                    "TITLE" : "Login",
                    "ENTERPRISE" : "Enterprise",
                    "USER" : "User",
                    "PASSWORD" : "Password",
                }
            }
},{}],5:[function(require,module,exports){
module.exports = {
                "GENERAL":{ 
                    "NAV":[
                        {"name":"Inicio","url":"#/home"},
                        {"name":"Clientes","url":"#/client","subMenu": 
                         [
                             {"name": "Agregar","url": "#/client/add"}
                         ]
                        },
                        {"name":"Productos","url":"#/product","subMenu": 
                         [
                             {"name": "Agregar","url": "#/product/add"}
                         ]
                        },
                        {"name":"Ordenes de trabajo","url":"#/wo","subMenu": 
                         [
                             {"name": "Agregar","url": "#/wo/add"}
                         ]
                        },
                        {"name":"Usuarios","url":"#/user","subMenu": 
                         [
                             {"name": "Agregar","url": "#/user/add"}
                         ]
                        },
                        {"name":"Login","url":"#/"},
                        {"name":"Reportes","url":"#/reports","subMenu": 
                         [
                             {"name": "sub1","url": "../login"},
                             {"name": "sub2","url": "../login"},
                             {"name": "sub3","url": "../login"}
                         ]
                        }
                    ],
                    "BUTTONS":{
                        "EDIT":"Editar",
                        "DUPLICATE":"Duplicar",
                    },
                    "REGEXP":{
                        "SINGLESPACES": "Sin espacios dobles ni caracteres especiales.",
                        "RFC": "XXXX-######[-XXX]",
                        "EMAIL": "Por favor introduzca un email valido.",
                        "DECIMAL2": "Solo numeros enteros o con 2 decimales.",
                        "DISCOUNT": "El formato valido para el descuento es 0[.00]",
                        "INTEGER": "Solo numeros enteros",
                        "ZIPCODE": "El codigo postal es de 5 numeros.",
                        "DATE": "AAAA-MM-DD",
                        "USER": "De 4 a 16 caracteres sin espacios ni caracteres especiales.",
                        "PASSWORD": "la contraseña debe contener de 8-16 caracteres, por lo menos una letra mayuscula, una letra minuscula y un digito.",
                        "PHONE": "Los numeros de tel. solo aceptan los caracteres + - ( ) y numeros del 0-9"
                    },
                    "SUBMIT":"Enviar",
                    "COPYRIGHT":"©2014 Grupo Grafico de México S.A. de C.V. Todos los derechos reservados."
                },
                "HOME":{
                    "TITLE" : "Inicio",
                    "WELCOME" : "Bienvenido @@!"
                },
                 "CLIENT":{
                    "TITLE" : "Clientes",
                    "FIELDS":{
                        "CL_ID":"ID Cliente",
                        "CL_CORPORATENAME":"Razón Social",
                        "CL_TIN":"RFC",
                        "CL_NAME":"Nombre",
                        "CL_FATHERSLASTNAME":"Apellido Paterno",
                        "CL_MOTHERSLASTNAME":"Apellido Materno",
                        "CL_STREET":"Calle",
                        "CL_STREETNUMBER":"Numero Exterior",
                        "CL_SUITENUMBER":"Numero Interior",
                        "CL_NEIGHBORHOOD":"Colonia",
                        "CL_ADDRESSREFERENCE":"Referencia",
                        "CL_COUNTRY":"País",
                        "CL_STATE":"Estado",
                        "CL_CITY":"Ciudad",
                        "CL_COUNTY":"Municipio",
                        "CL_ZIPCODE":"Codigo Postal",
                        "CL_EMAIL":"Correo Electrónico",
                        "CL_PHONE":"Teléfono",
                        "CL_MOBILE":"Móvil",
                        "CL_CREDITLIMIT":"Limite de credito",
                        "CL_CUSTOMERDISCOUNT":"Descuento",
                        "CL_STATUS":"Estatus",
                    }
                },
                "CLIENT_ADD":{
                    "TITLE" : "Agregar Cliente",
                },
                "CLIENT_UPDATE":{
                    "TITLE" : "Actualizar Cliente",
                },
                "USER":{
                    "TITLE" : "Usuarios",
                    "FIELDS":{
                        "US_ID": "ID Usuario",
                        "GR_ID": "ID Grupo",
                        "US_USER": "Usuario",
                        "US_PASSWORD": "Contraseña",
                        "US_NAME": "Nombre",
                        "US_FATHERSLASTNAME": "Apellido Paterno",
                        "US_MOTHERSLASTNAME": "Apellido Materno",
                        "US_EMAIL": "Correo Electrónico",
                        "US_PHONE": "Teléfono",
                        "US_MOBILE": "Móvil",
                        "US_STATUS": "Estatus",
                        "US_DATE": "Fecha"
                    }
                },
                "USER_ADD":{
                    "TITLE" : "Agregar Usuario",
                },
                "USER_UPDATE":{
                    "TITLE" : "Actualizar Usuario",
                },
                "WO":{
                    "TITLE" : "Ordenes de Trabajo",
                    "FIELDS":{
                        "WO_ID" : "No. Orden",
                        "WO_DATE" : "Fecha",
                        "CL_ID" : "ID Cliente",
                        "ZO_ID" : "ID Zona",
                        "WO_ORDEREDBY" : "Ordenado Por",
                        "WO_ATTENTION" : "Atención",
                        "WO_RFQ" : "No. Cotizacion",
                        "WO_PROCESS" : "Proceso",
                        "WO_RELEASE" : "Release",
                        "WO_PO" : "Orden de Compra",
                        "WO_LINE" : "Linea",
                        "WO_LINETOTAL" : "Total Lineas",
                        "PRSE_ID" : "ID Producto",
                        "WO_STATUS" : "Estatus",
                        "WO_COMMITMENTDATE" : "Fecha Compromiso",
                        "WO_PREVIOUSID" : "ID Anterior",
                        "WO_PREVIOUSDATE" : "Fecha Anterior",
                        "SH_ID" : "ID Embarque",
                        "SH_DATE" : "Fecha Embarque",
                        "WO_TRACKINGNO" : "No. Guia",
                        "WO_SHIPPINGDATE" : "Fecha Envio",
                        "WO_DELIVERYDATE" : "Fecha Entrega",
                        "WO_INVOICENO" : "No. Factura",
                        "WO_INVOICEDATE" : "Fecha Factura",
                        "WO_NOTES" : "Notas"
                    }
                },
                "WO_ADD":{
                    "TITLE" : "Agregar Orden de Trabajo",
                },
                "WO_UPDATE":{
                    "TITLE" : "Actualizar Orden de Trabajo",
                },
                "AUTH":{
                    "TITLE" : "Iniciar sesión",
                    "ENTERPRISE" : "Empresa",
                    "USER" : "Usuario",
                    "PASSWORD" : "Contraseña",
                }
                
            }
},{}],6:[function(require,module,exports){
'use strict';

module.exports = function($http, $q) {
    var factory = {};
    factory.setLang = function(newLang) {
        var deferred = $q.defer();
        deferred.resolve(
            $http.post('modules/app/models/lang.set.model.php', {
                lang: newLang
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            })
        );
        return deferred.promise;
    };
    factory.getLang = function() {
        var deferred = $q.defer();
        deferred.resolve(
            $http.get('modules/app/models/lang.get.model.php')
            .success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            })
        );
        return deferred.promise;
    };
    return factory;
};
},{}],7:[function(require,module,exports){
module.exports = function($http, $q){
    var factory = {};
    factory.logout = function() {
        var deferred = $q.defer();
        deferred.resolve(
            $http.post('modules/app/models/logout.model.php', {
                    /* POST variables here */
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            })
        );
        return deferred.promise;
    };
    return factory;
};
},{}],8:[function(require,module,exports){
module.exports = function($http, $q){
    var factory = {};
    factory.credentials = function() {
        var deferred = $q.defer();
        deferred.resolve(
            $http.post('modules/app/models/user.credentials.model.php', {
                    /* POST variables here */
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            })
        );
        return deferred.promise;
    };
    return factory;
};
},{}],9:[function(require,module,exports){
'use strict';

module.exports = function ($rootScope, $scope, authFac, $location, AUTH_EVENTS) {
    $scope.login_databases = [
        {"label":"Grupo Grafico","value":"ggapp"},
        {"label":"Print Source","value":"printsource"}
    ];
    
    $scope.user = {
        us_database: $scope.login_databases[0] // Grupo Grafico
    };
    
    $scope.onSubmit = function(user) {
        authFac.login({
            us_database: user.us_database.value,
            us_user: user.us_user,
            us_password: user.us_password
        }).then(function(promise){
            if(promise.data.success) {
                $rootScope.user = promise.data;
                $location.path("/home");
            }
            console.log(JSON.stringify($rootScope.user));
        });
    }
    $scope.$on(AUTH_EVENTS.notAuthenticated, function () {
        $scope.notAuthenticated = true;
    });
    $scope.$on(AUTH_EVENTS.notAuthorized, function () {
        $scope.notAuthorized = true;
    });
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
     });
    
    $scope.us_passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/;
};
},{}],10:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.auth',[]);

ngModule.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

ngModule.constant('USER_ROLES', {
    admin: 1, 
    editor: 2, 
    guest: 3,
    all: 4,
});

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('auth', {
        url:'/auth',
        templateUrl : 'modules/auth/views/auth.view.html',
        controller : 'authCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor, USER_ROLES.guest]
        }    
    });
}]);

ngModule.factory('authFac',require('./services/auth.fac'));

ngModule.controller('authCtrl',require('./controllers/auth.ctrl'));

module.exports = ngModule;
},{"./controllers/auth.ctrl":9,"./services/auth.fac":11}],11:[function(require,module,exports){
'use strict';

module.exports = function($http){
    var factory = {};
    factory.login = function(user) {
        var promise = $http.post('modules/auth/models/auth.login.model.php', {
            /* POST variables here */
            us_database: user.us_database,
            us_user: user.us_user,
            us_password: user.us_password
        }).success(function(data, status, headers, config){
            return data;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });
        return promise;
    }
    factory.logout = function(user) {
        var promise = $http.post('modules/auth/models/authLogoutModel.php', {
                /* POST variables here */
                us_database: user.us_database,
                us_user: user.us_user,
                us_password: user.us_password
        }).success(function(data, status, headers, config){
            return data;
        }).error(function (data, status, headers, config) {
            return {"status": false};
        });
        return promise;
    };
    return factory;
};
},{}],12:[function(require,module,exports){
'use strict';

module.exports = function ($scope, clientFac, $window, i18nFilter, $parse) {
    
    $scope.fields = Object.keys(i18nFilter("CLIENT.FIELDS"));
    
    $scope.showEdit = true;
    $scope.showDuplicate = false;
    
    $scope.edit = function (id) {
        if (angular.isNumber(id)) {
                //Embed the id to the link
                var link = "#/client/update/" + id;
                //Open the link
                window.location = link;
        }
    }
    
    $scope.duplicate = function (id) {
        if (angular.isNumber(id)) {
                var link = "#/client/duplicate/" + id;
                //Open the link
                window.location = link;
        }
    }
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        $scope.loading = true;
        clientFac.data().then(function(promise){
            $scope.loading = false;
            if(angular.isArray(promise.data)) {
                $scope.data = promise.data;
            }
            console.log(angular.fromJson(promise.data));
        });
     });
};
},{}],13:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.client',[
    require('./modules/client.add').name,
    require('./modules/client.update').name
]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('client', {
        url:'/client',
        templateUrl : 'modules/client/views/client.view.html',
        controller : 'clientCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('clientFac',require('./services/client.fac'));

ngModule.controller('clientCtrl',require('./controllers/client.ctrl'));

module.exports = ngModule;
},{"./controllers/client.ctrl":12,"./modules/client.add":15,"./modules/client.update":18,"./services/client.fac":20}],14:[function(require,module,exports){
'use strict';

module.exports = function ($scope, clientAddFac, $window, $location, i18nFilter, $interval) {
    
    $scope.fields = Object.keys(i18nFilter("CLIENT.FIELDS"));
                
    $scope.onSubmit = function() {
    
        clientAddFac.add($scope.fmData).then(function(promise){
            if(promise.data == "1") {
                $location.path('/client');
            } else {
                $scope.updateFail = true;
            }
            //console.log(JSON.stringify(promise.data));
        });
        //console.log('form submitted:', $scope.formData);
    };
    
    $scope.getStates = function() {
        $scope.cl_stateoptions = [];
        $scope.cl_cityoptions = [];
        $scope.cl_countyoptions = [];
        $interval(function(){
            clientAddFac.getStates($scope.fmData.cl_country).then(function(promise){
                if(angular.isArray(promise.data.geonames)) {
                    $scope.cl_stateoptions = promise.data.geonames;
                } else {
                    //$scope.updateFail = true;
                }
                //console.log(JSON.stringify(promise.data));
            });
        },0,1);
    }
    
    $scope.getCityCounty = function() {
        $scope.cl_cityoptions = [];
        $scope.cl_countyoptions = [];
        $interval(function(){
            clientAddFac.getStates($scope.fmData.cl_state).then(function(promise){
                if(angular.isArray(promise.data.geonames)) {
                    $scope.cl_cityoptions = promise.data.geonames;
                    $scope.cl_countyoptions = promise.data.geonames;
                } else {
                    //$scope.updateFail = true;
                }
                //console.log(JSON.stringify(promise.data));
            });
        },0,1);
    }
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        
        clientAddFac.getCountries().then(function(promise){
            if(angular.isArray(promise.data.geonames)) {
                $scope.cl_countryoptions = promise.data.geonames;
            } else {
                //$scope.updateFail = true;
            }
            console.log(JSON.stringify(promise.data.geonames));
        });

        $scope.cl_statusoptions = [
            {"label":"Activo","value":"A"},
            {"label":"Inactivo","value":"I"}
        ]
        
     });
};
},{}],15:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.client.add',[]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('clientAdd', {
        url:'/client/add',
        templateUrl : 'modules/client/modules/client.add/views/client.add.view.html',
        controller : 'clientAddCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('clientAddFac',require('./services/client.add.fac'));

ngModule.controller('clientAddCtrl',require('./controllers/client.add.ctrl'));

module.exports = ngModule;
},{"./controllers/client.add.ctrl":14,"./services/client.add.fac":16}],16:[function(require,module,exports){
'use strict';

module.exports = function($http, $stateParams, $interval){
        var factory = {};
        factory.add = function(cl_jsonb) {
            var promise = $http.post('modules/client/modules/client.add/models/client.add.model.php', {
                    /* POST variables here */
                    cl_jsonb: cl_jsonb
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        factory.getCountries = function() {
            var promise = $http.get('http://api.geonames.org/countryInfoJSON?username=alejandrolsca')
            .success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        factory.getStates = function(cl_country) {
            var promise = $http.get('http://api.geonames.org/childrenJSON?geonameId='+cl_country+'&username=alejandrolsca')
            .success(function(data, status, headers, config){
                return data;
            }).error(function(data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        factory.getCityCounty = function(cl_state) {
            var promise = $http.get('http://api.geonames.org/childrenJSON?geonameId='+cl_state+'&username=alejandrolsca')
            .success(function(data, status, headers, config){
                return data;
            }).error(function(data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        return factory;
    };
},{}],17:[function(require,module,exports){
'use strict';

module.exports = function ($scope, clientUpdateFac, $window, $location, i18nFilter) {
        
    $scope.onSubmit = function() {
    
        clientUpdateFac.update($scope.fmData).then(function(promise){
            if(promise.data == "1") {
                $location.path('/client');
            } else {
                $scope.updateFail = true;
            }
            //console.log(JSON.stringify(promise.data));
        });
        //console.log('form submitted:', $scope.formData);
    };
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        
        $scope.loading = true;
        clientUpdateFac.data().then(function(promise){
            $scope.loading = false;
            if(angular.isObject(angular.fromJson(promise.data))) {
                    $scope.fmData = angular.fromJson(promise.data);
            }
            console.log(promise.data);
        });
        
        
        
     });
};
},{}],18:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.client.update',[]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('clientUpdate', {
        url:'/client/update/:cl_id',
        templateUrl : 'modules/client/modules/client.update/views/client.update.view.html',
        controller : 'clientUpdateCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('clientUpdateFac',require('./services/client.update.fac'));

ngModule.controller('clientUpdateCtrl',require('./controllers/client.update.ctrl'));

module.exports = ngModule;
},{"./controllers/client.update.ctrl":17,"./services/client.update.fac":19}],19:[function(require,module,exports){
'use strict';

module.exports = function($http, $q, $stateParams){
        var factory = {};
        factory.data = function() {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/client/modules/client.update/models/client.model.php', {
                    /* POST variables here */
                    cl_id: $stateParams.cl_id
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        factory.update = function(cl_jsonb) {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/client/modules/client.update/models/client.update.model.php', {
                    /* POST variables here */
                    cl_id: $stateParams.cl_id,
                    cl_jsonb: cl_jsonb
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        return factory;
    };
},{}],20:[function(require,module,exports){
'use strict';

module.exports = function($http, $q){
        var factory = {};
        factory.data = function() {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/client/models/client.model.php', {
                        /* POST variables here */
                        procces_id: new Date().getMilliseconds()
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        return factory;
    };
},{}],21:[function(require,module,exports){
'use strict';

module.exports = function ($rootScope, $scope, homeFac, $window) {
    console.log($rootScope.user);
    $scope.user = $rootScope.user;
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
    });
};
},{}],22:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.home',[]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('home', {
        url:'/home',
        templateUrl : 'modules/home/views/home.view.html',
        controller : 'homeCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin, USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('homeFac',require('./services/home.fac'));

ngModule.controller('homeCtrl',require('./controllers/home.ctrl'));

module.exports = ngModule;
},{"./controllers/home.ctrl":21,"./services/home.fac":23}],23:[function(require,module,exports){
'use strict';

module.exports = function($http, $q){
        var factory = {};
        factory.getLogin = function(user) {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/home/models/homeModel.php', {
                        /* POST variables here */
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        return factory;
    };
},{}],24:[function(require,module,exports){
'use strict';

module.exports = function ($scope, userFac, $window, i18nFilter, $parse) {
    
    $scope.fields = Object.keys(i18nFilter("USER.FIELDS"));
    
    console.log(JSON.stringify($scope.fields));
    
    $scope.showEdit = true;
    $scope.showDuplicate = false;
    
    $scope.edit = function (id) {
        if (angular.isNumber(id)) {
                //Embed the id to the link
                var link = "#/user/update/" + id;
                //Open the link
                window.location = link;
        }
    }
    
    $scope.duplicate = function (id) {
        if (angular.isNumber(id)) {
                var link = "#/user/duplicate/" + id;
                //Open the link
                window.location = link;
        }
    }
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        $scope.loading = true;
        userFac.data().then(function(promise){
            $scope.loading = false;
            if(angular.isArray(promise.data)) {
                $scope.data = promise.data;
            }
            console.log(angular.fromJson(promise.data));
        });
     });
};
},{}],25:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.user',[
    require('./modules/user.add').name,
    require('./modules/user.update').name
]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('user', {
        url:'/user',
        templateUrl : 'modules/user/views/user.view.html',
        controller : 'userCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('userFac',require('./services/user.fac'));

ngModule.controller('userCtrl',require('./controllers/user.ctrl'));

module.exports = ngModule;
},{"./controllers/user.ctrl":24,"./modules/user.add":27,"./modules/user.update":30,"./services/user.fac":32}],26:[function(require,module,exports){
'use strict';

module.exports = function ($scope, userAddFac, $window, $location, i18nFilter) {
        
    $scope.onSubmit = function() {
    
        userAddFac.add($scope.fmData).then(function(promise){
            if(promise.data == "1") {
                $location.path('/user');
            } else {
                $scope.updateFail = true;
            }
            //console.log(JSON.stringify(promise.data));
        });
        //console.log('form submitted:', $scope.formData);
    };
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
     });
};
},{}],27:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.user.add',[]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('userAdd', {
        url:'/user/add',
        templateUrl : 'modules/user/modules/user.add/views/user.add.view.html',
        controller : 'userAddCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('userAddFac',require('./services/user.add.fac'));

ngModule.controller('userAddCtrl',require('./controllers/user.add.ctrl'));

module.exports = ngModule;
},{"./controllers/user.add.ctrl":26,"./services/user.add.fac":28}],28:[function(require,module,exports){
'use strict';

module.exports = function($http, $stateParams){
        var factory = {};
        factory.add = function(us_jsonb) {
            var promise = $http.post('modules/user/modules/user.add/models/user.add.model.php', {
                    /* POST variables here */
                    us_jsonb: us_jsonb
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        return factory;
    };
},{}],29:[function(require,module,exports){
'use strict';

module.exports = function ($scope, userUpdateFac, $window, $location, i18nFilter) {
        
    $scope.onSubmit = function() {
    
        userUpdateFac.update($scope.fmData).then(function(promise){
            if(promise.data == "1") {
                $location.path('/user');
            } else {
                $scope.updateFail = true;
            }
            //console.log(JSON.stringify(promise.data));
        });
        //console.log('form submitted:', $scope.formData);
    };
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        
        $scope.loading = true;
        userUpdateFac.data().then(function(promise){
            $scope.loading = false;
            if(angular.isObject(angular.fromJson(promise.data))) {
                    $scope.fmData = angular.fromJson(promise.data);
            }
            console.log(promise.data);
        });
        
        
        
     });
};
},{}],30:[function(require,module,exports){
'use strict';

var ngModule = angular.module('app.user.update',[]);

ngModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('userUpdate', {
        url:'/user/update/:us_id',
        templateUrl : 'modules/user/modules/user.update/views/user.update.view.html',
        controller : 'userUpdateCtrl',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

ngModule.factory('userUpdateFac',require('./services/user.update.fac'));

ngModule.controller('userUpdateCtrl',require('./controllers/user.update.ctrl'));

module.exports = ngModule;
},{"./controllers/user.update.ctrl":29,"./services/user.update.fac":31}],31:[function(require,module,exports){
'use strict';

module.exports = function($http, $q, $stateParams){
        var factory = {};
        factory.data = function() {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/user/modules/user.update/models/user.model.php', {
                    /* POST variables here */
                    us_id: $stateParams.us_id
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        factory.update = function(us_jsonb) {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/user/modules/user.update/models/user.update.model.php', {
                    /* POST variables here */
                    us_id: $stateParams.us_id,
                    us_jsonb: us_jsonb
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        return factory;
    };
},{}],32:[function(require,module,exports){
'use strict';

module.exports = function($http, $q){
        var factory = {};
        factory.data = function() {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/user/models/user.model.php', {
                        /* POST variables here */
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        return factory;
    };
},{}],33:[function(require,module,exports){
'use strict';

module.exports = function ($scope, woFactory,$location, i18nFilter) {
    
    $scope.fields = Object.keys(i18nFilter("WO.FIELDS"));
    
    console.log(JSON.stringify($scope.fields));
    
    $scope.showEdit = true;
    $scope.showDuplicate = true;
    
    $scope.edit = function (id) {
        if (angular.isNumber(id)) {
                //Embed the id to the link
                var link = "#/wo/update/" + id;
                //Open the link
                window.location = link;
        }
    }
    
    $scope.duplicate = function (id) {
        if (angular.isNumber(id)) {
                var link = "#/wo/duplicate/" + id;
                //Open the link
                window.location = link;
        }
    }
    
    $scope.$on('$viewContentLoaded', function() {
        // this code is executed after the view is loaded

        $scope.loading = true;
        woFactory.getData().then(function(promise){
            $scope.loading = false;
            if(angular.isArray(promise.data)) {
                $scope.data = promise.data;
            }
            //console.log(JSON.stringify(promise.data));
        });
     });
};
},{}],34:[function(require,module,exports){
'use strict';

var clientModule = angular.module('app.wo',[
    require('./modules/woAdd').name,
    require('./modules/woUpdate').name
]);

clientModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('wo', {
        url:'/wo',
        templateUrl : 'modules/wo/views/woView.html',
        controller : 'woController',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

clientModule.factory('woFactory',require('./services/woFactory'));

clientModule.controller('woController',require('./controllers/woController'));

module.exports = clientModule;
},{"./controllers/woController":33,"./modules/woAdd":36,"./modules/woUpdate":39,"./services/woFactory":41}],35:[function(require,module,exports){
'use strict';

module.exports = function ($scope, woAddFactory, $window) {
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        $scope.loading = true;
        woAddFactory.addData().then(function(promise){
            $scope.loading = false;
            if(angular.isArray(promise.data)) {
               
            }
            console.log(JSON.stringify(promise.data));
        });
     });
};
},{}],36:[function(require,module,exports){
'use strict';

var clientModule = angular.module('app.woAdd',[]);

clientModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('woAdd', {
        url:'/wo/add',
        templateUrl : 'modules/wo/modules/woAdd/views/woAddView.html',
        controller : 'woAddController',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

clientModule.factory('woAddFactory',require('./services/woAddFactory'));

clientModule.controller('woAddController',require('./controllers/woAddController'));

module.exports = clientModule;
},{"./controllers/woAddController":35,"./services/woAddFactory":37}],37:[function(require,module,exports){
'use strict';

module.exports = function($http){
        var factory = {};
        factory.addData = function() {
            var promise = $http.post('modules/wo/modules/woAdd/models/woAddModel.php', {
                    /* POST variables here */
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        return factory;
    };
},{}],38:[function(require,module,exports){
'use strict';

module.exports = function ($scope, woUpdateFactory, $window) {
    
    $scope.$on('$viewContentLoaded', function () {
        // this code is executed after the view is loaded
        $scope.loading = true;
        woUpdateFactory.updateData().then(function(promise){
            $scope.loading = false;
            if(angular.isArray(promise.data)) {
                
            }
            console.log(JSON.stringify(promise.data));
        });
     });
};
},{}],39:[function(require,module,exports){
'use strict';

var clientModule = angular.module('app.woUpdate',[]);

clientModule.config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
function($stateProvider, $urlRouterProvider, USER_ROLES) {
    $stateProvider.state('woUpdate', {
        url:'/wo/update/:wo_id',
        templateUrl : 'modules/wo/modules/woUpdate/views/woUpdateView.html',
        controller : 'woUpdateController',
        data: {
            authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
        }    
    });
}]);

clientModule.factory('woUpdateFactory',require('./services/woUpdateFactory'));

clientModule.controller('woUpdateController',require('./controllers/woUpdateController'));

module.exports = clientModule;
},{"./controllers/woUpdateController":38,"./services/woUpdateFactory":40}],40:[function(require,module,exports){
'use strict';

module.exports = function($http, $stateParams){
        var factory = {};
        factory.updateData = function() {
            var promise = $http.post('modules/wo/modules/woUpdate/models/woUpdateModel.php', {
                    /* POST variables here */
                    wo_id: $stateParams.wo_id
            }).success(function(data, status, headers, config){
                return data;
            }).error(function (data, status, headers, config) {
                return {"status": false};
            });
            return promise;
        };
        return factory;
    };
},{}],41:[function(require,module,exports){
'use strict';

module.exports = function($http, $q){
        var factory = {};
        factory.getData = function() {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('modules/wo/models/woModel.php', {
                        /* POST variables here */
                }).success(function(data, status, headers, config){
                    return data;
                }).error(function (data, status, headers, config) {
                    return {"status": false};
                })
            );
            return deferred.promise;
        };
        return factory;
    };
},{}]},{},[1])