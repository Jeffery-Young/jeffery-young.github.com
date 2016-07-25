	var gChooseClasses;			//����ѡ�������ְҵ����(bar,dh,monk,wd,wzd)
	var gChooseItemsPlace;		//����ѡ���װ����λ(head,shoulders,torso,wrists,hands,waist,legs,feet,leftRing,rightRing,amulets,weapons,offHand)
	
	var gClassesObj = {			//��������ְҵ�����������δ��bar dh monk wd wzd��������
		"bar": new D3Hero_bar(),	//��ʼ��bar����
		"dh": new D3Hero_dh(),		//��ʼ��dh����
		"monk": new D3Hero_monk(),	//��ʼ��monk����
		"wd": new D3Hero_wd(),		//��ʼ��wd����
		"wzd": new D3Hero_wzd()		//��ʼ��wzd����
	};
	
	var gItemsObj = {					//��������װ����ά���飬���δ��5ְҵ13��λװ�����ԡ�itemsArr[i][j] i(bar,dh,monk,wd,wzd)Ϊְҵ j[0-12]Ϊװ����λ
		"bar": new Array(13),
		"dh": new Array(13),
		"monk": new Array(13),
		"wd": new Array(13),
		"wzd": new Array(13)
	};
	for(var prop in gItemsObj){					//ְҵ˳�� bar dh monk wd wzd
		for(i=0; i<=12; i++){						//��λ˳�� head shoulders torso wrists hands waist legs feet leftRing rightRing amulets weapons offHand
			if(i == 11){
				gItemsObj[prop][i] = new D3Items_Weapons();	//��weapons��λ���г�ʼ������
			} else {
				gItemsObj[prop][i] = new D3Items();			//��������λ��ʼ������
			};
		};
	};
	prop = i = null;

	
/***********************************************************************************
** ��������fInit()
** Input argv��
** Output argv��
** Return��
** ����˵������ʼ��
***********************************************************************************/
function fInit(){
	$("#items #right #form").hide();			//������Ʒ������
	$("#items #left .itemsPlace").hide();		//������Ʒװ��ѡ������
	
	fCheckBattleTagCookie("BattleTag");			//���BattleTag cookie��Ϣ�Ƿ����
	
	$("#chooseClasses").change(function(){		//ѡ������ְҵ֮��ִ��
		gChooseClasses = $(this).val();			//ѡ���������룬0-bar 1-dh 2-monk 3-wd 4-wzd
		$("#items #right #form").hide();			//������Ʒ������
		$("#items #right #intro").show();			//��ʾʹ��˵������
		if(gChooseClasses == ""){
			$("#items #left .itemsPlace").hide();		//������Ʒװ��ѡ������
			$(".level").attr('disabled','disabled');	//�ȼ�������
		} else {
			$("#items #left .itemsPlace").show();	//��ʾ��Ʒװ������
			$(".level").removeAttr('disabled');		//�ȼ�����Ϊ����
			fInitStyle(gChooseClasses);				//���ó�ʼ��ҳ����ʽ��������ҳ��ͼ�����ݽ��и���
		};
	});
	
	$(".level").change(function(){				//�ȼ��仯֮��ִ��
		var levelValue = $(this).val();			//��ȡ��ǰ�ȼ�ֵ
		if(levelValue <= 0 || levelValue > 60){		//�жϵȼ���ֵ�Ƿ���1-60֮��	����������������Ҫ�жϷǷ��ַ�����������������δʵ�֣�����������������
			alert("��������ȷ�ĵȼ���1-60��");
			$(this).val("60");
		} else {
			gClassesObj[gChooseClasses].level = levelValue;	//����ѡ�е�ְҵ������Ӧ������ģ�Ͷ���ֵ
		};
	});
	
	$(".itemsPlace").bind("click", function(){		//���װ������֮��ִ��
		gChooseItemsPlace = $(this).attr("id");
		$(".itemsTitle #title b").html(fItemsPlaceNameTransfer(gChooseItemsPlace,"ZH"));		//���ݵ����ͬ��װ������������Ʒ��ͷ��ͬ��ֵ
		$("#items #right #intro").hide();					//����ʹ��˵������
		$("#items #right #form").show();					//��ʾ��Ʒ������
		if(gChooseItemsPlace == "weapons"){					//��ѡ�е���������
			$(".itemsForm #weaponsForm").css("display","block");	//��ʾ����ѡ��
		} else {
			$(".itemsForm #weaponsForm").css("display","none");		//��������ѡ��
		};
		fGetItemsValue(gChooseClasses, gChooseItemsPlace);	//��ȡװ����ֵ����ʾ
	});
	
	$(".itemsPlace").bind({				//Ϊװ�����������¼�
		click:function(){				//���
			gChooseItemsPlace = $(this).attr("id");
			$(".itemsTitle #title b").html(fItemsPlaceNameTransfer(gChooseItemsPlace,"ZH"));		//���ݵ����ͬ��װ������������Ʒ��ͷ��ͬ��ֵ
			$("#items #right #intro").hide();					//����ʹ��˵������
			$("#items #right #form").show();					//��ʾ��Ʒ������
			fGetItemsValue(gChooseClasses, gChooseItemsPlace);	//��ȡװ����ֵ����ʾ
		},
		mouseover:function(){			//����
			var mouseoverItemsPlace = $(this).attr("id");
			var itemObj = gItemsObj[gChooseClasses][fItemsPlaceNameTransfer(mouseoverItemsPlace,"NUM")];	//��ȡ�ò�λװ������
			var xP = $(this).offset().left + $(this).width() + 2 + "px";	//���㵯��div��Ư��λ��
			var yP = $(this).offset().top + "px";							//���㵯��div��Ư��λ��
			fPopupItemInfo(itemObj,mouseoverItemsPlace,xP,yP);				//���õ���װ����Ϣ����	
		},
		mouseout:function(){			//�Ƴ�
			$("body .popupItemAttributesBox").remove();						//ɾ��������div
		}
	});
	
	
	
	$(".formBtn #submit").bind("click", function(){		//���ȷ��֮��ִ��
		gSetItemsValue(gChooseClasses, gChooseItemsPlace);	//�洢������
		gCountHeroAttributes(gChooseClasses);				//������������ֵ����ʾ
	});
	
	$(".formBtn #reset").bind("click", function(){		//�������֮��ִ��
		fGetItemsValue(gChooseClasses, gChooseItemsPlace);	//���ñ�����
	});
	
	$("#saveData").click(function(){			//�����������֮��ִ��
		cookieName = fGetCookie("BattleTag");
		fSetCookie(cookieName, fSerializeItemsData(), 365);		//�����л�֮���װ���������ݱ�����cookie��
		alert("�����Ѿ��洢��cookies��");
	});
}


/***********************************************************************************
** ��������fInitStyle()
** Input argv��classes		//ѡ���ְҵ
** Output argv��
** Return��
** ����˵������ʼ��ҳ����ʽ
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
** ��������fPopupItemInfo()
** Input argv��itemObj,itemsPlace,xP,yP		//��Ҫ������װ�����󣬵�����װ����λ������xλ�ã�����yλ��
** Output argv��
** Return��
** ����˵��������div��ʾװ����ϸ��Ϣ
***********************************************************************************/
function fPopupItemInfo(itemObj,itemsPlace,xP,yP){
	var htmlStr = '<div class="popupItemAttributesBox"><h3>' + fItemsPlaceNameTransfer(itemsPlace,"ZH") + '</h3>';
	for(var pi in itemObj){
		if(itemObj[pi] != 0){
			htmlStr = htmlStr + '<p>' + pi + ':' + itemObj[pi] + '</p>';
			var bShow = true;											//����װ������ϸ��Ϣʱ����bShow��Ϊtrue
		};
	};
	if(bShow){								//bShowΪtrueʱ������Ϣ
		$("body").append(htmlStr);										//��ҳ������ʾdiv
		$("body .popupItemAttributesBox").css({top:yP, left:xP});		//���õ���div��λ��
	};
}


/***********************************************************************************
** ��������fGetItemsValue()
** Input argv��
** Output argv��
** Return��
** ����˵������ȡװ����ǰֵ���ڱ�����ʾ
***********************************************************************************/
function fGetItemsValue(classes, itemsPlace){
	var itemsPlaceNum = fItemsPlaceNameTransfer(itemsPlace,"NUM");		//ȡ�øò�λװ����Ӧ�����

		
	var strength = gItemsObj[classes][itemsPlaceNum].strength;						//����
	var dexterity = gItemsObj[classes][itemsPlaceNum].dexterity;					//����
	var intelligence = gItemsObj[classes][itemsPlaceNum].intelligence;				//����
	var vitality = gItemsObj[classes][itemsPlaceNum].vitality;						//����
	
	var minDamage = gItemsObj[classes][itemsPlaceNum].minDamage;						//��С�˺�
	var maxDamage = gItemsObj[classes][itemsPlaceNum].maxDamage;						//����˺�
	var criticalHitChance = gItemsObj[classes][itemsPlaceNum].criticalHitChance;		//��������
	var criticalHitDamage = gItemsObj[classes][itemsPlaceNum].criticalHitDamage;		//�����˺�
	var attackSpeed = gItemsObj[classes][itemsPlaceNum].attackSpeed;					//�����ٶ�
	
	var armor = gItemsObj[classes][itemsPlaceNum].armor;									//�ܻ���
	var allResistance = gItemsObj[classes][itemsPlaceNum].allResistance;					//ȫ����
	var physicalResistance = gItemsObj[classes][itemsPlaceNum].physicalResistance;			//������
	var coldResistance = gItemsObj[classes][itemsPlaceNum].coldResistance;					//��������
	var fireResistance = gItemsObj[classes][itemsPlaceNum].fireResistance;					//���濹��
	var lightningResistance = gItemsObj[classes][itemsPlaceNum].lightningResistance;		//�������
	var poisonResistance = gItemsObj[classes][itemsPlaceNum].poisonResistance;				//���ؿ���
	var arcaneResistance = gItemsObj[classes][itemsPlaceNum].arcaneResistance;				//�ط�/��ʥ����
	var blockChance = gItemsObj[classes][itemsPlaceNum].blockChance;						//�񵲸���
	var blockAmountMin = gItemsObj[classes][itemsPlaceNum].blockAmountMin;					//��ֵ����
	var blockAmountMax = gItemsObj[classes][itemsPlaceNum].blockAmountMax;					//��ֵ����
	var crowdControlReduction = gItemsObj[classes][itemsPlaceNum].crowdControlReduction;	//�س�����
	var missileDamageReducion = gItemsObj[classes][itemsPlaceNum].missileDamageReducion;	//Զ���˺�����
	var meleeDamageReduction = gItemsObj[classes][itemsPlaceNum].meleeDamageReduction;		//��ս�˺�����
	var thorns = gItemsObj[classes][itemsPlaceNum].thorns;									//�����˺�
	
	var lifeBonus = gItemsObj[classes][itemsPlaceNum].lifeBonus;								//����ֵ�ӳ�
	var lifePerSecond = gItemsObj[classes][itemsPlaceNum].lifePerSecond;						//ÿ�������ָ�
	var lifeSteal = gItemsObj[classes][itemsPlaceNum].lifeSteal;								//������ȡ
	var lifePerKill = gItemsObj[classes][itemsPlaceNum].lifePerKill;							//��ɱ�����ָ�
	var lifePerHit = gItemsObj[classes][itemsPlaceNum].lifePerHit;								//���������ָ�
	var healthGlobeHealingBonus = gItemsObj[classes][itemsPlaceNum].healthGlobeHealingBonus;	//����֮��Ч���ӳ�
	var bonusToGlobeRadius = gItemsObj[classes][itemsPlaceNum].bonusToGlobeRadius;				//ʰȡ����ӳ�
	
	var movementSpeed = gItemsObj[classes][itemsPlaceNum].movementSpeed;					//�ƶ��ٶ�
	var goldFind = gItemsObj[classes][itemsPlaceNum].goldFind;								//���Ѱ����
	var magicFind = gItemsObj[classes][itemsPlaceNum].magicFind;							//ħ��Ѱ����
	var bonusExperience = gItemsObj[classes][itemsPlaceNum].bonusExperience;				//����ӳ�
	var bonusExperiencePerKill = gItemsObj[classes][itemsPlaceNum].bonusExperiencePerKill;	//��ɱ����ӳ�
	
	var itemsValueArr = new Array(strength,dexterity,intelligence,vitality,
									minDamage,maxDamage,criticalHitChance,criticalHitDamage,attackSpeed,
									armor,allResistance,physicalResistance,coldResistance,fireResistance,lightningResistance,poisonResistance,arcaneResistance,blockChance,blockAmountMin,blockAmountMax,crowdControlReduction,missileDamageReducion,meleeDamageReduction,thorns,
									lifeBonus,lifePerSecond,lifeSteal,lifePerKill,lifePerHit,healthGlobeHealingBonus,bonusToGlobeRadius,
									movementSpeed,goldFind,magicFind,bonusExperience,bonusExperiencePerKill);		//�����ϻ�ȡ��ֵ�����������Ա����
	$(".itemsForm").find("input").each(function(i){
		$(this).val(itemsValueArr[i]);
	});
}

/***********************************************************************************
** ��������gSetItemsValue()
** Input argv��
** Output argv��
** Return��
** ����˵����������װ���������ݴ洢��װ��������
***********************************************************************************/
function gSetItemsValue(classes, itemsPlace){
	var itemsPlaceNum = fItemsPlaceNameTransfer(itemsPlace,"NUM");	//ȡ�øò�λװ����Ӧ�����
	var itemsValueArr = new Array;						//����װ������ֵ���飬������ʱ��ű��е�����
	$(".itemsForm").find("input").each(function(i){
		itemsValueArr[i] = $(this).val();				//����ֵ���δ���������
	});	
	
	gItemsObj[classes][itemsPlaceNum].strength = itemsValueArr[0];			//����
	gItemsObj[classes][itemsPlaceNum].dexterity = itemsValueArr[1];			//����
	gItemsObj[classes][itemsPlaceNum].intelligence = itemsValueArr[2];		//����
	gItemsObj[classes][itemsPlaceNum].vitality = itemsValueArr[3];			//����
	
	gItemsObj[classes][itemsPlaceNum].minDamage = itemsValueArr[4];				//��С�˺�
	gItemsObj[classes][itemsPlaceNum].maxDamage = itemsValueArr[5];				//����˺�
	gItemsObj[classes][itemsPlaceNum].criticalHitChance = itemsValueArr[6];		//��������
	gItemsObj[classes][itemsPlaceNum].criticalHitDamage = itemsValueArr[7];		//�����˺�
	gItemsObj[classes][itemsPlaceNum].attackSpeed = itemsValueArr[8];			//�����ٶ�
	
	gItemsObj[classes][itemsPlaceNum].armor = itemsValueArr[9];								//�ܻ���
	gItemsObj[classes][itemsPlaceNum].allResistance = itemsValueArr[10];					//ȫ����
	gItemsObj[classes][itemsPlaceNum].physicalResistance = itemsValueArr[11];				//������
	gItemsObj[classes][itemsPlaceNum].coldResistance = itemsValueArr[12];					//��������
	gItemsObj[classes][itemsPlaceNum].fireResistance = itemsValueArr[13];					//���濹��
	gItemsObj[classes][itemsPlaceNum].lightningResistance = itemsValueArr[14];				//�������
	gItemsObj[classes][itemsPlaceNum].poisonResistance = itemsValueArr[15];					//���ؿ���
	gItemsObj[classes][itemsPlaceNum].arcaneResistance = itemsValueArr[16];					//�ط�/��ʥ����
	gItemsObj[classes][itemsPlaceNum].blockChance = itemsValueArr[17];						//�񵲸���
	gItemsObj[classes][itemsPlaceNum].blockAmountMin = itemsValueArr[18];					//��ֵ����
	gItemsObj[classes][itemsPlaceNum].blockAmountMax = itemsValueArr[19];					//��ֵ����
	gItemsObj[classes][itemsPlaceNum].crowdControlReduction = itemsValueArr[20];			//�س�����
	gItemsObj[classes][itemsPlaceNum].missileDamageReducion = itemsValueArr[21];			//Զ���˺�����
	gItemsObj[classes][itemsPlaceNum].meleeDamageReduction = itemsValueArr[22];				//��ս�˺�����
	gItemsObj[classes][itemsPlaceNum].thorns = itemsValueArr[23];							//�����˺�
	
	gItemsObj[classes][itemsPlaceNum].lifeBonus = itemsValueArr[24];				//����ֵ�ӳ�
	gItemsObj[classes][itemsPlaceNum].lifePerSecond = itemsValueArr[25];			//ÿ�������ָ�
	gItemsObj[classes][itemsPlaceNum].lifeSteal = itemsValueArr[26];				//������ȡ
	gItemsObj[classes][itemsPlaceNum].lifePerKill = itemsValueArr[27];				//��ɱ�����ָ�
	gItemsObj[classes][itemsPlaceNum].lifePerHit = itemsValueArr[28];				//���������ָ�
	gItemsObj[classes][itemsPlaceNum].healthGlobeHealingBonus = itemsValueArr[29];	//����֮��Ч���ӳ�
	gItemsObj[classes][itemsPlaceNum].bonusToGlobeRadius = itemsValueArr[30];		//ʰȡ����ӳ�
	
	gItemsObj[classes][itemsPlaceNum].movementSpeed = itemsValueArr[31];			//�ƶ��ٶ�
	gItemsObj[classes][itemsPlaceNum].goldFind = itemsValueArr[32];					//���Ѱ����
	gItemsObj[classes][itemsPlaceNum].magicFind = itemsValueArr[33];				//ħ��Ѱ����
	gItemsObj[classes][itemsPlaceNum].bonusExperience = itemsValueArr[34];			//����ӳ�
	gItemsObj[classes][itemsPlaceNum].bonusExperiencePerKill = itemsValueArr[35];	//��ɱ����ӳ�
}


/***********************************************************************************
** ��������gCountHeroAttributes()
** Input argv��classes				//����ְҵ
** Output argv��
** Return��
** ����˵���������������Բ��洢
***********************************************************************************/
function gCountHeroAttributes(classes){
	gClassesObj[classes].countLevelAttributes();	//����ȼ�������������Ե�Ӱ�죨��ʼ����������ֵ��
	var allResistance = 0;							//���岢��ʼ��ȫ����
	for(i=0; i<gItemsObj[classes].length; i++){
		gClassesObj[classes].strength = gClassesObj[classes].strength + Number(gItemsObj[classes][i].strength);				//��������
		gClassesObj[classes].dexterity = gClassesObj[classes].dexterity + Number(gItemsObj[classes][i].dexterity);				//��������
		gClassesObj[classes].intelligence = gClassesObj[classes].intelligence + Number(gItemsObj[classes][i].intelligence);	//��������
		gClassesObj[classes].vitality = gClassesObj[classes].vitality + Number(gItemsObj[classes][i].vitality);				//��������
		
		gClassesObj[classes].criticalHitChance = gClassesObj[classes].criticalHitChance + Number(gItemsObj[classes][i].criticalHitChance);	//���㱩������
		gClassesObj[classes].criticalHitDamage = gClassesObj[classes].criticalHitDamage + Number(gItemsObj[classes][i].criticalHitDamage);	//���㱩���˺�
		
		gClassesObj[classes].blockAmount[0] = gClassesObj[classes].blockAmount[0] + Number(gItemsObj[classes][i].blockAmountMin);						//�����ֵ����
		gClassesObj[classes].blockAmount[1] = gClassesObj[classes].blockAmount[1] + Number(gItemsObj[classes][i].blockAmountMax);						//�����ֵ����
		gClassesObj[classes].blockChance = gClassesObj[classes].blockChance + Number(gItemsObj[classes][i].blockChance);								//����񵲸���
		allResistance = allResistance + Number(gItemsObj[classes][i].allResistance);																	//����ȫ����
		gClassesObj[classes].crowdControlReduction = gClassesObj[classes].crowdControlReduction + Number(gItemsObj[classes][i].crowdControlReduction);	//����س�����
		gClassesObj[classes].missileDamageReducion = gClassesObj[classes].missileDamageReducion + Number(gItemsObj[classes][i].missileDamageReducion);	//����Զ���˺�����
		gClassesObj[classes].meleeDamageReduction = gClassesObj[classes].meleeDamageReduction + Number(gItemsObj[classes][i].meleeDamageReduction);	//�����ս�˺�����
		gClassesObj[classes].thorns = gClassesObj[classes].thorns + Number(gItemsObj[classes][i].thorns);												//���㾣���˺�
		
		gClassesObj[classes].totalLifeBonus = gClassesObj[classes].totalLifeBonus + Number(gItemsObj[classes][i].lifeBonus);									//����������ֵ�ӳ�
		gClassesObj[classes].lifePerSecond = gClassesObj[classes].lifePerSecond + Number(gItemsObj[classes][i].lifePerSecond);									//����ÿ�������ָ�
		gClassesObj[classes].lifeSteal = gClassesObj[classes].lifeSteal + Number(gItemsObj[classes][i].lifeSteal);												//����������ȡ
		gClassesObj[classes].lifePerKill = gClassesObj[classes].lifePerKill + Number(gItemsObj[classes][i].lifePerKill);										//�����ɱ�����ָ�
		gClassesObj[classes].lifePerHit = gClassesObj[classes].lifePerHit + Number(gItemsObj[classes][i].lifePerHit);											//������������ָ�
		gClassesObj[classes].healthGlobeHealingBonus = gClassesObj[classes].healthGlobeHealingBonus + Number(gItemsObj[classes][i].healthGlobeHealingBonus);	//��������֮��Ч���ӳ�
		gClassesObj[classes].bonusToGlobeRadius = gClassesObj[classes].bonusToGlobeRadius + Number(gItemsObj[classes][i].bonusToGlobeRadius);					//����ʰȡ����ӳ�
		
		gClassesObj[classes].movementSpeed = gClassesObj[classes].movementSpeed + Number(gItemsObj[classes][i].movementSpeed);								//�ƶ��ٶ�
		gClassesObj[classes].goldFind = gClassesObj[classes].goldFind + Number(gItemsObj[classes][i].goldFind);											//���Ѱ����
		gClassesObj[classes].magicFind = gClassesObj[classes].magicFind + Number(gItemsObj[classes][i].magicFind);											//ħ��Ѱ����
		gClassesObj[classes].bonusExperience = gClassesObj[classes].bonusExperience + Number(gItemsObj[classes][i].bonusExperience);						//����ӳ�
		gClassesObj[classes].bonusExperiencePerKill = gClassesObj[classes].bonusExperiencePerKill + Number(gItemsObj[classes][i].bonusExperiencePerKill);	//��ɱ����ӳ�
	};
	
	gClassesObj[classes].armor = gClassesObj[classes].strength;		//���û�������ֵ=����
	allResistance = allResistance + Math.round(gClassesObj[classes].intelligence * 0.1);	//����ȫ����=ȫ����+����/10 ��������
	gClassesObj[classes].physicalResistance = allResistance;		//����������=ȫ����
	gClassesObj[classes].coldResistance = allResistance;			//������������=ȫ����
	gClassesObj[classes].fireResistance = allResistance;			//�������濹��=ȫ����
	gClassesObj[classes].lightningResistance = allResistance;		//�����������=ȫ����
	gClassesObj[classes].poisonResistance = allResistance;			//�������ؿ���=ȫ����
	gClassesObj[classes].arcaneResistance = allResistance;			//�����ط�/��ʥ����=ȫ����
	for(i=0; i<gItemsObj[classes].length; i++){
		gClassesObj[classes].armor = gClassesObj[classes].armor + Number(gItemsObj[classes][i].armor);												//���㻤��
		gClassesObj[classes].physicalResistance = gClassesObj[classes].physicalResistance + Number(gItemsObj[classes][i].physicalResistance);		//����������
		gClassesObj[classes].coldResistance = gClassesObj[classes].coldResistance + Number(gItemsObj[classes][i].coldResistance);					//�����������
		gClassesObj[classes].fireResistance = gClassesObj[classes].fireResistance + Number(gItemsObj[classes][i].fireResistance);					//������濹��
		gClassesObj[classes].lightningResistance = gClassesObj[classes].lightningResistance + Number(gItemsObj[classes][i].lightningResistance);	//����������
		gClassesObj[classes].poisonResistance = gClassesObj[classes].poisonResistance + Number(gItemsObj[classes][i].poisonResistance);			//���㶾�ؿ���
		gClassesObj[classes].arcaneResistance = gClassesObj[classes].arcaneResistance + Number(gItemsObj[classes][i].arcaneResistance);			//�����ط�/��ʥ����
	};
	
	gClassesObj[classes].setMainAttribute();				//����������
	gClassesObj[classes].countMainAttributesDamage();		//�����������˺��ӳ�
	gClassesObj[classes].countMaximumLife();				//��������ֵ����
	
	
	fShowHeroAttributes(classes);			//���ú�������ҳ������ʾ��������
}


/***********************************************************************************
** ��������fShowHeroAttributes()
** Input argv��classes				//ѡ�������ְҵ
** Output argv��
** Return��
** ����˵������ҳ������ʾ��������
***********************************************************************************/
function fShowHeroAttributes(classes){
	$("#heroAttributes #strength").html(gClassesObj[classes].strength);				//����
	$("#heroAttributes #dexterity").html(gClassesObj[classes].dexterity);			//����
	$("#heroAttributes #intelligence").html(gClassesObj[classes].intelligence);		//����
	$("#heroAttributes #vitality").html(gClassesObj[classes].vitality);				//����
	$("#heroAttributes #armor").html(gClassesObj[classes].armor);					//����
	$("#heroAttributes #DPS").html("ȱ�ٹ�ʽ");										//DPS-2λС��
	
	$("#heroAttributes #mainAttributesDamage").html(gClassesObj[classes].mainAttributesDamage.toFixed(2));		//�������˺��ӳ�-2λС��
	$("#heroAttributes #skillsAttributesDamage").html(gClassesObj[classes].skillsAttributesDamage.toFixed(2));	//�����˺��ӳ�-2λС��
	$("#heroAttributes #attacksPerSecond").html("ȱ�ٹ�ʽ");													//ÿ�빥������-2λС��
	$("#heroAttributes #criticalHitChance").html(gClassesObj[classes].criticalHitChance.toFixed(2));			//��������-2λС��
	$("#heroAttributes #criticalHitDamage").html(gClassesObj[classes].criticalHitDamage.toFixed(2));			//�����˺�-2λС��
	
	$("#heroAttributes #blockAmount").html(gClassesObj[classes].blockAmount[0] + "-" + gClassesObj[classes].blockAmount[1]);	//��ֵ
	$("#heroAttributes #blockChance").html(gClassesObj[classes].blockChance.toFixed(1));						//�񵲸���-1λС��
	$("#heroAttributes #dodgeChance").html("ȱ�ٹ�ʽ");															//�������-1λС��
	$("#heroAttributes #damageReduction").html("ȱ�ٹ�ʽ");														//�˺�����-2λС��
	$("#heroAttributes #physicalResistance").html(gClassesObj[classes].physicalResistance);						//������
	$("#heroAttributes #coldResistance").html(gClassesObj[classes].coldResistance);								//��������
	$("#heroAttributes #fireResistance").html(gClassesObj[classes].fireResistance);								//���濹��
	$("#heroAttributes #lightningResistance").html(gClassesObj[classes].lightningResistance);					//�������
	$("#heroAttributes #poisonResistance").html(gClassesObj[classes].poisonResistance);							//���ؿ���
	$("#heroAttributes #arcaneResistance").html(gClassesObj[classes].arcaneResistance);							//�ط�/��ʥ����
	$("#heroAttributes #crowdControlReduction").html(gClassesObj[classes].crowdControlReduction.toFixed(2));	//�س�����-2λС��
	$("#heroAttributes #missileDamageReducion").html(gClassesObj[classes].missileDamageReducion.toFixed(2));	//Զ���˺�����-2λС��
	$("#heroAttributes #meleeDamageReduction").html(gClassesObj[classes].meleeDamageReduction.toFixed(2));		//��ս�˺�����-2λС��
	$("#heroAttributes #thorns").html(gClassesObj[classes].thorns.toFixed(2));									//�����˺�-2λС��
	
	$("#heroAttributes #maximumLife").html(gClassesObj[classes].maximumLife);										//����ֵ����
	$("#heroAttributes #totalLifeBonus").html(gClassesObj[classes].totalLifeBonus);									//������ֵ�ӳ�
	$("#heroAttributes #lifePerSecond").html(gClassesObj[classes].lifePerSecond.toFixed(2));						//ÿ�������ָ�-2λС��
	$("#heroAttributes #lifeSteal").html(gClassesObj[classes].lifeSteal.toFixed(2));								//������ȡ-2λС��
	$("#heroAttributes #lifePerKill").html(gClassesObj[classes].lifePerKill.toFixed(2));							//��ɱ�����ָ�-2λС��
	$("#heroAttributes #lifePerHit").html(gClassesObj[classes].lifePerHit.toFixed(2));								//���������ָ�-2λС��
	$("#heroAttributes #healthGlobeHealingBonus").html(gClassesObj[classes].healthGlobeHealingBonus.toFixed(2));	//����֮��Ч���ӳ�-2λС��
	$("#heroAttributes #bonusToGlobeRadius").html(gClassesObj[classes].bonusToGlobeRadius.toFixed(2));				//ʰȡ����ӳ�-2λС��
	
	$("#heroAttributes #movementSpeed").html(gClassesObj[classes].movementSpeed);								//�ƶ��ٶ�
	$("#heroAttributes #goldFind").html(gClassesObj[classes].goldFind);											//���Ѱ����
	$("#heroAttributes #magicFind").html(gClassesObj[classes].magicFind);										//ħ��Ѱ����
	$("#heroAttributes #bonusExperience").html(gClassesObj[classes].bonusExperience.toFixed(1));				//����ӳ�-1λС��
	$("#heroAttributes #bonusExperiencePerKill").html(gClassesObj[classes].bonusExperiencePerKill.toFixed(2));	//��ɱ����ӳ�-2λС��
}


/***********************************************************************************
** ��������fItemsPlaceEnTransfer()
** Input argv��itemsPlaceEn, targetFormat	//Ҫת����Ӣ������Ŀ���ʽZH/NUM
** Output argv��
** Return��result							//ת��֮�����������or���
** ����˵������װ����λ��Ӣ��ת��Ϊ��Ż�����
***********************************************************************************/
function fItemsPlaceNameTransfer(itemsPlaceEn, targetFormat){
	var arrEn = ["head","shoulders","torso","wrists","hands","waist","legs","feet","leftRing","rightRing","amulets","weapons","offHand"];
	var arrZh = ["ͷ��","����","����","����","����","����","�Ȳ�","�Ų�","���ֽ�ָ","���ֽ�ָ","�����","����","����"];
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
** ��������fSerializeItemsData()
** Input argv��
** Output argv��
** Return��jsonTxt	//���л�֮����ַ�������
** ����˵�������л��洢�������Լ�װ�����ݣ�����json��ʽ���л�
***********************************************************************************/
function fSerializeItemsData(){
	//json����������{"bar":[{"strength":1,"dexterity":1},{},{}],"dh":[{},{},{}],"monk":[{},{},{}],"wd":[{},{},{}],"wzd":[{},{},{}]]
	var jsonTxt = '{';
	for(var pi in gItemsObj){
		var cObjTxt = '"' + pi + '":[';
		for(j=0; j<=12; j++){
			cObjTxt = cObjTxt + '{';
			for(var pk in gItemsObj[pi][j]){
				if(gItemsObj[pi][j][pk] != 0)					//�ж϶�������ֵ�Ƿ�Ϊ0
					cObjTxt = cObjTxt + '"' + pk + '":' + gItemsObj[pi][j][pk] + ',';	//��Ϊ0������������
			};
			if(cObjTxt.charAt(cObjTxt.length - 1) == ','){		//�ж��ַ���ĩβ�Ƿ�Ϊ','��
				cObjTxt = cObjTxt.slice(0,-1);					//��Ϊ','����ɾ��
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
** ��������fUnserializeItemsData()
** Input argv��jsonTxt		//json��ʽ��װ�������ַ�������
** Output argv��
** Return��
** ����˵���������л���װ�������ַ������ݻָ�Ϊװ������
***********************************************************************************/
function fUnserializeItemsData(jsonTxt){
	//testjson = '{"bar":[{"vitality":1},{},{},{},{},{},{},{},{},{},{},{},{}],"dh":[{},{},{},{},{},{},{},{},{},{},{},{},{}],"monk":[{},{},{},{},{},{},{},{},{},{},{},{},{}],"wd":[{},{},{},{},{},{},{},{},{},{},{},{},{}],"wzd":[{},{},{},{},{},{},{},{},{},{},{},{},{}]}';
	//testjson = '{"bar":[{"vitality":1},{},{},{},{},{},{},{},{},{},{},{},{}]}';
	try{
		var obj = eval("(" + jsonTxt + ")");
	} catch(err) {
		alert("���ݲ��Ϸ�");
		return false;
	};
	for(var pi in gItemsObj){				//ͨ��jsonΪgItemsObj����ֵ
		if(obj[pi]){							//��obj�д���"pi"������
			for(j=0; j<=12; j++){
				for(var pk in gItemsObj[pi][j]){
					if(obj[pi][j][pk])								//��obj�д���"pk"������
						gItemsObj[pi][j][pk] = obj[pi][j][pk];		//��ֵ
				};
			};
		};
	};
}



/***********************************************************************************
** ��������fSetCookie()
** Input argv��c_name,value,expiredays		//cookie����,cookie����,cookie����ʱ�䣨�죩
** Output argv��
** Return��
** ����˵��������cookie����
***********************************************************************************/
function fSetCookie(c_name,value,expiredays){
	var exdate  = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}


/***********************************************************************************
** ��������fGetCookie()
** Input argv��c_name		//cookie����
** Output argv��
** Return��cookie value		//cookie����Ӧ��cookie���� �� ��
** ����˵��������c_name��ȡcookie�ж�Ӧ������
***********************************************************************************/
function fGetCookie(c_name){
	if(document.cookie.length > 0){
		c_start = document.cookie.indexOf(c_name + "=");	//��cookie�в���ƥ���cookie��
		if (c_start != -1){									//���鵽
			c_start = c_start + c_name.length + 1;			//��¼Ŀ��cookieֵ����ʼλ��
			c_end = document.cookie.indexOf(";",c_start);	//��¼Ŀ��cookieֵ�Ľ���λ��(���ݷָ���;����)
			if (c_end == -1){								//���Ҳ���;���ţ�˵����һ��cookie�����һ�������¼����λ��Ϊĩβλ��
				c_end = document.cookie.length;
			};
			return unescape(document.cookie.substring(c_start,c_end));		//����c_name��Ӧ��cookieֵ
		};
	};
	return "";		//���鲻�������ؿ�
}


/***********************************************************************************
** ��������fCheckBattleTagCookie()
** Input argv��c_name		//cookie����
** Output argv��
** Return��
** ����˵�����ж�cookie��BattleTag�Ƿ���ڣ����������ȡ��BattleTag��Ӧ���ݣ��������ڣ�����ʾ����BattleTag
***********************************************************************************/
function fCheckBattleTagCookie(c_name){
	var battleTag = fGetCookie(c_name);			//��cookie��ȡbattleTagֵ
	if(battleTag != null && battleTag != ""){	//��battleTag��Ϊ��
		fCheckItemsInfoCookie(battleTag);		//��ȡbattleTag��Ӧ��װ����Ϣ
		$(".battleTag span").html(battleTag);	//ҳ��battleTag����ʾ��ǰ��battleTag��Ϣ
	} else {									//��battleTagΪ�գ�����ʾ����BattleTag��Ϣ
		battleTag = prompt("����������BattleTag:","");
		if (battleTag != null && battleTag != ""){		//��֤battleTag�����Ƿ�Ϸ�������������������Ŀǰֻ�ж��˲�Ϊ�գ���Ҫ����BattleTag��ʽ�жϣ�3-12Ӣ�� + # + ��λ���֣�e.g.Jeffery#1965������������
			fSetCookie("BattleTag", battleTag, 365);	//�������battleTagֵ����cookie�У�cookie��ΪBATTLETAG
		};
		fCheckItemsInfoCookie(battleTag);		//��ȡbattleTag��Ӧ��װ����Ϣ
		$(".battleTag span").html(battleTag);	//ҳ��battleTag����ʾ��ǰ��battleTag��Ϣ
	};
}


/***********************************************************************************
** ��������fCheckItemsInfoCookie()
** Input argv��c_name		//cookie����
** Output argv��
** Return��
** ����˵�����ж���Ҫ���õ�cookie�Ƿ���ڣ������ڣ���װ���������ݸ���cookieֵ��ԭ
***********************************************************************************/
function fCheckItemsInfoCookie(c_name){
	var itemsInfo = fGetCookie(c_name);			//����battleTag��������ȡ��Ӧ��װ����Ϣ����
	if(itemsInfo != null && itemsInfo != ""){	//����Ӧcookieֵ����
		fUnserializeItemsData(itemsInfo);		//���ú��������л�װ����Ϣ
		//alert("װ����Ϣ�ѻ�ԭ");
	} else {									//����Ӧcookieֵ������
		//alert("û�����������");
	};
}