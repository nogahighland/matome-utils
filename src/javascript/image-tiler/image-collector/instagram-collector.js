import Collector from './collector'

class InstagramCollector extends Collector {
  canHandle() { return /^https:\/\/www.instagram.com/.test(location.href); }

  getSelector() { return '._icyx7'; }

  getUrl($dom) {
    return $dom.attr('src');
  }
}

export default InstagramCollector
