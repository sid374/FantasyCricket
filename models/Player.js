var mongoose = require('mongoose');

var PlayerSchema = new mongoose.Schema({
  seriesId: String,
  Education: String,
  Majorteams: Array,
  Battingstyle: String,
  pId: String,
  Currentage: String,
  Height: String,
  Born: String,
  Playingrole: String,
  Fullname: String,
  Bowlingstyle: String,
  Nickname: String
});

mongoose.model('squad', PlayerSchema, 'squad');  