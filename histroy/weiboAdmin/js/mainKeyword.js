function fMainKeyword(){
	$("#keyword a").click(function(){
		$(this).addClass("clicked");	//改变样式
			//ajax删除 下面是模拟
			var clickDom = $(this);
			window.setTimeout(function(){clickDom.hide(50);}, Math.random()*1000);
			//ajax删除 上面是模拟
		return false;					//阻止跳转
	});
}