// By: 07-56
// Ver. 1.0.0 正式版 [2018-3-7]
//		实现两个数的基本四则运算,直接输入小数点时的自动补零，UI页面稍精细

var num_btn = (function () {//数字键盘乱序相关
	var number = document.getElementById("numberBox"),
		num_chi = number.getElementsByTagName("div");
	function addNumber() {
		var i;
		for(i = 0; i < 10; i++){
			reAdd(i);
		}
	}
	function reAdd(i) {//循环添加数字算法
		var x = parseInt(10*Math.random());
		if(num_chi[x].innerText == ""){
			num_chi[x].innerText = i;
		}else{
			reAdd(i);//自身调用实现不定次数的for循环
		}
	}
	addNumber();
} ())//随机数字键盘

var press_btn = (function () {//按下按键相关事件
	var i, temp = "", result = 0, x, tempI, dot = 0,
		C_ing = document.getElementById("C_ing"),
		C_fin = document.getElementById("C_fin"),
		numA = 0, numB = 0;

	function allClear(){
		C_ing.value = "";
		C_fin.value = "";
		temp = 0;
		result = 0;
		numA = numB = 0;
	}
	function deleter(data, C_iVal){
		console.log(data);
		var arr = data.split("");
		arr.pop();
		temp = arr.join("");
		tempI = temp;
		console.log(temp);
		arr = C_iVal.split("");
		arr.pop();
		C_ing.value = arr.join("");
	}

	function cal(data){//计算方式
		switch(data){
			case "+" :
				result = numB + numA;
				break;
			case "-":
				result = numA - numB;
				break;
			case "*":
				result = numA * numB;
				break;
			case "/":
				result = numA / numB;
				break;
			case "=":
				C_fin.value = result;
				result = undefined;
				break;
		}
	}

	function inputer(data) {//修改input中的值
		
		if(Number(data) >= 0 || data == "."){//第一位不能是运算符号
			if(data !== "."){
				temp += data;
				tempI = temp;
			}else{
				if(dot == 0){
					temp = "0.";
					tempI = temp;
				}
			}
		}else{
			if(data == "Del"){
				deleter(tempI, C_ing.value);//Del相关函数
			}else{
				if(numA == 0){
					numA = Number(temp);
					temp = "";
					dot = 0;
				}else{
					numB = Number(temp); 
					temp = "";
					dot = 0;
				}
			}
			
			if(data !== "="){// 存储非等于号的符号
				x = data;
			}
		}// 2018-3-5解决字符串变number类型的问题，下一步写算法及运算的判断
		if(numA && numB){
			cal(x);
			cal(data);
		}// 2018-3-6解决运算符号和等号区分的问题

		if(data == "." && dot == 0){//2018-3-7 解决第一位输入小数点时点前自动补零且无法多次出现小数点
			C_ing.value += "0.";
			dot = 1;
		}else{
			if(data !== "."){//防止小数点多次出现
				C_ing.value += data;
			}
		}

		if(data == "AC"){
			allClear();// 数据清空
		}
	}

	for(i = 0; i < 3; i++){
		var btn = document.getElementsByClassName("btn_Box")[i];

		btn.addEventListener("mousedown", function (e) {
			var event = e || window.event;
			var target = event.target || event.srcElement;
			target.setAttribute("class", "down");
			inputer(target.innerText);
		}, false);

		btn.addEventListener("mouseup", function (e) {
			var event = e || window.event;
			var target = event.target || event.srcElement;

			setTimeout(function () {
				target.setAttribute("class", "");
			}, 250);
		}, false)
	}

} ());//冒泡处理事件，按下的效果，及运算
