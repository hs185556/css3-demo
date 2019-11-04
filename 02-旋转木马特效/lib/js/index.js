window.onload = function() {
	//1.获取元素并声明变量
	let box = document.querySelector('.container');
	let imgList = box.getElementsByTagName('img');
	let front = 0;
	let angle = 0; //初始化的时候用的变量
	let data_rotateY = 0;
	let changeAngle = 0;
	let afterChangeAngle = 0;
	let clickIndex = 0;
	let timer_round = null;
	//2.初始化
	for(let i = 0; i < imgList.length; i++) {
		imgList[i].setAttribute('data-rotateY', angle);
		imgList[i].setAttribute('style', 'transform:rotateY(' + angle + 'deg) translateZ(226px);');
		angle += 40;
	}
	//3.点击图片转动对应角度
	for(let i = 0; i < imgList.length; i++) {
		imgList[i].onclick = () => {
			if(front == i) {
				return;
			} else {
				//3.1储存点击的下标
				clickIndex = i;
				//3.2计算变换角度
				changeAngle = -(clickIndex - front) * 40;
				//3.2.1 0->8 和  8->0 有毛病，特殊处理
				if(clickIndex == 8 && front == 0) {
					changeAngle = 40;
				} else if(clickIndex == 0 && front == 8) {
					changeAngle = -40;
				}
				goRound(changeAngle);
			}
		}
	}
	//4.存函数
	let goRound =(changeAngle)=>{
		//3.3读取data-royateY值
		for(let j = 0; j < imgList.length; j++) {
			data_rotateY = imgList[j].getAttribute('data-rotateY');
			//3.4计算最后角度
			if(changeAngle){
				afterChangeAngle = parseInt(data_rotateY) + changeAngle;
			}else{
				afterChangeAngle = parseInt(data_rotateY) - 40;
			}
			//3.5作用属性
			imgList[j].setAttribute('style', 'transform:rotateY(' + afterChangeAngle + 'deg) translateZ(226px);');
			//3.6.把新的data-rotateY刷上去
			imgList[j].setAttribute('data-rotateY', afterChangeAngle);
		}
		if(changeAngle){
			front = clickIndex;
		}else{
			front++;
		}
	}
	//5.图片自动轮播
	clearInterval(timer_round);
	timer_round = setInterval(goRound,1500)
	//6.hover图片自动停止开始轮播
	box.onmouseenter = ()=>{
		clearInterval(timer_round);
	}
	box.onmouseout = ()=>{
		clearInterval(timer_round);
		timer_round = setInterval(goRound,1500)
	}
}