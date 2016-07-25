function fLeftMenuInteraction(nSpeed){		//nSpeed：动画速度(ms)

	var nSpeed = nSpeed ? nSpeed : 100,						//设置参数默认值为100
		aMenu2nd = $(".leftMenu .menu2nd>div"),				//定义所有二级菜单
		aMenu2ndNoSP = aMenu2nd.not(aMenu2nd.has(".SP")),	//定义所有二级菜单（无SP导航）
		aSP = aMenu2nd.find(".SP"),							//定义所有SP导航
		aSPAnchor = aSP.find("a"),							//定义所有SP导航中a标签
		oActiveMenu = null,		//定义当前激活的二级菜单（激活：有SP导航的菜单，点击SP时激活；无SP导航的菜单，点击菜单时激活）
		oActiveSP = null,		//定义当前激活的SP导航
		aTimer = [];			//定义计时器
		
	
	aSP.hide();	//初始化，隐藏所有SP导航
	
	aMenu2nd.click(function(){	//为所有菜单绑定click操作
		if($(this).is(aMenu2ndNoSP)){	//判断点击菜单是否有SP导航，若无SP导航
			oActiveMenu = $(this);				//激活当前菜单
			aSPAnchor.removeClass("SPactive");	//关闭所有SP导航中a标签的激活样式
			$(this).stop().delay(0).animate({marginRight: "-12px", borderRightWidth: "0px"}, nSpeed);	//二级菜单右移动画
		}
		aMenu2nd.filter(".active").not(oActiveMenu)
			.removeAttr("style")					//清除二级菜单右移动画造成的css改变
			.removeClass("active")					//关闭未激活的二级菜单激活样式
			.find(".SP").removeAttr("style");		//清除SP导航右移动画造成的css改变
		aSP.not(oActiveSP).hide();				//隐藏未激活的SP导航
		$(this).addClass("active");				//打开点击的二级菜单激活样式
		$(this).find(".SP").slideDown(nSpeed);	//展开对应SP导航
	});
	
	aSPAnchor.click(function(){			//为所有SP绑定click操作
		oActiveMenu = $(this).parents(".active");	//激活当前SP导航对应的菜单
		oActiveSP = $(this).parents(".SP");			//激活当前SP导航
		$(this).parents(".active").stop().delay(0).animate({marginRight: "-12px", borderRightWidth: "0px"}, nSpeed*0.5);	//二级菜单右移动画
		$(this).parents(".SP").stop().delay(0).animate({marginLeft: "26px"}, nSpeed*0.5);									//SP导航右移动画
		aSPAnchor.removeClass("SPactive");		//关闭所有SP导航中a标签的激活样式
		$(this).addClass("SPactive");			//打开点击的SP导航中a标签的激活样式
	});
	
	$("#indexLeft").mouseleave(function(){	//为菜单栏绑定mouseleave操作
		var oNotActivedMenu = aMenu2nd.filter(".active").not(oActiveMenu);	//定义所有未激活的二级菜单
		aTimer[0] = window.setTimeout(function(){											//延时3000ms执行计时器
			oNotActivedMenu.find(".SP").slideUp(500);										//收起未激活二级菜单对应的SP导航
			window.setTimeout(function(){oNotActivedMenu.removeClass("active")}, 1000);	//延时1000ms 关闭未激活二级菜单的激活样式
		}, 3000);
	}).mouseenter(function(){				//为菜单栏绑定mouseenter操作
		clearTimeout(aTimer[0]);				//清除计时器
	});
}