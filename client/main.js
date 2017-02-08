"use strict";
require('angular2-meteor-polyfills');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_module_1 = require('./imports/app/app.module');
var platform = platform_browser_dynamic_1.platformBrowserDynamic();
platform.bootstrapModule(app_module_1.AppModule);
Meteor.startup(function () {
    /*$.getScript('js/bootstrap.js');
    $.getScript('js/owl.carousel.js', function(){
        // script should be loaded and do something with it.

        $("#owl-demo").owlCarousel({
            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items : 1,
            itemsDesktop : [1199,1],
            itemsDesktopSmall : [979,1],
            itemsTablet : [768,1],
            navigation :false,
            pagination:false,
            slideSpeed : 300,
            paginationSpeed : 400,
            navigationText:	["<i class='fa fa-angle-left' aria-hidden='true'></i>","<i class='fa fa-angle-right' aria-hidden='true'></i>"],
            transitionStyle : "fade",
            });
    });
    $.getScript('js/jquery.meanmenu.js',function(){
        $(document).ready(function () {
            $('.navi-menu').meanmenu();
        });
    });
     
    $.getScript('js/jquery.selectbox-0.2.js',function(){
        $(".s-box").selectbox();
    });*/
});
//# sourceMappingURL=main.js.map