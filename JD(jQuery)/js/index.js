// JavaScript Document


documentReady(function(){


	//左侧菜单-----------------------------------------------------------------------------------------------------
	menu();
	function menu(){
		var page1=document.getElementsByClassName('page1')[0];
		var nav_list=page1.getElementsByClassName('nav')[0];
		var side_li=nav_list.getElementsByTagName('li');
		var popup=page1.getElementsByClassName('popup');
		var n=0;
		for(var i=0;i<side_li.length;i++){
			side_li[i].index=i;
			function mouseHover(){
				for(var j=0;j<side_li.length;j++){
					side_li[j].className='';
					popup[j].style.display="none";
				};
			};
			//菜单父级li
			side_li[i].onmouseover=function(){
				mouseHover();
				this.className='nav_hoverLi';
				popup[this.index].style.display='block';
				n=this.index;
			};
			side_li[i].onmouseout=function(){
				mouseHover();
			};
			//菜单父级li右侧子集
			popup[i].onmouseover=function(){
				mouseHover();
				side_li[n].className='nav_hoverLi';
				this.style.display='block';
			};
			popup[i].onmouseout=function(){
				mouseHover();
			};
		};
	};	
	
	//banner轮播图------------------------------------------------------------------------------------------
	bannerChange();
	function bannerChange(){
		var banner=document.getElementById('banner'); 
		slide(banner);
		function slide(obj){
			var ol=obj.getElementsByTagName('ol')[0];
			//获取包含图片的ul盒子
			var oUl=obj.getElementsByTagName('ul')[0];
			//获取ul下所有的li
			var aLi=oUl.children;
			//前后按钮
			var preBtn=banner.getElementsByClassName('preBtn')[0];
			var nextBtn=banner.getElementsByClassName('nextBtn')[0];
			//计数器
			var n=0;
			var timer=null;
			//根据ul中图片的数量往ol中插入li数字按钮
			for(var i=0;i<aLi.length;i++){
				var li=document.createElement('li');
				li.innerHTML=i+1;
				ol.appendChild(li);
			};
			//获取ol下的数字按钮
			var aBtn=obj.getElementsByTagName('ol')[0].children;
			aBtn[0].className='ac';
			
			//给ul设置宽度，让li横排；
			var li_w=hxsd_tools.getStyle(aLi[0],'width');//getStyle方法，在兼容情况下，获取样式表中的li的宽度
			oUl.style.width=li_w*aLi.length+'px';
			
			for(var i=0;i<aBtn.length;i++){
				aBtn[i].index=i;
				//数字按钮
				aBtn[i].onmouseover=function(){
					clearInterval(timer);
					hxsd_tools.animate(oUl,{"left":-this.index*li_w});//按钮点击时，让ul往左移动的距离为当前li按钮的下标乘以li的宽度
					n=this.index;									//当点击后，记录下当前按钮点击的下标
					changeBtn(n);
				};			
			};
			//更改按钮样式
			function changeBtn(){
				for(var j=0;j<aBtn.length;j++){
					aBtn[j].className='';
				};
				aBtn[n].className='ac';
			};
			//点击更换banner图片		
			preBtn.onclick=function(){
				n--;
				if(n<0) n=0;
				hxsd_tools.animate(oUl,{"left":-n*li_w});
				changeBtn(n);
			};
			nextBtn.onclick=function(){
				n++;
				if(n>=aLi.length-1) n=aLi.length-1;
				hxsd_tools.animate(oUl,{"left":-n*li_w});
				changeBtn(n);
			};	
			
			function timerRun(){
				timer=setInterval(function(){
					changeBtn(n);
					hxsd_tools.animate(oUl,{"left":-n*li_w});
					n++;
					if(n>=aLi.length){
                        n=0;
                        setTimeout(function () {
                            oUl.style.left=0;
                            changeBtn(n);
                        },2000)
					}
				},3000);
			};
			timerRun();
			//鼠标移入移出banner图区
			obj.onmouseover=function(){
				clearInterval(timer);
			};
			obj.onmouseout=function(){
				timerRun();
			};	
		};
	};

	
	//楼右侧导航条选项卡-----------------------------------------------------------------------------------
	navTab();
	function navTab(){
		var floor1=document.getElementById('floor1');
		var title=floor1.getElementsByClassName('title')[0];
		var nav_li=title.getElementsByTagName('li');
		var aMain=floor1.getElementsByClassName('main');
		for(var i=0;i<nav_li.length;i++){
			nav_li[i].index=i;
			nav_li[i].onmouseover=function(){
				for(var j=0;j<nav_li.length;j++){
					nav_li[j].className='';
					aMain[j].className='main hidden';
				};
				this.className="ac";
				aMain[this.index].className='main show';
			};		
		};
	};
	
	
	//左侧导航楼层导航条-----------------------------------------------------------------------------------
	floorNav();
	function floorNav(){
		var LocationFloorList=getByClass(document,'LocationFloorList')[0];
		var aLi=LocationFloorList.getElementsByTagName('li');
		var aFloor=getByClass(document,'floor');
		var arr=[];
		
		//---------------------------------------------------------------
		for(var i=0; i<aFloor.length; i++){
			var json={};
			json.name='f'+i;						//将楼层的个数用循环作为键值 赋值给 json对象的每一个name键
			json.offsetTop=aFloor[i].offsetTop;		//将每个楼层的offsetTop值 赋值给 json对象的每一个offsetTop键
			arr.push(json);							//将json对象放入空数组
		};
		window.onscroll=function(){
			//显示楼层编号----------------------------------------------------
			var scrolltop=document.documentElement.scrollTop || document.body.scrollTop;
			if(scrolltop>1549){
				LocationFloorList.style.display='block';
			}else{
				LocationFloorList.style.display='none';
			};
			//根据楼层滚动位置，定位编号-----------------------------------------
			var screenHeight=document.documentElement.offsetHeight || document.body.Height;
			var last_arr=[];
			for(var j=0; j<arr.length; j++){
				if(arr[j].offsetTop<scrolltop+400){
					last_arr.push(arr[j].name);
				};
			};
			
			var li_index=0;			
			if(last_arr.length>=10){
				li_index=last_arr[last_arr.length-1].substr(1,2);
			}else if(last_arr.length>0&&last_arr.length<10){
				li_index=last_arr[last_arr.length-1].substr(1,1);
			};
			//console.log(li_index);
			
			for(var l=0; l<aFloor.length; l++){
				aLi[l].className='';
			};
			aLi[li_index].className='ac';
		};
		//点击编号，跳转到相对楼层-----------------------------------------------
		for(var i=0; i<aFloor.length; i++){
			aLi[i].index=i;
			aLi[i].onclick=function(){
				var start=document.documentElement.scrollTop || document.body.scrollTop;
				var end=arr[this.index].offsetTop;
				move(start,end)
			}
		};
		//move-------------------------------------------------------
		var timer;
		function move(start,end){
			var dis=end-start;
			var count=parseInt(1500/30);
			var n=0;
			clearInterval(timer);
			timer=setInterval(function(){
				n++;
				var a=1-n/count;
				var step_dis=start+dis*(1-a*a*a*a);
				window.scrollTo(0,step_dis);
				if(n==count){
					clearInterval(timer);
				};
			},30)
		};
		//----------------------------------------------------------
		function getByClass(oParent,cls){
			var arr=[]; //容器
			if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
			else{
				var aEl=oParent.getElementsByTagName('*');//所有标签
				for(var i=0;i<aEl.length;i++){
					if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);//向数组中添加
				}
			return arr;
			}
		}
	}
	

});


