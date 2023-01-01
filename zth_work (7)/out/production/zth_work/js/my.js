window.onload=function () {

    function checkinformation() {
        var user_name=form1.uname.value;
            var user_pwd=form1.pwd.value;
            if((user_name=="")||(user_name==null)){
                $("#username-feedback").css("visibility", "visible");
                return false;
            }
            else if((user_pwd=="")||(user_pwd==null)){
                $("#password-feedback").css("visibility", "visible");
                return false;}
            else {
                return true;
            }
        }
    var login_bottom=document.querySelector("#login_1")
    login_bottom.onclick=function() {
        if(checkinformation()){
            setTimeout(1000);
            $.ajax({
                url: "/test/login.json",
                method: "GET",
                // data:{username:"wzf",password:"123456"},
                error: function (xhr, status, error) {
                    console.log(status);
                },
                success: function (result, status, xhr) {//xhr   xmlHttpRequest
                    console.log(result);
                    //操作DOM渲染页面
                    if (result.statusCode == "200") {
                        console.log("登陆成功");
                        $("#register_button").css("visibility", "visible");
                        $("#function_opt").css("visibility", "visible");
                        alert(result.message);

                    }
                    else if(result.statusCode=="400"){
                         alert(result.message);
                         $("#login_btn").fadeOut;
                     }


                },
            });
        }
        ;
    }





}