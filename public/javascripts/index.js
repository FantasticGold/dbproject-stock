$(document).ready(function() {
  try{
    let email = $.cookie("email")
    let pass = $.cookie("pass")
    let flag = true
    if (typeof(email) == 'undefined' || email == null){
      flag = false;
    }
    // console.log(flag)
    if (flag == true){
      window.location.href = `/main/main?email=${email}&pass=${pass}`
    }
  }catch(error){
    console.log("no cookie provided")
  }

  $("#login-btn").click(function() {
    const email = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
    const low = /^(?=.{6,})(?:[0-9]+|[a-zA-Z]+|[!@#$%^&*]+)$/
    const name = $('#login-name').val()
    const pass = $('#login-pass').val()
    if (!email.test(name) || !low.test(pass)) {
      alert('HaHaHa, you are fake!')
    } else {
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
          console.log(result)
          if (result.status) {
            // $.cookie('email', name)
            // $.cookie('pass', pass)
            // window.location.href = `/main/main?email=${name}&pass=${pass}`
            window.location.href="/main/main"
          } else {
            sweetAlert("哎呦……", "something wrong","error");
          }
        },
        error:function(msg){
          alert(msg)
        }
      })
    }
  })
})
