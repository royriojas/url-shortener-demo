/*
 * GET users listing.
 */

var shortenerService = require('../services/shortener');

writeResponse = function (res, obj) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(obj));
  res.end();
}

exports.shorten = function (req, res) {
  //console.log(req.body);
  //writeResponse(res, { url : 'some'});
  var args = req.body;
  shortenerService.doShort(args, function (objResponse) {
    writeResponse(res, objResponse);
    //TODO: handle error situations
  });
};