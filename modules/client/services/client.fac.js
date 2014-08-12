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