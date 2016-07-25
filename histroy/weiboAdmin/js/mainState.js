function fMainState(nBaseValue){
	var nBaseValue = nBaseValue ? nBaseValue : 1000,	//设置百分比基值，默认1000
		aAllChartRowBar = $("#stateChart .chartRow .bar");
	
	aAllChartRowBar.each(function(){
		var nCount = $(this).find(".count").html(),
			sBarWidth = (nCount / nBaseValue) > 1 ? 90 + "%" : (nCount / nBaseValue * 90) + "%";
		$(this).find("p").width(sBarWidth);
	});
}