module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'woUpdateFactory', '$stateParams', 'i18nFilter', '$filter', '$location', 'authService', 'FileUploader', 'notyf',
        function ($scope, woUpdateFactory, $stateParams, i18nFilter, $filter, $location, authService, FileUploader, notyf) {

            const camelCase = (...args) => {
                const camelCase = args.map(function (value, index) {
                    if (index === 0) {
                        return value.toLowerCase()
                    }
                    return value.charAt(0).toUpperCase() + value.substr(1);
                });
                return camelCase.join('')
            }

            const { username, us_group } = authService.profile()

            // Create a new instance of the FileUploader
            $scope.uploader = new FileUploader({
                url: '/api/upload',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('id_token')}`
                },
                formData: [
                    {
                        wo_id: $stateParams.wo_id,
                        cl_id: $stateParams.cl_id,
                        wo_updatedby: username,
                        us_group: us_group
                    }
                ]
            });

            $scope.uploader.filters.push({
                'name': 'enforceMaxFileSize',
                'fn': function (item) {
                    const limit = 20 * 1024 * 1024 // 20 MiB to bytes
                    return item.size <= limit
                }
            });

            $scope.uploader.onBeforeUploadItem = function (item) {
                const [formData] = item.formData
                formData.originalName = item.file.name
                formData.alias = item.alias
                item.file.name = `${formData.wo_id}_${item.alias}.pdf`
                item.alias = 'file'
            };

            $scope.uploader.onWhenAddingFileFailed = function (item, filter, options) {
                if (filter.name = 'enforceMaxFileSize') {
                    let [input] = document.getElementsByName(options.alias)
                    input.value = ''
                    if (!/safari/i.test(navigator.userAgent)) {
                        input.type = ''
                        input.type = 'file'
                    }
                    notyf.open({
                        type: 'warning',
                        message: 'El archivo es mayor a 10MB.'
                    });
                }
            }
            $scope.uploader.onErrorItem = function (item, response, status, headers) {
                const [file] = item.formData
                if (status === 601) {
                    notyf.error('La orden de trabajo no esta activa ó necesita privilegios adicionales para realizar esta acción. Por favor contacte al propietario.')
                } else {
                    notyf.error(`Ocurrio un error al subir el archivo ${file.originalName}.`)
                }
                let [input] = document.getElementsByName(file.alias)
                input.value = ''
                if (!/safari/i.test(navigator.userAgent)) {
                    input.type = ''
                    input.type = 'file'
                }
            }

            function setType(currentType) {
                var types = {
                    'N': 'NC', // N → NC  
                    'NC': 'NC', // NC → NC  
                    'P': 'PC', // P → PC
                    'PC': 'PC', // PC → PC
                    'R': 'RC', // R → RC  
                    'RC': 'RC', // RC → RC  
                    'unknown': 'unknown_type'
                };
                return (types[currentType] || types['unknown']);
            }

            $scope.uploader.onSuccessItem = function (item, response, status, headers) {
                const [formData] = item.formData
                let [input] = document.getElementsByName(formData.alias)
                input.value = ''
                if (!/safari/i.test(navigator.userAgent)) {
                    input.type = ''
                    input.type = 'file'
                }
                $scope.loading = true;
                woUpdateFactory.getData().then(function (promise) {
                    $scope.loading = false;
                    if (angular.isArray(promise.data) && promise.data.length === 1) {
                        const [wo] = promise.data
                        const { wo_id, wo_jsonb: fmData, wo_jsonb: { wo_type }, wo_date } = wo
                        $scope.fmData = fmData;
                        $scope.fmData.wo_type = setType(wo_type); 
                        $scope.wo_type = wo_type; // current type
                        $scope.wo_id = wo_id;
                        $scope.wo_date = wo_date;
                        const { username } = authService.profile()
                        $scope.fmData.wo_updatedby = username;
                    }
                })
            }

            // open files modal
            $scope.filesModal = () => {
                $('#filesModal').modal('show');
            }
            $scope.wo_qtymeasureoptions = i18nFilter("wo-add.fields.wo_qtymeasureoptions");
            $scope.wo_foliosperformatoptions = i18nFilter("wo-add.fields.wo_foliosperformatoptions");
            $scope.wo_currencyoptions = i18nFilter("wo-add.fields.wo_currencyoptions");
            $scope.wo_emailoptions = i18nFilter("wo-add.fields.wo_emailoptions");

            $scope.onSubmit = function () {

                woUpdateFactory.update($scope.fmData).then(function (promise) {
                    if (promise.data.rowCount === 1) {
                        $scope.wo_type = $scope.fmData.wo_type
                        notyf.open({
                            type: 'success',
                            message: 'Orden Actualizada.'
                        });
                    }
                });
            };

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded

                $scope.loading = true;
                woUpdateFactory.getData().then(function (promise) {
                    $scope.loading = false;
                    if (angular.isArray(promise.data) && promise.data.length === 1) {
                        const [wo] = promise.data
                        const { wo_id, wo_jsonb: fmData, wo_jsonb: { wo_type }, wo_date } = wo
                        $scope.fmData = fmData;
                        $scope.fmData.wo_type = setType(wo_type); 
                        $scope.wo_type = wo_type; // current type
                        $scope.wo_id = wo_id;
                        $scope.wo_date = wo_date;
                        const { username } = authService.profile()
                        $scope.fmData.wo_updatedby = username;

                    }

                    // create InputDate control
                    $scope.wo_commitmentdate = new wijmo.input.InputDate('#wo_commitmentdate', {
                        format: 'yyyy-MM-dd',
                        mask: '9999-99-99',
                        value: new Date(moment($scope.fmData.wo_commitmentdate).format()),
                    });
                    const originalDate = $scope.fmData.wo_commitmentdate

                    // wo_commitmentdate validator                
                    $scope.wo_commitmentdate.itemValidator = function (date) {
                        return !moment(date).isBefore(moment(), 'day');
                    }

                    // wo_commitmentdate changed handler                
                    $scope.wo_commitmentdate.valueChanged.addHandler(wo_commitmentdateChanged)

                    // wo_commitmentdate changed function
                    function wo_commitmentdateChanged(s, e) {
                        $scope.fmData.wo_commitmentdate = moment(s.value).format('YYYY-MM-DD')
                        $scope.$apply()
                    }


                    woUpdateFactory.getProduct($scope.fmData.pr_id).then(function (promise) {
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
                                    }
                                }
                            }
                        );
                    })
                });
                woUpdateFactory.getZone().then(function (promise) {
                    $scope.zo_idoptions = [];
                    if (angular.isArray(promise.data)) {
                        var rows = promise.data;
                        angular.forEach(rows, function (value, key) {
                            this.push({ "label": rows[key]['zo_jsonb']['zo_zone'], "value": rows[key]['zo_id'] });
                        }, $scope.zo_idoptions);
                    }
                });
                woUpdateFactory.getMachine().then(function (promise) {
                    $scope.ma_idoptions = [];
                    if (angular.isArray(promise.data)) {
                        var rows = promise.data;
                        angular.forEach(rows, function (value, key) {
                            this.push({ "label": rows[key]['ma_name'], "value": rows[key]['ma_id'] });
                        }, $scope.ma_idoptions);
                    }
                });
                $scope.loading = false;
            });
        }];

})(angular);