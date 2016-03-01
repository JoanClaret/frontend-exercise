/**
 * Main entry point
 */

// Load modules
var $ = jQuery      = require('jquery');
var openTarget      = require('./utilities/open-target.js');
var accordionAjax   = require('./components/accordion-ajax.js');

// init open target
$(document).ready(function(){
	openTarget.openTargetInit('.js-open-target');
});
