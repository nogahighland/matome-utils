import $ from 'jquery'
import _ from 'lodash'

const IMAGE_REGEXP = /(\.jpg|\.jpeg|\.png|\.gif|imepic)/i;

class SearchedImage {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
  }

  appendImage($tiledArea) {
    $.ajax({
      url : this.imageUrl,
      method : 'GET',
    })
    .done(_.bind(this.fetchDone($tiledArea), this))
    .fail(() => {});
  }

  fetchDone($tiledArea) {
    return (data, status, xhr) => {
      if (xhr.status != 200) {
        return;
      }
      const contentType = xhr.getResponseHeader('Content-Type');
      if (this.isImage(contentType)) {
        $tiledArea.trigger('append', imageUrl);

      } else if (this.isHtml(contentType)) {
        _.each($(data).find('img'), _.bind(this.appendIfLargeEnough($tiledArea), this));
      }
    }
  }

  isImage(contentType) {
    return /^image\/.+/.test(contentType);
  }

  isHtml(contentType) {
    return /text\/html/.test(contentType);
  }

  appendIfLargeEnough($tiledArea) {
    return (image) => {
      const $image = $(image);
      $image.bind('load', this.onImageLoad($tiledArea));
    }
  }

  onImageLoad($tiledArea) {
    return (e) => {
      const image = e.target;
      // console.log(`h: ${image.height}, w: ${image.width}`)
      // if (image.height < 300 || image.width < 300) {
      //   return
      // }
      $tiledArea.trigger('append', image.src);
    }
  }
}

function isImage(url) {
  return IMAGE_REGEXP.test(url);
}

export { SearchedImage, isImage }
