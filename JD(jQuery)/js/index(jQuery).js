/**
 * Created by JOJO on 2017/1/1 0001.
 */
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
    //导航栏
    $('.page1 .nav li').each(function (index) {
        $(this).hover(
            function () {
                $(this).addClass('nav_hoverLi');
                $('.page1 .popup:eq('+index+')').css('display','block')
            },
            function () {
                $(this).removeClass('nav_hoverLi');
                $('.page1 .popup:eq('+index+')').css('display','none')
            }
        )
    });
    $('.page1 .popup').each(function (index) {
        $(this).hover(
            function () {
                $(this).css('display','block');
                $('.page1 .nav li:eq('+index+')').addClass('nav_hoverLi')
            },
            function () {
                $(this).css('display','none');
                $('.page1 .nav li:eq('+index+')').removeClass('nav_hoverLi')
            }
        )
    });
    //轮播图
    $(function () {
        /*
         这里改用事件触发机制，在playBanner()方法中，周期性地触发按钮事件。
         因此，只需要编写按钮mouseover事件响应即可。
         */
        $(function () {
            carousel();
        });

        var currentZIndex = 1;   // 代表当前最大的z-index
        var currentPicIndex = 0; // 代表当前焦点图片的索引
        var timer;          // 保存定时器变量
        var delay = 3000;   // 图片切换的延时
        var picNum = $("#banner ul").find("li").length;


        function carousel() {
            // 初始化banner
            // 将第一张图片放在最上面
            $("#banner ul").find("li:first").css("zIndex", currentZIndex);

            /****************以下为增加鼠标悬停事件响应********************/
            // 添加鼠标悬停事件响应
            $("#banner").hover(
                function () {
                    // 停止图片播放-清除定时器
                    clearInterval(timer);
                },
                function () {
                    playBanner();   // 继续播放
                });

            /****************以下为动态生成导航按钮********************/
                // 动态生成导航按钮
            var navContent = "";
            $("#banner ul").find("li").each(function (i) {
                navContent += '<li>' + (i + 1) + '</li>';
            });
            // 将生成的5个span添加到banner-nav中，并为第一个span设置class=current
            $("#banner ol").html(navContent).children().first().removeClass().addClass("ac");

            /****************以下为导航按钮添加鼠标移入事件响应********************/
            // 遍历按钮集合，为每个按钮添加鼠标移入事件响应
            $("#banner ol").find("li").each(function () {
                $(this).on("mouseover", function (e) {
                    // 1)将当前按钮的样式设为.current;2)重置所有按钮的样式为.normal；
                    $(this).removeClass().addClass("ac").siblings().removeClass();
                    //获取哪个按钮被点击，也就是找到被点击按钮的索引值
                    var index = $(this).index();

                    //3)将对应位置的图片，动态滑入;向右偏移570px,将该图片的z-index值提升
                    $("#banner ul").find("li").eq(index).css({left: "730px", zIndex: currentZIndex++})
                        .stop().animate({left: "0px"});

                    // 将刚滑入的图片的索引设为当前焦点图片的索引
                    currentPicIndex = index;
                    e.stopPropagation();    // 阻止事件传播
                });
            });

            /****************以下为执行图片播放********************/
            playBanner();       //开始执行图片幻灯切换
        }

        // 轮播图片的方法
        function playBanner() {

            clearInterval(timer);
            timer = setInterval(anim, delay);

            function anim() {
                // 选取下一张图片
                var nextIndex = currentPicIndex + 1;
                if (nextIndex == picNum) {
                    nextIndex = 0;
                }

                //模拟触发数字按钮的mouseover - 在匹配的对象上触发指定的事件
                $("#banner ol").find("li").eq(nextIndex).trigger("mouseover");
            }
        }
        //前后切换的方法
        $('.nextBtn').on('click',function() {
            // 选取下一张图片
            var nextIndex = currentPicIndex + 1;
            if (nextIndex >= picNum) {
                nextIndex = 0;
            }

            //模拟触发数字按钮的mouseover - 在匹配的对象上触发指定的事件
            $("#banner ol").find("li").eq(nextIndex).trigger("mouseover");
        });
        $('.preBtn').on('click',function() {
            // 选取下一张图片
            var nextIndex = currentPicIndex - 1;
            if (nextIndex < 0) {
                nextIndex = picNum-1;
            }
            //模拟触发数字按钮的mouseover - 在匹配的对象上触发指定的事件
            $("#banner ol").find("li").eq(nextIndex).trigger("mouseover");
        })
    });
    //1F右侧导航条选项卡-----------------------------------------------------------------------------------
    $('#floor1 .title li').each(function (index) {
        $(this).on('mouseover',function () {
            $(this).addClass('ac').siblings().removeClass('ac');
            $('#floor1 .main:eq('+index+')').removeClass('hidden').addClass('show').siblings().removeClass('show').addClass('hidden');
        })
    });
    //左侧导航楼层导航条-----------------------------------------------------------------------------------
    $(function () {
        $(window).scroll(function () {
            if ($(window).scrollTop()>1549){
                $('.LocationFloorList').css('display','block')
            }else{
                $('.LocationFloorList').css('display','none')
            }
            $('.floor').each(function (index,item) {
                if(item.offsetTop<$(window).scrollTop()+400){
                    $('.LocationFloorList li:eq('+index+')').addClass('ac').siblings().removeClass('ac')
                }
            })

        });
        $('.LocationFloorList li').each(function (index) {
            $(this).on('click',function () {
                $('html,body').animate({
                    scrollTop:$('.floor:eq('+index+')').offset().top
                },600)
            })
        })

    })
});
