function ChooseClasses(){
	$(".classes>input:radio").change(function(){
		var chooseClass = $(this).val();						//选中的按钮 bar/dh/monk/wd/wizard/all
		var arrChoose = new Array($("#maxItemAttributes>thead>tr>."+chooseClass).size());	//创建一个数组用以存放选中职业所在的列号，数组长度即为所选职业拥有的总列数
		var chooseClassIndex = $("#maxItemAttributes>thead>tr>."+chooseClass).each(function(i){
			arrChoose[i] = $(this).index();												//将列序号依次存入数组中，列序号从0开始
		});
		var arrLimited = new Array($("#maxItemAttributes>thead>tr>.limited").size());		//创建一个数组用以存放所有职业限制装备列号，数组长度即为总列数
		var limitedClassIndex = $("#maxItemAttributes>thead>tr>.limited").each(function(i){
			arrLimited[i] = $(this).index();												//将列序号依次存入数组中，列序号从0开始
		});
		
		if(chooseClass == "all"){
			//处理第一表头
			$("#maxItemAttributes .head").attr("colspan","4");
			$("#maxItemAttributes .torso").attr("colspan","2");	
			$("#maxItemAttributes .waist").attr("colspan","2");	
			$("#maxItemAttributes .off-hand").attr("colspan","4");
			//处理第二表头
			$("#maxItemAttributes").find(".limited").show();
			for(i=0; i<=arrLimited.length; i++){
				$("#maxItemAttributes>tbody>tr").each(function(){
					$(this).find("td").eq(arrLimited[i]).show();
				});
			};
		} else {
			//处理第一表头
			$("#maxItemAttributes").find(".head, .torso, .waist, .off-hand").attr("colspan","1");	//多个子表头的项colspan置为1	
			switch(chooseClass){
				case "bar":	
					$("#maxItemAttributes .waist").attr("colspan","2");
					break;
				case "dh":
					$("#maxItemAttributes .torso").attr("colspan","2");
					$("#maxItemAttributes .off-hand").attr("colspan","2");
					break;
				case "monk":
					$("#maxItemAttributes .head").attr("colspan","2");
					break;
				case "wd":
					$("#maxItemAttributes .head").attr("colspan","2");
					$("#maxItemAttributes .off-hand").attr("colspan","2");
					break;
				case "wizard":
					$("#maxItemAttributes .head").attr("colspan","2");
					$("#maxItemAttributes .off-hand").attr("colspan","2");
					break;
			};																//根据选中职业设置表头colspan值
			//处理第二表头
			$("#maxItemAttributes").find(".limited").hide();
			for(i=0; i<=arrLimited.length; i++){
				$("#maxItemAttributes>tbody>tr").each(function(){
					$(this).find("td").eq(arrLimited[i]).hide();
				});
			};
			$("#maxItemAttributes ."+chooseClass).show();
			for(i=0; i<=arrChoose.length; i++){
				$("#maxItemAttributes>tbody>tr").each(function(){
					$(this).find("td").eq(arrChoose[i]).show();
				});
			};
		}
	});
	
};

function DiabloTableStyle(){
	$(".diabloTable>tbody>tr:even").addClass("diabloTable_evenTrStyle");
	$(".diabloTable>tbody>tr:odd").addClass("diabloTable_oddTrStyle");
	
	$(".diabloTable>tbody>tr>td").hover(
		function(){
			var tdIndex = $(this).index() - 1;		//获取当前td所在的列数，从0开始
			$(".diabloTable>tbody>tr").each(function(){
				$(this).find("td").eq(tdIndex).addClass("diabloTable_tdYHover");
			});
			$(this).parent("tr").addClass("diabloTable_trHover");	//横行样式变化
		},	//移入时动作
		function(){
			var tdIndex = $(this).index() - 1;		//获取当前td所在的列数，从0开始
			$(".diabloTable>tbody>tr").each(function(){
				$(this).find("td").eq(tdIndex).removeClass("diabloTable_tdYHover");
			});
			$(this).parent("tr").removeClass("diabloTable_trHover");
		}	//移出时动作
	);
	
	$(".diabloTable>tbody>tr>td").toggle(
		function(){
			$(this).addClass("diabloTable_tdSelected");
		},
		function(){
			$(this).removeClass("diabloTable_tdSelected");
		}
	);		//点击 再次点击背景色变化
	
	$(".indexMain").dblclick(
		function(){
			$(".diabloTable").dblclick(function(){return false;});
			$(".diabloTable>tbody>tr>td").removeClass("diabloTable_tdSelected");
		}
	);
	
	$(".diabloTable td:contains('--')").addClass("diabloTable_emptyTdStyle");
};

