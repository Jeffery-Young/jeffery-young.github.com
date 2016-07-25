/***********************************************************************************
** ��������D3Hero()
** ����˵��������װ��ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Items(){
	//��������
	this.strength = 0;					//����
	this.dexterity = 0;					//����
	this.intelligence = 0;				//����
	this.vitality = 0;					//����
	//��������
	this.minDamage = 0;					//��С�˺�
	this.maxDamage = 0;					//����˺�
	this.criticalHitChance = 0;			//��������
	this.criticalHitDamage = 0;			//�����˺�
	this.attackSpeed = 0;				//�����ٶ�
	//��������
	this.armor = 0;						//�ܻ���
	this.allResistance = 0;				//ȫ����
	this.physicalResistance = 0;		//������
	this.coldResistance = 0;			//��������
	this.fireResistance = 0;			//���濹��
	this.lightningResistance = 0;		//�������
	this.poisonResistance = 0;			//���ؿ���
	this.arcaneResistance = 0;			//�ط�/��ʥ����
	this.blockChance = 0;				//�񵲸���
	this.blockAmountMin = 0;			//��ֵ����
	this.blockAmountMax = 0;			//��ֵ����
	this.crowdControlReduction = 0;		//�س�����
	this.missileDamageReducion = 0;		//Զ���˺�����
	this.meleeDamageReduction = 0;		//��ս�˺�����
	this.thorns = 0;					//�����˺�
	//��������
	this.lifeBonus = 0;					//����ֵ�ӳ�
	this.lifePerSecond = 0;				//ÿ�������ָ�
	this.lifeSteal = 0;					//������ȡ
	this.lifePerKill = 0;				//��ɱ�����ָ�
	this.lifePerHit = 0;				//���������ָ�
	this.healthGlobeHealingBonus = 0;	//����֮��Ч���ӳ�
	this.bonusToGlobeRadius = 0;		//ʰȡ����ӳ�
	//ð������
	this.movementSpeed = 0;				//�ƶ��ٶ�
	this.goldFind = 0;					//���Ѱ����
	this.magicFind = 0;					//ħ��Ѱ����
	this.bonusExperience = 0;			//����ӳ�
	this.bonusExperiencePerKill = 0;	//��ɱ����ӳ�
}

/***********************************************************************************
** ��������D3Items_Weapons()
** ����˵������������װ��ԭģ�ͣ��̳�װ��ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Items_Weapons(){
	D3Items.apply(this, arguments);		//�̳�D3Items
	this.weaponSpecie;					//��������
	this.dualWield;						//�Ƿ�˫��
}


/***********************************************************************************
** ��������D3Hero()
** ����˵������������ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Hero(){
	//��������
	this.level = 60;					//�ȼ���Ĭ��60
	this.strength = 0;					//����
	this.dexterity = 0;					//����
	this.intelligence = 0;				//����
	this.vitality = 0;					//����
	this.armor = 0;						//����ֵ
	this.DPS = 0;						//ÿ���˺�
	this.mainAttribute;					//������
	//����
	this.mainAttributesDamage = 0;		//�������˺��ӳ�
	this.skillsAttributesDamage = 0;	//�����˺��ӳ�
	this.attacksPerSecond = 0;			//ÿ�빥������
	this.criticalHitChance = 5;			//��������
	this.criticalHitDamage = 50;		//�����˺�
	//��������
	this.blockAmount = [0,0];			//��ֵ
	this.blockChance = 0;				//�񵲸���
	this.dodgeChance = 0;				//�������
	this.damageReduction = 0;			//�˺�����
	this.physicalResistance = 0;		//������
	this.coldResistance = 0;			//��������
	this.fireResistance = 0;			//���濹��
	this.lightningResistance = 0;		//�������
	this.poisonResistance = 0;			//���ؿ���
	this.arcaneResistance = 0;			//�ط�/��ʥ����
	this.crowdControlReduction = 0;		//�س�����
	this.missileDamageReducion = 0;		//Զ���˺�����
	this.meleeDamageReduction = 0;		//��ս�˺�����
	this.thorns = 0;					//�����˺�
	//��������
	this.maximumLife = 0;				//����ֵ����
	this.totalLifeBonus = 0;			//������ֵ�ӳ�
	this.lifePerSecond = 0;				//ÿ�������ָ�
	this.lifeSteal = 0;					//������ȡ
	this.lifePerKill = 0;				//��ɱ�����ָ�
	this.lifePerHit = 0;				//���������ָ�
	this.healthGlobeHealingBonus = 0;	//����֮��Ч���ӳ�
	this.bonusToGlobeRadius = 0;		//ʰȡ����ӳ�
	//ð������
	this.movementSpeed = 0;				//�ƶ��ٶ�
	this.goldFind = 0;					//���Ѱ����
	this.magicFind = 0;					//ħ��Ѱ����
	this.bonusExperience = 0;			//����ӳ�
	this.bonusExperiencePerKill = 0;	//��ɱ����ӳ�
	
	this.countLevelAttributes = function(){		//����ȼ����������Ե�Ӱ��
		this.strength = 7 + this.addStrength * this.level;
		this.dexterity = 7 + this.addDexterity * this.level;
		this.intelligence = 7 + this.addIntelligence * this.level;
		this.vitality = 7 + this.addVitality * this.level;
	}
	
	this.countMainAttributesDamage = function(){	//�����������˺��ӳɣ��ٷֱ�����
		this.mainAttributesDamage = this.mainAttribute;
	}
	
	this.countMaximumLife = function(){			//��������ֵ���ޣ�����*60*����ֵ�ӳ� �������뱣����������������ʽ����ȶ������������������
		this.maximumLife = Math.round(this.vitality * 60 * (this.totalLifeBonus + 100) * 0.01);
	}
}


/***********************************************************************************
** ��������D3Hero_Bar()
** ����˵��������Ұ����ԭģ�ͣ��̳�D3Hero����ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Hero_bar(){
	D3Hero.apply(this, arguments);			//�̳�D3Hero
	this.addStrength = 3;					//ÿ����������
	this.addDexterity = 1;					//ÿ����������
	this.addIntelligence = 1;				//ÿ����������
	this.addVitality = 2;					//ÿ����������
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.strength;	//����Bar������Ϊ����
	}
}


/***********************************************************************************
** ��������D3Hero_DH()
** ����˵����������ħ����ԭģ�ͣ��̳�D3Hero����ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Hero_dh(){
	D3Hero.apply(this, arguments);			//�̳�D3Hero
	this.addStrength = 1;					//ÿ����������
	this.addDexterity = 3;					//ÿ����������
	this.addIntelligence = 1;				//ÿ����������
	this.addVitality = 2;					//ÿ����������
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.dexterity;	//����dh������Ϊ����
	}
}


/***********************************************************************************
** ��������D3Hero_Monk()
** ����˵����������ɮԭģ�ͣ��̳�D3Hero����ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Hero_monk(){
	D3Hero.apply(this, arguments);			//�̳�D3Hero
	this.addStrength = 1;					//ÿ����������
	this.addDexterity = 3;					//ÿ����������
	this.addIntelligence = 1;				//ÿ����������
	this.addVitality = 2;					//ÿ����������
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.dexterity;	//����monk������Ϊ����
	}
}


/***********************************************************************************
** ��������D3Hero_WD()
** ����˵����������ҽԭģ�ͣ��̳�D3Hero����ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Hero_wd(){
	D3Hero.apply(this, arguments);				//�̳�D3Hero
	this.addStrength = 1;						//ÿ����������
	this.addDexterity = 1;						//ÿ����������
	this.addIntelligence = 3;					//ÿ����������
	this.addVitality = 2;						//ÿ����������
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.intelligence;	//����wd������Ϊ����
	}
}


/***********************************************************************************
** ��������D3Hero_Wzd()
** ����˵������������ʦԭģ�ͣ��̳�D3Hero����ԭģ�Ͳ�����ֵ
***********************************************************************************/
function D3Hero_wzd(){
	D3Hero.apply(this, arguments);				//�̳�D3Hero
	this.addStrength = 1;						//ÿ����������
	this.addDexterity = 1;						//ÿ����������
	this.addIntelligence = 3;					//ÿ����������
	this.addVitality = 2;						//ÿ����������
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.intelligence;	//����wizard������Ϊ����
	}
}