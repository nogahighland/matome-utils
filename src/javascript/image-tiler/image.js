import $ from 'jquery'

function fetchImage(url, $whole) {
  $.ajax({
    url : url,
    method : 'GET',
  }).done((data, status, xhr) => {
    if (xhr.status != 200) {
      return;
    }
    const contentType = xhr.getResponseHeader("Content-Type");
    if (/^image\/.+/.test(contentType)) {
      $whole.trigger('append', url);
    } else if (/text\/html/.test(contentType)) {
      _.each($(data).find('img'), (img) => {
        const $img = $(img);
        $img.load(() => {
          if (this.height > 300 && this.width > 300) {
            url = new URL(url).origin
            $whole.trigger('append', toAbs($(this).attr('src'), url));
          }
        });
      });
    }
  });
}

export { fetchImage }
