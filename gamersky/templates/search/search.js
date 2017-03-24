/**
 * Created by JOJO on 2017/2/11 0011.
 */
myapp.controller("searchCtrl", function ($scope) {
    // 准备商品数据
    $scope.news = ['荣誉战魂','丧尸围城4','四海兄弟3','iPhone7','辐射：避难所','钢铁雄心4','守望先锋','占地1','黑暗之魂3','古墓丽影：崛起','LOL','女神','福利','动图猜影','囧图','王思聪','主播','NBA2K16','GTA5','三国志13','合金装备5幻痛','海贼无双3','御天降魔录'];
    $scope.games= ['荣耀战魂','流放者柯南','生化危机7','FF15','最终幻想15','口袋妖怪：日月','看门狗2','方舟：生存进化','龙珠：超宇宙2','泰坦陨落2','黑暗之魂3DLC','文明6','战地1','NBA 2K17 MC模式','NBA 2K17勋章','侠客风云传前传武功','侠客风云传前传队友','战争机器4','四海兄弟3','极限竞速：地平线3','侠客风云传前传','GTA5','FIFA 17','NBA 2K17','实况足球2017','海贼王：燃烧热血','进击的巨人','杀出重围：人类分裂','拳皇14','无人深空','讨鬼转2','星界边境','辐射：避难所','Inside','黎明杀机','钢铁雄心4','镜之边缘：催化剂','战锤：全面战争','国土防线2'];
    $scope.mobileGames= ['战锤40K：象棋-弑君','杀出重围GO','饥荒：口袋版','生命线：危机一线','天堂2：血盟','莫比乌斯：最终幻想','生存Online GO','少女前线','自杀小队','精灵宝可梦：GO'];
    $scope.dingyue=[
        {title: "单机电玩", desc: "4880", imgsrc: "images/dingyue_1.jpg"},
        {title: "硬件", desc: "2550", imgsrc: "images/dingyue_2.jpg"},
        {title: "动漫", desc: "1000", imgsrc: "images/dingyue_3.jpg"},
        {title: "影视", desc: "3900", imgsrc: "images/dingyue_4.jpg"},
        {title: "科技", desc: "2110", imgsrc: "images/dingyue_5.jpg"},
        {title: "网游", desc: "6880", imgsrc: "images/dingyue_6.jpg"},
        {title: "手游", desc: "1700", imgsrc: "images/dingyue_7.jpg"},
        {title: "晨报", desc: "800", imgsrc: "images/dingyue_8.jpg"},
        {title: "产业", desc: "560", imgsrc: "images/dingyue_9.jpg"},
    ]
});