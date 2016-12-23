var mongoose = require('mongoose');

var SeriesSchema = new mongoose.Schema({
  seriesId: String,
  Name: String
});

mongoose.model('series', SeriesSchema, 'series');  