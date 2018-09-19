if($('.conv3_contact_email').length > 0) {
;(function ( $ ) {
	var subject_url = $(".conv3_contact_email.conv3_contact_module").data('subject-api');
	var category_url = $(".conv3_contact_email.conv3_contact_module").data('category-api');
	var country_url = $(".conv3_contact_email.conv3_contact_module").data('country-api');
	var session_uuid_url = $(".conv3_contact_email.conv3_contact_module").data('sessionuuid-api');
	var service_image_url = $(".conv3_contact_email.conv3_contact_module").data('img-code-api');
	var submit_url = $(".conv3_contact_email.conv3_contact_module").data('submit-api');
	var errorBtnLabel = $(".conv3_contact_email.conv3_contact_module").data('error-message') || "ERROR";
	var successBtnLabel = $(".conv3_contact_email.conv3_contact_module").data('success-btn-text') || "THANK YOU";
    var emailMessage = {
        errorBtn: errorBtnLabel,
        thankBtn: successBtnLabel
    };
    (function () {
        $.ajax({
            url: subject_url,
            async: false,
            data: { "siteCode": SITE_CODE },
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsonp",
            success: function (data) {
                $("#email_subject").empty();
                if (data != null && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $("#email_subject").append("<li data-subject-id='" + data[i].subjectId + "' >" + data[i].subjectName + "</li>")
                    }
                }
                bindEmailSubject();
            },
            error: function (error) {} 
         });
    })();
    function bindEmailSubject() {
        $("#email_subject li").click(function () {
            $("#email_subject li:first-child").parent("ol").prev("span")
                .text($(this).text())
                .attr("data-subject-id", $(this).attr("data-subject-id"));;
            if ($("#email_subject").prev("span").attr("data-subject-id")){
				$("#email_subject").next("p").hide();
			}
            var subjectId = $(this).attr("data-subject-id");
            $.ajax({
                url: category_url,
                data: { siteCode: SITE_CODE, subjectId: subjectId },
                dataType: "jsonp",
                jsonp: "jsonp",
                type: "GET",
                success: function (data) {
                    if (data != null && data.length > 0) {
                        $("#email_category").empty();
                        for (var i = 0; i < data.length; i++) {
                            $("#email_category").append("<li data-category-id='" + data[i].categoryId + "'>" + data[i].categoryName + "</li>")
                        }
                        bindEmailCategory();
                    }
                },
                error: function (error) {}
            });
        });
    };
    function bindEmailCategory() {
        $("#email_category li").click(function () {
            $("#email_category li:first-child").parent("ol").prev("span")
                .text($(this).text())
                .attr("data-category-id", $(this).attr("data-category-id"));
            if ($("#email_category").prev("span").attr("data-category-id")){
				$("#email_category").next("p").hide();
			}
        });	 
    }
    (function () {
        $.ajax({
            url: country_url,
            data: { siteCode: SITE_CODE },
            dataType: "jsonp",
            jsonp: "jsonp",
            type: "GET",
            success: function (data) {
                if (data != null & data.length > 0) {
                    $("#email_country").empty();
                    for (var i = 0; i < data.length; i++) {
                        $("#email_country").append("<li data-placeId='" + data[i].placeId + "' >" + data[i].placeName + "</li>")
                    }
                    bindEmailCountry();
                }
            },
            error: function (error) {}
        });
    })();

    function bindEmailCountry() {
        $("#email_country li").click(function () {
            $("#email_country li:first-child").parent("ol").prev("span")
                .text($(this).text())
                .attr("data-placeId", $(this).attr("data-placeId"));
			if ($("#email_country").prev("span").attr("data-placeid")){
				$("#email_country").next("p").hide();
			}
        });
    }

    function getImgCode() {
        $.ajax({
            url: session_uuid_url,
            dataType: "jsonp",
            jsonp: "jsonp",
            type: "GET",
            success: function (data) {
                $("#email_code").attr("data-sessionid", data.sessionuuid);
                $("#email_code").attr("src", service_image_url + "?sessionuuid=" + data.sessionuuid + "&timeTemp=" + new Date());
            },
            error: function (error) { }
        });
    }
    getImgCode();
    $("#email_code").click(getImgCode);
    $("#email_submit").click(emailSubmit);
    function emailSubmit() {
    	var isError=false;
    	$(".conv3_contact_email input[placeholder],.conv3_contact_email textarea[placeholder]").each(function(){
			$(this).next("p").hide();
		 	if (!$(this).val() && $(this).next("p").length>0 ){
		 		$(this).next("p").show();
		 		isError=true;
		 	}	 		
		 	if($(this).next("p").length>0&&!$(this).next("p").is(':hidden')){
		 	    isError=true;
		 	}
		});
		if(!$.trim($("#email_purchase_date").val()) && $("#email_purchase_date").next("div").length>0){
		    $("#email_purchase_date").next("div").css('color','red');
		    isError=true;
		}
		if(checkToDataFillContent($("#email_purchase_date"))){
		    isError=true;
		}
		if(checkToMailFillContent($("#email_address"))){
		    isError=true;
		}
		if (!$("#email_subject").prev("span").attr("data-subject-id")){
			$("#email_subject").next("p").show();
			isError=true;
		}
		if (!$("#email_category").prev("span").attr("data-category-id")){
			$("#email_category").next("p").show();
			isError=true;
		}
		if ($(".select.email_country").length > 0 && !$("#email_country").prev("span").attr("data-placeid")){
			$("#email_country").next("p").show();
			isError=true;
		}
		if (isError){ 
	        $('#email_submit').text(emailMessage.errorBtn).addClass("adderror");
	        $("#email_send_result_status").hide();	
		    return;
		}
        var email_subject_id = $("span[data-subject-id]").attr("data-subject-id");
        var email_category_id = $("span[data-category-id]").attr("data-category-id");
        var email_question = $("#email_question").val();
        var email_name = $("#email_name").val();
        var email_address = $("#email_address").val();
        var country_id = $("span[data-placeid]").attr("data-placeid");
        var product_model = $("#email_product_model").val();
        var purchase_date = $("#email_purchase_date").val();
        var img_code = $("#email_code_input").val();
        var sessionuuid = $("#email_code").attr("data-sessionid");
        $.ajax({
            url: submit_url,
            data:
            {
                siteCode: SITE_CODE,
                subjectId: email_subject_id,
                categoryId: email_category_id,
                productName: product_model,
                placeId: country_id,
                username: email_name,
                email: email_address,
                mailContent: email_question,
                purchaseDate: purchase_date,
                sessionuuid: sessionuuid,
                validationCode: img_code
            },
            dataType: "jsonp",
            jsonp: "jsonp",
            type: "GET",
            success: function (data) {
                if (data.returnCode == 0) {
                	var lab = $('.conv3_contact_email .email_subject span').text() + "_" +  $('.conv3_contact_email .email_category span').text() + "_" + $('.conv3_contact_email .email_country span').text() 
                    $('#email_submit').text(emailMessage.thankBtn).removeClass("adderror");
                    $(".conv3_contact_email input,.conv3_contact_email textarea").val("");
                    $("#email_subject").prev("span").attr("data-subject-id","").text("Subject *");
                    $("#email_category").prev("span").attr("data-category-id","").text("Category *");
                    $("#email_country").prev("span").attr("data-placeid","").text("Country or Region *");
                    $("#email_send_result_status").show();
                    analyticsSubmit("Contact Us--Email Support","Email Us Submission",lab, EVENT_TYPE_CONTACT_US_TECHNICAL)
                }else if(data.returnCode == 9 || data.returnCode == 8){
                    $("#email_code_input").next("p").show();
                }
                else {
                    $('#email_submit').text(emailMessage.errorBtn).addClass("adderror");
                    analyticsSubmit("Contact Us--Email Support","Email Us Submission","error", EVENT_TYPE_CONTACT_US_TECHNICAL)
                }
            },
            error: function (error) {analyticsSubmit("Contact Us--Email Support","Email Us Submission","error", EVENT_TYPE_CONTACT_US_TECHNICAL) },
            complete: function(){getImgCode();}
        });
    }
})( jQuery );

!!function(){
     window.checkToDataFillContent = function(obj){
        var _isErrors = false;
        if(!$(obj).val().match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)){
            $(obj).next("div.tips").css("color","red");
            _isErrors = true;
        }else{
            $(obj).next("div.tips").css("color","#b2b2b2");
        }
        return _isErrors;
    }
    window.checkToMailFillContent = function(obj){
        var _isErrors = false;
        if ( !$(obj).val().match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) ){
            $(obj).next("p").show();
            _isErrors = true;
        }else{
           $(obj).next("p").hide(); 
        }
        return _isErrors;
    }
    
	$(document).on("blur",".conv3_form_module input, .conv3_form_module textarea",function(){
		$(this).next("p").hide();
		!$(this).val() && $(this).next("p").show();
		if($(this).attr('data-name') == 'date'){
		    checkToDataFillContent($(this));
		}
		if($(this).attr('data-name') == 'email'){
		    checkToMailFillContent($(this));
		}
	});
}();

(function(){
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        var fill_date = $.trim($("#email_purchase_date").val());
        if(e.keyCode!=8){
            if(e.keyCode!=189 && e.keyCode!=109){
            	if(fill_date.length==4){
                	document.getElementById("email_purchase_date").value += "-";
            	}
            	if(fill_date.length==7){
                	document.getElementById("email_purchase_date").value += "-";
            	}
            }
        }
    };
})();

$("body .conv3_contact_email .conv3_global_selector .select ol").delegate("li","click",function(){
	$(this).parent("ol").find("li").removeClass("current");
	$(this).addClass("current");
});

}