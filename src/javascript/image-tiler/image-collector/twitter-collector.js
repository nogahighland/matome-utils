import Collector from './collector'

class TwitterCollector extends Collector {
  canHandle() { return false }

  getSelector() { '' }

  getUrl($dom) { }
}

export default TwitterCollector

