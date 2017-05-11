import $ from 'jquery'
import _ from 'lodash'
import { toAbs } from '../path'

class Collector {
  constructor() {
    this.imageUrls = [];
  }

  canHandle(url) { }

  collect() {
    $(this.getSelector()).each((i, dom) => {
      const imageUrl = this.getUrl($(dom));
      !_.isEmpty(imageUrl) && this.imageUrls.push(toAbs(imageUrl));
    });
    this.imageUrls = _.uniq(this.imageUrls);
    this.imageUrls = _.filter(this.imageUrls, (url) => !_.isEmpty(url));
    return this.imageUrls;
  }

  getSelector() { return '' }

  getUrl($dom) { }
}

export default Collector

