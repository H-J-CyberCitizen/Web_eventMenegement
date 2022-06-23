// 每次调用ajax的请求 都会先调用这个
$.ajaxPrefilter((options) => {
    let token = localStorage.getItem('token')
    if (options.url.split('/')[1] === 'my') {
        // headers!!!!!!!!!!
        options.headers = { Authorization: token }
    }
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    options.complete = (res) => {
        if (res.responseJSON.status == 1 && res.message !== '身份认证失败！') {
            layer.open({
                anim: 5,
                icon: 5,
                title: false
                , content: '服务器出现错误！',
                btn: ['确认'],
                yes: function (index) {
                    location.href = ('./login.html')
                    layer.close(index);
                }
            });
        }
    }
})