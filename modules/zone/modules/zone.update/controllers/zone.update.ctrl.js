module.exports = (function(angular){
    'use strict';
    
    return function ($scope, zoneUpdateFac, $window, $location, i18nFilter, $interval) {
        
        $scope.onSubmit = function() {

            zoneUpdateFac.update($scope.fmData).then(function(promise){
                if(promise.data == "1") {
                    $location.path('/zone');
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
                zoneUpdateFac.getStates($scope.fmData.cl_country).then(function(promise){
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
                zoneUpdateFac.getStates($scope.fmData.cl_state).then(function(promise){
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
        
        $scope.cl_statusoptions = [
            {"label":"Activo","value":"A"},
            {"label":"Inactivo","value":"I"}
        ];

        $scope.$on('$viewContentLoaded', function () {
            // this code is executed after the view is loaded
            $scope.loading = true;
            zoneUpdateFac.data().then(function(promise){
                $scope.loading = false;
                if(angular.isObject(angular.fromJson(promise.data))) {
                        $scope.fmData = angular.fromJson(promise.data);
                }
                console.log(promise.data);
            }).then(function(){
                zoneUpdateFac.getCountries().then(function(promise){
                    if(angular.isArray(promise.data.geonames)) {
                        $scope.cl_countryoptions = promise.data.geonames;
                    } else {
                        //$scope.updateFail = true;
                    }
                    //console.log(JSON.stringify(promise.data.geonames));
                }).then(function(){
                    zoneUpdateFac.getStates($scope.fmData.cl_country).then(function(promise){
                        if(angular.isArray(promise.data.geonames)) {
                            $scope.cl_stateoptions = promise.data.geonames;
                        } else {
                            //$scope.updateFail = true;
                        }
                        //console.log(JSON.stringify(promise.data.geonames));
                    })
                }).then(function(){
                    zoneUpdateFac.getCityCounty($scope.fmData.cl_state).then(function(promise){
                        if(angular.isArray(promise.data.geonames)) {
                            $scope.cl_cityoptions = promise.data.geonames;
                            $scope.cl_countyoptions = promise.data.geonames;
                        } else {
                            //$scope.updateFail = true;
                        }
                        //console.log(JSON.stringify(promise.data.geonames));
                    })
                });
            });

         });
    };
    
})(angular);