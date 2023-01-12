$(function () {
    $(`#link_reg`).on(`click`, function () {
        $(`.login-box`).hide()
        $(`.reg-box`).show()
    })

    $(`#link_login`).on(`click`, function () {
        $(`.login-box`).show()
        $(`.reg-box`).hide()
    })

    // 从layui中获取form对象
    let form = layui.form
    let layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位,且不能出现空格'
        ],

        repwd: function (value) {
            let pwd = $(`.reg-box [name=password]`).val()
            if (pwd !== value) {
                return `两次密码不一致噢`
            }
        },

    })

    // 监听注册表单的提交事件
    $(`#form_reg`).on(`submit`, function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        // 发起ajax请求
        let data = { username: $(`#form_reg [name=username]`).val(), password: $(`#form_reg [name=password]`).val() }
        $.post(`/api/reguser
    `, data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg(`注册成功！`)
            // 模拟人点击跳转到登陆页面
            $(`#link_login`).click()
        })
    })


    // 监听登陆表单的提交事件
    $(`#form_login`).on(`submit`, function (e) {
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url: `/api/login`,
            method: "POST",

            // 快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(`登录失败`)
                }
                layer.msg(`登录成功`)

                //将登陆成功所得到的token值 保存到locaStorage中
                localStorage.setItem(`token`,res.token)

                // 跳转到首页
                location.href = `/index.html`
            }
        })
    })

})

