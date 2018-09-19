if($('.conv3_contact_feedback').length > 0) {
(function () {
	var sendFeedbackAPI = $(".conv3_contact_feedback.conv3_contact_module").data('api-url');
	var errorBtnLabel = $(".conv3_contact_feedback.conv3_contact_module").data('error-message') || "ERROR";
	var successBtnLabel = $(".conv3_contact_feedback.conv3_contact_module").data('success-message') || "THANK YOU";
	
    var errorMessage = {
        errorBtn: errorBtnLabel,
        thankBtn: successBtnLabel
        
    }
    
    function checkFeedBackFillContent(opt,$isError){
        var _returnIsError = $isError;
        if(checkToMailFillContent("#feedback_email")){
            _returnIsError = true;    
        }
        if(opt._question == ''){
           $("#feedback_question").next('p').show();
           _returnIsError = true;     
        } 
        if(opt._name == ''){
           $("#feedback_name").next('p').show();
           _returnIsError = true;     
        }
        if(opt._email == ''){
           $("#feedback_email").next('p').show();
           _returnIsError = true;  
        }
        if(opt._code == ''){
           $("#feedback_code_input").next('p').show();
           _returnIsError = true;
        }
        return _returnIsError;
    }
    function isEmail(str){
		var re = /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;  
		return re.test(str);  
	}
    function getImgCode() {
        $.ajax( {
            url: "http://consumer.huawei.com/cmkt/services/service/commonService/sessionuuid",
            dataType: "jsonp",
            jsonp: "jsonp",
            type: "GET",
            success: function (data) {
                $("#feedback_img_code").attr("data-sessionid", data.sessionuuid);
                $("#feedback_img_code").attr("src", "http://consumer.huawei.com/cmkt/servlet/authMage?sessionuuid=" + data.sessionuuid + "&timeTemp=" + new Date());
            },
            error: function (error) {}
        });
    }
    getImgCode();
    $("#feedback_img_code").click(getImgCode);
    function sendFeedback() {
        var feedback_question = $.trim($("#feedback_question").val());
        var feedback_name = $.trim($("#feedback_name").val());
        var feedback_email = $.trim($("#feedback_email").val());
        var feedback_code_input = $.trim($("#feedback_code_input").val());
        var isError = false;
        var _data = {
            _question: feedback_question,
            _name: feedback_name,
            _email: feedback_email,
            _code: feedback_code_input 
        }
        isError = checkFeedBackFillContent(_data,isError);
        if(isError){
            $('#feedback_submit').text(errorMessage.errorBtn).addClass("adderror");
            $("#feedback_send_result_status").hide();
            return;
        }
        $.ajax({
            url: sendFeedbackAPI || "http://consumer.huawei.com/cmkt/services/service/feedback/validateWebsite/save",
            data: {
                siteCode: SITE_CODE,
                feedbackContent: feedback_question,
                email: feedback_email,
                userName: feedback_name,
                sessionuuid: $("#feedback_img_code").attr("data-sessionid"),
                validationCode: feedback_code_input
            },
            dataType: "jsonp",
            jsonp: "jsonp",
            type: "GET",
            success: function (data) {
                if (data.returnCode == 0) {
                    $('#feedback_submit').text(errorMessage.thankBtn).removeClass("adderror");
                    $(".conv3_contact_feedback input,.conv3_contact_feedback textarea").val("");
                    $("#feedback_send_result_status").show();
                    analyticsSubmit("Contact Us--Give Us Your Feedback","Feedback Submission","", EVENT_TYPE_CONTACT_US_FEEDBACK)
                }else if(data.returnCode == 9 || data.returnCode == 8){
                    $("#feedback_code_input").next("p").show();
                }else {
                   $('#feedback_submit').text(errorMessage.errorBtn).addClass("adderror");
                   analyticsSubmit("Contact Us--Give Us Your Feedback","Feedback Submission","error", EVENT_TYPE_CONTACT_US_FEEDBACK)
                }
            },
            error: function (error) {analyticsSubmit("Contact Us--Give Us Your Feedback","Feedback Submission","error", EVENT_TYPE_CONTACT_US_FEEDBACK) },
            complete: function(){ getImgCode();}
        });
    }
    $("#feedback_submit").click(sendFeedback);
} ());


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
}
