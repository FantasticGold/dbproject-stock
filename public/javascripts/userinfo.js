$(document).ready(function () {
  $.ajax({
    url : "/api/users/isLogin",
    type : "POST",
    contentType: "application/json;charset=utf-8",
    dataType : "text",
    success : function(result) {
      const info = JSON.parse(result)
      $("span#username").text(info.user.username)
      $("span#useremail").text(info.user.email)
      const emailtext = info.user.email
      console.log(`email = ${emailtext}`)

      $.get(`/api/users/get?email=${emailtext}`, function (result, status) {
        console.log(`result = ${result}, status = ${status}`)
        $("span#prefer").text(result.length)
      })
    },
    error:function(){
      sweetAlert("哎呦!", "连接不上服务器", "error")
    }
  })
})