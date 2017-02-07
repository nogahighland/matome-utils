import $ from 'jquery'

function toAbs(path, hostUrl) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  if (!hostUrl) {
    hostUrl = location.protocol + '//' + location.host;
  }
  if (/^\//.test(path)) { // /〜
    return hostUrl + path;
  }

  let pathParts = location.href.replace(hostUrl + '/', '').split('/');
  pathParts = pathParts.splice(0, pathParts.length - 1);

  let level = 0;
  const target = [];
  // ./ や ../の相対パスが含まれる場合
  const relatives	= path.split('/');
  $.each(relatives, (i, urlPath) => {
    if (urlPath === '..') {
      level++;
    }
    if (/\w/.test(urlPath)) {
      target.push(urlPath);
    }
  });
  return hostUrl
    + '/' + pathParts.splice(0, pathParts.length - level).join('/')
    + '/' + target.join('/');
}

export { toAbs }
