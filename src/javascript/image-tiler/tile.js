import $ from 'jquery'
import _ from 'lodash'
import { SearchedImage, fetchImage } from './image'

class TiledImagePage {

  constructor(imageUrls) {
    this.imageUrls = imageUrls;
    this.appendedImageUrls = [];
  }

  tileImages() {
    const newWindow = window.open(null, location.href);
    this.$newWindow = $(newWindow);
    this.$appendeeBody = $(newWindow.document).find('body');
    this.$tiledArea = this.createTiledArea();
    this.$appendeeBody.append(this.$tiledArea);
    _.each(this.imageUrls, _.bind(this.appendImage, this));
  }

  createTiledArea() {
    return $('<div>')
      .on('click .img', _.bind(this.onTiledAreaClicked, this))
      .on('append', _.bind(this.onImageAppended, this));
  }

  appendImage(i, imageUrl) {
    new SearchedImage(imageUrl).appendImage(this.$tiledArea);
  }

  onTiledAreaClicked(e) {
    const $targetImage = $(e.target);
    this.$appendeeBody.append(this.getExpandableImage($targetImage));
  }

  getExpandableImage($targetImage) {
    const $originalImage = $('<img>').attr({'src': $targetImage.attr('src')});
    const $expanded = $originalImage.css({
      position: 'absolute',
      top: this.$newWindow.scrollTop() + 'px',
      left:'0px',
    })
    return $expanded.on('click', (e) => { $(e.target).remove() });
  }

  onImageAppended(e, imageUrl) {
    if (this.isAlreadyAppended(imageUrl)) {
      return;
    }
    let $img = $("<img class='img'>").attr({
      src: imageUrl,
      height: '200px',
      width: '200px'
    });
    this.$tiledArea.append($img);
    this.appendedImageUrls.push(imageUrl);
  }

  isAlreadyAppended(imageUrl) {
    const exists = _.find(this.appendedImageUrls , (appendedImageUrl) => {
      return appendedImageUrl === imageUrl;
    });
    return exists;
  }
}

export default TiledImagePage
