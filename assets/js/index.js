$(function () {

    getUserInfo()

    $('.logout').click(() => {
        console.log();
        layer.open({
            anim: 5,
            title: false,
            content: '是否退出登陆？',
            btn: ['确认', '取消'],
            yes: (index, layero) => {
                console.log(index);
                localStorage.removeItem('token')
                location.href = ('./login.html')
                layer.close(index);
            }
        })
    })
    
})

function getUserInfo() {
    let token = localStorage.getItem('token')
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        success: (res) => {
            console.log(res);
            if (res.message === '身份认证失败！') {
                layer.open({
                    title: false,
                    type: 0,
                    anim: 5,
                    icon: 5,
                    content: '请登陆后访问！',
                    btn: '确认',
                    yes: (index) => {
                        location.href = ('./login.html')
                        layer.close(index)
                    }
                })
                return;
            }
            var name = res.data.nickname || res.data.username
            let font_header = name.split("", 1)
            if (res.data.user_pic === null) {
                $('.font-header').html(font_header[0].toUpperCase()).show()
                $('.layui-nav-img').hide()
                if (res.data.nickname === null) {
                    layer.open({
                        anim: 5,
                        icon: 5,
                        title: false
                        , content: '请完善个人信息！',
                        btn: ['前往确认', '暂不确认'],
                        yes: function (index, layero) {
                            console.log(index);
                            if (index == 1) {
                                $('.userCenter').click()
                                $('#modifyUserInfo').click()
                            }
                            layer.close(index);
                        }
                    });
                }

            } else {
                $('.Username').html(name)
                $('.layui-nav-img').attr('src', res.data.user_pic).show()
                $('.font-header').hide()
            }
        }
    })
}