// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');

const mongoose = require('mongoose');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './public/dist')));
// Setting our Views Folder Directory
mongoose.connect('mongodb://localhost/march_team_manager', { useNewUrlParser: true });

const PlayerSchema = new mongoose.Schema({
    name: {type:String, required:[true, "Name cannot be blank"], minlength: [3, "Name must be at least 3 characters."]},
    position: { type: String, required: [true, "Position cannot be blank."], minlength: [3, "Position must be at least 3 characters."]},
    // game_status: ['Undecided', 'Undecided', 'Undecided'],
    game_one_status: {type:String, default: 'Undecided'},
    game_two_status: {type:String, default: 'Undecided'},
    game_three_status: {type:String, default: 'Undecided'},
})

const Player = mongoose.model('Player', PlayerSchema);

app.get('/api/players', (req, res)=>{
    Player.find({}, (err, allPlayers)=>{
        if(err){
            let errors = [];
            for (var key in err.errors) {
                errors.push(err.errors[key].message)
            }
            return res.status(400).json(errors);
        }else{
            return res.json(allPlayers);
        }
    })
})

app.post('/api/players', (req, res)=>{
    let p = new Player(req.body);
    p.save( (err, data)=>{
        if(err){
            let errors = [];
            for(var key in err.errors){
                errors.push(err.errors[key].message)
            }
            return res.status(400).json(errors);
        }else{
            return res.json(data);
        }
    })
})

app.put('/api/players/:id', (req, res)=>{
    gameToUpdate = req.body.game;
    updatedObject = {};
    updatedObject[gameToUpdate] = req.body.status
    Player.findOneAndUpdate({_id: req.params.id}, {$set: updatedObject}, (err, result)=>{
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
        return res.json(result);
    })
})

app.delete('/api/players/:id', (req, res)=>{
    Player.findOneAndRemove({_id: req.params.id}, (err, result)=>{
        if(err){
            console.log(err);
            return res.status(400).send(['Unable to delete player.'])
        }else{
            return res.json(result);
        }
    })
})



app.all("*", (req, res, next) => {
    res.sendFile(path.resolve("./public/dist/index.html"))
});
// Setting our Server to Listen on Port: 8000
app.listen(6789, function () {
    console.log("listening on port 6789");
})