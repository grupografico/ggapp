module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'zoneUpdateFac', '$location', 'i18nFilter', '$interval', '$stateParams',
        function ($scope, zoneUpdateFac, $location, i18nFilter, $interval, $stateParams) {

            $scope.onSubmit = function () {

                zoneUpdateFac.update($scope.fmData).then(function (promise) {
                    if (promise.data.rowCount === 1) {
                        $location.path('/zone/' + $stateParams.cl_id);
                    } else {
                        $scope.updateFail = true;
                    }
                });
            };

            $scope.getStates = function () {
                $scope.zo_stateoptions = [];
                $scope.zo_cityoptions = [];
                $scope.zo_countyoptions = [];
                $interval(function () {
                    zoneUpdateFac.getStates($scope.fmData.zo_country).then(function (promise) {
                        if (angular.isArray(promise.data.geonames)) {
                            $scope.zo_stateoptions = promise.data.geonames;
                        } else {
                            //$scope.updateFail = true;
                        }
                    });
                }, 0, 1);
            }

            $scope.getCityCounty = function () {
                $scope.zo_cityoptions = [];
                $scope.zo_countyoptions = [];
                $interval(function () {
                    zoneUpdateFac.getStates($scope.fmData.zo_state).then(function (promise) {
                        if (angular.isArray(promise.data.geonames)) {
                            $scope.zo_cityoptions = promise.data.geonames;
                            $scope.zo_countyoptions = promise.data.geonames;
                        } else {
                            //$scope.updateFail = true;
                        }
                    });
                }, 0, 1);
            }

            $scope.zo_statusoptions = i18nFilter("zone.fields.zo_statusoptions");
            $scope.zo_typeoptions = i18nFilter("zone.fields.zo_typeoptions");

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded
                $scope.loading = true;
                zoneUpdateFac.data().then(function (promise) {
                    $scope.loading = false;
                    if (angular.isArray(promise.data) && promise.data.length === 1) {
                        $scope.fmData = promise.data[0].zo_jsonb;
                    }
                }).then(function () {
                    zoneUpdateFac.getCountries().then(function (promise) {
                        if (angular.isArray(promise.data.geonames)) {
                            $scope.zo_countryoptions = promise.data.geonames;
                        } else {
                            //$scope.updateFail = true;
                        }
                    }).then(function () {
                        zoneUpdateFac.getStates($scope.fmData.zo_country).then(function (promise) {
                            if (angular.isArray(promise.data.geonames)) {
                                $scope.zo_stateoptions = promise.data.geonames;
                            } else {
                                //$scope.updateFail = true;
                            }
                        })
                    }).then(function () {
                        zoneUpdateFac.getCityCounty($scope.fmData.zo_state).then(function (promise) {
                            if (angular.isArray(promise.data.geonames)) {
                                $scope.zo_cityoptions = promise.data.geonames;
                                $scope.zo_countyoptions = promise.data.geonames;
                            } else {
                                //$scope.updateFail = true;
                            }
                        })
                    });
                });

            });
        }];

})(angular);