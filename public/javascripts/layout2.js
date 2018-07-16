$(document).ready(function() {
  $.ajax({
    url : "/api/users/isLogin",
    type : "POST",
    contentType: "application/json;charset=utf-8",
    dataType : "text",
    success : function(result) {
      const info = JSON.parse(result)
      if (info.state == false) {
        window.location.href = "/"
      }
      $("a#username").text(info.user.username)
    },
    error:function(){
      sweetAlert("哎呦!", "连接不上服务器", "error")
    }
  })
  $("a#btnhome").click(function () {
    sweetAlert("返回主页", "已登出", "success").then(function () {
      $.ajax({
        url : "/api/auth/logout",
        type : "POST",
        contentType: "application/json;charset=utf-8",
        dataType : "text",
        success : function(result) {
          window.location.href = "/"
        },
        error:function(){
          sweetAlert("哎呦!", "连接不上服务器", "error")
        }
      })
    })
  })
})