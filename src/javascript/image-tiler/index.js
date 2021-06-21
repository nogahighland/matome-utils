import _ from 'lodash'
import TiledImagePage from './tile'
import getImageUrls from './image-collector'

class ImageTiler {
  constructor($button) {
    this.$button = $button;
    this.images = getImageUrls();
    setInterval(_.bind(() => {
      this.images = getImageUrls();
      this.setButtonAvailable();
    }, this), 500);
    this.initialize();
  }

	initialize() {
    this.setButtonAvailable();
    this.$button.on('click', _.bind(this.tileImages, this));
  }

  setButtonAvailable() {
		if (!this.containsImages()) {
      this.$button.attr('disabled', true);
    } else {
      this.$button.removeAttr('disabled');
    }
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
