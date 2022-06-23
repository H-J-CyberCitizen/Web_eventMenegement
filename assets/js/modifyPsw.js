$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        Lword: [/^[\S]{6,12}$/, '长度须在6~12间且不能出现空格'],
        rePsw: (val) => {
            if (val !== $('input[name=newPwd]').val()) {
                return '两次输入密码不同！'
            }
        }
    })
    console.log($('#form').serialize());
    $('#form').on('submit', (e) => { 
        e.preventDefault()
        let oldPwd=$('input[name=oldPwd]').val()
        let newPwd=$('input[name=newPwd]').val()
        console.log(oldPwd,newPwd);
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: {oldPwd:oldPwd,newPwd:newPwd},
            success: (src) => {
                console.log(src);
                if (src.status !== 0) {
                    return layer.msg('错误，更新失败！')
                }
                layer.msg('密码更新成功！')
            }
        })
     })

})