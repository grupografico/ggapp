module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'shippingListFactory', '$location', 'i18nFilter', '$state', '$stateParams', 'authService', 'notyf',
        function ($scope, shippingListFactory, $location, i18nFilter, $state, $stateParams, authService, notyf) {

            $scope.labels = Object.keys(i18nFilter("shippingList.labels"));
            $scope.columns = i18nFilter("shippingList.columns");

            // export to xls
            $scope.exportXLS = function () {
                const timestamp = moment().tz('America/Chihuahua').format();
                const fileName = `shippinglists_${timestamp}.xlsx`;
                const flexGrid = $scope.ggGrid
                try {
                    wijmo.grid.xlsx.FlexGridXlsxConverter.save(flexGrid, {
                        includeColumnHeaders: true,
                        includeCellStyles: false
                    }, fileName);
                } catch (error) {
                    throw new Error(error)
                }

            }

            $scope.open = function (view, $item) {
                $state.go(view, {
                    sl_id: $item.sl_id
                })
            }

            $scope.cancelModal = function ($item) {
                $scope.shippingList = $item
                $('#cancelModal').modal('show');
            }
            $scope.cancel = function () {
                shippingListFactory.cancelSL($scope.shippingList.wo_id, $scope.shippingList.sl_id).then(function (promise) {
                    $('#cancelModal').modal('hide');
                    $state.reload()
                })
            }
            $scope.addExportationInvoice = function ($item) {
                console.log($item)
                const { username: ei_createdby } = authService.profile()
                shippingListFactory.addExportationInvoice($item.zo_id, $item.wo_id, ei_createdby).then(function (promise) {
                    const { data: exportationinvoice } = promise
                    const ei_date = moment(exportationinvoice.ei_date).tz('America/Chihuahua').format('DD/MM/YYYY')
                    notyf.open({
                        type: 'success',
                        message: `FACTURA DE EXPORTACION #${exportationinvoice.ei_id} ${ei_date}`
                    });
                    $state.go('exportationInvoiceView', {
                        ei_id: exportationinvoice.ei_id
                    })
                })
            }

            // formatItem event handler
            $scope.formatItem = function (s, e, cell) {

                if (e.panel.cellType == wijmo.grid.CellType.RowHeader) {
                    e.cell.textContent = e.row + 1;
                }

                var col = s.columns[e.col];
            }

            // bind columns when grid is initialized
            $scope.initGrid = function (s, e) {
                for (var i = 0; i < $scope.columns.length; i++) {
                    var col = new wijmo.grid.Column();
                    col.binding = $scope.columns[i].binding;
                    col.dataType = $scope.columns[i].type;
                    col.isReadOnly = $scope.columns[i].isReadOnly;
                    col.header = i18nFilter("shippingList.labels." + $scope.columns[i].binding.replace('_', '-'));
                    col.wordWrap = false;
                    col.width = $scope.columns[i].width;
                    s.columns.push(col);
                }
            };

            // create the tooltip object
            $scope.$watch('ggGrid', function () {
                if ($scope.ggGrid) {

                    // store reference to grid
                    var flex = $scope.ggGrid;

                    // create tooltip
                    var tip = new wijmo.Tooltip(),
                        rng = null;

                    // monitor the mouse over the grid
                    flex.hostElement.addEventListener('mousemove', function (evt) {
                        var ht = flex.hitTest(evt);
                        if (!ht.range.equals(rng)) {

                            // new cell selected, show tooltip
                            if (ht.cellType == wijmo.grid.CellType.Cell) {
                                rng = ht.range;
                                var col = flex.columns[rng.col].header;
                                var cellElement = document.elementFromPoint(evt.clientX, evt.clientY),
                                    cellBounds = wijmo.Rect.fromBoundingRect(cellElement.getBoundingClientRect()),
                                    data = wijmo.escapeHtml(flex.getCellData(rng.row, rng.col, true)),
                                    tipContent = col + ': "<b>' + data + '</b>"';
                                if (cellElement.className.indexOf('wj-cell') > -1) {
                                    tip.show(flex.hostElement, tipContent, cellBounds);
                                } else {
                                    tip.hide(); // cell must be behind scroll bar...
                                }
                            }
                        }
                    });
                    flex.hostElement.addEventListener('mouseout', function () {
                        tip.hide();
                        rng = null;
                    });
                }
            });

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded

                $scope.loading = true;

                shippingListFactory.getData().then(function (promise) {

                    $scope.loading = false;

                    if (angular.isArray(promise.data)) {

                        // expose data as a CollectionView to get events
                        $scope.data = new wijmo.collections.CollectionView(promise.data);

                    }
                });
            });
        }];

})(angular);