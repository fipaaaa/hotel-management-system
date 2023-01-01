window.onload=function () {
    $.ajax({
        url: "/test/login.json",
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

    function checkinformation3() {
        let sfzh=form3.sfzh3.value;
        if((sfzh=="")||(sfzh==null)){

            $("#sfzh2-feedback2").css("visibility", "visible");
            return false;
        }
        else {
            return true;
        }
    }

    var sfzcx=document.querySelector("#sfzcheck")//客户查询
    sfzcx.onclick=function(){
        setTimeout(1000);
        console.log("1");
        let sfzh=form3.sfzh3.value;
        if(checkinformation3()){
            $.ajax({
                url: "/test/search.json",
                method: "GET",
                data:{customerId:sfzh},
                error: function (xhr, status, error) {
                    console.log(status);
                },
                success: function (result, status, xhr) {//xhr   xmlHttpRequest
                    console.log(result);
                    //操作DOM渲染页面
                    if (result.statusCode == "200") {
                        $("#card1").css("visibility", "visible");
                        $("#item_21").text("客房编号："+result.dataZone.customer.customerId);
                        $("#item_22").text("规格："+result.dataZone.customer.name);
                        $("#item_23").text("状态："+result.dataZone.customer.sex);
                        $("#item_24").text("价格："+result.dataZone.customer.phoneNum);
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