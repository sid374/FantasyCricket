var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('express-jwt');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Player = mongoose.model('squad');
var Series = mongoose.model('series');

var auth = jwt({secret: 'SECRET', userProperty: 'payload'});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.post('/register', function(req, res, next){
    if(!req.body.username || !req.body.password || !req.body.email){
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    var user = new User();
    user.username = req.body.username;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.currentSquads = [];
    user.save(function (err){
        if(err){ console.log("User already existed"); return next(err); }
        return res.json({token: user.generateJWT()})
    });
});


router.post('/login', function(req, res, next){
    if(!req.body.username || !req.body.password){
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    passport.authenticate('local', function(err, user, info){
        if(err){ return next(err); }

        if(user){
            return res.json({token: user.generateJWT()});
        } else {
            return res.status(401).json(info);
        }
    })(req, res, next);
});

router.get('/squad', auth, function(req, res, next) {
    Player.find({}, function(err, players){
        if(err){return next(err);}
        res.json(players);
    })
});

router.get('/squad/:seriesId', auth, function(req, res, next) {
    Player.find({seriesId:req.params.seriesId}, function(err, players){
        if(err){return next(err);}
        res.json(players);
    })
});

router.get('/series', auth, function(req, res, next) {
    Series.find({}, function(err, series){
        if(err){return next(err);}
        res.json(series);
    })
});

router.get('/userSquad/:seriesId', auth, function(req, res, next) {
    User.findOne({_id: req.payload._id, "currentSquads.seriesId": req.params.seriesId}, {'currentSquads.$':1})
        .populate('currentSquads.squad')
        .exec(function(err, doc){
            if(err){return next(err);}
            if(doc == null)
                return res.status(400).json({message: 'userSquad not found'});
            console.log(doc);
            //console.log(doc.currentSquads[0].squad);
            return res.json(doc.currentSquads[0].squad);
        });
});

router.post('/userSquad/:seriesId', auth, function(req, res, next) {
    if(!req.body.squad){
        return res.status(404).json({message: 'please attach squad to body'});
    }
    let squadObjectIds = req.body.squad.map(function(objId){
        //console.log(objId);
        return mongoose.Types.ObjectId(objId);
    })
    let newSquad = {seriesId: req.params.seriesId, squad: squadObjectIds}
    User.findOne({_id: req.payload._id}, function (err, doc){
        if(err)
            return next(err);
        let existing = false;
        let currentSquads = doc.get('currentSquads');
        //check if seriesId already exists
        for(i=0;i<currentSquads.length;i++){
            if(currentSquads[i].seriesId == req.params.seriesId){
                //console.log("found existing squad");
                currentSquads[i].squad = squadObjectIds;
                //console.log(currentSquads[i]);

                existing = true;
                break;
            }
        }
        if(!existing){
            currentSquads.push(newSquad);
        }
        doc.currentSquads = currentSquads;
        doc.save(function(err){
            if(err)
                console.log(err)
        });
    });
    return res.json({message: 'success'});
});

module.exports = router;
