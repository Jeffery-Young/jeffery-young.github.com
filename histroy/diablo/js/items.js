	var gChooseClasses;			//定义选择的人物职业代码(bar,dh,monk,wd,wzd)
	var gChooseItemsPlace;		//定义选择的装备部位(head,shoulders,torso,wrists,hands,waist,legs,feet,leftRing,rightRing,amulets,weapons,offHand)
	
	var gClassesObj = {			//定义人物职业对象，用于依次存放bar dh monk wd wzd人物属性
		"bar": new D3Hero_bar(),	//初始化bar对象
		"dh": new D3Hero_dh(),		//初始化dh对象
		"monk": new D3Hero_monk(),	//初始化monk对象
		"wd": new D3Hero_wd(),		//初始化wd对象
		"wzd": new D3Hero_wzd()		//初始化wzd对象
	};
	
	var gItemsObj = {					//定义人物装备二维数组，依次存放5职业13部位装备属性。itemsArr[i][j] i(bar,dh,monk,wd,wzd)为职业 j[0-12]为装备部位
		"bar": new Array(13),
		"dh": new Array(13),
		"monk": new Array(13),
		"wd": new Array(13),
		"wzd": new Array(13)
	};
	for(var prop in gItemsObj){					//职业顺序 bar dh monk wd wzd
		for(i=0; i<=12; i++){						//部位顺序 head shoulders torso wrists hands waist legs feet leftRing rightRing amulets weapons offHand
			if(i == 11){
				gItemsObj[prop][i] = new D3Items_Weapons();	//对weapons部位进行初始化对象
			} else {
				gItemsObj[prop][i] = new D3Items();			//对其它部位初始化对象
			};
		};
	};
	prop = i = null;

	
/***********************************************************************************
** 函数名：fInit()
** Input argv：
** Output argv：
** Return：
** 函数说明：初始化
***********************************************************************************/
function fInit(){
	$("#items #right #form").hide();			//隐藏物品表单区域
	$("#items #left .itemsPlace").hide();		//隐藏物品装备选择区域
	
	fCheckBattleTagCookie("BattleTag");			//检查BattleTag cookie信息是否存在
	
	$("#chooseClasses").change(function(){		//选择人物职业之后执行
		gChooseClasses = $(this).val();			//选择的人物代码，0-bar 1-dh 2-monk 3-wd 4-wzd
		$("#items #right #form").hide();			//隐藏物品表单区域
		$("#items #right #intro").show();			//显示使用说明区域
		if(gChooseClasses == ""){
			$("#items #left .itemsPlace").hide();		//隐藏物品装备选择区域
			$(".level").attr('disabled','disabled');	//等级表单禁用
		} else {
			$("#items #left .itemsPlace").show();	//显示物品装备区域
			$(".level").removeAttr('disabled');		//等级表单变为可用
			fInitStyle(gChooseClasses);				//调用初始化页面样式函数，对页面图等内容进行更改
		};
	});
	
	$(".level").change(function(){				//等级变化之后执行
		var levelValue = $(this).val();			//获取当前等级值
		if(levelValue <= 0 || levelValue > 60){		//判断等级数值是否在1-60之间	！！！！！！还需要判断非法字符！！！！！！！！未实现！！！！！！！！！
			alert("请输入正确的等级（1-60）");
			$(this).val("60");
		} else {
			gClassesObj[gChooseClasses].level = levelValue;	//根据选中的职业，给对应的人物模型对象赋值
		};
	});
	
	$(".itemsPlace").bind("click", function(){		//点击装备区域之后执行
		gChooseItemsPlace = $(this).attr("id");
		$(".itemsTitle #title b").html(fItemsPlaceNameTransfer(gChooseItemsPlace,"ZH"));		//根据点击不同的装备区域，设置物品表头不同的值
		$("#items #right #intro").hide();					//隐藏使用说明区域
		$("#items #right #form").show();					//显示物品表单区域
		if(gChooseItemsPlace == "weapons"){					//若选中的是武器栏
			$(".itemsForm #weaponsForm").css("display","block");	//显示武器选项
		} else {
			$(".itemsForm #weaponsForm").css("display","none");		//隐藏武器选项
		};
		fGetItemsValue(gChooseClasses, gChooseItemsPlace);	//获取装备数值并显示
	});
	
	$(".itemsPlace").bind({				//为装备区域绑定鼠标事件
		click:function(){				//点击
			gChooseItemsPlace = $(this).attr("id");
			$(".itemsTitle #title b").html(fItemsPlaceNameTransfer(gChooseItemsPlace,"ZH"));		//根据点击不同的装备区域，设置物品表头不同的值
			$("#items #right #intro").hide();					//隐藏使用说明区域
			$("#items #right #form").show();					//显示物品表单区域
			fGetItemsValue(gChooseClasses, gChooseItemsPlace);	//获取装备数值并显示
		},
		mouseover:function(){			//移入
			var mouseoverItemsPlace = $(this).attr("id");
			var itemObj = gItemsObj[gChooseClasses][fItemsPlaceNameTransfer(mouseoverItemsPlace,"NUM")];	//获取该部位装备对象
			var xP = $(this).offset().left + $(this).width() + 2 + "px";	//计算弹出div的漂移位置
			var yP = $(this).offset().top + "px";							//计算弹出div的漂移位置
			fPopupItemInfo(itemObj,mouseoverItemsPlace,xP,yP);				//调用弹出装备信息函数	
		},
		mouseout:function(){			//移出
			$("body .popupItemAttributesBox").remove();						//删除弹出的div
		}
	});
	
	
	
	$(".formBtn #submit").bind("click", function(){		//点击确认之后执行
		gSetItemsValue(gChooseClasses, gChooseItemsPlace);	//存储表单数据
		gCountHeroAttributes(gChooseClasses);				//计算人物属性值并显示
	});
	
	$(".formBtn #reset").bind("click", function(){		//点击重置之后执行
		fGetItemsValue(gChooseClasses, gChooseItemsPlace);	//重置表单数据
	});
	
	$("#saveData").click(function(){			//点击保存数据之后执行
		cookieName = fGetCookie("BattleTag");
		fSetCookie(cookieName, fSerializeItemsData(), 365);		//将序列化之后的装备对象数据保存在cookie中
		alert("数据已经存储在cookies中");
	});
}


/***********************************************************************************
** 函数名：fInitStyle()
** Input argv：classes		//选择的职业
** Output argv：
** Return：
** 函数说明：初始化页面样式
***********************************************************************************/
function fInitStyle(classes){
	switch(classes){
		case "bar":
			$("#itemsSimulator").removeClass().addClass("BGPic_Bar");
			$("#itemsArea").removeClass().addClass("box itemsArea itemsAreaBG_Bar");
			break;
		case "dh":
			$("#itemsSimulator").removeClass().addClass("BGPic_DH");
			$("#itemsArea").removeClass().addClass("box itemsArea itemsAreaBG_DH");
			break;
		case "monk":
			$("#itemsSimulator").removeClass().addClass("BGPic_Monk");
			$("#itemsArea").removeClass().addClass("box itemsArea itemsAreaBG_Monk");
			break;
		case "wd":
			$("#itemsSimulator").removeClass().addClass("BGPic_WD");
			$("#itemsArea").removeClass().addClass("box itemsArea itemsAreaBG_WD");
			break;
		case "wzd":
			$("#itemsSimulator").removeClass().addClass("BGPic_Wizard");
			$("#itemsArea").removeClass().addClass("box itemsArea itemsAreaBG_Wizard");
			break;
	};
}


/***********************************************************************************
** 函数名：fPopupItemInfo()
** Input argv：itemObj,itemsPlace,xP,yP		//需要弹出的装备对象，弹出的装备部位，弹出x位置，弹出y位置
** Output argv：
** Return：
** 函数说明：弹出div显示装备详细信息
***********************************************************************************/
function fPopupItemInfo(itemObj,itemsPlace,xP,yP){
	var htmlStr = '<div class="popupItemAttributesBox"><h3>' + fItemsPlaceNameTransfer(itemsPlace,"ZH") + '</h3>';
	for(var pi in itemObj){
		if(itemObj[pi] != 0){
			htmlStr = htmlStr + '<p>' + pi + ':' + itemObj[pi] + '</p>';
			var bShow = true;											//当有装备有详细信息时，将bShow置为true
		};
	};
	if(bShow){								//bShow为true时弹出信息
		$("body").append(htmlStr);										//在页面上显示div
		$("body .popupItemAttributesBox").css({top:yP, left:xP});		//设置弹出div的位置
	};
}


/***********************************************************************************
** 函数名：fGetItemsValue()
** Input argv：
** Output argv：
** Return：
** 函数说明：获取装备当前值并在表单中显示
***********************************************************************************/
function fGetItemsValue(classes, itemsPlace){
	var itemsPlaceNum = fItemsPlaceNameTransfer(itemsPlace,"NUM");		//取得该部位装备对应的序号

		
	var strength = gItemsObj[classes][itemsPlaceNum].strength;						//力量
	var dexterity = gItemsObj[classes][itemsPlaceNum].dexterity;					//敏捷
	var intelligence = gItemsObj[classes][itemsPlaceNum].intelligence;				//智力
	var vitality = gItemsObj[classes][itemsPlaceNum].vitality;						//体能
	
	var minDamage = gItemsObj[classes][itemsPlaceNum].minDamage;						//最小伤害
	var maxDamage = gItemsObj[classes][itemsPlaceNum].maxDamage;						//最大伤害
	var criticalHitChance = gItemsObj[classes][itemsPlaceNum].criticalHitChance;		//暴击概率
	var criticalHitDamage = gItemsObj[classes][itemsPlaceNum].criticalHitDamage;		//暴击伤害
	var attackSpeed = gItemsObj[classes][itemsPlaceNum].attackSpeed;					//攻击速度
	
	var armor = gItemsObj[classes][itemsPlaceNum].armor;									//总护甲
	var allResistance = gItemsObj[classes][itemsPlaceNum].allResistance;					//全抗性
	var physicalResistance = gItemsObj[classes][itemsPlaceNum].physicalResistance;			//物理抗性
	var coldResistance = gItemsObj[classes][itemsPlaceNum].coldResistance;					//冰寒抗性
	var fireResistance = gItemsObj[classes][itemsPlaceNum].fireResistance;					//火焰抗性
	var lightningResistance = gItemsObj[classes][itemsPlaceNum].lightningResistance;		//电击抗性
	var poisonResistance = gItemsObj[classes][itemsPlaceNum].poisonResistance;				//毒素抗性
	var arcaneResistance = gItemsObj[classes][itemsPlaceNum].arcaneResistance;				//秘法/神圣抗性
	var blockChance = gItemsObj[classes][itemsPlaceNum].blockChance;						//格挡概率
	var blockAmountMin = gItemsObj[classes][itemsPlaceNum].blockAmountMin;					//格挡值下限
	var blockAmountMax = gItemsObj[classes][itemsPlaceNum].blockAmountMax;					//格挡值上限
	var crowdControlReduction = gItemsObj[classes][itemsPlaceNum].crowdControlReduction;	//控场减免
	var missileDamageReducion = gItemsObj[classes][itemsPlaceNum].missileDamageReducion;	//远程伤害减免
	var meleeDamageReduction = gItemsObj[classes][itemsPlaceNum].meleeDamageReduction;		//近战伤害减免
	var thorns = gItemsObj[classes][itemsPlaceNum].thorns;									//荆棘伤害
	
	var lifeBonus = gItemsObj[classes][itemsPlaceNum].lifeBonus;								//生命值加成
	var lifePerSecond = gItemsObj[classes][itemsPlaceNum].lifePerSecond;						//每秒生命恢复
	var lifeSteal = gItemsObj[classes][itemsPlaceNum].lifeSteal;								//生命窃取
	var lifePerKill = gItemsObj[classes][itemsPlaceNum].lifePerKill;							//击杀生命恢复
	var lifePerHit = gItemsObj[classes][itemsPlaceNum].lifePerHit;								//击中生命恢复
	var healthGlobeHealingBonus = gItemsObj[classes][itemsPlaceNum].healthGlobeHealingBonus;	//生命之球效果加成
	var bonusToGlobeRadius = gItemsObj[classes][itemsPlaceNum].bonusToGlobeRadius;				//拾取距离加成
	
	var movementSpeed = gItemsObj[classes][itemsPlaceNum].movementSpeed;					//移动速度
	var goldFind = gItemsObj[classes][itemsPlaceNum].goldFind;								//金币寻获量
	var magicFind = gItemsObj[classes][itemsPlaceNum].magicFind;							//魔宝寻获量
	var bonusExperience = gItemsObj[classes][itemsPlaceNum].bonusExperience;				//经验加成
	var bonusExperiencePerKill = gItemsObj[classes][itemsPlaceNum].bonusExperiencePerKill;	//击杀经验加成
	
	var itemsValueArr = new Array(strength,dexterity,intelligence,vitality,
									minDamage,maxDamage,criticalHitChance,criticalHitDamage,attackSpeed,
									armor,allResistance,physicalResistance,coldResistance,fireResistance,lightningResistance,poisonResistance,arcaneResistance,blockChance,blockAmountMin,blockAmountMax,crowdControlReduction,missileDamageReducion,meleeDamageReduction,thorns,
									lifeBonus,lifePerSecond,lifeSteal,lifePerKill,lifePerHit,healthGlobeHealingBonus,bonusToGlobeRadius,
									movementSpeed,goldFind,magicFind,bonusExperience,bonusExperiencePerKill);		//将以上获取的值存在数组中以便操作
	$(".itemsForm").find("input").each(function(i){
		$(this).val(itemsValueArr[i]);
	});
}

/***********************************************************************************
** 函数名：gSetItemsValue()
** Input argv：
** Output argv：
** Return：
** 函数说明：将表单内装备属性数据存储进装备对象中
***********************************************************************************/
function gSetItemsValue(classes, itemsPlace){
	var itemsPlaceNum = fItemsPlaceNameTransfer(itemsPlace,"NUM");	//取得该部位装备对应的序号
	var itemsValueArr = new Array;						//定义装备属性值数组，用于临时存放表单中的数据
	$(".itemsForm").find("input").each(function(i){
		itemsValueArr[i] = $(this).val();				//将表单值依次存入数组中
	});	
	
	gItemsObj[classes][itemsPlaceNum].strength = itemsValueArr[0];			//力量
	gItemsObj[classes][itemsPlaceNum].dexterity = itemsValueArr[1];			//敏捷
	gItemsObj[classes][itemsPlaceNum].intelligence = itemsValueArr[2];		//智力
	gItemsObj[classes][itemsPlaceNum].vitality = itemsValueArr[3];			//体力
	
	gItemsObj[classes][itemsPlaceNum].minDamage = itemsValueArr[4];				//最小伤害
	gItemsObj[classes][itemsPlaceNum].maxDamage = itemsValueArr[5];				//最大伤害
	gItemsObj[classes][itemsPlaceNum].criticalHitChance = itemsValueArr[6];		//暴击概率
	gItemsObj[classes][itemsPlaceNum].criticalHitDamage = itemsValueArr[7];		//暴击伤害
	gItemsObj[classes][itemsPlaceNum].attackSpeed = itemsValueArr[8];			//攻击速度
	
	gItemsObj[classes][itemsPlaceNum].armor = itemsValueArr[9];								//总护甲
	gItemsObj[classes][itemsPlaceNum].allResistance = itemsValueArr[10];					//全抗性
	gItemsObj[classes][itemsPlaceNum].physicalResistance = itemsValueArr[11];				//物理抗性
	gItemsObj[classes][itemsPlaceNum].coldResistance = itemsValueArr[12];					//冰寒抗性
	gItemsObj[classes][itemsPlaceNum].fireResistance = itemsValueArr[13];					//火焰抗性
	gItemsObj[classes][itemsPlaceNum].lightningResistance = itemsValueArr[14];				//电击抗性
	gItemsObj[classes][itemsPlaceNum].poisonResistance = itemsValueArr[15];					//毒素抗性
	gItemsObj[classes][itemsPlaceNum].arcaneResistance = itemsValueArr[16];					//秘法/神圣抗性
	gItemsObj[classes][itemsPlaceNum].blockChance = itemsValueArr[17];						//格挡概率
	gItemsObj[classes][itemsPlaceNum].blockAmountMin = itemsValueArr[18];					//格挡值下限
	gItemsObj[classes][itemsPlaceNum].blockAmountMax = itemsValueArr[19];					//格挡值上限
	gItemsObj[classes][itemsPlaceNum].crowdControlReduction = itemsValueArr[20];			//控场减免
	gItemsObj[classes][itemsPlaceNum].missileDamageReducion = itemsValueArr[21];			//远程伤害减免
	gItemsObj[classes][itemsPlaceNum].meleeDamageReduction = itemsValueArr[22];				//近战伤害减免
	gItemsObj[classes][itemsPlaceNum].thorns = itemsValueArr[23];							//荆棘伤害
	
	gItemsObj[classes][itemsPlaceNum].lifeBonus = itemsValueArr[24];				//生命值加成
	gItemsObj[classes][itemsPlaceNum].lifePerSecond = itemsValueArr[25];			//每秒生命恢复
	gItemsObj[classes][itemsPlaceNum].lifeSteal = itemsValueArr[26];				//生命窃取
	gItemsObj[classes][itemsPlaceNum].lifePerKill = itemsValueArr[27];				//击杀生命恢复
	gItemsObj[classes][itemsPlaceNum].lifePerHit = itemsValueArr[28];				//击中生命恢复
	gItemsObj[classes][itemsPlaceNum].healthGlobeHealingBonus = itemsValueArr[29];	//生命之球效果加成
	gItemsObj[classes][itemsPlaceNum].bonusToGlobeRadius = itemsValueArr[30];		//拾取距离加成
	
	gItemsObj[classes][itemsPlaceNum].movementSpeed = itemsValueArr[31];			//移动速度
	gItemsObj[classes][itemsPlaceNum].goldFind = itemsValueArr[32];					//金币寻获量
	gItemsObj[classes][itemsPlaceNum].magicFind = itemsValueArr[33];				//魔宝寻获量
	gItemsObj[classes][itemsPlaceNum].bonusExperience = itemsValueArr[34];			//经验加成
	gItemsObj[classes][itemsPlaceNum].bonusExperiencePerKill = itemsValueArr[35];	//击杀经验加成
}


/***********************************************************************************
** 函数名：gCountHeroAttributes()
** Input argv：classes				//人物职业
** Output argv：
** Return：
** 函数说明：计算人物属性并存储
***********************************************************************************/
function gCountHeroAttributes(classes){
	gClassesObj[classes].countLevelAttributes();	//计算等级对人物基础属性的影响（初始化力敏智体值）
	var allResistance = 0;							//定义并初始化全抗性
	for(i=0; i<gItemsObj[classes].length; i++){
		gClassesObj[classes].strength = gClassesObj[classes].strength + Number(gItemsObj[classes][i].strength);				//计算力量
		gClassesObj[classes].dexterity = gClassesObj[classes].dexterity + Number(gItemsObj[classes][i].dexterity);				//计算敏捷
		gClassesObj[classes].intelligence = gClassesObj[classes].intelligence + Number(gItemsObj[classes][i].intelligence);	//计算智力
		gClassesObj[classes].vitality = gClassesObj[classes].vitality + Number(gItemsObj[classes][i].vitality);				//计算体能
		
		gClassesObj[classes].criticalHitChance = gClassesObj[classes].criticalHitChance + Number(gItemsObj[classes][i].criticalHitChance);	//计算暴击概率
		gClassesObj[classes].criticalHitDamage = gClassesObj[classes].criticalHitDamage + Number(gItemsObj[classes][i].criticalHitDamage);	//计算暴击伤害
		
		gClassesObj[classes].blockAmount[0] = gClassesObj[classes].blockAmount[0] + Number(gItemsObj[classes][i].blockAmountMin);						//计算格挡值下限
		gClassesObj[classes].blockAmount[1] = gClassesObj[classes].blockAmount[1] + Number(gItemsObj[classes][i].blockAmountMax);						//计算格挡值上限
		gClassesObj[classes].blockChance = gClassesObj[classes].blockChance + Number(gItemsObj[classes][i].blockChance);								//计算格挡概率
		allResistance = allResistance + Number(gItemsObj[classes][i].allResistance);																	//计算全抗性
		gClassesObj[classes].crowdControlReduction = gClassesObj[classes].crowdControlReduction + Number(gItemsObj[classes][i].crowdControlReduction);	//计算控场减免
		gClassesObj[classes].missileDamageReducion = gClassesObj[classes].missileDamageReducion + Number(gItemsObj[classes][i].missileDamageReducion);	//计算远程伤害减免
		gClassesObj[classes].meleeDamageReduction = gClassesObj[classes].meleeDamageReduction + Number(gItemsObj[classes][i].meleeDamageReduction);	//计算近战伤害减免
		gClassesObj[classes].thorns = gClassesObj[classes].thorns + Number(gItemsObj[classes][i].thorns);												//计算荆棘伤害
		
		gClassesObj[classes].totalLifeBonus = gClassesObj[classes].totalLifeBonus + Number(gItemsObj[classes][i].lifeBonus);									//计算总生命值加成
		gClassesObj[classes].lifePerSecond = gClassesObj[classes].lifePerSecond + Number(gItemsObj[classes][i].lifePerSecond);									//计算每秒生命恢复
		gClassesObj[classes].lifeSteal = gClassesObj[classes].lifeSteal + Number(gItemsObj[classes][i].lifeSteal);												//计算生命窃取
		gClassesObj[classes].lifePerKill = gClassesObj[classes].lifePerKill + Number(gItemsObj[classes][i].lifePerKill);										//计算击杀生命恢复
		gClassesObj[classes].lifePerHit = gClassesObj[classes].lifePerHit + Number(gItemsObj[classes][i].lifePerHit);											//计算击中生命恢复
		gClassesObj[classes].healthGlobeHealingBonus = gClassesObj[classes].healthGlobeHealingBonus + Number(gItemsObj[classes][i].healthGlobeHealingBonus);	//计算生命之球效果加成
		gClassesObj[classes].bonusToGlobeRadius = gClassesObj[classes].bonusToGlobeRadius + Number(gItemsObj[classes][i].bonusToGlobeRadius);					//计算拾取距离加成
		
		gClassesObj[classes].movementSpeed = gClassesObj[classes].movementSpeed + Number(gItemsObj[classes][i].movementSpeed);								//移动速度
		gClassesObj[classes].goldFind = gClassesObj[classes].goldFind + Number(gItemsObj[classes][i].goldFind);											//金币寻获量
		gClassesObj[classes].magicFind = gClassesObj[classes].magicFind + Number(gItemsObj[classes][i].magicFind);											//魔宝寻获量
		gClassesObj[classes].bonusExperience = gClassesObj[classes].bonusExperience + Number(gItemsObj[classes][i].bonusExperience);						//经验加成
		gClassesObj[classes].bonusExperiencePerKill = gClassesObj[classes].bonusExperiencePerKill + Number(gItemsObj[classes][i].bonusExperiencePerKill);	//击杀经验加成
	};
	
	gClassesObj[classes].armor = gClassesObj[classes].strength;		//设置基础护甲值=力量
	allResistance = allResistance + Math.round(gClassesObj[classes].intelligence * 0.1);	//修正全抗性=全抗性+智力/10 四舍五入
	gClassesObj[classes].physicalResistance = allResistance;		//基础物理抗性=全抗性
	gClassesObj[classes].coldResistance = allResistance;			//基础冰寒抗性=全抗性
	gClassesObj[classes].fireResistance = allResistance;			//基础火焰抗性=全抗性
	gClassesObj[classes].lightningResistance = allResistance;		//基础电击抗性=全抗性
	gClassesObj[classes].poisonResistance = allResistance;			//基础毒素抗性=全抗性
	gClassesObj[classes].arcaneResistance = allResistance;			//基础秘法/神圣抗性=全抗性
	for(i=0; i<gItemsObj[classes].length; i++){
		gClassesObj[classes].armor = gClassesObj[classes].armor + Number(gItemsObj[classes][i].armor);												//计算护甲
		gClassesObj[classes].physicalResistance = gClassesObj[classes].physicalResistance + Number(gItemsObj[classes][i].physicalResistance);		//计算物理抗性
		gClassesObj[classes].coldResistance = gClassesObj[classes].coldResistance + Number(gItemsObj[classes][i].coldResistance);					//计算冰寒抗性
		gClassesObj[classes].fireResistance = gClassesObj[classes].fireResistance + Number(gItemsObj[classes][i].fireResistance);					//计算火焰抗性
		gClassesObj[classes].lightningResistance = gClassesObj[classes].lightningResistance + Number(gItemsObj[classes][i].lightningResistance);	//计算电击抗性
		gClassesObj[classes].poisonResistance = gClassesObj[classes].poisonResistance + Number(gItemsObj[classes][i].poisonResistance);			//计算毒素抗性
		gClassesObj[classes].arcaneResistance = gClassesObj[classes].arcaneResistance + Number(gItemsObj[classes][i].arcaneResistance);			//计算秘法/神圣抗性
	};
	
	gClassesObj[classes].setMainAttribute();				//设置主属性
	gClassesObj[classes].countMainAttributesDamage();		//计算主属性伤害加成
	gClassesObj[classes].countMaximumLife();				//计算生命值上限
	
	
	fShowHeroAttributes(classes);			//调用函数，在页面中显示人物属性
}


/***********************************************************************************
** 函数名：fShowHeroAttributes()
** Input argv：classes				//选择的人物职业
** Output argv：
** Return：
** 函数说明：在页面中显示人物属性
***********************************************************************************/
function fShowHeroAttributes(classes){
	$("#heroAttributes #strength").html(gClassesObj[classes].strength);				//力量
	$("#heroAttributes #dexterity").html(gClassesObj[classes].dexterity);			//敏捷
	$("#heroAttributes #intelligence").html(gClassesObj[classes].intelligence);		//智力
	$("#heroAttributes #vitality").html(gClassesObj[classes].vitality);				//体能
	$("#heroAttributes #armor").html(gClassesObj[classes].armor);					//护甲
	$("#heroAttributes #DPS").html("缺少公式");										//DPS-2位小数
	
	$("#heroAttributes #mainAttributesDamage").html(gClassesObj[classes].mainAttributesDamage.toFixed(2));		//主属性伤害加成-2位小数
	$("#heroAttributes #skillsAttributesDamage").html(gClassesObj[classes].skillsAttributesDamage.toFixed(2));	//技能伤害加成-2位小数
	$("#heroAttributes #attacksPerSecond").html("缺少公式");													//每秒攻击次数-2位小数
	$("#heroAttributes #criticalHitChance").html(gClassesObj[classes].criticalHitChance.toFixed(2));			//暴击概率-2位小数
	$("#heroAttributes #criticalHitDamage").html(gClassesObj[classes].criticalHitDamage.toFixed(2));			//暴击伤害-2位小数
	
	$("#heroAttributes #blockAmount").html(gClassesObj[classes].blockAmount[0] + "-" + gClassesObj[classes].blockAmount[1]);	//格挡值
	$("#heroAttributes #blockChance").html(gClassesObj[classes].blockChance.toFixed(1));						//格挡概率-1位小数
	$("#heroAttributes #dodgeChance").html("缺少公式");															//闪躲概率-1位小数
	$("#heroAttributes #damageReduction").html("缺少公式");														//伤害减免-2位小数
	$("#heroAttributes #physicalResistance").html(gClassesObj[classes].physicalResistance);						//物理抗性
	$("#heroAttributes #coldResistance").html(gClassesObj[classes].coldResistance);								//冰寒抗性
	$("#heroAttributes #fireResistance").html(gClassesObj[classes].fireResistance);								//火焰抗性
	$("#heroAttributes #lightningResistance").html(gClassesObj[classes].lightningResistance);					//电击抗性
	$("#heroAttributes #poisonResistance").html(gClassesObj[classes].poisonResistance);							//毒素抗性
	$("#heroAttributes #arcaneResistance").html(gClassesObj[classes].arcaneResistance);							//秘法/神圣抗性
	$("#heroAttributes #crowdControlReduction").html(gClassesObj[classes].crowdControlReduction.toFixed(2));	//控场减免-2位小数
	$("#heroAttributes #missileDamageReducion").html(gClassesObj[classes].missileDamageReducion.toFixed(2));	//远程伤害减免-2位小数
	$("#heroAttributes #meleeDamageReduction").html(gClassesObj[classes].meleeDamageReduction.toFixed(2));		//近战伤害减免-2位小数
	$("#heroAttributes #thorns").html(gClassesObj[classes].thorns.toFixed(2));									//荆棘伤害-2位小数
	
	$("#heroAttributes #maximumLife").html(gClassesObj[classes].maximumLife);										//生命值上限
	$("#heroAttributes #totalLifeBonus").html(gClassesObj[classes].totalLifeBonus);									//总生命值加成
	$("#heroAttributes #lifePerSecond").html(gClassesObj[classes].lifePerSecond.toFixed(2));						//每秒生命恢复-2位小数
	$("#heroAttributes #lifeSteal").html(gClassesObj[classes].lifeSteal.toFixed(2));								//生命窃取-2位小数
	$("#heroAttributes #lifePerKill").html(gClassesObj[classes].lifePerKill.toFixed(2));							//击杀生命恢复-2位小数
	$("#heroAttributes #lifePerHit").html(gClassesObj[classes].lifePerHit.toFixed(2));								//击中生命恢复-2位小数
	$("#heroAttributes #healthGlobeHealingBonus").html(gClassesObj[classes].healthGlobeHealingBonus.toFixed(2));	//生命之球效果加成-2位小数
	$("#heroAttributes #bonusToGlobeRadius").html(gClassesObj[classes].bonusToGlobeRadius.toFixed(2));				//拾取距离加成-2位小数
	
	$("#heroAttributes #movementSpeed").html(gClassesObj[classes].movementSpeed);								//移动速度
	$("#heroAttributes #goldFind").html(gClassesObj[classes].goldFind);											//金币寻获量
	$("#heroAttributes #magicFind").html(gClassesObj[classes].magicFind);										//魔宝寻获量
	$("#heroAttributes #bonusExperience").html(gClassesObj[classes].bonusExperience.toFixed(1));				//经验加成-1位小数
	$("#heroAttributes #bonusExperiencePerKill").html(gClassesObj[classes].bonusExperiencePerKill.toFixed(2));	//击杀经验加成-2位小数
}


/***********************************************************************************
** 函数名：fItemsPlaceEnTransfer()
** Input argv：itemsPlaceEn, targetFormat	//要转换的英文名，目标格式ZH/NUM
** Output argv：
** Return：result							//转换之后的中文名称or序号
** 函数说明：将装备部位由英文转换为序号或正文
***********************************************************************************/
function fItemsPlaceNameTransfer(itemsPlaceEn, targetFormat){
	var arrEn = ["head","shoulders","torso","wrists","hands","waist","legs","feet","leftRing","rightRing","amulets","weapons","offHand"];
	var arrZh = ["头部","护肩","身躯","手腕","手掌","腰部","腿部","脚部","左手戒指","右手戒指","护身符","武器","副手"];
	var result = jQuery.inArray(itemsPlaceEn, arrEn);
	switch(targetFormat){
		case "NUM":
			return result;
		case "ZH":
			return arrZh[result];
	};
	return false;
}


/***********************************************************************************
** 函数名：fSerializeItemsData()
** Input argv：
** Output argv：
** Return：jsonTxt	//序列化之后的字符串数据
** 函数说明：序列化存储人物属性及装备数据，按照json格式序列化
***********************************************************************************/
function fSerializeItemsData(){
	//json数据样例：{"bar":[{"strength":1,"dexterity":1},{},{}],"dh":[{},{},{}],"monk":[{},{},{}],"wd":[{},{},{}],"wzd":[{},{},{}]]
	var jsonTxt = '{';
	for(var pi in gItemsObj){
		var cObjTxt = '"' + pi + '":[';
		for(j=0; j<=12; j++){
			cObjTxt = cObjTxt + '{';
			for(var pk in gItemsObj[pi][j]){
				if(gItemsObj[pi][j][pk] != 0)					//判断对象属性值是否为0
					cObjTxt = cObjTxt + '"' + pk + '":' + gItemsObj[pi][j][pk] + ',';	//不为0则输出否则不输出
			};
			if(cObjTxt.charAt(cObjTxt.length - 1) == ','){		//判断字符串末尾是否为','号
				cObjTxt = cObjTxt.slice(0,-1);					//若为','号则删除
			};
			cObjTxt = cObjTxt + '},';
		};
		cObjTxt = cObjTxt.slice(0,-1) + '],';
		if((cObjTxt.length - pi.length - 4) == 40){
			cObjTxt = "";
		};
		jsonTxt = jsonTxt + cObjTxt;
	};
	if(jsonTxt.charAt(jsonTxt.length - 1) == ','){
		jsonTxt = jsonTxt.slice(0,-1);
	};
	jsonTxt = jsonTxt + '}';
	
	return jsonTxt;
}



/***********************************************************************************
** 函数名：fUnserializeItemsData()
** Input argv：jsonTxt		//json格式的装备对象字符串数据
** Output argv：
** Return：
** 函数说明：将序列化的装备对象字符串数据恢复为装备对象
***********************************************************************************/
function fUnserializeItemsData(jsonTxt){
	//testjson = '{"bar":[{"vitality":1},{},{},{},{},{},{},{},{},{},{},{},{}],"dh":[{},{},{},{},{},{},{},{},{},{},{},{},{}],"monk":[{},{},{},{},{},{},{},{},{},{},{},{},{}],"wd":[{},{},{},{},{},{},{},{},{},{},{},{},{}],"wzd":[{},{},{},{},{},{},{},{},{},{},{},{},{}]}';
	//testjson = '{"bar":[{"vitality":1},{},{},{},{},{},{},{},{},{},{},{},{}]}';
	try{
		var obj = eval("(" + jsonTxt + ")");
	} catch(err) {
		alert("数据不合法");
		return false;
	};
	for(var pi in gItemsObj){				//通过json为gItemsObj对象赋值
		if(obj[pi]){							//若obj中存在"pi"对象名
			for(j=0; j<=12; j++){
				for(var pk in gItemsObj[pi][j]){
					if(obj[pi][j][pk])								//若obj中存在"pk"对象名
						gItemsObj[pi][j][pk] = obj[pi][j][pk];		//赋值
				};
			};
		};
	};
}



/***********************************************************************************
** 函数名：fSetCookie()
** Input argv：c_name,value,expiredays		//cookie名称,cookie内容,cookie过期时间（天）
** Output argv：
** Return：
** 函数说明：保存cookie内容
***********************************************************************************/
function fSetCookie(c_name,value,expiredays){
	var exdate  = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}


/***********************************************************************************
** 函数名：fGetCookie()
** Input argv：c_name		//cookie名称
** Output argv：
** Return：cookie value		//cookie名对应的cookie内容 或 空
** 函数说明：根据c_name获取cookie中对应的内容
***********************************************************************************/
function fGetCookie(c_name){
	if(document.cookie.length > 0){
		c_start = document.cookie.indexOf(c_name + "=");	//在cookie中查找匹配的cookie名
		if (c_start != -1){									//若查到
			c_start = c_start + c_name.length + 1;			//记录目标cookie值的起始位置
			c_end = document.cookie.indexOf(";",c_start);	//记录目标cookie值的结束位置(根据分隔符;查找)
			if (c_end == -1){								//若找不到;符号，说明这一条cookie是最后一条，则记录结束位置为末尾位置
				c_end = document.cookie.length;
			};
			return unescape(document.cookie.substring(c_start,c_end));		//返回c_name对应的cookie值
		};
	};
	return "";		//若查不到，返回空
}


/***********************************************************************************
** 函数名：fCheckBattleTagCookie()
** Input argv：c_name		//cookie名称
** Output argv：
** Return：
** 函数说明：判断cookie中BattleTag是否存在，若存在则读取该BattleTag对应数据，若不存在，则提示输入BattleTag
***********************************************************************************/
function fCheckBattleTagCookie(c_name){
	var battleTag = fGetCookie(c_name);			//从cookie中取battleTag值
	if(battleTag != null && battleTag != ""){	//若battleTag不为空
		fCheckItemsInfoCookie(battleTag);		//读取battleTag对应的装备信息
		$(".battleTag span").html(battleTag);	//页面battleTag中显示当前的battleTag信息
	} else {									//若battleTag为空，则提示输入BattleTag信息
		battleTag = prompt("请输入您的BattleTag:","");
		if (battleTag != null && battleTag != ""){		//验证battleTag输入是否合法（！！！！！！！！目前只判断了不为空，需要按照BattleTag格式判断（3-12英文 + # + 四位数字）e.g.Jeffery#1965！！！！！）
			fSetCookie("BattleTag", battleTag, 365);	//将输入的battleTag值存入cookie中，cookie名为BATTLETAG
		};
		fCheckItemsInfoCookie(battleTag);		//读取battleTag对应的装备信息
		$(".battleTag span").html(battleTag);	//页面battleTag中显示当前的battleTag信息
	};
}


/***********************************************************************************
** 函数名：fCheckItemsInfoCookie()
** Input argv：c_name		//cookie名称
** Output argv：
** Return：
** 函数说明：判断需要调用的cookie是否存在，若存在，将装备对象数据根据cookie值复原
***********************************************************************************/
function fCheckItemsInfoCookie(c_name){
	var itemsInfo = fGetCookie(c_name);			//根据battleTag参数，获取对应的装备信息数据
	if(itemsInfo != null && itemsInfo != ""){	//若对应cookie值存在
		fUnserializeItemsData(itemsInfo);		//调用函数反序列化装备信息
		//alert("装备信息已还原");
	} else {									//若对应cookie值不存在
		//alert("没有数据请填充");
	};
}