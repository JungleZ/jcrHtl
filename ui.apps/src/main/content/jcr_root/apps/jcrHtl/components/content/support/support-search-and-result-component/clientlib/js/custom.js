if($('.support-search-and-result-comp').length > 0) {
	;(function( $ ) {
		var k = decodeURIComponent($.trim(getURLParam("keywords")))
		var searchType = decodeURIComponent($.trim(getURLParam("t")))
		var supportSearchAndResultDiv = $(".support-search-and-result-comp"); 
		var tagMatch = supportSearchAndResultDiv.data('tag-match');
		var isearchUrl = supportSearchAndResultDiv.data('api-url');
		var pageSize = supportSearchAndResultDiv.data('page-size') || parseInt('5');
		var enter_keywords = supportSearchAndResultDiv.data('lag-enter-search-term') || 'Enter the product model or keywords';
	    var m_data = {"siteCode":SITE_CODE,"APP_NUM":APP_NUM,"templateType":"support","mcCurPage": "1", "pageSize":pageSize,"tagMatch":tagMatch,"first":"1","topMatch":"support_product:no"};
	    var ga_Type="manual";
	    var tempListHeight = 0;
	    var LAG_CON_SEARCH_NO_RESULTS = supportSearchAndResultDiv.data("no-results-message");
	    var LAG_CON_LENGTH_90 = supportSearchAndResultDiv.data("length-90-message");
	    var LAG_CON_LENGTH_2 = supportSearchAndResultDiv.data("length-2-message");
	    var LAG_CON_ENTER_MORE_TERM = supportSearchAndResultDiv.data("more-term-message");
		
		window.scrollTo(0, 0);
		function returnVariable(field){
			if(field){
		 		return field;
	 		}
	 		return "";
		}
		function getReslutHeight(obj){
		    if (window.innerWidth >= 768) {
		        $(obj).attr("data-state","show").show();	
	        	$(".search_result").height($(obj).height() + 112);
	    	} else {
	    	    if($(obj).prev().hasClass('active')){
	    	        $(obj).attr("data-state","show").show();
	    	        //$(document).scrollTop($(obj).prev().offset().top - 60);
	    	    }else{
	    	        $(obj).attr("data-state","hide").hide();
	    	    }
	    	}
		}
		function searchByKeys(_data,$target){
		    var asyncTime = 1000;
		    if($target){
		        if(!$($target).hasClass("more_btn")){
		            $(".search_result").css("height","");
		            getLoad($($target));
		        }else{
		            asyncTime = 0;
		        }
		    }else{
		        getLoad($(".result_details:eq(0)"));
		    }	    
			$.ajax({
				type:"GET",
				url: isearchUrl,			  		  	  		  
				dataType:"jsonp",
				jsonp:"jsonp",
				data:_data,
				success: function(data){
				    if(!$target){window.scrollTo(0, 0);}
				    setTimeout(function(){
				        if(!$target){window.scrollTo(0, 0);}
						var r = data.list[0];

						// Add analytic for Support Search & Result component 
						var searchType = _data.searchType;
						if (searchType) {
							var siteSearchKeyword = r.keywords;
							var searchResultQuantity = r.totalNum;
							var lab = siteSearchKeyword + "_" + searchResultQuantity;
							var eventTypeSearch = "";

							// SupportSearch is via user input
							if (searchType === EVENT_TYPE_SUPPORT_SEARCH) {
								eventTypeSearch = EVENT_TYPE_SUPPORT_SEARCH;
							// Hot Search is redirected from Support Landing Page Search component
							} else if (searchType === EVENT_TYPE_HOT_SEARCH) {
								eventTypeSearch = EVENT_TYPE_HOT_SEARCH;
							}

							if (searchType === EVENT_TYPE_SUPPORT_SEARCH || searchType === EVENT_TYPE_HOT_SEARCH) {
								analyticsSubmit("SiteSearch", searchType, lab, eventTypeSearch);
							}

							// Add analytics for search result clicked
							if (searchType === "resultClick") {
								var faqsCount = r.tagValue["faqs"];
								var manualsCount = r.tagValue["manual"];
								var downloadsCount = r.tagValue["software"];
								var options = {searchTerm: r.keywords, faqsCount: faqsCount, manualsCount: manualsCount, downloadsCount: downloadsCount};
								analyticsSubmit("SiteSearchResult", "SiteSearchResultClick", _data.labelSelected, EVENT_TYPE_SUPPORT_SEARCH_AND_RESULT, options);
							}
						}

						var topP = r.productlist;
						var _l = r.alllist;
						var tr = r.tagValue[_data.type];
						$(".data-load").remove();	
						if(_data.first == "1" || _data.first == 1){
							var tags = tagMatch.substring(tagMatch.indexOf(":") + 1)
							if (tags.indexOf(",") > 0) {
								var tagList = tags.split(",")
								for (var i = 0; i < tagList.length; i++) {
									var id = "#" + tagList[i] + "_num"
									$(id).text("("+ r.tagValue[tagList[i]] +")")
								}
							} else if (tags !== '') {
								$("#" + tags + "_num").text("(" + r.tagValue[tags] + ")")
							}
							$('#sup_search_num').val(r.totalNum)
						}
						
						if(topP && topP.length>0 && (_data.first == "1" || _data.first == 1)){			
							searchTopProduct(topP)
						}else{
							if($("#support_prolist").css("display")=="none"){
								$("#ucm_sup_prolist").show()
							}
						}	
						if(tr > 0){
							for(var i = 0; i < _l.length; i++){
								var t = _l[i].RESERVE_FIELD22
								if(t=="faqs"){
									var $list1 = $("#newline-clone").find("li").clone()
									$list1.find("a").addClass("a-1").attr("href",returnVariable(_l[i].DOC_URL))
									$list1.find("h4").append(returnVariable(_l[i].DRETITLE))
									$list1.find("p").text(returnVariable(_l[i].RESERVE_FIELD11))
									$("#faqs_show_list").append($($list1).css('opacity', 0).animate({'opacity': 1}));
								}else if(t =="manual" || t =="software"){
									var $list2 = $("#download-clone").find("li").clone()
									$list2.find(".details_download_btn").attr({"href":_l[i].RESERVE_FIELD33,"name":ga_Type}).attr("act","Download " + t).attr("lab",_l[i].autn_title)
									$list2.find("h4").append(returnVariable(_l[i].DRETITLE))
									$list2.find("p").text(returnVariable(_l[i].RESERVE_FIELD11))
									if(t =="manual")
								    	$("#manual_show_list").append($($list2).css('opacity', 0).animate({'opacity': 1}));
									else if(t =="software")
								    	$("#software_show_list").append($($list2).css('opacity', 0).animate({'opacity': 1}));
								}
							}
							
							$(".details_download_btn").click(function(){
							if(ga_Type=="faqs"){
	 							var _value ='{"con_key3":"'+ga_Type+'","con_key4":"'+$('.search_pro_name').text()+'","con_key5":"supisearch","con_key6":"'+$(this).next('h4').text()+'","con_key7":"faq-detail"}';
	 						//	trackEvent("supisearch","'+('.search_pro_name').text()+'",ga_Type,_value);
							}else{
								var _value ='{"con_key3":"'+ga_Type+'","con_key4":"'+$('.search_pro_name').text()+'","con_key5":"supisearch","con_key6":"'+$(this).next('h4').text()+'","con_key7":"sup-downloads"}';
	 						//	trackEvent("supisearch","'+('.search_pro_name').text()+'",ga_Type,_value);
							}
							})	
							if(m_data.pageSize * m_data.mcCurPage < tr){
								$("#"+m_data.type+"_load_more_btn").show()
							}else{
								$("#"+m_data.type+"_load_more_btn").hide();
							}	
						}else{
							$("#"+m_data.type+"_load_more_btn").hide();
							$("#"+m_data.type+"_show_list").empty().append("<span id='no-results'>" + LAG_CON_SEARCH_NO_RESULTS +"");
						}							
						getReslutHeight($("#"+m_data.type+"_show_list").parent(".result_details"));	
						$(window).on("resize.fglist",function(){
					    	getReslutHeight($("#"+m_data.type+"_show_list").parent(".result_details"));
						})
					},asyncTime)	
				},
				error: function(){
				    $(".data-load").remove();
				}
			});	
		}
		function searchTopProduct(products){ 
			for(var i = 0; i < products.length; i++){
				var p = $("#top-product-clone").clone().find("li");
				p.find("img").attr("alt",returnVariable(products[i].autn_title));
				p.find("a").attr("href",products[i].DOC_URL);
				p.find("img").attr("src",returnVariable(products[i].RESERVE_FIELD32));
				p.find(".title").text(returnVariable(products[i].autn_title));
				$("#support_prolist").append(p);
				//if(i != products.length -1) $("#support_prolist").append("<li class='li-border'></li>")
			}
			$("#support_prolist").show();
			$("#ucm_sup_prolist").hide();
		}
		$(".search_result .result_menu").on("click",function(){
		    if(k){
		        $(".search_result .result_details").attr("data-state","hide").hide();
		        $(".search_result .show_list").empty();
				$(".search_result .more_btn").hide();
	    		if(window.innerWidth < 768){
	    		    /*$("html,body").animate({
				    	scrollTop: $(this).offset().top - $(this).height()
					},300)*/
					$(document).scrollTop($(this).offset().top - $("#normal_nav .cookie_tip:visible").height() - 60);
	    	    	if($(this).hasClass('active')){
	    	        	$(this).removeClass('active');
	    	        	return false;
	    	    	}else{
	    	    	    $(".search_result .result_menu").not($(this)).removeClass('active');
	    	        	$(this).addClass('active');
	    	    	}
	    		}else{
	    	    	$(".search_result .result_menu").removeClass('active');
	    	    	$(this).addClass('active');
	    		}
	    		
	    		m_data.type=$(this).find("a").attr("type");
				m_data.queryMatch =  "support:" + $(this).find("a").attr("type");
				ga_Type=$(this).find("a").attr("type");
				m_data.mcCurPage = 1;
				m_data.first = 0;
				m_data.searchType = "resultClick";
				
				var labelSelected  = $(this).find("a").text();
				if (labelSelected && labelSelected.includes("(")) {
					var indexOfSeparator = labelSelected.indexOf("(");
					labelSelected = labelSelected.substr(0, indexOfSeparator);
					m_data.labelSelected = labelSelected;
				}
				
				searchByKeys(m_data,$(this).next(".result_details"))
			}
		})
		$(".search_result .more_btn").click(function(){
			m_data.mcCurPage = parseInt(m_data.mcCurPage) + 1;
			m_data.first = 0;
			m_data.searchType = "";
			searchByKeys(m_data,this);
		});
		function new_search(){
			var k = $.trim($("#fill_keywords").val());
			$('.sup_pro_list').hide();
			if(k == "" || k == "Enter keywords"){
				alert(enter_keywords);
			}else if(k.length < 2){
				alert(LAG_CON_ENTER_MORE_TERM);
			}else{
				window.location = $("#support-search-url").attr("href") +"?keywords=" + encodeURIComponent(k) + "&t=SupportSearch";
			}	
		}
		$(".search_bar #search").on("click",function(){
		    new_search();
		})
		$("#fill_keywords").on("keypress",function(e){
		    var event = e || window.event;
		    if(event.keyCode=='13'){
		    	if (event.preventDefault){
		        	event.preventDefault();
		    	}else{
		        	event.returnValue = false;
		    	}
		    	new_search();
		    }
		})
		
		$(document).ready(function(){
			firstSearch(k, searchType);	
		});
		function firstSearch(k, searchType){
			if(k){
				if(k.length>90){
					alert(LAG_CON_LENGTH_90)
				}else if(k.length>1){
					$("#fill_keywords").val(k);
					$(".search_bar .search_pro_name").text(k)
					
					if (tagMatch != null) {
						var queryMatch = tagMatch.indexOf(",") > 0 ? tagMatch.substring(0, tagMatch.indexOf(",")) : tagMatch;
						if (queryMatch != null && queryMatch.indexOf(":") > 0) {
							var type = queryMatch.substring(queryMatch.indexOf(":") + 1);
						}
					}
					m_data.queryMatch = queryMatch
					m_data.type= type
					m_data.ssUserText = encodeURIComponent(k)
					m_data.searchType = searchType
					//getLoad($(".result_details:eq(0)"));
					//setTimeout(function(){searchByKeys(m_data)},1000);
					searchByKeys(m_data);
				}else{
					alert(LAG_CON_LENGTH_2);
				}
			}else{
				$("#ucm_sup_prolist").show()
			}
		}
		
		function getLoad(tag){
	    	var d_left, d_top;
	    	$(tag).show().prepend("<div class='x-mask-com data-load'><div class='d-load-img x-waite'></div></div>");
	    	$(".data-load").css({"width":$(tag).width(),"height":$(tag).height()==0?299:$(tag).height()}).show();
	    	d_left = ($(".data-load").width()-$(".d-load-img").width()/2) / 2;
	    	d_top = ($(".data-load").height()-$(".d-load-img").height()/2) / 2;
	    	//d_top = tempListHeight + ($(".data-load").height() - tempListHeight - $(".d-load-img").height()) / 2;
	    	$(".d-load-img").css({"top":d_top,"left":d_left});
		}
		$(document).on("mouseover","#ucm_sup_prolist>li",function(){
		    if(window.innerWidth > 1023){
		        $(this).find("a").css("color","#c52525");
		    }
		})
		.on("mouseout","#ucm_sup_prolist>li",function(){
		    $(this).find("a").css("color","#000");
		})
	})( jQuery );
}