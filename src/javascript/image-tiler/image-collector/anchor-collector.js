import $ from 'jquery'
import _ from 'lodash'
import Collector from './collector'
import { isImage } from '../image'

class AnchorCollector extends Collector {

  canHandle(url) {
    return true;
  }

  getSelector() { return 'a' }

  getUrl($a) {
    const imageUrl = this.getLinkFromTextNode($a) || this.getLink($a)
    return !_.isEmpty(imageUrl) && imageUrl;
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
    const text = $a.text();
    if (isImage(text)) {
      return text;
    }
    const href = $a.attr('href');
    return isImage(href) && href;
  }
}

export default AnchorCollector
