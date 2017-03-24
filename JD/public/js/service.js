/**
 * Created by JOJO on 2017/1/8 0008.
 */
$(function () {
    // 和socket服务器建立连接，获得客户端的socket对象
    // 连接服务器。这将从被加载的页面向服务器发送连接请求，
    // 最终在服务器端socketio中触发connection事件
    var clientSocket = io();

    var currentCid = null;      // 当前正在发送信息的客户

    // 客户端socket监听服务器发过来的消息
    clientSocket.on("message",function(data){
        var type = data.type;   // 提交消息类型
        var cid = data.cid;     // 获取cid
        currentCid = cid;       // 设为当前用户

        // 根据消息类型，作出相应的处理
        switch(type){
            case "enter":     // 有新用户连接
                // cid显示在列表中
                $(".servicelist ul").append('<li data-cid="'+ cid +'">'+
                    '<a href="#javascript:;">'+
                    '<span>'+
                    '</span>'+
                    '<div class="category">'+
                    '<span>'+ cid + '</span>'+
                    '</div>'+
                    '</a>'+
                    '</li>');
                $(".servicewindow_top").append('<div class="cont" data-cid="'+ cid +'"></div>');
                $(".servicelist ul li").removeClass("act");
                $(".servicelist ul li:last").addClass("act");
                $(".servicelist ul").find("li").each(function () {
                    $(this).unbind('click').bind("click",function () {
                        var x=$(this).attr("data-cid");
                        currentCid=x;
                        $(".servicelist ul li").removeClass("act");
                        $(this).addClass("act");
                        $(".servicewindow_top").find(".cont").css("display","none");
                        $(".servicewindow_top").find('.cont[data-cid='+ x +']').css("display","block");
                    })
                });
                break;
            case "leave":     // 有用户离开
                // 获取cid，从列表中删除
                $(".servicelist ul").find("li").each(function () {
                    if($(this).attr("data-cid") == cid){
                        $(this).remove();       // 删除客户
                    }
                });
                $(".servicewindow_top").find(".cont").each(function () {
                    if($(this).attr("data-cid") == cid){
                        $(this).remove();       // 删除客户
                    }
                });
                break;
            case "咨询":     // 有用户咨询消息
                // 获取内容，显示在咨询窗口 - 最好是高亮该用户id
//                        var msg = "<div>[" + cid + "问]：" + data.msg + "</div>";
                var msg='<div class="dialogue">'+
                    '<div class="username">'+cid+'</div>'+
                    '<div class="text">'+data.msg+'</div>'+
                    '</div>';
                // 将消息显示在咨询窗口
                $(".servicewindow_top").find(".cont").each(function () {
                    if($(this).attr("data-cid") == cid){
                        $(this).append(msg);
                        // 窗口自动向下滚动
                        $(this).scrollTop($(this).prop("scrollHeight"));
                    }
                });
                break;
        }
    });

    // 客服发送回答信息
    $(".btn-send").on("click", function () {
        // 获取客服输入的咨询内容
        var content = $(".servicewindow_bottom textarea").val();
        if(content!='') {
            // 构造要发送的信息的数据结构
            var data = {
                type: "客服",
                cid: currentCid,
                msg: content
            };
            clientSocket.send(data);
            $(".servicewindow_top").find(".cont").each(function () {
                if ($(this).attr("data-cid") == currentCid) {
                    // 将咨询内容追加到界面上
//                        $(this).append("<div>" + content + "</div>");
                    var msg = '<div class="dialogue rightside">' +
                        '<div class="username">我</div>' +
                        '<div class="text">' + content + '</div>' +
                        '</div>';
                    $(this).append(msg);
                    // 窗口自动向下滚动
                    $(this).scrollTop($(this).prop("scrollHeight"));
                }
            });
            $(".servicewindow_bottom textarea").val(null);    // 清空输入框
        }
    });

    // 当按下Enter键时，触发send按钮的click事件
    $('.servicewindow_bottom textarea').keydown(function (e) {
        if (e.keyCode == 13) {  // 如果是按下的Enter键
            //模拟点击send按钮，触发上面的 Click 事件
            $(".btn-send").click();
            return false
        }
    });

});