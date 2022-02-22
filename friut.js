/*
弱类型脚本语言
数值型，字符型，布尔型
非零非空为true
0，null,undefined为false
*/
window.onload = function(){
	//当前页面加载完成后，绑定各种事件
	var fruitTbl = document.getElementById("fruit_tbl");
	var rows = fruitTbl.rows;
	//获得表格中的所有行
	for(var i = 1; i < rows.length - 1; ++i){
		var tr = rows[i];
		updateXJ(tr);
		tr.onmouseover = showBGColor;
		tr.onmouseout = clearBGColor;
		var cells = tr.cells;
		var pricaTD = cells[1];
		pricaTD.onmouseover = showHand;
		pricaTD.onclick = editPrice;
		
		var but = cells[4].firstChild;
		if(but && but.tagName == "BUTTON"){
			but.onclick = delFruit;
		}
	}
	updateZJ();
	var but = document.getElementById("btn01");
	if(but && but.tagName == "BUTTON"){
		but.onclick = addFruit;
	}
	but = document.getElementById("btn02");
	if(but && but.tagName == "BUTTON"){
		but.onclick = readdFruit;
	}
}


//当鼠标悬浮时显示背景颜色
function showBGColor(){
	//event当前发生的时间
	//event.srcElement事件源
	if(event && event.srcElement && event.srcElement.tagName == "TD"){
		var td = event.srcElement;
		var tr = td.parentElement;//获取td的父元素
		//通过js修改节点样式，加上.style
		tr.style.backgroundColor = "navy";
		
		var tds = tr.cells;//获取tr中所有单元格
		for(var i = 0; i < tds.length; ++i){
			tds[i].style.color = "white";
		}
	}
}
//鼠标离开恢复原始样式
function clearBGColor(){
	if(event && event.srcElement && event.srcElement.tagName == "TD"){
		var td = event.srcElement;
		var tr = td.parentElement;
		tr.style.backgroundColor = "bisque";
		var tds = tr.cells;
		for(var i = 0; i < tds.length; ++i){
			tds[i].style.color = "black";
		}
	}
}
//mouse悬浮在单价单元格时，显示手势
function showHand(){
	if(event && event.srcElement && event.srcElement.tagName == "TD"){
		var td = event.srcElement;
		td.style.cursor = "hand";
	}
}
function editPrice(){
	if(event && event.srcElement && event.srcElement.tagName == "TD"){
		var priceTD = event.srcElement;
		//判断当前priceTD有子节点，而且第一个子节点是文本节点 ， TextNode对应的是3  ElementNode对应的是1
		if(priceTD.firstChild && priceTD.firstChild.nodeType == 3){
			var oldPrice = priceTD.innerText;
			priceTD.innerHTML = "<input type='text' size='4'/>";
			var input = priceTD.firstChild;
			if(input.tagName == "INPUT"){
				input.value = oldPrice;//内部文本
				input.select();
				//4.绑定输入框失去焦点事件 , 失去焦点，更新单价
				input.onblur = updatePrice;
				//8.在输入框上绑定键盘摁下的事件，此处我需要保证用户输入的是数字
				input.onkeydown = ckInput;
			}
			
		}
	}
}
//更新单价
function updatePrice(){
	if(event && event.srcElement && event.srcElement.tagName == "INPUT"){
		var input = event.srcElement;
		var newPrice = input.value;
		var PriceTD = input.parentElement
		PriceTD.innerText = newPrice;
		updateXJ(PriceTD.parentElement);
	}
}
//检验键盘摁下的值的方法
function ckInput(){
	var kc = event.keyCode ;
	// 0 ~ 9 : 48~57
	//backspace : 8
	
	//enter : 13
	//console.log(kc);
	
	if(!( ( kc>=48 && kc<=57 ) || kc==8 || kc==13 )){
		event.returnValue=false;
	}
	if(kc==13){
		event.srcElement.blur();
	}
}


function updateXJ(tr){//小计
	if(tr && tr.tagName == "TR"){
		var tds = tr.cells;
		tds[3].innerText = parseInt(tds[1].innerText) * parseInt(tds[2].innerText);
	}
	updateZJ();
}
function updateZJ(){//总计
	var fruitTbl = document.getElementById("fruit_tbl");
	var rows = fruitTbl.rows;
	var sum = 0;
	for(var i = 1; i < rows.length - 1; ++i){
		sum += parseInt(rows[i].cells[3].innerText);
	}
	rows[rows.length - 1].cells[1].innerText = sum;
}

function delFruit(){
	if(event && event.srcElement && event.srcElement.tagName == "BUTTON"){
		//alert表示弹出一个对话框，只有确定按钮
		//confirm表示弹出一个对话框，有确定和取消按钮。当点击确定，返回true，否则返回false
		if(window.confirm("是否确认删除当前库存记录")){
			var but = event.srcElement ;
			var tr = but.parentElement.parentElement ;
			var fruitTbl = document.getElementById("fruit_tbl");
			fruitTbl.deleteRow(tr.rowIndex);
		
			updateZJ();
		}
	}
}
function addFruit(){
	if(event && event.srcElement && event.srcElement.tagName == "BUTTON"){
		var fname = document.getElementById("fname");
		var fPrice = document.getElementById("fPrice");
		var fnum = document.getElementById("fnum");
		var fruitTbl = document.getElementById("fruit_tbl");
		var rows = fruitTbl.rows;
		var tblr = fruitTbl.insertRow(rows.length - 1);
		var a = tblr.insertCell(0);
		var b = tblr.insertCell(1);
		var c = tblr.insertCell(2);
		var d = tblr.insertCell(3);
		var e = tblr.insertCell(4);
		tblr.onmouseover = showBGColor;
		tblr.onmouseout = clearBGColor;
		a.innerText = fname.value;
		
		b.innerText = fPrice.value;
		b.onmouseover = showHand;
		b.onclick = editPrice;
		c.innerText = fnum.value;
		e.innerHTML = "<button type='button'>删除</button>";
		e.onclick = delFruit;
		updateXJ(tblr);
	}
}
function readdFruit(){
	var fname = document.getElementById("fname");
	var fPrice = document.getElementById("fPrice");
	var fnum = document.getElementById("fnum");
	fname.value = null;
	fPrice.value = null;
	fnum.value = null;
}