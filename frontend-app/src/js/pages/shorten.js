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