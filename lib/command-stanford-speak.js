var _    = require('lodash');
var util = require('util');

var ss_data = require('../ss-data');

module.exports = commandStanfordSpeak;

function commandStanfordSpeak (token, options) {
  this.token = token;
  this.options = options;
}

commandStanfordSpeak.prototype.beginsWith = function (search) {
  var search_results = [];

  for (var prop in ss_data) {
    var item = ss_data[prop];
    var phrase = item.phrase;
    phrase = phrase.toLowerCase();
    phrase = phrase.replace(/the/g, "");
    phrase = phrase.trim();
    if (phrase.indexOf(search) == 0) {
      search_results[search_results.length] = { title: item.phrase, title_link: item.link, text: item.definition, color: '#0080ff' };
    }
  }

  return search_results;
}

commandStanfordSpeak.prototype.findKeyword = function (keyword) {
  var search_results = [];

  for (var prop in ss_data) {
    var item = ss_data[prop];
    var definition = item.definition.toLowerCase();
    var phrase = item.phrase.toLowerCase();
    if (definition.indexOf(keyword) != -1) {
      search_results[search_results.length] = { title: item.phrase, title_link: item.link, text: item.definition, color: '#0080ff' };
    }
    else if (phrase.indexOf(keyword) != -1) {
      search_results[search_results.length] = { title: item.phrase, title_link: item.link, text: item.definition, color: '#0080ff' };
    }
  }

  return search_results;
}

commandStanfordSpeak.prototype.commandHelp = function (keyword) {
  var help_text = [];

  var command_syntax = '/ss begins with [search-term]' + '\n';
  var text = 'Searches for phrases that begin with the search term provided.' + '\n';
  text += 'Examples:' + '\n';
  text += '/ss begins with t' + '\n';
  text += '/ss begins with mem';

  help_text[help_text.length] = { author_name: command_syntax, text: text, color: 'good' };

  command_syntax = '/ss keyword [search-term]' + '\n';
  text = 'Searches for phrases and definitions that contain the search term provided.' + '\n';
  text += 'Examples:' + '\n';
  text += '/ss keyword campus' + '\n';
  text += '/ss keyword quad';

  help_text[help_text.length] = { author_name: command_syntax, text: text, color: 'good' };

  return help_text;
}

commandStanfordSpeak.prototype.handle = function (req, res, cb) {
  var bodyText = req.body.text;
  var command = bodyText.split(" ");

  // command:
  // 'begins' or 'begins with'
  if (command[0] == 'begins') {

    var reply = 'phrases beginning with: ';

    // assumes last arg in command is search chars
    var search = command[command.length-1];
    reply += ' ' + search;

    res.setHeader('content-type', 'application/json');

    var search_results = this.beginsWith(search);
    if (search_results.length == 0) {
      search_results[search_results.length] = { text: 'No matches found.' };
    }

    var output = {
      response_type: "in_channel",
      text: reply,
      attachments: search_results
    };

    cb(null, JSON.stringify(output));
    return;
  }

  // command:
  // 'keyword'
  if (command[0] == 'keyword') {

    var reply = 'phrases with keyword: ';

    // assumes last arg in command is search chars
    var search = command[command.length-1];
    reply += ' ' + search;

    res.setHeader('content-type', 'application/json');

    var search_results = this.findKeyword(search);
    if (search_results.length == 0) {
      search_results[search_results.length] = { text: 'No matches found.' };
    }

    var output = {
      response_type: "in_channel",
      text: reply,
      attachments: search_results
    };

    cb(null, JSON.stringify(output));
    return;
  }

  // command:
  // 'help'
  if (command[0] == 'help') {

    var reply = '/ss command help: ';

    res.setHeader('content-type', 'application/json');

    var help_text = this.commandHelp();

    var output = {
      response_type: "in_channel",
      text: reply,
      attachments: help_text,
      "username": "stanford speaks",
      "mrkdwn": true
    };

    cb(null, JSON.stringify(output));
    return;
  }

  // otherwise search for direct phrase
  for (var prop in ss_data) {
    var item = ss_data[prop];
    if (item.phrase == bodyText) {
      cb(null, bodyText + ': ' + item.definition);
      return;
    }
  }

  cb(null, 'Received commmand: ' + bodyText);
};

