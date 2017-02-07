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
    return $('<div>').on('click .img', _.bind(this.onTiledAreaClicked, this));
  }

  appendImage(imageUrl, i) {
    const $tile = this.createEmptyImageDom();
    this.$tiledArea.append($tile);
    new SearchedImage(imageUrl, $tile, this).appendImage();
  }

  appendExtraImage(imageUrl) {
    const $tile = this.createEmptyImageDom();
    $tile.attr('src', imageUrl);
    this.$tiledArea.append($tile);
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

  createEmptyImageDom() {
    return $("<img class='img'>").attr({
      height: '200px',
      width: '200px'
    });
  }
}

export default TiledImagePage
