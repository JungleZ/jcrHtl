if($('.conv3_wrap.inquery').length > 0) {
	var queryErr = $.trim($('#queryErr').val());
	var codeErr = $.trim($('#codeErr').val());

	var dropdownErr = [];
	var repairStateArr = [];

	$(document).ready(function(){
		$(".rsq_cate li[data-errorMsg]").each(function() {
	        var msg = $(this).data('errormsg');
	        var num = $(this).attr('num');
	        var obj = {'num' : num, 'message' : msg};
	        dropdownErr.push(obj);
	    });
		
		$(".repair-status li").each(function(){
			var stateKey = $(this).data("statekey");
			var stateValue = $(this).data("statevalue");
			var obj = {'stateKey' : stateKey, 'stateValue' : stateValue};
			repairStateArr.push(obj);
		});
		
		$('.rsq_cate li').click(function(){
			var model = $(this).attr('num')
			$('#inquiry-type').attr('num',model)
			$('#model-number').val('')
			$('#model-number').attr("placeholder",$(this).text());
		});
		
	});

	function alertMsg(model) {
		$.each(dropdownErr, function() {
			if(this.num == model) {
				alert(this.message);
			}
		});
	}

	// loop thru state arr to find specific state
	function setRepairState(stateObj,state) {
		$.each(repairStateArr, function(){
			if(this.stateKey == state) {
				stateObj.getState = this.stateValue;
			}
		});
	}


	function inquiry() {
		$('.rsq_query .conv3_global_selector').addSelector();
		
		$(document).on(
				'click',
				'#submit-inquiry',
				function(e) {
					var model = $('#inquiry-type').attr("num")
					var id = $.trim($('#model-number').val())
					var vcode = $.trim($('#user_code').val())
					var condition = (id == "" || [14,15,16,20].indexOf(id.length) == -1);
										
					if (model == "0") {
						alert(queryErr)
					} else if (condition){
						alertMsg(model);
					} else if (!vcode || vcode == '') {
						alert(codeErr)
					} else {
						searchInquiry(model, id)
					}
					
				}).on(
				'click',
				'.auto-img',
				function(e) {
					var sessionid = $('.auto-sessionid').val()
					var imageCodeApi = $.trim($('#imageCodeApi').val());
					$(this).attr(
							"src", imageCodeApi 
									+ "?tm=" 
									+ Math.random() 
									+ "&sessionuuid=" 
									+ $('#sessionuuid3').text() 
									+ "&timep=" 
									+ Date().valueOf())

				})
	}

	function sessionId3() {
		var sessionidApi = $.trim($('#sessionidApi').val());
		$.ajax({
			type : "GET",
			async : false,
			url : sessionidApi,
			dataType : "jsonp",
			jsonp : "jsonp",
			data : {},
			success : function(data) {

				$("#sessionuuid3").html("")
				$("#sessionuuid3").append(data.sessionuuid)
				$(".auto-img").click();
			}
		});
	}

	var vcode = $.trim($('#user_code').val())

	function searchInquiry(model,id){
		var sessionuuid3 = $("#sessionuuid3").text();
		var validationCode = $('#user_code').val();
		var apiUrl  = $.trim($('#repairQueryApi').val());
		var queryRepairAPI = apiUrl !== null && apiUrl.length != 0 ? apiUrl : '';
		$.ajax({
			type:"GET",
			async: false,
			url: queryRepairAPI,		  		  
			dataType:"jsonp",
			jsonp:"jsonp",
			data:{"siteCode":"mx","type":model,"inputStr":id,"sessionuuid": sessionuuid3,"validationCode": validationCode },
			success: function(data){	
			if(data[0].returnCode==8||data[0].returnCode==9){
				alert(codeErr)
				sessionId3();
				return false;			
			}		
			setInquiryInfo(data);
			for(var i = 0; i < data.length; i++){
				if(data[i].returnCode == 0){
					$('.rsq_result_suc').show()
					$('.rsq_query, .rsq_result_fail, .rsq_note').hide();
				}else{
					$('.rsq_query,.rsq_result_suc').hide()
					$('.rsq_result_fail').show()
				}
			}	
			},
			error: function(){}
		});	
	}

	function setInquiryInfo(data) {
		if (data[0].returnCode != 0) {
			$('.rsq_query,.rsq_note, .rsq_result_suc').hide()
			$('.rsq_result_fail').show()
		} else {
			var imeiText = $.trim($("#imeiText").val())
			var acceptedTime = $.trim($("#acceptedTime").val())
			var repairStt = $.trim($("#repairStt").val())
			var pickupTime = $.trim($("#pickupTime").val())
			
			sn = data[data.length - 1].sn ? data[data.length - 1].sn : "";
			imei = data[data.length - 1].imei ? data[data.length - 1].imei : "";
			var stateObj = {};
			stateObj.getState = "";
			// set reapir state based on dialog input
			setRepairState(stateObj, data[data.length - 1].repairState);
			
			$(".rsq_result_suc ul.req_result_list")
					.append(
							$("<li><p class='rsq_name'>"+imeiText+"</p><p class='rsq_cont'>"
									+ imei
									+ "/<br>"
									+ sn
									+ "</p></li>"
									+ "<li><p class='rsq_name'>"+acceptedTime+"</p><p class='rsq_cont'>"
									+ data[data.length - 1].acceptTime
									+ "</li><li><p class='rsq_name'>"+repairStt+"</p><p class='rsq_cont'>"
									+ stateObj.getState
									+ "</p></li><li><p class='rsq_name'>"+pickupTime+"</p><p class='rsq_cont'>"
									+ data[data.length - 1].takeTime + "</p></li>"))

		}

	}

	function repairState(flg) {
		switch (flg) {
		case 1:
			return LAG_CON_SP_REP_TYPE1
		case 2:
			return LAG_CON_SP_REP_TYPE2
		case 3:
			return LAG_CON_SP_REP_TYPE3
		case 4:
			return LAG_CON_SP_REP_TYPE4
		case 5:
			return LAG_CON_SP_REP_TYPE5
		default:
			return ''

		}
	}

	$(document).ready(function(){
		sessionId3();
	});

	inquiry();
}
