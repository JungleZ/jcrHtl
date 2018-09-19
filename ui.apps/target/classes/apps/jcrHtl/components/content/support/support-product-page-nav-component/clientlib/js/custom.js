(function() {
	$(document).ready(function() {
		// show/hide by anchor exists
		if(typeof $(".product_menu").data("isedit") == 'undefined'){
			$(".product_menu li a").each(function(i, item) {
				var $item = $(item);
				var anchor = $item.attr("href");
				if ($(anchor).length == 0) {
					$item.parent().hide();
				}
			});
		}
	});
})();
