/**
 * Created by JOJO on 2017/1/8 0008.
 */
$(function () {
    // 和socket服务器建立连接，获得客户端的socket对象
    // 连接服务器。这将从被加载的页面向服务器发送连接请求，
    // 最终在服务器端socketio中触发connection事件
    var clientSocket = io();

    // 生成一个随机客户id，发送给服务器
    var customerId = "客户" + (Math.ceil(1000 + Math.random() * 1000));
    // 将客户id显示在界面上
    $("#cid").text(customerId);
    $(".u-name").text(customerId);
    // 向server socket发送消息
    clientSocket.send({type: "enter", cid: customerId});

    // 在咨询窗口显示欢迎信息
    var welcome = "<div>[温馨提示]：您现在可以开始咨询了，请输入您要咨询的内容?</div>";
    $(".servicewindow_top").append(welcome);

    // 客户端socket监听服务器发过来的消息
    clientSocket.on("message", function (data) {
        var cid = data.cid;
        if (cid == customerId) {
            // 说明这个消息是发送给自己的
            var msg = '<div class="dialogue">'+
                '<div class="username">京东客服</div>'+
                '<div class="text">'+data.msg+'</div>'+
                '</div>';

            // 将消息显示在咨询窗口
            $(".servicewindow_top").append(msg);
            // 窗口自动向下滚动
            $(".servicewindow_top").scrollTop($(".servicewindow_top").prop("scrollHeight"));
        }
    });

    // 发送咨询内容
    $(".btn-send").on("click", function () {
        // 获取用户输入的咨询内容
        var content = $(".servicewindow_bottom textarea").val();
        if(content!=''){
            // 构造要发送的信息的数据结构
            var data = {
                type: "咨询",
                cid:customerId,
                msg: content
            };
            clientSocket.send(data);

            // 将咨询内容追加到界面上
            $('.servicewindow_top').append('<div class="dialogue rightside">'+
                '<div class="username">我</div>'+
                '<div class="text">'+content+'</div>'+
                '</div>');
            // 窗口自动向下滚动
            $(".servicewindow_top").scrollTop($(".servicewindow_top").prop("scrollHeight"));
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