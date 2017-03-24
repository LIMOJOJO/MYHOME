/**
 * Created by JOJO on 2017/2/9 0009.
 */
myapp.controller("gameLibraryCtrl", function ($scope) {
    // 准备商品数据
    $scope.products = [
        {title: "生化危机7",  imgsrc: "images/ku_residentevilbiohazard_b.jpg"},
        {title: "仁王",  imgsrc: "images/ku_nioh_b.jpg"},
        {title: "流放者柯南",  imgsrc: "images/ku_conanexiles_b.jpg"},
        {title: "毁灭战士4",  imgsrc: "images/ku_doom4_b.jpg"},
        {title: "泰拉瑞亚：来世",  imgsrc: "images/ku_terrariaotherworld_b.jpg"},
        {title: "黎明杀机",  imgsrc: "images/ku_deadbydaylight_b.jpg"},
        {title: "黑暗之魂3",  imgsrc: "images/ku_darksouls3_b.jpg"},
        {title: "重力眩晕2",  imgsrc: "images/ku_gravityrush2_b.jpg"},
        {title: "消逝的光芒",  imgsrc: "images/ku_dyinglight_b.jpg"},
        {title: "火箭联盟",  imgsrc: "images/ku_rocketleague_b.jpg"},
        {title: "星际争霸2：虚空之遗",  imgsrc: "images/ku_starcraft2legacyofthevoid_b.jpg"},
        {title: "星露谷物语",  imgsrc: "images/ku_stardewvalley_b.jpg"},
        {title: "星界边境",  imgsrc: "images/ku_starbound_b.jpg"}
    ];
});