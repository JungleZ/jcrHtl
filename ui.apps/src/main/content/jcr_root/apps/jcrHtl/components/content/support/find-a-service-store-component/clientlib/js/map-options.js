;
if(isContainFindAServiceStore) {
	
	// variable define by back-end author
	var serviceStoreOptions = serviceStoreOptions || {};
	serviceStoreOptions.mapType = $('#mapType').val();
	serviceStoreOptions.provinceErrorMessage = $('#provinceErrorMessage').val();
	serviceStoreOptions.cityErrorMessage = $('#cityErrorMessage').val();
	serviceStoreOptions.noResultMessage = $('#noResultMessage').val();
	serviceStoreOptions.inputErrorMessage = $('#inputErrorMessage').val();
	serviceStoreOptions.provinceUrl = $('#provinceUrl').val();
	serviceStoreOptions.cityUrl = $('#cityUrl').val();
	serviceStoreOptions.normalTypeUrl = $('#normalTypeUrl').val();
	serviceStoreOptions.fixedTypeUrl = $('#fixedTypeUrl').val();
	serviceStoreOptions.withDistanceTypeUrl = $('#withDistanceTypeUrl').val();
	serviceStoreOptions.longitude = $('#longitude').val();
	serviceStoreOptions.latitude = $('#latitude').val();
	serviceStoreOptions.defaultLocation = $('#defaultLocation').val() ? $('#defaultLocation').val() : 'beijing';
	serviceStoreOptions.noServiceMapLocationMessage = $('#noServiceMapLocationMessage').val();
	serviceStoreOptions.zeroResultMessage = $('#zeroResultMessage').val();
	serviceStoreOptions.errorMessage = $('#errorMessage').val();
	serviceStoreOptions.invalidRequestMessage = $('#invalidRequestMessage').val();
	serviceStoreOptions.overQueryLimitMessage = $('#overQueryLimitMessage').val();
	serviceStoreOptions.requestDeniedMessage = $('#requestDeniedMessage').val();
	serviceStoreOptions.unknownErrorMessage = $('#unknownErrorMessage').val();
	serviceStoreOptions.popupSearchDefaultText = $('#popupSearchDefaultText').val();
	serviceStoreOptions.popupButton1Text = $('#popupButton1Text').val();
	serviceStoreOptions.popupButton2Text = $('#popupButton2Text').val();
	serviceStoreOptions.searchDefaultText = $('#searchDefaultText').val();
	serviceStoreOptions.defaultCityText = $('#defaultCityText').val();
	
	
	// variable declare by front-end
	var inmap_address = serviceStoreOptions.defaultLocation; 
	var icon_adr = "/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_address.png",
	icon_phone = "/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_phone.png",
	icon_time = "/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_time.png",
	map_list_icon = '/content/dam/huawei-cbg-site/en-master/support/img_con_v27_icon_red_map.png';
	
	var caList=[];
	var message = new Array();
	var markersry = new Array();
	var addresslist =  new Array();
	var geocoder = "";
	var overlay = "";
	var initOption = {"address": inmap_address,"id": "map_canvas"};
	var oSelector = $('.conv3_global_selector'),
        scCityCur = undefined,
        oScMap = $('.conv3_sc_map');
	var $geocoder = '';
	var $mapObj = '';
	var infowindowarr = new Array();
    var markersry = new Array();
	var markerInfo_5 = new Array();
	var markerInfo_10 = new Array();
	var markerInfo_25 = new Array();
	var markerInfo_50 = new Array();
	var sc_maps = '';
    var note_input_adr = serviceStoreOptions.inputErrorMessage;
	var note_no_adr1 = serviceStoreOptions.noResultMessage;
	var g_ZERO_RESULTS = serviceStoreOptions.zeroResultMessage;
	var g_ERROR = serviceStoreOptions.errorMessage;
	var g_INVALID_REQUEST = serviceStoreOptions.invalidRequestMessage;
	var g_OVER_QUERY_LIMIT = serviceStoreOptions.overQueryLimitMessage;
	var g_REQUEST_DENIED = serviceStoreOptions.requestDeniedMessage;
	var g_UNKNOWN_ERROR = serviceStoreOptions.unknownErrorMessage;
	var $placeholder= serviceStoreOptions.searchDefaultText;
	
    var navigatoion_msg = {
        "add_form": serviceStoreOptions.popupSearchDefaultText,
        "add_goto1": serviceStoreOptions.popupButton1Text,
        "add_goto2": serviceStoreOptions.popupButton2Text
    };
	
	var _message = {
	    "countryMessage": serviceStoreOptions.provinceErrorMessage,
	    "cityMessage": serviceStoreOptions.cityErrorMessage,
	    "noResultMessage": serviceStoreOptions.noResultMessage,
	    "city": serviceStoreOptions.defaultCityText
	}

	if (serviceStoreOptions.mapType == 'fixed') {
		inmap_address = serviceStoreOptions.latitude + ',' + serviceStoreOptions.longitude;
	}
	
}



	
