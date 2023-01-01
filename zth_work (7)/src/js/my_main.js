window.onload=function () {
        $.ajax({
            url: "/test/all.json",//超级链接
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

                    // var data_arr = [0.05, 0.25, 0.6, 0.1];
                    var color_arr = ["#00FF21", "#FFAA00", "#00AABB", "#FF4400"];
                    var color_arr1 = ["#00FF21", "#FFAA00", "#00AABB"];
                    var text_arr1 = ["在住", "新入住", "离店"];

                    var new_in=result.dataZone.checkinToday;

                    console.log("新入住人数"+new_in);
                    var now_in=result.dataZone.restToday;
                    console.log("当前入住"+now_in);
                    var leave_in=result.dataZone.leaveToday;
                    console.log("已离店"+leave_in);
                    var all=now_in+leave_in+new_in;
                    console.log("入住总人数"+now_in/all);
                    var data_arr1=[now_in/all,new_in/all,leave_in/all];
                    var realdata_arr1=[now_in,new_in,leave_in];

                    var singlebusy=result.dataZone.singleBusy;
                    var bigBedBusy=result.dataZone.bigBedBusy;
                    var tripleBusy=result.dataZone.tripleBusy;
                    var standardBusy=result.dataZone.standardBusy;
                    var luxuryBusy=result.dataZone.luxuryBusy;

                    var all2=singlebusy+bigBedBusy+tripleBusy+standardBusy+luxuryBusy;
                    var data_arr2=[singlebusy/all2,  bigBedBusy/all2, tripleBusy/all2, standardBusy/all2,luxuryBusy/all2]
                    var text_arr2=["singlebusy","bigBedBusy","tripleBusy","standardBusy","luxuryBusy"];
                    var color_arr2= ["#00FF21", "#FFAA00", "#00AABB", "#FF4400","#e83e8c"];
                    var realdata_arr2=[singlebusy,bigBedBusy,tripleBusy,standardBusy,luxuryBusy]
                    init(data_arr1,color_arr1,text_arr1,realdata_arr1);
                    init2(data_arr2,color_arr2,text_arr2,realdata_arr2);
                    init3(data_arr1,color_arr1,text_arr1,realdata_arr1);


                    var moneyToday=result.dataZone.moneyToday;
                    var singlePrice=result.dataZone.singlePrice;
                    var luxuryPrice=result.dataZone.luxuryPrice;
                    var standardPrice=result.dataZone.standardPrice;
                    var bigBedPrice=result.dataZone.bigBedPrice;
                    var triplePrice=result.dataZone.triplePrice;
                    $("#pro1").text("今日营收："+moneyToday);
                    $("#pro2").text("单人房房价："+singlePrice);
                    $("#pro3").text("标准房房价："+standardPrice);
                    $("#pro4").text("大床房房价："+bigBedPrice);
                    $("#pro5").text("三人房房价："+triplePrice);
                    $("#pro6").text("豪华房房价："+luxuryPrice);

                    alert(result.message);
                } else {
                    alert(result.message);
                }
            }});


    function init(data_arr, color_arr, text_arr,realdata_arr) {
        //绘制饼图
        //比例数据和颜色
        // var data_arr = [0.05, 0.25, 0.6, 0.1];
        // var color_arr = ["#00FF21", "#FFAA00", "#00AABB", "#FF4400"];
        // var text_arr = ["第一季度", "第二季度", "第三季度", "第四季度"];

        drawCircle("canvas_circle", data_arr, color_arr, text_arr,realdata_arr);
    }

    function init2(data_arr, color_arr, text_arr,realdata_arr) {
        //绘制饼图
        //比例数据和颜色
        // var data_arr = [0.05, 0.25, 0.6, 0.1];
        // var color_arr = ["#00FF21", "#FFAA00", "#00AABB", "#FF4400"];
        // var text_arr = ["第一季度", "第二季度", "第三季度", "第四季度"];

        drawCircle2("canvas_circle2", data_arr, color_arr, text_arr,realdata_arr);
    }

    function init3(data_arr, color_arr, text_arr,realdata_arr) {
        //绘制饼图
        //比例数据和颜色
        // var data_arr = [0.05, 0.25, 0.6, 0.1];
        // var color_arr = ["#00FF21", "#FFAA00", "#00AABB", "#FF4400"];
        // var text_arr = ["第一季度", "第二季度", "第三季度", "第四季度"];

        drawCircle("canvas_circle3", data_arr, color_arr, text_arr,realdata_arr);
    }



    function drawCircle(canvasId, data_arr, color_arr, text_arr,realdata_arr)
    {
        var c = document.getElementById(canvasId);
        var ctx = c.getContext("2d");

        var radius = c.height / 2 - 20; //半径
        var ox = radius + 20, oy = radius + 20; //圆心

        var width = 30, height = 10; //图例宽和高
        var posX = ox * 2 + 20, posY = 30;   //
        var textX = posX + width + 5, textY = posY + 10;

        var startAngle = 0; //起始弧度
        var endAngle = 0;   //结束弧度
        for (var i = 0; i < data_arr.length; i++)
        {
            //绘制饼图
            endAngle = endAngle + data_arr[i] * Math.PI * 2; //结束弧度
            ctx.fillStyle = color_arr[i];
            ctx.beginPath();
            ctx.moveTo(ox, oy); //移动到到圆心
            ctx.arc(ox, oy, radius, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            startAngle = endAngle; //设置起始弧度

            //绘制比例图及文字
            ctx.fillStyle = color_arr[i];
            ctx.fillRect(posX, posY + 20 * i, width, height);
            ctx.moveTo(posX, posY + 20 * i);
            ctx.font = 'bold 12px 微软雅黑';    //斜体 30像素 微软雅黑字体
            ctx.fillStyle = color_arr[i]; //"#000000";
            var percent = text_arr[i] + "：" + realdata_arr[i] +"人";
            ctx.fillText(percent, textX, textY + 20 * i);
        }
    }
    function drawCircle2(canvasId, data_arr, color_arr, text_arr,realdata_arr)
    {
        var c = document.getElementById(canvasId);
        var ctx = c.getContext("2d");

        var radius = c.height / 2 - 20; //半径
        var ox = radius + 20, oy = radius + 20; //圆心

        var width = 30, height = 10; //图例宽和高
        var posX = ox * 2 + 20, posY = 30;   //
        var textX = posX + width + 5, textY = posY + 10;

        var startAngle = 0; //起始弧度
        var endAngle = 0;   //结束弧度
        for (var i = 0; i < data_arr.length; i++)
        {
            //绘制饼图
            endAngle = endAngle + data_arr[i] * Math.PI * 2; //结束弧度
            ctx.fillStyle = color_arr[i];
            ctx.beginPath();
            ctx.moveTo(ox, oy); //移动到到圆心
            ctx.arc(ox, oy, radius, startAngle, endAngle, false);
            ctx.closePath();
            ctx.fill();
            startAngle = endAngle; //设置起始弧度

            //绘制比例图及文字
            ctx.fillStyle = color_arr[i];
            ctx.fillRect(posX, posY + 20 * i, width, height);
            ctx.moveTo(posX, posY + 20 * i);
            ctx.font = 'bold 12px 微软雅黑';    //斜体 30像素 微软雅黑字体
            ctx.fillStyle = color_arr[i]; //"#000000";
            var percent = text_arr[i] + "：" + realdata_arr[i] +"间";
            ctx.fillText(percent, textX, textY + 20 * i);
        }
    }



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
                url: "/test/login.json",//普通登录
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
        let sfzh=form2.name2.value;
        let khxm=form2.pwd2.value;
        let sjh=form2.uname2.value;
        if((sfzh=="")||(sfzh==null)){
            //$("#sfzh-feedback2").css("visibility", "visible");
            return false;
        }
        else if((khxm=="")||(khxm==null)){
            //$("#password-feedback2").css("visibility", "visible");
            return false;}
        else if((sjh=="")||(sjh==null)){
            //$("#name-feedback2").css("visibility", "visible");
            return false;}
        else {
            return true;
        }
    }

    var register_1=document.querySelector("#register_1");//员工注册
    register_1.onclick=function(){
        let sfzh=form2.uname2.value;
        let khxm=form2.pwd2.value;
        let sjh=form2.name2.value;
        let xb=form2.rank2.value;
        if(checkinformation2()){
            $.ajax({
                url: "/test/login.json",//员工注册
                method: "GET",
                data:{adminId:sfzh,name:sjh,password:khxm,rank:xb},
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