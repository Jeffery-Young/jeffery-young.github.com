function ChooseClasses(){
	$(".classes>input:radio").change(function(){
		var chooseClass = $(this).val();						//ѡ�еİ�ť bar/dh/monk/wd/wizard/all
		var arrChoose = new Array($("#maxItemAttributes>thead>tr>."+chooseClass).size());	//����һ���������Դ��ѡ��ְҵ���ڵ��кţ����鳤�ȼ�Ϊ��ѡְҵӵ�е�������
		var chooseClassIndex = $("#maxItemAttributes>thead>tr>."+chooseClass).each(function(i){
			arrChoose[i] = $(this).index();												//����������δ��������У�����Ŵ�0��ʼ
		});
		var arrLimited = new Array($("#maxItemAttributes>thead>tr>.limited").size());		//����һ���������Դ������ְҵ����װ���кţ����鳤�ȼ�Ϊ������
		var limitedClassIndex = $("#maxItemAttributes>thead>tr>.limited").each(function(i){
			arrLimited[i] = $(this).index();												//����������δ��������У�����Ŵ�0��ʼ
		});
		
		if(chooseClass == "all"){
			//�����һ��ͷ
			$("#maxItemAttributes .head").attr("colspan","4");
			$("#maxItemAttributes .torso").attr("colspan","2");	
			$("#maxItemAttributes .waist").attr("colspan","2");	
			$("#maxItemAttributes .off-hand").attr("colspan","4");
			//����ڶ���ͷ
			$("#maxItemAttributes").find(".limited").show();
			for(i=0; i<=arrLimited.length; i++){
				$("#maxItemAttributes>tbody>tr").each(function(){
					$(this).find("td").eq(arrLimited[i]).show();
				});
			};
		} else {
			//�����һ��ͷ
			$("#maxItemAttributes").find(".head, .torso, .waist, .off-hand").attr("colspan","1");	//����ӱ�ͷ����colspan��Ϊ1	
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
			};																//����ѡ��ְҵ���ñ�ͷcolspanֵ
			//����ڶ���ͷ
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
			var tdIndex = $(this).index() - 1;		//��ȡ��ǰtd���ڵ���������0��ʼ
			$(".diabloTable>tbody>tr").each(function(){
				$(this).find("td").eq(tdIndex).addClass("diabloTable_tdYHover");
			});
			$(this).parent("tr").addClass("diabloTable_trHover");	//������ʽ�仯
		},	//����ʱ����
		function(){
			var tdIndex = $(this).index() - 1;		//��ȡ��ǰtd���ڵ���������0��ʼ
			$(".diabloTable>tbody>tr").each(function(){
				$(this).find("td").eq(tdIndex).removeClass("diabloTable_tdYHover");
			});
			$(this).parent("tr").removeClass("diabloTable_trHover");
		}	//�Ƴ�ʱ����
	);
	
	$(".diabloTable>tbody>tr>td").toggle(
		function(){
			$(this).addClass("diabloTable_tdSelected");
		},
		function(){
			$(this).removeClass("diabloTable_tdSelected");
		}
	);		//��� �ٴε������ɫ�仯
	
	$(".indexMain").dblclick(
		function(){
			$(".diabloTable").dblclick(function(){return false;});
			$(".diabloTable>tbody>tr>td").removeClass("diabloTable_tdSelected");
		}
	);
	
	$(".diabloTable td:contains('--')").addClass("diabloTable_emptyTdStyle");
};

