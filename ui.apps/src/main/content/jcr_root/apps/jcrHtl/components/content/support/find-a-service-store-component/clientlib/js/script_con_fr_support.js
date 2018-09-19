if(isContainFindAServiceStore && $('#mapType').val() == 'fixed') {

	var sc_find_warranty_info = "service/ccpServiceRights/findAllWarrantyInfo";
	
	/*
	 * ajaxRequireByServiceCenter: support service-center page function
	*/
	var ajaxRequireByServiceCenter = {
	    "getServiceAddress": function(lat,lng,city,dis){
	        $(".conv3_sc_info ul").empty();
	        clearMarkers()
			var _data = {}
			_data.siteCode=SITE_CODE;
			_data.longitude=lng;
			_data.latitude=lat;
			_data.pageSize=15;
			_data.curpage=1;
	        commonFunctionMessage.commonAjax({
	            "url": serviceStoreOptions.fixedTypeUrl,
	            "data": _data,
	            "succCallback": function(data){
					$(".conv3_sc_info ul").empty();
					var stores = [];
					var mapZoom = 5;
					var mindex = 0 
					var adrinfo = ''
					var popmsg =''
	                if(data != null && data.length > 0){
	                    for(var i = 0; i < data.length; i++){
	                    	if(data[i].distance <= 50){
								mindex++;
								if(data[i].distance <= 5){
									markerInfo_5.push(i)	
									var dclass = 'a5'	 
								//	map.setZoom(11)		
								}else if(data[i].distance <= 10 && data[i].distance > 5){
									markerInfo_10.push(i)
									var dclass= 'a10'	
								//	map.setZoom(10)	
								}else if(data[i].distance <= 25 && data[i].distance > 10){
									markerInfo_25.push(i)
									var dclass= 'a25'		
								//	map.setZoom(9)
								}else if(data[i].distance <= 50 && data[i].distance > 25){
									markerInfo_50.push(i)
									var dclass= 'a50'	
								//	map.setZoom(8)
							}
	                    	
	                    	var phone = (data[i].phone == null || data[i].phone =="null")?"":data[i].phone;
	                    	var placeCode = data[i].placeCode;
							placeCode = placeCode.substring(0,placeCode.indexOf("(")) + placeCode.substring(placeCode.indexOf(")")+1,placeCode.length+1);
	                    	if(data[i].distance <= dis){
	                    	    var visibility = "visible";
	                    	    popmsg = popmsg + "<li class='sc-map-info-list "+dclass+"' id='"+i+"'><h2 class='sc_info_text'><em>"+data[i].networkName+"</em><i class='c-map-icon'></i><span>"+(i+1)+"</span></h2>";
	                    	}else{
	                    	    var visibility = "hidden";
	                    	    popmsg = popmsg + "<li style='display:none' class='sc-map-info-list "+dclass+"' id='"+i+"'><h2 class='sc_info_text'><em>"+data[i].networkName+"</em><i class='c-map-icon'></i><span>"+(i+1)+"</span></h2>";
	                    	}
							if(data[i].address!=null&&data[i].address.length>0){
								popmsg += "<p><i class='adress-icon'></i>"+data[i].address+"</p>";
							}
							if(data[i].phone!=null&&data[i].phone.length>0){
								popmsg += "<p><i class='phone-icon'></i>"+data[i].phone+"</p>";
							}
							if(data[i].workingHours!=null&&data[i].workingHours.length>0){
								popmsg += "<p><i class='time-icon'></i>"+data[i].workingHours+"</p>";
							}
							if(data[i].category!=null && data[i].category !="" &&data[i].category.length>0){
								popmsg += "<p><i class='category-icon'></i>"+data[i].category+"</p>";
							}
							popmsg += "</li>";
	                    	}
	                    	var listinfo = {};
	                    	listinfo.dimensionality = data[i].dimensionality;
	                    	listinfo.longitude = data[i].longitude;
							listinfo.latitude =  data[i].latitude;
							listinfo.placeCode = placeCode;
							listinfo.phone = phone;
							listinfo.address = data[i].address;
							listinfo.networkName = data[i].networkName;
							listinfo.workingHours = data[i].workingHours;
							listinfo.category = data[i].category;
							listinfo.distancePlace = data[i].placeCode.split(",")[1];
							listinfo.distance = (data[i].distance * 0.6214).toFixed(3);
							listinfo.addclass = dclass;
							stores.push(listinfo);
	                    }
	                    $(".conv3_sc_info ul").append(popmsg);
	                    $(".conv3_sc_info").show();
	                    var googleMaps = new GoogleMaps(
	                    {
	                        ElementId: "map_canvas",
	                        zoom: mapZoom,
	                        mapClass: 'sc-map-info-list'
	                    });
	                    googleMaps.SetMarkers(stores);
	                }else{
							//setInitMap(initOption);	
							$(".conv3_sc_info ul").append("<li class='no_result_list'><h2>"+note_no_adr1+"</h2></li>").show();
							$(".conv3_sc_info").show();
					}	
	            },
				"comCallback": function(){
				}
	        });
	    }
	};

}
