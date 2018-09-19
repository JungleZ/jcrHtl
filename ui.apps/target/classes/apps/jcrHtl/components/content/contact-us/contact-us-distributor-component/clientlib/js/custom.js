if($('.distributors-ul-01').length > 0) {
	;(function( $ ) {
		var distributorNameArr = new Array();
		$(".distributors-ul-01").each(function() {
			var distr_name = $.trim($(this).attr('data-distributor-name'));
			if (distr_name !== '') {
				distributorNameArr.push(distr_name);
			}
		})
		
		if (typeof distributorNameArr !== 'undefined' && distributorNameArr.length > 0) {
			//distributorNameArr = $.unique(distributorNameArr).sort();
			var distributorNameUnique = getUnique(distributorNameArr).sort();
			for (var i = 0; i< distributorNameUnique.length; i++) {
				$(".finder_box ol").append("<li value='" + distributorNameUnique[i] + "' >" + distributorNameUnique[i] + "</li>");
			}
		}
		
		$(".distributors-ul-01 > li").hide();
		$(".distrNone").hide();
		
		function getUnique(inputArray) {
			var outputArray = [];
			for (var i = 0; i < inputArray.length; i++) {
				if ((jQuery.inArray(inputArray[i], outputArray)) == -1) {
					outputArray.push(inputArray[i]);
				}
			}
			return outputArray;
		}
		
		
		$('.conv3_contact_wrap .conv3_global_selector #m2m_country_select li').click(function() {
			var distr = "Distr" + $(this).attr("value");
			$(".distributors-ul-01 > li").hide();
			$(".distrNone").hide();
			if ( $("." + distr).length == 0 ) {
				$(".distrNone").show();
			}else{
				$("." + distr).show();
			}
		
			// analytics event
			analyticsSubmit("Contact Us--M2M Distributor","M2M Selection",$(this).text(), EVENT_TYPE_M2M_DISTRIBUTOR);
		});
	})( jQuery );
}