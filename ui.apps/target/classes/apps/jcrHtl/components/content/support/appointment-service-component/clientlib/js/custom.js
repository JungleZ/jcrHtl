if($('.appointment-service-comp').length > 0) {
	;(function( $ ) {
		var pd_drop_err = $.trim($(".appointment-service-comp").attr('product-dropdown-err'));
		var pd_model_err = $.trim($(".appointment-service-comp").attr('product-model-dropdown-err'));
		var operator_err = $.trim($(".appointment-service-comp").attr('operator-options-err'));
		var serv_type_err = $.trim($(".appointment-service-comp").attr('service-type-err'));
		var province_drop_err = $.trim($(".appointment-service-comp").attr('province-dropdown-err'));
		var city_drop_err = $.trim($(".appointment-service-comp").attr('city-dropdown-err'));
		var appoint_date_err = $.trim($(".appointment-service-comp").attr('appointment-date-err'));
		var appoint_time_err = $.trim($(".appointment-service-comp").attr('appointment-time-err'));
		var fault_info_err = $.trim($(".appointment-service-comp").attr('fault-info-err'));
		var surname_err = $.trim($(".appointment-service-comp").attr('surname-err'));
		var given_name_err = $.trim($(".appointment-service-comp").attr('given-name-err'));
		var mobile_phone_err = $.trim($(".appointment-service-comp").attr('mobile-phone-err'));
		var email_add_err = $.trim($(".appointment-service-comp").attr('email-address-err'));
		var imei_no_err = $.trim($(".appointment-service-comp").attr('imei-no-err'));
		var verify_code_err = $.trim($(".appointment-service-comp").attr('verification-code-err'));
		var private_policy_err = $.trim($(".appointment-service-comp").attr('private-policy-err'));
		var service_center_err = $.trim($(".appointment-service-comp").attr('service-center-err'));
		var LAG_INPUT_VERIFICATION_CODE = $(".appointment-service-comp").data("input-verification-code-message");
		var LAG_SUBMIT_REPEAT        = $(".appointment-service-comp").data("submit-repeat-message");
		var LAG_SELECT_A_SERVICE_CENTER = $(".appointment-service-comp").data("select-a-service-center-message");
		var LAG_FULL_RESERVATION = $(".appointment-service-comp").data("full-reservation-message");
		var reser_product_type_api = $(".appointment-service-comp").data("reser-product-type-api");
		var reser_product_by_id_api = $(".appointment-service-comp").data("reser-product-by-id-api");
		var reser_province_api = $(".appointment-service-comp").data("reser-province-api");
		var reser_city_api = $(".appointment-service-comp").data("reser-city-api");
		var reser_address_list_api = $(".appointment-service-comp").data("reser-address-list-api");
		var reser_time_api = $(".appointment-service-comp").data("reser-time-api");
		var reser_problem_info_api = $(".appointment-service-comp").data("reser-problem-info-api");
		var reser_apply_api = $(".appointment-service-comp").data("reser-apply-api");
		var sessionUuidURL= $(".appointment-service-comp").data("session-uuid-url");
		var verificationImageCodeURL= $(".appointment-service-comp").data("verification-image-code-url");
		
		$('.cbg-selectbox').selectbox()
		getStoreServerTime()
		setSessionuuid(sessionUuidURL, verificationImageCodeURL, $('.auto-sessionid'),$('.auto-img'))
		getReservationProductType()
		getReservationPorvience()
		var sunday = 'Sun'
		$(document).on('change','#cbg-pro-type',function(e){
			getReservationProductByID($(this).val())
		}).on('change','#code-province',function(e){
			getReservationCities($(this).val())
		}).on('click','.cbg-btn-search',function(e){
			var areaid = $("#code-city").val().split("|")[1];
			if(areaid > 0){
				var _data={"siteCode":SITE_CODE,"sortByType":"1","isReservation":"1","placeId":areaid,"curPage":"1"};
			    getReserAddressList(_data)
			}	
		}).on("click",'.cbg-btn-list label',function(e){
		    !$(this).parent().is('em')&&$(this).wrap('<em></em>');
		    $(this).closest('li').siblings().find('label').not('.cbg-disabled').each(function () {
		        if ($(this).parent().is('em')) $(this).unwrap();
		    });
		    $(this).find('input[type=radio]').attr('checked', 'cheked');
		}).on("click",'.next_tep1',function(e){
		   checkSetup1()
		}).on("click",'#stores-time label',function(e){
		   var i_data = {"SITE_CODE":SITE_CODE,"networkId":$("#y-store-cbg-info tr input:checked").attr("id"),reservationDate:$(this).data("day").split("&")[0],day:$(this).data("day")}
		   setReservationTime(i_data);
		   getProblemListsInfo();
		}).on("click",'.y-problem-btn',function(e){
		   checkSetup2()
		}).on('click','.back-fill',function(e){
			var last = parseInt($(this).attr('lastContent'))
			$('.cbg-steps .y-cbg-step-btn').eq(last+1).fadeOut()
			$('.cbg-steps .y-cbg-step-btn').eq(last).fadeIn(function () {
		        $('html,body').animate({ scrollTop: 0 });
		    });
		}).on("click",'#submit-reservation',function(e){
		   checkSetup3()
		}).on("click",'.y-confirm-box input',function(e){
		   var s = $(this).attr('d-val')
		   if(s == 'No'){
		   		$('#confirm-box').hide();
		        return false;
			}else{
		   		$('#confirm-box').hide();
		    	var y_data = {
		        	"siteCode": SITE_CODE,
		        	"serviceType": $('#cbg-reservation-form input[name=service-type-1]:checked').parent().find("span").text(),
		        	"reservationDate": $('#cbg-reservation-form input[name=service-date]:checked').parent().attr("data-day").split("&")[0], 
		        	"timeRange": $('#cbg-reservation-form input[name=service-time]:checked').parent().find('.y-time').text(),
		        	"networkId": $('#cbg-reservation-form input[name=service-center]:checked').attr("id"),
		        	"productCode": $('#cbg-pro-name').val().split("|")[0],
		        	"imei": $('#cbg-reservation-form input[name=imei]').val(),
		        	"validationCode": $('.y-vericode').val(),
		        	"sessionuuid": $(".auto-sessionid").val(),
		        	"networkName": $('#cbg-reservation-form input[name=service-center]:checked').parent().find('.provice-name').text(),
		        	"lastName": $('#cbg-reservation-form input[name=user-surname]').val(),
		        	"firstName": $('#cbg-reservation-form input[name=user-givenname]').val(),
		        	"provinceName": $('.cbg-selectbox[name="user-province"]').find("option:selected").text(),
		        	"cityName": $('.cbg-selectbox[name="user-city"]').find("option:selected").text(),
		        	"mobile": $('#cbg-reservation-form input[name=user-phone]').val(),
		        	"email": $('#cbg-reservation-form input[name=user-email]').val(),
		        	"operators": $('#cbg-reservation-form select[name=operator]').find("option:selected").text()
		    	};
		    	if($('#cbg-reservation-form input[name=service-type]:checked').hasClass('y-last-list')){
		        	y_data.faultDesc = $('textarea[name=service-type-description]').val();
		    	}else{
		        	y_data.faultDesc = $('#cbg-reservation-form input[name=service-type]:checked').next("span").text();
		    	}
		    	if($.trim($('#cbg-reservation-form input[name=user-tel]').val()) != ''){
		        	y_data.telephone = $('#cbg-reservation-form input[name=user-tel]').val();
		    	}
		    	if($.trim($('#cbg-reservation-form input[name=user-fax]').val()) != ''){
		        	y_data.fax = $('#cbg-reservation-form input[name=user-fax]').val();
		    	}
		   		getReservationApply(y_data,$('#reservation-success').attr('href'))	
		   }
		}).on('click','.auto-img',function(e){
			setSessionuuid(sessionUuidURL, verificationImageCodeURL,$('.auto-sessionid'),$('.auto-img'))
		})
	
	
		function checkSetup1(){
			var tips = ''
			if($("#cbg-pro-type").val() == "0"){
				tips = pd_drop_err
			}else if($('#cbg-pro-name').val() == "0"){
				tips = pd_model_err
			}else if($('#cbg-pro-opetator').val() == "0"){
				tips = operator_err
			}else if($('#cbg-reservation-form input[name=service-type-1]').length > 0 && $('#cbg-reservation-form input[name=service-type-1]:checked').length == 0){
				tips = serv_type_err
			}else if($("#code-province").val() == "0"){
				tips = province_drop_err
			}else if($("#code-city").val() == "0"){
				tips = city_drop_err
			}else if($('#cbg-reservation-form input[name=service-center]:checked').length == 0){
				tips = service_center_err
			}else{
				$('.cbg-steps').children('li').fadeOut();
				$('.cbg-steps').children('li').eq(1).fadeIn(function () {
		            $('html,body').animate({ scrollTop: 0 });
		        });
		        return false
			}
			alert(tips)
		}
	
		function checkSetup2(){
			 if ($('#cbg-reservation-form input[name=service-date]:checked').length == 0) {
		        alert(appoint_date_err);
		        return false;
		    }else  if($('#cbg-reservation-form input[name=service-time]:checked').parent().hasClass('cbg-disabled') || $('#cbg-reservation-form input[name=service-time]:checked').length == 0) {
		        alert(appoint_time_err);
		        return false;
		    }else{
		    	$('.cbg-steps').children('li').fadeOut();
				$('.cbg-steps').children('li').eq(2).fadeIn(function () {
		            $('html,body').animate({ scrollTop: 0 });
		        });	
		    }
		}
	
		function  checkSetup3(){
			var reNum = /^[0-9]+.?[0-9]*$/;
			var tips = ''
			 if($('#cbg-reservation-form input[name=service-type]:checked').length == 0) {
		        tips = fault_info_err
		    }else if($('#cbg-reservation-form input[name=service-type]:checked').hasClass('y-last-list') && $.trim($('#cbg-reservation-form textarea[name=service-type-description]').val()) == ''){
		        tips = fault_info_err
		        $('textarea[name=service-type-description]').focus();
		    }else if($.trim($('#cbg-reservation-form input[name=user-surname]').val()) == '') {
		        tips = surname_err
		    }else if($.trim($('#cbg-reservation-form input[name=user-givenname]').val()) == '') {
		        tips = given_name_err
		    }else if($.trim($('#cbg-reservation-form input[name=user-phone]').val()) == '' || !reNum.test($('#cbg-reservation-form input[name=user-phone]').val())) {
		        tips = mobile_phone_err
		    }else if($.trim($('#cbg-reservation-form input[name=user-email]').val()) == '' || !isEmail($.trim($('#cbg-reservation-form input[name=user-email]').val()))){
		        tips = email_add_err
		    }else if($.trim($('#cbg-reservation-form input[name=imei]').val()) == '' || $.trim($('#cbg-reservation-form input[name=imei]').val()).length < 8) {
		        tips = imei_no_err
		    }else if($.trim($('.y-vericode').val()) == '') {
		        tips = verify_code_err
		    }else if($('#cbg-reservation-form input[name=agree]:checked').length == 0) {
		        tips = private_policy_err
		    }else{
		    	$('#confirm-box').show();
		    	return false;
		    }
		    alert(tips)   	
		}
	
		function getStoreServerTime(){
			for(var i = 1 ; i <= 5; i++){
				 milseconds = new Date().getTime() + i*1000*60*60*24
				$("#stores-time").append("<li><label class='cbg-btn cbg-btn-label cbg-service-data'><input type='radio' name='service-date' class='cbg-btn-input'></input></label></li>");
		        $("#stores-time label").eq(i-1).append("<span>"+ getStoreDate(milseconds) +"");
				$("#stores-time label").eq(i-1).attr("data-day",getStoreDate(milseconds));
			}
		}
	
		function getStoreDate(mseconds){
			var t = new Date()
			t.setTime(mseconds)
			var y = t.getFullYear()
			var m = parseInt(t.getMonth()+1) + ''
			if(m.length == 1) m = "0" + m
			var d = t.getDate() + ''
			if(d.length == 1) d = "0" + d
		   	var w = returnWeekDay(t.getDay())
		   	return y + "-" + m + "-" + d + "  " + w          
		}
	
		function returnWeekDay(day){
			switch(day){
		       case 1:
		          return 'Mon';   break;
		        case 2:
		          return 'Tue';   break;
		        case 3:
		          return 'Wed';   break;
		        case 4:
		          return 'Thu';  break;
		        case 5:
		          return 'Fri';   break;
		        case 6:
		          return 'Sat';   break;
		        case 0:
		          return 'Sun';   break;
		    }
		}
		
		function getReservationProductType(){
			var proType = document.getElementById("cbg-pro-type");
		    $.ajax({
		        type:"GET",
				async: false,
				url: reser_product_type_api ,					  
				dataType:"jsonp",
				jsonp:"jsonp",
				data:{'siteCode':SITE_CODE,'businessType':'YY'},
				success: function(data){
					if(data.length > 0){
						for(var i=0; i<data.length; i++){
							if(data[i].productLineId){
								if(!!proType && !!proType.options){
									proType.options[proType.length] = new Option(data[i].superProblemName, data[i].superProblemId+"|"+data[i].productLineId);
								}
							}
						}
						$(proType).selectbox('detach').selectbox('attach');
					}
				},
				error: function(){}
		    })
		}
	
		function getReservationProductByID(proid){
		    var problemId= proid.split("|")[0];
		   	var prolist = document.getElementById("cbg-pro-name");
		   	prolist.length = 1
		   	$(prolist).selectbox('detach').selectbox('attach');
		    $.ajax({
		        type:"GET",
		        async:false,
		    	url: reser_product_by_id_api,
		        dataType:"jsonp",
				jsonp:"jsonp",
				data:{ "problemId":problemId,"siteCode":SITE_CODE},
				success: function(data){
					if(data.length > 0){
						var proNames = document.getElementById("cbg-pro-name");
					   	for(var i=0; i<data.length; i++){
					   		var pronames = data[i].productTypeName?data[i].productTypeName:data[i].productCode
							if(""!=data[i].productId && data[i].productId!=null && "null"!=data[i].productId){
								if(!!proNames && !!proNames.options){
									proNames.options[proNames.length] = new Option(pronames,data[i].productCode+"|"+data[i].productId);
								}
							}
					   }
					   $(prolist).selectbox('detach').selectbox('attach');
					} 
				},
				error: function(){}
		    })
		}
	
		function getReservationPorvience(){
		    $.ajax({
		        type:"GET",
				async: false,
				url: reser_province_api,
				dataType:"jsonp",
				jsonp:"jsonp",
		        data:{"siteCode":SITE_CODE,"serviceType":"network","isReservation":"1"},
		        success: function(data){
		            if(data.length > 0){
		                var Porviences = document.getElementById("code-province");
		                for(var i = 0; i < data.length; i++){
		                    if(data[i].placeId!=null && ""!=data[i].placeId){
		                    	if(!!Porviences && !!Porviences.options){
		                    		Porviences.options[Porviences.length] = new Option(data[i].placeName, data[i].placeCode + "|" + data[i].placeId);
		                    	}
		                    }
		                }
		                $(Porviences).selectbox('detach').selectbox('attach');
		            }
		        },
		        error: function(){}
		    })
		}
		function getReservationCities(provinecode){
		    var n_provine = provinecode.split("|")[1];
		    var n_city = document.getElementById("code-city");
			n_city.length = 1;
			$(n_city).selectbox('detach').selectbox('attach');
			$.ajax({
			    type:"GET",
				async: false,
				url: reser_city_api,
				dataType:"jsonp",
				jsonp:"jsonp",
		        data:{"siteCode":SITE_CODE,"placeId":n_provine,"serviceType":"network","isReservation":"1"},
		        success: function(data){
		            if(data.length > 0){
		                for(var i = 0; i < data.length; i++){
		                    if(data[i].placeId!=null && ""!=data[i].placeId){
		                    	if(!!n_city && !!n_city.options){
		                    		n_city.options[n_city.length] = new Option(data[i].placeName, data[i].placeCode + "|" + data[i].placeId)
		                    	}
							}	
		                }
		                $(n_city).selectbox('detach').selectbox('attach');
		            } 
		        },
		        error: function(){}
			})
		}
	
		function getReserAddressList(_data){
		    $.ajax({
		        type:"GET",
				async: false,
				url: reser_address_list_api,
				dataType:"jsonp",
				jsonp:"jsonp",
		    	data:_data,
		    	success: function(data){
		    		if(data.length > 0){
		    		    if($("#y-store-cbg-info tbody").find("tr").length > 0){
							$("#y-store-cbg-info tbody").empty();
						}
						for(var i = 0; i < data.length; i++){
							var phone = data[i].phone?data[i].phone:''
							if(1==data[i].typeCode){
								var xing="<span class='support-icon s-xing'></span><span class='support-icon s-xing'></span><span class='support-icon s-xing'></span><span class='support-icon s-xing'></span><span class='support-icon s-xing'></span>";
								var cl = "cbg-rank-stars-5"
							}else if (2==data[i].typeCode){
								var xing="<span class='support-icon s-xing'></span><span class='support-icon s-xing'></span><span class='support-icon s-xing'></span><span class='support-icon s-xing'></span>";
								var cl = "cbg-rank-stars-4"
							}else {
								var xing="<span class='support-icon s-xing'></span><span class='support-icon s-xing'></span><span class='support-icon s-xing'></span>";
								var cl = "cbg-rank-stars-3"
							}
							var add = data[i].address;
							var addressArr =data[i].placeCode.split(",");
							var adr1 = (addressArr[1]=="null" || addressArr[1]==null)?"":addressArr[1];
							var adr2 = (addressArr[2]=="null" || addressArr[2]==null)?"":addressArr[2];
							var adr3 = (addressArr[3]=="null" || addressArr[3]==null)?"":addressArr[3];
							if(adr1==adr2||adr2==adr3){
								add = adr1+" "+adr3+" "+data[i].address;
							} else {
								add = adr1+" "+adr2+" "+adr3+" "+data[i].address;
							}
							var aclass = i%2==0?"":" class='cbg-alternate' ";
							var ades1 = data[i].networkName;
							var ades2='';
							var ades2='';
							if(ades1.indexOf(" ")>0){
								ades2 = ades1.substr(0,ades1.indexOf(" "));
								ades2 += "-"+ades1.substr(ades1.indexOf(" ")+1,ades1.length);
							}else{
								ades2 = ades1;
							}
							$("#y-store-cbg-info").append("<tr "+aclass+"><td style='min-width:100px;' ><label><input type='radio' name='service-center'"+
							"ncode='"+data[i].networkCode+"' id='"+data[i].networkId+"'><span class='provice-name'>&nbsp;&nbsp;"+data[i].networkName+"</span></label>"+
							"</td><td style='min-width:120px;' >"+xing+"</td><td><a class='create_icon'></a>"+add+"</td><td style='min-width:120px;' >"+phone+"</td></tr>");
							
							
							
						}
						$('#y-store-cbg-info').each(function(e){
							$(this).find("tr:even").addClass("even");
							$(this).find("tr:odd").addClass("odd");
						});
		    		}
		    	},
		    	error: function(){}
		    })
		}
	
		function setReservationTime(_data){
		    $.ajax({
		        type:"GET",
				async: false,
				url: reser_time_api, 
				dataType:"jsonp",
				data:_data,
				jsonp:"jsonp",
				success: function(data){
					var _clone =$("<li><label class='cbg-btn'></label></li>");
					if(data.length > 0){
					    $("#cbg-wrapper-ul").empty();
					    for(var i = 0 ; i<data.length;i++){
					        var maxresertime = data[i].maxAppointTimesNumber;
							var hasusedtime = data[i].appointTimesNumber;
							var availabletime = maxresertime-hasusedtime;
							var _c = _clone.clone();
							_c.attr("type",data[i].timeRange);
							if(availabletime > 0) {
								_c.find("label").html("<input type='radio' name='service-time'><em class='y-time'>"+data[i].timeRange+"</em>&nbsp;&nbsp;&nbsp;"+"<span>"+"("+availabletime+"&nbsp;Person Available)"+"</span>");   
							}else if(availabletime < 1){
								_c.find("label").addClass("cbg-disabled").html("<input type='radio' name='service-time'><em class='y-time'>"+data[i].timeRange+"</em>&nbsp;&nbsp;&nbsp;<span>(Fully booked)</span>");
							}
							if((i + 1) % 3 == 0){
								$(_c).css({"margin-right":"0"});
							}
							$("#cbg-wrapper-ul").append(_c);
					    }
					}
					$("#cbg-wrapper-ul li label").not(".cbg-disabled").click(function(event){
					    event = event || window.event;
		        	    event.preventDefault();
						!$(this).parent().is('em')&&$(this).wrap('<em></em>');
		          		$(this).closest('li').siblings().find('label').not('.cbg-disabled').each(function () {
		            		if ($(this).parent().is('em')) {
		              			$(this).unwrap();
		            		}
		          		});
		          		$(this).find('input[type=radio]').attr('checked', 'cheked');
					});
				},
				error: function(){}
		    })
		}
	
		function getProblemListsInfo(){
		    var _paramsProduct = {};
		    _paramsProduct.businessType = "YY";
			_paramsProduct.siteCode = SITE_CODE;
			_paramsProduct.productid = $('#cbg-pro-name').val().split("|")[1];
		    $.ajax({
		        type:"GET",
				async: false,
				url: reser_problem_info_api,
				dataType:"jsonp",
				data:_paramsProduct,
				jsonp:"jsonp",
				success: function(data){
					if(data.length>0){
					   $("#y-pro-problem").empty();
					   for (var i =0 ;i<data.length;i++){
					       $("#y-pro-problem").append("<li><label class='cbg-btn'><input type='radio' name='service-type' value='"+data[i].problemId+"'><span> "+data[i].problemName+"</span></label></li>");
					   } 
					}
				},
				complete: function(){
					$("#y-pro-problem li").last().addClass("y-li-last").find("input").addClass("y-last-list");
					$("#y-pro-problem label").click(function(event){
					    event = event || window.event;
		        	    event.preventDefault();
		        	    !$(this).parent().is('em')&&$(this).wrap('<em></em>');
						$(this).closest('li').siblings().find('label').not('.cbg-disabled').each(function () {
							if ($(this).parent().is('em')) {
				   			$(this).unwrap();
							}
						});
						$(this).find('input[type=radio]').attr('checked', 'cheked');
						if($(this).parent('em').parent().hasClass('y-li-last')){
						    $("#cbg-service-type-description").show();	
						}else{
							$("#cbg-service-type-description").hide();
						}
					})
				},
				error: function(){}
		    })
		}
	
		function getReservationApply(_datas,links){
			
		    $.ajax({
		        type:"GET",
				async: false,
				url: reser_apply_api,
				data: _datas,
				jsonp:"jsonp",
				dataType:"jsonp",
				success:function(data){
					if(data.returnCode!="null"){
					    var _code = data.returnCode;
					    if(_code == 0){
					        window.location = links + "?id=" + data.reservationNo;
					        analyticsSubmit("Support > Successful appointment","Submit", _datas.productCode + _datas.faultDesc + data.reservationNo, EVENT_TYPE_APPOINTMENT_SERVICE);
					    }else if(_code == 2){
					    	alert(LAG_SELECT_A_SERVICE_CENTER); 
					    }else if(_code == 5){
					    	alert(LAG_FULL_RESERVATION);
					    }else if(_code == 8 || _code == 9){
					    	alert(LAG_INPUT_VERIFICATION_CODE);
					    }else if(_code == 4){
					    	alert(LAG_SUBMIT_REPEAT);
					    }
					   // $("#img_codee4").click();
					    setSessionuuid(sessionUuidURL, verificationImageCodeURL,$('.auto-sessionid'),$('.auto-img'));
					}
				},
				error: function(){}
		    })
		}
	})( jQuery );
}