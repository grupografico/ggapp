module.exports = (function (angular) {
    'use strict';

    return angular.module('app.login', [])

        .config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider.state('login', {
                    url: '/login',
                    templateUrl: 'modules/login/login.view.html',
                    controller: 'loginCtrl',
                    data: {
                        requiresLogin: false
                    }
                });
            }])

        .controller('loginCtrl', require('./login.ctrl'))

})(angular);