if($(".conv3_sup_recy_method_wrap").length > 0){
	
	// start change background image
	;(function($, window, undefined) {
		'use strict';

		var pluginName = 'change-bg-rm';

		function Plugin(element, options) {
			this.element = $(element);
			this.options = $.extend({}, $.fn[pluginName].defaults, this.element
					.data(), options);
			this.init();
		}

		Plugin.prototype.init = function() {
			var that = this;
			that.vars = {
				landingBgDesktop : that.options.landingBgDesktop
			};

			var resizeTimer;
			$(window).on(
					'resize.' + pluginName,
					function() {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function() {
							// Reset Background to use CSS
							that.element.css('background-image', '');
							
							if (window.innerWidth < 768) {
								that.element.css('background-image', '');
							} else{
								!!that.vars.landingBgDesktop && that.element.css('background-image', 'url(' + that.vars.landingBgDesktop + ')');
							}
						}, 400);
					});
			$(window).trigger('resize.' + pluginName);
		};

		$.fn[pluginName] = function(options, params) {

			return this.each(function() {
				var instance = $.data(this, pluginName);
				if (!instance) {
					$.data(this, pluginName, new Plugin(this, options));
				} else if (instance[options]) {
					instance[options](params);
				}
			});
		};

		$.fn[pluginName].defaults = {
			opacity : 0.8,
		};

		$(function() {
			$('[data-' + pluginName + ']')[pluginName]();
		});

	}(jQuery, window));
	// end change background image
}
