function dragScroll(autoScrollSpeed){			//autoScrollSpeed为滚动速度，单位ms
	var timer;
	var mouseMove = false;						//标记鼠标是否进入拖拽状态
	var scrollY;								//滚动条位置
	var mouseY;									//鼠标垂直位置
	var scrollObj = document.getElementById("scroll");
	var contentHeight = scrollObj.scrollHeight;				//获取div所有内容的高度
	var displayHeight = scrollObj.offsetHeight;				//获取div显示内容的高度
	var scrollSpeed = contentHeight / displayHeight / 2;	//设置滚动速度基数，实际高度/显示高度

	if(contentHeight > displayHeight){
		scrollObj.style.cssText = "cursor:row-resize";		//若所有内容的高度大于显示的内容，则鼠标变为row-resize（即可以滚动）
	}
	
	scrollObj.ondblclick = function(){
		if(autoScrollSpeed == null){ autoScrollSpeed = 50; }
		timer = setInterval(autoScroll,autoScrollSpeed);	//以autoScrollSpeed设置的速度自动滚动
	}
	function autoScroll(){
		scrollObj.scrollTop = scrollObj.scrollTop + 1;		//自动滚动功能
	}
	
	scrollObj.onmousedown = function(e){
		clearInterval(timer);					//停止自动滚动
		var event = e||window.event;			//ie、ff兼容事件绑定
		mouseMove = true;						//将鼠标标记为拖拽状态
		mouseY = event.clientY;					//获取鼠标按下时候的Y轴位置
		scrollY = scrollObj.scrollTop;			//获取当前滚动条位置
		this.setCapture();						//设置当前窗口绑定鼠标
	}
	
	scrollObj.onmousemove = function(e){
		var event = e||window.event;			//ie、ff兼容事件绑定
		if(mouseMove == true){
			scrollObj.style.cssText = "cursor:n-resize";
			var scrollMove = mouseY - event.clientY;	//拖动的垂直距离
			this.scrollTop = scrollY + scrollMove * scrollSpeed;
			return false;
		}
	}
	
	scrollObj.onmouseup = function(){
		mouseMove = false;
		scrollY = $("#scroll").scrollTop();		//鼠标抬起时记录滚动条的位置
		this.releaseCapture(); 					//取消当前窗口的鼠标绑定
		if(contentHeight > displayHeight){
			scrollObj.style.cssText = "cursor:row-resize";		//若所有内容的高度大于显示的内容，则鼠标变为row-resize（即可以滚动）
		} else {
			scrollObj.style.cssText = "cursor:default";			//否则为不可滚动状态，鼠标变为default
		}
	}
}