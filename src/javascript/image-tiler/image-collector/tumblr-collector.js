import Collector from './collector'

class TumblrCollector extends Collector {
  canHandle() { return false }

  getSelector() { '' }

  getUrl($dom) { }
}

export default TumblrCollector
