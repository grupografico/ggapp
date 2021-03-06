module.exports = (function (angular) {
    'use strict';

    return ['$http', '$q',  '$stateParams', function ($http, $q, $stateParams) {
        var factory = {};
        factory.getData = function () {
            var deferred = $q.defer();
            deferred.resolve(
                $http.post('/api/exportationinvoice', {
                    /* POST variables here */
                    procces_id: new Date().getMilliseconds(),
                    cl_id: $stateParams.cl_id
                }).success(function (data, status, headers, config) {
                    return data;
                }).error(function (data, status, headers, config) {
                    
                    return { "status": false };
                })
            );
            factory.cancelEI = function (wo_id, ei_id) {
                var deferred = $q.defer();
                deferred.resolve(
                    $http.post('/api/exportationinvoice/cancel', {
                        /* POST variables here */
                        wo_id: wo_id,
                        ei_id: ei_id
                    }).success(function (data, status, headers, config) {
                        return data;
                    }).error(function (data, status, headers, config) {
                        
                        return { "status": false };
                    })
                );
                return deferred.promise;
            };
            return deferred.promise;
        };
        return factory;
    }];

})(angular);