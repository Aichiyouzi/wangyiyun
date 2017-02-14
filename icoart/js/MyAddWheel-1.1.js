function addWhell(obj,fn){
		if(window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1){
			obj.addEventListener('DOMMouseScroll',fnEv);
		}else{
			obj.addEventListener('mousewheel',fnEv);
		}
	
		function fnEv(ev){
			var down = true;
			if(ev.wheelDelta){
				 down = ev.wheelDelta > 0 ? true : false;
			}else{
				 down = ev.detail < 0 ? true : false;
			}
			typeof fn == 'function' && fn(down);
		}
	}