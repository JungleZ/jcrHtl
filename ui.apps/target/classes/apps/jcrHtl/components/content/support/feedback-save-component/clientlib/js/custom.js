var $faqContentDiv = $(".conv3_faq_content");
if($faqContentDiv.length > 0 && $faqContentDiv.data("mode") != 'EDIT'){
	var wrongIDMessage = $(".conv3_faq_content").data("faq-id-error-message");
	var proid = 0;
	proid = getURLParam('id')
	$(document).ready(function(){
			if(proid > 0){
				getFaqInfo(proid);
			}else{
				$(".conv3_content").empty().append("<div align='center'>" + wrongIDMessage + "</div>").show();
			}
			$(".faq_feedback_no").on('click', function(){
				 $(".conv3_send_faq_comment").show();
				  var menuTop = $(".head_module #normal_nav").height();
	       		  var offsetTop = $(".conv3_faq_feedback").offset().top - menuTop;
	        	  $(window).scrollTop(offsetTop);
			});	
			$(".faq_feedback_yes").on('click', function(){
				  $(".conv3_send_faq_comment").hide();
	       		  $("#conv3_faq_comments").val('');
				  setAppraiseFlag(1,'1')		
			});	
		});
	// get faq info	
	function getFaqInfo(proid){	
		var getFAQInfoUrl = $(".conv3_faq_content").data("get-faq-info-url");
		$.ajax({
				type:"GET",
				async: false,
				url: getFAQInfoUrl ,
				dataType:"jsonp",
				jsonp:"jsonp",
				data:{"faqId":proid},
				success: function(data){ 
					if(data.returnCode == "0"){
						$(".conv3_title_group h1").html(data.title);
						$("#conv3_faq_content").html(data.answer);
						if(""!=data.filePath && null!=data.filePath && "null"!=data.filePath){
							$(".jwplayer_video_area").attr("href",data.filePath)
							$(".jwplayer_video_area").attr("data-video-image",data.imagePath)
							setTimeout($('.jwplayer_video_area').initJwplayer(),300);
						}
					}else{
						$(".conv3_content").empty().append("<div align='center'>" + wrongIDMessage + "</div>").show();
					}
				},
				error: function(){}
		});	
	}
	
	function setAppraiseFlag(cls,flag,judgment){	
		var appraise = {};
		appraise.siteCode = SITE_CODE;
		appraise.feedback = proid;
		appraise.typeName = "faq";
		appraise.productId = proid;
		appraise.appraise = flag;
		setFaqAppraise(appraise,judgment);
		
	}
	
	
	$(".conv3_faq_submit").click(function(){
		var faq_comments=$.trim($("#conv3_faq_comments").val());
		var comment = {};
		comment.siteCode = SITE_CODE;
		comment.evaluateContent = faq_comments;
		comment.recordId = proid
		comment.evaluateUser = "anonymous";
		
		var faq_comment_lenght_err = $(".conv3_faq_content").data("faq-comments-lenght-error-message");
		var faq_comment_empty_err = $(".conv3_faq_content").data("faq-comments-empty-error-message");
		
		if(faq_comments.length> 300){
			alert(faq_comment_lenght_err);
		}else if(faq_comments.length == 0){
			alert(faq_comment_empty_err);
		}else{		
			sendSupportComment(comment,"faq");
			setAppraiseFlag(2,'0');
			$("#conv3_faq_comments").val("");
		}		
	});	
	
	//set faq view Appraise	
	function setFaqAppraise(appraise,judgment){
		var submit_succ_mess = $(".conv3_faq_content").data("success-message");
		var submit_error_mess = $(".conv3_faq_content").data("error-message");;
		var sendYesCommentUrl = $(".conv3_faq_content").data("send-yes-comment-url");
		
		var act = '';
		if(appraise.appraise == 1) {
			act = "Yes on " + $('.conv3_title_group h1').text();
		}
		
		if(appraise.appraise == 0) {
			act = "No on " + $('.conv3_title_group h1').text();
		}
		
		var lab = $('.conv3_title_group h1').text();
		
		
		$.ajax({
			type:"GET",
			async: false,
			url: sendYesCommentUrl,
			dataType:"jsonp",
			jsonp:"jsonp",
			data:appraise,
			success: function(data){
				if(!judgment){
					analyticsSubmit("FAQ Comments",act,lab,EVENT_TYPE_FAQ_PDP_FEEDBACK);
					alert(submit_succ_mess);
				}
			},
				error: function(){
					alert(submit_error_mess);
				}
		});	
	}
	
	function sendSupportComment(comment,service){
		var sendNoCommentUrl = $(".conv3_faq_content").data("send-no-comment-url");
		$.ajax({
			type:"get",
			async: true,
			url: sendNoCommentUrl,
			dataType:"jsonp",
			jsonp:"jsonp",
			data:comment,
			success: function(data){},
			error: function(){}
		}); 	
	}
	
	
	/**@desc: get url param value by param-name*/
	function getURLParam(name) {
		var m = decodeURIComponent(window.location.href).match(new RegExp("[?&]" + name + "=([^=&]*)(&|$)"));
		return m ? m[1]: null;
	}
}
