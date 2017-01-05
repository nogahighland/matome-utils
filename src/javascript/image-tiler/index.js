import $ from 'jquery'
import _ from 'lodash'
import { toAbs } from './path'
import TiledImagePage from './tile'
import { isImage } from './image'

class ImageTiler {
  constructor($button) {
    this.$button = $button;
    this.images = [];
    this.prepare();
    this.initialize();
  }

	prepare() {
		$('a').each(_.bind(this.getImageUrl, this));
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
    this.$button.on('click', _.bind(this.tileImages, this));
    this.tile = new TiledImagePage(this.images);
  }

  tileImages() {
    this.tile.tileImages();
  }

	containsImages() {
		return !!this.images.length
	}
}

export default ImageTiler
