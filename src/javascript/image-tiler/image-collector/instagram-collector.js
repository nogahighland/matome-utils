import Collector from './collector'

class InstagramCollector extends Collector {
  canHandle() { return /^https:\/\/www.instagram.com/.test(location.href); }

  getSelector() { return '.KL4Bh > img'; }

  getUrl($dom) {
    return $dom.attr('src');
  }
}

export default InstagramCollector
