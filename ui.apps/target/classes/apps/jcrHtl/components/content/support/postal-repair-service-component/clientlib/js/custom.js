if ($(".postal-repair-service-component").length > 0) {
	
	var data_attrs = $(".conv3_wrap.conv3_sup_express_wrap").data();
	var productTypeError = data_attrs.productTypeError;
	var productModelError = data_attrs.productModelError;
	var imeiError = data_attrs.imeiError;
	var issueDescriptionError = data_attrs.issueDescriptionError;
	var nameError = data_attrs.nameError;
	var cityError = data_attrs.cityError;
	var postalCodeError = data_attrs.postalCodeError;
	var addressError = data_attrs.addressError;
	var phoneNumberError = data_attrs.phoneNumberError;
	var emailAddressError = data_attrs.emailAddressError;
	var privacyPolicyError = data_attrs.privacyPolicyError;
	var verificationCodeError = data_attrs.verificationCodeError;
	var productTypeText = data_attrs.productTypeText;
	var productModelText = data_attrs.productModelText;
	var sendEmailErrorText = data_attrs.sendEmailErrorText;
	// api urls
	var submitExpInfoApiURL= data_attrs.submitExpInfoApiUrl;
	var expressRepairPolicyURL=  data_attrs.expressRepairPolicyUrl;
	var expressRepairTypeListURL= data_attrs.expressRepairTypeListUrl;
	var expressRepairIDNameURL= data_attrs.expressRepairIdNameUrl;
	var sessionUuidURL= data_attrs.sessionUuidUrl;
	var verificationImageCodeURL= data_attrs.verificationImageCodeUrl;
	var doorsessionidURL= data_attrs.doorsessionidUrl;
	
    var exp = {}
    exp.siteCode = SITE_CODE
    var vcode_error = verificationCodeError;
    var service_error = data_attrs.serviceErrorText;
    var select_device_type = productTypeText;
    var select_device_mode = productModelText;
    var place = select_device_mode;
    var pro = productModelText;
    var productModelPlaceholder = data_attrs.productModelPlaceholder;

    setSessionuuid(sessionUuidURL, verificationImageCodeURL, $('.auto-sessionid'),$('.auto-img'))

    function arrowchange(){
        if($("#cbg-selectbox-products").css("display") == "none"){
            $("#cbg-selectbox-products").show();
            $("#support_arrow").addClass("sbToggleOpen");
            $(".sbOptions").hide();
            $(".sbToggle").eq(0).removeClass("sbToggleOpen");
        }else{
            $("#cbg-selectbox-products").hide();
            $("#support_arrow").removeClass("sbToggleOpen");
        }
    }
    function show_product(obj){
        $("#device-model").attr("placeholder",place);
        $("#device-model").val("");
        if($(obj).val() == pro){    
            $(obj).val("");
            $(obj).attr("placeholder",place);
        }   
        var t = $.trim($(obj).val())
        if(t.length < 2 || t == pro){
            $("#support-select-a").show();
            getExpressRepairIDName($("#device-type"));
        }else{
            getproductcode(t);
        }
    } 
    $("#cbg-selectbox-products").delegate("a","click",function(){
        var rel_off = $(this).attr("rel");
        $(this).addClass("active").siblings().removeClass("active");
        $("#device-model").attr("rel",rel_off);
        $("#device-model").val($(this).text());
        $("#cbg-selectbox-products").hide();
        $("#device-model").attr("ppcode", $(this).attr("ppcode"));
    })
    function getExpressRepairTypeList(){
        $.ajax({
            type:"GET",
            async: false,
            url: expressRepairTypeListURL,
            dataType:"jsonp",
            jsonp:"jsonp",
            data:{'siteCode':SITE_CODE,'businessType':'JX'},
            success: function(data){
                if(data.length > 0){
                    var proType = document.getElementById("device-type");
                    for(var i=0; i<data.length; i++){
                        if(data[i].productLineId){
                            var _pid = data[i].superProblemId+"|"+data[i].productLineId;
                            var _pname = data[i].superProblemName;
                            if(!!proType && !!proType.options) {
                            	proType.options[proType.length] = new Option(_pname, _pid);
                            }
                        }
                    }
                }
                //$("#device-type-slc").bind("change",getProductIDName2);   
                $("#device-type").selectbox('detach').selectbox('attach');
                $("#device-models").selectbox('detach').selectbox('attach');    
                $(document).on("click","#sbOptions_" + $("#device-models").attr("sb") + " li a",deviceReady);   
            },
            error: function(){}
        });
    }

    function getExpressRepairIDName(obj){
        var select_device_type=$("#device-type option:selected").text();
        
        $("#ext-type").val(select_device_type); 
        $('#device-model').attr('ppcode','0')
        var problemId = $(obj).val().split("|")[0]; 
        $("#device-model").val("");
        if(problemId>0 ){
            $.ajax({
                type:"GET",
                async: false,
                url: expressRepairIDNameURL,
                dataType:"jsonp",
                jsonp:"jsonp",
                data:{ "problemId":problemId,"siteCode":SITE_CODE},
                    success: function(data){
                        //$("#cbg-selectbox-products ul").empty();
                        var products = document.getElementById("device-models")
                        products.length = 1
                        $(products).selectbox('detach').selectbox('attach');
                        for(var i = 0; i < data.length; i++){
                            //var _value = data[i].productCode;
                            //var _name = data[i].productTypeName==null?data[i].productCode:data[i].productTypeName;    
                            var _value = data[i].productCode;
                            var _name = data[i].productTypeName==null?data[i].productCode:data[i].productTypeName;  
                            //$("#cbg-selectbox-products").find("ul").append("<li><a ppcode='"+_value+"' rel='"+data[i].offeringCode+"|"+data[i].productId+"' class='selection_a'>"+_name+"</a></li>")
                            if(!!products && !!products.options) {
                            	products.options[products.length] = new Option(_name, _value);
                            }
                            //$("#device-model").append("<li><a ppcode='"+_value+"' rel='"+data[i].offeringCode+"|"+data[i].productId+"' class='selection_a'>"+_name+"</a></li>")
                        }
                        //$("#cbg-selectbox-products").show();
                        //$("#cbg-selectbox-products").find("ul").css("border","solid 1px #ccc");
                        //$("#cbg-selectbox-products").addClass("sbToggleOpen");
                        //refresh select ui
                        $(products).selectbox('detach').selectbox('attach');
                        $("#device-type").selectbox('detach').selectbox('attach');
                        //$("#device-models").selectbox('detach').selectbox('attach');
                        $(document).on("click","#sbOptions_" + $("#device-models").attr("sb") + " li a",deviceReady);
                        setTimeout(function(){
                            $("#device-models-input").trigger("click");
                            $("#device-models-input").focus();
                        },200); 
                    },
                error: function(){}
            });
        }
        setTimeout(function(){  $("#device-model").attr("placeholder",""); },200);

     
    }
    function getExpressRepairModelIdName(){
        $("#ext-model").val($("#device-model option:selected").text()); 
        
    }

    $(document).on('click','#submit-express',function(e){
        var tips = ''
        if($('#device-type').val() == "0" ){
            tips = productTypeError
        }else if($('#device-models').val() == "0"){
            tips = productModelError
        }else if($.trim($('#ext-num').val()) == "" || !($.trim($('#ext-num').val()).length == 15 || $.trim($('#ext-num').val()).length == 16 )){ 
            tips = imeiError
        }else if($.trim($('#ext-description').val()) == "" ){  
            tips = issueDescriptionError
        }else if($.trim($('#ext-name').val()) == "" ){  
            tips = nameError
        }else if($.trim($('#ext-city').val()) == "" ){  
            tips = cityError
        }else if($.trim($('#ext-postal').val()) == "" ){  
            tips = postalCodeError
        }else if($.trim($('#ext-address').val()) == "" ){  
            tips = addressError
        }else if($.trim($('#ext-phone').val()) == "" ){  
            tips = phoneNumberError
        }else if($.trim($('#ext-email').val()) == "" || !isEmail($.trim($('#ext-email').val()))){  
            tips = emailAddressError
        }else if(!$('#ext-policy').is(':checked')){  
            tips = privacyPolicyError
        }else if($.trim($("#vcode").val()) == '') {
            tips = verificationCodeError
        }
        if(tips != ''){
            alert(tips)
        }else{
            exp.email = $.trim($('#ext-email').val());
            exp.productCode = $.trim($("#device-models-input").attr("data-value"));
            exp.imei = $.trim($('#ext-num').val());
            exp.faultDesc =  $.trim($('#ext-description').val());
            exp.name = $.trim($('#ext-name').val());
            exp.phone =  $.trim($('#ext-phone').val());
            exp.mobile = $.trim($('#ext-mobile').val());
            exp.fax = $.trim($('#ext-fax').val());
            exp.zipCode = $.trim($('#ext-postal').val());
            exp.provinceName = $.trim($('#ext-provinceName').val());
            exp.cityName = $.trim($('#ext-city').val());
            exp.address = $.trim($('#ext-address').val());
            exp.validationCode = $.trim($('#vcode').val());
            exp.mailSubject = "D2D Service request "+ exp.imei;
            exp.sessionuuid = $(".auto-sessionid").val();
            exp.mailContent = "<strong>Type:" + $('#device-type').val() + "<br/><strong>Model:</strong>" + $('#device-model').val() + "<br/>" + 
            "<strong>Imei:</strong>" + exp.email + "<br/><strong>Description:</strong>" + $.trim($('#exp-description').val()) + "<br/>" + 
            "<strong>Name:</strong>" + $.trim($('#exp-name').val()) + "<br/><strong>City:</strong>" + $.trim($('#exp-city').val()) + "<br/>" + 
            "<strong>Postal Code:</strong>" + $.trim($('#exp-postal').val()) + "<br/><strong>Address:</strong>" + $.trim($('#exp-address').val()) + "<br/>" + 
            "<strong>Phone:</strong>" + $.trim($('#exp-phone').val()) + "<br/><strong>Email:</strong>" + exp.email
            submitExpInfo(exp)
            //gaExpressRepair()
        }
        
    });

    $("a#agree-repair").click(function() {
        $(".fixBox").css({
            "height": $(document).height()
        })
        $(".fixBox").fadeIn();
        $(".fixShowBox").fadeIn();
        
        getExpressRepairPolicy();
    });

    function getExpressRepairPolicy(){
        $.ajax({
            type:"GET",
            async: false,
            url: expressRepairPolicyURL,
            dataType:"jsonp",
            data:{siteCode:SITE_CODE,superTypeCode:"express-repair",subTypeId:"express-repair"},
            jsonp:"jsonp",
            success: function(data){
                $(".cont").append(data[0].content);
            },
            error: function(){}
        }); 
    }

    $(".fixShowBox .fixbox-close").click(function() {
        $(".fixBox").fadeOut();
        $(".fixShowBox").fadeOut();
    });   
    function deviceReady(){
        if ($(this).attr("rel")==0){
            $("#device-models-input").val("");
        }
        else{
            $("#device-models-input").val($(this).text());
            $("#device-models-input").attr("data-value",$(this).attr("rel"));
           // alert( $("#device-models-input").attr("data-value"))
            
        }  

    }  
    $(function(){
        getExpressRepairTypeList();
        $("#img_code").click(function(){
            setSessionuuid(sessionUuidURL, verificationImageCodeURL,$("#auto-sessionid"),$("#img_code"))
        })
        $("#device-models-input").click(function(){
            if ($("#device-models-input").val()==productModelText){
                $("#device-models-input").val("");
            }
            
            $("#device-models-input").attr("placeholder","");
            $("#sbToggle_" + $("#device-models").attr("sb") ).trigger("click");
            $(this).val("").trigger("keyup");
         });
         $(document).on("click", ".sbToggle:eq(1)", function(){ 
                $("#device-models-input").val("").trigger("keyup");
                $("#device-models-input").focus();
          });
        $("#device-models-input").keyup(function(){
            $("#sbOptions_" + $("#device-models").attr("sb") + " li a").each(function(){
                if ($(this).attr("rel").indexOf("0")!=0){
                    if ($(this).text().toUpperCase().indexOf( $("#device-models-input").val().toUpperCase())>=0 ) {
                        $(this).css("display","block");
                        $(this).html( $(this).text().replace(new RegExp("("+$("#device-models-input").val()+")","gi"), "<b style='color:red;' >$1</b>" ) ) ;
                    }
                    else{
                        $(this).css("display","none");
                        //$(this).text( $(this).attr("rel") ) ;
                    }
                }   
            })
         });
         
         
         
         $("#device-models-input").blur(function(){
                //$("#device-models-input").attr("placeholder","-- Select Product Model --");
                $("#device-models-input").val(productModelPlaceholder);
         });
         
        $(document).on("click","#sbOptions_" + $("#device-models").attr("sb") + " li a",deviceReady);
             
        
                    
        


      onlyIntegerKeyUp=function(e){
        if(e===undefined){
            e=window.event;
        }
        var obj=e.srcElement?e.srcElement:e.target;
        var pattern = /[^\d]/ig;
        var val=obj.value;
        if(pattern.test(val)) {
            var i=getCursortPosition(e);
            obj.value=val.replace(pattern,'');
            setCaretPosition(e,i);
        }
      };
      getCursortPosition=function(event) {
        if (event === undefined || event === null) {
            event = arguments.callee.caller.arguments[0] || window.event;
        }
        var obj = event.srcElement?event.srcElement:event.target;
        var CaretPos = 0;   // IE Support
        if (document.selection) {
            obj.focus ();
            var Sel = document.selection.createRange ();
            Sel.moveStart ('character', -obj.value.length);
            CaretPos = Sel.text.length;
        } else if (obj.selectionStart || obj.selectionStart == '0'){
            // Firefox support
            CaretPos = obj.selectionStart;
        }
        return (CaretPos);
      };
      setCaretPosition=function(event, pos){
        if (event === undefined || event === null) {
            event = arguments.callee.caller.arguments[0] || window.event;
        }
        var obj = event.srcElement?event.srcElement:event.target;
        if (pos > 0) {
            pos = pos - 1;
        }
        if(obj.setSelectionRange){
            obj.focus();
            obj.setSelectionRange(pos,pos);
        } else if (obj.createTextRange) {
            var range = obj.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
      };
      onlyNumAndAlphKeyUp=function(event){
        if(event===undefined){
            event=window.event;
        }
        var obj=event.srcElement?event.srcElement:event.target;
        var pattern = /[^\w]/ig;
        if(pattern.test(obj.value)) {
            var i=getCursortPosition(event);
            obj.value=obj.value.replace(pattern,'');
            setCaretPosition(event,i);
        }
      };
    })
    function mailedRepairCallback(data){
        if(data.returnCode==0){
        	analyticsSubmit("Support > Successful repair appointment", "Submit", exp.productCode + exp.faultDesc + data.repairNo, EVENT_TYPE_POST_REPAIR);
            window.location.href =  $("#exp-succ").attr("href");
        }else if (data.returnCode==8||data.returnCode==9){
            alert(vcode_error );
            setSessionuuid(sessionUuidURL, verificationImageCodeURL,$("#auto-sessionid"),$("#img_code"))
            //doorsessionid();
            return false;
        }else if (data.returnCode==4){
            
        	var already_submit_error = $(".conv3_wrap.conv3_sup_express_wrap").data('already-submit-error');
            setSessionuuid(sessionUuidURL, verificationImageCodeURL,$("#auto-sessionid"),$("#img_code"))
            alert(already_submit_error );
            
            return false;
        }else{ 
            setSessionuuid(sessionUuidURL, verificationImageCodeURL,$("#auto-sessionid"),$("#img_code"))
            alert(sendEmailErrorText);
            return false;
        }
    }  
    function doorsessionid(){
        $.ajax({
            type:"GET",
            async: false,
            url: doorsessionidURL,
            dataType:"jsonp",
            jsonp:"jsonp",
            success: function(data){
              var ssind = data.sessionuuid; 
              if(ssind=!null){
                    console.info(ssind);
                    $("#auto-sessionid").val(ssind);
                    $("#img_code").click();
              }
            },
            error: function(){$("#contact-prompt-5").text(sendEmailErrorText)}
        });         
    } 
    function submitExpInfo(exp){
        $.ajax({
            type:"GET",
            async: false,
            url: submitExpInfoApiURL + "?method=mailedRepairApply",
            dataType:"jsonp",
            jsonp:"jsonp",
            data:exp,
            success: function(data){
            	console.log(data);
                if(data.returnCode == "0"){
                    //gaExpressRepair()
                    window.location.href = $('#exp-succ').attr('href');
                }else if(data.returnCode == "8" || data.returnCode == "9"){
                    alert(vcode_error)
                }else{
                    alert(service_error)
                }
                $('.auto-image').click()
            },
            error: function(){}
        }); 
    }
}