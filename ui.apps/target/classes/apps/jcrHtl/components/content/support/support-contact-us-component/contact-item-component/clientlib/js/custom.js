if ($('.support_contact_us').length > 0) {

    var onlinetime = " "

    function getfooterHotLine() {
        var apiUrl = $(".call-us-api").attr('data-apiUrlHotline');

        $.ajax({
            type: 'GET',
            async: false,
            url: apiUrl,
            data: {"siteCode": SITE_CODE},
            dataType: 'jsonp',
            jsonp: 'jsonp',
            success: function (data) {
                if (data != null && data.hotlineId != null && data.hotline.length > 0) {
                    $(".support_contact_us .call-us-desc span").eq(0).append(data.supportLanguage);
                    $(".support_contact_us .call-us-desc span").eq(1).append(data.hotline);
                    $(".support_contact_us .call-us-desc span").eq(2).append(data.supportTime);
                    onlinetime = data.chatOnline
                }
            },
            complete: function () {
                setChatTime()
            },
            error: function () {
            }
        });
    }

    //show chat icon only working houres
    function setChatTime(time) {
        if (typeof sWOTrackPage == 'function') {
            sWOTrackPage();
            setTimeout("ShowChatLink()", 3000)
        }
    }

    function ShowChatLink() {
        if ($("#whoson_chat_link img").length > 0) {
            $("#whoson_chat_link").parent().show();
            $("#whoson_chat_link img").hide();
            $("#whoson_chat_link").addClass('online_chat');
            $("#whoson_chat_link").append("Online Chat<span>" + onlinetime + "");
        }
    }

    $(document).ready(function () {
        getfooterHotLine()
    });
}
