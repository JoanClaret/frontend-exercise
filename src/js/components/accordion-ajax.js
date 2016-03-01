/**
 * Accordion ajax component
 */

// Load modules
var $ = jQuery  = require('jquery');
var loadingBar  = require('./loading-bar.js');
var openTarget  = require('./../utilities/open-target.js');
var mustache    = require('mustache');

// Load and print data
$(function() {
    $.getJSON('./dist/accordion-items.json', function() {
        // show loading bar
        loadingBar.showLoadingBar();

        // show loading spinner
        var template = $('.js-loading-spinner').html();
        var info = mustache.to_html(template);
        $('.js-load-accordion-ajax').html(info);
    })
    .success(function(data) { 
        // get template
        var template = $('.js-accordion-template').html();
        // setup template
        var info = mustache.to_html(template, data);
        
        setTimeout(function(){ 
            // fill target layer
            $('.js-load-accordion-ajax').html(info);
            // init openTarget (ajax loaded items)
            openTarget.openTargetInit('.js-open-target-ajax');
            loadingBar.hideLoadingBar();
        }, 3000);        
    })
    .error(function() { 
        $('.js-load-accordion-ajax').html('Sorry, there was an error loading data');
        // hide loading bar
        loadingBar.hideLoadingBar();
    });
});
