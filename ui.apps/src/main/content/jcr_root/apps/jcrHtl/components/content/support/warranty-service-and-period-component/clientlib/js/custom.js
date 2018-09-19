if($('.conv3_sup_warrantyQuery_wrap').length > 0) {
	(function (document, $) {
	    "use strict";

	    $(".conv3_warranty-s-p .warranty-s-p-click").each(function(index, el) {
	        $(this).on("click", function() {
	            if ($(this).find("span").hasClass('warranty-s-p-arr')) {
	                $(this).find("span").removeClass('warranty-s-p-arr').addClass('warranty-s-p-arr-visited');
	            } else {
	                $(this).find("span").removeClass('warranty-s-p-arr-visited').addClass('warranty-s-p-arr');
	            }
	            $(this).next(".warranty-s-p-country").toggle();
	        });
	    });
	    $("#sen-detial-more").on("click", function() {
	        if ($(".sen-detial-country").is(":hidden")) {
	            $("#sen-detial-more .sen-detial-open").hide();
	            $("#sen-detial-more .sen-detial-close").show();
	        } else {
	            $("#sen-detial-more .sen-detial-close").hide();
	            $("#sen-detial-more .sen-detial-open").show();
	        }
	        $(".sen-detial-country").toggle();
	    });

	    function alignB() {
	        var boolpadding = $('.warranty-s-p-col-6:visible').css('padding-bottom') == '40px',
	            blocksVisible = $('.warranty-s-p-media-r:visible'),
	            blocksLen = blocksVisible.length;
	        blocksVisible.css('height', 'auto');
	        if (boolpadding) {
	            for (var i = 0; i < blocksLen; i = i + 2) {
	                var leftB = $(blocksVisible[i]),
	                    rightB = $(blocksVisible[i + 1]);
	                leftB.height() > rightB.height() ? rightB.height(leftB.height()) : leftB.height(rightB.height());
	            }
	        } else if ($(document).width() < 768) {
	            blocksVisible.css('height', 'auto');
	        }
	    }
	    $(window).on('load', function() {
	        alignB();
	    })
	    $(window).on('resize', function() {
	        alignB();
	    })

	    var policyLink = $("a[data-policyLink=true]").attr("href");
	    var feedbackLink = $("a[data-feedbackLink=true]").attr("href");
	    var serviceLink = $("a[data-serviceLink=true]").attr("href");
	    $(".conv3_sup_warrantyQuery_wrap a.service-center-link").attr("href",serviceLink);
	    $(".wq_result_detail .warranty-s-p-wp a.warranty-policy-link").attr("href",policyLink);
	    $(".wq_result_maintenance .warranty-s-p-wp a.warranty-policy-link").attr("href",policyLink);
	    $(".wq_result_detail .warranty-s-p-wp a.feedback-link").attr("href",feedbackLink);
	    $(".wq_result_maintenance .warranty-s-p-wp a.feedback-link").attr("href",feedbackLink);
	    $(".wq_no_result .email-feedback-link > a").attr("href",feedbackLink);


	    var gotoTabWrap = {"query": ".wq_query","resultDetail": ".wq_result_detail","noResult": ".wq_no_result","resultMaintenance":".wq_result_maintenance"};
	   
	    var warranty_message = {
	        "imeiQuery": $(".warranty-var").attr('data-placeHolder'),
	        "queryMessage": $(".warranty-var").attr('data-submitErrTxt')
	    };
	    
	    $('a.wq_submit').on('click',function(){
	    	
	        var telimei = $.trim($("#service_rate").val());
	        if((telimei.length == 0) || ($("#service_rate").val() == warranty_message.imeiQuery)){
	            alert(warranty_message.queryMessage);
	        }else if(telimei.length <8 || telimei.length >20){
	            alert(warranty_message.queryMessage);
	        }else{

	            searchRepairStatus(telimei);
	        }
	    })
	    
	    
	    function searchRepairStatus(telimei){
	    	var apiUrl      = $(".warranty-var").attr('data-apiUrlWarranty');
	        commonFunctionMessage.commonAjax({
	            "url": apiUrl,
	            "data": {"siteCode":SITE_CODE,"snimei":telimei,"countryCode":countryCode},
	            "succCallback": function(data){
	                if (data && data.length > 0 && data[0].returnCode == 0 && data[0].productCode){					
	                    setWarrantyInfo(data[0]);
	                }else{
	                    $(gotoTabWrap.query+","+gotoTabWrap.resultDetail+","+gotoTabWrap.resultMaintenance).hide();
	                    $(gotoTabWrap.noResult).show();
	                    $(".guarantee-state-jl").css("padding-top","20px");
	                }
	            }
	        })
	    }
	    function setWarrantyInfo(datas){
	    	if(datas.deviceBussType == null) {
	    		$(".warranty-s-p-active").hide();
	            $(".warranty-s-p-unactive").hide();
	    	}else if(datas.deviceBussType == "激活"){
	            $(".warranty-s-p-active").show();
	            $(".warranty-s-p-unactive").hide();
	        }else{
	            $(".warranty-s-p-active").hide();
	            $(".warranty-s-p-unactive").show();
	        }
	        if(datas.productImageURL){
	            $(".productImage").attr("src",datas.productImageURL);
	        }
	        if(datas.productTypeName){
	            $(".proType").text(datas.productTypeName);
	        }else{
	            $(".proType").text(datas.productCode);
	        }
	        $(".warranty-s-p-icon1 text").html(datas.productCode);	
	        $(".warranty-s-p-icon2 text").html(datas.snimei);
	        $(".warranty-s-p-icon3 text").html(datas.warrEndDate);
	        
	        if(datas.repScope){
	            var repScope = datas.repScope;
	            var resList = datas.repScope.split(",");
	            if(resList.length > 3){
	                var indexSplit = datas.repScope.indexOf(resList[2]);
	                $(".warranty-s-p-icon4 span:first").text(repScope.substring(0,(indexSplit + resList[2].length)));
	                $(".warranty-s-p-icon4 span:eq(1)").text(repScope.substring((indexSplit + resList[2].length + 1),repScope.length));
	            }else{
	                $(".warranty-s-p-icon4 span:first").text(repScope);
	                $("#sen-detial-more").hide();
	            }
	        }
	        if(datas.mainteModeCode=="1000"){
	            $(gotoTabWrap.query+","+gotoTabWrap.resultMaintenance+","+gotoTabWrap.noResult).hide();
	            $(gotoTabWrap.resultDetail).show();			
	            if(datas.deviceValueBalans){
	                for(var i=0;i<datas.deviceValueBalans.length;i++){
	                    var className = datas.deviceValueBalans[i].serviceCatCode;
	                    $("." + className +" .deadline text").html(datas.deviceValueBalans[i].endDate);
	                    $("." + className +" .warranty-s-p-country").html(datas.deviceValueBalans[i].countryCode);
	                    $("." + className +" .degree text").html(datas.deviceValueBalans[i].availCount);								
	                }
	                
	                $(".deadline text").each(function (){ 
	                    if($(this).text().length == 0){
	                        $(this).parent().parent().parent().hide();
	                    }				
	                });
	                alignB();
	            }else{
	                $(".wq_result_detail section").eq(1).hide()
	            }				
	        }else{
	            $(gotoTabWrap.query+","+gotoTabWrap.resultDetail+","+gotoTabWrap.noResult).hide();
	            $(gotoTabWrap.resultMaintenance).show();
	            $(".guarantee-state-jl").css("padding-top","20px");
	        }		
	    }
	    $(".pr20 a").click(function(){
	        $(gotoTabWrap.noResult+","+gotoTabWrap.resultDetail+","+gotoTabWrap.resultMaintenance).hide();
	        $(gotoTabWrap.query).show();	
	        $("#service_rate").val(warranty_message.imeiQuery);
	    })
	    $(".wq_result .wq_back,.wq_no_result .wq_back,.wq_result_detail .wq_back,.wq_result_maintenance .wq_back").click(function(){
			window.location.reload()
	    });
	    


	    function alignB() {
	        var boolpadding = $('.warranty-s-p-col-6:visible').css('padding-bottom') == '40px',
	            blocksVisible = $('.warranty-s-p-media-r:visible'),
	            blocksLen = blocksVisible.length;
	        blocksVisible.css('height', 'auto');
	        if (boolpadding) {
	            for (var i = 0; i < blocksLen; i = i + 2) {
	                var leftB = $(blocksVisible[i]),
	                    rightB = $(blocksVisible[i + 1]);
	                leftB.height() > rightB.height() ? rightB.height(leftB.height()) : leftB.height(rightB.height());
	            }
	        } else if ($(document).width() < 768) {
	            blocksVisible.css('height', 'auto');
	        }
	    }
	})(document,jQuery);
}
