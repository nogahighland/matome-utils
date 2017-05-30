import Collector from './collector'

class TwitterCollector extends Collector {
  canHandle() { return /^https:\/\/twitter.com/.test(location.href) }

  getSelector() { return 'div.AdaptiveMedia-photoContainer, div.js-adaptive-photo' }

  getUrl($dom) {
    return `${$dom.find('img').attr('src')}:large`;
  }
}

export default TwitterCollector

