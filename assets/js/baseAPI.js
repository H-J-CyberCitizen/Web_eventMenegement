// 每次调用ajax的请求 都会先调用这个
$.ajaxPrefilter((options) => {
    let token = localStorage.getItem('token')
    if (options.url.split('/')[1] === 'my') {
        // headers!!!!!!!!!!
        options.headers = { Authorization: token }
    }
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
})