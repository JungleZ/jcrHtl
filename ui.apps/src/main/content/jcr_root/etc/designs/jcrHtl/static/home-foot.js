

	//Call plugin
	$('.advertisement').edslider({
		width : '100%',
	});
	
	$('.menu li.list').on('click',function(){
		$(this).toggleClass('open');
	});
	
	//轮播广告
	$('.slideshow').each( function() {
		  var $slideshow = $(this);
		  $slideshow.imagesLoaded( function() {
			$slideshow.skidder({
			  slideClass    : '.slide',
			  animationType : 'css',
			  scaleSlides   : true,
			  maxWidth : 1300,
			  maxHeight: 500,
			  paging        : true,
			  autoPaging    : true,
			  pagingWrapper : ".skidder-pager",
			  pagingElement : ".skidder-pager-dot",
			  swiping       : true,
			  leftaligned   : false,
			  cycle         : true,
			  jumpback      : false,
			  speed         : 400,
			  autoplay      : false,
			  autoplayResume: false,
			  interval      : 4000,
			  transition    : "slide",
			  afterSliding  : function() {},
			  afterInit     : function() {}
			});
		  });
	});
	
	
	  


	$(window).smartresize(function(){
		  $('.slideshow').skidder('resize');
	});
