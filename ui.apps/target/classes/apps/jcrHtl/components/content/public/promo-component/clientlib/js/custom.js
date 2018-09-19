if($('.conv3_promo_page_wrap').length > 0) {
;(function ( $ ) {
	var plist = parseInt('5');
	var $pl = $('.press-list2-item');
	var pl = $pl.length;
	
	$(document).on('click', '#view-more-btn', function(e) {
		var $promoList = $(".conv3_promo_page_wrap .press-list2-item")
		var start = parseInt($(".conv3_promo_page_wrap .press-list2-item:visible").length)
		var end = start + plist;
		var end = start + plist >= pl ? pl : end
		end >= pl?$('.load_more').hide():$('.load_more').show()
		for (var i=start; i<end; i++) {
			$promoList.eq(i).show()
		}
	})
	})( jQuery );
}