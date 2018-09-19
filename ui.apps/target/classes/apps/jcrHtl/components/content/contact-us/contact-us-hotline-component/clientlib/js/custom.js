(function(document, $) {
	'use strict';

	$(document).ready(function() {
		if ($('.conv3_contact_hotline').length > 0) {
			$('.conv3_contact_hotline').each(function() {
				getHotLineCountry($(this));
			});
		}
	});

	function getHotLineCountry(el) {
		var apiUrl = $(el).attr('data-countryApiUrl');
		$.ajax({
			url: apiUrl,
			dataType: "jsonp",
			jsonp: "jsonp",
			type: "GET",
			success: function (data) {
				if (data != null && data.length > 0) {
					$(el).find("#hotline_country_region").empty();
					for (var i = 0; i < data.length; i++) {
						$(el).find("#hotline_country_region").append("<li data-siteCode='" + data[i].siteCode + "' >" + data[i].placeName + "</li>");
					}
					bindCountryRegion(el);
					$(el).find("#hotline_country_region li:first-child").trigger("click");
					bindCountryRegionAnalytics(el);
				}
			},
			error: function (error) {}
		});
	}

	function bindCountryRegion(el) {
		var apiUrl = $(el).attr('data-infoApiUrl');
		$(el).find("#hotline_country_region li").click(function () {
			$(el).find("#hotline_country_region li:first-child").parent("ol").prev("span")
				.text($(this).text())
				.attr("data-siteCode", $(this).attr("data-siteCode"));
			var hlab = $(this).text()
			$.ajax({
				url: apiUrl,
				data: { siteCode: $(this).attr("data-siteCode") },
				dataType: "jsonp",
				jsonp: "jsonp",
				type: "GET",
				success: function (data) {
					data.hotline?$(el).find("#hotline_support_number").text(data.hotline):$(el).find("#hotline_support_number").text("");
					data.supportLanguage?$(el).find("#hotline_support_language").text(data.supportLanguage):$(el).find("#hotline_support_language").text("");
					data.supportTime?$(el).find("#hotline_support_time").text(data.supportTime):$(el).find("#hotline_support_time").text("");
					if (data.remark!=null && data.remark!="" ){
						$(el).find("#hotline_support_remark").text(data.remark);
					}else{
						$(el).find("#hotline_support_remark").text(" ");
					}
					
				},
				error: function (error) {}
			});
			
		});
	}
	
	function bindCountryRegionAnalytics(el) {
		$(el).find("#hotline_country_region li").click(function () {
			analyticsSubmit("Contact Us--Hotlines","Hotlines Selection",$(this).text(), EVENT_TYPE_CONTACT_US_HOTLINE);
		});
	}
	
})(document, jQuery);

