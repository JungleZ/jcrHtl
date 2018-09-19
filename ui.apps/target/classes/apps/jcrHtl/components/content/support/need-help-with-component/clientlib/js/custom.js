//pc
//$(document.body).width() >= 768 && $(".product_tab .menu:first").find('a').addClass('active');
//$(document.body).width() >= 768 && $(".bottom .submenu .first_name").find('a').addClass('active');
$(".product_tab .menu:first").find('a').addClass('active');
$(".bottom .submenu .first_name").find('a').addClass('active');
//center
$(".product_tab .menu a").on('click', function() {
    $(".product_tab .menu").find('a').removeClass('active');
    $(this).addClass('active');
    if ($(document.body).width() >= 768) {
        $(".product_tab .product_list").hide();
        $(this).parent().next().fadeIn();
    } else {
        if ($(this).parent().next().is(":visible")) {
            $(this).removeClass('active');
            $(this).parent().next().fadeOut();
        } else {
            $(".product_tab .product_list").hide();
            resizeScrollTop ($(this));
            $(this).parent().next().fadeToggle();
        }
    }
});

//bottom
$(".bottom .submenu .submenu_name a").on('click', function(){
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
            resizeScrollTop ($(this));
            $(this).parent().next().fadeToggle();
        }
    }
});

function resizeScrollTop (e){
    var menuTop = $(".head_module #normal_nav").height();
    var offsetTop = e.offset().top - menuTop - 60;
    $(document).scrollTop(offsetTop);
}



setTimeout('pImgHeight ()',200); 
$(window).on("resize", function(){
    pImgHeight ();
})

function pImgHeight() {
    if ($(window).width() > 767 && $(window).width() < 1024) {
        var pContent = $(".bottom .product_info:visible .product_content").height();
        var pImg_img = $(".bottom .product_info:visible .product_img img").height();
        var _top = (pContent - pImg_img) / 2;
        $(".bottom .product_info:visible .product_img").css('height', pContent).delay(100).css('paddingTop', _top);
    }else{
        $(".bottom .product_info:visible .product_img").css({
            paddingTop: 0,
            height: 'auto'
        });
    }
}