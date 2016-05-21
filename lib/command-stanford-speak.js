var _    = require('lodash');
var util = require('util');

module.exports = commandStanfordSpeak;

function commandStanfordSpeak (token, options) {
  this.token = token;
  this.options = options;
}

commandStanfordSpeak.prototype.beginsWith = function (search) {
  var search_results = [
    { text: 'line1 from beginsWith' },
    { text: 'line2' },
  ];
  return search_results;
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

    var output = {
      response_type: "in_channel",
      text: reply,
      attachments: search_results
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

// https://www.stanford.edu/about/speak
var ss_data = [
  {
    phrase: 'AD',
    definition: 'Academic Director. Professor academic advisor in each residence who is a key resource during your pre-major years.',
    tags: ''
  },
  {
    phrase: 'All Nighter (to pull an…)',
    definition: 'A common phenomenon, especially when it\'s time for final exams.',
    tags: ''
  },
  {
    phrase: 'ASSU',
    definition: 'Associated Students of Stanford University – the student government.',
    tags: ''
  },
  {
    phrase: 'The Axe',
    definition: 'The symbol of rivalry between Stanford University and our traditional rival, U.C. Berkeley (Cal). The Axe is awarded each year to the school winning the Big Game.',
    tags: ''
  },
  {
    phrase: 'Axess',
    definition: 'The student information system for registering, reviewing grades, changing addresses and other administrative tasks.',
    tags: ''
  },
  {
    phrase: 'BART',
    definition: 'Bay Area Rapid Transit. A subway system which carries passengers throughout the San Francisco area.',
    tags: ''
  },
  {
    phrase: 'Big Game',
    definition: 'The annual football matchup against rival Berkeley. Traditionally it\'s the last, most highly anticipated football game of the season.',
    tags: ''
  },
  {
    phrase: 'Bollards',
    definition: 'The metal and wooden posts strategically placed on campus to: 1) keep cars out; and 2) impale hapless bikers.',
    tags: ''
  },
  {
    phrase: 'Caltrain',
    definition: 'A commuter rail system running between San Francisco and San Jose. Don\'t have a car? This is your best bet to get to "the City".',
    tags: ''
  },
  {
    phrase: 'Cardinal',
    definition: 'Stanford\'s mascot: The color, not the bird!',
    tags: ''
  },
  {
    phrase: 'The City',
    definition: 'Known as San Francisco to non-Bay Area residents, it\'s the cultural center of the Bay Area and popular with students when they want to get off campus.',
    tags: ''
  },
  {
    phrase: 'The Claw',
    definition: 'Nickname for the fountain in White Plaza, between the Bookstore and Old Union.',
    tags: ''
  },
  {
    phrase: 'The Co Ho',
    definition: 'The Coffee House (or CoHo) in Tresidder Union is a popular student hangout for studying, socializing, and sipping java.',
    tags: ''
  },
  {
    phrase: 'The Daily',
    definition: 'Stanford students\' independent newspaper.',
    tags: ''
  },
  {
    phrase: 'Dead Week',
    definition: 'The week immediately preceding finals week. It is intended that students study feverishly during this week.',
    tags: ''
  },
  {
    phrase: 'Dink',
    definition: 'Dinkelspiel Auditorium. Located between Tresidder Union and the Braun Music Center, this is a popular venue for musical events and other performances.',
    tags: ''
  },
  {
    phrase: 'The Dish',
    definition: 'The 150\' radio telescope in the hills behind Lake Lagunita. Also short-hand for the popular open space area in which this radio telescope is located.',
    tags: ''
  },
  {
    phrase: 'Dollies',
    definition: 'The five spirited women who accompany the Stanford Band with dance routines.',
    tags: ''
  },
  {
    phrase: 'The Draw',
    definition: 'The ultimate in Spring Quarter stress. This hair-raising process decides students\' housing fate for the coming year.',
    tags: ''
  },
  {
    phrase: 'EANABs',
    definition: 'Equally attractive non-alcoholic beverages. Required at campus parties serving alcohol.',
    tags: ''
  },
  {
    phrase: 'The Farm',
    definition: 'Campus nickname, derived from the days when horses rather than students roamed in what previously was the farm of university founders Leland and Jane Stanford.',
    tags: ''
  },
  {
    phrase: 'Flicks',
    definition: 'A stress-relieving movie screening on Sunday evenings.',
    tags: ''
  },
  {
    phrase: 'Flo Mo',
    definition: 'Florence Moore Hall, a dormitory complex.',
    tags: ''
  },
  {
    phrase: 'Fountain Hopping',
    definition: 'The concept is simple, yet surprisingly fun on a warm day. Just find one of the many fountains on campus and hop in.',
    tags: ''
  },
  {
    phrase: 'Fro So Co',
    definition: 'Freshmen-Sophomore College, a housing option for freshman and sophomores.',
    tags: ''
  },
  {
    phrase: 'Gaieties',
    definition: 'The student-written, student-produced musical performed the weekend before Big Game.',
    tags: ''
  },
  {
    phrase: 'Hoo Tow',
    definition: 'Hoover Tower, erected in honor of Herbert Hoover. An elevator ride to the top provides an outstanding view of campus and the Bay Area.',
    tags: ''
  },
  {
    phrase: 'IMs',
    definition: 'Intramurals. Sports tournaments ranging from football to inner-tube water polo that are expressly for dorm teams. A source of good-natured dorm rivalries.',
    tags: ''
  },
  {
    phrase: 'Lake Lag',
    definition: 'A wide basin at the corner of campus. Don\'t expect to actually find water here, however, as it remains dry for a good portion of the year. The trail surrounding it is popular with joggers.',
    tags: ''
  },
  {
    phrase: 'LSJUMB',
    definition: 'Those merry masters of madcap melody, the truly incomparable Leland Stanford Junior University Marching Band!',
    tags: ''
  },
  {
    phrase: 'Marguerite',
    definition: 'Stanford\'s free shuttle system.',
    tags: ''
  },
  {
    phrase: 'Mem Aud',
    definition: 'Memorial Auditorium, the largest on campus.',
    tags: ''
  },
  {
    phrase: 'Mem Chu',
    definition: 'Memorial Church, located prominently in the Quad.',
    tags: ''
  },
  {
    phrase: 'Oski',
    definition: 'The Berkeley Golden Bear -- and the nemesis of Stanford\'s Tree.',
    tags: ''
  },
  {
    phrase: 'The Oval',
    definition: 'The large grassy elliptical area at the end of Palm Drive that\'s perfect for an afternoon of Frisbee or volleyball.',
    tags: ''
  },
  {
    phrase: 'PA',
    definition: 'The moment you hit campus, this abbreviation no longer stands for the proud state of Pennsylvania but the tech-infused town of Palo Alto.',
    tags: ''
  },
  {
    phrase: 'PHE',
    definition: 'Peer Health Educator. An upperclass student in each freshmen residence who actively promotes and supports student health, wellness and safety.',
    tags: ''
  },
  {
    phrase: 'PMA',
    definition: 'Pre-Major Advisor. A faculty, staff, or alumni advisor who takes a small group of freshmen under his or her wing until they declare a major and helps them select courses, choose a major and navigate academic life at Stanford.',
    tags: ''
  },
  {
    phrase: 'Primal Scream',
    definition: 'Tradition of stress alleviation for students. Listen for it at midnight the Sunday night of Dead Week.',
    tags: ''
  },
  {
    phrase: 'The Quad',
    definition: 'An enclosure of buildings housing some of the classroom space on campus and many departmental offices.',
    tags: ''
  },
  {
    phrase: 'RA',
    definition: 'Resident Assistant. The truly dedicated upperclass student who lives in dorms and serves roles ranging from dorm activity coordinator to advisor, confidant and friend.',
    tags: ''
  },
  {
    phrase: 'RF',
    definition: 'Resident Fellow. Stanford faculty (and occasionally senior administrative staff) who live in student residences and serve as educational and intellectual leaders in their houses.',
    tags: ''
  },
  {
    phrase: 'RCC',
    definition: 'Resident Computer Consultant. A human guide to computers that comes with every dorm.',
    tags: ''
  },
  {
    phrase: 'The Row',
    definition: 'Mayfield Avenue, location of numerous upperclass houses and fraternities.',
    tags: ''
  },
  {
    phrase: 'TAP',
    definition: 'Also known as “the Axe and Palm,” this is one of Stanford\'s many campus eateries. This particular one will be your best friend if you find yourself staying up late to study in Old Union.',
    tags: ''
  },
  {
    phrase: 'Tres Ex',
    definition: 'Tresidder Express. Stanford\'s rendition of a 7-Eleven, located in Tresidder Union.',
    tags: ''
  },
  {
    phrase: 'The Tree',
    definition: 'The Stanford Band\'s mascot.',
    tags: ''
  },
  {
    phrase: 'White Plaza',
    definition: 'The large plaza surrounded by Old Union, the Bookstore, the post office, and Tresidder Union. It is a central hub of student activity on campus, especially during the spring.',
    tags: ''
  },
  {
    phrase: 'The Zoo',
    definition: 'KZSU, 90.1 FM, Stanford\'s student radio station.',
    tags: ''
  },
];

