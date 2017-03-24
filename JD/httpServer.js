/**
 * Created by hxsd on 2017/1/4.
 */
var http=require("http");
//引入express模块
var express=require('express');
var app=express();
var data=require("./products.js");
var list=data.listProducts();
var datas=data.createProducts();
var path = require("path");

app.use(express.static(path.resolve(__dirname,"public")));// 使用中间件

app.get("/data",function (request,response) {
    console.log(JSON.stringify(request.query));
    response.json(list)
});
app.get("/search",function (request,response) {
    console.log(JSON.stringify(request.query));
    var keyword=request.query.keyword;
    var result=datas[keyword];
    response.json(result)
});

var httpServer = http.createServer(app);
require("./socketServer")(httpServer);

httpServer.listen(3000,function () {
    console.log('服务器正运行在3000端口')
});