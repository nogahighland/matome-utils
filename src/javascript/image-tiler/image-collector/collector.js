import $ from 'jquery'
import _ from 'lodash'

class Collector {
  constructor() {
    this.imageUrls = [];
  }

  canHandle(url) { }

  collect() {
    $(this.getSelector()).each((i, dom) => {
      this.imageUrls.push(this.getUrl($(dom)));
    });
    this.imageUrls = _.uniq(this.imageUrls);
    this.imageUrls = _.filter(this.imageUrls, (url) => !_.isEmpty(url));
    return this.imageUrls;
  }

  getSelector() { return '' }

  getUrl($dom) { }
}

export default Collector

