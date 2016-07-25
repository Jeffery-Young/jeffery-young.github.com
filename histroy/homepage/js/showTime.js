function date(){
	var nowDate = new Date();
	var myYear = nowDate.getFullYear();
	var myMonth = nowDate.getMonth() + 1;
	if( myMonth < 10){
		myMonth = "0" + myMonth;
	}
	var myDate = nowDate.getDate();
	if( myDate < 10){
		myDate = "0" + myDate;
	}
	var myDay = nowDate.getDay();
	switch(myDay){
		case 0: myDay = "天";break;
		case 1: myDay = "一";break;
		case 2: myDay = "二";break;
		case 3: myDay = "三";break;
		case 4: myDay = "四";break;
		case 5: myDay = "五";break;
		case 6: myDay = "六";break;
	}
	var myHours = nowDate.getHours();
	if( myHours <= 12){
		var myTimeFormat = "AM";
	} else if( 13 <= myHours <= 24){
		var myTimeFormat = "PM";
		myHours = myHours - 12;
	}
	var myMinutes = nowDate.getMinutes();
	if( myMinutes < 10){
		myMinutes = "0" + myMinutes;
	}
	var mySeconds = nowDate.getSeconds();
	if( mySeconds < 10){
		mySeconds = "0" + mySeconds;
	}
	return [myYear, myMonth, myDate, myDay, myHours, myMinutes, mySeconds, myTimeFormat];
}

function showTime(){
	$("#time span").html(date()[4] + ":" + date()[5] + " " + date()[7]);
	setTimeout("showTime()", 1000);
}