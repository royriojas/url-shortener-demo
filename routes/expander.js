/*
 * GET users listing.
 */

var shortenerService = require('../services/shortener');

exports.expand = function (req, res) {
  //console.log(req.body);
  //writeResponse(res, { url : 'some'});
  var shorten = req.params.shorten;
  shortenerService.expand({ shorten : shorten }, function (objResponse) {
    var obj = objResponse;
    var url = objResponse.url;
    res.redirect(url);
  });
};