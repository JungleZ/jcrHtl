"use strict";
use(function () {
    var Constants = {
        DESCRIPTION_PROP: "jcr:description",
        DESCRIPTION_LENGTH: 50
    };

    var title = currentPage.getNavigationTitle() || currentPage.getTitle() || currentPage.getName();
    var description = properties.get(Constants.DESCRIPTION_PROP, "").substr(0, Constants.DESCRIPTION_LENGTH);
	var type = properties.get("type", "default");
    return {
        title: title,
        description: description,
        type: type
    };
});
