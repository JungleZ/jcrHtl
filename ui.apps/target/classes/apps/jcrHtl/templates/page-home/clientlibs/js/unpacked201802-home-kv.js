/* unpacked-201802 home-product-kv ver 2018.02.21 AM11:32 */

;(function(win,doc,callback){'use strict';callback=callback||function(){};function detach(){if(doc.addEventListener){doc.removeEventListener('DOMContentLoaded',completed);}else{doc.detachEvent('onreadystatechange',completed);}}function completed(){if(doc.addEventListener||event.type==='load'||doc.readyState==='complete'){detach();callback(window,window.jQuery);}}function init(){if (doc.addEventListener){doc.addEventListener('DOMContentLoaded',completed);}else{doc.attachEvent('onreadystatechange',completed);}}init();})(window,document,function(win,$){

;(function(win, $) {
	'use strict';

	if ('undefined' === typeof win.smg) {
		win.smg = {};
	}

	if ('undefined' === typeof win.smg.aem) {
		win.smg.aem = {};
	}

	if ('undefined' === typeof win.smg.aem.components) {
		win.smg.aem.components = {};
	}

	if ('undefined' === typeof win.smg.aem.components.home) {
		win.smg.aem.components.home = {};
	}	

	// Static Values
	var V_STATIC = win.smg.aem.varStatic,
	// Utility Script
	UTIL = win.smg.aem.util,
	// Custom Events
	CST_EVENT = win.smg.aem.customEvent;

	var namespace = win.smg.aem.components.home;

	if (namespace.videoSlickController) {
		return;
	}

	namespace.videoSlickController = (function() {
		var defParams = {
			wrap: '.unpacked201802-home-kv',
			commoncarouselwrap: '.cm-g-carousel-container',
			commoncarouselSlick: '.js-cm-carousel-container',
			videoctabtn: '.s-btn-round.js-video, .s-btn-encased.js-video',
			svideoarea: '.s-video-area',
			videoclosebtn: '.js-pop-close'
		};

		return {
			init : function(container, args) {
				if (!(this.container = container).size()) return;
				this.opts = UTIL.def(defParams, (args || {}));
				this.setElements();

				if (!this.$wrap.length) {return;}

				this.setBindEvents();
			},
			setElements: function() {
				this.$wrap = this.container.find(this.opts.wrap);
				this.$commonCarouselWrap = this.container.find(this.opts.commoncarouselwrap);
				this.$commoncarouselSlick = this.$commonCarouselWrap.find(this.opts.commoncarouselSlick);
				this.$videoCtaBtn = this.$commonCarouselWrap.find(this.opts.videoctabtn);
				this.$videoCloseBtn = this.$commonCarouselWrap.find(this.opts.videoclosebtn);
			},
			setBindEvents: function() {
				this.$videoCtaBtn.on('click.kvlayervideo', $.proxy(this.onPlayKvLayerVideo, this));
				this.$videoCloseBtn.on('click.kvlayervideo', $.proxy(this.onCloseKvLayerVideo, this));
			},
			onPlayKvLayerVideo: function(e) {
				e.preventDefault();

				var _this = this,
					target = $(e.currentTarget),
					targetVideo = $('#' + target.data('vid-data').divID),
					jsSlick = target.closest(this.opts.commoncarouselSlick);

				if (jsSlick.hasClass('slick-initialized')) {
					
					if (jsSlick.find('.slick-dots-autoplay').length) {
						this.togglePlayPauseShape(jsSlick, jsSlick.find('.slick-dots-autoplay > button'));	
					}
				}

				setTimeout(function() {
					_this.focusToVideoLayer(targetVideo);
				}, 50);
			},
			onCloseKvLayerVideo: function(e) {
				var target = $(e.currentTarget),
					jsSlick = target.closest(this.opts.commoncarouselwrap).find(this.opts.commoncarouselSlick);				
				
				if (jsSlick.hasClass('slick-initialized')) {
					if (jsSlick.find('.slick-dots-autoplay').length) {
						this.togglePlayPauseShape(jsSlick, jsSlick.find('.slick-dots-autoplay > button'));	
					}
				}
			},
			togglePlayPauseShape: function(carou, toggleBtn) {
				if (toggleBtn.hasClass('s-autoplay-pause')) {
					toggleBtn.removeClass('s-autoplay-pause');
					toggleBtn.addClass('s-autoplay-play');
					carou.slick('slickPause');
				} else {
					toggleBtn.removeClass('s-autoplay-play');
					toggleBtn.addClass('s-autoplay-pause');
					carou.slick('slickPlay');
				}
			},
			focusToVideoLayer: function(targetVideo) {
				targetVideo.attr('tabindex', 0).focus();
			}
		};
	})();

	$(function() {
		namespace.videoSlickController.init($('body'));
	});	

})(window, window.jQuery);

});