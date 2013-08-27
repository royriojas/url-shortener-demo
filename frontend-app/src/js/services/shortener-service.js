;(function ($, kno, window) {
  'use strict';

  var service = kno.tools.createXHRService('kno.services.shortener', [
    {
      url: '/shorten',
      type: 'POST',
      name: 'doShort',
      onResponse : function (res, d) {
        var url = res.url;
        d.resolve({
          url : kno.format('{0}/{1}', window.location.origin, url)
        });
      }
//      responseData : function (args, d) {
//        d.resolve({
//          url : 'http://localhost/xdrasda'
//        });
//      }
    }
  ]);

}(jQuery, kno, window));