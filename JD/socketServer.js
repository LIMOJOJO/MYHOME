/**
 * Created by xinliwei on 2016-12-09 0009.
 *
 * 消息的类型：
 *      客服发送的消息：需要发给指定的目标客户
 *      客户发送的消息：需要发给客服
 *
 * 定义好消息的格式：
 * 1. 客户可以会发送的咨询信息：
 * {
 *    type: "咨询",
 *    nickname: "小神仙",
 *    msg: "您好，神仙水什么时候到货?"
 * }
 * 2. 客服可能会回复的消息：
 * {
 *    type: "客服",
 *    nickname: "京东客服",
 *    msg: "您好，您咨询的商品，月底到货。"
 * }
 *
 * 客户端和服务器之间的数据传送格式我们采用json
 socket.io会自动将json转为js对象
 Socket.io 的发送对象范围：
 向当前客户端发送事件
 socket.emit('login', {
          numUsers: numUsers
        });
 广播（不包含当前客户端）
 socket.broadcast.emit('new message', {
          username: socket.username,
          message: data
        });
 广播（且包含当前客户端）
 io.sockets.emit('message', "this is a test");
 在房间广播（不包含当前客户端）
 socket.broadcast.to('game').emit('message', 'nice game');
 在房间广播（包含当前客户端）
 io.sockets.in('game').emit('message', 'cool game');
 发送给指定客户端
 io.sockets.sockets[socketid].emit('message', 'for your eyes only');
 就可以向一个特定用户推送消息，但是如何获得这个socketId，就是生成一个哈希数组，key为username，
 值为socket.id，这样就可以通过用户名获取对应的id，进而可以向特定client推送消息。
 */
// 引入socket.io模块
var socketIO = require("socket.io");

module.exports = function (httpServer) {
    // 让socket.io监听web服务器，并返回socket.io服务器
    var socketServer = socketIO.listen(httpServer);

    // socket服务器会监听所有客户端的连接请求
    // 当有客户端连接请求到达时，会触发一个"connect"事件
    // 每一个客户端请求，服务器端都会创建一个新的socket对象，负责和对方通信
    socketServer.on("connect", function (socket) {
        console.log("有新的客户端连接:" + socket.id);

        // 向客户端发送消息:
        // 有两个方法：send-发送的是默认叫做"message"的消息,
        //             emit-发送自定义名称的消息
        // 以下方法的两个参数：参数1:消息名称;参数2:消息内容
        //socket.emit("hello","欢迎您，新朋友!");

        // 服务器socket监听客户端发过来的消息
        socket.on("message", function (data) {
            // 提取收到的消息的类型
            var type = data.type;
            console.log("data.type:" + type);
            // 根据收到的消息类型，作用不同的处理
            switch (type) {
                case "enter":  // 处理新咨询用户入场
                    console.log("新客户:" + data.cid);
                    customerEnter(socket, data);    // 交给客服界面
                    break;
                case "咨询":  // 说明是客户发送过来的信息
                    toService(socket, data);    // 交给客服界面
                    break;
                case "客服":  // 说明是客服发送过来的消息
                    toCustomer(socket, data);   // 发送给客户端
                    break;
            }
        });

        // 监听客户端断开连接的事件
        socket.on("disconnect", function () {
            customerLeave(socket);  // 交给客服界面
        });
    });

    // 当接收到客户发送过来的咨询内容时
    function customerEnter(socket, data) {
        // 保存用户的昵称到socket对象中
        socket.cid = data.cid;

        // 将新用户登录的消息群发给聊天室内所有的用户
        // socket.broadcast.send会群发消息给所有的客户端socket，除了自己
        socket.broadcast.send(data);
    }

    // 当接收到客户发送过来的咨询内容时
    function toService(socket, data) {
        // 将新用户登录的消息群发给聊天室内所有的用户
        // socket.broadcast.send会群发消息给所有的客户端socket，除了自己
        socket.broadcast.send(data);
    }

    // 当接收到客服发送过来的应答内容时
    function toCustomer(socket, data) {
        // 将聊天信息广播出去
        // socket.broadcast:会将消息广播给所有的客户端，除了自己
        socket.broadcast.send(data);
    }

    // 离客户端断开socket连接时
    function customerLeave(socket) {
        // 构造要广播给客户端的消息的数据结构
        var data = {
            type: "leave", // 用户离开
            cid: socket.cid
        };
        // 广播出去
        socket.broadcast.send(data);
    }
};
