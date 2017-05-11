import $ from 'jquery'
import _ from 'lodash'
import Collector from './collector'
import { isImage } from '../image'

const IMAGE_REGEXP = /https?:\/\/\S+(\.(jpe?g|png|gif)|imepic|imgur)\S*?\s/i;
const CORRUPTED_IMAGE_REGEXP = /ttps?:\/\/\S+(\.(jpe?g|png|gif)|imepic|imgur)\S*?\s/i;

class TextNodeCollector extends Collector {
  canHandle(url) {
    return true;
  }

  getSelector() {
    return ':not(script)';
  }

  getUrl($dom) {
    const text = $dom.text();
    return this.getImageUrlFromRegularUrl(text) || this.getImageUrlFromCorruptedUrl(text);
  }

  getImageUrlFromRegularUrl(text) {
    const match = IMAGE_REGEXP.exec(text);
    if (match) {
      return match[0].trim();
    }
  }

  getImageUrlFromCorruptedUrl(text) {
    const match = CORRUPTED_IMAGE_REGEXP.exec(text);
    if (match) {
      return `h${match[0]}`.trim();
    }
  }
}

export default TextNodeCollector;
