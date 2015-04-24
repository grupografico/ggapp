module.exports = (function(angular){
    'use strict';
    
    return function ($scope, inkAddFac, $window, $location, i18nFilter, $interval) {
        $scope.fmData = {};

        $scope.onSubmit = function() {

            inkAddFac.add($scope.fmData).then(function(promise){
                if(promise.data == "1") {
                    $location.path('/ink');
                } else {
                    $scope.updateFail = true;
                }
                //console.log(JSON.stringify(promise.data));
            });
            //console.log('form submitted:', $scope.formData);
        };
        
        $scope.in_statusoptions = i18nFilter("ink.fields.in_statusoptions");
        $scope.in_typeoptions = i18nFilter("ink.fields.in_typeoptions");

        $scope.$on('$viewContentLoaded', function () {
            // this code is executed after the view is loaded
            
            inkAddFac.getSuppliers().then(function(promise){
                if(angular.isArray(promise.data)) {
                    $scope.su_idoptions = [];
                    angular.forEach(promise.data,function(value, key){
                          this.push({"label":value.su_corporatename,"value":value.su_id});
                    },$scope.su_idoptions);
                } else {
                    //$scope.updateFail = true;
                }
                console.log(JSON.stringify($scope.su_idoptions));
                console.log(JSON.stringify(promise.data));
            });

         });
    };
    
})(angular);