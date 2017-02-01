import Collector from './collector'

class InstagramCollector extends Collector {
  canHandle() { return false }

  getSelector() { '' }

  getUrl($dom) { }
}

export default InstagramCollector
