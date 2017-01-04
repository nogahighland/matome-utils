import $ from 'jquery'
import _ from 'lodash'

const IMAGE_REGEXP = /(\.jpg|\.jpeg|\.png|\.gif|imepic)/i;

class SearchedImage {
  constructor($appendee, imageUrl) {
    this.$appendee = $appendee;
    this.imageUrl = imageUrl;
  }

  appendImage() {
    $.ajax({
      url : this.imageUrl,
      method : 'GET',
    })
    .done(_.bind(this.fetchDone, this))
    .fail(() => {});
  }

  fetchDone(data, status, xhr) {
    if (xhr.status != 200) {
      return;
    }
    const contentType = xhr.getResponseHeader("Content-Type");
    if (this.isImage(contentType)) {
      $appendee.trigger('append', imageUrl);

    } else if (this.isHtml(contentType)) {
      _.each($(data).find('img'), _.bind(this.appendIfLargeEnough, this));
    }
  }

  isImage(contentType) {
    return /^image\/.+/.test(contentType);
  }

  isHtml(contentType) {
    return /text\/html/.test(contentType);
  }

  appendIfLargeEnough(image) {
    const $image = $(image);
    $image.bind('load', this.onImageLoad(this.$appendee));
  }

  onImageLoad($appendee) {
    return (e) => {
      const image = e.target;
      console.log(`h: ${image.height}, w: ${image.width}`)
      // if (image.height < 300 || image.width < 300) {
      //   return
      // }
      debugger
      $appendee.trigger('append', image.src);
    }
  }
}

function isImage(url) {
  return IMAGE_REGEXP.test(url);
}

export { SearchedImage, isImage }
