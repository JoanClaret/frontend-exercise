/**
 * Open target utility
 */

;(function($, document, window, undefined) {

    'use strict';

    var itemHeight,
        itemSelector,
        itemContent,
        openItem, 
        openItemSelector,
        openItemContent
    ;

    $.fn.openTarget = function() {

        // init
        this.each(function(i, selector) {
            var  $this = $(selector);

            // get item content from a given selector ($this)
            getItemContent($this);

            // store content as a data attribute
            storeContentHeight(itemContent);
            
        });
  
        // click event
        $(document).on('click', this.selector , function(){

            var $this = $(this);

            // get content from a given selector
            getItemContent($this);
          
            if ($this.hasClass('is-open')){
                // hide item content
                hideContent(itemContent);
            }
            else{
                // show item content
                showContent(itemContent);

                // if item is in a group
                if ($this.attr('data-open-target-group')){

                    // get group name
                    var itemGroup = $this.data('open-target-group');

                    // get open item in a given group
                    getOpenItem(itemGroup);

                    // hide open item
                    openItem.removeClass('is-open');
                    hideContent(openItemContent);
                }
            }
            // switch clicked element state
            $this.toggleClass('is-open');
        });

        // store content as a data attribute
        function storeContentHeight(itemContent){
            itemContent.css('display','block').css('height','auto');
            itemHeight = itemContent.outerHeight();
            itemContent.attr("data-itemheight", itemHeight );
            itemContent.css('height','0').css('overflow','hidden');
        }

        // get content from a given selector
        function getItemContent($this){
            itemSelector = $this.data('open-target');
            itemContent = $('*[data-target="'+itemSelector+'"]');
        }

        // get open item in a given group
        function getOpenItem(itemGroup){
            openItem = $('.is-open[data-open-target-group="'+itemGroup+'"]');
            openItemSelector = openItem.data('open-target');
            openItemContent = $('*[data-target="'+openItemSelector+'"]');
        }

        // hide content layer
        function hideContent(itemContent){
            itemContent.css('height','0');
        }

        // Show content layer
        function showContent (itemContent){ 
            itemHeight = itemContent.data('itemheight');
            itemContent.css('height', itemHeight); 
        }
    };
    
    exports.openTargetInit = function(selector) {
        $(selector).openTarget();
    };

})(window.jQuery || window.$, document, window);
