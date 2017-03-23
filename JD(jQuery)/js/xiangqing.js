// JavaScript Document

window.onload=function(){
	//左侧图片选项卡 放大镜
	picTab();
	function picTab(){
		var page1=document.getElementsByClassName('page1')[0];
		var left=page1.getElementsByClassName('left')[0];
		
		var pic=page1.getElementsByClassName('pic')[0];
		var photo=page1.getElementsByClassName('photo')[0];
		
		var aImg=photo.getElementsByTagName('img');
		var change=page1.getElementsByClassName('change')[0];
		var aBtn=change.getElementsByTagName('li');
		
		var scrollTop=document.documentElement.scrollTop || document.body.scrollTop;
		var scrollLeft=document.documentElement.scrollLeft || document.body.scrollLeft;
		var hand=photo.getElementsByClassName('hand')[0];
		
		var zoom=left.getElementsByClassName('zoom')[0];
		var BigImg=zoom.getElementsByTagName('img');
		
		var n=0;//计数器，记录鼠标移入下面li按钮的下标
		for(var i=0;i<aImg.length;i++){
			aBtn[i].index=i;
			aBtn[i].onmouseover=function(){
				var _this=this;
				change(_this);
				n=this.index;
			};
			
			aBtn[i].onmouseout=function(){
				var _this=this;
				change(_this);
				n=this.index;
			};
			
			function change(_this){
				for(var j=0;j<aImg.length;j++){
					aImg[j].style.display='none';
					aBtn[j].className='';
				};
				_this.className='act';
				aImg[_this.index].style.display='block';
			};
		
			//放大镜
			photo.onmouseover=function(){
				//鼠标移入photo盒子时，让左侧放大镜和右侧放大镜盒子显示
				hand.style.display=zoom.style.display="block";
				zoom.style.left=hxsd_tools.offsetLeft(pic)+zoom.offsetWidth-43+"px";	//右侧放大镜盒子的定位为父级盒子相对于浏览器的定位+本身的宽度减去margin
				zoom.style.top=hxsd_tools.offsetTop(pic)-14+"px";
				//先循环将放大镜盒子内的所有图片隐藏
				for(var i=0;i<BigImg.length;i++){
					BigImg[i].style.display="none";
				};
				//让当前li按钮下标对应的右侧放大镜盒子中的图片显示
				BigImg[n].style.display="block";
			};
			
			photo.onmouseout=function(){
				hand.style.display=zoom.style.display="none";
				for(var i=0;i<BigImg.length;i++){
					BigImg[i].style.display="none";
				};
			};
			
			photo.onmousemove=function(ev){
				var oEv=ev || window.event;

				var l=scrollLeft+oEv.clientX-photo.offsetLeft-hand.offsetWidth/2;
				var t=scrollTop+oEv.clientY-photo.offsetTop-hand.offsetHeight/2;
				if(l<0){
					l=0;
				};
				if(l>photo.offsetWidth-hand.offsetWidth){
					l=photo.offsetWidth-hand.offsetWidth;
				};
				if(t<0){
					t=0;
				};
				if(t>photo.offsetHeight-hand.offsetHeight){
					t=photo.offsetHeight-hand.offsetHeight;
				};
				hand.style.left=l+'px';
				hand.style.top=t+'px';
				
				var l_rate=l/(photo.offsetWidth-hand.offsetWidth);
				var t_rate=t/(photo.offsetHeight-hand.offsetHeight);
				
				BigImg[n].style.left=-(BigImg[n].offsetWidth-zoom.offsetWidth)*l_rate+'px';
				BigImg[n].style.top=-(BigImg[n].offsetHeight-zoom.offsetHeight)*t_rate+'px';
				return false;
			};
			
		}
		
		
	}
	
	//切换样式
	changeStyle();
	function changeStyle(){
		var page1=document.getElementsByClassName('page1')[0]; 
		var center=page1.getElementsByClassName('center')[0];
		var dl4=page1.getElementsByClassName('dl4')[0]; 
		var dd=dl4.getElementsByTagName('dd');
		
		for(var i=0;i<dd.length;i++){
			dd[i].onclick=function(){
				for(var j=0;j<dd.length;j++){
					dd[j].className='';
				};
				this.className='select';
			};
		};	 
	};
	
	//数量计数器
	sum();
	function sum(){
		var page1=document.getElementsByClassName('page1')[0]; 
		var dl5=page1.getElementsByClassName('dl5')[0];
		var input=dl5.getElementsByTagName('input')[0];
		var Btn=dl5.getElementsByTagName('button');
		
		input.onblur=function(ev){
			if(isNaN(input.value)){
				input.value="1";
			};
		};	
			
		Btn[0].onclick=function(){
			input.value=parseInt(input.value)+1;
		};
		Btn[1].onclick=function(){
			input.value=parseInt(input.value)-1;
			if(input.value==0){
				input.value=1;
				return false;
			};
		};
	};
	
	//page2选项卡
	page2Tab();
	function page2Tab(){
		var page2=document.getElementsByClassName('page2')[0];
		var title=page2.getElementsByClassName('title')[0];
		var nav_li=title.getElementsByTagName('li');
		var aMain=page2.getElementsByClassName('main');
		
		for(var i=0;i<nav_li.length;i++){
			nav_li[i].index=i;
			nav_li[i].onclick=function(){
				for(var j=0;j<nav_li.length;j++){
					nav_li[j].className='';
					aMain[j].className='main hidden clear';
				};
				this.className="ac";
				aMain[this.index].className='main show clear';
			};	
		};
	};
	
	
};