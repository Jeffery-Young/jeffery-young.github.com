function mouseFollow(){
	var mouseX = 100;
	var mouseY = 200;
	//$("*").mousemove(function(e){
	//	mouseX = e.pageX;						//��ȡ��굱ǰX��λ��
	//	mouseY = e.pageY;						//��ȡ��굱ǰY��λ��
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