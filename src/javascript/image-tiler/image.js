import $ from 'jquery'
import _ from 'lodash'

const IMAGE_REGEXP = /(\.jpg|\.jpeg|\.png|\.gif|imepic)/i;

class SearchedImage {
  constructor(imageUrl, $tile, tiledArea) {
    this.imageUrl = imageUrl;
    this.$tile = $tile;
    this.tiledArea = tiledArea;
  }

  appendImage() {
    $.ajax({
      url : this.imageUrl,
      method : 'GET',
    })
    .done(_.bind(this.fetchDone(this.$tile, this.tiledArea), this))
    .fail(() => {});
  }

  fetchDone($tile, tiledArea) {
    return (data, status, xhr) => {
      if (xhr.status != 200) {
        return;
      }
      const contentType = xhr.getResponseHeader('Content-Type');
      if (this.isImage(contentType)) {
        $tile.attr('src', this.imageUrl);

      } else {
        $tile.remove();
        if (this.isHtml(contentType)) {
          _.each($(data).find('img'), _.bind(this.appendIfLargeEnough(tiledArea), this));
        }
      }
    }
  }

  isImage(contentType) {
    return /^image\/.+/.test(contentType);
  }

  isHtml(contentType) {
    return /text\/html/.test(contentType);
  }

  appendIfLargeEnough(tiledArea) {
    return (image) => {
      const $image = $(image);
      $image.bind('load', this.onImageLoad(tiledArea));
    }
  }

  onImageLoad(tiledArea) {
    return (e) => {
      const image = e.target;
      if (image.height < 300 || image.width < 300) {
        return
      }
      tiledArea.appendExtraImage(image.src);
    }
  }
}

function isImage(url) {
  return IMAGE_REGEXP.test(url);
}

export { SearchedImage, isImage }
