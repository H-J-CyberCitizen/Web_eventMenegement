$(function () {

    // 从 layui 中获取 form 对象
    var form = layui.form
    // 从layui中获取layer层 使错误提示
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd1: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        pwd2: (val) => {
            if (/^[a-zA-Z0-9_\\s·]+$/.test(val)) {
                return '不包含特殊字符'
            }
        },
        // 验证两次密码是否一致
        rePassword: (val) => {
            let psw1 = $('#input4').val()
            if (psw1 !== val) {
                return '两次输入密码不一致'
            }
        },
    });

    $('#toCreate').click(() => {
        $('#login').hide();
        $('#createAccount').show();
    })
    $('#toLogin').click(() => {
        $('#createAccount').hide();
        $('#login').show();
    })

    $('#login').on('submit', (e) => {
        e.preventDefault()
        let data = $('#login').serialize()
        console.log(data);
        // 调用了  $.ajaxPrefilter((options)=>{}) 
        // 在每次请求前把 options.url 的值给加上请求前缀
        // 请在baseAPI.js中修改
        $.post('/api/login', data, (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(res.message)
            // 保存在浏览器的localstorage
            localStorage.setItem('token', res.token)
            let time = setTimeout(() => {
                location.href = ('./index.html')
            }, 500)
        })
    })

    $('#createAccount').on('submit', (e) => {
        e.preventDefault()
        let data = $('#createAccount').serialize()
        console.log(data);
        $.post('/api/reguser', data, (res) => {
            layer.msg(res.message)
            $('#toLogin').click()
        })

    })
})