window.onload = window.onresize = function() {
	var divs = $('#wrap').children;
	var iW = $(window).innerWidth();
	var iH = $(window).innerHeight();
	var wrap = document.getElementById('wrap');
	var divs = $('#wrap').children('div');
	var lis = $('#navList').children();
	var toPL = document.getElementById('topL');
	var list = document.getElementById('list');
	var build = document.getElementById('buildings');
	var iphoneB = document.getElementById('iphoneB');
	var spans = list.children;
	var oul = document.getElementById('oul');
	var lies = oul.getElementsByTagName('li');
	var letterTop = document.getElementById('letterTop');
	var letterBottom = document.getElementById('letterBottom');
	var call= document.getElementById('call');
	var land = document.getElementById('land');
	var build4 = document.getElementById('build4');
	var caodi = document.getElementById('caodi');
	var buildCould = document.getElementById('buildCloud');
	var thirdTree = document.getElementById('thirdTree');
	var Tree1 = document.getElementById('tree5-1');
	var Tree2 = document.getElementById('tree5-3');
	var Tree3 = document.getElementById('tree5-5');
	var Tree4 = document.getElementById('tree5-7');
	var Tree5 = document.getElementById('tree5-9');
	var house = document.getElementById('house');
	var pork = document.getElementById('pork');
	var zhezhao1 = document.getElementById('zhezhao1');
	var zhezhao2 = document.getElementById('zhezhao2');
	var zhezhao3 = document.getElementById('zhezhao3');
	var zhezhao4 = document.getElementById('zhezhao4');
	var zhezhao5 = document.getElementById('zhezhao5');
	var star = $('.star');
	var div1 = $('.div1');
	var timer1 = null;
	var str = '';
	var num = 0;
	var onOff = true;
	for (var i = 0; i < divs.length; i++) {
		divs[i].style.height = iH + 'px';
		divs[i].style.position = 'relative';
		divs[i].style.width = iW + 'px';
	}

	addWheel(document, function(down) {
		if (onOff) {
			onOff = false;
			if (down) {
				num--;
				if (num <= 0) {
					num = 0;
				}
				if( num == 0 ){
					clearClass();
				}
				if( num == 1 ){
					num2Ico();
				}
				/*if( num == 2 ){
					clearClass();
				}*/
				
				if(num <= divs.length-1){
					wrap.style.top = -num*iH + 'px';
				}
			} else {
				num++;
//				console.log(divs.length,num)
				/*if( num > divs.length-1 ){
					
				}*/
				if(num < divs.length){
					wrap.style.top = -iH*num + 'px';
				}
				if(num >= divs.length){
					num = divs.length;
					
					wrap.style.top = -iH*(divs.length-1)-200 + 'px';
				}
			}

			
			
	
			contentMove1();
			buildMove();
			callHeight();
			lander();
			caodiMove();

			for (var i = 0; i < lis.length; i++) {
				lis[i].style.background = 'transparent';
			}
			navList();
			setTimeout(function() {
				onOff = true;
			}, 2000);
		}
	});
	for (var i = 0; i < lis.length; i++) {
		lis[i].index = i;
		lis[i].onclick = function() {
			num = this.index;
			console.log(num)
			if( num == 0 ){
				clearClass();
			}
			if( num == 1 ){
				num2Ico();
			}
			navList();
			contentMove1();
			buildMove();
			callHeight();
			lander();
			caodiMove();

			if( num == 4 || num ==5  ){
				num4IcoClear();
			}
			
		}
	}

	function navList() {
		if (num == 2) {
			for(var i=0;i<spans.length;i++){
				spans[i].style.backgroundColor = '#3c4651';	
			}
			topL.style.color = '#3c4651';
			for (var i = 0; i < lis.length; i++) {
				lis[i].style.background = 'transparent';
				lis[i].style.border = '2px solid #3c4651';
				lis[num].style.background = '#3c4651';
			}
			
			num2Ico();
			
		} else {
			for (var i = 0; i < lis.length; i++) {
				lis[i].style.background = 'transparent';
				lis[i].style.border = '2px solid #fff';
				lis[num].style.background = '#fff';
			}
			topL.style.color = '#fff';
			for(var i=0;i<spans.length;i++){
				spans[i].style.backgroundColor = '#fff';
			}
		}
		if(num == divs.length){
			wrap.style.top = -iH*(divs.length-1)-200 + 'px';
		}else{
			wrap.style.top = -num * iH + 'px';
		}
		
	}

	function addWheel(obj, fn) {
		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1) {
			obj.addEventListener('DOMMouseScroll', fn1);
		} else {
			obj.addEventListener('mousewheel', fn1);
		}

		function fn1(ev) {
			var down = true;
			if (ev.wheelDelta) {
				down = ev.wheelDelta > 0 ? true : false;
			} else {
				down = ev.detail < 0 ? true : false;
			}
			typeof fn == 'function' && fn(down);
			ev.preventDefault();
		}
	}
	//////////////生成第2页星星
	for(var i=0;i<60;i++){
		str += '<span style="top:'+Math.floor(Math.random()*100)+'px;left:'+Math.floor(Math.random()*1200)+'px;></span>';
	}
	star.html(str);
	
	///////第一页动画
	contentMove1();
	function contentMove1(){
		if(num != 0){
			setTimeout(function(){
				div1.removeClass('move');
			},500)
		}else{
			div1.addClass('move');
		}
	}
	
	////////第二页下方建筑运动
	buildMove();
	function buildMove(){
		if(num == 1){
			setTimeout(function(){
				startMove(build,'bottom',1000,0,'easeOut');
			},800)
			iphoneB.style.zIndex = 10;
			setTimeout(function(){
				startMove(iphoneB,'bottom',1000,-130,'easeOut');
			},1100)
			
			num1Ico();
			
		}else{
			startMove(build,'bottom',2000,-215,'easeOut');
			iphoneB.style.zIndex = 9;
			setTimeout(function(){
				startMove(iphoneB,'bottom',1000,-530,'easeOut');
			},500)
			
		}
	}
	///第3页黑色区域部分
	callHeight();
	function callHeight(){
		if(num == 2){
			setTimeout(function(){
				startMove(call,'height',600,360,'easeOut');
			},1200)	
		}else{
			setTimeout(function(){
				startMove(call,'height',500,0,'easeOut');
			},1000)	
		}
	}

////////第4页下方动作
	lander();
	function lander(){
		
		if(num == 3){
			num3Ico();
			mun3IcoClear();
			
			$('#tree1').css('bottom',-80);
			$('#tree3').css('bottom',-40);
			$('#tree5').css('bottom',-125);
			$('#tree7').css('bottom',-90);
			$('#tree9').css('bottom',-110);
			$('#car').css({
				'right':535,
				'opacity':0
			});
			$('#letter').css('bottom',-536);
			setTimeout(function(){
				$('#tree1').animate({
				"bottom":40
				},{
					duration:800,
					easing:'swing'
				});
				$('#tree3').animate({
					"bottom":60
				},{
					duration:800,
					easing:'swing'
				});
				$('#tree5').animate({
					"bottom":26
				},{
					duration:800,
					easing:'swing'
				});
				$('#tree7').animate({
					"bottom":60
				},{
					duration:800,
					easing:'swing'
				});
				$('#tree9').animate({
					"bottom":50
				},{
					duration:800,
					easing:'swing'
				});
				$('#car').animate({
					"right":138,
					"opacity":10
				},{
					duration:1000,
					easing:'swing'
				});
			},1500)
			
			$('#letter').animate({
				"bottom":-10
				},{
					duration:1500,
					easing:'swing'
			});
			
			startMove(land,'height',1500,70,'easeOut');
			startMove(zhezhao1,'height',1500,42,'easeOut');
			startMove(zhezhao2,'height',1500,60,'easeOut');
			startMove(zhezhao3,'height',1500,26,'easeOut');
			startMove(zhezhao4,'height',1500,60,'easeOut');
			startMove(zhezhao5,'height',1500,50,'easeOut');
			setTimeout(function(){
				startMove(build4,'bottom',1500,70,'easeOut');
			},1000)
		}else{
			startMove(build4,'bottom',1500,-150,'easeOut');
			startMove(land,'height',1500,0,'easeOut');
			startMove(zhezhao1,'height',1500,0,'easeOut');
			startMove(zhezhao2,'height',1500,0,'easeOut');
			startMove(zhezhao3,'height',1500,0,'easeOut');
			startMove(zhezhao4,'height',1500,0,'easeOut');
			startMove(zhezhao5,'height',1500,0,'easeOut');
		}
	}
	



//////第5页下方动作
	caodiMove();
	function caodiMove(){
		if(num == 4 || num == 5){
			
			console.log(num)
			mun3IcoClear();
			
			oul.style.top = 2*iH+'px';
			setTimeout(function(){
				startMove(Tree1,'bottom',800,24,'easeOut');
				startMove(Tree2,'bottom',800,24,'easeOut');
				startMove(Tree3,'bottom',800,26,'easeOut');
			},1000)
			setTimeout(function(){
				startMove(Tree4,'bottom',800,22,'easeOut');
				startMove(Tree5,'bottom',800,20,'easeOut');
				startMove(house,'bottom',800,25,'easeOut');
				startMove(pork,'bottom',800,0,'easeOut');
			},1500)
			setTimeout(function(){
				startMove(pork,'bottom',800,0,'easeOut');
			},1500)
			setTimeout(function(){
				startMove(caodi,'bottom',800,-30,'easeOut')
			},500)
			setTimeout(function(){
				startMove(buildCloud,'bottom',1000,-30,'easeOut')
			},800)
		}else{
			setTimeout(function(){
				startMove(Tree1,'bottom',800,-55,'easeOut');
				startMove(Tree2,'bottom',800,-40,'easeOut');
				startMove(Tree3,'bottom',800,-80,'easeOut');
			},500)
			
			setTimeout(function(){
				startMove(Tree4,'bottom',800,-90,'easeOut');
				startMove(Tree5,'bottom',800,-70,'easeOut');
				startMove(house,'bottom',800,-92,'easeOut');
				startMove(pork,'bottom',800,-65,'easeOut');
				startMove(caodi,'bottom',800,-60,'easeOut');
			},500)
			buildCloud.style.bottom = -200 + 'px';	
		}
	}

//照片动画

function clearClass(){
	for( var i=0;i<lies.length;i++ ){
		lies[i].className = 'num2Ico'+(i+1);
	}
}

function num1Ico(){
	for( var i=0;i<lies.length;i++ ){
		lies[i].className = 'num1Ico'+(i+1);
	}
}
function num2Ico(){
	oul.style.transition = '1s';
	oul.style.top = iH*num+'px';
	
	for( var i=0;i<lies.length;i++ ){
		lies[i].className = 'num2Ico'+(i+1);
	}
}



function num4IcoClear(){
	var a = num-2;
	oul.style.top = a*iH+'px';
	for( var i=0;i<lies.length;i++ ){
		lies[i].className = 'num2Ico'+(i+1);
	}
	
};

function mun3IcoClear(){
	setTimeout(function(){
		letterTop.className = 'letterblock';
		letterBottom.className = 'letterBack';
	},500)
}


function num3Ico(){
	oul.style.top = iH*num+'px';
	for( var i=0;i<lies.length;i++ ){
		lies[i].className = 'num3Ico'+(i+1);
	}
	
	setTimeout(function(){
		for( var i=0;i<lies.length;i++ ){
			lies[i].className = 'numIco';
		}
	},1000);
	
	setTimeout(function(){
		letterTop.className = 'letternone';
	},2000);
	setTimeout(function(){
		letterBottom.className = 'letterBottom_o';
	},2500)
	
}
}