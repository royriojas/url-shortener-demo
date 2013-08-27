
var nbs = require('./newBase60');
var urlStorage = {
  _urls : [],
  save : function (url, cb) {
    var me = this;
    var now = (new Date()).getTime();
    var key = me._urls.length;
    var shortenURL = nbs.numtosxg(now) + '_' + nbs.numtosxg(key);
    var entry = {
      id : key,
      shortenURL : shortenURL,
      url : url,
      views : 0
    };
    me._urls.push(entry);
    cb && cb(null, entry);
    console.log(me._urls);
  },
  find : function (args, cb) {
    var me = this;
    var shorten = args.shorten;
    var found = me._urls.filter(function (ele) {
       return ele.shortenURL === args.shorten;
    });

    var entry = found[0];
    //TODO: handle error Case

    if (entry) {
      entry.views +=1;
    }
    console.log('this is entry ' + shorten + ' has being viewed:  ' + entry.views, entry);
    cb && cb(null, entry);
  }
};


module.exports = {

  doShort : function (args, callback) {

    if (args.url) {
      urlStorage.save(args.url, function (err, data) {
         //TODO: handle error cases
        callback({ url : data.shortenURL });
      });
    }
  },

  expand : function (args, callback) {
    if (args.shorten) {
      urlStorage.find({ shorten: args.shorten }, function (err, data) {

        //TODO: handle error case
        callback({url : data.url });

      });
    }
  }
};