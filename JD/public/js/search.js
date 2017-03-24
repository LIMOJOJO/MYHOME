
$(function () {
    //天气
    $(function () {
        // 请求的url
        var url = "http://wthrcdn.etouch.cn/weather_mini?city=北京";
        function getIcon(weather) {
            var weatherIconMap={
                "晴":["day_qing.png","night_qing.png"],
                "霾":["day_yin.png","night_yin.png"],
                "大雪":["day_daxue.png","night_daxue.png"],
                "大雨":["day_dayu.png","night_dayu.png"],
                "多云":["day_duoyun.png","night_duoyun.png"],
                "小雨":["day_xiaoyu.png","night_xiaoyu.png"],
                "小雪":["day_xiaoxue.png","night_xiaoxue.png"],
                "中雪":["day_zhongxue.png","night_zhongxue.png"],
                "中雨":["day_zhongyu.png","night_zhongyu.png"]
            };
            return weatherIconMap[weather]
        }
        // 发起ajax请求
        $.getJSON(url,function(data){
            var oDate=new Date();
            var content = "今天是：" + (oDate.getMonth()+1)+'月'+data.data.forecast[0].date;
            content += '<br/>今日天气：'+data.data.forecast[0].type;
            content += "　温度：" + data.data.wendu+'℃';
            content += "<br/>风向：" + data.data.forecast[0].fengxiang;
            content += '　风力：'+data.data.forecast[0].fengli;
            content += "<br/>温馨提示：";
            content +=  data.data.ganmao;
            $(".weather .cont").html(content);
            if(oDate.getHours()>18||oDate.getHours()<6){
                $('.weather img').attr("src","images/"+getIcon(data.data.forecast[0].type)[1])
            }else {
                $('.weather img').attr("src","images/"+getIcon(data.data.forecast[0].type)[0])
            }
        });
    });
    //加载后根据data文件生成内容
/*    $(function () {
        var url="/data";
        $.getJSON(url,function(products){
            for(var i=0;i<products.length;i++){
                // 取出其中的每一个元素(每一个商品)
                var product = products[i];
                // 构造ul中的每一个li
                var $li = $("<li>");
                $li.append('<a href="#/xiangqing?subject='+product.title+'" class="pic"><img src="images/'+product.imgsrc+'"></a>'+
                    '<div class="rightcont">'+
                    '<h3>'+product.title+'</h3>'+
                    '<p>'+product.desc+'</p>'+
                '<div class="eye">'+product.concern+'</div>'+
                    '</div>');
                // 将构造好的li追加到ul中
                $(".main .inner .ulcont ul").append($li);
            }
        });
    });*/
    //搜索栏
/*    $(".submit").on("click",function(){
        $(".main .inner .ulcont ul").html("");
        var keyword=$('.main .search').val();
        var url="/search?keyword="+keyword;
        $.getJSON(url,function (products) {
            for(var i=0;i<products.length;i++){
                // 取出其中的每一个元素(每一个商品)
                var product = products[i];
                // 构造ul中的每一个li
                var $li = $("<li>");
                $li.append('<a href="#javascript:;" class="pic"><img src="images/'+product.imgsrc+'"></a>'+
                    '<div class="rightcont">'+
                    '<h3>'+product.title+'</h3>'+
                    '<p>'+product.desc+'</p>'+
                    '<div class="eye">'+product.concern+'</div>'+
                    '</div>');
                // 将构造好的li追加到ul中
                $(".main .inner .ulcont ul").append($li);
            }
        });
        return false
    })*/
});





var myapp = angular.module("myapp", ["ngRoute"]);
myapp.factory("cartService",function () {
    //容器：相当于购物车的购物筐
    var cart=[];
    return {
        //添加商品到购物车
        add:function (product,num) {
            for(var i=0;i<cart.length;i++){
                var item=cart[i];
                if(product.title==item.product.title){
                    item.number+=num;
                    return
                }
            }
            cart.push({product:product,number:num});
        },
        //从购物车中删除商品的方法
        remove:function (name) {
            for(var i=0;i<cart.length;i++){
                var item=cart[i];
                if(name==item.product.title){
                    cart.splice(i,1);
                    return
                }
            }
        },
        //查询购物车中所有商品的方法
        findAll:function () {
            return cart
        },
        //清空购物车
        clear:function () {
            cart.length=0
        }
    }
});
//配置路由信息：需要注入$routeProvider service
myapp.config(function ($routeProvider) {
    $routeProvider.when("/", {templateUrl: "pages/search.html",controller:"searchCtrl"})
        .when("/search", {templateUrl: "pages/search.html",controller:"searchCtrl"})
        .when("/buy", {templateUrl: "pages/buy.html",controller:"buyCtrl"})
        .when("/xiangqing", {templateUrl: "pages/xiangqing.html",controller:"xiangqingCtrl"})
        .when("/xiangqing/:subject", {templateUrl: "pages/xiangqing.html",controller:"xiangqingCtrl"})
        .otherwise({templateUrl: "pages/search.html"})
});
myapp
    .controller("searchCtrl",function () {
        //加载后根据data文件生成内容
        $(function () {
            var url="/data";
            $.getJSON(url,function(products){
                for(var i=0;i<products.length;i++){
                    // 取出其中的每一个元素(每一个商品)
                    var product = products[i];
                    // 构造ul中的每一个li
                    var $li = $("<li>");
                    $li.append('<a href="#/xiangqing?subject='+product.title+'" class="pic"><img src="images/'+product.imgsrc+'"></a>'+
                        '<div class="rightcont">'+
                        '<h3>'+product.title+'</h3>'+
                        '<p>'+product.desc+'</p>'+
                        '<div class="eye">'+product.concern+'</div>'+
                        '</div>');
                    // 将构造好的li追加到ul中
                    $(".main .inner .ulcont ul").append($li);
                }
            });
        });
        //搜索栏
        $(".submit").on("click",function(){
            $(".main .inner .ulcont ul").html("");
            var keyword=$('.main .search').val();
            var url="/search?keyword="+keyword;
            $.getJSON(url,function (products) {
                for(var i=0;i<products.length;i++){
                    // 取出其中的每一个元素(每一个商品)
                    var product = products[i];
                    // 构造ul中的每一个li
                    var $li = $("<li>");
                    $li.append('<a href="#/xiangqing?subject='+product.title+'" class="pic"><img src="images/'+product.imgsrc+'"></a>'+
                        '<div class="rightcont">'+
                        '<h3>'+product.title+'</h3>'+
                        '<p>'+product.desc+'</p>'+
                        '<div class="eye">'+product.concern+'</div>'+
                        '</div>');
                    // 将构造好的li追加到ul中
                    $(".main .inner .ulcont ul").append($li);
                }
            });
            return false
        })
    })
    .controller("xiangqingCtrl", function ($scope,$routeParams,cartService) {
        //左侧图片选项卡 放大镜
        $(function () {
            $('.page1 .left .zoom img:eq(0)').css('display','block');
            $('.page1 .change li').each(function (index) {
                $(this).on('mouseover',function () {
                    $(this).addClass('act').siblings().removeClass('act');
                    $('.page1 .photo img:eq('+index+')').css('display','block').siblings().css('display','none');
                    $('.page1 .left .zoom img:eq('+index+')').css('display','block').siblings().css('display','none')

                })
            });
            $('.page1 .photo img').each(function (index) {
                $(this).parent().hover(
                    function () {
                        $('.page1 .photo .hand').css('display','block');
                        $('.page1 .left .zoom').css('display','block');
                    },
                    function () {
                        $('.page1 .photo .hand').css('display','none');
                        $('.page1 .left .zoom').css('display','none');
                    }
                )
            });
            $('.page1 .photo').on('mousemove',function (ev) {
                var oEv=ev || window.event;
                var l=$(window).scrollLeft()+oEv.clientX-$('.page1 .photo').offset().left-parseInt($('.page1 .photo .hand').css('width'))/2;
                var t=$(window).scrollTop()+oEv.clientY-$('.page1 .photo').offset().top-parseInt($('.page1 .photo .hand').css('height'))/2;
                if(l<0){
                    l=0;
                };
                if(l>parseInt($('.page1 .photo').css('width'))-parseInt($('.page1 .photo .hand').css('width'))){
                    l=parseInt($('.page1 .photo').css('width'))-parseInt($('.page1 .photo .hand').css('width'))
                }
                if(t<0){
                    t=0;
                }
                if(t>parseInt($('.page1 .photo').css('height'))-parseInt($('.page1 .photo .hand').css('height'))){
                    t=parseInt($('.page1 .photo').css('height'))-parseInt($('.page1 .photo .hand').css('height'))
                }
                $('.page1 .photo .hand').css('left',l);
                $('.page1 .photo .hand').css('top',t);
                var l_rate=l/(parseInt($('.page1 .photo').css('width'))-parseInt($('.page1 .photo .hand').css('width')));
                var t_rate=t/(parseInt($('.page1 .photo').css('height'))-parseInt($('.page1 .photo .hand').css('height')));
                $('.page1 .left .zoom img').css('left',(-(parseInt($('.page1 .left .zoom img').css('width'))-parseInt($('.page1 .left .zoom').css('width')))*l_rate));
                $('.page1 .left .zoom img').css('top',(-(parseInt($('.page1 .left .zoom img').css('height'))-parseInt($('.page1 .left .zoom').css('height')))*t_rate));

                return false;
            })
        });
        $scope.products = [
                {
                    "title": "无线立体声耳机",
                    "desc": "无线立体声耳机，带来更舒适的听觉盛宴。光滑纤细的颈戴式结构，简洁而不简单。自然的弧度提升了佩戴时的颈部舒适，蓝牙控制更高科技。",
                    "price": 303,
                    "imgsrc": "jingxuan01.jpg"
                },
                {
                    "title": "先锋 可插线蓝牙耳机",
                    "desc": "NFC蓝牙设备，与蓝牙设备的配对及连接更加便利；持久续航，安全实用且拥有长达20个小时续航能力；丰富的接口配件，满足多种场合的需要；3D转轴设计，便于收纳轻松携带，便携性强。",
                    "price": 227,
                    "imgsrc": "jingxuan02.jpg"
                },
                {
                    "title": "海信 空气净化器",
                    "desc": "除霾高指标针对重度雾霾环境一扫而净。15分钟快速出重霾。APP远程控制，随时随地，轻松操控。三大滤网核心技术，净化室内空气，健康呵护全家人。",
                    "price": 208,
                    "imgsrc": "jingxuan03.jpg"
                },
                {
                    "title": "漫步者 时尚多媒体音箱",
                    "desc": "时尚前卫的造型、出色的音质音效、遥控、蓝牙，无论连接PC、笔记本，还是平板电视，甚至手机，都为您带来听觉、视觉双重享受。彰显不凡品味；不规则箱体结充满动感的低音炮，沉稳中透出犀",
                    "price": 208,
                    "imgsrc": "jingxuan04.png"
                },
                {
                    "title": "紫外线除螨吸尘器",
                    "desc": "“除螨机”可以通过紫外线杀灭病菌，还可以通过高速振动把床褥上的尘螨“拍”出来吸附到集尘盒中，对床褥进行深度洁净。 ",
                    "price": 142,
                    "imgsrc": "jingxuan05.jpg"
                },
                {
                    "title": "AKG Y40折叠便携式耳机",
                    "desc": "追逐灵感之声，简洁明快的出街上品。迷你 便捷的高音质随身时尚头戴耳机。令人着迷鼓舞人心的声音轻盈貌美。调音相对均衡，高频延伸自然，中频饱满贴近，低频充沛浑厚。",
                    "price": 162,
                    "imgsrc": "jingxuan06.jpg"
                },
                {
                    "title": "惠威（HiVi）M200MKIII有源音箱",
                    "desc": "2.0音箱 Hi-Fi音响 豪华原木做工",
                    "price": 301,
                    "imgsrc": "jingxuan07.jpg"
                }
        ];
        var param=$routeParams.subject;
        angular.forEach($scope.products,function (item) {
            if(item.title==param){
                $scope.product=item;
                return
            }
        });
        $scope.add=function (product,num) {
            cartService.add(product,num);
        };
        $scope.number=1;
        $scope.$watch("number",function (newValue) {
            $scope.number=newValue<1?1:$scope.number;
        });
    })
    .controller("buyCtrl", function ($scope, cartService) {
        // 拿到购物筐中的所有商品
        $scope.cart = cartService.findAll();

        // 删除购物车中商品的方法
        $scope.remove = function (name) {
            cartService.remove(name);
        };

        // 统计购买总数量
        $scope.count = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += item.number;
            });
            return total;
        };
        $scope.$watch("cart",function (newValue) {
            angular.forEach(newValue,function (product) {
                product.number=product.number<1?1:product.number;
            })
        },true);
        // 计算购买总金额
        $scope.money = function () {
            var total = 0;
            angular.forEach($scope.cart, function (item) {
                total += item.number * item.product.price;
            });
            return total;
        };
    });
myapp.controller("myCtrl",function ($scope,cartService) {
    $scope.cart = cartService.findAll();
    $scope.count = function () {
        var total = 0;
        angular.forEach($scope.cart, function (item) {
            total += item.number;
        });
        return total;
    };
});