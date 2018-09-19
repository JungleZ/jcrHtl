if ($('.conv3_wrap.conv3_sup_recy_lattpoint_wrap .conv3_recyle_content .srp_map').length) {
	
	// options
	var options = options || {};
	options.provinceErrorMessage = $('#provinceErrorMessage').val();
	options.cityErrorMessage = $('#cityErrorMessage').val();
	options.noResultMessage = $('#noResultMessage').val();
	options.provinceUrl = $('#provinceUrl').val();
	options.cityUrl = $('#cityUrl').val();
	options.recycleAddressUrl = $('#recycleAddressUrl').val();
	options.defaultLocation = $('#defaultLocation').val() ? $('#defaultLocation').val() : 'beijing';
	options.noServiceMapLocationMessage = $('#noServiceMapLocationMessage').val();
	options.popupSearchDefaultText = $('#popupSearchDefaultText').val();
	options.popupButton1Text = $('#popupButton1Text').val();
	options.popupButton2Text = $('#popupButton2Text').val();
	options.defaultCityText = $('#defaultCityText').val();
	
	// main content
	var icon_adr = "/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_address.png",
	icon_phone = "/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_phone.png",
	icon_time = "/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_time.png",
	map_list_icon = '/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_red_map.png';
	var $geocoder = "";
	var initOption = {"address": options.defaultLocation,"id": "map_canvas"};
	var addresslist =  new Array();
	var _message = {
		"countryMessage": options.provinceErrorMessage,
		"cityMessage": options.cityErrorMessage,
		"noResultMessage": options.noResultMessage,
		"city": options.defaultCityText
	}
	var navigatoion_msg = {
        "add_form": options.popupSearchDefaultText,
        "add_goto1": options.popupButton1Text,
        "add_goto2": options.popupButton2Text
    };
//	var map_list_icon = '/en/ucmc/groups/public/documents/webasset/img_con_v27_icon_red_map.png';
	var oSelector = $('.conv3_recyle_content .conv3_global_selector'),
	scCityCur = undefined,
	oScMap = $('.srp_map');
	
	//@desc: google map
	function initMap(){
		$geocoder = new google.maps.Geocoder();
		initOption.geocoder = $geocoder;
	    setInitMap(initOption);
	}
	
	(function(){
	    var initSelectorAction = function(){
	        if (oSelector.get(0)) {
	    		oSelector.addSelector().on('selected', function(ev, data) {
	        		if (oSelector.find('.srp_city span').text() !== scCityCur) {
	            		$('.srp_info').hide();
	            		$('.srp_map_pop, .srp_map_icon').hide();
	        		}
	    		});
			}
			$('.srp_search_tit ul li').on('click', function() {
	    		$('.srp_search_tit ul li').removeClass('active');
	    		$(this).addClass('active');
	    		if ($(this).hasClass('sc_icon_map')) {
	        		oScMap.show();
	    		} else {
	        		oScMap.hide();
	    		}
			});
			/*function getMapListHeight(){
			    if ($(document.body).width() > 768) {
	    			if($('#normal_nav .cookie_tip').is(":hidden")){
	    		    	$('.srp_map').css('height',$(window).height()-$('.srp_map').offset().top+$('.conv3_recyle_nav').height());
	    			}else{
	    		    	$('.srp_map').css('height',$(window).height()+$('#normal_nav .cookie_tip').height()-$('.srp_map').offset().top+$('.conv3_recyle_nav').height());
	    			}
	    			$('.srp_map').css("min-height",$(".srp_search").offset().top + $(".srp_search").height()+10)
	    			$('.srp_info').css('height',$('.srp_map').height()-(parseInt($(".srp_search").css("top"))+$(".srp_search").height()+10));
				}else{
				    $('.srp_info').css("height","");
				}
			}
			getMapListHeight();
			$(window).on("resize.supHMap",function(){
	    		getMapListHeight();
			})
			*/
	    }
		commonFunctionMessage.eventHandler("#cPoint_serach_btn","click",function(){
		    var v_country = $("[data-countryid]").attr("data-countryid");
	    	var v_city = $("[data-cityid]").attr("data-cityid");
	    	var v_countryname = $("[data-countryid]").attr("data-countryname");
	    	var v_cityname = $("[data-cityid]").attr("data-cityname");
	    	var _data = "";
	    	if(v_country == "0"){
	        	alert(_message.countryMessage);
	        	return false;
	    	}else if(v_city == "0"){
	        	alert(_message.cityMessage);
	        	return false;
	    	}
	    	//$('body').scrollTop($('.srp_info li:nth-child(2)').position().top + $('.srp_info').position().top - $(window).height() + 40);
	    	_data = {"siteCode": SITE_CODE, "pageSize": 100, "curPage": 1, "placeId": v_country};
	    	ajaxRequireByLatticepoint.getRecycleAddressList(_data);
	    	analyticsSubmit("support > Query Recycling Station","Submit",v_countryname + "+" + v_cityname,EVENT_TYPE_SEARCH_RECYCLING_POINT);
		})
//		$(document).ready(function(){
		    initSelectorAction();
		    ajaxRequireByLatticepoint.setRecycleProvince();
//		})
	})()
	function getPositionInMap(dataStores){
	    var googleMaps = new GoogleMaps(
	        {
	            ElementId: "map_canvas",
	            zoom: 8,
	            mapClass: 'recy-map-info-list'
	        });
	        var eachNum = [];
	        dataStores.forEach(function(val,index){
	            //console.log("=----="+index);
	            $geocoder.geocode(
	                {'address': dataStores[index].address},
	                function(results, status){
	                    //console.log("*******"+index);
	                    eachNum.push(index);
	                    if(dataStores[index].longitude == null || dataStores[index].latitude == null){
	    	               if (status == google.maps.GeocoderStatus.OK) {
	    	                	var _location = results[0].geometry.location;
	    	                	dataStores[index].longitude = _location.lng();
	    	                	dataStores[index].latitude = _location.lat();
	    	            	} 
	    	            }
	    	            if(eachNum.length == dataStores.length){
	    	                googleMaps.SetMarkers(dataStores)
	    	            };
	                }
	            )
	        })
	}
	loadMapScript(site_language);
	getRoadMap();
	
	var GoogleMaps = (function () {
	var map;
	var Stores = [];
	var m_zoom = '';
	var NameOverlays = new Array();
	function GoogleMaps(config) {
	    this.config = config;
	    this.map = new google.maps.Map(document.getElementById(this.config.ElementId), {
	        zoom: config.zoom
	    });
	    this.Stores = [];
	    map = this.map;
	    m_zoom = config.zoom;
	
	    NameOverlay.prototype = new google.maps.OverlayView();
	
	    NameOverlay.prototype.onAdd = function () {
	        var div = document.createElement('DIV');
	        $(div).css({ border: "none", position: "absolute" });
	        $(div).bind("click", { infowindow: Stores[this.index_].infowindow, content: Stores[this.index_].content, marker: Stores[this.index_].marker }, MarkerClick);
	        var span = document.createElement("span");
	        $(span).css("text-align", "center").text(this.index_ + 1);
	        $(span).addClass("icon-red-mapwrap-anchor");
	        $(div).append($(span).prop("outerHTML"));
	        this.div_ = div;
	        var panes = this.getPanes();
	        panes.overlayImage.appendChild(div);
	        map.setZoom(m_zoom);
	    }
	    NameOverlay.prototype.draw = function () {
	        var overlayProjection = this.getProjection();
	        var center = overlayProjection.fromLatLngToDivPixel(this.point_);
	        var div = this.div_;
	        div.style.left = (center.x - 10) + 'px';
	        div.style.top = (center.y - 2) + 'px';
	    }
	    NameOverlay.prototype.onRemove = function () {
	        this.div_.parentNode.removeChild(this.div_);
	        this.div_ = null;
	    }
	    NameOverlay.prototype.show = function () { if (this.div_) this.div_.style.visibility = "visible"; }
	    NameOverlay.prototype.hide = function () { if (this.div_) this.div_.style.visibility = "hidden"; }
	
	}
	
	function NameOverlay(point, index) {
	    this.point_ = point;
	    this.index_ = index;
	    this.div_ = null;
	    this.setMap(map);
	}
	
	
	/* stores:Array<{longitude:number,latitude:number ,title:string,subTitle1:string,subTitle2:string,mapClass:string}> */
	GoogleMaps.prototype.SetMarkers = function (stores) {
	    Stores = stores;
	    var bounds = new google.maps.LatLngBounds();
	
	    for (var i = 0; i < stores.length; i++) {
	
	        var store = stores[i];
	        var latLng = new google.maps.LatLng(store.latitude, store.longitude);
	        var marker = new google.maps.Marker({
	            position: latLng,
	            map: map,
	            icon: 'z',
	            title: ''
	        });
	        var infowindow = new google.maps.InfoWindow();
	        //var content = '<span>' + store.title + '<br /><span>' + store.subTitle1 + '</span><br /><span>' + store.subTitle2 + "</span>";
	        var content = drawServiceMapWindowInfo(store);
	        
	        bounds.extend(latLng);
	        store.infowindow = infowindow;
	        store.content = content;
	        store.marker = marker;
	
	        google.maps.event.addDomListener(document.getElementsByClassName(this.config.mapClass)[i], 'click', function (index) {
	            return function () {
	                if((store.latitude!= null && store.longitude!=null) || store.dimensionality!=null){
	                    //gotoMapTab();
	                    setTimeout(function(){AnchorClick(index);},0);
	                }else{
	                    alert(options.noServiceMapLocationMessage);
	                }
	            }
	        } (i));
	        if((store.latitude!= null && store.longitude!=null) || store.dimensionality!=null){
	            NameOverlays[i] = new NameOverlay(latLng, i);
	        }else{
	            continue
	        }
	    }
	    map.fitBounds(bounds);
	}
	function MarkerClick(ev) {
	    //ev.data.infowindow.setContent(ev.data.content);
	    //ev.data.infowindow.open(map, ev.data.marker);
	    Stores[0].infowindow.setContent(ev.data.content);
	    Stores[0].infowindow.open(map, ev.data.marker);
	}
	function AnchorClick(index) {
	    map.setCenter(Stores[index].marker.getPosition());
	    map.setZoom(13);
	    setTimeout(function () {
	        Stores[0].infowindow.setContent(Stores[index].content);
	        Stores[0].infowindow.open(map, Stores[index].marker);
	    }, 0);
	    if($('.conv3_recyle_content .srp_info').css('position')=='relative'){
	        $(document).scrollTop($('.srp_map').offset().top-40);
	    }
	}
	return GoogleMaps;
	})();

}
	
	