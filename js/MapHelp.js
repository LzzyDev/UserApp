

var MapHelp = new Object();

/*
 * 获取位置成功后的回掉函数。
 */
MapHelp.geoInf = function  (position) {
	console.log(JSON.stringify(position));
	
	plus.storage.setItem("position",JSON.stringify(position));
}

/*
 * 获取位置信息 By Baidu
 */
MapHelp.getPosByBaidu = function(geoInf) {
	plus.geolocation.getCurrentPosition(geoInf, function(e) {
		mui.toast('获取定位信息失败！')
	}, {
		provider: 'baidu'
	});
}