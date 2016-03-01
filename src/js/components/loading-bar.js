/**
 * Loading bar
 */

var $ = jQuery  = require('jquery');

;(function($, document, window, undefined) {

    'use strict';
        
    exports.showLoadingBar = function() {
       $('body').append('<div class="LoadingBar"></div>');
    };

    exports.hideLoadingBar = function() {
        $('.LoadingBar').fadeOut(function(){
            $('.LoadingBar').remove();
        });
    };

})(window.jQuery || window.$, document, window);
