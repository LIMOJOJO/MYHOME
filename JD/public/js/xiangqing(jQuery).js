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
    //切换样式
    $('.page1 .dl4 dd').each(function () {
        $(this).on('click',function () {
            $(this).addClass('select').siblings().removeClass('select')
        })
    });
    //数量计数器
    $(function () {
        $('.page1 .dl5 input').on('blur',function () {
            if(isNaN($('.page1 .dl5 input').val())){
                $('.page1 .dl5 input').val('1')
            }
        })
        $('.page1 .dl5 button:eq(0)').on('click',function () {
            var x=parseInt($('.page1 .dl5 input').val());
            $('.page1 .dl5 input').val(x+1)
        })
        $('.page1 .dl5 button:eq(1)').on('click',function () {
            var x=parseInt($('.page1 .dl5 input').val());
            $('.page1 .dl5 input').val(x-1)
        })
    });
    //page2选项卡
    $('.page2 .title li').each(function (index) {
        $(this).on('click',function () {
            $(this).addClass('ac').siblings().removeClass('ac');
            $('.page2 .main:eq('+index+')').removeClass('hidden').addClass('show').siblings().addClass('hidden').removeClass('show');
        })
    })
})
