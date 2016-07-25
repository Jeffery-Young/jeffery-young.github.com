function mouseFollow(){
	var mouseX = 100;
	var mouseY = 200;
	//$("*").mousemove(function(e){
	//	mouseX = e.pageX;						//获取鼠标当前X轴位置
	//	mouseY = e.pageY;						//获取鼠标当前Y轴位置
	//	singleAction(mouseX,mouseY);
		
		//$(".name").empty().append(mouseX + " " + mouseY);
	//});
	//e = window.event;
	setInterval("singleAction(mouseX, mouseY)", 1000);
	
	
}


function singleAction(imgX, imgY){
	$("#mouseOverImg").append("<img src='images/mouse.png' style='position:absolute; left:" + imgX + "px; top:" + imgY + "px' />");
	//$("#mouseOverImg img").hide(1,function(){
		//$(this).remove();
	//});
	//$("#mouseOverImg").css({"top":imgY, "left":imgX});
	//$("#mouseOverImg").fadeOut("slow");
}