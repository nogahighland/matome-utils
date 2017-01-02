var TargetOpener = function($button) {
	this.$button = $button;
	this.url = "";
	this.prepare();
	this.initialize();
}
var proto = {
	/**
	 * 初期化前処理。
	 * titleタグに含まれる文字列に似たリンクがある場合、そのURLを取得します。
	 **/
	prepare : function() {
		var title=$("head").find("title").text().trim().substring(0,10);
		var self = this;
		$("a").each(function(e,t){
			t=$(t);
			if((new RegExp(title)).test(t.text())) {
				self.url = t.attr("href");
			}
		});
	},
	/**
	 * ボタン初期化処理
	 **/
	initialize : function() {
		if (this.hasTargetLink()) {
			var self = this;
			this.$button.click(function() {
				self.openTarget.call(self);
			});
	 	} else {
	 		this.$button.attr('disabled', true);
	 	}
	},
	/**
	 * 目的のリンクが存在するかどうか
	 **/
	hasTargetLink : function() {
		return !!this.url;
	},
	/**
	 * 目的のリンクを開く
	 **/
	openTarget : function() {
		window.open(this.url, location.href);
	}
}
TargetOpener.prototype = proto;
window.TargetOpener = TargetOpener;
