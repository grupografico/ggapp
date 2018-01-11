module.exports = (function(angular){
    'use strict';
    
    return angular.module('app.product',[
        require('./modules/product.update').name,
        require('./modules/productOffsetGeneral.add').name,
        require('./modules/productOffsetPaginated.add').name,
        require('./modules/productOffsetCounterfoil.add').name,
        require('./modules/productFlexoLabels.add').name,
        require('./modules/productFlexoRibbons.add').name,
        require('./modules/productPlotterFlexibles.add').name,        
        require('./modules/productPlotterRigid.add').name,        
        require('./modules/productPlotterBanner.add').name,
        require('./modules/productStampsGeneral.add').name,
        require('./modules/productStampsInkPad.add').name,
        require('./modules/productStampsInk.add').name,
        require('./modules/productSerigraphyBanner.add').name,
        require('./modules/productSerigraphyFlexibles.add').name,
        require('./modules/productSerigraphyRigid.add').name,
        require('./modules/productLaserGeneral.add').name,
        require('./modules/productDigitalGeneral.add').name,
        require('./modules/productDigitalGeneral.update').name,
        require('./modules/productDigitalPaginated.add').name,
        require('./modules/productDigitalCounterfoil.add').name,
        require('./modules/productDigitalCounterfoil.update').name,
        require('./modules/productDiecuttingGeneral.add').name,
        require('./modules/productDiecuttingGeneral.update').name,
        require('./modules/productDirectSaleGeneral.add').name,
    ])

    .config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
        $stateProvider.state('product', {
            url:'/product/:cl_id',
            template: require('./product.view.html'),
            controller : 'productCtrl',
            data: {
                requiresLogin: true
            }    
        });
    }])

    .factory('productFac',require('./product.fac'))

    .controller('productCtrl',require('./product.ctrl'))
    
})(angular);
