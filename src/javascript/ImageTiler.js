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
	/**
	 * 相対パスを絶対パス化します。
	 **/
	this.toAbs = function(path, hostUrl) {
		if (/(^http:\/\/|^https:\/\/)/.test(path)) { // http://〜, https://〜
			return path;
		}
		if (!hostUrl) {
			hostUrl = location.protocol + "//" + location.host;
		}
		if (/^\//.test(path)) { // /〜
			return hostUrl + path;
		}
		// ./ や ../の相対パスが含まれる場合
		var relatives	= path.split('/');

		var pathParts = location.href.replace(hostUrl + '/', '').split('/');
		pathParts = pathParts.splice(0, pathParts.length - 1);

		var level = 0;
		var target = [];
		$.each(relatives, function(i, urlPath) {
			if (urlPath === '..') {
				level++;
			}
			if (/\w/.test(urlPath)) {
				target.push(urlPath);
			}
		});
		return hostUrl
				+ '/' + pathParts.splice(0, pathParts.length - level).join('/')
				+ '/' + target.join('/');
	}
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
				var absPath = self.toAbs(href);
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
				self.tileImgs.call(self);
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
	/**
	 * 画像タイルを開く
	 **/
	tileImgs : function() {
		var newWin = window.open(null, location.href);
		var $newBd = $(newWin.document).find("body");
		var $whole = $("<div>").on('click .img', function(e) {
			var $targetImg = $(e.target);
			var $orgImg = $('<img>').attr({"src": $targetImg.attr('src')});
			var $expanded = $orgImg.css({
				position	: 'absolute',
				top			: $(newWin).scrollTop() + 'px',
				left		:'0px',
			}).click(function() {
				$expanded.remove();
			});
			$newBd.append($expanded);
		});
		var self = this;
		var prevUrls = [];
		$whole.on('append', function(e, url) {
			var exists = _.find(prevUrls, function(prevUrl) {
				return prevUrl === url;
			});
			if (exists) {
				return;
			}
			prevUrls.push(url);
			_.uniq(prevUrls);
			$img = $("<img class='img'>").attr({"src":url, height:"200px", width:"200px"});
			$whole.append($img);
		})
		$.each(this.imgs, function(i, imgUrl) {
			self.fetchImg(imgUrl, $whole);
		});
		$newBd.append($whole);
	},
	fetchImg : function(url, $whole) {
		var self = this;
		$.ajax({
			url : url,
			method : 'GET',
			beforeSend : function(request) {
				//request.setRequestHeader("User-Agent", navigator.userAgent);
			}
		}).done(function(data, status, xhr) {
			if (xhr.status != 200) {
				return;
			}
			var contentType = xhr.getResponseHeader("Content-Type");
			if (/^image\/.+/.test(contentType)) {
				$whole.trigger('append', url);
			} else if (/text\/html/.test(contentType)) {
				_.each($(data).find('img'), function(img) {
					var $img = $(img);
					$img.load(function() {
						if (this.height > 300 && this.width > 300) {
							url = new URL(url).origin
							$whole.trigger('append', self.toAbs($(this).attr('src'), url));
						}
					});
				});
			}
		});
	}
}
ImageTiler.prototype = proto;
window.ImageTiler = ImageTiler;
