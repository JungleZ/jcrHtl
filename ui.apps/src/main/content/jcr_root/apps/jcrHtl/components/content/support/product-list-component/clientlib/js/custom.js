if($('.support_product_list').length > 0) {
	var isearchUrl = $(".support_product_list.clearfix").data('api-url');
	var pbi2Value = $.trim($(".support_product_list #sproduct_pbi2").attr('value'));
	var lag_more = "LOAD MORE"
	var plist = parseInt('10');
	var $pl = $('.product_item');
	var pl = $pl.length;
	var allsp = new Array();
	var iWinWidth = window.innerWidth || $(window).width();
	var _data = {"siteCode":SITE_CODE,"APP_NUM":APP_NUM,"templateType":"global","IsearchFlag":"byKey","tagMatch":"same","topFlag":"n","pageSize":plist,"filterFlag":"n"}
	var LAG_CON_ENTER_SEARCH_TERM = $(".support_product_list.clearfix").data("search-term-empty");
	var LAG_CON_LENGTH_2 = $(".support_product_list.clearfix").data("length-2-message");
	
	function productWrapPosition(e) {
	    if ($('.pl_screen_size').css('z-index')==4) {
	        $('.current .product_sub_cate').css('padding-bottom', 0);
	        if($('.product_cate.current').attr('pbi2') == "0"){
	        	_t = e.offset().top - $('.support_product_list').offset().top + 53
	        } else {
	        	_t =  e.offset().top - $('.support_product_list').offset().top + 23
	        }
	        $(".product_wrap").css({'position': 'absolute','top': _t});
	        e.css('padding-bottom', parseInt($(".product_wrap").height()) + 70);
	        if($('.product_cate.active').attr('pbi2') == "0"){
	        	var st = 150 + (parseInt($('.product_sub_cate.active').index()))* parseInt($('.product_sub_cate.active').height());
	      	    $('html,body').animate({ scrollTop: st + 'px' });
	    	}
	    	if($('#normal_nav .cookie_tip').is(':visible')){
	    		var _h = $('#normal_nav .cookie_tip').height() + $('#normal_nav .logo_wrap').height();
	    	}else{
	    		var _h =  $('#normal_nav .logo_wrap').height();
	    	}
	    	$('.support_product_list .search_form').css('top',_h + "px");
	    } else {
	        $(".product_wrap").css('position', 'static').show();
	        $('.product_cate.current,.product_sub_cate.current').addClass('active');
	        e.css('padding-bottom', 0);
	    }
	}

	function loadProducts(){
		for(var i = 0; i < pl; i++){
			allsp.push($pl.eq(i).find('span').text());
		}
		$('#pl-search-key').bind('input propertychange', function(event) { 
			var k = $.trim($(this).val());
			event = event || window.event;
			event.stopPropagation();
			if(k.length > 0){
				getRelPros(k);
			}else{
				clearSupList();
			}
		});
		$('#pl-search-key').on('focus',function(e){
			var k = $.trim($(this).val());
			event = event || window.event;
			event.stopPropagation();
			if(k.length > 0){
				getRelPros(k);
			}else{
				clearSupList();
			}
		});
	}

	function clearSupList(){
		$('.sup_pro_list>ul').empty();
		$('.sup_pro_list').hide();
	}

	function getRelPros(str){
		var $ps = $('.sup_pro_list>ul');
		$ps.empty();
		var reg = new RegExp(str,"i");
		var pl = allsp.length;
		for(var i=0; i < pl; i++){
			var t = allsp[i];
			if(reg.test(t)){
				$ps.append("<li class='rel_pro' onclick='searchLi(this)'>"+ HeightKey(t, str,'strong') +"</li>");	
			}
		}
		$ps.find('li').eq(0).addClass('default_pro');
		$ps.find('li').length > 0 ? $('.sup_pro_list').show() : $('.sup_pro_list').hide();
	}

	function searchLi(obj){
		$('#pl-search-key').val($(obj).text());
		$('#search').click();
		clearSupList();
	}

	function relShow(obj){
		var str = $.trim($(obj).val());
		getRelPros(str);
	}

	function supportPrListSearch(d){
		$('.no_result').hide();
		$.ajax({
			type:"GET",
			async:false,
			dataType:"jsonp",
			jsonp:"jsonp",
			url: isearchUrl, 				  
			data: d,
			success: function(data){
				analyticsSubmit("SiteSearch","SupportListPage",data.list[0].keywords + "_" + data.list[0].totalNum,EVENT_TYPE_PS_PRODUCT_LISTING_SEARCH);
				if(data.list[0].totalNum > 0) {
					setSerachList(data.list[0].alllist, data.list[0].totalNum);
				} else {
					$('.no_result').show();
					productWrapPosition($('.product_sub_cate.active'));
				}
			},
			error: function(){}
		});
	}

	function setSerachList(pros,num){
		var $p = $('.support_product_list .product_items');
		for(var i = 0; i < pros.length; i++){
			$p.append("<div class='product_item'><a href='"+ pros[i].DOC_URL +"'><img src='"+ pros[i].RESERVE_FIELD32 +"' alt='"+ pros[i].autn_title +"'><br><span>"+ pros[i].DRETITLE +"</a></div>");
		}
		var pl = $p.find('.product_item').length;
		if(pl == num){
			$('.support_product_list .isearch_more').hide()	;
		}else{
			$('.support_product_list .isearch_more').show()	;
		}
		productWrapPosition($('.product_sub_cate.active'));
	}
	loadProducts();
	$(document).ready(function(){
		productWrapPosition(($('.current .product_sub_cate.active') || $('.current .product_sub_cate')).eq(0));	
	})
	
	$(document).on('click','.search_form #search',function(e){
		var key = $.trim($('#pl-search-key').val())
		if (key.length <1) {
			alert(LAG_CON_ENTER_SEARCH_TERM);
		} else if(key.length <2) {
			alert(LAG_CON_LENGTH_2);
		}else{
			_data.ssUserText = key;
			_data.queryMatch = "support_product:" + pbi2Value;
			_data.mcCurPage = 1;
			$('.support_product_list .product_items').empty();
			$('.no_result').hide();
			$('.support_product_list .load_more').removeClass('ucm_more').addClass('isearch_more').hide();	
			supportPrListSearch(_data);
		}
	}).on('click','.ucm_more',function(e){
		var $pl = $('.support_product_list .product_item');
		var start = parseInt($('.support_product_list .product_item:visible').length);
		var end = start + plist;
		var end = (start + plist) >= pl ? pl : end;
		end >= pl ? $('.ucm_more').hide() : $('.ucm_more').show();
		for(var i=start; i<end; i++){
			$pl.eq(i).show();
		}
		productWrapPosition($('.product_sub_cate.active'));
	}).on('click','.isearch_more',function(e){
		_data.mcCurPage = _data.mcCurPage + 1;
		supportPrListSearch(_data);
	}).on('click','.product_cate',function(e){
		if ($('.pl_screen_size').css('z-index')==4 && $(this).hasClass('current') && $(this).attr('pbi2') != '0'){
			$('html,body').stop();
			$(this).toggleClass('active');
			if(!$(this).hasClass('active')){
				$(".product_wrap").hide();
			}else{
				$(".product_wrap").show();
				productWrapPosition($('.product_sub_cate.active'))	;
			}
		}
	}).on('click','.sup_others',function(e){
		if($('.pl_screen_size').css('z-index')==4){
			if($(this).parent().hasClass('current')){
				$(this).parent().toggleClass('active');
				$(".product_wrap").hide();
				$('.product_sub_cate.active').css('padding-bottom', 0).removeClass('active');
				productWrapPosition($('.product_sub_cate.active'));
			} else {
				window.location.href = $('.product_more .product_sub_cate').eq(1).find('a').attr('href');
			}
		} else {
			window.location.href = $('.product_more .product_sub_cate').eq(1).find('a').attr('href');
		}
	}).on('click','.product_more .product_sub_cate',function(e) {
		if ($('.pl_screen_size').css('z-index')==4 && $(this).hasClass('current')) {
			$(this).toggleClass('active');
			if(!$(this).hasClass('active')) {
				$(".product_wrap").hide();
			} else {
				$(".product_wrap").show();
			}
			productWrapPosition($('.product_sub_cate.active'));
		}
	}).on('keydown','.my_keys',function(event) {
		event = event || window.event;
		event.stopPropagation();	
		if(event.keyCode=='40' || event.keyCode=='38') {
			setSelectPor(event.keyCode);
		}else if(event.keyCode=='13') {
			$('.sup_pro_list .pro_selected').length > 0 ? $(this).val($('.sup_pro_list .pro_selected').text()) : '';
			$('#search').click();
		}
	}).on('click','.cookie_tip .close_btn',function(e) {
		var _h =  parseInt($('#normal_nav .logo_wrap').height());
	    $('.support_product_list .search_form').css('top',_h + "px");
	});

	$("body").off("click").click(function(e) {
		if(!$(e.target).attr("class")!="my_keys") {
			clearSupList();
		}
	});
	
	function setSelectPor(keyCode) {
		if($('.sup_pro_list .default_pro').length > 0) {
			$('.sup_pro_list .default_pro').addClass('pro_selected').removeClass('default_pro');
		} else {
			var $c = $('.sup_pro_list .pro_selected');
			if(keyCode == 38) {
				if($c.prev().length > 0) {
					$c.removeClass('pro_selected');
					$c.prev().addClass('pro_selected');
				}
			} else {
				if($c.next().length > 0) {
					$c.removeClass('pro_selected');
					$c.next().addClass('pro_selected');
				}
			}
		}
	}
	$(window).on("resize", function() {
	    productWrapPosition(($('.current .product_sub_cate.active') || $('.current .product_sub_cate')).eq(0));
	});
}