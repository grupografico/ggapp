module.exports = (function(angular){
    'use strict';
    
    return function ($scope, productOffsetGeneralUpdateFac, $window, $location, i18nFilter, $interval, $stateParams) {
        
        $scope.onSubmit = function() {

            productOffsetGeneralUpdateFac.update($scope.fmData).then(function(promise){
                if(promise.data == "1") {
                    $location.path('/product/'+$stateParams.cl_id);
                } else {
                    $scope.updateFail = true;
                }
                //console.log(JSON.stringify(promise.data));
            });
            //console.log('form submitted:', $scope.formData);
        };
        
        $scope.getStates = function() {
            $scope.pr_stateoptions = [];
            $scope.pr_cityoptions = [];
            $scope.pr_countyoptions = [];
            $interval(function(){
                productOffsetGeneralUpdateFac.getStates($scope.fmData.pr_country).then(function(promise){
                    if(angular.isArray(promise.data.geonames)) {
                        $scope.pr_stateoptions = promise.data.geonames;
                    } else {
                        //$scope.updateFail = true;
                    }
                    //console.log(JSON.stringify(promise.data));
                });
            },0,1);
        }

        $scope.getCityCounty = function() {
            $scope.pr_cityoptions = [];
            $scope.pr_countyoptions = [];
            $interval(function(){
                productOffsetGeneralUpdateFac.getStates($scope.fmData.pr_state).then(function(promise){
                    if(angular.isArray(promise.data.geonames)) {
                        $scope.pr_cityoptions = promise.data.geonames;
                        $scope.pr_countyoptions = promise.data.geonames;
                    } else {
                        //$scope.updateFail = true;
                    }
                    //console.log(JSON.stringify(promise.data));
                });
            },0,1);
        }
        
        $scope.pr_statusoptions = i18nFilter("productOffsetGeneral.fields.pr_statusoptions");
        
        $scope.$on('$viewContentLoaded', function () {
            // this code is executed after the view is loaded
            $scope.loading = true;
            productOffsetGeneralUpdateFac.data().then(function(promise){
                $scope.loading = false;
                if(angular.isObject(angular.fromJson(promise.data))) {
                        $scope.fmData = angular.fromJson(promise.data);
                }
                console.log(promise.data);
            }).then(function(){
                productOffsetGeneralUpdateFac.getCountries().then(function(promise){
                    if(angular.isArray(promise.data.geonames)) {
                        $scope.pr_countryoptions = promise.data.geonames;
                    } else {
                        //$scope.updateFail = true;
                    }
                    //console.log(JSON.stringify(promise.data.geonames));
                }).then(function(){
                    productOffsetGeneralUpdateFac.getStates($scope.fmData.pr_country).then(function(promise){
                        if(angular.isArray(promise.data.geonames)) {
                            $scope.pr_stateoptions = promise.data.geonames;
                        } else {
                            //$scope.updateFail = true;
                        }
                        //console.log(JSON.stringify(promise.data.geonames));
                    })
                }).then(function(){
                    productOffsetGeneralUpdateFac.getCityCounty($scope.fmData.pr_state).then(function(promise){
                        if(angular.isArray(promise.data.geonames)) {
                            $scope.pr_cityoptions = promise.data.geonames;
                            $scope.pr_countyoptions = promise.data.geonames;
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