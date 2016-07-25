function fMainTableStyle(){
	$(".mainTable tbody").find("tr:even").addClass("mainTableOddTr")	//奇数行样式
					.end().find("tr:odd").addClass("mainTableEvenTr");	//偶数行样式
}

function fMainTableCheckAll(){
	var aCheckAllBox = $("#mainArea .mainTable :checkbox[name='checkAll']"),	//定义全选复选框框
		aCheckBox = $("#mainArea .mainTable :checkbox[name='check']");			//定义所有复选框
	
	aCheckAllBox.change(function(){
		if($(this).is(":checked")){			//全选框已选中
			aCheckBox.attr("checked", true);	//全选
		} else {								//全选框未选中
			aCheckBox.attr("checked", false);	//全不选
		}
	});
	
	aCheckBox.change(function(){
		if(aCheckBox.not(":checked").is(":checkbox")){	//未全选
			aCheckAllBox.attr("checked", false);		//全选框不选中
		} else {										//已全选
			aCheckAllBox.attr("checked", true);			//全选框选中
		}
	});
}

function fMainTableCheckInput(){
	var aPageInput = $("#mainArea .mainTable #pageInput");	//定义跳转页码输入框
	aPageInput.keyup(function(){	
		$(this).val($(this).val().replace(/^0|\D/g,''));	//正则匹配非数字及开头的0并重置input
	});
}