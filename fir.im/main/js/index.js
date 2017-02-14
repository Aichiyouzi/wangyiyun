(function(){
		var firIm = (function(){
			var arr = ['BetaAppHost','{','　　return "fir.im"','}'];
			var fir = ["fir.im"];
			var bgColor = ['#3c81df','#e3a520','#d85245','#11b076','#9E5C42'];
			var users = $('.screen-4').find('.users-words').find('.address');
			var onscroll = true;
			var endTime = 0; 
			var startTime = 0; 
			var pageCount = 0;   //默认第一页
			var allPage = 5;    //全部页面
			var onOff = true;
			var jsons = {
				init : function(){    //初始化
					setTimeout(function(){
						$("#loadingImage").find("img").hide();
						jsons.loading();
						jsons.creatwords(wenzi,arr);
					},800);
					jsons.addScroll();
					jsons.usersHover();
				},
				addScroll : function(){ // 鼠标的 上下滚动
					var _this = this;
					$(document).on("mousewheel DOMMouseScroll", function(e){   //兼容火狐
						e.preventDefault();
						if(!onscroll){
							var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
							if(onOff){ 
								onOff = false;
								if(delta<0){ 
									pageCount ++;
									if(pageCount > allPage){ 
										pageCount = allPage;
										return false;
									}
									_this.pageDown(pageCount);
								}else{ 
									pageCount --;
									if(pageCount<0){ 
										pageCount = 0;
										return false;
									}
									_this.pageUp(pageCount);
								}
								setTimeout(function (){
                    				onOff = true;
                				},1000);
							}
						}
					});
				},
				loading: function(){
					var winw = $(window).width() + 150;
					var winh = $(window).height() + 150;
					var circle = $('#loadingImage').find('.circle');
					var airplane = $('#airplane');
					var w = circle.width();
					var h = circle.height();
					var timer = null;
					clearInterval(timer);
					timer = setInterval(function(){
						circle.css({
							"width": w +=20,
							"height" : h += 20,
							marginTop : -(w/2),
							marginLeft : -(h/2)
						})
						if(w >= winw && h >= winh){
							clearInterval(timer);
							$("#loadingImage").fadeOut();
							airplane.addClass('flyIn');
							onscroll = false;
							setTimeout(function(){
								airplane.removeClass("flyIn");
							},1500);
						}
					},15);
				},
				pageDown : function(num){
					var _this = this;
					switch(num){
						case 1 :
							$(".navBar").addClass("white");
							$("#airplane").addClass("flyOut"); 
							$("#wenzi").hide();
							setTimeout(function(){ 
								$(".product").addClass("rotate");
							},1000);
							break;
						case 2:
							$(".product").removeClass('glide').addClass("upglide");
							break;
						case 3:
							$(".product").addClass("rotateOut");
							$("#about").css("opacity",0);
							$(".screen-3").addClass("show");
							break;
						case 4:
							$(".screen-4").addClass("comeIn");
							break;
						case 5:
							$(".screen-5").addClass("comeOut");
							$(".navBar").removeClass("white");
							$("#firShow").html("");
							setTimeout(function(){
								_this.creatwords(firshow,fir);
							},800);
					}
				},
				pageUp : function(num){ 
					var _this = this;
					switch(num){
						case 0:
							$(".navBar").removeClass("white");
							$(".product").removeClass("rotate")
							$("#airplane").removeClass('flyOut').addClass("flyIn");
							$('.screen-2 .row').css('backgroundColor','#ffd200');
							setTimeout(function(){
								$("#wenzi").show();
								$("#airplane").removeClass("flyIn");
								_this.creatwords(wenzi,arr);	
							},1500);
							break;
						case 1:
							$(".product").removeClass("upglide").addClass("glide");
							break;
						case 2:
							$(".product").removeClass("rotateOut");
							setTimeout(function(){
								$("#about").css("opacity",1);
								$(".screen-3").removeClass("show");
							},800);
							break;
						case 3:
							$(".screen-4").removeClass("comeIn");
							break;
						case 4:
							$("#navBar").addClass("white");
							$(".screen-5").removeClass("comeOut");
							break;			
					}
				},
				creatwords : function(id,arr){ //创建动态文字
					var speed = 100;
					var c = "",index = 0,pos = 0;
					var strLen = arr[0].length;
					var tlen = arr.length; 
					var row = 0;
					appendWord();
					function appendWord(){
						c='';
						row = Math.max(0,index-tlen);
						while(row < index){
				    		c += arr[row++] + '\r\n';
						}
						id.innerText = c+arr[index].slice(0,pos)+"|"; 
						if(pos==strLen){
							pos = 0;
							c = arr[index]+"\r\n";
							index ++;			
							if(index < tlen){
								strLen = arr[index].length;
								setTimeout(appendWord,speed);
							}else{
								id.innerText = id.innerText.replace("|","");
							}
						}else{
							pos++;
							setTimeout(appendWord,speed);
						}	
					}
				},
				usersHover : function(){
					users.eq(0).css('backgroundColor','#fff').find('span').css('color','#3c81df').next().addClass('words1');
					users.hover(function(){
						users.removeClass('active');
						$(this).css('backgroundColor','#fff').addClass('active').siblings().css('backgroundColor','transparent')
						.find('span').css('color','white').next().addClass('.words-hide').removeClass('words1');
						$(this).find('span').css('color',bgColor[$(this).index()]);
						$(this).parents('.users').css('backgroundColor',bgColor[$(this).index()]);
						
					},function(){
						$(this).css('backgroundColor','transparent').siblings().removeClass('active');
						$(this).find('span').css('color','white');
					})
					return false;
				}
			};
			return jsons.init();
		})();
		return firIm;
})();