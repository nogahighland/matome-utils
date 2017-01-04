import $ from 'jquery'

class TargetOpener {
  constructor($button) {
    this.$button = $button;
    this.url = "";
    this.prepare();
    this.initialize();
  }

  prepare() {
		var title=$("head").find("title").text().trim().substring(0,10);
		var self = this;
		$("a").each(function(e,t){
			t = $(t);
			if ((new RegExp(title)).test(t.text())) {
				self.url = t.attr("href");
			}
		});
  }

  initialize() {
    if (this.hasTargetLink()) {
      var self = this;
      this.$button.click(function() {
        self.openTarget.call(self);
      });
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
