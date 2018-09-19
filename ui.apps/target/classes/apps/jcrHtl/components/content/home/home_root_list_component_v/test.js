"use strict";
use(function () {
    var Constants = {
        DESCRIPTION_PROP: "jcr:description",
        DESCRIPTION_LENGTH: 50
    };

	var propsList=properties.blocks;

    if(propsList==null){
		return ;
    }

    propsList=propsList.reverse();

    if(propsList.length==0){
        return ;
    }
	var proposerMap = [];

    for(var i =0 ;i <propsList.length; i++){
		var obj=JSON.parse(propsList[i]);
		proposerMap.push(obj);
     }



    return {
        prons: proposerMap
    };
});
