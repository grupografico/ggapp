module.exports = (function(angular){
    'use strict';
    
    return angular.module('app.zone.add',[])

    .config(['$stateProvider', '$urlRouterProvider','USER_ROLES',
    function($stateProvider, $urlRouterProvider, USER_ROLES) {
        $stateProvider.state('zoneAdd', {
            url:'/zone/add/:cl_id',
            templateUrl : 'modules/zone/modules/zone.add/views/zone.add.view.html',
            controller : 'zoneAddCtrl',
            data: {
                authorizedRoles: [USER_ROLES.admin,USER_ROLES.editor]
            }    
        });
    }])

    .factory('zoneAddFac',require('./services/zone.add.fac'))

    .controller('zoneAddCtrl',require('./controllers/zone.add.ctrl'))

})(angular);