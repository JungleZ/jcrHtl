(function() {
	$(document).ready(function() {
		var $mdDiv = $(".conv3_wrap .manuals_download");
		if($mdDiv.length == 0 || typeof $mdDiv.data("isedit") != 'undefined'){
			//no manuals_donwload or is edit mode
			return;
		}
		var m_data = {
			"templateType" : "product",
			"tagMatch" : "same",
			"IsearchFlag" : "byCode",
			"topFlag" : "n",
			"mcCurPage" : "1",
			"filterFlag" : "n",
			"isTop" : "1"
		};
		m_data.siteCode = $mdDiv.data("sitecode");
		m_data.APP_NUM = $mdDiv.data("appnum");
		m_data.ssUserText = $mdDiv.data("ssusertext");
		m_data.queryMatch = "support:manual";
		setTimeout(isearchByProductCode("manual", 1, m_data), 500);
		m_data.queryMatch = "support:software";
		setTimeout(isearchByProductCode("software", 1, m_data), 500);
	});
	$(".download_more,.manuals_more").click(function(){   
		if($(this).hasClass('download_more')){
			showMoreDown("down");
		}
		if($(this).hasClass('manuals_more')){
			showMoreDown("doc");
		}    		     		   	  	
	}); 
})();
function showMoreDown(type){
	if(type == "doc"){
    	var list = $(".y-list-doc:hidden");	
    	var more = $(".manuals_more:first"); 	
    }
    if(type == "down"){
    	var list = $(".y-list-down:hidden");
    	var more = $(".download_more:first");
    }    
    $(more).hide();     
	list.each(function(idx){
    	if(idx < 3){
    		$(this).fadeIn();
    	}else{
    		 $(more).show();
    	}
	});
}