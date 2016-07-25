function passedTime(){
	var nowDate = new Date();
	var startDate = new Date("2007/05/29 21:00:00");				//设置起始时间
	var passedTime = parseInt((nowDate - startDate) / 1000);		//计算之间经过多少秒
	if(passedTime > 0){
		var passedSecond = passedTime % 60;							//计算剩余秒
		var passedMinute = parseInt(passedTime / 60) % 60;			//计算剩余分钟
		var passedHours = parseInt(passedTime / 60 / 60) % 24;		//计算剩余小时
		var passedDate = parseInt(passedTime / 60 / 60 / 24);		//计算剩余天（截止到天）
	} else {
		var passedSecond = 0;
		var passedMinute = 0;
		var passedHours = 0;
		var passedDate = 0;
	}
	if (passedSecond < 10){
		passedSecond = "0" + passedSecond;
	}
	if (passedMinute < 10){
		passedMinute = "0" + passedMinute;
	}
	if (passedHours < 10){
		passedHours = "0" + passedHours;
	}
	if (passedDate < 10){
		passedDate = "0" + passedDate;
	}
	return [passedDate, passedHours, passedMinute, passedSecond];
}

function showPassedTime(){
	$("#days").html(passedTime()[0]);
	$("#hours").html(passedTime()[1]);
	$("#minutes").html(passedTime()[2]);
	$("#seconds").html(passedTime()[3]);
	setTimeout("showPassedTime()", 1000);
}