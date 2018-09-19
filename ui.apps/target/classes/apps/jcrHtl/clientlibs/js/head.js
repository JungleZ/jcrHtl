
<script type="text/javascript">
/* DataLayer for Samsung - Last Modified Date 2016-07-13 by Kim myounggyu */
var siteCode = "";
var pageURL = "";

siteCode = window.location.href.split("/")[3];
pageURL = window.location.href;

var digitalData = {
		"page" : { 
			"pageInfo" : {
				"siteCode" : siteCode,
                "siteSection": "", //pathIndicator鞝曤炒 鞚挫毄頃橃棳 靹れ爼
				"pageName" : "", //pathIndicator鞝曤炒 鞚挫毄頃橃棳 靹れ爼
				"pageURL" : pageURL,
				"pageTrack" : "" //All page(server-side)
				},
			"pathIndicator" : { //product page(server-side)
				"depth_2" : "",
				"depth_3" : "",
				"depth_4" : "",
				"depth_5" : ""
				}
		},
		"user" : {
			"loginStatus" : ""
			},
		"product" : {
			"category" : "", // pathIndicator depth鞝曤炒 鞚挫毄頃橃棳 靹れ爼
			"model_code" : "", // PD class鞝曤炒 鞚挫毄頃橃棳 靹れ爼 
			"model_name" : "", // PD page(server-side)
			"displayName" : "", // PD class鞝曤炒 鞚挫毄頃橃棳 靹れ爼
			"pvi_type_code" : "", //PD page(server-side)
			"pvi_type_name" : "", //PD page(server-side)
			"pvi_subtype_code" : "", //PD page(server-side)
			"pvi_subtype_name" : "" //PD page(server-side)
			}
}

//server-side
digitalData.page.pageInfo.pageTrack = "home"; 

// depth Info.
var depth = window.location.href.split("/").length;
var depth_last = window.location.href.split("/")[depth-1];
if(depth_last =="" || depth_last.charAt(0)=="?"){
    depth -= 1;
}

// set site section value
if((digitalData.page.pathIndicator.depth_2 != "")||(digitalData.page.pageInfo.pageTrack == "flagship pdp")){
    digitalData.page.pageInfo.siteSection = siteCode + ":consumer"; //product page
}else if(depth == 4){ 
    digitalData.page.pageInfo.siteSection = siteCode + ":home"; //home
}else{
     digitalData.page.pageInfo.siteSection = siteCode + ":" + window.location.href.split("/")[4];
}

// set product category value
if(digitalData.page.pathIndicator.depth_3 != ""){
    digitalData.product.category = digitalData.page.pathIndicator.depth_3;
}

// set pathIndicator(not product page)
if(digitalData.page.pathIndicator.depth_2 == ""){
    if(depth >= 5) digitalData.page.pathIndicator.depth_2 = window.location.href.split("/")[4]
    if(depth >= 6) digitalData.page.pathIndicator.depth_3 = window.location.href.split("/")[5]
    if(depth >= 7) digitalData.page.pathIndicator.depth_4 = window.location.href.split("/")[6]
    if(depth >= 8) digitalData.page.pathIndicator.depth_5 = window.location.href.split("/")[7]
}

// set pageName
var pageName = siteCode;
if(digitalData.page.pathIndicator.depth_2 != "")
    pageName += ":" + digitalData.page.pathIndicator.depth_2;
if(digitalData.page.pathIndicator.depth_3 != "")
    pageName += ":" + digitalData.page.pathIndicator.depth_3;
if(digitalData.page.pathIndicator.depth_4 != "")
    pageName += ":" + digitalData.page.pathIndicator.depth_4;
if(digitalData.page.pathIndicator.depth_5 != "")
    pageName += ":" + digitalData.page.pathIndicator.depth_5.replace(/^\s+|\s+$/gm,'');

// check PD, GPD
var pageTrackName = digitalData.page.pageInfo.pageTrack;
digitalData.page.pageInfo.pageName = pageName;

</script>