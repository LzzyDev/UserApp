

var MapHelp = new Object();

MapHelp.geoInf = function  (position) {
	console.log(JSON.stringify(position));

	plus.storage.setItem("position",JSON.stringify(position));
}

MapHelp.getPosByBaidu = function(geoInf) {
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		mui.toast('获取定位信息失败！')
	}, {
		provider: 'baidu'
	});
}