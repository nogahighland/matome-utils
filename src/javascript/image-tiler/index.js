import $ from 'jquery'
import _ from 'lodash'
import { toAbs } from './path'
import { tileImages} from './tile'

class ImageTiler {
  constructor($button) {
    this.$button = $button;
    this.imgs = [];
    this.imgRegexp = /(\.jpg|\.jpeg|\.png|\.gif|imepic)/i;
    this.prepare();
    this.initialize();
  }
	prepare() {
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
	}
	/**
	 * ボタンの初期化
	 */
	initialize() {
		var self = this;
		if (this.containsImgs()) {
			this.$button.click(function() {
				tileImages.call(self, self.imgs);
			});
		} else {
			this.$button.attr('disabled', true);
		}
	}

	containsImgs() {
		return !!this.imgs.length
	}
}

export default ImageTiler
