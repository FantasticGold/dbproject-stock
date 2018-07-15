$(document).ready(function() {
  $.ajax({
    url : "http://127.0.0.1:3000/api/users/isLogin",
    type : "POST",
    contentType: "application/json;charset=utf-8",
    dataType : "text",
    success : function(result) {
      const info = JSON.parse(result)
      if (info.state == true) {
        window.location.href = "/main/main"
      }
    },
    error:function(){
      sweetAlert("哎呦!", "连接不上服务器", "error")
    }
  })
  // try{
  //   let email = $.cookie("email")
  //   let pass = $.cookie("pass")
  //   let flag = true
  //   if (typeof(email) == 'undefined' || email == null){
  //     flag = false;
  //   }
  //   // console.log(flag)
  //   if (flag == true){
  //     window.location.href = `/main/main`
  //   }
  // }catch(error){
  //   console.log("no cookie provided")
  // }

  $("#login-btn").click(function() {
    const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    const low = /^(?=.{6,})(?:[0-9]+|[a-zA-Z]+|[!@#$%^&*]+)$/
    const name = $('#login-name').val()
    const pass = $('#login-pass').val()
    if (!email.test(name) || !low.test(pass)) {
      sweetAlert("哎呦！", "格式不对", "error").then(function () {
        window.location.href = "/"
      })
    } else {
      // console.log('waiting...')
      $.ajax({
        url : "http://127.0.0.1:3000/api/auth/login",
        type : "POST",
        contentType: "application/json;charset=utf-8",
        data : JSON.stringify({
          'email': name,
          'passwd': pass
        }),
        dataType : "text",
        success : function(result) {
          // console.log(result)
          // console.log(typeof result)
          const info = JSON.parse(result)
          // console.log(info.status)
          // console.log(info.msg)
          if (info.status == true) {
            // $.cookie('email', name)
            // $.cookie('pass', pass)
            // window.location.href = `/main/main?email=${name}&pass=${pass}`
            sweetAlert("登陆", "欢迎回来", "success").then(function () {

              window.location.href = "/main/main"
            })
          } else {
            sweetAlert("哎呦!", "信息不对", "error")
          }
        },
        error:function(){
          sweetAlert("哎呦!", "连接不上服务器", "error")
        }
      })
    }
  })
})
