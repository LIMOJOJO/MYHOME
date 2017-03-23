/**
 * Created by hxsd on 2017/1/2.
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
    //动态生成内容
    $(function () {
        var url="data/products.json";
        $.getJSON(url,function(products){
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

    })
});