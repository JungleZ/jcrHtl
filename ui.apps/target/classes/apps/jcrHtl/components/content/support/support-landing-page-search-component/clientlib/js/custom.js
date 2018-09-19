if($(".top_banner").length > 0){
	
	// start change background image
	;(function($, window, undefined) {
		'use strict';

		var pluginName = 'change-background';

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
				landingBg1024_768 : that.options.landingBgPc,
				landingBg767 : that.options.landingBg767,
				landingBg420 : that.options.landingBg420,
				landingBg350 : that.options.landingBg350,
			};

			var resizeTimer;
			$(window).on(
					'resize.' + pluginName,
					function() {
						clearTimeout(resizeTimer);
						resizeTimer = setTimeout(function() {
							// Reset Background to use CSS
							that.element.css('background-image', '');

							if (window.innerWidth <= 350 && !!that.vars.landingBg350) {
								that.element.css('background-image', 'url(' + that.vars.landingBg350 + ')');
							} else if (window.innerWidth > 350 && window.innerWidth <= 420 && !!that.vars.landingBg420) {
								that.element.css('background-image', 'url(' + that.vars.landingBg420 + ')');
							} else if (window.innerWidth > 420 && window.innerWidth <= 767 && !!that.vars.landingBg767) {
								that.element.css('background-image', 'url(' + that.vars.landingBg767 + ')');
							} else if (window.innerWidth > 767 && window.innerWidth <= 1024 && !!that.vars.landingBg1024_768) {
								that.element.css('background-image', 'url(' + that.vars.landingBg1024_768 + ')');
							} else if (window.innerWidth > 1024 && !!that.options.landingBgDesktop) {
								that.element.css('background-image', 'url(' + that.vars.landingBgDesktop + ')');
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
	
    var browser=navigator.appName
    if(browser=="Microsoft Internet Explorer"){
        $(".my_keys").bind("propertychange",function(){ 
            var txt = $.trim($(this).val())
            if(txt.length > 0) {
                getRelPro(txt)
            }else{
                $(".rel_prodocuts").empty().hide()
            }
        })
    }else{    
        $(".my_keys").bind("input",function(){ 
            var txt = $.trim($(this).val())
            if(txt.length > 0) {
                getRelPro(txt)
            }else{
                $(".rel_prodocuts").empty().hide()
            }
        })
    }
    $("body").off("click").click(function(e){
        if($(e.target).attr("class")!="my_keys"){$('.rel_prodocuts').hide()}
    })
    $(document).on('keydown','.my_keys',function(event){
        var $l = $('.rel_prodocuts  a')
        event = event || window.event;
        event.stopPropagation();
        if(event.keyCode=='40' || event.keyCode=='38') {
            setSelectPor(event.keyCode)
        }else if(event.keyCode=='13'){
            if($(".rel_prodocuts .color-selected").length > 0){
                valmykey($(".rel_prodocuts .color-selected"))
            }else{
                keysSearch()
            }
            $('.rel_prodocuts').hide()
        }
    }).on("click","#search",function(){
         keysSearch();
    });
    function setSelectPor(keycode){
        if($('.rel_prodocuts li.default-pro').length >0){
            $('.rel_prodocuts li.default-pro').addClass('color-selected').removeClass('default-pro')
        }else{
            var $c = $('.rel_prodocuts .color-selected')
            if(keycode == 38){
                if($c.prev().length > 0){
                    $c.removeClass('color-selected')
                    $c.prev().addClass('color-selected')
                }
            }else{
                if($c.next().length > 0){
                    $c.removeClass('color-selected')
                    $c.next().addClass('color-selected')
                }
            }
        }
    }
    function goSearch(obj){
    	analyticsSubmit("SiteSearch","SupportSearch",encodeURIComponent($(obj).text()),EVENT_TYPE_SP_LANDING_PAGE_SEARCH);
        window.location.href = $("#support_search").val() + "?keywords=" + encodeURIComponent($(obj).text()) + "&t=HotSearch"
    }
    function keysSearch(){
    	var LAG_CON_ENTER_SEARCH_TERM = $(".top_banner").data("search-term-empty");
    	var LAG_CON_ENTER_MORE_TERM = $(".top_banner").data("more-term-message");
        var key = $.trim($(".my_keys").val())
        if(key.length == 0){
            alert(LAG_CON_ENTER_SEARCH_TERM)
            return false;
        }else if(key.length == 1){
            alert(LAG_CON_ENTER_MORE_TERM)
            return false;
        }else{        
        	analyticsSubmit("SiteSearch","KeySearch",encodeURIComponent(key),EVENT_TYPE_SP_LANDING_PAGE_SEARCH);
            window.location.href = $("#support_search").val()  + "?keywords=" + encodeURIComponent(key) + "&t=SupportSearch"
            return false;
        }
    }
    function hasRel(obj){
        var t = $.trim($(obj).val())
        getRelPro(t)    
    } 
    function getRelPro(r_text){
        var relproparams = {}
        relproparams.productCode = r_text
        relproparams.siteCode = SITE_CODE
        relproparams.pageSize = 6
        relproparams.curPage = 1
        $(".rel_prodocuts").empty()
        
        var apiRelProDefault = "http://consumer.huawei.com/support/services/service/product/info/list";
        
          $.ajax({
              type: 'GET',
              async:false,
              url: ($("#apiRelProURL").val() || apiRelProDefault),
              contentType: "application/x-www-form-urlencoded; charset=utf-8",
              data:relproparams,
              dataType: 'jsonp', 
              jsonp: 'jsonp', 
            success: function(data) {       
                if(data.length > 0){
                    $(".rel_prodocuts").empty()
                    for(var i = 0; i < data.length; i++){
                        var txt = data[i].productTypeName?data[i].productTypeName:data[i].productCode
                        var fname = data[i].familyName?data[i].familyName:data[i].productCode                    
                          $(".rel_prodocuts").show().append("<li onclick='valmykey(this)' productCode='" +fname+"' parentId ='" + data[i].parentId+"'>"+HeightProKey(txt,relproparams.productCode)+"</li>");
                    }
                    $(".rel_prodocuts li").eq(0).addClass('default-pro')
                }else{
                    $(".rel_prodocuts").empty().hide()
                }    
            },
              error: function(msg){}
        });    
    }
    /*search keyEvent*/
    function valmykey(obj){
         $(".my_keys").val($(obj).text());
         $('.rel_prodocuts').hide();
         isearchByPcode(obj);
         
    }
    function isearchByPcode(obj){
    	var LAG_CON_SEARCH_NO_RESULTS = $(".top_banner").data("no-results-message");
        var params = {"ssUserText":$(obj).attr("productCode"),"templateType":"product", "siteCode":SITE_CODE, "APP_NUM":APP_NUM,"queryMatch":"support_product:no","IsearchFlag":"byCode","tagMatch":"support_product:no","topFlag":"n","mcCurPage":"1","pageSize":"12","filterFlag":"n"};
        $.ajax({
              type: 'GET', 
              async:false,
              url: $("#isearchUrl").val(),
              contentType: "application/x-www-form-urlencoded; charset=utf-8",
              data:params,
              dataType: 'jsonp', 
              jsonp: 'jsonp', 
            success: function(data) {
                if(data.list[0].totalNum > 0){
                    window.location.href = data.list[0]['alllist'][0].autn_reference
                }else{
                    alert(LAG_CON_SEARCH_NO_RESULTS)
                }                         
            },
              error: function(msg){}
        });
    }
}
