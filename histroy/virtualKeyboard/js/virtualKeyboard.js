var target;				//������̲�����Ŀ��DOM
var holdOperationTime;		//setTimeout��ס����
var continuOperationTime;	//setInterval��������

function virtualKeyboard(targetID){
	$("#virtualKeyboard").bind("selectstart", function(){
		return false;			//��ֹ�������������϶�ʱ��ѡ�в���
	});
	
	target = document.getElementById(targetID);		//target��Ϊͨ��targetID�������ݽ����Ŀ��DOM
	$("#" + targetID).focus();						//�Զ���Ŀ���ȡ����
	$("#" + targetID).bind("mouseup keyup", function(){
		if (document.all){		//IE���������
			selectRange = document.selection.createRange();	
		}						//Ŀ����mouseup,keyupʱ��Ҫ��ȡ��ǰ��ѡ�����򣨷���ѡȡ��Χ֮������ʧȥ����ʱ�����ε�ѡȡ��Χ���ᱻ��¼��
		return false;
	});
		
	/*****************************************��Сд��������ۡ�����********************************************/
	var capsLock = "off";												//��ʼ����Сд������״̬��on��д��offСд
	$("#virtualKeyboard #capsLockButton").click(function(){			//��Сд����������
		if(capsLock == "on"){
			$(this).removeClass("capsLockButton_on").addClass("capsLockButton_off");
			$("#virtualKeyboard #inputButton").each(function(){
				$(this).html($(this).html().toLowerCase());  			//ת��ΪСд����
				capsLock = "off";
			});
		} else if(capsLock == "off"){
			$(this).removeClass("capsLockButton_off").addClass("capsLockButton_on");
			$("#virtualKeyboard #inputButton").each(function(){
				$(this).html($(this).html().toUpperCase());			//ת��Ϊ��д����
				capsLock = "on";
			});
		}
	});
	
	/*****************************************��ͨ��������_��ĸ&����&����********************************************/
	$("#virtualKeyboard #inputButton").bind("mousedown", function(){
		var inputContent = $(this).html().toString();										//��ȡ��ǰ����İ���ֵ
		singleClickInputButton(inputContent);												//�����������������ݵ�ǰ����ֵ
		holdOperationTime = setTimeout(function(){holdInputButton(inputContent)}, 700);	//����700ms�󴥷�����������������ݵ�ǰ����ֵ
	}).bind("mouseup", function(){			//mouseupʱ�����������״̬
		clearTimeout(holdOperationTime);
		clearInterval(continuOperationTime);
		if (document.all){					//IE���������
			selectRange.select();			//���ù��λ��
		} else {												//��IE���������
			target.setSelectionRange(selectRange, selectRange);	//���ò���ʾ���λ��
		}
	}).bind("mouseout", function(){			//mouseoutʱ�����������״̬
		clearTimeout(holdOperationTime);
		clearInterval(continuOperationTime);
	});

	/*****************************************�˸񰴼�����********************************************/
	$("#virtualKeyboard #backButton").mousedown(function(){
		holdOperationTime = setTimeout(holdBackButton, 700);		//����700ms�󴥷�����ɾ������
		singleClickBackButton();									//������������
	}).bind("mouseup", function(){			//mouseupʱ�����������״̬
		clearTimeout(holdOperationTime);
		clearInterval(continuOperationTime);
		if (document.all){					//IE���������
			selectRange.select();			//���ù��λ��
		} else {												//��IE���������
			target.setSelectionRange(selectRange, selectRange);	//���ò���ʾ���λ��
		}
	}).bind("mouseout", function(){			//mouseoutʱ�����������״̬
		clearTimeout(holdOperationTime);
		clearInterval(continuOperationTime);
	});
	
	/*****************************************�ո������********************************************/
	$("#virtualKeyboard #spaceButton").mousedown(function(){
		holdOperationTime = setTimeout(holdSpaceButton, 700);		//����700ms�󴥷�����ɾ������
		singleClickSpaceButton();									//������������
	}).bind("mouseup", function(){			//mouseupʱ�����������״̬
		clearTimeout(holdOperationTime);
		clearInterval(continuOperationTime);
		if (document.all){					//IE���������
			selectRange.select();			//���ù��λ��
		} else {												//��IE���������
			target.setSelectionRange(selectRange, selectRange);	//���ò���ʾ���λ��
		}
	}).bind("mouseout", function(){			//mouseoutʱ�����������״̬
		clearTimeout(holdOperationTime);
		clearInterval(continuOperationTime);
	});
}



/*****************************************��ͨ������������_��ĸ&����&����********************************************/
var selectRange;		//IE����ǰѡȡ��Χor���λ�ã���IE���µĹ��λ��
function singleClickInputButton(inputContent){
	target.focus();
	if (document.all){					//IE���������
		try{
			selectRange.select();		//���ù��λ��(��ȡ�������ᶨλ����ͷ����Ҫ����ѡ��)
		} catch(e){
			selectRange = document.selection.createRange();		//��ȡѡ���ı�
		}
		selectRange.text = inputContent;						//�����ı�����
    } else {							//��IE���������
		selectRange = target.selectionStart + inputContent.length;	//�����µĹ��λ�ã���ǰѡ�������+�����ַ����ȣ�
        target.value = target.value.substr(0, target.selectionStart) + inputContent + target.value.substring(target.selectionEnd);
		target.setSelectionRange(selectRange, selectRange);			//���ò���ʾ���λ�ã���������ʱ������mouseup�¼��������������ʾ��꣩
    }
}
/*****************************************��ͨ������ס���Ų���_��ĸ&����&����********************************************/
function holdInputButton(inputContent){
	continuOperationTime = setInterval(function(){singleClickInputButton(inputContent)}, 30);			//��30ms�����������
}

/*****************************************�˸񰴼���������********************************************/
function singleClickBackButton(){
	target.focus();
	if (document.all){					//IE���������
		try{
			selectRange.select();								//���ù��λ��
		} catch(e){
			selectRange = document.selection.createRange();		//��ȡѡ���ı�
		}
		if(selectRange.compareEndPoints("StartToStart", target.createTextRange()) == 0 && selectRange.text == ""){		//������ڿ�ͷλ����û��ѡ������
			return false;																								//��ʲôҲ����
		} else {
			if(selectRange.text == ""){						//��û��ѡ������
				selectRange.moveStart("character",-1);		//ѡ�������ǰ�ƶ�һ���ַ�
				selectRange.select();						//ѡ��
			}
			document.selection.clear();						//ɾ��ѡ�е�����
		}
    } else {							//��IE���������
		if(target.selectionStart != target.selectionEnd){	//ѡ������ʱ����ʱֻ��ɾ��ѡ���ڵ����ݣ�
			selectRange = target.selectionStart				//�����µĹ��λ�ã���ǰѡ������㣩
			target.value = target.value.substr(0, target.selectionStart) + target.value.substring(target.selectionEnd);
		} else {											//δѡ������ʱ����ʱ��Ҫɾ�����֮ǰ��һ���ַ���
			selectRange = target.selectionStart - 1;		//�����µĹ��λ�ã���ǰѡ������� - 1���ַ���
			target.value = target.value.substr(0, target.selectionStart-1) + target.value.substring(target.selectionEnd);
		}
		target.setSelectionRange(selectRange, selectRange);		//���ò���ʾ���λ�ã���������ʱ������mouseup�¼��������������ʾ��꣩
	}
}
/*****************************************�˸񰴼���ס���Ų���********************************************/
function holdBackButton(){
	continuOperationTime = setInterval(singleClickBackButton, 30);			//��30ms�������ɾ��
}

/*****************************************�ո����������********************************************/
var selectRange;		//IE����ǰѡȡ��Χor���λ�ã���IE���µĹ��λ��
function singleClickSpaceButton(){
	target.focus();
	if (document.all){					//IE���������
		try{
			selectRange.select();		//���ù��λ��(��ȡ�������ᶨλ����ͷ����Ҫ����ѡ��)
		} catch(e){
			selectRange = document.selection.createRange();		//��ȡѡ���ı�
		}
		selectRange.text = " ";						//�����ı�����
    } else {							//��IE���������
		selectRange = target.selectionStart + 1;					//�����µĹ��λ�ã���ǰѡ�������+1��
        target.value = target.value.substr(0, target.selectionStart) + " " + target.value.substring(target.selectionEnd);
		target.setSelectionRange(selectRange, selectRange);			//���ò���ʾ���λ�ã���������ʱ������mouseup�¼��������������ʾ��꣩
    }
}
/*****************************************�ո����ס���Ų���********************************************/
function holdSpaceButton(inputContent){
	continuOperationTime = setInterval(singleClickSpaceButton, 30);			//��30ms�����������
}



  /* ****************************************************************
   * Insert text at the cursor
   *
   */
   /*
  this.VKI_insert = function(text) {
    this.VKI_target.focus();
    if (this.VKI_target.maxLength) this.VKI_target.maxlength = this.VKI_target.maxLength;
    if (typeof this.VKI_target.maxlength == "undefined" || this.VKI_target.maxlength < 0 || this.VKI_target.value.length < this.VKI_target.maxlength) {
      if (this.VKI_target.setSelectionRange && !this.VKI_target.readOnly && !this.VKI_isIE) {
        var rng = [this.VKI_target.selectionStart, this.VKI_target.selectionEnd];
        this.VKI_target.value = this.VKI_target.value.substr(0, rng[0]) + text + this.VKI_target.value.substr(rng[1]);
        if (text == "\n" && this.VKI_isOpera) rng[0]++;
        this.VKI_target.setSelectionRange(rng[0] + text.length, rng[0] + text.length);
      } else if (this.VKI_target.createTextRange && !this.VKI_target.readOnly) {
        try {
          this.VKI_target.range.select();
        } catch(e) {
		  this.VKI_target.range = document.selection.createRange(); 
		}
        this.VKI_target.range.text = text;
        this.VKI_target.range.collapse(true);
        this.VKI_target.range.select();
      } else this.VKI_target.value += text;
      if (this.VKI_shift) this.VKI_modify("Shift");
      if (this.VKI_altgr) this.VKI_modify("AltGr");
      this.VKI_target.focus();
    } else if (this.VKI_target.createTextRange && this.VKI_target.range)
      this.VKI_target.range.select();
  };
  
  */