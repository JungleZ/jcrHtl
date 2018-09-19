if($(".support_notice").length > 0) {
	function nmuberDateFormat(milliseconds){
		var time= new Date(milliseconds);  
		var year=time.getFullYear();  
		var month=time.getMonth() +1;  
		var day=time.getDate();  
		var nowTime=year + "-" + month + "-" + day;
		return nowTime;
	}
	function getFirstNotice(){
		var sc_notice_list = sc_notice_list || '';
		var detailLink = $(".support_notice_info").attr("data-detailLink");
		$.ajax({
			type:"GET",
			async: false,
			url: $.trim($("#apiUrl").val()),
			dataType:"jsonp",
			jsonp:"jsonp",
			data:{"siteCode": SITE_CODE},
			success:function(data){
				if(data.length == 0){
					$('.support_notice').hide()
				}else{
					var $c = $('.support_notice')
					$c.find('.notice_info_title a').text(data[0].title)
					$c.find('a.dt_url').attr('href',detailLink + "?id=" + data[0].afficheId)
					$c.find('.support_notice_img img').attr('src',data[0].imagePath).attr('alt',data[0].title)
					$c.find('.notice_info_desc').text(data[0].description)
					$c.find('.notice_info_date').text(nmuberDateFormat(data[0].publishDate))
					$('.support_notice').show()
				}
			},
			error:function(){$('.support_notice').hide()}
		})
	}
	$(document).ready(function(){
		getFirstNotice()	
	})
}