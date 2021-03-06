module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'woAddFactory', '$stateParams', 'i18nFilter', '$filter', '$location', 'authService', 'notyf',
        function ($scope, woAddFactory, $stateParams, i18nFilter, $filter, $location, authService, notyf) {
            $scope.fmData = {};
            $scope.fmData.wo_type = "N"; // N-new
            $scope.fmData.wo_status = 0; // 0-Active
            $scope.fmData.cl_id = +$stateParams.cl_id;
            $scope.fmData.pr_id = +$stateParams.pr_id;
            const { username } = authService.profile()
            $scope.fmData.wo_createdby = username;

            const camelCase = (...args) => {
                const camelCase = args.map(function (value, index) {
                    if (index === 0) {
                        return value.toLowerCase()
                    }
                    return value.charAt(0).toUpperCase() + value.substr(1);
                });
                return camelCase.join('')
            }

            $scope.wo_qtymeasureoptions = i18nFilter("wo-add.fields.wo_qtymeasureoptions");
            $scope.wo_foliosperformatoptions = i18nFilter("wo-add.fields.wo_foliosperformatoptions");
            $scope.wo_currencyoptions = i18nFilter("wo-add.fields.wo_currencyoptions");
            $scope.wo_emailoptions = i18nFilter("wo-add.fields.wo_emailoptions");

            $scope.created = false

            $scope.onSubmit = function () {

                woAddFactory.add($scope.fmData).then(function (promise) {
                    if (promise.data.rowCount === 1) {
                        notyf.open({
                            type: 'success',
                            message: 'Orden Creada.'
                        });
                        $scope.created = true;
                    } else {
                        $scope.updateFail = true;
                    }
                });
            };

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded

                // create InputDate control
                $scope.wo_commitmentdate = new wijmo.input.InputDate('#wo_commitmentdate', {
                    format: 'yyyy-MM-dd',
                    mask: '9999-99-99',
                    isRequired: true
                });

                // wo_commitmentdate validator                
                $scope.wo_commitmentdate.itemValidator = function (date) {
                    return !moment(date).isBefore(moment(), 'day');
                }

                // wo_commitmentdate changed handler                
                $scope.wo_commitmentdate.valueChanged.addHandler(wo_commitmentdateChanged)

                // wo_commitmentdate default value
                $scope.fmData.wo_commitmentdate = moment($scope.wo_commitmentdate.value).format('YYYY-MM-DD')

                // wo_commitmentdate changed function
                function wo_commitmentdateChanged(s, e) {
                    $scope.fmData.wo_commitmentdate = moment(s.value).format('YYYY-MM-DD')
                    $scope.$apply()
                }

                $scope.loading = true;
                woAddFactory.getZone().then(function (promise) {
                    $scope.zo_idoptions = [];
                    if (angular.isArray(promise.data)) {
                        var rows = promise.data;
                        angular.forEach(rows, function (value, key) {
                            this.push({ "label": rows[key]['zo_jsonb']['zo_zone'], "value": rows[key]['zo_id'] });
                        }, $scope.zo_idoptions);
                    }
                });

                woAddFactory.getProduct().then(function (promise) {
                    $scope.pr_idoptions = [];
                    var rows = [];
                    if (angular.isArray(promise.data)) {
                        rows = promise.data;
                        angular.forEach(rows, function (value, key) {
                            this.push({ "label": rows[key]['pr_jsonb']['pr_code'] + ' - ' + rows[key]['pr_jsonb']['pr_name'], "value": rows[key]['pr_id'] });
                        }, $scope.pr_idoptions);
                    }

                    $scope.$watch(
                        "fmData.pr_id",
                        function prChange(newValue, oldValue) {
                            $scope.fmData.wo_qty = undefined;
                            $scope.fmData.wo_boxqty = undefined;
                            $scope.fmData.wo_materialqty = undefined;
                            $scope.fmData.wo_packageqty = undefined;
                            $scope.fmData.wo_foliosperformat = undefined;
                            $scope.fmData.wo_foliosseries = undefined;
                            $scope.fmData.wo_foliosfrom = undefined;
                            $scope.fmData.wo_foliosto = undefined;
                            if (newValue !== undefined) {
                                var product = $filter('filter')(rows, { "pr_id": newValue }, true);
                                if (product.length !== 1) {
                                    $scope.prinfo = false;
                                    return;
                                } else {
                                    $scope.prinfo = true;
                                    $scope.product = product[0];
                                    $scope.productUpdateUrl = `/product/update/${$scope.product['pr_jsonb']['pr_process']}/${$scope.product['pr_jsonb']['pr_type']}/${$scope.product['pr_jsonb']['cl_id']}/${$scope.product['pr_id']}`
                                    $scope.folio = (product[0]['pr_jsonb']['pr_folio'] === 'yes') ? true : false;
                                    var pr_type = product[0]['pr_jsonb']['pr_type']
                                    $scope.components = (pr_type === 'paginated' || pr_type === 'counterfoil') ? true : false;
                                    $scope.componentsArray = new Array(product[0]['pr_jsonb']['pr_components'])
                                    const rawMaterials = $scope.product['pr_material'].split(',')
                                    $scope.mt_inactive = false
                                    const materials = rawMaterials.map((value, index, data) => {
                                        const mtArray = value.split('|')
                                        value = {
                                            "description": mtArray[0],
                                            "status": mtArray[1]
                                        }
                                        if (mtArray[1] === 'I') {
                                            $scope.mt_inactive = true
                                        }
                                        return value
                                    })
                                    $scope.materials = materials
                                    woAddFactory.getMachine(product[0]['pr_jsonb']['pr_process']).then(function (promise) {
                                        $scope.ma_idoptions = [];
                                        if (angular.isArray(promise.data)) {
                                            var rows = promise.data;
                                            angular.forEach(rows, function (value, key) {
                                                this.push({ "label": rows[key]['ma_jsonb']['ma_name'], "value": rows[key]['ma_id'] });
                                            }, $scope.ma_idoptions);
                                        }
                                    });
                                }
                            }
                        }
                    );
                });
                $scope.loading = false;
            });
        }];

})(angular);