// vendor styles
require('../bower_components/bootstrap/dist/css/bootstrap.css');
require('../bower_components/animate.css/animate.css');
require('../bower_components/wijmo/Dist/styles/wijmo.css');

// application styles
require('./sass/animations.scss');
require('./sass/exportation-invoice.scss');
require('./sass/global.scss');
require('./sass/menu.scss');
require('./sass/navbar.scss');

// vendor libraries
window._ = require('lodash');
window.jQuery = require('../bower_components/jquery/dist/jquery.js');
window.$ = require('../bower_components/jquery/dist/jquery.js');
require('../bower_components/angular/angular.js');
require('../bower_components/angular-ui-router/release/angular-ui-router.js');
require('../bower_components/angular-animate/angular-animate.js');
require('../bower_components/angular-bootstrap/ui-bootstrap-tpls.js');
require('../bower_components/qrcode/lib/qrcode.js');
require('../bower_components/angular-qr/src/angular-qr.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.chart.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.grid.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.grid.filter.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.grid.sheet.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.grid.xlsx.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.xlsx.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.pdf.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.grid.pdf.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.grid.grouppanel.js');
require('script-loader!../bower_components/wijmo/Dist/controls/wijmo.input.js');
require('script-loader!../bower_components/wijmo/Dist/interop/angular/wijmo.angular.js'); // order matters
require('../bower_components/bootstrap/js/dropdown.js');
require('../bower_components/bootstrap/js/collapse.js');
require('../bower_components/bootstrap/js/tooltip.js');
require('../bower_components/bootstrap/js/popover.js');
require('../bower_components/bootstrap/js/modal.js');
require('../bower_components/bootstrap/js/tab.js');
require('../bower_components/auth0-lock/build/lock.js');
require('../bower_components/angular-lock/dist/angular-lock.js');
require('../bower_components/angular-jwt/dist/angular-jwt.js');
window.moment = require('../bower_components/moment/moment.js');

// Aplication Libraries
require('./scripts/gg-alerts.js');
require('./scripts/gg-fields.js');
require('./scripts/libphonenumber.js');
require('./scripts/nav-menu.js');

// Aplication
require('./app/app.js');