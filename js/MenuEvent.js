/*
 * 打开/关闭菜单事件
 */

//在android4.4.2中的swipe事件，需要preventDefault一下，否则触发不正常
window.addEventListener('dragstart', function(e) {
	mui.gestures.touch.lockDirection = true; //锁定方向
	mui.gestures.touch.startDirection = e.detail.direction;
});
window.addEventListener('dragright', function(e) {
	if (!mui.isScrolling) {
		e.detail.gesture.preventDefault();
	}
});

//主界面向右滑动，若菜单未显示，则显示菜单；否则不做任何操作
window.addEventListener("swiperight", function(e) {
	if (Math.abs(e.detail.angle) < 10) {
		//获得主页面的webview
		var main = plus.webview.currentWebview().parent();
		//触发主页面的openMenu事件
		mui.fire(main, 'menu:open');
	}
});
//主界面向左滑动，若菜单已显示，则关闭菜单；否则，不做任何操作；
window.addEventListener("swipeleft", function(e) {
	//获得主页面的webview
	var main = plus.webview.currentWebview().parent();
	//触发主页面的closeMenu事件
	mui.fire(main, 'menu:close');
});