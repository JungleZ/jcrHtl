if($(".section1.kv").length > 0){
	
	// Remove youtube if isn't desktop
	if (!os.Desktop()) {
		$(".section1.kv .videoWrapper").remove();
	}
	
	// start change background image
	;(function($, window, undefined) {
		'use strict';

		var pluginName = 'change-bg-img';

		function Plugin(element, options) {
			this.element = $(element);
			this.options = $.extend({}, $.fn[pluginName].defaults, this.element
					.data(), options);
			this.init();
		}

		Plugin.prototype.init = function() {
			var that = this;
			that.vars = {
				landingBgDesktop : that.options.landingBgDesktop,
				landingBgMobile: that.options.landingBgMobile
			};

			var resizeTimer;
			$(window).on(
					'resize.' + pluginName,
					function() {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function() {
							if (window.innerWidth < 768) {
								that.vars.landingBgMobile && that.element.css('background-image', 'url(' + that.vars.landingBgMobile + ')');
							} else{
								that.vars.landingBgDesktop && that.element.css('background-image', 'url(' + that.vars.landingBgDesktop + ')');
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

	// if video is dynamic media
	if($(".section1.kv").hasClass( "dynamicmedia")) {
        var instanceId = $('.dm_video_container').data('instance-id');
        window[instanceId].setParam('stagesize', $('.section1.kv').width()+','+$('.section1.kv').height());
        window[instanceId].init();
		$(window).on('resize', function () {
            var height = $('.section1.kv').height();
            var width = $('.section1.kv').width();
            window[instanceId].resize(width, height);
		});
	}
}
