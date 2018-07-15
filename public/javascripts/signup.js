$(document).ready(function(){
	$("a#signupbtn").click(function(){
		var x = $("#e-mail").val()
		var y = $("#username").val()
		var z = $("#password").val()
		var m = $("#confpassword").val()
		console.log(x)
		console.log(y)
		console.log(z)
		console.log(m)

		const email_pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/
		const password_pattern1 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
		const password_pattern2 = /^(?=.{6,})(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
		const password_pattern3 = /^(?=.{6,})(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/
		var flag1 , flag2 , flag3, flag4
		if (email_pattern.test(x)){
			flag1 = true;
		}
		else{
			flag1 = false;
		}
		if (password_pattern1.test(z)){
			flag2 = true;
		}
		else{
			flag2 = false;
		}
		if (password_pattern2.test(z)){
			flag3 = true;
		}
		else{
			flag3 = false;
		}
		if (password_pattern3.test(z)){
			flag4 = true;
		}
		else{
			flag4 = false;
		}

		var valid = true;
		if (z != m){
			valid = false;
		}
		if (flag4 == false && flag3 == false && flag2 == false){
			valid = false;
		}
		if (flag1 == false){
			valid = false;
		}
		console.log(flag1)
		console.log(flag2)
		console.log(flag3)
		console.log(flag4)
		if (valid == true){
			$.ajax({
				url : "http://127.0.0.1:3000/api/auth/register",
				type : "POST",
				contentType: "application/json;charset=utf-8",
				data : JSON.stringify({'username':y, 'email':x,'passwd':z}),
				dataType : "text",
				success : function(result) {
          const info = JSON.parse(result)
					if (info.status == true){
						$.ajax({
							url : "http://127.0.0.1:3000/api/auth/login",
							type : "POST",
							contentType: "application/json;charset=utf-8",
							data : JSON.stringify({
								'email': x,
								'passwd': z
							}),
							dataType : "text",
							success : function(result) {
								const info = JSON.parse(result)
								if (info.status == true) {
									sweetAlert("注册", "欢迎回来", "success").then(function () {
										window.location.href = "/main/main"
									})
								} else {
									sweetAlert("哎呦!", "信息不对", "error")
								}
							},
							error: function () {
								sweetAlert("哎呦!", "连接不上服务器", "error")
							}
						})
					}else{
						sweetAlert("哎呦!", info.msg, "error");
					}
				},
				error: function(msg){
								sweetAlert("哎呦!", "连接不上服务器", "error")
				}
			})

		} else {
				sweetAlert("哎呦!", "信息不对", "error")
		}

	})
})
/*
const high = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
//中
const middle = /^(?=.{6,})(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/
//低
const low = /^(?=.{6,})(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/
*/
