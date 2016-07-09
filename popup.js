// TO-DO 桌面通知
// TO-DO 增量更新
// TO-DO 界面美化

function getImageUrl(callback, errorCallback) {
  var searchUrl = 'http://my.hupu.com/zhangjiawei/playbyplay';
  var x = new XMLHttpRequest();
  x.open('GET', searchUrl);
  x.responseType = 'document';
  x.onload = function() {
    var response = x.response;
    if (!response) {
      errorCallback('No response from hupu.com!');
      return;
    }

    var doms = response.getElementsByClassName('boxmain');
    var entry = new Array(doms.length);
    var link = new Array(doms.length);
    var title = new Array(doms.length);

    for (var i = 0; i < doms.length; i++) {
      entry[i] = doms[i].innerText;
      if (doms[i].children[0].nodeName == 'A') {
        link[i] = doms[i].children[0].href;
        title[i] = doms[i].children[0].innerText;
      }
    };

    callback(entry, link, title);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function() {
  renderStatus('Retrieving from zhangjiawei at hupu.com ... ');

  getImageUrl(function(entry, link, title) {
    var result = document.getElementById('entry-result');
    var htmlNew = ''

    for (var i = 0; i < entry.length; i++) {
      htmlNew += '<div>' + entry[i]
      if (link[i] !== undefined) {
        htmlNew += '<a href="' + link[i] + '">' + title[i] + '</a>';
      };
      htmlNew += '</div><br /><br />';
    };
    result.innerHTML = htmlNew;
    renderStatus('-------------------------------');
  }, function(errorMessage) {
    renderStatus('Cannot retrieve info. ' + errorMessage);
  });
});