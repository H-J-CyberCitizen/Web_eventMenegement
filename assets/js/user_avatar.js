

$(function () {

    var layer=layui.layer

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')

    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#img').on('click', () => {
        $('#file').click()
    })

    $('#file').on('change', (e) => {
        console.log(e);
        let img = e.target.files[0]
        var imgURL = URL.createObjectURL(img)
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    $('#upload').on('click', () => {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        $.ajax({
            type:'POST',
            url:'/my/update/avatar',
            data:{avatar:dataURL},
            success:(src)=>{
                console.log(src);
                if(src.status!==0){
                    layer.msg='更新头像失败！'
                }
                layer.msg='更新头像成功！'
                window.parent.getUserInfo()
            }
        })
    })
})



// layui.use('upload', function () {
//     // 创建实例
//     var upload = layui.upload;

//     //执行实例
//     var uploadInst = upload.render({
//         elem: '#img' //绑定元素
//         , url: '/upload/' //上传接口
//         , done: function (res) {
//             //上传完毕回调
//         }
//         , error: function () {
//             //请求异常回调
//         }
//     });
// });