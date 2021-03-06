module.exports = (function (angular) {
    'use strict';

    return ['$scope', 'finishesCountFac', 'i18nFilter', '$timeout',
        function ($scope, finishesCountFac, i18nFilter, $timeout) {

            $scope.labels = Object.keys(i18nFilter("finishes-count.labels"));
            $scope.columns = i18nFilter("finishes-count.columns");
            $scope.workflow = i18nFilter("tlr.fields.wo_statusoptions");


            // export to xls
            $scope.exportXLS = function () {
                const timestamp = moment().tz('America/Chihuahua').format();
                const fileName = `machinesproductivity_${timestamp}.xlsx`;
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

            // bind columns when grid is initialized
            $scope.initGrid = function (s, e) {
                for (var i = 0; i < $scope.columns.length; i++) {
                    var col = new wijmo.grid.Column();
                    col.binding = $scope.columns[i].binding;
                    col.dataType = $scope.columns[i].type;
                    col.isContentHtml = $scope.columns[i].html;
                    col.format = $scope.columns[i].format;
                    col.aggregate = $scope.columns[i].aggregate;
                    col.header = i18nFilter("finishes-count.labels." + $scope.columns[i].binding.replace('_', '-'));
                    col.wordWrap = false;
                    col.width = $scope.columns[i].width;
                    s.columns.push(col);
                }
            };

            $scope.itemFormatter = function (panel, r, c, cell) {

                if ((panel.cellType == wijmo.grid.CellType.Cell)) {
                    var flex = panel.grid;
                    var col = flex.columns[c];
                    var row = flex.rows[r];
                    // fix prevent randomn coloring
                    cell.style.backgroundColor = '';
                    cell.style.color = '';
                    // end fix
                }
            }

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

            const getData = () => {
                const fromDate = moment($scope.fromDate.value).startOf('month').format('YYYY-MM-DD')
                const toDate = moment($scope.fromDate.value).endOf('month').format('YYYY-MM-DD')
                $scope.loading = true;
                finishesCountFac.data(fromDate, toDate).then(function (promise) {
                    $scope.loading = false;
                    if (angular.isArray(promise.data)) {
                        promise.data.map((item) => {
                            item.pr_staplingqty = +item.pr_staplingqty
                            item.pr_boundqty = +item.pr_boundqty
                            item.pr_foldunit1qty = +item.pr_foldunit1qty
                            return item
                        })
                        // create a group to show the grand totals
                        var grandTotalsGroup = new wijmo.collections.PropertyGroupDescription('Totales', function (item, propName) {
                            return '';
                        });
                        $scope.data = new wijmo.collections.CollectionView(promise.data, {
                            groupDescriptions: [grandTotalsGroup]
                        });
                    }
                });
            }

            $scope.$on('$viewContentLoaded', function () {
                // this code is executed after the view is loaded                

                // create InputDate control
                $scope.fromDate = new wijmo.input.InputDate('#fromDate', {
                    format: 'yyyy-MM',
                    mask: '9999-99',
                    selectionMode: wijmo.input.DateSelectionMode.Month,
                    value: new Date(moment().startOf('month'))
                });

                $scope.fromDate.valueChanged.addHandler(fromDateChanged)

                // fromDate changed function
                function fromDateChanged(s, e) {
                    getData()
                }

                getData()

            });
        }];

})(angular);