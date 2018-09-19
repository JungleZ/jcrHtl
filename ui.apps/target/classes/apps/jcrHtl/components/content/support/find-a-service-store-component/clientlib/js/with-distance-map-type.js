if(isContainFindAServiceStore && $('#mapType').val() == 'withDistance') {
	
	function getinitMapObj(map_obj){
	    sc_maps = map_obj;
	}
	function initMap(){
		$geocoder = new google.maps.Geocoder();
		initOption.geocoder = $geocoder;
        setInitMap(initOption,getinitMapObj);
	}
	function clearMarkers(){
		for(var i =0 ; i < NameOverlays.length; i++ ){
			NameOverlays[i].setMap(null)
		}
		NameOverlays.length = 0
		infowindowarr.length = 0
		markersry.length = 0
		markerInfo_5.length = 0
		markerInfo_10.length = 0
		markerInfo_25.length = 0
		markerInfo_50.length = 0
	}
	$('.sc_search_tit ul li').on('click', function() {
        $('.sc_search_tit ul li').removeClass('active');
        $(this).addClass('active');
        if ($(this).hasClass('sc_icon_map')) {
            oScMap.show();
        } else {
            oScMap.hide();
        }
    });
    function setCenterPoint(markerLatLng){
		var marker = new google.maps.Marker({
			position: markerLatLng, 
			map: sc_maps, 
			opacity:1,
			icon:'',
			title:'' 
		});
		marker.setMap(sc_maps);
	}
	commonFunctionMessage.eventHandler("#cService_serach_btn", "click", function(){
        var fulladr = $.trim($(".my_keys").val());
        var _data = {};
        if(fulladr == "" || fulladr == $placeholder || fulladr == ","){
            alert(note_input_adr);
            return false;
        }
        for(var i = 0; i < infowindowarr.length; i++){
			infowindowarr[i].close();
		}
        clearMarkers();
        if(fulladr.indexOf(",") > -1){
			var search_adr = fulladr.split(",")[0];
			var search_city = fulladr.split(",")[1];
		}else{
			var search_adr = fulladr;
			var search_city = "";
		}
        //_data = {'siteCode':SITE_CODE,'pageSize':'200','placeId':v_city,'curPage':'1'};
        //ajaxRequireByServiceCenter.getAddressList(_data);
        
        
        $geocoder.geocode({'address': search_adr,'region':SITE_CODE},function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var myOptions = {
					zoom: 9,
					center: results[0].geometry.location,
					mapTypeId: google.maps.MapTypeId.ROADMAP
				}
				sc_maps = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
				centerpoint = results[0].geometry.location;
				setCenterPoint(centerpoint);
				_data.siteCode=SITE_CODE;
				_data.longitude=results[0].geometry.location.lng();
				_data.latitude=results[0].geometry.location.lat();
				_data.placeName = search_city;
				var _distance= $(".z_distance.active").attr("dis");
				ajaxRequireByServiceCenter.getServiceAddress(_data,_distance);
			}else{
				setErrorText(status)	
			}
		});
        analyticsSubmit("support > SERVICE CENTER","Submit",fulladr + "+" + $(".z_distance.active").text(),EVENT_TYPE_FIND_SERVICE_CENTER_DISTANCE);
    });
    commonFunctionMessage.eventHandler("#fill_keywords_input","keypress",function(e){
        var event = e || window.event;
        if(event.keyCode=='13'){
            if (event.preventDefault){
	        	event.preventDefault();
	    	}else{
	        	event.returnValue = false;
	    	}
	    	$("#cService_serach_btn").click();
        }
    })
    commonFunctionMessage.eventHandler(".btn.goto_search_btn", "click", function(){
        $("#cService_serach_btn").click();
    })
    function setErrorText(status){
		$(".conv3_sc_info ul").empty();
		$(".conv3_sc_info").show();
		switch (status) {
   			case "ERROR" :
       			$(".conv3_sc_info ul").append("<li><h2>"+g_ERROR+"</h2></li>").show();
       			break;
   			case "INVALID_REQUEST" :
       			$(".conv3_sc_info ul").append("<li><h2>"+g_INVALID_REQUEST+"</h2></li>").show();
       			break;
   			case "OVER_QUERY_LIMIT" :
       			$(".conv3_sc_info ul").append("<li><h2>"+g_OVER_QUERY_LIMIT+"</h2></li>").show();
       			break;
   			case "REQUEST_DENIED" :
       			$(".conv3_sc_info ul").append("<li><h2>"+g_REQUEST_DENIED+"</h2></li>").show();
       			break;	
   			case "UNKNOWN_ERROR" :
       			$(".conv3_sc_info ul").append("<li><h2>"+g_UNKNOWN_ERROR+"</h2></li>").show();
       			break;
   			case "ZERO_RESULTS" :
       			$(".conv3_sc_info ul").append("<li><h2>"+g_ZERO_RESULTS+"</h2></li>").show();
       			break;
		} 
	}
	commonFunctionMessage.eventHandler(".z_distance", "click", function(){
	    var dis = $(this).attr("dis")
	    $(".z_distance.active").removeClass("active");
	    $(this).addClass("active");
	    for(var i = 0; i < infowindowarr.length; i++){
			infowindowarr[i].close();
		}
		if(sc_maps != ""){
	    	if(dis == 5){
	        	sc_maps.setZoom(11);
	        	hideShop(markerInfo_10);
				hideShop(markerInfo_25);
				hideShop(markerInfo_50);
	        	$(".a10,.a25,.a50").hide().attr("data-statue","hide");	        
	    	}else if(dis == 10){
	        	sc_maps.setZoom(10);
	        	showShop(markerInfo_10);
				hideShop(markerInfo_25);
				hideShop(markerInfo_50);
	        	$(".a10").show().attr("data-statue","show");
		    	$(".a25,.a50").hide().attr("data-statue","hide");
	    	}else if(dis == 25){
	        	sc_maps.setZoom(9);
	        	showShop(markerInfo_10);
				showShop(markerInfo_25);
				hideShop(markerInfo_50);
	        	$(".a10,.a25").show().attr("data-statue","show");
		    	$(".a50").hide().attr("data-statue","hide");
	    	}else if(dis > 25){
	        	sc_maps.setZoom(8);
	        	showShop(markerInfo_10);
				showShop(markerInfo_25);
				showShop(markerInfo_50);
	        	$(".a50,.a5,.a10,.a25").show().attr("data-statue","show");
	    	}
	    	$(".sc_info_ul li").each(function(){
	    	    if($(this).attr("data-statue") == "show"){
	    	        $(".conv3_sc_info").show();
	    	    }else{
	    	        $(".conv3_sc_info").hide();
	    	    }
	    	})
	    	hasShop(markerInfo_5.length + markerInfo_10.length + markerInfo_25.length + markerInfo_50.length);
	    }
	})
	function showShop(markerInfo){
		for(var i = 0; i < markerInfo.length; i++){
			NameOverlays[markerInfo[i]].show()
		}
	}
	function hideShop(markerInfo){
		for(var i = 0; i < markerInfo.length; i++){
			NameOverlays[markerInfo[i]].hide()
		}
	}
	
	function hasShop(len){
		if(len > 0)	sc_maps.setCenter(centerpoint)
	}
	loadMapScript(site_language);
	getRoadMap();
	(function() {
    	/*
    	function getSCMapListHeight(){
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
	    window.NameOverlays = new Array();
	    function GoogleMaps(config) {
	        this.config = config;
	        /*this.map = new google.maps.Map(document.getElementById(this.config.ElementId), {
	            zoom: config.zoom
	        });*/
	        this.Stores = [];
	        //map = this.map;
	        map = sc_maps;
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
	            this.div_.style.visibility = this.div_style;
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
	
	    function NameOverlay(point, index, visibility) {
	        this.point_ = point;
	        this.index_ = index;
	        this.div_ = null;
	        this.div_style = visibility;
	        this.setMap(map);
	    }
	
	
	    /* stores:Array<{longitude:number,latitude:number ,title:string,subTitle1:string,subTitle2:string,mapClass:string}> */
	    GoogleMaps.prototype.SetMarkers = function (stores) {
	        Stores = stores;
	        var bounds = new google.maps.LatLngBounds();
	
	        for (var i = 0; i < stores.length; i++) {
	
	            var store = stores[i];
	            var latLng = new google.maps.LatLng(store.latitude, store.longitude);
	            if((store.latitude!= null && store.longitude!=null) || store.dimensionality!=null){
	            var marker = new google.maps.Marker({
	                position: latLng,
	                map: map,
	                icon: 'z',
	                title: ''
	            });
	            var infowindow = new google.maps.InfoWindow();
	            infowindowarr.push(infowindow);
	            //var content = '<span>' + store.title + '<br /><span>' + store.subTitle1 + '</span><br /><span>' + store.subTitle2 + "</span>";
	            var content = drawServiceMapWindowInfo(store);
	            
	            bounds.extend(latLng);
	            store.infowindow = infowindow;
	            store.content = content;
	            store.marker = marker;
	            }
	            if(document.getElementsByClassName(this.config.mapClass)[i]){
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
	            }
	            if((store.latitude!= null && store.longitude!=null) || store.dimensionality!=null){
	                NameOverlays[i] = new NameOverlay(latLng, i,store.visibility);
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

	
}