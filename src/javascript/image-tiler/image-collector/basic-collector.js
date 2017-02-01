import $ from 'jquery'
import _ from 'lodash'
import Collector from './collector'
import { toAbs } from '../path'
import { isImage } from '../image'

class BasicCollector extends Collector {

  canHandle(url) {
    return true;
  }

  getSelector() { return 'a' }

  getUrl($a) {
    const imageUrl = this.getLinkFromTextNode($a) || this.getLink($a)
    return !_.isEmpty(imageUrl) && toAbs(imageUrl);
  }

  getLinkFromTextNode($a) {
    const textNodes = $a.contents().filter(() => {
      return this.nodeType == 3;
    });
    if (_.isEmpty(textNodes)) {
      return;
    }
    return  _.find(textNodes, () => {
      return isImage(this);
    });
  }

  getLink($a) {
    const href = $a.attr('href')
    return isImage(href) && href;
  }
}

export default BasicCollector
