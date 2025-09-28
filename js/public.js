if ($(window).width() > 1280) {
    $(function () {
        $(window).scroll(function () {
            height = $(window).scrollTop();
            if (height > 1) {
                $('.header').addClass("fixed").show();
            }
            if (height < 1) {
                $('.header').removeClass("fixed").show();
            }
        });
    });
}

$(function () {
    var width = $(".phone-nav").width();
    $(".menu").click(function () {
        $(".phone-nav").animate({
            right: 0
        }, 600);
    })
    $(".close").click(function () {
        $(".phone-nav").animate({
            right: -width
        }, 600)
    })

})

$(function () {
    $(".list-menu ul li i").click(function () {
        $(this).parent().children("div").slideToggle().parent()
			.siblings().children("div").slideUp()
    })
})

$(".search a").click(function () {
    $(".serarchbox").show();
});

$(".close").click(function () {
    $(".serarchbox").hide();
});




if ($("meta[name=toTop]").attr("content") == "true") {
    $("<div id='toTop'><img src='images/top-2.png'></div>").appendTo('body');
    if ($(this).scrollTop() == 0) {
        $("#toTop").hide();
    }
    $(window).scroll(function (event) {
        if ($(this).scrollTop() == 0) {
            $("#toTop").hide();
        }
        if ($(this).scrollTop() != 0) {
            $("#toTop").show();
        }
    });
    $("#toTop").click(function (event) {
        $("html,body").animate({
            scrollTop: "0px"
        }, 666)
    });
}

$(function () {
    $("img").each(function () {
        if ($(this).attr("src").length == 0 || $(this).attr("src").toLowerCase().indexOf("nopic") != -1) {
            $(this).attr("src", "/UpLoadFile/zanwu.png").removeAttr("height").removeAttr("width").removeAttr("style");
            return true;
        }
    })
});

/*ie判断*/
function iePrompt() {

    function createMent() {
        var promptMent = "<div class='prompt'><span>您的浏览器版本也太低啦 ！<br />赶快下载最新版的吧！推荐浏览器 : <a href='https://www.google.cn/chrome/' target='_blank'>Google浏览器</a></span> <b class='prompt_close'></b></div>";
        $("body").append(promptMent);
        $(".prompt").slideDown("slow");
        $(".prompt_close,.prompt").click(function () {
            $(".prompt").slideUp('300');
        })
    }

    if (navigator.appName == "Microsoft Internet Explorer") {

        var browser = navigator.appName
        var b_version = navigator.appVersion
        var version = b_version.split(";");
        var trim_Version = version[1].replace(/[ ]/g, "");

        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0") {
            createMent();
        }
        if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0") {
            createMent();
        }
        else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0") {
            createMent();
        }
    }
}

iePrompt();


$(document).ready(function () {
    $(function () {
        $("#search").click(function () {
            if ($.trim($("#searchval").val()) == "" || $.trim($("#searchval").val()) == "请输入搜索关键词") {
                layer.alert('请输入搜索关键词', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                })
                return false;
            }
            else {
                window.location.href = "/search.shtml?keyword=" + escape($.trim($("#searchval").val()));
            }
        })

        $("#searchval").keydown(function (event) {
            if (event.keyCode == 13) {
                $("#search").click();
            }
        })
    })
})
