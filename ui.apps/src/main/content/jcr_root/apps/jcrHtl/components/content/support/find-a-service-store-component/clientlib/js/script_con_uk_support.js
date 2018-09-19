if(isContainFindAServiceStore && $('#mapType').val() == 'withDistance') {

	var sc_find_warranty_info = "service/ccpServiceRights/findAllWarrantyInfo";
	
	/*
	 * ajaxRequireByServiceCenter: support service-center page function
	*/
	var ajaxRequireByServiceCenter = {
	    "getServiceAddress": function(_data,_distance){
	        var points,s1="";var cknum = 0;
	        var popmsg ='';
	        _data.distance = 163;
	        commonFunctionMessage.commonAjax({
	            "url": serviceStoreOptions.withDistanceTypeUrl,
	            "data": _data,
	            "succCallback": function(data){
					$(".conv3_sc_info ul").empty();
					var stores = [];
					var mapZoom = 0;
					var _isBoolen = true;
	                if(data != null && data.length > 0){
	                    for(var i = 0; i < data.length; i++){
	                        if(data[i].distance >= 0){
	                        	if(data[i].distance * 0.6214 <= 5){
								markerInfo_5.push(i);	
								var dclass = 'a5';
								mapZoom = 11;	
							}else if(data[i].distance * 0.6214 <= 10 && data[i].distance * 0.6214 > 5){
								markerInfo_10.push(i);
								var dclass= 'a10';	
								mapZoom = 10;
							}else if(data[i].distance * 0.6214 <= 25 && data[i].distance * 0.6214 > 10){
								markerInfo_25.push(i);
								var dclass= 'a25';		
								mapZoom = 9;
							}else if(data[i].distance * 0.6214 > 25){
								markerInfo_50.push(i);
								var dclass= 'a50';	
								mapZoom = 8;
							
	                    	}
	                    	var phone = (data[i].phone == null || data[i].phone =="null")?"":data[i].phone;
	                    	var placeCode = data[i].placeCode;
							placeCode = placeCode.substring(0,placeCode.indexOf("(")) + placeCode.substring(placeCode.indexOf(")")+1,placeCode.length+1);
	                    	if(data[i].distance * 0.6214 <= _distance){
	                    	    var visibility = "visible";
	                    	    popmsg = popmsg + "<li class='sc-map-info-list "+dclass+"' id='"+i+"'><h2 class='sc_info_text'><em>"+data[i].networkName+"</em><i class='c-map-icon'></i><span>"+(i+1)+"</span></h2>";
	                    	}else{
	                    	    var visibility = "hidden";
	                    	    popmsg = popmsg + "<li style='display:none' class='sc-map-info-list "+dclass+"' id='"+i+"'><h2 class='sc_info_text'><em>"+data[i].networkName+"</em><i class='c-map-icon'></i><span>"+(i+1)+"</span></h2>";
	                    	}                    	
							popmsg += "<span class='map_distance_content'>"+data[i].placeCode.split(",")[1]+",<span class='m_distance'>"+(data[i].distance * 0.6214).toFixed(3)+" miles</span></span><p></p>";
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
							listinfo.visibility = visibility;
							stores.push(listinfo);
							if(data[i].longitude || data[i].dimensionality){
	                            _isBoolen = false;
	                        }
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
	                    if(_isBoolen){
							addressToMap();
						}
	                }else{
							//setInitMap(initOption);	
							$(".conv3_sc_info ul").append("<li class='no_result_list'><h2>"+note_no_adr1+"</h2></li>").show();
							$(".conv3_sc_info").show();
							if(_distance == '5'){sc_maps.setZoom(11);}
							if(_distance == '10'){sc_maps.setZoom(10);}
							if(_distance == '25'){sc_maps.setZoom(9);}
							if(_distance == '163'){sc_maps.setZoom(8);}
					}	
	            },
				"comCallback": function(){
				}
	        });
	    }
	};
	
	function drawServiceMapWindowInfo(store){
		var content = "<div class='x-sc-inmap-info' style='display:block;' data-latitude="+store.latitude+" data-longitude="+store.longitude+"><h2>"+store.networkName+"</h2>";
		if(store.distancePlace != "" && store.distance !=""){
		    content = content + "<span class='map_distance_content'>"+store.distancePlace+",<span class='m_distance'>"+store.distance+" miles</span></span>";
		}
		if(store.address != "" && store.address != null) content = content + "<p><i class='adress-icon'></i><span class='store-address'>"+store.address+"</span></p>";
		if(store.phone != "" && store.phone != null)	content = content + "<p><i class='phone-icon'></i>"+store.phone+"</p>";
		if(store.workingHours != "" && store.workingHours != null)	content = content + "<p><i class='time-icon'></i>"+store.workingHours+"</p>";	 
		if(store.category != "" && store.category != null)	content = content + "<p><i class='category-icon'></i>"+store.category+"</p>";	 
		content = content + "<p class='sc_pl0'><input type='text' placeholder='"+navigatoion_msg.add_form+"'><input type='button' data-mode='transit' value='"+navigatoion_msg.add_goto1+"'><input type='button' data-mode='driving' value='"+navigatoion_msg.add_goto2+"'></p>";		
		content = content + "</div>";
	    return content;
	}
	
}