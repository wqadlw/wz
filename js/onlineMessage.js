$(function () {
    $("#tijiao").click(function () {
        if ($.trim($('#FullName').val()) == '' || $.trim($('#FullName').val()) == '姓名') {
            layer.alert('请输入姓名', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }

        if ($.trim($("#Tel").val()) == '' && $.trim($("#Email").val()) == '') {
            layer.alert('请输入电话号码或联系邮箱', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }

        if ($.trim($("#Tel").val()).length > 0) {
            var TelString = $("#Tel").val();
            var regTel = /(^[0-9\+\-]{0,20}$)/;
            if (TelString.length > 0) {
                if (!regTel.test(TelString)) {
                    layer.alert('电话号码格式错误', {
                        icon: 2,
                        skin: 'layer-ext-moon'
                    })
                    return false;
                }
            }
        }

        if ($.trim($("#Email").val()) != '' && $.trim($("#Email").val()) != '邮箱') {
            var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            if (!regEmail.test($.trim($("#Email").val()))) {
                layer.alert('邮箱格式错误', {
                    icon: 2,
                    skin: 'layer-ext-moon'
                })
                return false;
            }
        }


        var con;


        if ($.trim($("#Content").val()) == "请输入留言内容，我们会尽快与您联系。") {
            con = "";
        } else {
            con = $.trim($("#Content").val());
        }

        var ip = "", ipsource = "";

        $.getScript('http://pv.sohu.com/cityjson?ie=utf-8', function () {

            ip = returnCitySN.cip;
            ipsource = returnCitySN.cname

            $.ajax({
                type: "POST",
                url: "/AjaxFile/OnLineMessage.ashx",
                async: false,
                data: {
                    IP: ip,
                    IPSource: ipsource,
                    FullName: $.trim($("#FullName").val()),
                    Tel: $.trim($("#Tel").val()),
                    Email: $.trim($("#Email").val()),
                    Content: con,
                    Code: "",
                    MsgList: "姓名：" + $.trim($("#FullName").val()) + "<br/>" + "电话：" + $.trim($("#Tel").val()) + "<br/>" + "邮箱：" + $.trim($("#Email").val()) + "<br/>"+ "内容：" + con
                },
                success: function (data) {
                    if (data.indexOf("成功") != -1) {
                        window.location.href = "/success.shtml";
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("服务器错误，请重新提交")
                }
            });
        });
        return false;
    })

    //回车触发事件，下面的值可替换为当前留言最后一个必填框的ID属性
    $("#Email").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#tijiao").click();
        }
    })

    $("#quxiao").click(function () {
        $("#chongzhi").click();
    })
});