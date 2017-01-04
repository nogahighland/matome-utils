import $ from 'jquery'
import _ from 'lodash'
import { toAbs } from './path'
import { tileImages } from './tile'
import { isImage } from './image'

class ImageTiler {
  constructor($button) {
    this.$button = $button;
    this.images = [];
    this.prepare();
    this.initialize();
  }

	prepare() {
		$("a").each(_.bind(this.getImageUrl, this));
  }

  getImageUrl(i, a) {
    const $a = $(a);
    const imageUrl = this.getLinkFromTextNode($a) || this.getLink($a)
    !_.isEmpty(imageUrl) && this.images.push(toAbs(imageUrl));
  }

  getLinkFromTextNode($a) {
    const textNodes = $a.contents().filter(() => {
      return this.nodeType == 3;
    });
    if (_.isEmpty(textNodes)) {
      return;
    }
    return  _.find(textNodes, () => {
      return isImage(this);
    });
  }

  getLink($a) {
    const href = $a.attr('href')
    return isImage(href) || href;
  }

	initialize() {
		if (!this.containsImages()) {
      this.$button.attr('disabled', true);
      return;
    }
    this.$button.click(() => { _.bind(tileImages, this)(this.images) });
  }

	containsImages() {
		return !!this.images.length
	}
}

export default ImageTiler
