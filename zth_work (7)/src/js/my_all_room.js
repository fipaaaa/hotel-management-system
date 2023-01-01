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



    var sfzcx=document.querySelector("#sfzcheck")//所有房间
    sfzcx.onclick=function(){
        setTimeout(1000);

        let select=$("#combox option:checked").text();
        console.log(select);
        if(true){
            $.ajax({
                url: "/test/room.json",
                method: "GET",
                //data:{},
                error: function (xhr, status, error) {
                    console.log(status);
                },
                success: function (result, status, xhr) {//xhr   xmlHttpRequest
                    //console.log(result);
                    //操作DOM渲染页面
                    if (result.statusCode == "200") {
                        $("#room_show").css("visibility", "visible");
                       if(select=="维修"){
                           let array=result.dataZone.fixList;

                           let text="";
                           var node=document.getElementById("roomlist_show");
                           for(let key in array){

                               text=text +"房间编号："+array[key].roomId+" 规格："+array[key].size+"  状态:"+array[key].state+"  价格:"+array[key].price;

                               var mytext=document.createTextNode(text);
                               console.log(mytext);
                               node.appendChild(mytext);
                           }
                           console.log(text);


                           document.getElementById("room_list").appendChild(node);
                       }

                            if(select=="入住"){
                                let array=result.dataZone.busyList;

                                let text="";
                                var node=document.getElementById("roomlist_show");
                                for(let key in array){

                                    text=text +"房间编号："+array[key].roomId+" 规格："+array[key].size+"  状态:"+array[key].state+"  价格:"+array[key].price;

                                    var mytext=document.createTextNode(text);
                                    console.log(mytext);
                                    node.appendChild(mytext);
                                }
                                console.log(text);


                                document.getElementById("room_list").appendChild(node);
                            }

                                if(select=="空闲"){
                                    let array=result.dataZone.restList;

                                    var node=document.getElementById("roomlist_show");
                                    for(let key in array){

                                        text=text +"房间编号："+array[key].roomId+" 规格："+array[key].size+"  状态:"+array[key].state+"  价格:"+array[key].price;

                                        var mytext=document.createTextNode(text);
                                        console.log(mytext);
                                        node.appendChild(mytext);
                                    }
                                    console.log(text);


                                    document.getElementById("room_list").appendChild(node);
                                }

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