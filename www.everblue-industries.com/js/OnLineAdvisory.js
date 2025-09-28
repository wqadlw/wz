function GetDownUrl(id) {
    $.ajax({
        type: "POST",
        url: "/AjaxFile/Information.aspx",
        data: {
            CallMethod: "Download()",
            ID: id
        },
        async: false,
        success: function (data) {
            window.location.href = "/AjaxFile/DownLoadFile.aspx?FilePath=" + data + "&fileExt=file";
        }
    });
}

$(function () {
    $("#tijiao").click(function () {

        if ($.trim($("#Tel").val()) == '' || $.trim($("#Tel").val()) == '电话') {
            layer.alert('请输入联系方式', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }

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

        if ($.trim($("#Address").val()) == '') {
            layer.alert('请输入邮箱', {
                icon: 2,
                skin: 'layer-ext-moon'
            })
            return false;
        }		
		

		var regEmail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		if (!regEmail.test($.trim($("#Address").val()))) {
			layer.alert('邮箱格式错误', {
				icon: 2,
				skin: 'layer-ext-moon'
			})
			return false;
		}


        $.ajax({
            type: "POST",
            url: "/AjaxFile/OnLineAdvisory.ashx",
            async: false,
            data: {
                Tel: $.trim($("#Tel").val()),
                Address: $.trim($("#Address").val()),
                Code:"",
                MsgList: "电话：" + $.trim($("#Tel").val()) + "<br/>" + "邮箱：" + $.trim($("#Address").val()) //发送到邮箱内容，可根据实际情况增加或者删减
            },
            success: function (data) {
                if (data.indexOf("成功") != -1) {
                    $(".float-tankuang").fadeOut(300);
                    GetDownUrl($("#downid").val())
                    return false;
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("服务器错误，请重新提交")
            }
        });

        return false;
    })

    //回车触发事件，下面的值可替换为当前留言最后一个必填框的ID属性
    $("#Address").keydown(function (event) {
        if (event.keyCode == 13) {
            $("#tijiao").click();
        }
    })
});