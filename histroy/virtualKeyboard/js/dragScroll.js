function dragScroll(autoScrollSpeed){			//autoScrollSpeedΪ�����ٶȣ���λms
	var timer;
	var mouseMove = false;						//�������Ƿ������ק״̬
	var scrollY;								//������λ��
	var mouseY;									//��괹ֱλ��
	var scrollObj = document.getElementById("scroll");
	var contentHeight = scrollObj.scrollHeight;				//��ȡdiv�������ݵĸ߶�
	var displayHeight = scrollObj.offsetHeight;				//��ȡdiv��ʾ���ݵĸ߶�
	var scrollSpeed = contentHeight / displayHeight / 2;	//���ù����ٶȻ�����ʵ�ʸ߶�/��ʾ�߶�

	if(contentHeight > displayHeight){
		scrollObj.style.cssText = "cursor:row-resize";		//���������ݵĸ߶ȴ�����ʾ�����ݣ�������Ϊrow-resize�������Թ�����
	}
	
	scrollObj.ondblclick = function(){
		if(autoScrollSpeed == null){ autoScrollSpeed = 50; }
		timer = setInterval(autoScroll,autoScrollSpeed);	//��autoScrollSpeed���õ��ٶ��Զ�����
	}
	function autoScroll(){
		scrollObj.scrollTop = scrollObj.scrollTop + 1;		//�Զ���������
	}
	
	scrollObj.onmousedown = function(e){
		clearInterval(timer);					//ֹͣ�Զ�����
		var event = e||window.event;			//ie��ff�����¼���
		mouseMove = true;						//�������Ϊ��ק״̬
		mouseY = event.clientY;					//��ȡ��갴��ʱ���Y��λ��
		scrollY = scrollObj.scrollTop;			//��ȡ��ǰ������λ��
		this.setCapture();						//���õ�ǰ���ڰ����
	}
	
	scrollObj.onmousemove = function(e){
		var event = e||window.event;			//ie��ff�����¼���
		if(mouseMove == true){
			scrollObj.style.cssText = "cursor:n-resize";
			var scrollMove = mouseY - event.clientY;	//�϶��Ĵ�ֱ����
			this.scrollTop = scrollY + scrollMove * scrollSpeed;
			return false;
		}
	}
	
	scrollObj.onmouseup = function(){
		mouseMove = false;
		scrollY = $("#scroll").scrollTop();		//���̧��ʱ��¼��������λ��
		this.releaseCapture(); 					//ȡ����ǰ���ڵ�����
		if(contentHeight > displayHeight){
			scrollObj.style.cssText = "cursor:row-resize";		//���������ݵĸ߶ȴ�����ʾ�����ݣ�������Ϊrow-resize�������Թ�����
		} else {
			scrollObj.style.cssText = "cursor:default";			//����Ϊ���ɹ���״̬������Ϊdefault
		}
	}
}