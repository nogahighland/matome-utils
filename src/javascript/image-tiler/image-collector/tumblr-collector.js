import Collector from './collector'

class TumblrCollector extends Collector {
  canHandle() {
    return /https:\/\/www.tumblr.com/.test(location.href);
  }

  getSelector() { return 'img.post_media_photo, img.image, video' }

  getUrl($dom) {
    if ($dom.attr('src')) {
      return $dom.attr('src').replace(/^(.+?)(_\d+)(\.[a-z]+)$/, function(src, baseUrl, sizeSpecifier, extension) {
        return `${baseUrl}_1280${extension}`;
      });
    } else {
      return $dom[0].currentSrc.replace(/^.+\/(tumblr_[0-9a-zA-Z]+)\/\d+$/, function(src, videoId) {
        return `https://vtt.tumblr.com/${videoId}.mp4`
      });
    }
  }
}

export default TumblrCollector
