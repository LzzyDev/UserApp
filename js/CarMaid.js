var CarMaid = {};

/*
 * Map
 */
(function($) {

	var Map = {
		/*
		 * 获取位置成功后的回掉函数。
		 */
		geoInf: function(position) {
			console.log(JSON.stringify(position));

			var address = position.address; //获取地理坐标信息
			var district = address.district ? address.district : "";
			var city = address.city ? address.city : "";
			var location = "";
			if (district != "") {
				location = district;
			} else if (city != "") {
				location = city;
			} else {
				mui.toast('定位失败');
			}
			location = location != "" ? location : '柳州市';
			console.log(location);

			document.getElementById('Location').innerText = location;

			plus.storage.setItem("position", JSON.stringify(position));

		},
		/*
		 * 获取位置信息 By Baidu
		 */
		getPosByBaidu: function(geoInf) {
			plus.geolocation.getCurrentPosition(geoInf, function(e) {
				mui.toast('获取定位信息失败！')
			}, {
				provider: 'baidu'
			});
		},
		/*
		 * 获取存储在本地的位置信息。
		 */
		getstoragePos: function() {

		}
	};

	$.Map = Map;
})(CarMaid);

/*
 * Banners
 */
(function($, mui) {

	//请求Banner成功后的回调方法
	function onSuccess(data) {
		if (data.length > 0) {
			// 获取Home 的 webview对象
			var HomePage = plus.webview.getWebviewById('templates/Home/index.html');
			// 触发UpBanners 事件
			mui.fire(HomePage, 'UpBanners', {
				data: data
			});
			console.log(HomePage.id);
		}
	}

	function onError(xhr, type, errorThrown) {
		mui.toast('网络不佳');
		console.log(type);
	}
	var Banners = {
		/*
		 * retry 为重试的次数
		 */
		initBanners: function(retry) {

			var url = 'http://120.25.60.120:8080/api/init/getbanners';
			mui.ajax(url, {
				dataType: 'json',
				type: 'get',
				timeout: 10000,
				success: function(data) {
					onSuccess(data);
				},
				error: function(xhr, type, errorThrown) {

					--retry;
					console.log(retry);
					if (retry > 0) {
						return Banners.initBanners(retry);
					}
					onError(xhr, type, errorThrown);

				}
			})
		}

	}
	$.Banners = Banners;

})(CarMaid, mui);