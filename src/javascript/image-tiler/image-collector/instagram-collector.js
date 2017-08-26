import Collector from './collector'

class InstagramCollector extends Collector {
  canHandle() { return /^https:\/\/www.instagram.com/.test(location.href); }

  getSelector() { return '._2di5p'; }

  getUrl($dom) {
    return $dom.attr('src').replace(/\/[a-z]\d+x\d+\//, '/');
  }
}

export default InstagramCollector
