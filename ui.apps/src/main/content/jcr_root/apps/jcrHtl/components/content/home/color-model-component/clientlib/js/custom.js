if ($(".section2.home_section2_banner").length > 0) {
	$('.section2 ol li').eq(0).addClass('active');
	$(document).on('click','.section2 ol li',function(e){
		$(this).find('i').css('border-color',$(this).css('background-color')); 
		$('.section2 .delay400 li').removeClass('active');
		if(!$(this).hasClass('active')){
			$(this).addClass('active')
			$('.section2 .phone').hide();
			$('.section2 .phone').eq($(this).index()).fadeIn();
		}
	});	
}
