import $ from 'jquery'
import _ from 'lodash'

class TargetOpener {
  constructor($button) {
    const partialTitle = $('head').find('title').text().trim().substring(0,10);
		this.titleRegexp = new RegExp(_.escapeRegExp(partialTitle));
    this.$button = $button;
    this.url = '';
    this.prepare();
    this.initialize();
  }

  prepare() {
		$('a').each(_.bind(this.setTargetUrl, this));
  }

  setTargetUrl(i, a) {
    const $a = $(a);
    if (this.titleRegexp.test(_.escapeRegExp($a.text()))) {
      this.url = $a.attr('href');
    }
  }

  initialize() {
    if (this.hasTargetLink()) {
      this.$button.on('click', _.bind(this.openTarget, this));
    } else {
      this.$button.attr('disabled', true);
    }
  }

	hasTargetLink() {
		return !!this.url;
	}

	openTarget() {
		window.open(this.url, location.href);
	}
}

export default TargetOpener
