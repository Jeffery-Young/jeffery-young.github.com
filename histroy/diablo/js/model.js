/***********************************************************************************
** 函数名：D3Hero()
** 函数说明：建立装备原模型并赋初值
***********************************************************************************/
function D3Items(){
	//人物属性
	this.strength = 0;					//力量
	this.dexterity = 0;					//敏捷
	this.intelligence = 0;				//智力
	this.vitality = 0;					//体力
	//攻击属性
	this.minDamage = 0;					//最小伤害
	this.maxDamage = 0;					//最大伤害
	this.criticalHitChance = 0;			//暴击概率
	this.criticalHitDamage = 0;			//暴击伤害
	this.attackSpeed = 0;				//攻击速度
	//防御属性
	this.armor = 0;						//总护甲
	this.allResistance = 0;				//全抗性
	this.physicalResistance = 0;		//物理抗性
	this.coldResistance = 0;			//冰寒抗性
	this.fireResistance = 0;			//火焰抗性
	this.lightningResistance = 0;		//电击抗性
	this.poisonResistance = 0;			//毒素抗性
	this.arcaneResistance = 0;			//秘法/神圣抗性
	this.blockChance = 0;				//格挡概率
	this.blockAmountMin = 0;			//格挡值下限
	this.blockAmountMax = 0;			//格挡值上限
	this.crowdControlReduction = 0;		//控场减免
	this.missileDamageReducion = 0;		//远程伤害减免
	this.meleeDamageReduction = 0;		//近战伤害减免
	this.thorns = 0;					//荆棘伤害
	//生命属性
	this.lifeBonus = 0;					//生命值加成
	this.lifePerSecond = 0;				//每秒生命恢复
	this.lifeSteal = 0;					//生命窃取
	this.lifePerKill = 0;				//击杀生命恢复
	this.lifePerHit = 0;				//击中生命恢复
	this.healthGlobeHealingBonus = 0;	//生命之球效果加成
	this.bonusToGlobeRadius = 0;		//拾取距离加成
	//冒险属性
	this.movementSpeed = 0;				//移动速度
	this.goldFind = 0;					//金币寻获量
	this.magicFind = 0;					//魔宝寻获量
	this.bonusExperience = 0;			//经验加成
	this.bonusExperiencePerKill = 0;	//击杀经验加成
}

/***********************************************************************************
** 函数名：D3Items_Weapons()
** 函数说明：建立武器装备原模型，继承装备原模型并赋初值
***********************************************************************************/
function D3Items_Weapons(){
	D3Items.apply(this, arguments);		//继承D3Items
	this.weaponSpecie;					//武器种类
	this.dualWield;						//是否双持
}


/***********************************************************************************
** 函数名：D3Hero()
** 函数说明：建立人物原模型并赋初值
***********************************************************************************/
function D3Hero(){
	//人物属性
	this.level = 60;					//等级，默认60
	this.strength = 0;					//力量
	this.dexterity = 0;					//敏捷
	this.intelligence = 0;				//智力
	this.vitality = 0;					//体力
	this.armor = 0;						//护甲值
	this.DPS = 0;						//每秒伤害
	this.mainAttribute;					//主属性
	//攻击
	this.mainAttributesDamage = 0;		//主属性伤害加成
	this.skillsAttributesDamage = 0;	//技能伤害加成
	this.attacksPerSecond = 0;			//每秒攻击次数
	this.criticalHitChance = 5;			//暴击概率
	this.criticalHitDamage = 50;		//暴击伤害
	//防御属性
	this.blockAmount = [0,0];			//格挡值
	this.blockChance = 0;				//格挡概率
	this.dodgeChance = 0;				//闪躲概率
	this.damageReduction = 0;			//伤害减免
	this.physicalResistance = 0;		//物理抗性
	this.coldResistance = 0;			//冰寒抗性
	this.fireResistance = 0;			//火焰抗性
	this.lightningResistance = 0;		//电击抗性
	this.poisonResistance = 0;			//毒素抗性
	this.arcaneResistance = 0;			//秘法/神圣抗性
	this.crowdControlReduction = 0;		//控场减免
	this.missileDamageReducion = 0;		//远程伤害减免
	this.meleeDamageReduction = 0;		//近战伤害减免
	this.thorns = 0;					//荆棘伤害
	//生命属性
	this.maximumLife = 0;				//生命值上限
	this.totalLifeBonus = 0;			//总生命值加成
	this.lifePerSecond = 0;				//每秒生命恢复
	this.lifeSteal = 0;					//生命窃取
	this.lifePerKill = 0;				//击杀生命恢复
	this.lifePerHit = 0;				//击中生命恢复
	this.healthGlobeHealingBonus = 0;	//生命之球效果加成
	this.bonusToGlobeRadius = 0;		//拾取距离加成
	//冒险属性
	this.movementSpeed = 0;				//移动速度
	this.goldFind = 0;					//金币寻获量
	this.magicFind = 0;					//魔宝寻获量
	this.bonusExperience = 0;			//经验加成
	this.bonusExperiencePerKill = 0;	//击杀经验加成
	
	this.countLevelAttributes = function(){		//计算等级对人物属性的影响
		this.strength = 7 + this.addStrength * this.level;
		this.dexterity = 7 + this.addDexterity * this.level;
		this.intelligence = 7 + this.addIntelligence * this.level;
		this.vitality = 7 + this.addVitality * this.level;
	}
	
	this.countMainAttributesDamage = function(){	//计算主属性伤害加成，百分比数据
		this.mainAttributesDamage = this.mainAttribute;
	}
	
	this.countMaximumLife = function(){			//计算生命值上限，体能*60*生命值加成 四舍五入保留整数！！！！公式待商榷！！！！！！！！！
		this.maximumLife = Math.round(this.vitality * 60 * (this.totalLifeBonus + 100) * 0.01);
	}
}


/***********************************************************************************
** 函数名：D3Hero_Bar()
** 函数说明：建立野蛮人原模型，继承D3Hero人物原模型并赋初值
***********************************************************************************/
function D3Hero_bar(){
	D3Hero.apply(this, arguments);			//继承D3Hero
	this.addStrength = 3;					//每级增加力量
	this.addDexterity = 1;					//每级增加敏捷
	this.addIntelligence = 1;				//每级增加智力
	this.addVitality = 2;					//每级增加体力
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.strength;	//设置Bar主属性为力量
	}
}


/***********************************************************************************
** 函数名：D3Hero_DH()
** 函数说明：建立狩魔猎人原模型，继承D3Hero人物原模型并赋初值
***********************************************************************************/
function D3Hero_dh(){
	D3Hero.apply(this, arguments);			//继承D3Hero
	this.addStrength = 1;					//每级增加力量
	this.addDexterity = 3;					//每级增加敏捷
	this.addIntelligence = 1;				//每级增加智力
	this.addVitality = 2;					//每级增加体力
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.dexterity;	//设置dh主属性为敏捷
	}
}


/***********************************************************************************
** 函数名：D3Hero_Monk()
** 函数说明：建立武僧原模型，继承D3Hero人物原模型并赋初值
***********************************************************************************/
function D3Hero_monk(){
	D3Hero.apply(this, arguments);			//继承D3Hero
	this.addStrength = 1;					//每级增加力量
	this.addDexterity = 3;					//每级增加敏捷
	this.addIntelligence = 1;				//每级增加智力
	this.addVitality = 2;					//每级增加体力
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.dexterity;	//设置monk主属性为敏捷
	}
}


/***********************************************************************************
** 函数名：D3Hero_WD()
** 函数说明：建立巫医原模型，继承D3Hero人物原模型并赋初值
***********************************************************************************/
function D3Hero_wd(){
	D3Hero.apply(this, arguments);				//继承D3Hero
	this.addStrength = 1;						//每级增加力量
	this.addDexterity = 1;						//每级增加敏捷
	this.addIntelligence = 3;					//每级增加智力
	this.addVitality = 2;						//每级增加体力
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.intelligence;	//设置wd主属性为智力
	}
}


/***********************************************************************************
** 函数名：D3Hero_Wzd()
** 函数说明：建立秘术师原模型，继承D3Hero人物原模型并赋初值
***********************************************************************************/
function D3Hero_wzd(){
	D3Hero.apply(this, arguments);				//继承D3Hero
	this.addStrength = 1;						//每级增加力量
	this.addDexterity = 1;						//每级增加敏捷
	this.addIntelligence = 3;					//每级增加智力
	this.addVitality = 2;						//每级增加体力
	
	this.setMainAttribute = function(){
		this.mainAttribute = this.intelligence;	//设置wizard主属性为智力
	}
}