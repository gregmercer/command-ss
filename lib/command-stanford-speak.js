var _    = require('lodash');
var util = require('util');

module.exports = commandStanfordSpeak;

function commandStanfordSpeak (token, options) {
  this.token = token;
  this.options = options;
}

commandStanfordSpeak.prototype.handle = function (req, res, cb) {
  var bodyText = req.body.text;
  console.log(bodyText);
  cb(null, 'commandStanfordSpeak Received commmand with text: ' + bodyText);
};
