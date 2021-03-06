module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'woFactory', '$location', 'i18nFilter', '$state', '$stateParams', '$timeout',
        function ($scope, woFactory, $location, i18nFilter, $state, $stateParams, $timeout) {

            $scope.labels = Object.keys(i18nFilter("wo.labels"));
            $scope.columns = i18nFilter("wo.columns");
            $scope.workflow = i18nFilter("tlr.fields.wo_statusoptions");

            // export to xls
            $scope.exportXLS = function () {
                const timestamp = moment().tz('America/Chihuahua').format();
                const fileName = `orders_${timestamp}.xlsx`;
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

            $scope.edit = function (id) {
                if (angular.isNumber(id)) {
                    var link = "/wo/update/" + id;
                    window.location = link;
                }
            };

            $scope.duplicate = function (id) {
                if (angular.isNumber(id)) {
                    var link = "/wo/duplicate/" + id;
                    window.location = link;
                }
            };

            // generate ShippingList
            $scope.shippingList = function () {
                var flex = $scope.ggGrid;
                var wo_id = []
                for (var i = 0; i < flex.rows.length; i++) {
                    if (flex.getCellData(i, flex.columns.getColumn('shipment').index) === true) wo_id.push(+flex.getCellData(i, flex.columns.getColumn('wo_id').index));
                }
                const selected = (wo_id.length > 0) ? true : false;
                if (selected) {
                    $state.go('shippingListAdd', {
                        cl_id: $stateParams.cl_id,
                        wo_id: wo_id.join(',')
                    })
                } else {
                    alert('Debe seleccionar por lo menos una orden.')
                }

            };

            // generate exportationInvoice
            $scope.exportationInvoice = function () {
                var flex = $scope.ggGrid;
                var wo_id = []
                for (var i = 0; i < flex.rows.length; i++) {
                    if (flex.getCellData(i, flex.columns.getColumn('invoice').index) === true) wo_id.push(+flex.getCellData(i, flex.columns.getColumn('wo_id').index));
                }
                const selected = (wo_id.length > 0) ? true : false;
                if (selected) {
                    $state.go('exportationInvoiceAdd', {
                        cl_id: $stateParams.cl_id,
                        wo_id: wo_id.join(',')
                    })
                } else {
                    alert('Debe seleccionar por lo menos una orden.')
                }

            };

            $scope.itemFormatter = function (panel, r, c, cell) {

                // fix prevent randomn coloring
                cell.style.backgroundColor = '';
                cell.style.color = '';
                // end fix

                // highlight rows that have 'invoice' set
                if (panel.cellType == wijmo.grid.CellType.Cell) {
                    var flex = panel.grid;
                    var row = flex.rows[r];
                    var col = flex.columns[c];
                    if (col.binding === 'invoice') {
                        var cb = cell.firstChild;
                        if (row.dataItem.wo_exportationinvoice === true || row.dataItem.wo_status < 13 || row.dataItem.wo_status === 18) {
                            cb.disabled = true
                        }
                        if (row.dataItem.invoice) {
                            cell.style.backgroundColor = '#CDDC39';
                        }
                    }
                    if (col.binding === 'shipment') {
                        var cb = cell.firstChild;
                        if (row.dataItem.wo_shippinglist === true || row.dataItem.wo_status < 13 || row.dataItem.wo_status === 18) {
                            cb.disabled = true
                        }
                        if (row.dataItem.shipment) {
                            cell.style.backgroundColor = '#3F51B5';
                        }
                    }
                }

                if (panel.cellType == wijmo.grid.CellType.ColumnHeader) {
                    var flex = panel.grid;
                    var col = flex.columns[c];

                    // check that this is a boolean column
                    if (col.dataType == wijmo.DataType.Boolean && col.binding === 'invoice') {

                        // prevent sorting on click
                        col.allowSorting = false;

                        // count true values to initialize checkbox
                        var cnt = 0;
                        for (var i = 0; i < flex.rows.length; i++) {
                            if (flex.getCellData(i, c) == true) cnt++;
                        }

                        // create and initialize checkbox
                        cell.innerHTML = '<input type="checkbox"> ' + cell.innerHTML;
                        var cb = cell.firstChild;
                        cb.checked = cnt > 0;
                        cb.indeterminate = cnt > 0 && cnt < flex.rows.length;

                        // apply checkbox value to cells
                        cb.addEventListener('click', function (e) {
                            flex.beginUpdate();
                            for (var i = 0; i < flex.rows.length; i++) {
                                if (!flex.rows[i].dataItem.wo_exportationinvoice && ((flex.rows[i].dataItem.wo_status > 12) && (flex.rows[i].dataItem.wo_status < 18))) {
                                    flex.setCellData(i, c, cb.checked);
                                }
                            }
                            flex.endUpdate();
                        });
                    }
                    // check that this is a boolean column
                    if (col.dataType == wijmo.DataType.Boolean && col.binding === 'shipment') {

                        // prevent sorting on click
                        col.allowSorting = false;

                        // count true values to initialize checkbox
                        var cnt = 0;
                        for (var i = 0; i < flex.rows.length; i++) {
                            if (flex.getCellData(i, c) == true) cnt++;
                        }

                        // create and initialize checkbox
                        cell.innerHTML = '<input type="checkbox"> ' + cell.innerHTML;
                        var cb = cell.firstChild;
                        cb.checked = cnt > 0;
                        cb.indeterminate = cnt > 0 && cnt < flex.rows.length;

                        // apply checkbox value to cells
                        cb.addEventListener('click', function (e) {
                            flex.beginUpdate();
                            for (var i = 0; i < flex.rows.length; i++) {
                                if (!flex.rows[i].dataItem.wo_shippinglist && ((flex.rows[i].dataItem.wo_status > 12) && (flex.rows[i].dataItem.wo_status < 18))) {
                                    flex.setCellData(i, c, cb.checked);
                                }
                            }
                            flex.endUpdate();
                        });
                    }
                }

                // display available files
                if ((panel.cellType == wijmo.grid.CellType.Cell)) {
                    var flex = panel.grid;
                    var col = flex.columns[c];
                    var row = flex.rows[r];
                    if (col.binding === 'file1') {
                        if (row.dataItem.file1) {
                            cell.innerHTML =
                                `<a class="link" href="/uploads/${row.dataItem.wo_id}_file1.pdf" download="${row.dataItem.file1}" target="_blank">descargar</a> | 
                            <a class="link" href="/uploads/${row.dataItem.wo_id}_file1.pdf" target="_blank">${row.dataItem.file1}</a><br/>`
                        }
                    }
                    if (col.binding === 'file2') {
                        if (row.dataItem.file2) {
                            cell.innerHTML =
                                `<a class="link" href="/uploads/${row.dataItem.wo_id}_file2.pdf" download="${row.dataItem.file2}" target="_blank">descargar</a> | 
                            <a class="link" href="/uploads/${row.dataItem.wo_id}_file2.pdf" target="_blank">${row.dataItem.file2}</a>`
                        }
                    }

                    if (col.binding === 'wo_status') {
                        angular.forEach($scope.workflow, function (value, key) {
                            if (value.value === panel.grid.getCellData(r, flex.columns.getColumn('wo_status').index)) {
                                //row.dataItem.wo_status = `(${value.value}) ${value.label}`;
                                cell.innerHTML = `(${value.value}) ${value.label}`;
                            }
                        });
                    }
                }
            }
            // formatItem event handler
            $scope.formatItem = function (s, e, cell) {

                if (e.panel.cellType == wijmo.grid.CellType.RowHeader) {
                    e.cell.textContent = e.row + 1;
                }

                var col = s.columns[e.col];

                // add Bootstrap html
                if ((e.panel.cellType == wijmo.grid.CellType.Cell) && (col.binding === 'actions')) {
                    const wo_id = e.panel.getCellData(e.row, s.columns.getColumn('wo_id').index, false);
                    const wo_qty = e.panel.getCellData(e.row, s.columns.getColumn('wo_qty').index, false);
                    e.cell.style.overflow = 'visible';
                    e.cell.innerHTML = `<div class="btn-group btn-group-justified" role="group" aria-label="...">
                                            <div class="btn-group">
                                                <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown" aria-expanded="false">
                                                    <span class="glyphicon glyphicon-option-horizontal" aria-hidden="true"></span></span>
                                                </button>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><a href="/wo/update/${$stateParams.cl_id}/${wo_id}" target="_blank"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span> ${i18nFilter("general.labels.edit")}</a></li>
                                                    <li><a href="/wo/history/${wo_id}" target="_blank"><span class="glyphicon glyphicon-time" aria-hidden="true"></span> ${i18nFilter("general.labels.history")}</a></li>
                                                    <li><a href="/wo/duplicate/${$stateParams.cl_id}/${wo_id}" target="_blank"><span class="glyphicon glyphicon-duplicate" aria-hidden="true"></span> ${i18nFilter("general.labels.duplicate")}</a></li>
                                                    <li><a href="/wo/split/${$stateParams.cl_id}/${wo_id}" target="_blank"><span class="glyphicon glyphicon-scissors" aria-hidden="true"></span> ${i18nFilter("general.labels.divide")}</a></li>
                                                </ul>
                                            </div>
                                        </div>`;
                }
            }

            // bind columns when grid is initialized
            $scope.initGrid = function (s, e) {
                s.rows.defaultSize = 30;
                for (var i = 0; i < $scope.columns.length; i++) {
                    var col = new wijmo.grid.Column();
                    col.binding = $scope.columns[i].binding;
                    col.dataType = $scope.columns[i].type;
                    col.isReadOnly = $scope.columns[i].isReadOnly;
                    col.filterType = $scope.columns[i].filterType;
                    col.header = i18nFilter("wo.labels." + $scope.columns[i].binding.replace('_', '-'));
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

            $scope.pageSize = 1000;

            $scope.$watch('pageSize', function () {
                var flex = $scope.ggGrid;
                if (flex && $scope.pageSize != null) {
                    var cv = flex.collectionView;
                    cv.pageSize = $scope.pageSize;
                }
            });

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded
                $scope.loading = false;
                woFactory.getData().then(function (promise) {
                    $scope.loading = false;
                    if (angular.isArray(promise.data)) {
                        // expose data as a CollectionView to get events
                        $scope.data = new wijmo.collections.CollectionView(promise.data, {
                          pageSize: $scope.pageSize
                        });
                    }
                });
            });
        }];

})(angular);