if(isContainFindAServiceStore && $('#mapType').val() == 'normal') {
		
	//@desc: google map
	function initMap(){
		$geocoder = new google.maps.Geocoder();
		initOption.geocoder = $geocoder;
        setInitMap(initOption);
	}
	commonFunctionMessage.eventHandler("#cService_serach_btn", "click", function(){
        var v_country = $("[data-countryid]").attr("data-countryid");
        var v_city = $("[data-cityid]").attr("data-cityid");
        var country_name = $("[data-countryid]").attr("data-countryname");
        var city_name = $("[data-cityid]").attr("data-cityname");
        analyticsSubmit("support > SERVICE CENTER","Submit",country_name + " + " + city_name,EVENT_TYPE_FIND_SERVICE_CENTER_COUNTRY_CITY);
        var _data = "";
        if(v_country == "0"){
            alert(_message.countryMessage);
            return false;
        }else if(v_city == "0"){
            alert(_message.cityMessage);
            return false;
        }
        _data = {'siteCode':SITE_CODE,'pageSize':'200','placeId':v_city,'curPage':'1'};
        ajaxRequireByServiceCenter.getAddressList(_data);
        
    });
    ajaxRequireByServiceCenter.getNetWorkPorvience();
	
	(function() {
	    //add region selector event
	    if (oSelector.get(0)) {
	        oSelector.addSelector().on('selected', function(ev, data) {
	            if (oSelector.find('.sc_city span').text() !== scCityCur) {
	                $('.conv3_sc_info').hide();
	                $('.sc_map_pop, .sc_map_icon').hide();
	            }
	        });;
	    }
	    $('.sc_search_btn').on('click', function() {
	        scCityCur = oSelector.find('.sc_city span').text();
	        //$('.sc_map_icon').show();
	        //$('body').scrollTop($('.conv3_sc_info li:nth-child(2)').position().top + $('.conv3_sc_info').position().top - $(window).height() + 40);
	    });
	    $('.sc_search_tit ul li').on('click', function() {
	        $('.sc_search_tit ul li').removeClass('active');
	        $(this).addClass('active');
	        if ($(this).hasClass('sc_icon_map')) {
	            oScMap.show();
	        } else {
	            oScMap.hide();
	        }
	    });
	    /*function getSCMapListHeight(){
	        if ($(document.body).width() > 768) {
	        	$('.conv3_sc_map').css('height',$(window).height()-75);
	        	$('.conv3_sc_map').css('min-height',$('.conv3_sc_search').offset().top + $('.conv3_sc_search').height());
	        	$('.conv3_sc_info').css('height',$('.conv3_sc_map').height()-(parseInt($(".conv3_sc_search").css("top"))+$(".conv3_sc_search").height()+10))
	    	}else{
	    	    $('.conv3_sc_info').css("height","");
	    	}
	    }
	    getSCMapListHeight();
	    $(window).on("resize.hMap",function(){
	        getSCMapListHeight();
	    })
	    */
		loadMapScript(site_language);
		getRoadMap();
	})();




	 var gotoMapTab = function(){
	     $('.sc_search_tit ul li').removeClass('active');
	     $(".sc_icon_map").addClass('active');
	     oScMap.css("display","block");
	 }
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
	            var _currentIcons = Stores[this.index_].currentIcon ? Stores[this.index_].currentIcon : "icon-red-mapwrap-anchor";
	            $(div).css({ border: "none", position: "absolute" });
	            $(div).bind("click", { infowindow: Stores[this.index_].infowindow, content: Stores[this.index_].content, marker: Stores[this.index_].marker }, MarkerClick);
	            var span = document.createElement("span");
	            $(span).css("text-align", "center").text(this.index_ + 1);
	            //$(span).addClass("icon-red-mapwrap-anchor");
	            $(span).addClass(_currentIcons);
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
	            if((store.latitude!= null && store.longitude!=null) || store.dimensionality!=null){
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
	            }
	            google.maps.event.addDomListener(document.getElementsByClassName(this.config.mapClass)[i], 'click', function (index) {
	                return function () {
	                    if((stores[index].latitude!= null && stores[index].longitude!=null) || stores[index].dimensionality!=null){
	                        gotoMapTab();
	                        setTimeout(function(){AnchorClick(index);},0);
	                    }else{
	                        alert(serviceStoreOptions.noServiceMapLocationMessage);
	                    }
	                }
	            } (i));
	            if((store.latitude!= null && store.longitude!=null) || store.dimensionality!=null){
	                NameOverlays[i] = new NameOverlay(latLng, i);
	            }else{
	                continue;
	            }
	        }
	        map.fitBounds(bounds);
	    }
	    function MarkerClick(ev) {
	        //ev.data.infowindow.setContent(ev.data.content);
	        //ev.data.infowindow.open(map, ev.data.marker);
	        for(var k=0; k<Stores.length; k++){
	            Stores[k].infowindow && Stores[k].infowindow.close();
	        }
	        ev.data.infowindow.setContent(ev.data.content);
	        ev.data.infowindow.open(map, ev.data.marker);
	    }
	    function AnchorClick(index) {
	        map.setCenter(Stores[index].marker.getPosition());
	        map.setZoom(16);
	        setTimeout(function () {
	            for(var k=0; k<Stores.length; k++){
	                Stores[k].infowindow && Stores[k].infowindow.close();
	            }
	            Stores[index].infowindow.setContent(Stores[index].content);
	            Stores[index].infowindow.open(map, Stores[index].marker);
	            var networkName = Stores[index].networkName;
	            analyticsSubmit("support > SERVICE CENTER","Click", networkName, EVENT_CLICK_FIND_SERVICE_CENTER);
	        }, 0);
	        if($('.sc_icon_map.active').length){
	            $(document).scrollTop($('.conv3_sc_map').offset().top-40);
	        }
	    }
	    return GoogleMaps;
	})();

	$(function(){
		document.getElementById("cService_serach_btn").addEventListener("touchstart",function(){
		 	$("#cService_serach_btn").addClass("active");  
		});
		document.getElementById("cService_serach_btn").addEventListener("touchend",function(){
		 	$("#cService_serach_btn").removeClass("active");   
		});
	});

	
}


	
