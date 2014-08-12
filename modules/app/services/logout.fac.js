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