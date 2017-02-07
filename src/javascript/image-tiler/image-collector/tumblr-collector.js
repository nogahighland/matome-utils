import Collector from './collector'

class TumblrCollector extends Collector {
  canHandle() {
    return /https:\/\/www.tumblr.com/.test(location.href);
  }

  getSelector() { return 'img.post_media_photo, img.image' }

  getUrl($dom) {
    return $dom.attr('src').replace(/^(.+?)(_\d+)(\.[a-z]+)$/, function(src, baseUrl, sizeSpecifier, extension) {
      return `${baseUrl}_1280${extension}`;
    });
  }
}

export default TumblrCollector
