console.log("download eh");
downloadImage();
// 首先下载图片
function downloadImage() {
	// 获取下一个按钮，并点击，若a.href === window.location.href，就不点击下一个了，而是alert
	let nextATag = document.getElementById("next");
	console.log(nextATag.href, window.location.href);

	let imgNode = document.getElementById("img");
	if (imgNode) {
		let imgUrl = imgNode.src;
		console.log("imgUrl", imgUrl);
		// 获取图片序号作为名字，但是不太好获取，页面上的图片序号没有id或class，所以用当前url.split('-')[2]来获取
		let imgName = window.location.href.split("-")[2];
		console.log("imgName", imgName);
		download(imgUrl, imgName, nextATag);
	
	}
}

function download(imgsrc, name, nextATag) {//下载图片地址和图片名
  let image = new Image();
  // 解决跨域 Canvas 污染问题
  image.setAttribute("crossOrigin", "anonymous");
  image.onload = function() {
    let canvas = document.createElement("canvas");
    canvas.width = image.width;
    canvas.height = image.height;
    let context = canvas.getContext("2d");
    context.drawImage(image, 0, 0, image.width, image.height);
    let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
    let a = document.createElement("a"); // 生成一个a元素
    let event = new MouseEvent("click"); // 创建一个单击事件
    a.download = name || "photo"; // 设置图片名称
    a.href = url; // 将生成的URL设置为a.href属性
    a.dispatchEvent(event); // 触发a的单击事件
	
	// 加载下一页
	if (nextATag.href !== window.location.href) {
		// nextATag.click();
		// downloadImage();
		window.location.href = nextATag.href	
	} else {
		alert("下载完成！！！！！！！！");
	}
  };
  image.src = imgsrc;
}

