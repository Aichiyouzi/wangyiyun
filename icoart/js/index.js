window.onload = window.onresize = function (){
	document.onmousedown = function (){
		return false;
	}
	var min = $('.min');
	var minChild = document.querySelectorAll('.min-child');
	var visibleH = window.innerHeight;
	min.css({
		height:visibleH
	});
	for (var i=0; i<minChild.length; i++){
		minChild[i].style.height = visibleH + 'px';
	};
	
	// 渲染第三页面info的数据
	(function (){
		var mInfo = $('.min-child3').find('.m-info');
		var html = '';
		for (var i = 0; i < dataText.length; i++){
			html += '<div class="info"><p>'+dataText[i].p1+'</p>'+
					'<p>'+dataText[i].p2+'</p>'+
					'<p>'+dataText[i].p3+'</p></div>';
		};
		mInfo.html(html)
	})();
	
	// 第二页面导航数据渲染
	(function (){
		var msg = $('.min-child2').find('.list').find('li');
		var str = '';
		for (var i = 0; i < dataMsg.length; i++){
			html = '<div class="msg">'+
					 '<p class="text">'+dataMsg[i].text1+'</p>'+
					 '<p class="text">'+dataMsg[i].text2+'</p>'+
					  '</div>';
		};
		for (var i = 0; i < msg.length; i++){
			msg[i].innerHTML += str;
		}
	})();
	
	/* 鼠标移入导航菜单的div */
	navOver();
	function navOver(){
		var navBg = $('.nav-bg');
		var headNav = $('.header-nav');
		var headNavs = $('.header-nav').find('a');
		navBg.css({
			width:headNavs.eq(0).innerWidth()
		});
		headNavs.on('mouseenter',function (){
			defaule(this);
		});
		headNav.on('mouseleave',function (){
			var iW = headNavs.eq(0).innerWidth();
			var iH = headNavs.eq(0).parent().height();
			var iL = headNavs.eq(0).position().left;
			navBg.css({
				display:'block',
				width:iW,
				height:iH,
				left:iL
			});
		});
		function defaule(obj){
			var iW = $(obj).innerWidth();
			var iH = $(obj).parent().height();
			var iL = $(obj).position().left;
			navBg.css({
				display:'block',
				width:iW,
				height:iH,
				left:iL
			});
		};
	};
	/* 鼠标移入移出share */
	shareO()
	function shareO(){
		var timer1 = null;
		var shareEwm = document.querySelector('.share-ewm');
		var twoDc = shareEwm.querySelector('.twoDC');
		twoDc.onmouseover = shareEwm.onmouseover = function (){
			clearInterval(timer1);
			twoDc.style.transform = 'translateY(0px)';
			twoDc.style.visibility = 'visible';
			twoDc.style.opacity = 1;
		}
		twoDc.onmouseout = shareEwm.onmouseout = function (){
			clearInterval(timer1);
			timer1 = setTimeout(function (){
				twoDc.style.transform = 'translateY(-40px)';
				twoDc.style.visibility = 'hidden';
				twoDc.style.opacity = 0;
			},400)
		};	
	};
	// 鼠标滚轮切换屏幕
	MoverRoll()
	function MoverRoll(){
		var min = $('.min');
		var minMove = min.find('.min-move');
		var minChild1 = minMove.find('.min-child1');
		var minChild = minMove.find('.min-child');
		var pageSpan = $('#Page').find('span');
		var iH = minChild1.innerHeight();
		var onOff = true;
		var num = 0;
		
		// 鼠标滚轮切换页面
		addWhell(document,function (down){
			if (onOff){
				onOff = false;
				if (down){
					num--;
					if (num <= 0){
						num = 0;
					};
				}else {
					num++;
					if (num == 3){
						num = 2;
					};
				};
				minMove.css({
					transform:"translate3d(0px,"+-num*iH+"px,0px)"
				})
				pageSpan.eq(num).addClass('PgActive').siblings('span').removeClass('PgActive');
				timer = setTimeout(function (){
					onOff = true;
				},1000);
				MinChild1(num);
				navAnima(num);
				MinChild3(num);
				cDown(num);
			};
		});
		
		// 点击页码切换页面
		(function (){
			var PageS = $('#Page').find('span');
			PageS.click(function (){
				$(this).addClass('PgActive').siblings('span').removeClass('PgActive');
				num = $(this).index();
				minMove.css({
					transform:"translate3d(0px,"+-num*iH+"px,0px)"
				});
				MinChild1(num);
				navAnima(num);
				MinChild3(num);
				cDown(num)
			});
		})()
		
		// 点击中间箭头切换页面
		var cDownPull = $('#cDownPull');
		cDownPull.on('click',function (){
			num++;
			if (num == 3){
				num = 2;
			};
			minMove.css({
				transform:"translate3d(0px,"+-num*iH+"px,0px)"
			})
			pageSpan.eq(num).addClass('PgActive').siblings('span').removeClass('PgActive');
			MinChild1(num);
			navAnima(num);
			MinChild3(num);
			cDown(num);
		});
		
		// 第一个页面的logo效果
		function MinChild1(num){
			if (num <= 0){
				minChild1.addClass('in');	
			}else if (num >= 1){
				minChild1.removeClass('in')
			};
		};
		MinChild1(num);
		
		// 第二页面导航动画
		function navAnima(){
			var list = $('.min-move').find('.min-child2').find('.list');
			var lis = list.find('li');
			var timer2 = null;
			var n = 0;
			if (num == 1){
				timer2 = setInterval(function (){
					lis.eq(n).addClass('lisIn');
					n++;
					if (n == lis.length){
						clearInterval(timer2);
					}
				},150);
			}
			if (num != 1){
				lis.siblings('li').removeClass('lisIn')
			};
		};
		
		// 第三页面切入效果
		function MinChild3(num){
			var minChild3 = $('.min').find('.min-child3');
			var child = minChild3.find('.content').find('.m-content').find('.child');
			var info = minChild3.find('.content').find('.m-info').find('.info');
			if (num != 2){
				minChild3.removeClass('in');
			}else {
				minChild3.addClass('in');			
			};
		}
	};
	
	// 刷新页面页码闪出
	(function (){
		function sPage(){
			var Page = $('#Page');
			var timer4 = null;
			timer4 = setTimeout(function (){
				Page.css({
					right:2+'%'
				})
			},1300);	
		};
		sPage()
	})();
	
	// header部分自动出现
	(function (){
		function topH(){
			var timer5 = null;
			var header = $('#header');
			timer5 = setTimeout(function (){
				header.css({
					transform:"translateY(0px)"
				})
			},1300)
		}
		topH();
	})();
	
	// 第二页面导航鼠标移入切换图片
	(function (){
		function listNav(){
			var list = $('.min-move').find('.min-child2').find('.list');
			var lis = list.find('li');
			var msg = lis.find('.msg');
			var btn = list.find('.btn');
			var minChildBg = $('.min-child2').find('.child-bg');
			minChildBg.addClass('out');
			minChildBg.eq(0).addClass('in').removeClass('out');
			lis.on('mouseover',function (){
				var index = $(this).index();
				msg.removeClass('msgIn');
				btn.removeClass('active');
				minChildBg.addClass('out').removeClass('in');
				$(this).find('.msg').addClass('msgIn');
				$(this).find('.btn').addClass('active');
				minChildBg.eq(index).addClass('in').removeClass('out');
			});
		}
		listNav();
	})();
	
	// 第二页面左右滑动
	(function (){
		var childBg2 = document.getElementById('child-bg2');
		var childBg4 = document.getElementById('child-bg4');
		var BgLis4 = childBg4.getElementsByTagName('li')[0];
		var BgLis2 = childBg2.getElementsByTagName('li');
		var disX = 0;
		var iX = document.documentElement.clientWidth;
		var num = 0;
		var nub = 0;
		$(document).on('mousemove',function (ev){
			num = 60;
			nub = 60;
			disX = ev.pageX;
			var scale = disX/iX;
			BgLis2[0].style.transform = 'translateX(-'+scale * num+'px)';
			BgLis2[1].style.transform = 'translateX('+scale * num+'px)';
			BgLis4.style.transform = 'translateX(-'+scale * nub+'px)';
		});
	})();
	
	// 第三页面动画
	Treen();
	function Treen(){
		var minChild3 = $('.min').find('.min-child3');
		var child = minChild3.find('.content').find('.m-content').find('.child');
		var info = minChild3.find('.content').find('.m-info').find('.info');
		child.eq(0).addClass('in');
		info.eq(0).addClass('in');
		info.eq(1).addClass('left-in');
		child.eq(1).addClass('left-in');
		function fn1(){
			var num = 0;
			var nub = 0;
			var timer3 = null;
			timer3 = setInterval(function (){
				info.eq(num).addClass('left-out').removeClass('in');
				child.eq(num).addClass('left-out').removeClass('in');
				num++;
				if (num == 2 ){
					num = 0;
					
				};
				child.eq(num).addClass('in').removeClass('left-in');
				info.eq(num).addClass('in').removeClass('left-in');
				
				setTimeout(function (){
					child.eq(nub).addClass('left-in').removeClass('left-out');
					info.eq(nub).addClass('left-in').removeClass('left-out');
					nub++;
					if( nub == 2 ){
						nub = 0;
					};
				},2000)
			},5000);
		};
		fn1();
	};
	
	
	// 中间按钮到第三页面消失
	function cDown(num){
		var cDownPull = $('#cDownPull');
		if (num != 2){
			cDownPull.css({
				display:"block"
			});
		}else {
			cDownPull.css({
				display:"none"
			});
		};
	};
};