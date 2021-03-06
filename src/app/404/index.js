module.exports = (function(angular){
    'use strict';
    
    return angular.module('app.404',[])

    .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('404', {
            url:'/404',
            template: require('./404.view.html'),
            controller : '404Ctrl',
            data: {
                requiresLogin: false
            }    
        });
    }])

    .controller('404Ctrl',require('./404.ctrl'))

})(angular);