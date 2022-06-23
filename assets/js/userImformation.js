$(function () {
    var form = layui.form
    var layer = layui.layer

    form.varify = {
        username: function (value, item) {
            if (new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return '用户名必须有特殊字符';
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return '用户名首尾不能出现下划线\'_\'';
            }
            if (/^\d+\d+\d$/.test(value)) {
                return '用户名不能全为数字';
            }
        },
        Lword: [/^[\S]{6,12}$/, '长度须在6~12间且不能出现空格']
    }
    function getUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: (res) => {
                if(res.status==1){
                    return layer.msg('获取用户信息失败！')
                }
                // 通过lay-filter赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    getUserInfo()

    $('.reset').on('click',(e)=>{
        e.preventDefault()
        getUserInfo()
    })

    $('#form').on('submit',(e)=>{
        e.preventDefault()
        let data={
            id:$('input[name=id]').val(),
            nickname:$('input[name=nickname]').val(),
            email:$('input[name=email]').val()
        }
        $.ajax({
            type:'POST',
            url:'/my/userinfo',
            data:data,
            success:(res)=>{
                if(res.status==1){
                    return layer.msg('上传用户信息失败！')
                }
                layer.msg('修改成功！')
                window.parent.getUserInfo()
            }
        })
    })
})