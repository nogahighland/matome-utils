import $ from 'jquery'
import _ from 'lodash'
import { toAbs } from './path'
import TiledImagePage from './tile'
import getImageUrls from './image-collector'

class ImageTiler {
  constructor($button) {
    this.$button = $button;
    this.images = getImageUrls();
    setInterval(_.bind(() => {
      this.images = getImageUrls();
    }, this), 500);
    this.initialize();
  }

	initialize() {
		if (!this.containsImages()) {
      this.$button.attr('disabled', true);
      return;
    }
    this.$button.on('click', _.bind(this.tileImages, this));
  }

  tileImages() {
    this.tile = new TiledImagePage(this.images);
    this.tile.tileImages();
  }

	containsImages() {
		return !!this.images.length
	}
}

export default ImageTiler
