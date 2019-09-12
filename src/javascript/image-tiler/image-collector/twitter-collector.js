import Collector from './collector'

class TwitterCollector extends Collector {
  canHandle() { return /^https:\/\/twitter.com/.test(location.href) }

  getSelector() { return 'main img' }

  getUrl($dom) {
    const url = $dom.attr('src');
    if (/\/media\//.test(url)) {
      return url.replace(/&name.+/, '');
    }
  }
}

export default TwitterCollector

