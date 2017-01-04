import $ from 'jquery'
import _ from 'lodash'
import { SearchedImage, fetchImage } from './image'

function tileImages(imageUrls) {
  var newWin = window.open(null, location.href);
  var $newBd = $(newWin.document).find("body");
  var $appendee = $("<div>").on('click .img', (e) => {
    var $targetImg = $(e.target);
    var $orgImg = $('<img>').attr({"src": $targetImg.attr('src')});
    var $expanded = $orgImg.css({
      position	: 'absolute',
      top			: $(newWin).scrollTop() + 'px',
      left		:'0px',
    }).click(() => {
      $expanded.remove();
    });
    $newBd.append($expanded);
  });
  var prevUrls = [];
  $appendee.on('append', (e, url) => {
    var exists = _.find(prevUrls, (prevUrl) => {
      return prevUrl === url;
    });
    if (exists) {
      return;
    }
    prevUrls.push(url);
    _.uniq(prevUrls);
    let $img = $("<img class='img'>").attr({"src":url, height:"200px", width:"200px"});
    $appendee.append($img);
  })
  $.each(imageUrls, (i, imageUrl) => {
    new SearchedImage($appendee, imageUrl).appendImage();
  });
  $newBd.append($appendee);
}

export { tileImages }
