import $ from 'jquery'
import _ from 'lodash'
import { toAbs } from './path'
import { tileImages} from './tile'

/**
 * 画像タイルを開くクラス
 **/
var ImageTiler = function ImageTiler($button) {
	/** ボタン */
	this.$button = $button;
	/** 画像リンク */
	this.imgs = [];
	/** 拡張子正規表現 */
	this.imgRegexp = /(\.jpg|\.jpeg|\.png|\.gif|imepic)/i;
	this.prepare();
	this.initialize();
}
// prototype
var proto = {
	/**
	 * 初期化前処理
	 **/
	prepare : function() {
		var self = this;
		$("a").each(function(i, a) {
			a = $(a);
			if (self.imgRegexp.test(a.attr("href"))) {
				var href = a.attr("href");
				var textNodes = a.contents().filter(function() {
					return this.nodeType == 3;
				});
				if (textNodes && textNodes.length) {
					$.each(textNodes, function() {
						if (self.imgRegexp.test(this)) {
							href = this;
						}
					});
				}
				var absPath = toAbs(href);
				self.imgs.push(absPath);
			}
		});
	},
	/**
	 * ボタンの初期化
	 */
	initialize : function() {
		var self = this;
		if (this.containsImgs()) {
			this.$button.click(function() {
				tileImages.call(self, self.imgs);
			});
		} else {
			this.$button.attr('disabled', true);
		}
	},
	/**
	 * 画像リンクを含むかどうか
	 **/
	containsImgs : function() {
		return !!this.imgs.length
	},
}
ImageTiler.prototype = proto;
export default ImageTiler
