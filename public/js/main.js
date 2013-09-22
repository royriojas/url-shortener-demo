/*! url-shortener - v0.1.0 - 2013-09-22
 * http://royriojas.com
 * Copyright (c) 2013 - Roy Riojas */

;(function ($, kno) {
  var vn = $.astrea.validator,
    required = vn.getRule('required');

  //borrowed from http://stackoverflow.com/questions/1303872/trying-to-validate-url-using-javascript
  var isValidURI = function (uri) {
    var urlregex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/;
    return urlregex.test(uri);
  };

  kno.validatorRules = {
    'url-validator' : function (parameters) {
      var validator = parameters.validator,
        val = parameters.val,
        field = parameters.field,
        callback = parameters.callback,
        sender = parameters.sender;

      val = $.trim(val);
      if (!val.match(/^[a-zA-Z]+:\/\//)) {
        val = 'http://' + val;
        //update the field
        field.val(val);
      }

      var isValid = val !== '' && isValidURI(val);

      callback(isValid);
    }
  };

  var validatorRules = kno.validatorRules;

  $.each(validatorRules, function (key, val) {
    vn.addRule(key, validatorRules[key]);
  });


})(jQuery, window.kno);
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
;(function ($, kno, window) {
  'use strict';

  kno.on('app:ready', function (e, params) {
    var $mc = params.$mainContainer;
    var services = params.services;
    var shortenerService = services.shortener;

    var $form = $mc.find('.form');

    var $textField = $mc.find('.text-field');

    $textField.textentry();

    var $saveTarget = $form.find('.save');

    $textField.on('keydown', function (e) {
      if (e.keyCode === 13) {
        $saveTarget.trigger('tap');
      }
    });

    var showShortenUrl = function (url) {
      var tmpl = kno.format('Congrats! here it is...<br><br> <a href="{0}" class="lnk" target="_blank"><span>{0}</span></a>', url);
      kno.msgBox.alert(tmpl, { modal : true, title : 'Shorten URL', source : $saveTarget });
    };

    $form.form({
      ':data:save' : function (e, ui) {
        var uri = ui.data.url;
        var d = shortenerService.doShort({
          url : uri
        });
        d.done(function (res) {
          var url = res.url;

          if (!url) {
            //TODO handle failure case
          }
          showShortenUrl(url);
        });

        //TODO: handle failure case
      }
    });

  });

}(jQuery, kno, window));
;(function ($, kno, window) {
	
	//this is always at the end

	kno.fire('app:init', { SPA: false });
}(jQuery, kno, window));