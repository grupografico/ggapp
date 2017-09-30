module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'productPlotterBannerAddFac', '$location', 'i18nFilter', '$stateParams',
        function ($scope, productPlotterBannerAddFac, $location, i18nFilter, $stateParams) {
            $scope.fmData = {};
            $scope.fmData = { "cl_id": "8", "mt_id": "1", "pr_code": "test123", "pr_cord": "allocated", "pr_fold": "tryptic", "pr_name": "Producto de prueba", "pr_type": "general", "pr_wire": "allocated", "pr_folio": "yes", "pr_blocks": "100", "pr_partno": "TEST-ASA.asas: 23,34", "pr_precut": "horizontal", "pr_status": "A", "pr_weight": "0.25", "pr_inkback": 2, "pr_process": "offset", "pr_varnish": "yes", "pr_inkfront": 2, "pr_inksback": { "0": "5", "1": "3" }, "pr_laminate": "yes", "pr_language": "español", "pr_inksfront": { "0": "2", "1": "2" }, "pr_varnishuv": "oneside", "pr_diecutting": "yes", "pr_description": "este es un producto de prueba", "pr_diecuttingqty": "5", "pr_reinforcement": "one", "pr_finalsizewidth": "100.00", "pr_materialsizewidth": "100.00", "pr_finalsizeheight": "200.00", "pr_laminatecaliber": "2mm", "pr_materialformatsqty": "123", "pr_materialsizeheight": "200.00", "pr_varnishfinished": "matte", "pr_finalsizemeasure": "cm", "pr_laminatefinished": "matte", "pr_materialsizemeasure": "cm" };          
            $scope.fmData.pr_process = 'plotter';
            $scope.fmData.pr_type = 'banner';
            $scope.fmData.cl_id = $stateParams.cl_id;

            $scope.onSubmit = function () {

                productPlotterBannerAddFac.add($scope.fmData).then(function (promise) {
                    if (promise.data.rowCount === 1) {
                        $location.path('/product/'+$stateParams.cl_id);
                    } else {
                        $scope.updateFail = true;
                    }
                });
            };

            $scope.pr_languageoptions = i18nFilter("productPlotterBanner-add.fields.pr_languageoptions");            
            $scope.pr_finalsizemeasureoptions = i18nFilter("productPlotterBanner-add.fields.pr_finalsizemeasureoptions");
            $scope.pr_inkfrontoptions = i18nFilter("productPlotterBanner-add.fields.pr_inkfrontoptions");
            $scope.pr_inkbackoptions = i18nFilter("productPlotterBanner-add.fields.pr_inkbackoptions");
            $scope.pr_materialsizemeasureoptions = i18nFilter("productPlotterBanner-add.fields.pr_materialsizemeasureoptions");
            $scope.pr_varnishoptions = i18nFilter("productPlotterBanner-add.fields.pr_varnishoptions");
            $scope.pr_varnisfinishedoptions = i18nFilter("productPlotterBanner-add.fields.pr_varnisfinishedoptions");
            $scope.pr_printedlabeledoptions = i18nFilter("productPlotterBanner-add.fields.pr_printedlabeledoptions");
            $scope.pr_rivetoptions = i18nFilter("productPlotterBanner-add.fields.pr_rivetoptions");
            $scope.pr_statusoptions = i18nFilter("productPlotterBanner-add.fields.pr_statusoptions");
        
            // create front ink fields
            $scope.$watch('fmData.pr_inkfront', function (newValue, oldValue) {
                if ($scope.fmData.pr_inkfront != undefined) {
                    $scope.frontInks = new Array(newValue);
                    for (var i = 0; i < oldValue; i++) {
                        $scope.fmData['pr_inksfront'][i] = undefined;
                    }
                }
            });
        
            // create back ink fields
            $scope.$watch('fmData.pr_inkback', function (newValue, oldValue) {
                if ($scope.fmData.pr_inkback != undefined) {
                    $scope.backInks = new Array(newValue);
                    for (var i = 0; i < oldValue; i++) {
                        $scope.fmData['pr_inksback'][i] = undefined;
                    }
                }
            });

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded
                
                productPlotterBannerAddFac.getClient().then(function (promise) {
                    $scope.loading = false;
                    if (angular.isObject(promise.data)) {
                        $scope.client = promise.data;
                    }
                });

                productPlotterBannerAddFac.getInks().then(function (promise) {
                    if (angular.isArray(promise.data)) {
                        $scope.pr_inkoptions = [];
                        angular.forEach(promise.data, function (value, key) {
                            this.push({ "label": value.in_code, "value": value.in_id });
                        }, $scope.pr_inkoptions);
                    } else {
                        //$scope.updateFail = true;
                    }
                });

                productPlotterBannerAddFac.getMaterials().then(function (promise) {
                    if (angular.isArray(promise.data)) {
                        $scope.mt_idoptions = [];
                        angular.forEach(promise.data, function (value, key) {
                            this.push({ "label": value.mt_code, "value": value.mt_id, "width": value.mt_width, "height": value.mt_height, "measure": value.mt_measure });
                        }, $scope.mt_idoptions);
                    } else {
                        //$scope.updateFail = true;
                    }
                });

            });
        }];

})(angular);