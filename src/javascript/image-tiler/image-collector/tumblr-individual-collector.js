import $ from 'jquery'
import _ from 'lodash'
import Collector from './collector'

class TumblrIndividualCollector extends Collector {
  canHandle() {
    return /https?:\/\/[a-z]+.tumblr.com/.test(location.href);
  }

  getSelector() { return 'article img, article iframe.tumblr_video_iframe' }

  getUrl($dom) {
    if ($dom.prop('tagName') === 'IMG') {
      return $dom.attr('src');
    }
    if ($dom.prop('tagName') === 'IFRAME') {
      const domArray = this.getHtml($dom.prop('src'));
      return this.getVideoUrl(domArray);
    }
  }

  getHtml(url) {
    // TODO: UIを阻害する
    const html = $.ajax({url: url, async: false, dataType: 'html'}).responseText
    return $(html);
  }

  getVideoUrl(domArray) {
    const video = _.find(domArray, (dom) => dom.tagName === 'VIDEO');
    if (!video) {
      return;
    }
    const videoUrl = $(video).find('source').prop('src');
    return videoUrl.replace(/^.+\/(tumblr_[0-9a-zA-Z]+)\/\d+$/, function(src, videoId) {
      return `https://vtt.tumblr.com/${videoId}.mp4`
    });
  }
}

export default TumblrIndividualCollector
