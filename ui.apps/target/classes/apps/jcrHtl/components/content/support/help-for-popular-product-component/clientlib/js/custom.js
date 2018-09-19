$(".bottom .product_info").hide();
$(".bottom .submenu:first .submenu_name a:first").addClass('active');
$(".bottom .submenu .submenu_name").find('a.active').parent().next().fadeIn();
$(".bottom .submenu.editor").find('.product_info').fadeIn();

$(".bottom .submenu .submenu_name a").on('click', function(){
	if ($(this).hasClass('active')) {
		return;
	}
    $(".bottom .submenu .submenu_name").find('a').removeClass('active');
    $(this).addClass('active');
    if ($(document.body).width() >= 768) {
        $(".bottom .product_info").hide();
        $(this).parent().next().fadeIn();
        pImgHeight ();
    } else {

        if ($(this).parent().next().is(":visible")) {
            $(this).removeClass('active');
            $(this).parent().next().fadeOut();
        } else {
            $(".bottom .product_info").hide();
            resizeScrollTop($(this));
            $(this).parent().next().fadeToggle();
        }
    }
});

function resizeScrollTop (e){
    var menuTop = $(".head_module #normal_nav").height();
    var offsetTop = e.offset().top - menuTop - 60;
    $(document).scrollTop(offsetTop);
}