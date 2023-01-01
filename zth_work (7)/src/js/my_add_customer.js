window.onload=function () {
    $.ajax({
        url: "/test/login.json",//保持登录
        method: "GET",
        error: function (xhr, status, error) {
            console.log(status);
        },
        success: function (result, status, xhr) {//xhr   xmlHttpRequest
            console.log(result);
            //操作DOM渲染页面
            if (result.statusCode == "200") {

                if(result.dataZone.admin.rank=="经理") {
                    $("#register_button").css("visibility", "visible");
                    $("#item1").text("经理信息").toggleClass("text-danger");
                }
                else{
                    $("#item1").text("员工信息").toggleClass("text-danger");
                }
                $("#item2").text("姓名："+result.dataZone.admin.name).toggleClass("text-danger");
                $("#item3").text("员工号:"+result.dataZone.admin.adminId).toggleClass("text-danger");
                $("#item4").text("职务："+result.dataZone.admin.rank).toggleClass("text-danger");
                $("#function_opt").css("visibility", "visible");
                $("#navbardrop5").css("visibility", "visible");

                alert(result.message);
            } else {
                alert(result.message);
            }
        }});


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

    var login_bottom=document.querySelector("#login_1");
    login_bottom.onclick=function login() {
        if(checkinformation()){
            setTimeout(1000);
            $.ajax({
                url: "/test/login.json",//登录按钮
                method: "GET",
                // data:{username:"wzf",password:"123456"},
                error: function (xhr, status, error) {
                    console.log(status);
                },
                success: function (result, status, xhr) {//xhr   xmlHttpRequest
                    console.log(result);
                    //操作DOM渲染页面
                    if (result.statusCode == "200") {

                        if(result.dataZone.admin.rank=="经理") {
                            $("#register_button").css("visibility", "visible");
                            $("#item1").text("经理信息").toggleClass("text-danger");
                        }
                        else{
                            $("#item1").text("员工信息").toggleClass("text-danger");
                        }
                        $("#item2").text("姓名："+result.dataZone.admin.name).toggleClass("text-danger");
                        $("#item3").text("员工号:"+result.dataZone.admin.adminId).toggleClass("text-danger");
                        $("#item4").text("职务："+result.dataZone.admin.rank).toggleClass("text-danger");
                        $("#function_opt").css("visibility", "visible");
                        $("#navbardrop5").css("visibility", "visible");
                        $("#login_btn").modal('hide');
                        alert(result.message);
                    } else {
                        alert(result.message);
                    }


                },
            });
        }
        ;
    }

    function checkinformation2() {
        let sfzh=form2.sfzh.value;
        let khxm=form2.khxm.value;
        let sjh=form2.sjh.value;
        if((sfzh=="")||(sfzh==null)){
            $("#sfzh-feedback2").css("visibility", "visible");
            return false;
        }
        else if((khxm=="")||(khxm==null)){
            $("#password-feedback2").css("visibility", "visible");
            return false;}
        else if((sjh=="")||(sjh==null)){
            $("#name-feedback2").css("visibility", "visible");
            return false;}
        else {
            return true;
        }
    }

    var register_cos=document.querySelector("#register_cos");//客户注册
    register_cos.onclick=function(){
        let sfzh=form2.sfzh.value;
        let khxm=form2.khxm.value;
        let sjh=form2.sjh.value;
        let xb=form2.xb.value;
        let zk=form2.zk.value;
        if(checkinformation2()){
            $.ajax({
                url: "/test/login.json",//接收客户注册
                method: "GET",
                data:{customerId:sfzh,name:khxm,sex:xb,phoneNum:sjh,discount:zk},
                error: function (xhr, status, error) {
                    console.log(status);
                },
                success: function (result, status, xhr) {//xhr   xmlHttpRequest
                    console.log(result);
                    //操作DOM渲染页面
                    if (result.statusCode == "200") {

                        alert(result.message);


                    }
                    else if(result.statusCode=="400"){
                        alert(result.message);

                    }


                },
            });
        }
        ;
    }






}